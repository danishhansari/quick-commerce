'use client'
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { MountainIcon } from "@/components/mountain-icon";

export default function Home() {
  const links = [
    { href: "#", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/services", text: "Services" },
  ];
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Quick commerce</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-lg">
                  <Link href={"/admin"}>Admin</Link>
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full md:hidden"
                >
                  <Menu />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                <div className="grid gap-4 p-4 mt-16">
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      prefetch={false}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
