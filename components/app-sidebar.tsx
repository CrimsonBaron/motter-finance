"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser, navUser } from "./nav-user";
import { NavUserSkeleton } from "./nav-user-skeleton";
import { NavMain } from "./nav-main";
import { Landmark, LayoutDashboard,ArrowRightLeft,Goal,ChartColumnBig } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: Landmark,
      isActive: true,
      items: [],
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: ArrowRightLeft,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/transactions",
        },
        {
          title: "Income",
          url: "/transactions/income",
        },
        {
          title: "Expenses",
          url: "/transactions/expenses",
        },
        {
          title: "Scheduled",
          url: "/transactions/scheduled",
        }
      ],
    },
    {
      title: "Goals",
      url: "/goals",
      icon: Goal,
      isActive: true,
      items: [],
    },
    {
      title: "Budgets",
      url: "/budgets",
      icon: ChartColumnBig,
      isActive: true,
      items: [],
    },
      
  ],
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: navUser["user"];
}

export function AppSidebar({
   user = {
      name: "John Doe",
      email: "johnDoe@example.com",
      avatar: "https://avatars.dicebear.com/api/avataaars/johnDoe.svg",
   },
   ...props 
  }: AppSidebarProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {isClient ? ( 
                <NavUser
                  user={user}
                />
              ) : <NavUserSkeleton/>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1"></div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}