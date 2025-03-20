import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT：name
export async function PUT(req: Request) {
  const { id , updateName} = await req.json();

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { name: updateName },
  });
  return NextResponse.json(updatedTodo);
}