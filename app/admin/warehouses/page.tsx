"use client";
import { getAllWarehouses } from "@/app/http/api";
import { Button } from "@/components/ui/button";
import { warehousesStore } from "@/store/warehouses-store";
import { Warehouses } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSetRecoilState } from "recoil";
import ProductSheet from "../products/_components/product-sheet";
import { Loader2 } from "lucide-react";
import { DataTable } from "../_components/data-table";
import { columns } from "./_components/columns";

export default function WarehousesPage() {
  const setIsOpen = useSetRecoilState(warehousesStore);

  const {
    data: warehouses,
    isError,
    error,
    isLoading,
  } = useQuery<Warehouses[]>({
    queryKey: ["warehouses"],
    queryFn: () => getAllWarehouses(),
  });

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Warehouse</h3>
        <Button size={"sm"} onClick={openMenu}>
          Add Warehouse
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
        <DataTable columns={columns} data={warehouses || []} />
      )}
    </>
  );
}
