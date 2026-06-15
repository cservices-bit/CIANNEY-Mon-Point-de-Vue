import { Router } from "express";
import { db, commentsTable } from "@workspace/db";
import { eq, desc, and } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toComment(c: typeof commentsTable.$inferSelect) {
  return { ...c, createdAt: c.createdAt.toISOString() };
}

// GET /comments
router.get("/comments", async (req, res) => {
  try {
    const { articleId, status } = req.query as Record<string, string>;
    const conditions = [];
    if (articleId) conditions.push(eq(commentsTable.articleId, parseInt(articleId)));
    if (status) conditions.push(eq(commentsTable.status, status as "pending" | "approved" | "rejected"));
    else conditions.push(eq(commentsTable.status, "approved"));
    const comments = await db.select().from(commentsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(commentsTable.createdAt));
    res.json(comments.map(toComment));
  } catch (err) {
    logger.error({ err }, "List comments error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /comments
router.post("/comments", async (req, res) => {
  try {
    const { authorName, authorEmail, content, articleId } = req.body;
    if (!authorName || !authorEmail || !content || !articleId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const [comment] = await db.insert(commentsTable).values({ authorName, authorEmail, content, articleId }).returning();
    res.status(201).json(toComment(comment));
  } catch (err) {
    logger.error({ err }, "Create comment error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /comments/:id
router.patch("/comments/:id", requireAdmin, async (req, res) => {
  try {
    const [comment] = await db.update(commentsTable).set(req.body).where(eq(commentsTable.id, parseInt(req.params.id))).returning();
    if (!comment) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toComment(comment));
  } catch (err) {
    logger.error({ err }, "Update comment error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /comments/:id
router.delete("/comments/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(commentsTable).where(eq(commentsTable.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Delete comment error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
