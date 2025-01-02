// components/nav-user-skeleton.jsx
import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { ChevronsUpDown } from "lucide-react";

export function NavUserSkeleton() {
  return (
    <SidebarMenu>
    <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Skeleton className="w-8 h-8 rounded-full"/>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <Skeleton className="w-full h-8"/>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
  );
}