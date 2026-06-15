import { Router } from "express";
import { db, articlesTable } from "@workspace/db";
import { eq, desc, like, and, or } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toArticle(a: typeof articlesTable.$inferSelect) {
  return {
    ...a,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt ? a.updatedAt.toISOString() : null,
  };
}

// GET /articles
router.get("/articles", async (req, res) => {
  try {
    const { category, search, lang, limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions = [eq(articlesTable.published, true)];
    if (category) conditions.push(eq(articlesTable.category, category));
    if (lang) conditions.push(eq(articlesTable.lang, lang as "fr" | "en"));
    if (search) conditions.push(or(like(articlesTable.title, `%${search}%`), like(articlesTable.excerpt, `%${search}%`))!);
    const articles = await db.select().from(articlesTable)
      .where(and(...conditions))
      .orderBy(desc(articlesTable.createdAt))
      .limit(parseInt(limit))
      .offset(parseInt(offset));
    res.json(articles.map(toArticle));
  } catch (err) {
    logger.error({ err }, "List articles error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /articles/featured
router.get("/articles/featured", async (req, res) => {
  try {
    const articles = await db.select().from(articlesTable)
      .where(and(eq(articlesTable.published, true), eq(articlesTable.featured, true)))
      .orderBy(desc(articlesTable.createdAt))
      .limit(6);
    res.json(articles.map(toArticle));
  } catch (err) {
    logger.error({ err }, "Featured articles error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /articles/:id
router.get("/articles/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [article] = await db.select().from(articlesTable).where(eq(articlesTable.id, id)).limit(1);
    if (!article) { res.status(404).json({ error: "Not found" }); return; }
    // Increment views
    await db.update(articlesTable).set({ views: (article.views ?? 0) + 1 }).where(eq(articlesTable.id, id));
    res.json(toArticle(article));
  } catch (err) {
    logger.error({ err }, "Get article error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /articles
router.post("/articles", requireAdmin, async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, lang, coverImage, published, featured } = req.body;
    if (!title || !slug || !excerpt || !content || !category || !lang) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const [article] = await db.insert(articlesTable).values({
      title, slug, excerpt, content, category, lang, coverImage, published: published ?? false, featured: featured ?? false,
    }).returning();
    res.status(201).json(toArticle(article));
  } catch (err) {
    logger.error({ err }, "Create article error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /articles/:id
router.patch("/articles/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [article] = await db.update(articlesTable).set({ ...req.body, updatedAt: new Date() }).where(eq(articlesTable.id, id)).returning();
    if (!article) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toArticle(article));
  } catch (err) {
    logger.error({ err }, "Update article error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /articles/:id
router.delete("/articles/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(articlesTable).where(eq(articlesTable.id, id));
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Delete article error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
