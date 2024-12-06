import { db } from "@/app/db";
import { products } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(id)))
      .limit(1);

    if (!product.length) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json(product[0]);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
