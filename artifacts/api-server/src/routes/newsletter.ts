import { Router } from "express";
import { db, newsletterSubscribersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toSubscriber(s: typeof newsletterSubscribersTable.$inferSelect) {
  return { ...s, createdAt: s.createdAt.toISOString() };
}

// POST /newsletter/subscribe
router.post("/newsletter/subscribe", async (req, res) => {
  try {
    const { email, name, lang } = req.body;
    if (!email) { res.status(400).json({ error: "Email required" }); return; }
    const existing = await db.select().from(newsletterSubscribersTable).where(eq(newsletterSubscribersTable.email, email)).limit(1);
    if (existing.length > 0) {
      res.status(201).json({ message: "Already subscribed" });
      return;
    }
    await db.insert(newsletterSubscribersTable).values({ email, name, lang: lang ?? "fr" });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    logger.error({ err }, "Subscribe newsletter error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /newsletter/subscribers
router.get("/newsletter/subscribers", requireAdmin, async (req, res) => {
  try {
    const subscribers = await db.select().from(newsletterSubscribersTable).orderBy(desc(newsletterSubscribersTable.createdAt));
    res.json(subscribers.map(toSubscriber));
  } catch (err) {
    logger.error({ err }, "List subscribers error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
