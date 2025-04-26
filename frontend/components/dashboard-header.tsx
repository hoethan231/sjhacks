"use client"

import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void
}

export function DashboardHeader({ setSidebarOpen }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="flex-1">
        <h1 className="text-lg font-semibold">Emergency Response Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
          <span className="sr-only">Notifications</span>
        </Button>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium">ER</span>
          </div>
          <span className="text-sm font-medium md:block hidden">Dispatcher</span>
        </div>
      </div>
    </header>
  )
}
