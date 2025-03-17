import { headers } from "next/headers";

export async function getBaseUrl() {
  const host = (await headers()).get("host"); // サーバーでのホスト取得
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`; // 絶対 URL を作成

  return baseUrl;
}