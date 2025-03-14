import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// filtering Completed todo
export async function GET(req: Request) {
  const { id , updateTitle} = await req.json();

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { title: updateTitle },
  });
  return NextResponse.json(updatedTodo);
}