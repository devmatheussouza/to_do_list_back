import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Get all lists
export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await prisma.list.findMany();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const createList = async (req: Request, res: Response) => {
  try {
    const listSchema = z.object({
      name: z.string(),
    });

    const { name } = listSchema.parse(req.body);
    const list = await prisma.list.create({
      data: {
        name,
      },
    });

    res.status(201).json(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to create this list.", error: error.message });
  }
};
