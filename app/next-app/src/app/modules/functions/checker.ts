import { headers } from "next/headers";

export async function getBaseUrl() {
  const host = (await headers()).get("host"); // サーバーでのホスト取得
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`; // 絶対 URL を作成

  return baseUrl;
}

import { NextResponse } from "next/server";

export function typeCheckTableValue(completed: boolean, name: string) {
  if (typeof completed !== "boolean") {
    return NextResponse.json(
      { error: "Invalid 'completed' value. Expected true or false." },
      { status: 400 }
    );
  }
  if (typeof name !== "string") {
    return NextResponse.json(
      { error: "Invalid 'name' value. Expected a non-empty string." },
      { status: 400 }
    );
  }
}