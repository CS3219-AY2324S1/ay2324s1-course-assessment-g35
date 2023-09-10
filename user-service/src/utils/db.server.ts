import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

db = global.prisma;

export default db;