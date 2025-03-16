import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SearchCondition = {
  title?: {
    contains: string;
    mode?: "insensitive" | "default";
  };
  completed?: boolean;
};

export async function POST(req: Request) {
  try {
    const { title, completed } = await req.json();

    if (typeof completed !== "boolean") {
      return NextResponse.json(
        { error: "Invalid 'completed' value. Expected true or false." },
        { status: 400 }
      );
    }
    if (typeof title !== "string") {
      return NextResponse.json(
        { error: "Invalid 'title' value. Expected a non-empty string." },
        { status: 400 }
      );
    }

    const searchCondition: SearchCondition = {};
    if (title) {
      searchCondition.title = {
        contains: title,
        mode: "insensitive",
      };
    }
    // false
    if(!completed) {
      searchCondition.completed = completed;
    }
    
    const todos = await prisma.todo.findMany({
      where: searchCondition,
      orderBy: { id: "asc" },
    });
    return NextResponse.json(todos);
    
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}