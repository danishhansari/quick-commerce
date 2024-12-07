import { db } from "@/app/lib/db";
import { deliveryPerson, warehouses } from "@/app/lib/db/schema";
import { deliveryPersonSchema } from "@/app/lib/validator/deliveryPersonSchema";
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
      .leftJoin(warehouses, eq(deliveryPerson.warehouse_id, warehouses.id))
      .orderBy(desc(deliveryPerson.id));
    return Response.json(deliveryAgents, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch the details of delivery person" },
      { status: 500 }
    );
  }
}
