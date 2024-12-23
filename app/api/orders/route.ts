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
import { getServerSession } from "next-auth";
import { eq, and, isNull, inArray } from "drizzle-orm";
import crypto from "crypto";
import { razorPayInstance } from "@/app/lib/constant/razorpayInstance";

export async function POST(request: Request) {
  // get session
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Not allowed" }, { status: 401 });
  }

  // validate request body
  const requestData = await request.json();
  let validatedData;

  try {
    validatedData = await orderSchema.parse(requestData);
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }

  // Order creation.

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
    .where(eq(products.id, validatedData.product_id))
    .limit(1);

  if (!foundProducts.length) {
    return Response.json({ message: "No product found" }, { status: 400 });
  }
  let transactionError: string = "";
  let finalOrder: any = null;

  try {
    finalOrder = await db.transaction(async (tnx) => {
      // create order
      const order = await tnx
        .insert(orders)
        .values({
          ...validatedData,
          // @ts-ignore
          user_id: Number(session.token.id),
          price: foundProducts[0].price * validatedData.qty,
          // todo: move all statuses to enum or const
          status: "received",
        })
        .returning({ id: orders.id, price: orders.price });

      // check stock

      const availableStock = await tnx
        .select()
        .from(inventories)
        .where(
          and(
            eq(inventories.warehouse_id, warehouseResult[0].id),
            eq(inventories.product_id, validatedData.product_id),
            isNull(inventories.order_id)
          )
        )
        .limit(validatedData.qty)
        .for("update", { skipLocked: true });

      if (availableStock.length < validatedData.qty) {
        transactionError = `Stock is low, only ${availableStock.length} products available`;
        tnx.rollback();
        return;
      }

      // check delivery person availibility
      const availablePersons = await tnx
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

      if (!availablePersons.length) {
        transactionError = `Delivery person is not available at the moment`;
        tnx.rollback();
        return;
      }

      // stock is available and delivery person is available
      // update inventories table and add order_id
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
        .where(eq(deliveryPerson.id, availablePersons[0].id));

      // update order
      await tnx
        .update(orders)
        .set({ status: "COD" })
        .where(eq(orders.id, order[0].id));

      return order[0];
    });
  } catch (err) {
    // log
    // in production -> be careful don't return internal errors to the client.
    console.log(err);
    return Response.json(
      {
        message: transactionError
          ? transactionError
          : "Error while db transaction",
      },
      { status: 500 }
    );
  }
  const options = {
    amount: finalOrder.price * 100,
    currency: "INR",
    receipt: crypto.randomUUID(),
  };
  const order = await razorPayInstance.orders.create(options);
  return Response.json({ message: "It is worked", order });
}
