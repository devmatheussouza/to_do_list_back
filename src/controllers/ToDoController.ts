import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const toDoSchema = z.object({
  listName: z.string(),
  title: z.string(),
});

const verifyListExistence = (listName: string) => {
  const list = prisma.list.findUniqueOrThrow({
    where: {
      name: listName,
    },
  });

  return list;
};

// Get all To Do
export const getToDos = async (_: Request, res: Response) => {
  try {
    const toDos = await prisma.toDo.findMany();
    res.status(200).json(toDos);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Get all To Do by List id
export const getToDosByListName = async (req: Request, res: Response) => {
  try {
    const { listName } = req.body;

    const list = await verifyListExistence(listName);

    const toDos = await prisma.toDo.findMany({
      where: {
        listId: list.id,
      },
    });

    res.status(200).json(toDos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Create To Do for specific List
export const createToDo = async (req: Request, res: Response) => {
  try {
    const { listName, title } = toDoSchema.parse(req.body);

    const list = await verifyListExistence(listName);

    const toDo = await prisma.toDo.create({
      data: {
        title: title,
        listId: list.id,
      },
    });

    res.status(201).json(toDo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update To Do
export const updateToDo = async (req: Request, res: Response) => {
  try {
    const updateToDoSchema = z.object({
      toDoId: z.number().int(),
      newTitle: z.string(),
      listName: z.string(),
    });

    const { toDoId, newTitle, listName } = updateToDoSchema.parse(req.body);

    const list = await verifyListExistence(listName);

    await prisma.list.update({
      where: {
        name: listName,
      },

      data: {
        todos: {
          update: {
            where: {
              id: toDoId,
            },
            data: {
              title: newTitle,
            },
          },
        },
      },
    });

    res.status(200).json({ message: "To do title updated." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete to do
export const deleteToDo = async (req: Request, res: Response) => {
  try {
    const deleteToDoSchema = z.object({
      toDoId: z.number().int(),
    });

    const { toDoId } = deleteToDoSchema.parse(req.body);

    await prisma.toDo.findUniqueOrThrow({
      where: {
        id: toDoId,
      },
    });

    await prisma.toDo.delete({
      where: {
        id: toDoId,
      },
    });

    res.status(200).json({ message: "To do deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
