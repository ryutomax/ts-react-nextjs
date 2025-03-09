import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'GET') {
    // 特定の TODO アイテムの取得
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).end(`Todo with ID ${id} not found`);
    }
  } else if (req.method === 'PUT') {
    // TODO アイテムの更新
    const { title, completed } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { title, completed },
    });
    res.status(200).json(updatedTodo);
  } else if (req.method === 'DELETE') {
    // TODO アイテムの削除
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}