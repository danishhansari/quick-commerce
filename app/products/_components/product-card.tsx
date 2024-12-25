import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { FC } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  console.log(product);
  return (
    <Link href={`/products/${product.id}`}>
      <Card key={product.id} className="group relative overflow-hidden">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-2 space-y-1">
          <h3 className="font-medium text-sm truncate">{product.name}</h3>
          <p className="text-xs text-muted-foreground truncate">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm">${product.price}</p>
            <span className="text-[10px] text-muted-foreground">
              {formatDistanceToNow(new Date(product.created_at || new Date()))}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
