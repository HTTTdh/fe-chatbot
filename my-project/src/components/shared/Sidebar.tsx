import {
  ChevronUp,
  BookUser,
  MessageSquare,
  Database,
  Settings,
  Home,
  PackageIcon,
  User2Icon,
  BookAlert,
  ChartBar,
  User2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Trang quản lý",
    icon: Home,
    url: "/dashboard",
  },
  {
    title: "Cấu hình hệ thống",
    icon: Settings,
    url: "/cau-hinh-he-thong",
  },
  {
    title: "Quản lý người dùng",
    icon: User2Icon,
    url: "/quan-ly-nguoi-dung",
  },
  {
    title: "Dữ liệu Chatbot",
    icon: BookUser,
    url: "/du-lieu-chatbot",
  },
  {
    title: "Quản lý kênh",
    icon: PackageIcon,
    url: "/admin/facebook_page",
  },
  {
    title: "Dữ liệu khách hàng",
    icon: Database,
    url: "/dashboard/export",
  },
  {
    title: "Chat Interface",
    icon: MessageSquare,
    url: "/admin/chat",
  },
  {
    title: "Thống kê hoạt động",
    icon: ChartBar,
    url: "/admin/admin-analytics",
  },
  {
    title: "Hướng dẫn sử dụng",
    icon: BookAlert,
    url: "/admin/dashboard-guide",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Chatbot Hành Chính Công</SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
