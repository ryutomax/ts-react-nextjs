import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// filtering Completed todo
export async function POST(req: Request) {
  try {
    const { completed } = await req.json();

    if (typeof completed !== "boolean") {
      return NextResponse.json(
        { error: "Invalid 'completed' value. Expected true or false." },
        { status: 400 }
      );
    }

    // 未完了のみ表示（completed :false）
    if(!completed) {
      const todos = await prisma.todo.findMany({
        where: { completed }, // `completed` の値でフィルタリング
        orderBy: { id: "asc" }, // id を昇順（ASC）で並び替え
      });
      return NextResponse.json(todos);
    } else {
      const todos = await prisma.todo.findMany({
        orderBy: { id: "asc" }, // id を昇順（ASC）で並び替え
      });
      return NextResponse.json(todos);
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}