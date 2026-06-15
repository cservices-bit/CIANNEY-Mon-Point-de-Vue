import { Router } from "express";
import { db, contactMessagesTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toContact(c: typeof contactMessagesTable.$inferSelect) {
  return { ...c, createdAt: c.createdAt.toISOString() };
}

// POST /contact
router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message, phone, type } = req.body;
    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    await db.insert(contactMessagesTable).values({ name, email, subject, message, phone, type: type ?? "general" });
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    logger.error({ err }, "Contact error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /contact/messages
router.get("/contact/messages", requireAdmin, async (req, res) => {
  try {
    const messages = await db.select().from(contactMessagesTable).orderBy(desc(contactMessagesTable.createdAt));
    res.json(messages.map(toContact));
  } catch (err) {
    logger.error({ err }, "List contact messages error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
