"use client"

import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./App-Sidebar";
import React from "react";

function MainContentClient({ children }: { children: React.ReactNode }) {
    const { state } = useSidebar();
    const expanded = state === "expanded";

    return (
        <main
            className={
                "flex-1 transition-all duration-300 ease-in-out p-2 " +
                (expanded ? "ml-1" : "ml-1") +
                (expanded ? " scale-100" : " scale-100")
            }
        >
            <div className="min-h-full">
                {children}
            </div>
        </main>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden bg-background">
                <AppSidebar />
                <MainContentClient>{children}</MainContentClient>
            </div>
        </SidebarProvider>
    );
}