import { pgTable, serial, text, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const eventTypeEnum = pgEnum("event_type", ["conference", "workshop", "meetup", "online", "other"]);

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  endDate: text("end_date"),
  location: text("location").notNull(),
  type: eventTypeEnum("type").notNull().default("other"),
  coverImage: text("cover_image"),
  registrationOpen: boolean("registration_open").notNull().default(true),
  maxAttendees: integer("max_attendees"),
  registeredCount: integer("registered_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const eventRegistrationsTable = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertEventSchema = createInsertSchema(eventsTable).omit({ id: true, createdAt: true, registeredCount: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof eventsTable.$inferSelect;
