import { db } from "@/app/db";
import { warehouses } from "@/app/db/schema";
import { warehouseSchema } from "@/app/validator/warehouseSchema";

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
