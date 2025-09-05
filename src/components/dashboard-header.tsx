"use client"
import Link from "next/link"
import {
  Bell,
  GraduationCap,
  Menu,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"
import Image from "next/image"

type DashboardHeaderProps = {
  user: {
    name: string;
    role: string;
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const { toggleSidebar } = useSidebar()
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
        <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={toggleSidebar}
        >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
        </Button>
        <div className="w-full flex-1">
            {/* Can add a global search here if needed */}
        </div>
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <Image
                        src={`https://i.pravatar.cc/150?u=${encodeURIComponent(user.name)}`}
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="rounded-full"
                    />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.role}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4"/>
                    <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <GraduationCap className="mr-2 h-4 w-4"/>
                    <span>Kelas Saya</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/login">Logout</Link>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  )
}
