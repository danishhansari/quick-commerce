import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fname: varchar({ length: 100 }).notNull(),
  lname: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 100 }).notNull().unique(),
  provider: varchar({ length: 20 }).notNull(),
  external_id: varchar({ length: 100 }).notNull(),
  image: text().notNull(),
  role: varchar({ length: 12 }).notNull().default("customer"),
  updated_at: timestamp().defaultNow(),
  created_at: timestamp().defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  image: text(),
  description: text(),
  price: integer().notNull(),
  updated_at: timestamp().defaultNow(),
  created_at: timestamp().defaultNow(),
});
