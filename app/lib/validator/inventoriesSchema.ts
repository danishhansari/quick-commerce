import { z } from "zod";

export const inventoriesSchema = z.object({
  sku: z
    .string({ message: "SKU should be a string" })
    .length(8, "SKU should be 8 character"),
  warehouse_id: z
    .number({ message: "Warehouse id should be number" })
    .positive({ message: "Warehouse id should be a postive number" }),
  order_id: z
    .number({ message: "Order id should be number" })
    .positive({ message: "Order id should be a postive number" }),
});
