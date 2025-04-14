import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE: グループを削除
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // グループにタスクが存在するか確認
    const group = await prisma.group.findUnique({
      where: { id },
      include: {
        _count: {
          select: { Todo: true },
        },
      },
    });

    if (!group) {
      return NextResponse.json(
        { error: "Group not found" },
        { status: 404 }
      );
    }

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