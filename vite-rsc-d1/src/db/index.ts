// @ts-ignore
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export let db: ReturnType<typeof createDb>;

// https://orm.drizzle.team/docs/connect-cloudflare-d1
const createDb = () => drizzle(env.DB, { schema });

export const setupDb = async () => {
  if (db) return;
  db = createDb();
};
