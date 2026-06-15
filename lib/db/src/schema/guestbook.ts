import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const guestbookTable = pgTable("guestbook", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  country: text("country"),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGuestbookSchema = createInsertSchema(guestbookTable).omit({ id: true, createdAt: true, approved: true });
export type InsertGuestbook = z.infer<typeof insertGuestbookSchema>;
export type GuestbookEntry = typeof guestbookTable.$inferSelect;
