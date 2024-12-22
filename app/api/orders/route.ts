import { authOptions } from "@/app/lib/auth/authOptions";
import { db } from "@/app/lib/db";
import {
  deliveryPerson,
  inventories,
  orders,
  products,
  warehouses,
} from "@/app/lib/db/schema";
import { orderSchema } from "@/app/lib/validator/orderSchema";
import getServerSession from "next-auth";
import { eq, and, isNull, inArray } from "drizzle-orm";

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

  let transactionErr: string = "";
  let finalOrder: any = null;
  try {
    finalOrder = await db.transaction(async (tnx) => {
      // Placing an order
      const order = await tnx
        .insert(orders)
        // @ts-ignore
        .values({
          ...validatedData,
          user_id: session.token.id,
          price: foundProducts[0].price * validatedData.qty,
          status: "received",
        })
        .returning({ id: orders.id, price: orders.price });

      const availableStock = await tnx
        .select()
        .from(inventories)
        .where(
          and(
            eq(inventories.warehouse_id, warehouseResult[0].id),
            eq(inventories.product_id, validatedData.productId),
            isNull(inventories.order_id)
          )
        )
        .limit(validatedData.qty)
        .for("update", { skipLocked: true });

      if (availableStock.length < validatedData.qty) {
        transactionErr = `Stock is low, only ${availableStock.length} products available`;
        tnx.rollback();
        return;
      }

      // check delivery person available

      const availablePerson = await tnx
        .select()
        .from(deliveryPerson)
        .where(
          and(
            isNull(deliveryPerson.order_id),
            eq(deliveryPerson.warehouse_id, warehouseResult[0].id)
          )
        )
        .for("update")
        .limit(1);

      if (!availablePerson) {
        transactionErr = `Delivery person is not available at this moment`;
        tnx.rollback();
        return;
      }

      // stock is available and delivery person is availale
      // update inventories table and order_id

      await tnx
        .update(inventories)
        .set({ order_id: order[0].id })
        .where(
          inArray(
            inventories.id,
            availableStock.map((stock) => stock.id)
          )
        );

      // update delivery person

      await tnx
        .update(deliveryPerson)
        .set({ order_id: order[0].id })
        .where(eq(deliveryPerson.id, availablePerson[0].id));

      await tnx
        .update(orders)
        .set({ status: "reserved" })
        .where(eq(orders.id, order[0].id));

      return order[0];
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: transactionErr ? transactionErr : "Error while db transaction",
      },
      { status: 500 }
    );
  }
  
}
