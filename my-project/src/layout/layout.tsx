import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/Sidebar";
import Navigate from "@/components/shared/Navigate";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-4 overflow-auto">
          <Navigate />
          {/* Nền xám cho khu vực chứa Outlet */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            {/* Bọc Outlet với nền trắng và shadow rõ hơn */}
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
