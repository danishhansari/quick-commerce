"use client";

import { getProductById } from "@/app/http/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AlertCircle, ShoppingCart, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProductPage = () => {
  const params = useParams();
  const productId = params?.id as string;

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product>({
    queryKey: [`product/${productId}`],
    queryFn: () => getProductById(productId),
  });

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load product: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 md:px-20">
      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      ) : product ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-2">
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
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductPage;
