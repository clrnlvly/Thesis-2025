import React, { useState } from "react";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import Navbar from "./navbar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Navbar />
                <main className="p-5">{children}</main>
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
}
