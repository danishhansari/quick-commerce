import { z } from "zod";

export const deliveryPersonSchema = z.object({
  name: z.string({ message: "Name should be string" }),
  phone: z
    .string({ message: "Phone number should be string" })
    .length(13, "Phone number must be 10 character + starts with +91"),
  warehouse_id: z.number({ message: "Warehouse should be a number" }),
});
