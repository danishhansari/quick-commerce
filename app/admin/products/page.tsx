"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "../_components/data-table";
import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/app/http/api";
import { Product } from "@/types";
import { useSetRecoilState } from "recoil";
import { productStore } from "@/store/product-store";
import { Loader2 } from "lucide-react";
import ProductSheet from "./_components/product-sheet";

export default function ProductsPage() {
  const setIsOpen = useSetRecoilState(productStore);
  const {
    data: products,
    isError,
    error,
    isLoading,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Products</h3>
        <Button size={"sm"} onClick={openMenu}>
          Add Product
        </Button>
        <ProductSheet />
      </div>

      {isError && (
        <span className="text-red-500">
          Something went wrong.{" "}
          {error && `More info about error ${error.message}`}
        </span>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center text-center">
          <Loader2 className="animate-spin text-2xl" />
        </div>
      ) : (
        <DataTable columns={columns} data={products || []} />
      )}
    </>
  );
}
