import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import { counters } from "./db/schema";

export async function getServerCounter() {
  const [result] = await db.select().from(counters).where(eq(counters.id, 1));
  return result?.value ?? 0;
}

export async function updateServerCounter(change: number) {
  const [counter] = await db
    .insert(counters)
    .values({ id: 1, value: change })
    .onConflictDoUpdate({
      target: counters.id,
      set: {
        value: sql`${counters.value} + ${change}`,
      },
    })
    .returning();
  return counter.value;
}
