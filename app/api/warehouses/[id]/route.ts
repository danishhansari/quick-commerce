import { db } from "@/app/lib/db";
import { warehouses } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(id);
  try {
    const warehouse = await db
      .select()
      .from(warehouses)
      .where(eq(warehouses.id, Number(id)))
      .limit(1);
    if (!warehouse.length) {
      return Response.json({ message: "Warehouse not found" }, { status: 404 });
    }

    return Response.json(warehouse[0], { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
