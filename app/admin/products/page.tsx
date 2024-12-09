"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/app/http/api";
import { Product } from "@/types";

export default function Products() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  console.log(products);
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Products</h3>
        <Button size={"sm"}>Add Product</Button>
      </div>
      <DataTable columns={columns} data={products || []} />
    </>
  );
}
