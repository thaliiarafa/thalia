import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {
  users, tasks, events, habits, focusSessions, creatorIdeas, editingTasks, brandDeals,
  type User, type InsertUser,
  type Task, type InsertTask,
  type Event, type InsertEvent,
  type Habit, type InsertHabit,
  type FocusSession, type InsertFocusSession,
  type CreatorIdea, type InsertCreatorIdea,
  type EditingTask, type InsertEditingTask,
  type BrandDeal, type InsertBrandDeal,
} from "@shared/schema";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getTasks(list?: string): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<void>;

  getEvents(date?: string): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, updates: Partial<Event>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<void>;

  getHabits(date: string): Promise<Habit[]>;
  upsertHabit(habit: InsertHabit): Promise<Habit>;

  getFocusSessions(date?: string): Promise<FocusSession[]>;
  createFocusSession(session: InsertFocusSession): Promise<FocusSession>;

  getCreatorIdeas(): Promise<CreatorIdea[]>;
  createCreatorIdea(idea: InsertCreatorIdea): Promise<CreatorIdea>;
  updateCreatorIdea(id: string, updates: Partial<CreatorIdea>): Promise<CreatorIdea | undefined>;
  deleteCreatorIdea(id: string): Promise<void>;

  getEditingTasks(): Promise<EditingTask[]>;
  createEditingTask(task: InsertEditingTask): Promise<EditingTask>;
  updateEditingTask(id: string, updates: Partial<EditingTask>): Promise<EditingTask | undefined>;
  deleteEditingTask(id: string): Promise<void>;

  getBrandDeals(): Promise<BrandDeal[]>;
  createBrandDeal(deal: InsertBrandDeal): Promise<BrandDeal>;
  updateBrandDeal(id: string, updates: Partial<BrandDeal>): Promise<BrandDeal | undefined>;
  deleteBrandDeal(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username: string) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  async createUser(user: InsertUser) {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async getTasks(list?: string) {
    if (list) return db.select().from(tasks).where(eq(tasks.list, list));
    return db.select().from(tasks);
  }
  async getTask(id: string) {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task;
  }
  async createTask(task: InsertTask) {
    const [created] = await db.insert(tasks).values(task).returning();
    return created;
  }
  async updateTask(id: string, updates: Partial<Task>) {
    const [updated] = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
    return updated;
  }
  async deleteTask(id: string) {
    await db.delete(tasks).where(eq(tasks.id, id));
  }

  async getEvents(date?: string) {
    if (date) return db.select().from(events).where(eq(events.date, date));
    return db.select().from(events);
  }
  async getEvent(id: string) {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }
  async createEvent(event: InsertEvent) {
    const [created] = await db.insert(events).values(event).returning();
    return created;
  }
  async updateEvent(id: string, updates: Partial<Event>) {
    const [updated] = await db.update(events).set(updates).where(eq(events.id, id)).returning();
    return updated;
  }
  async deleteEvent(id: string) {
    await db.delete(events).where(eq(events.id, id));
  }

  async getHabits(date: string) {
    return db.select().from(habits).where(eq(habits.date, date));
  }
  async upsertHabit(habit: InsertHabit) {
    const existing = await db.select().from(habits).where(
      and(eq(habits.habitKey, habit.habitKey), eq(habits.date, habit.date))
    );
    if (existing.length > 0) {
      const [updated] = await db.update(habits)
        .set({ value: habit.value })
        .where(eq(habits.id, existing[0].id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(habits).values(habit).returning();
    return created;
  }

  async getFocusSessions(date?: string) {
    if (date) return db.select().from(focusSessions).where(eq(focusSessions.date, date));
    return db.select().from(focusSessions);
  }
  async createFocusSession(session: InsertFocusSession) {
    const [created] = await db.insert(focusSessions).values(session).returning();
    return created;
  }

  async getCreatorIdeas() {
    return db.select().from(creatorIdeas);
  }
  async createCreatorIdea(idea: InsertCreatorIdea) {
    const [created] = await db.insert(creatorIdeas).values(idea).returning();
    return created;
  }
  async updateCreatorIdea(id: string, updates: Partial<CreatorIdea>) {
    const [updated] = await db.update(creatorIdeas).set(updates).where(eq(creatorIdeas.id, id)).returning();
    return updated;
  }
  async deleteCreatorIdea(id: string) {
    await db.delete(creatorIdeas).where(eq(creatorIdeas.id, id));
  }

  async getEditingTasks() {
    return db.select().from(editingTasks);
  }
  async createEditingTask(task: InsertEditingTask) {
    const [created] = await db.insert(editingTasks).values(task).returning();
    return created;
  }
  async updateEditingTask(id: string, updates: Partial<EditingTask>) {
    const [updated] = await db.update(editingTasks).set(updates).where(eq(editingTasks.id, id)).returning();
    return updated;
  }
  async deleteEditingTask(id: string) {
    await db.delete(editingTasks).where(eq(editingTasks.id, id));
  }

  async getBrandDeals() {
    return db.select().from(brandDeals);
  }
  async createBrandDeal(deal: InsertBrandDeal) {
    const [created] = await db.insert(brandDeals).values(deal).returning();
    return created;
  }
  async updateBrandDeal(id: string, updates: Partial<BrandDeal>) {
    const [updated] = await db.update(brandDeals).set(updates).where(eq(brandDeals.id, id)).returning();
    return updated;
  }
  async deleteBrandDeal(id: string) {
    await db.delete(brandDeals).where(eq(brandDeals.id, id));
  }
}

export const storage = new DatabaseStorage();
