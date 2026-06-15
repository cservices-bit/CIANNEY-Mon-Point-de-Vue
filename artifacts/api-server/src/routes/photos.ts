import { Router } from "express";
import { db, photosTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toPhoto(p: typeof photosTable.$inferSelect) {
  return { ...p, createdAt: p.createdAt.toISOString() };
}

// GET /photos
router.get("/photos", async (req, res) => {
  try {
    const { album, limit = "50" } = req.query as Record<string, string>;
    let query = db.select().from(photosTable).$dynamic();
    if (album) query = query.where(eq(photosTable.album, album));
    const photos = await query.orderBy(desc(photosTable.createdAt)).limit(parseInt(limit));
    res.json(photos.map(toPhoto));
  } catch (err) {
    logger.error({ err }, "List photos error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /photos
router.post("/photos", requireAdmin, async (req, res) => {
  try {
    const [photo] = await db.insert(photosTable).values(req.body).returning();
    res.status(201).json(toPhoto(photo));
  } catch (err) {
    logger.error({ err }, "Create photo error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /photos/:id
router.delete("/photos/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(photosTable).where(eq(photosTable.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Delete photo error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
