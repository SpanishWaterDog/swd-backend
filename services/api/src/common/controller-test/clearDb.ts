import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const tables = Prisma.dmmf.datamodel.models.map((model) => model.name).filter((table) => table);

export const clearDb = async () => {
  await prisma.$transaction([
    prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`,
    ...tables.map((table) => prisma.$executeRawUnsafe(`TRUNCATE ${table};`)),
    prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`,
  ]);

  prisma.$disconnect();
};
