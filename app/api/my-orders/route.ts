import { authOptions } from "@/app/lib/auth/authOptions";
import { db } from "@/app/lib/db";
import { orders, products, users } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export const GET = async (request: Request) => {
  const { token } = await getServerSession(authOptions);

  if (!token) {
    return Response.json({ message: "Please logged in" }, { status: 400 });
  }

  try {
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
      .where(eq(orders.user_id, Number(token.id)))
      .leftJoin(users, eq(orders.user_id, users.id))
      .leftJoin(products, eq(orders.product_id, products.id));
    return Response.json(userOrders, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
