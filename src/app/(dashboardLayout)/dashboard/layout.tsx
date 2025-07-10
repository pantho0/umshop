import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import SidebarContent from "../_components/SidebarContent";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Navbar from "@/app/(commonLayout)/_components/shared/Navbar/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        {/* Static Sidebar for Desktop */}
        <aside className="hidden md:block w-72 h-[calc(100vh-64px)] sticky top-0 border-r bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="p-4">
            <SidebarContent />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="md:hidden sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4">
            {/* Mobile Drawer Trigger */}
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full w-72 p-0">
                <div className="p-4">
                  <SidebarContent />
                </div>
              </DrawerContent>
            </Drawer>
            <h1 className="flex-1 text-lg font-semibold text-center">
              My Account
            </h1>
          </div>

          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
