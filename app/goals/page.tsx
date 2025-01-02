import { cookies } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import CreateGoalDialog from "@/components/create-goal-dialog";
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { getGoals } from "./actions";
import { GoalCard } from "@/components/goal-card";
  

export default async function Page() {
    const cookie = cookies().get('pb_auth');

    if (!cookie) throw new Error('Not logged in');
    const { model } = JSON.parse(cookie.value);

    const goals = await getGoals();

    return (
        <SidebarProvider>
      <AppSidebar
        user={{
            name: model.name,
            email: model.email,
            avatar: model.avatar,   
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  goals
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <CreateGoalDialog />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" >
              <GoalCard />
            </div>
            <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
            <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
          </div>
          <div className="flex-1 ">
            <DataTable columns={columns} data={goals}  />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    )
}