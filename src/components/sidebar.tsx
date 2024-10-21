import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useAuthContext } from "@/contexts/auth-context";
import { Search, SidebarIcon } from "lucide-react";
import DashboardDialog from "./dashboard-dialog";
import { ModeToggle } from "./toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import UserDropdownMenu from "./user-dropdown-menu";
import { useMediaQuery } from "usehooks-ts";


const Sidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  return (
    <div className="max-w-[275px] dark:bg-neutral-950">
      {isDesktop ? (
        <div className="w-full">
          <SidebarContent />
        </div>
      ) : (
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <SidebarIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-w-[300px]">
              <SheetHeader className="pb-3">
                <SheetTitle>Lecturize It</SheetTitle>
              </SheetHeader>
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  )
}

const SidebarContent = () => {
  const { state: { isAuthenticated, user } } = useAuthContext();
  return (
    <div className="space-y-3">
      <div className="w-full flex flex-row gap-2">
        <ModeToggle />
        {isAuthenticated && user && <UserDropdownMenu />}
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search" className="pl-8" />
      </div>
      {isAuthenticated && user && <DashboardDialog />}
    </div>
  )
}

export default Sidebar;

