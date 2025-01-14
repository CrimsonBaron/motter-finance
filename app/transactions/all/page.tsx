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
import CreateTransactionDialog from "@/components/create-transaction-dialog";
  

export default async function Page() {
    const cookie = cookies().get('pb_auth');

    if (!cookie) throw new Error('Not logged in');
    const { model } = JSON.parse(cookie.value);



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
                  transactions
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>all</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
            <div className="flex-1 flex justify-end mr-5">
                
            </div>
            <CreateTransactionDialog />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
            
        </div>
      </SidebarInset>
    </SidebarProvider>
    )
}