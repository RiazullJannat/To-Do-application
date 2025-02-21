import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import AddTask from "./AddTask";
import { Button } from "./ui/button";

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
        <Button variant={'outline'}>All Events</Button>
        <AddTask></AddTask>
        <Button variant={'outline'}>Search</Button>
        <Button variant={'outline'}>My Projects</Button>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}
