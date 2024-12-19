import React from "react";
import Link from "next/link";
import {
  Blocks,
  HomeIcon,
  Layers,
  ShoppingCart,
  Users,
  Warehouse,
} from "lucide-react";

import { MountainIcon } from "@/components/mountain-icon";

const Sidebar = () => {
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: HomeIcon },
    { label: "Products", href: "/admin/products", icon: Layers },
    { label: "Warehouses", href: "/admin/warehouses", icon: Warehouse },
    { label: "Deliver Persons", href: "/admin/delivery-persons", icon: Users },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { label: "Inventories", href: "/admin/inventories", icon: Blocks },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <MountainIcon />
            <span className="">Quick Commerce</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
