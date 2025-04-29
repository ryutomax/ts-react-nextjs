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

    const newGroup = await prisma.group.create({
      data: { name },
      include: {
        _count: {
          select: { Todo: true },
        },
      },
    });

    return NextResponse.json(newGroup);

  } catch (error) {
    return console.log("Error fetching todos:", error);
  }
  
}

// PUT：completed（ステータスの更新）
export async function PUT(req: Request) {
  const { id, newGroupName } = await req.json();

  const updatedGroup = await prisma.group.update({
    where: { id },
    data: { name: newGroupName },
  });
  return NextResponse.json(updatedGroup);
}

// DELETE: グループを削除
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // グループにタスクが存在するか確認
    const group = await prisma.group.findUnique({
      where: { id },
      include: {
        _count: {
          select: { Todo: true },
        },
      },
    });

    // groupが無ければ終了
    if (!group) {
      return NextResponse.json(
        { error: "Group not found" },
        { status: 404 }
      );
    }

    // groupにタスクがあれば削除せず終了
    if (group._count.Todo > 0) {
      return NextResponse.json(
        { error: "Cannot delete group with todos" },
        { status: 400 }
      );
    }

    // グループを削除
    await prisma.group.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Group deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting group:", error);
    return NextResponse.json(
      { error: "Failed to delete group" },
      { status: 500 }
    );
  }
} 