import { Router } from "express";
import { db, testimonialsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toTestimonial(t: typeof testimonialsTable.$inferSelect) {
  return { ...t, createdAt: t.createdAt.toISOString() };
}

// GET /testimonials
router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await db.select().from(testimonialsTable)
      .where(eq(testimonialsTable.status, "approved"))
      .orderBy(desc(testimonialsTable.createdAt));
    res.json(testimonials.map(toTestimonial));
  } catch (err) {
    logger.error({ err }, "List testimonials error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /testimonials
router.post("/testimonials", async (req, res) => {
  try {
    const { authorName, authorTitle, authorAvatar, content, rating } = req.body;
    if (!authorName || !authorTitle || !content) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const [testimonial] = await db.insert(testimonialsTable).values({
      authorName, authorTitle, authorAvatar, content, rating: rating ?? 5,
    }).returning();
    res.status(201).json(toTestimonial(testimonial));
  } catch (err) {
    logger.error({ err }, "Create testimonial error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /testimonials/:id
router.patch("/testimonials/:id", requireAdmin, async (req, res) => {
  try {
    const [t] = await db.update(testimonialsTable).set(req.body).where(eq(testimonialsTable.id, parseInt(req.params.id))).returning();
    if (!t) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toTestimonial(t));
  } catch (err) {
    logger.error({ err }, "Update testimonial error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /testimonials/:id
router.delete("/testimonials/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(testimonialsTable).where(eq(testimonialsTable.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Delete testimonial error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
