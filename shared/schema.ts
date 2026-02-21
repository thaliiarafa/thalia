import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull().default("Emma"),
  goals: text("goals").array(),
});

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull().default("personal"),
  priority: text("priority").notNull().default("medium"),
  done: boolean("done").notNull().default(false),
  list: text("list").notNull().default("daily"),
  date: date("date").notNull().default(sql`CURRENT_DATE`),
  orderIndex: integer("order_index").notNull().default(0),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  date: date("date").notNull(),
  time: text("time").notNull(),
  duration: text("duration"),
  location: text("location"),
  type: text("type").notNull().default("class"),
  color: text("color").notNull().default("#F472B6"),
  notes: text("notes"),
});

export const habits = pgTable("habits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  habitKey: text("habit_key").notNull(),
  value: integer("value").notNull().default(0),
  target: integer("target").notNull(),
  date: date("date").notNull().default(sql`CURRENT_DATE`),
});

export const focusSessions = pgTable("focus_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  duration: integer("duration").notNull(),
  date: date("date").notNull().default(sql`CURRENT_DATE`),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const creatorIdeas = pgTable("creator_ideas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull().default("Lifestyle"),
  hook: text("hook"),
  caption: text("caption"),
  audioRef: text("audio_ref"),
  status: text("status").notNull().default("Idea"),
  platform: text("platform").notNull().default("TikTok"),
});

export const editingTasks = pgTable("editing_tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  status: text("status").notNull().default("To Edit"),
  platform: text("platform").notNull().default("TikTok"),
  deadline: text("deadline"),
  notes: text("notes"),
});

export const brandDeals = pgTable("brand_deals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  contactEmail: text("contact_email"),
  platform: text("platform").notNull().default("TikTok"),
  status: text("status").notNull().default("Idea"),
  deliverables: text("deliverables"),
  deadline: text("deadline"),
  amount: text("amount"),
  notes: text("notes"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({ username: true, password: true, name: true });
export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertHabitSchema = createInsertSchema(habits).omit({ id: true });
export const insertFocusSessionSchema = createInsertSchema(focusSessions).omit({ id: true, completedAt: true });
export const insertCreatorIdeaSchema = createInsertSchema(creatorIdeas).omit({ id: true });
export const insertEditingTaskSchema = createInsertSchema(editingTasks).omit({ id: true });
export const insertBrandDealSchema = createInsertSchema(brandDeals).omit({ id: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertHabit = z.infer<typeof insertHabitSchema>;
export type Habit = typeof habits.$inferSelect;
export type InsertFocusSession = z.infer<typeof insertFocusSessionSchema>;
export type FocusSession = typeof focusSessions.$inferSelect;
export type InsertCreatorIdea = z.infer<typeof insertCreatorIdeaSchema>;
export type CreatorIdea = typeof creatorIdeas.$inferSelect;
export type InsertEditingTask = z.infer<typeof insertEditingTaskSchema>;
export type EditingTask = typeof editingTasks.$inferSelect;
export type InsertBrandDeal = z.infer<typeof insertBrandDealSchema>;
export type BrandDeal = typeof brandDeals.$inferSelect;
