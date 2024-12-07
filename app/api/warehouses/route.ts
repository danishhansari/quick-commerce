import { db } from "@/app/lib/db";
import { warehouses } from "@/app/lib/db/schema";
import { warehouseSchema } from "@/app/lib/validator/warehouseSchema";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
  const data = await request.json();

  let validatedData;

  try {
    validatedData = await warehouseSchema.parse(data);
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  try {
    await db.insert(warehouses).values(validatedData);
    return Response.json({ message: "OK" }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Failed to store the warehouse" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const allWarehouses = await db.select().from(warehouses);
    //   .orderBy(desc(warehouses.created));

    return Response.json(allWarehouses, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
