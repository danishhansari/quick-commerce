"use client";
import { getAllMyOrders } from "@/app/http/api";
import Navbar from "@/components/navbar";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PreviousOrderCard from "./_components/previous-order-card";
import { Loader2 } from "lucide-react";
import { MyOrder } from "@/types";

const page = () => {
  const { data: myOrders, isPending } = useQuery<MyOrder[]>({
    queryKey: ["my-orders"],
    queryFn: getAllMyOrders,
  });

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center text-center mt-4 md:mt-8">
          {isPending && <Loader2 className="animate-spin" />}
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {myOrders &&
            myOrders.map((order) => <PreviousOrderCard order={order} />)}
        </div>
      </div>
    </>
  );
};

export default page;
