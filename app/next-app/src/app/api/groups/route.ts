import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: ALLを除く全てのTODO GROUPを取得
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const num = searchParams.get("num");

  const includeCount = num === "true";

  const groups = await prisma.group.findMany({
    where: {
      id: { not: 1 },
    },
    orderBy: {
      id: 'asc',
    },
    ...(includeCount && {
      include: {
        _count: {
          select: { Todo: true },
        },
      },
    }),
  });

  return NextResponse.json(groups);
}

// POST: 新しいTODO GROUPを追加
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const newGroup = await prisma.group.create({ data: { 
      name,
    }});
    return NextResponse.json(newGroup);

  } catch (error) {
    return console.log("Error fetching todos:", error);
  }
  
}

// PUT：completed（ステータスの更新）
export async function PUT(req: Request) {
  const { id, groupId } = await req.json();

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { groupId: groupId },
  });
  return NextResponse.json(updatedTodo);
}

// // DELETE: TODOを削除
// export async function DELETE(req: Request) {
//   const { id } = await req.json();
//   await prisma.todo.delete({ where: { id } });
//   return NextResponse.json({ message: "Deleted successfully" });
// }