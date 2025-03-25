import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { SearchCondition } from '@/app/types/types';
import { typeCheckTableValue } from '@/app/modules/checker';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, completed, isfavorite, groupId } = await req.json();

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

    if(isfavorite) { //重要ページの場合
      searchCondition.favorite = isfavorite; //true
    }

    if(groupId != 1) { //グループページの場合
      searchCondition.groupId = groupId;
    }
    
    const todos = await prisma.todo.findMany({
      select: {
        id: true,
        name: true,
        completed: true,
        favorite: true,
        group: {
          select: {
            name: true
          }
        }
      },
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