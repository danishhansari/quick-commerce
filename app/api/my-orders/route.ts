import { authOptions } from "@/app/lib/auth/authOptions";
import { db } from "@/app/lib/db";
import { orders, products, users } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export const GET = async (request: Request) => {
  const { token } = await getServerSession(authOptions);

  const userOrders = await db
    .select({
      id: orders.id,
      qty: orders.qty,
      status: orders.status,
      price: orders.price,
      product: products.name,
      productImage: products.image,
      description: products.description,
      createdAt: orders.created_at,
    })
    .from(orders)
    .leftJoin(users, eq(orders.user_id, users.id))
    .leftJoin(products, eq(orders.product_id, products.id));

  console.log(userOrders);
  return Response.json(userOrders, { status: 200 });
};
