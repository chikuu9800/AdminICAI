import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  FileSpreadsheet,
  MessageSquare,
  Menu as MenuIcon,
  ClipboardList,
  Settings,
  BarChart3,
  LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, roles: ['admin', 'editor', 'moderator'] },
  { title: "Content", url: "/admin/content", icon: FileText, roles: ['admin', 'editor'] },
  { title: "Events", url: "/admin/events", icon: Calendar, roles: ['admin', 'editor'] },
  { title: "Forms", url: "/admin/forms", icon: ClipboardList, roles: ['admin', 'editor'] },
  { title: "Discussions", url: "/admin/discussions", icon: MessageSquare, roles: ['admin', 'moderator'] },
  { title: "Users", url: "/admin/users", icon: Users, roles: ['admin'] },
  { title: "Reports", url: "/admin/reports", icon: BarChart3, roles: ['admin', 'moderator'] },
  { title: "Menu Manager", url: "/admin/menu", icon: MenuIcon, roles: ['admin'] },
];

export function AdminSidebar() {
  const { open } = useSidebar();
  const { user, logout } = useAuth();

  const filteredItems = menuItems.filter(item =>
    user && item.roles.includes(user.role)
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-12 items-center justify-center rounded-lg bg-white text-primary-foreground">
            <img src="/Images/logo.png" alt="" />

          </div>
          {open && (
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground">ICAI</p>
              <p className="text-xs text-muted-foreground">CMS Admin</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {open && user && (
          <div className="mb-2">
            <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        )}
        <Button
          variant="outline"
          size={open ? "default" : "icon"}
          onClick={logout}
          className="w-full"
        >
          <LogOut className="h-4 w-4" />
          {open && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
