import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { SearchCondition } from '@/app/types/types';
import { typeCheckTableValue } from '@/app/modules/module';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, completed } = await req.json();

    typeCheckTableValue(name, completed);

    const searchCondition: SearchCondition = {};
    //キーワード検索　条件追加
    if (name) {
      searchCondition.name = {
        contains: name,
        mode: "insensitive",
      };
    }
    // タスク未完了(true)　タスク完了(false)　条件追加　
    if(!completed) {
      searchCondition.completed = completed;
    }
    
    const todos = await prisma.todo.findMany({
      where: searchCondition,
      orderBy: { id: "asc" },
    });
    return NextResponse.json(todos);
    
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}