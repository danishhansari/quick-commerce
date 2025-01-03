import { authOptions } from "@/app/lib/auth/authOptions";
import { db } from "@/app/lib/db";
import { inventories, products, warehouses } from "@/app/lib/db/schema";
import { inventoriesSchema } from "@/app/lib/validator/inventoriesSchema";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Not allowed" }, { status: 401 });
  }

  const requestData = await request.json();
  console.log(requestData);
  let validatedData;

  try {
    validatedData = inventoriesSchema.parse(requestData);
    console.log(validatedData);
  } catch (error) {
    console.log(error);
    return Response.json({ message: error }, { status: 400 });
  }

  try {
    const insert = await db.insert(inventories).values(validatedData);
    console.log(insert);
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Failed to store the inventory into the database",
      },
      { status: 500 }
    );
  }

  return Response.json({ message: "OK" }, { status: 201 });
}

export async function GET(request: Request) {
  try {
    const allInventories = await db
      .select({
        id: inventories.id,
        sku: inventories.sku,
        warehouse: warehouses.name,
        product: products.name,
      })
      .from(inventories)
      .leftJoin(warehouses, eq(inventories.warehouse_id, warehouses.id))
      .leftJoin(products, eq(inventories.product_id, products.id))
      .orderBy(desc(inventories.id));

    return Response.json(allInventories, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch inventories" },
      { status: 500 }
    );
  }
}
