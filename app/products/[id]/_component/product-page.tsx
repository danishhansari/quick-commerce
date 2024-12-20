"use client";

import { getProductById } from "@/app/http/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
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

export type FormValues = z.input<typeof orderSchema>;

const ProductPage = () => {
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
      productId: Number(productId),
    },
  });

  const onSubmit = (values: FormValues) => {};

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
              <div className="relative aspect-square  w-full overflow-hidden rounded-xl">
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
                          <Input placeholder="Pincode..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>

            {session ? (
              <Button size="lg" className="group w-full">
                <ShoppingCart className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Buy Now
              </Button>
            ) : (
              <Link href={`/api/auth/signin?callbackUrl=/${pathName}`}>
                <Button size="lg" className="group">
                  <ShoppingCart className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Buy Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductPage;
