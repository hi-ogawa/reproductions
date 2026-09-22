import { PrismaClient } from "../node_modules/.prisma/client.ts";
import { PrismaD1 } from "@prisma/adapter-d1";
// @ts-ignore
import { env } from "cloudflare:workers"

export let db: PrismaClient

export const setupDb = async () => {
  if (db) return;

  db = new PrismaClient({
    adapter: new PrismaD1(env.DB) as any,
  });

  // context(justinvdm, 21-05-2025): https://github.com/cloudflare/workers-sdk/pull/8283
  // await db.$queryRaw`SELECT 1`;
};
