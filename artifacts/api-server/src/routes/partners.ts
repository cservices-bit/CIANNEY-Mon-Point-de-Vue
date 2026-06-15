import { Router } from "express";
import { db, partnersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toPartner(p: typeof partnersTable.$inferSelect) {
  return { ...p, createdAt: p.createdAt.toISOString() };
}

// GET /partners
router.get("/partners", async (req, res) => {
  try {
    const partners = await db.select().from(partnersTable).orderBy(desc(partnersTable.createdAt));
    res.json(partners.map(toPartner));
  } catch (err) {
    logger.error({ err }, "List partners error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /partners
router.post("/partners", requireAdmin, async (req, res) => {
  try {
    const [partner] = await db.insert(partnersTable).values(req.body).returning();
    res.status(201).json(toPartner(partner));
  } catch (err) {
    logger.error({ err }, "Create partner error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /partners/:id
router.delete("/partners/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(partnersTable).where(eq(partnersTable.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Delete partner error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
