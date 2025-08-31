import * as t from "drizzle-orm/sqlite-core";

export const counters = t.sqliteTable("counters", {
  id: t.integer().primaryKey({ autoIncrement: true }),
  value: t.integer().default(0).notNull(),
});
