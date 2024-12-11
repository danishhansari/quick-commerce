import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/app/http/api";
import { useRecoilState } from "recoil";
import { useToast } from "@/hooks/use-toast";
import { deliveryPersonStore } from "@/store/delivery-person-store";
import CreateDeliveryPerson, { FormValues } from "./create-delivery-form";
import { DeliveryPerson } from "@/types";

const DeliveryPersonSheet = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useRecoilState(deliveryPersonStore);
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-delivery"],
    mutationFn: (data: DeliveryPerson) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery"] });
      toast({
        title: "Delivery person created successfully",
      });
      setIsOpen((prev) => !prev);
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <SheetContent className="min-w-[28rem] space-y-2">
        <SheetHeader>
          <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">
            Create Delivery Person
          </h1>
          <SheetDescription>Create a new delivery person</SheetDescription>
        </SheetHeader>
        <CreateDeliveryPerson onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default DeliveryPersonSheet;
