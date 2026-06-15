import { Router } from "express";
import { db, productsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function toProduct(p: typeof productsTable.$inferSelect) {
  return { ...p, price: Number(p.price), createdAt: p.createdAt.toISOString() };
}

// GET /products
router.get("/products", async (req, res) => {
  try {
    const { type } = req.query as Record<string, string>;
    let query = db.select().from(productsTable).$dynamic();
    if (type && type !== "all") query = query.where(eq(productsTable.type, type as "ebook" | "formation" | "service"));
    const products = await query.orderBy(desc(productsTable.createdAt));
    res.json(products.map(toProduct));
  } catch (err) {
    logger.error({ err }, "List products error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /products/:id
router.get("/products/:id", async (req, res) => {
  try {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, parseInt(req.params.id))).limit(1);
    if (!product) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toProduct(product));
  } catch (err) {
    logger.error({ err }, "Get product error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /products
router.post("/products", requireAdmin, async (req, res) => {
  try {
    const [product] = await db.insert(productsTable).values(req.body).returning();
    res.status(201).json(toProduct(product));
  } catch (err) {
    logger.error({ err }, "Create product error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /products/:id
router.patch("/products/:id", requireAdmin, async (req, res) => {
  try {
    const [product] = await db.update(productsTable).set(req.body).where(eq(productsTable.id, parseInt(req.params.id))).returning();
    if (!product) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toProduct(product));
  } catch (err) {
    logger.error({ err }, "Update product error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /products/:id
router.delete("/products/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(productsTable).where(eq(productsTable.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Delete product error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
