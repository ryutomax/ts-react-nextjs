import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const favTodos = await prisma.todo.findMany({
    select: {
      id: true,
      name: true,
      completed: true,
      favorite: true,
      group: {
        select: {
          name: true
        }
      }
    },
    where: { favorite: true },
    orderBy: {
      id: 'asc', // id を昇順（ASC）で並び替え
    }
  });
  return NextResponse.json(favTodos);
}

// favoriteの値を変更
export async function PUT(req: Request) {
  try {
    const { id } = await req.json();

    if (typeof id !== "number") {
      return NextResponse.json(
        { error: "Invalid 'id' value. Expected true or false." },
        { status: 400 }
      );
    }

    // 対象(todo)idのfavoriteの値を取得
    const targetValue = await prisma.todo.findMany({
      select: { favorite: true },
      where: { id }
    });

    // 対象(todo)idのfavoriteの値を反転
    const todos = await prisma.todo.update({
      where : { id },
      data: { favorite: !targetValue[0].favorite },
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