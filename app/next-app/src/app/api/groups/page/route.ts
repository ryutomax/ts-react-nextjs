import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const groupId = searchParams.get("groupId"); // クエリパラメータを取得

  if (!groupId) {
    return NextResponse.json({ error: "Missing groupId" }, { status: 400 });
  }

  const groupTodos = await prisma.todo.findMany({
    where: {id : Number(groupId)},
    orderBy: { id: "asc" },
  });

  return NextResponse.json(groupTodos);
}