"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/app/http/api";
import { Product } from "@/types";
import ProductSheet from "./_components/product-sheet";

export default function Products() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Products</h3>
        <Button size={"sm"}>Add Product</Button>
        <ProductSheet />
      </div>
      <DataTable columns={columns} data={products || []} />
    </>
  );
}
