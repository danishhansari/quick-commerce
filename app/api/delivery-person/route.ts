import { db } from "@/app/db";
import { deliveryPerson, warehouses } from "@/app/db/schema";
import { deliveryPersonSchema } from "@/app/validator/deliveryPersonSchema";
import { warehouseSchema } from "@/app/validator/warehouseSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const data = await request.json();

  let validatedData;

  try {
    validatedData = deliveryPersonSchema.parse(data);
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  try {
    await db.insert(deliveryPerson).values({ ...validatedData });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to store product into the database",
      },
      { status: 500 }
    );
  }

  return Response.json({ message: "OK" }, { status: 201 });
}

export async function GET() {
  try {
    const deliveryAgents = await db
      .select({
        id: deliveryPerson.id,
        name: deliveryPerson.name,
        phone: deliveryPerson.phone,
        warehouse: warehouses.name,
      })
      .from(deliveryPerson)
      .leftJoin(warehouses, eq(deliveryPerson.warehouseId, warehouses.id))
      .orderBy(desc(deliveryPerson.id));
    return Response.json(deliveryAgents, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch the details of delivery person" },
      { status: 500 }
    );
  }
}
