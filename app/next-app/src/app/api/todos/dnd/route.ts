import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT：name, group, limitDateTime
export async function PUT(req: Request) {
  const { id, newName, groupId, limitDateTime } = await req.json();

  // ドラッグ先 ->9999 ドラッグ元->ドラッグ先No ドラッグ先->ドラッグ元No　
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { name: newName, groupId: groupId, limitDate: limitDateTime },
  });
  return NextResponse.json(updatedTodo);
}