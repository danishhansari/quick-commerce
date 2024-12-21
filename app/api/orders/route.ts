import { authOptions } from "@/app/lib/auth/authOptions";
import { db } from "@/app/lib/db";
import { inventories, orders, products, warehouses } from "@/app/lib/db/schema";
import { orderSchema } from "@/app/lib/validator/orderSchema";
import getServerSession from "next-auth";
import { eq, and } from "drizzle-orm";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return Response.json(
      { message: "Not allowed to place order" },
      { status: 400 }
    );
  }

  const requestData = await request.json();

  // validate zod

  let validatedData;

  try {
    validatedData = orderSchema.parse(requestData);
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  // order creation
  const warehouseResult = await db
    .select({ id: warehouses.id })
    .from(warehouses)
    .where(eq(warehouses.pincode, validatedData.pincode));

  if (!warehouseResult.length) {
    return Response.json({ message: "No warehouse found" }, { status: 400 });
  }

  const foundProducts = await db
    .select()
    .from(products)
    .where(eq(products.id, validatedData.productId))
    .limit(1);

  if (!foundProducts.length) {
    return Response.json({ message: "No product found" }, { status: 400 });
  }

  try {
    const finalOrder = await db.transaction(async (tnx) => {
      // Placing an order
      const order = await tnx
        .insert(orders)
        // @ts-ignore
        .values({
          ...validatedData,
          userId: session.token.id,
          price: foundProducts[0].price * validatedData.qty,
          status: "received",
        })
        .returning({ id: orders.id, price: orders.price });

      const availableStock = await tnx
        .select()
        .from(inventories)
        .where(and(eq(inventories.warehouse_id)));
    });
  } catch (error) {}
}
