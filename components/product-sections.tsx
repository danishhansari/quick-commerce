"use client";
import { getAllProducts } from "@/app/http/api";
import ProductCard from "@/app/products/_components/product-card";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const ProductSection = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 10 * 1000,
  });

  return (
    <div className="max-w-6xl px-4 md:px-8 mx-auto py-12">
      <h2 className="scroll-m-20 text-center my-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Products
      </h2>

      {isLoading && (
        <div className="flex items-center justify-center w-full">
          <Loader2 className="animate-spin" />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {products?.length &&
          products.slice(0, 6).map((item) => {
            return <ProductCard product={item} />;
          })}
      </div>
    </div>
  );
};

export default ProductSection;
