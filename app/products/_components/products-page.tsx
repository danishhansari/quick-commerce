"use client";

import { getAllProducts } from "@/app/http/api";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import ProductCard from "./product-card";

const ProductsPage = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 10 * 1000,
  });
  console.log(products);

  return (
    <div className="max-w-6xl px-4 md:px-8 mx-auto">
      <h2 className="pb-2 mt-4 text-3xl font-semibold tracking-tight">
        Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {products &&
          products.map((product) => <ProductCard product={product} />)}
      </div>
    </div>
  );
};

export default ProductsPage;
