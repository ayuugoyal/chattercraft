import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm/table";

export const agents = pgTable("agents", {
  id: uuid("id").primaryKey().unique().defaultRandom().notNull(),
  userId: varchar("user_id", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
  systemPrompt: text("system_prompt").notNull(),
  modelProvider: varchar("model_provider", { length: 50 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AgentTable = InferModel<typeof agents>;
