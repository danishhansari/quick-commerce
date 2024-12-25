import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Inventories } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Inventories>[] = [
  {
    id: "sku",
    accessorKey: "sku",
    header: "SKU",
  },
  {
    id: "warehouse",
    accessorKey: "warehouse",
    header: "Warehouse",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
];
