import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent >
        <SidebarGroup>
        <SidebarGroupLabel>
        <div className="flex items-center">
            <img src="/ct_icon.svg" alt="CT Icon" className="h-30 w-30 mt-10 ml-[-2rem]" />
        </div>
          </SidebarGroupLabel>
        <SidebarTrigger />
          <SidebarGroupContent>       
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>   
  )
}