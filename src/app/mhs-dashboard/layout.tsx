'use client'
import * as React from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { 
    GraduationCap, 
    LayoutDashboard, 
    BookCheck, 
    FileText,
    LogOut,
    Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { href: "/mhs-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/mhs-dashboard/smart-quiz", icon: BookCheck, label: "Smart Quiz" },
    { href: "/mhs-dashboard/assignments", icon: FileText, label: "Tugas Saya" },
];

export default function MahasiswaDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 p-2">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <h1 className={cn(
                        "text-xl font-semibold text-sidebar-foreground",
                        "group-data-[collapsible=icon]:hidden"
                    )}>
                        Smart Anatomy
                    </h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href}>
                                <SidebarMenuButton
                                    isActive={pathname === item.href}
                                    tooltip={item.label}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/login">
                            <SidebarMenuButton tooltip="Logout">
                                <LogOut />
                                <span>Logout</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <DashboardHeader user={{ name: "Siti Amelia", role: "Mahasiswa" }} />
            <main className="flex-1 p-4 sm:p-6 bg-background">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
