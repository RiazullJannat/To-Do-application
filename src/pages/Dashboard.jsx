import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            
        </SidebarProvider>
    );
};

export default Dashboard;