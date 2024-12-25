import { Orders } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Orders>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "user",
    accessorKey: "user",
    header: "User",
  },
  {
    id: "product",
    accessorKey: "product",
    header: "Product",
  },
  {
    id: "qty",
    accessorKey: "qty",
    header: "Qty",
  },
  {
    id: "delivery-person-name",
    accessorKey: "deliveryPersonName",
    header: "Delivery Boy",
  },
  {
    id: "delivery-person-number",
    accessorKey: "deliveryPersonNumber",
    header: "Delivery Boy Number",
  },
];
