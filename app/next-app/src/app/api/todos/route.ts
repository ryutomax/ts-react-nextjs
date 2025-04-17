import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { CreateCondition } from '@/app/modules/types/types';

const prisma = new PrismaClient();

// GET: 全てのTODOを取得
export async function GET() {
  const todos = await prisma.todo.findMany({
    select: {
      id: true,
      name: true,
      completed: true,
      favorite: true,
      groupId: true,
      limitDate: true, // limitDateを追加
      group: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      id: 'asc', // id を昇順（ASC）で並び替え
    }
  });
  return NextResponse.json(todos);
}

// POST: 新しいTODOを追加
export async function POST(req: Request) {
  try {
    const { name, favorite, groupId, completed, limitDate } = await req.json();

    const createCondition: CreateCondition = {
      name: name ?? "",
      completed: completed ?? false,
      favorite: favorite ?? false,
      groupId: groupId ?? 1,
      limitDate: limitDate ?? null,
    };

    const newTodo = await prisma.todo.create({
      data: createCondition,
      include: {
        group: {
          select: {
            name: true
          }
        }
      }
    });
    return NextResponse.json(newTodo);

  } catch (error) {
    return console.log("Error fetching todos:", error);
  }
}

// PUT：name, group
export async function PUT(req: Request) {
  const { id, newName, groupId} = await req.json();

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { name: newName, groupId: groupId },
  });
  return NextResponse.json(updatedTodo);
}

// DELETE: TODOを削除
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted successfully" });
}