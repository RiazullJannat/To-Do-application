import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import AddTask from "./AddTask";

// This is sample data.
const data = {
  user: {
    name: "RJannat",
    email: "ramimk097@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <AddTask></AddTask>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}
