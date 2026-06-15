import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { encryptToken, requireAuth } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router = Router();

function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString("hex");
}

function verifyPassword(password: string, salt: string, hash: string): boolean {
  const buf = scryptSync(password, salt, 64);
  return timingSafeEqual(buf, Buffer.from(hash, "hex"));
}

// POST /auth/register
router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (existing.length > 0) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }
    const salt = randomBytes(16).toString("hex");
    const hash = hashPassword(password, salt);
    const passwordStored = `${salt}:${hash}`;
    const [user] = await db.insert(usersTable).values({
      email,
      password: passwordStored,
      name,
      role: "member",
    }).returning();
    const token = encryptToken(user.id);
    const { password: _, ...safeUser } = user;
    res.status(201).json({ user: { ...safeUser, createdAt: safeUser.createdAt.toISOString() }, token });
  } catch (err) {
    logger.error({ err }, "Register error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /auth/login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Missing email or password" });
      return;
    }
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const [salt, hash] = user.password.split(":");
    if (!verifyPassword(password, salt, hash)) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const token = encryptToken(user.id);
    const { password: _, ...safeUser } = user;
    res.json({ user: { ...safeUser, createdAt: safeUser.createdAt.toISOString() }, token });
  } catch (err) {
    logger.error({ err }, "Login error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /auth/logout
router.post("/auth/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// GET /auth/me
router.get("/auth/me", requireAuth, (req, res) => {
  const user = (req as any).user;
  const { password: _, ...safeUser } = user;
  res.json({ ...safeUser, createdAt: safeUser.createdAt.toISOString() });
});

export default router;
