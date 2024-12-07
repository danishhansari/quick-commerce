import { db } from "@/app/lib/db";
import { products } from "@/app/lib/db/schema";
import { productSchema } from "@/app/lib/validator/productSchema";
import { desc } from "drizzle-orm";
import { writeFile, unlink } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  const data = await request.formData();
  let validatedData;

  try {
    validatedData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  const fileName = `${Date.now()}.${validatedData.image.name
    .split(".")
    .slice(-1)}`;

  try {
    const buffer = Buffer.from(await validatedData.image.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), "public/assets", fileName),
      buffer
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to save the file to fs" },
      { status: 500 }
    );
  }

  try {
    await db.insert(products).values({
      name: validatedData.name,
      description: validatedData.description,
      price: validatedData.price,
      image: fileName,
    });
  } catch (error) {
    await unlink(path.join("public/assets", fileName)).catch(() => null); // Silent fail
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
    const allProduct = await db
      .select()
      .from(products)
      .orderBy(desc(products.created_at));
    return Response.json(allProduct);
  } catch (error) {
    return Response.json(
      { message: "Error while fetching the details" },
      { status: 500 }
    );
  }
}
