import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// filtering Completed todo
export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    // title が文字列であることをチェック
    if (typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { error: "Invalid 'title' value. Expected a non-empty string." },
        { status: 400 }
      );
    }

    const todos = await prisma.todo.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive", //大文字小文字を区別しない検索
        },
      },
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