import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import React from "react";
import CreateProductForm, { FormValues } from "./create-product-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/app/http/api";
import { useRecoilState } from "recoil";
import { productStore } from "@/store/product-store";
import { useToast } from "@/hooks/use-toast";

const ProductSheet = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useRecoilState(productStore);
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: (data: FormData) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product created successfully",
      });
      setIsOpen((prev) => !prev);
    },
  });

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", String(values.price));
    formData.append("image", (values.image as FileList)[0]);

    mutate(formData);
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <SheetContent className="min-w-[20rem] space-y-2">
        <SheetHeader>
          <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">
            Create product
          </h1>
          <SheetDescription>Create a new product</SheetDescription>
        </SheetHeader>
        <CreateProductForm onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default ProductSheet;
