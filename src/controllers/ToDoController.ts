import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const toDoSchema = z.object({
  listName: z.string(),
  title: z.string(),
});

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
export const getToDosByListId = async (req: Request, res: Response) => {
  try {
    const listId = Number(req.params.listId);

    await prisma.list.findUniqueOrThrow({
      where: {
        id: listId,
      },
    });

    const toDos = await prisma.toDo.findMany({
      where: {
        listId: listId,
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

    const list = await prisma.list.findUniqueOrThrow({
      where: {
        name: listName,
      },
    });

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
