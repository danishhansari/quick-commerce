"use client";
import { getAllProducts } from "@/app/http/api";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

const ProductSection = () => {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 10 * 1000,
  });

  return (
    <>
      <h2 className="scroll-m-20 text-center my-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Products
      </h2>

      {products?.map((product) => {
        return (
          <>
            <img src={product.image} />
            <h1>{product.id}</h1>
          </>
        );
      })}
    </>
  );
};

export default ProductSection;
