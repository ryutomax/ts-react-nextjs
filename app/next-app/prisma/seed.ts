import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const groupInit = await prisma.group.upsert({
    where: { id: 1 }, // ID 1 のデータがあるかチェック
    update: { name: 'All' }, // もし存在すれば、name を更新
    create: { name: 'All' }, // 存在しなければ、新規作成
  });
  console.log(groupInit);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });