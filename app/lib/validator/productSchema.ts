import { z } from "zod";

const isServer = typeof window === "undefined";

export const productSchema = z.object({
  name: z.string({ message: "Product name should be a string" }).min(4),
  image: z.instanceof(isServer ? File : FileList, {
    message: "Product image should be a file",
  }),
  description: z
    .string({ message: "Product description should be a string" })
    .min(4),
  price: z.number({ message: "Price should be a number" }).positive(),
});
