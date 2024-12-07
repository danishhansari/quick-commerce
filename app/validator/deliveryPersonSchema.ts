import { z } from "zod";

export const deliveryPersonSchema = z.object({
  name: z.string(),
  phone: z.string().length(13),
  warehouseId: z.number(),
});
