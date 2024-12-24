"use client";

import { getProductById, placeOrder } from "@/app/http/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { AlertCircle, ShoppingCart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { orderSchema } from "@/app/lib/validator/orderSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useMemo } from "react";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";

export type FormValues = z.input<typeof orderSchema>;

type CustomError = {
  message: string;
};

const ProductPage = () => {
  const { toast } = useToast();
  const params = useParams();
  const pathName = usePathname();
  const productId = params?.id as string;
  const { data: session } = useSession();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product>({
    queryKey: [`product/${productId}`],
    queryFn: () => getProductById(productId),
  });

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      address: "",
      pincode: "",
      qty: 1,
      product_id: Number(productId),
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["order"],
    mutationFn: (data: FormValues) =>
      placeOrder({ ...data, product_id: Number(productId) }),
    onSuccess: ({ order: data, product }) => {
      const options = {
        key: process.env.RAZORPAY_KEY!,
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        handler: async (response: any) => {
          console.log("I verifying payment", response);
          const paymentResponse = await fetch("/api/verify-payment", {
            method: "POST",
            body: JSON.stringify({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              id: product.id,
            }),
          });

          const res = await paymentResponse.json();
          if (res?.error === false) {
            toast({
              title: "Payment failed",
            });
          }
        },
        prefill: {
          email: "dan72mail@gmail.com",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      console.log("I am payment Object", paymentObject);

      paymentObject.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.");
      });
    },
    onError: (err: AxiosError) => {
      if (err.response?.data) {
        const customErr = err.response.data as CustomError;
        console.error(customErr.message);
        toast({
          title: customErr.message,
          color: "red",
        });
      } else {
        console.error(err);
        toast({
          title: "Unknown error",
        });
      }
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  const qty = form.watch("qty");

  const price = useMemo(() => {
    if (product?.price) {
      return product.price * qty;
    }
    return 0;
  }, [qty, product]);

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 md:px-20">
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load product: {error.message}
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-16 w-1/3" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      ) : product ? (
        <div className="grid gap-4 md:gap-8 md:grid-cols-2">
          <Card className="border-none">
            <CardContent>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 568px) 90vw, 50vw"
                  priority
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {product.name}
              </h1>
            </div>

            <div>
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl font-bold">${product.price?.toFixed(2)}</p>
            </div>

            <div>
              <h2 className="text-sm font-medium">Description</h2>
              <p className="mt-2 text-gray-600">{product.name}</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Address..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="Pincode..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="qty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="h-9 border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="e.g. 1"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              field.onChange(value <= 0 ? 1 : value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {session ? (
                  <Button size="lg" className="group w-full mt-8" type="submit">
                    <ShoppingCart className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    ${price} Buy Now
                  </Button>
                ) : (
                  <Link
                    href={`/api/auth/signin?callbackUrl=${pathName}`}
                    className="mt-8"
                  >
                    <Button size="lg" className="group mt-12">
                      <ShoppingCart className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                      ${price} Buy Now
                    </Button>
                  </Link>
                )}
              </form>
            </Form>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProductPage;
