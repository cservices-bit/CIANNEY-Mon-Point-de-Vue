import { Router } from "express";
import { db, eventsTable, eventRegistrationsTable } from "@workspace/db";
import { eq, gte, desc, sql } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toEvent(e: typeof eventsTable.$inferSelect) {
  return { ...e, createdAt: e.createdAt.toISOString() };
}

// GET /events
router.get("/events", async (req, res) => {
  try {
    const events = await db.select().from(eventsTable).orderBy(desc(eventsTable.date));
    res.json(events.map(toEvent));
  } catch (err) {
    logger.error({ err }, "List events error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /events/upcoming
router.get("/events/upcoming", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const events = await db.select().from(eventsTable)
      .where(gte(eventsTable.date, today))
      .orderBy(eventsTable.date)
      .limit(5);
    res.json(events.map(toEvent));
  } catch (err) {
    logger.error({ err }, "Upcoming events error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /events/:id
router.get("/events/:id", async (req, res) => {
  try {
    const [event] = await db.select().from(eventsTable).where(eq(eventsTable.id, parseInt(req.params.id))).limit(1);
    if (!event) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toEvent(event));
  } catch (err) {
    logger.error({ err }, "Get event error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /events
router.post("/events", requireAdmin, async (req, res) => {
  try {
    const [event] = await db.insert(eventsTable).values(req.body).returning();
    res.status(201).json(toEvent(event));
  } catch (err) {
    logger.error({ err }, "Create event error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /events/:id
router.patch("/events/:id", requireAdmin, async (req, res) => {
  try {
    const [event] = await db.update(eventsTable).set(req.body).where(eq(eventsTable.id, parseInt(req.params.id))).returning();
    if (!event) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toEvent(event));
  } catch (err) {
    logger.error({ err }, "Update event error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /events/:id
router.delete("/events/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(eventsTable).where(eq(eventsTable.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Delete event error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /events/:id/register
router.post("/events/:id/register", async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const { name, email, phone } = req.body;
    if (!name || !email) { res.status(400).json({ error: "Missing required fields" }); return; }
    await db.insert(eventRegistrationsTable).values({ eventId, name, email, phone });
    await db.update(eventsTable).set({ registeredCount: sql`registered_count + 1` }).where(eq(eventsTable.id, eventId));
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    logger.error({ err }, "Register for event error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
