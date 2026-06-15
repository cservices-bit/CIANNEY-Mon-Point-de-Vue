import { Router } from "express";
import { db, videosTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toVideo(v: typeof videosTable.$inferSelect) {
  return { ...v, createdAt: v.createdAt.toISOString() };
}

// GET /videos
router.get("/videos", async (req, res) => {
  try {
    const { platform, category, limit = "20" } = req.query as Record<string, string>;
    let query = db.select().from(videosTable).$dynamic();
    if (platform && platform !== "all") {
      query = query.where(eq(videosTable.platform, platform as "youtube" | "tiktok"));
    }
    const videos = await query.orderBy(desc(videosTable.createdAt)).limit(parseInt(limit));
    res.json(videos.map(toVideo));
  } catch (err) {
    logger.error({ err }, "List videos error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /videos/latest
router.get("/videos/latest", async (req, res) => {
  try {
    const videos = await db.select().from(videosTable).orderBy(desc(videosTable.createdAt)).limit(6);
    res.json(videos.map(toVideo));
  } catch (err) {
    logger.error({ err }, "Latest videos error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /videos/:id
router.get("/videos/:id", async (req, res) => {
  try {
    const [video] = await db.select().from(videosTable).where(eq(videosTable.id, parseInt(req.params.id))).limit(1);
    if (!video) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toVideo(video));
  } catch (err) {
    logger.error({ err }, "Get video error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /videos
router.post("/videos", requireAdmin, async (req, res) => {
  try {
    const [video] = await db.insert(videosTable).values(req.body).returning();
    res.status(201).json(toVideo(video));
  } catch (err) {
    logger.error({ err }, "Create video error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /videos/:id
router.patch("/videos/:id", requireAdmin, async (req, res) => {
  try {
    const [video] = await db.update(videosTable).set(req.body).where(eq(videosTable.id, parseInt(req.params.id))).returning();
    if (!video) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toVideo(video));
  } catch (err) {
    logger.error({ err }, "Update video error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /videos/:id
router.delete("/videos/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(videosTable).where(eq(videosTable.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Delete video error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
