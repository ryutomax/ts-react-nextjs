import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // TODO アイテムの取得
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    // TODO アイテムの作成
    const { title } = req.body;
    const newTodo = await prisma.todo.create({
      data: { title },
    });
    res.status(201).json(newTodo);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}