import { Router } from "express";
import { db, achievementsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toAchievement(a: typeof achievementsTable.$inferSelect) {
  return { ...a, createdAt: a.createdAt.toISOString() };
}

// GET /achievements
router.get("/achievements", async (req, res) => {
  try {
    const achievements = await db.select().from(achievementsTable).orderBy(desc(achievementsTable.date));
    res.json(achievements.map(toAchievement));
  } catch (err) {
    logger.error({ err }, "List achievements error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /achievements
router.post("/achievements", requireAdmin, async (req, res) => {
  try {
    const [achievement] = await db.insert(achievementsTable).values(req.body).returning();
    res.status(201).json(toAchievement(achievement));
  } catch (err) {
    logger.error({ err }, "Create achievement error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
