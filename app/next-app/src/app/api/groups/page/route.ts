import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupId = searchParams.get("groupId"); // クエリパラメータを取得

  if (!groupId) {
    return NextResponse.json({ error: "Missing groupId" }, { status: 400 });
  }

  const groupData = {
    id: groupId,
    name: `Group ${groupId}`,
  };

  return NextResponse.json(groupData);
}