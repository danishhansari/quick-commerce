"use client";
import { getAllOrders } from "@/app/http/api";
import { Orders } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { DataTable } from "../../_components/data-table";
import { columns } from "./column";

const OrdersPage = () => {
  const {
    data: orders,
    isError,
    error,
    isLoading,
  } = useQuery<Orders[]>({
    queryKey: ["all-orders"],
    queryFn: getAllOrders,
  });

  console.log("This is all orders", orders);
  return (
    <>
      <h3 className="text-2xl font-bold tracking-tight">Orders</h3>

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
        <DataTable columns={columns} data={orders || []} />
      )}
    </>
  );
};

export default OrdersPage;
