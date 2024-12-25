"use client";
import { getAllMyOrders } from "@/app/http/api";
import Navbar from "@/components/navbar";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PreviousOrderCard from "./_components/previous-order-card";

const page = () => {
  const { data: myOrders, isPending } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getAllMyOrders,
  });

  console.log("This are my orders", myOrders);

  return (
    <>
      <Navbar />
      <div className="mt-4 grid grid-cols-2">
        {myOrders &&
          myOrders.map((order) => <PreviousOrderCard order={order} />)}
      </div>
    </>
  );
};

export default page;
