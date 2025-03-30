import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT：completed（ステータスの更新）
export async function PUT(req: Request) {
  const { id } = await req.json();

  const existingTodo = await prisma.todo.findUnique({
    where: { id },
    select: { completed: true }, // completed のみ取得
  });

  if (!existingTodo) {
    return NextResponse.json({ error: `id ${ id } not found` }, { status: 404 });
  }
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed: !existingTodo.completed },
  });
  return NextResponse.json(updatedTodo);
}