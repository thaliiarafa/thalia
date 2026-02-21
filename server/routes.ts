import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertTaskSchema, insertEventSchema, insertHabitSchema,
  insertFocusSessionSchema, insertCreatorIdeaSchema,
  insertEditingTaskSchema, insertBrandDealSchema
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ─── Tasks ───────────────────────────────────────────
  app.get("/api/tasks", async (req, res) => {
    const list = req.query.list as string | undefined;
    const result = await storage.getTasks(list);
    res.json(result);
  });

  app.post("/api/tasks", async (req, res) => {
    const parsed = insertTaskSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
    const task = await storage.createTask(parsed.data);
    res.status(201).json(task);
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    const updated = await storage.updateTask(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    await storage.deleteTask(req.params.id);
    res.status(204).send();
  });

  // ─── Events ──────────────────────────────────────────
  app.get("/api/events", async (req, res) => {
    const date = req.query.date as string | undefined;
    const result = await storage.getEvents(date);
    res.json(result);
  });

  app.post("/api/events", async (req, res) => {
    const parsed = insertEventSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
    const event = await storage.createEvent(parsed.data);
    res.status(201).json(event);
  });

  app.patch("/api/events/:id", async (req, res) => {
    const updated = await storage.updateEvent(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Event not found" });
    res.json(updated);
  });

  app.delete("/api/events/:id", async (req, res) => {
    await storage.deleteEvent(req.params.id);
    res.status(204).send();
  });

  // ─── Habits ──────────────────────────────────────────
  app.get("/api/habits", async (req, res) => {
    const date = (req.query.date as string) || new Date().toISOString().split("T")[0];
    const result = await storage.getHabits(date);
    res.json(result);
  });

  app.post("/api/habits", async (req, res) => {
    const parsed = insertHabitSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
    const habit = await storage.upsertHabit(parsed.data);
    res.json(habit);
  });

  // ─── Focus Sessions ─────────────────────────────────
  app.get("/api/focus-sessions", async (req, res) => {
    const date = req.query.date as string | undefined;
    const result = await storage.getFocusSessions(date);
    res.json(result);
  });

  app.post("/api/focus-sessions", async (req, res) => {
    const parsed = insertFocusSessionSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
    const session = await storage.createFocusSession(parsed.data);
    res.status(201).json(session);
  });

  // ─── Creator Ideas ──────────────────────────────────
  app.get("/api/creator-ideas", async (_req, res) => {
    const result = await storage.getCreatorIdeas();
    res.json(result);
  });

  app.post("/api/creator-ideas", async (req, res) => {
    const parsed = insertCreatorIdeaSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
    const idea = await storage.createCreatorIdea(parsed.data);
    res.status(201).json(idea);
  });

  app.patch("/api/creator-ideas/:id", async (req, res) => {
    const updated = await storage.updateCreatorIdea(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Idea not found" });
    res.json(updated);
  });

  app.delete("/api/creator-ideas/:id", async (req, res) => {
    await storage.deleteCreatorIdea(req.params.id);
    res.status(204).send();
  });

  // ─── Editing Tasks ──────────────────────────────────
  app.get("/api/editing-tasks", async (_req, res) => {
    const result = await storage.getEditingTasks();
    res.json(result);
  });

  app.post("/api/editing-tasks", async (req, res) => {
    const parsed = insertEditingTaskSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
    const task = await storage.createEditingTask(parsed.data);
    res.status(201).json(task);
  });

  app.patch("/api/editing-tasks/:id", async (req, res) => {
    const updated = await storage.updateEditingTask(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Editing task not found" });
    res.json(updated);
  });

  app.delete("/api/editing-tasks/:id", async (req, res) => {
    await storage.deleteEditingTask(req.params.id);
    res.status(204).send();
  });

  // ─── Brand Deals ────────────────────────────────────
  app.get("/api/brand-deals", async (_req, res) => {
    const result = await storage.getBrandDeals();
    res.json(result);
  });

  app.post("/api/brand-deals", async (req, res) => {
    const parsed = insertBrandDealSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
    const deal = await storage.createBrandDeal(parsed.data);
    res.status(201).json(deal);
  });

  app.patch("/api/brand-deals/:id", async (req, res) => {
    const updated = await storage.updateBrandDeal(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Brand deal not found" });
    res.json(updated);
  });

  app.delete("/api/brand-deals/:id", async (req, res) => {
    await storage.deleteBrandDeal(req.params.id);
    res.status(204).send();
  });

  return httpServer;
}
