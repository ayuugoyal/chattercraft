import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  uuid,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
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

export const shopifyConfigs = pgTable("shopify_configs", {
  id: uuid("id").primaryKey().unique().defaultRandom().notNull(),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agents.id, { onDelete: "cascade" }),
  shopDomain: varchar("shop_domain", { length: 191 }).notNull(),
  apiKey: varchar("api_key", { length: 191 }).notNull(),
  apiSecretKey: varchar("api_secret_key", { length: 191 }).notNull(),
  accessToken: varchar("access_token", { length: 191 }).notNull(),
  enableProductRecommendations: boolean("enable_product_recommendations")
    .default(true)
    .notNull(),
  maxProductsToShow: integer("max_products_to_show").default(3).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const uiConfigs = pgTable("ui_configs", {
  id: uuid("id").primaryKey().unique().defaultRandom().notNull(),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agents.id, { onDelete: "cascade" }),
  primaryColor: varchar("primary_color", { length: 20 })
    .default("#0070f3")
    .notNull(),
  secondaryColor: varchar("secondary_color", { length: 20 })
    .default("#f5f5f5")
    .notNull(),
  backgroundColor: varchar("background_color", { length: 20 })
    .default("#ffffff")
    .notNull(),
  textColor: varchar("text_color", { length: 20 }).default("#333333").notNull(),
  buttonPosition: varchar("button_position", { length: 20 })
    .default("bottom-right")
    .notNull(),
  buttonSize: integer("button_size").default(60).notNull(),
  widgetWidth: integer("widget_width").default(380).notNull(),
  widgetHeight: integer("widget_height").default(600).notNull(),
  borderRadius: integer("border_radius").default(8).notNull(),
  welcomeMessage: text("welcome_message")
    .default("Hello! How can I help you today?")
    .notNull(),
  buttonIcon: varchar("button_icon", { length: 20 })
    .default("message")
    .notNull(),
  headerTitle: varchar("header_title", { length: 100 })
    .default("Chat Support")
    .notNull(),
  showAgentAvatar: boolean("show_agent_avatar").default(true).notNull(),
  showTimestamp: boolean("show_timestamp").default(true).notNull(),
  showTypingIndicator: boolean("show_typing_indicator").default(true).notNull(),
  enableDarkMode: boolean("enable_dark_mode").default(false).notNull(),
  allowAttachments: boolean("allow_attachments").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const agentsRelations = relations(agents, ({ many }) => ({
  shopifyConfig: many(shopifyConfigs),
  uiConfig: many(uiConfigs),
}));

export const shopifyConfigsRelations = relations(shopifyConfigs, ({ one }) => ({
  agent: one(agents, {
    fields: [shopifyConfigs.agentId],
    references: [agents.id],
  }),
}));

export const uiConfigsRelations = relations(uiConfigs, ({ one }) => ({
  agent: one(agents, {
    fields: [uiConfigs.agentId],
    references: [agents.id],
  }),
}));

export type AgentTable = InferModel<typeof agents>;
