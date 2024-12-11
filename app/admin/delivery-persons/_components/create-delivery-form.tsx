import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { deliveryPersonSchema } from "@/app/lib/validator/deliveryPersonSchema";
import { useQuery } from "@tanstack/react-query";
import { Warehouses } from "@/types";
import { getAllWarehouses } from "@/app/http/api";

export type FormValues = z.input<typeof deliveryPersonSchema>;

const CreateDeliveryPerson = ({
  onSubmit,
  disabled,
}: {
  onSubmit: (formValues: FormValues) => void;
  disabled: boolean;
}) => {
  const form = useForm<z.infer<typeof deliveryPersonSchema>>({
    resolver: zodResolver(deliveryPersonSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const {
    data: warehouses,
    isLoading,
    isError,
  } = useQuery<Warehouses[]>({
    queryKey: ["warehouses"],
    queryFn: () => getAllWarehouses(),
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g Chennai" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {disabled ? (
            <Loader2 className="animate-spring" />
          ) : (
            "Create Warehouse"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateDeliveryPerson;
