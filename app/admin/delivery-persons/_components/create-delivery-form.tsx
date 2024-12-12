import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      warehouse_id: 0,
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
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g +91" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="warehouse_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse ID</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Warehouse ID" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem value="Loading">Loading...</SelectItem>
                  ) : (
                    <>
                      {warehouses &&
                        warehouses.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id ? item.id?.toString() : ""}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                    </>
                  )}
                </SelectContent>
              </Select>
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
