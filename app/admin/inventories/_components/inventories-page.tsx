"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Loader2 } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { inventoryStore } from "@/store/inventory-store";
import { useQuery } from "@tanstack/react-query";
import { Inventories } from "@/types";
import { getAllInventories } from "@/app/http/api";
import InventoriesSheet from "./inventories-sheet";
import { DataTable } from "../../_components/data-table";
import { columns } from "./columns";

export default function InventoryPage() {
  const setIsOpen = useSetRecoilState(inventoryStore);

  const {
    data: inventories,
    isError,
    error,
    isLoading,
  } = useQuery<Inventories[]>({
    queryKey: ["inventories"],
    queryFn: () => getAllInventories(),
  });

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Inventories</h3>
        <Button size={"sm"} onClick={openMenu}>
          Add Inventories
        </Button>
        <InventoriesSheet />
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
        <DataTable columns={columns} data={inventories || []} />
      )}
    </>
  );
}
