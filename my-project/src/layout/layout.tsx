import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/Sidebar";
import Navigate from "@/components/shared/Navigate";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-4 overflow-auto">
          <Navigate />
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
