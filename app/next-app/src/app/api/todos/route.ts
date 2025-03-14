import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: 全てのTODOを取得
export async function GET() {
  const todos = await prisma.todo.findMany({
      orderBy: {
        id: 'asc', // id を昇順（ASC）で並び替え
    }
  });
  return NextResponse.json(todos);
}

// POST: 新しいTODOを追加
export async function POST(req: Request) {
  const { title } = await req.json();
  const newTodo = await prisma.todo.create({ data: { title, completed: false } });
  return NextResponse.json(newTodo);
}

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

// DELETE: TODOを削除
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted successfully" });
}