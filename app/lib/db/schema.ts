import {
  index,
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

export const warehouses = pgTable(
  "warehouses",
  {
    id: serial("id").primaryKey(),
    name: varchar({ length: 100 }).notNull(),
    pincode: varchar({ length: 6 }).notNull(),
    updated_at: timestamp().defaultNow(),
    created_at: timestamp().defaultNow(),
  },
  (table) => {
    return {
      pincodeIndex: index("pincode_index").on(table.pincode),
    };
  }
);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  product_id: integer("product_id")
    .references(() => products.id, {
      onDelete: "no action",
    })
    .notNull(),
  status: varchar({ length: 10 }).notNull(),
  type: varchar({ length: 6 }).default("quick"),
  price: integer().notNull(),
  address: text().notNull(),
  qty: integer().notNull(),
  updated_at: timestamp().defaultNow(),
  created_at: timestamp().defaultNow(),
});

export const deliveryPerson = pgTable("delivery_person", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  phone: varchar({ length: 13 }).notNull(),
  warehouse_id: integer("warehouse_id").references(() => warehouses.id, {
    onDelete: "cascade",
  }),
  order_id: integer("order_id").references(() => orders.id, {
    onDelete: "set null",
  }),
  updated_at: timestamp().defaultNow(),
  created_at: timestamp().defaultNow(),
});

export const inventories = pgTable("inventories", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => orders.id, {
    onDelete: "set null",
  }),
  warehouse_id: integer("warehouse_id").references(() => warehouses.id, {
    onDelete: "cascade",
  }),
  product_id: integer("product_id").references(() => products.id, {
    onDelete: "cascade",
  }),
  sku: varchar({ length: 8 }).notNull(),
  updated_at: timestamp().defaultNow(),
  created_at: timestamp().defaultNow(),
});
