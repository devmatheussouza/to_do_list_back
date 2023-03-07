import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const listSchema = z.object({
  name: z.string(),
});

// Get all lists
export const getLists = async (_: Request, res: Response) => {
  try {
    const lists = await prisma.list.findMany({
      include: {
        todos: true,
      },
    });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Create new List
export const createList = async (req: Request, res: Response) => {
  try {
    const { name } = listSchema.parse(req.body);
    const list = await prisma.list.create({
      data: {
        name,
      },
    });

    res.status(201).json(list);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unable to create this list.", error: error.message });
  }
};

// Update List name
export const updateListName = async (req: Request, res: Response) => {
  try {
    const listId = Number(req.params.listId);
    const { name } = listSchema.parse(req.body);
    const updatedList = await prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        name: name,
      },
    });

    res.status(200).json(updatedList);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unable to update list name.", error: error.message });
  }
};

// Delete List by Id
export const deleteListById = async (req: Request, res: Response) => {
  try {
    const listId = Number(req.params.listId);

    await prisma.list.findUniqueOrThrow({
      where: {
        id: listId,
      },
    });

    await prisma.list.delete({
      where: {
        id: listId,
      },
    });

    res.status(200).json({ message: "List deleted." });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unable to delete this list.", error: error.message });
  }
};
