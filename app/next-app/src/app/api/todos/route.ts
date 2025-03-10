import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: 全てのTODOを取得
export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

// POST: 新しいTODOを追加
export async function POST(req: Request) {
  const { title } = await req.json();
  const newTodo = await prisma.todo.create({ data: { title, completed: false } });
  return NextResponse.json(newTodo);
}

// DELETE: TODOを削除
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted successfully" });
}