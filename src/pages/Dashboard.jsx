import { AppSidebar } from "@/components/app-sidebar";
import ToDoLIst from "@/components/ToDoLIst";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useAuth from "@/hooks/useAuth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Outlet } from "react-router";

const Dashboard = () => {
    const { today, nextDay, complete } = useAuth();
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />

                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50 border-2  overflow-y-scroll" >
                            <h3 className="sticky text-center top-0 py-2 bg-white font-bold">Todays List:</h3>
                            {
                                today.map((event) => <ToDoLIst key={event._id} event={event}  />)
                            }
                        </div>
                        <div className="aspect-video rounded-xl bg-muted/50 border-2 overflow-y-scroll" >
                            <h3 className="sticky text-center top-0 py-2 bg-white font-bold">Upcoming List:</h3>
                            {
                                nextDay.map((event)=><ToDoLIst key={event._id} event={event}/>)
                            }
                        </div>
                        <div className="aspect-video rounded-xl bg-muted/50 border-2 overflow-y-scroll" >
                            <h3 className="sticky text-center top-0 py-2 bg-white font-bold">Completed List:</h3>
                            {
                                 complete.map((event)=><ToDoLIst key={event._id} event={event}/>)
                            }
                        </div>
                    </div>
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min border-2 border-gray-900">
                        <Outlet></Outlet>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Dashboard;