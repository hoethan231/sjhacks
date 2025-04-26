"use client"

import { X, LifeBuoy, Phone, Users, AlertTriangle, MessageSquare, Clock, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function DashboardSidebar({ open, setOpen }: DashboardSidebarProps) {
  return (
    <div
      className={`fixed inset-0 z-20 transform transition-transform duration-200 lg:transform-none lg:relative lg:inset-auto lg:flex lg:w-64 ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="absolute inset-0 bg-gray-600 bg-opacity-75 lg:hidden" onClick={() => setOpen(false)}></div>

      <div className="relative flex h-full flex-col overflow-y-auto border-r bg-white pb-4">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <Link href="/" className="flex items-center">
            <LifeBuoy className="h-6 w-6 text-red-600" />
            <span className="ml-2 text-lg font-semibold">EMS Response</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <div className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900"
            >
              <Phone className="mr-3 h-5 w-5 text-gray-500" />
              <span>Incoming Calls</span>
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <AlertTriangle className="mr-3 h-5 w-5 text-gray-500" />
              <span>Active Emergencies</span>
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Users className="mr-3 h-5 w-5 text-gray-500" />
              <span>Responder Teams</span>
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <MessageSquare className="mr-3 h-5 w-5 text-gray-500" />
              <span>Communications</span>
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Clock className="mr-3 h-5 w-5 text-gray-500" />
              <span>Call History</span>
            </Link>
          </nav>
        </div>

        <div className="border-t px-3 py-4">
          <nav className="space-y-1">
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Settings className="mr-3 h-5 w-5 text-gray-500" />
              <span>Settings</span>
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-500" />
              <span>Sign out</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
