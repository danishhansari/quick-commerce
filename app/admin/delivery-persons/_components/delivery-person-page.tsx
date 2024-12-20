"use client";

import { getAllDeliveryPerson } from "@/app/http/api";
import { deliveryPersonStore } from "@/store/delivery-person-store";
import { DeliveryPerson } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeliveryPersonSheet from "./delivery-person-sheet";
import { DataTable } from "../../_components/data-table";
import { columns } from "./columns";

export default function DeliveryPersonPage() {
  const setIsOpen = useSetRecoilState(deliveryPersonStore);

  const {
    data: deliveryPerson,
    isError,
    error,
    isLoading,
  } = useQuery<DeliveryPerson[]>({
    queryKey: ["delivery-person"],
    queryFn: () => getAllDeliveryPerson(),
  });

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Delivery Person</h3>
        <Button size={"sm"} onClick={openMenu}>
          Add Delivery Partner
        </Button>
        <DeliveryPersonSheet />
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
        <DataTable columns={columns} data={deliveryPerson || []} />
      )}
    </>
  );
}
