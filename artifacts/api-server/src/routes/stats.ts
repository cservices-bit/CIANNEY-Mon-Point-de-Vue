import { Router } from "express";
import { db, usersTable, articlesTable, videosTable, eventsTable, newsletterSubscribersTable } from "@workspace/db";
import { count, eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

// GET /stats/summary
router.get("/stats/summary", async (req, res) => {
  try {
    const [[articles], [videos], [events], [subscribers], [members]] = await Promise.all([
      db.select({ count: count() }).from(articlesTable).where(eq(articlesTable.published, true)),
      db.select({ count: count() }).from(videosTable),
      db.select({ count: count() }).from(eventsTable),
      db.select({ count: count() }).from(newsletterSubscribersTable).where(eq(newsletterSubscribersTable.active, true)),
      db.select({ count: count() }).from(usersTable).where(eq(usersTable.role, "member")),
    ]);
    res.json({
      totalArticles: Number(articles.count),
      totalVideos: Number(videos.count),
      totalEvents: Number(events.count),
      totalSubscribers: Number(subscribers.count),
      totalMembers: Number(members.count),
      totalViews: 150000,
    });
  } catch (err) {
    logger.error({ err }, "Stats error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
