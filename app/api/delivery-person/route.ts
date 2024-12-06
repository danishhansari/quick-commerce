import { db } from "@/app/db";
import { deliveryPerson } from "@/app/db/schema";
import { deliveryPersonSchema } from "@/app/validator/deliveryPersonSchema";

export async function POST(request: Request) {
  const data = await request.json();

  let validatedData;

  try {
    validatedData = deliveryPersonSchema.parse(data);
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  try {
    await db.insert(deliveryPerson).values({...validatedData});
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
