import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeliveryPerson } from "@/app/http/api";
import { useRecoilState } from "recoil";
import { useToast } from "@/hooks/use-toast";
import { deliveryPersonStore } from "@/store/delivery-person-store";
import CreateDeliveryPerson, { FormValues } from "./create-delivery-form";

const DeliveryPersonSheet = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useRecoilState(deliveryPersonStore);
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-delivery"],
    mutationFn: (data: any) => createDeliveryPerson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-person"] });
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
      <SheetContent className="min-w-[20rem] space-y-2">
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
