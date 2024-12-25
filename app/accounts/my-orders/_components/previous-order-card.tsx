import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Package } from "lucide-react";
import React from "react";

const PreviousOrderCard = ({ order }: any) => {
  return (
    <Card className="w-full">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
            <AvatarImage src={order.productImage} alt={order.product} />
            <AvatarFallback className="bg-primary">
              <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0 space-y-1">
            <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row">
              <h3 className="text-sm font-medium truncate text-foreground mr-2">
                {order.product}
              </h3>
              <Badge variant="secondary" className="mt-1 sm:mt-0">
                {order.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Qty: {order.qty} · ${order.price.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              Ordered {formatDistanceToNow(new Date(order.createdAt))} ago
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center space-y-2 sm:space-y-0">
        <Button variant="ghost" size="sm" className="text-xs w-full sm:w-auto">
          View Details
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="text-xs w-full sm:w-auto"
        >
          Buy Again
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PreviousOrderCard;
