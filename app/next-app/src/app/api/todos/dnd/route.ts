import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT：id
export async function PUT(req: Request) {
  const { activeId, overId } = await req.json();

  // 1.overTodo を一時的に -1 にする
  const overTodo = await prisma.todo.update({
    where: { id: overId },
    data: { id: -1 },
  });
  if (!overTodo) return console.error("Error overTodo");

  // 2.activeTodo を over の元の ID に変更
  const activeTodo = await prisma.todo.update({
    where: { id: activeId },
    data: { id: overId },
  });
  if (!activeTodo) return console.error("Error activeTodo");

  // 3.overTodo (-1) を active の元の ID に変更
  const updatedTarget = await prisma.todo.update({
    where: { id: -1 },
    data: { id: activeId },
  });
  return NextResponse.json({ activeTodo, updatedTarget });
}