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
    where: {groupId : Number(groupId)},
    orderBy: { id: "asc" },
  });

  const groupName = await prisma.group.findMany({
    select: { name: true  },
    where: {id : Number(groupId)}
  });

  return NextResponse.json({todos: groupTodos, groupName});
}