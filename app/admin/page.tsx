import { AppSidebar } from "@/components/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Badge variant={"outline"} className="rounded-2xl">You are now a admin</Badge>
          </div>
        </header>
        <div className="flex items-center justify-center flex-1 flex-col gap-4 p-4 pt-0">
          <Button>No products is there</Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
