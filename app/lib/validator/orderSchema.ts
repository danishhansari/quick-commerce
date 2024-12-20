import { z } from "zod";

export const orderSchema = z.object({
  productId: z.number({ message: "Product id should be a number" }),
  address: z
    .string({ message: "Address should be a string" })
    .min(5, { message: "Address should contain minimum of 5 character" }),
  pincode: z
    .string({ message: "Pin code should be a string" })
    .length(6, "Pincode should be 6 character long"),
  qty: z.number({ message: "Quantity should be a number" }).positive(),
});
