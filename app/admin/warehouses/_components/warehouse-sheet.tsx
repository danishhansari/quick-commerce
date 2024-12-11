import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import React from "react";
import CreateWarehouse, { FormValues } from "./create-warehouse-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/app/http/api";
import { useRecoilState } from "recoil";
import { useToast } from "@/hooks/use-toast";
import { warehousesStore } from "@/store/warehouses-store";

const WarehouseSheet = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useRecoilState(warehousesStore);
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-warehouse"],
    mutationFn: (data: FormData) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      toast({
        title: "Product created successfully",
      });
      setIsOpen((prev) => !prev);
    },
  });

  const onSubmit = (values: FormValues) => {
    // mutate(values);
    console.log(values);
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <SheetContent className="min-w-[28rem] space-y-2">
        <SheetHeader>
          <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">
            Create product
          </h1>
          <SheetDescription>Create a new product</SheetDescription>
        </SheetHeader>
        <CreateWarehouse onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default WarehouseSheet;
