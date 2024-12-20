"use client";
import { getAllProducts } from "@/app/http/api";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const ProductSection = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
    staleTime: 10 * 1000,
  });

  return (
    <>
      <h2 className="scroll-m-20 text-center my-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Products
      </h2>

      {isLoading && (
        <div className="flex items-center justify-center w-full">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {products?.length &&
        products.map((item) => {
          return (
            <Link href={`/products/${item.id}`}>
              <h1 className="text-2xl ">{item.id}</h1>;
              <img src={item.image} alt={item.name} />
            </Link>
          );
        })}
    </>
  );
};

export default ProductSection;
