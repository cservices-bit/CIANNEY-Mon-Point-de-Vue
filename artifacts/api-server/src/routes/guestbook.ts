import { Router } from "express";
import { db, guestbookTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

function toEntry(e: typeof guestbookTable.$inferSelect) {
  return { ...e, createdAt: e.createdAt.toISOString() };
}

// GET /guestbook
router.get("/guestbook", async (req, res) => {
  try {
    const entries = await db.select().from(guestbookTable)
      .where(eq(guestbookTable.approved, true))
      .orderBy(desc(guestbookTable.createdAt));
    res.json(entries.map(toEntry));
  } catch (err) {
    logger.error({ err }, "List guestbook error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /guestbook
router.post("/guestbook", async (req, res) => {
  try {
    const { name, message, country } = req.body;
    if (!name || !message) { res.status(400).json({ error: "Missing required fields" }); return; }
    const [entry] = await db.insert(guestbookTable).values({ name, message, country }).returning();
    res.status(201).json(toEntry(entry));
  } catch (err) {
    logger.error({ err }, "Create guestbook entry error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
