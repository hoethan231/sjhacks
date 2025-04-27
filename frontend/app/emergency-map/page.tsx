"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { emergencies } from "@/components/emergency-dashboard"
import { Badge } from "@/components/ui/badge"

interface Responder {
  id: string
  name: string
  type: string
  status: "active" | "inactive"
  assignedTo?: string
  coordinates: { lat: number; lng: number }
}

export default function EmergencyMapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Sample responders data with coordinates
  const responders: Responder[] = [
    {
      id: "r9",
      name: "Engine 5",
      type: "Fire",
      status: "inactive",
      coordinates: { lat: 37.338, lng: -121.886 },
    },
    {
      id: "r10",
      name: "Ambulance 9",
      type: "Medical",
      status: "inactive",
      coordinates: { lat: 37.332, lng: -121.901 },
    },
    {
      id: "r11",
      name: "Police Unit 7",
      type: "Police",
      status: "inactive",
      coordinates: { lat: 37.342, lng: -121.895 },
    },
    {
      id: "r12",
      name: "Ladder 3",
      type: "Fire",
      status: "inactive",
      coordinates: { lat: 37.325, lng: -121.878 },
    },
  ]

  // Function to get responder icon code
  const getResponderIcon = (name: string) => {
    const parts = name.split(" ")
    if (parts.length >= 2) {
      return parts[0].charAt(0) + parts[1] // E.g., "Engine 5" becomes "E5"
    }
    return name.substring(0, 2)
  }

  // Function to get emergency icon based on type
  const getEmergencyIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "fire":
        return "🔥"
      case "medical":
        return "🚑"
      case "traffic accident":
        return "🚗"
      default:
        return "⚠️"
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6">Emergency Map - San Jose</h1>

          <div className="border rounded-lg bg-white p-4 mb-6">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs mr-2">
                  🔥
                </div>
                <span>Fire Emergency</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs mr-2">
                  🚑
                </div>
                <span>Medical Emergency</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs mr-2">
                  🚗
                </div>
                <span>Traffic Accident</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs mr-2">
                  E5
                </div>
                <span>Inactive Responder</span>
              </div>
            </div>
          </div>

          <div className="relative border rounded-lg overflow-hidden" style={{ height: "600px" }}>
            {/* Map of San Jose */}
            <div className="absolute inset-0 bg-blue-50">
              <div className="relative w-full h-full">
                {/* This would be replaced with an actual map library in a real application */}
                <img
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Map of San Jose"
                  className="w-full h-full object-cover opacity-50"
                />

                {/* Emergency markers */}
                {emergencies.map((emergency) => (
                  <div
                    key={emergency.id}
                    className="absolute"
                    style={{
                      left: `${(emergency.coordinates.lng + 122) * 200}px`,
                      top: `${(38 - emergency.coordinates.lat) * 200}px`,
                    }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm -ml-4 -mt-4 ${
                        emergency.status === "Critical"
                          ? "bg-red-500"
                          : emergency.status === "Urgent"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                      }`}
                    >
                      {getEmergencyIcon(emergency.type)}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs shadow">
                      {emergency.type}
                    </div>
                  </div>
                ))}

                {/* Responder markers - only show inactive responders */}
                {responders
                  .filter((responder) => responder.status === "inactive")
                  .map((responder) => (
                    <div
                      key={responder.id}
                      className="absolute"
                      style={{
                        left: `${(responder.coordinates.lng + 122) * 200}px`,
                        top: `${(38 - responder.coordinates.lat) * 200}px`,
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs -ml-4 -mt-4">
                        {getResponderIcon(responder.name)}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs shadow">
                        {responder.name}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Map overlay with emergency information */}
            <div className="absolute top-4 right-4 w-64 bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold mb-2">Active Emergencies</h3>
              <div className="space-y-2">
                {emergencies.map((emergency) => (
                  <div key={emergency.id} className="text-sm border-b pb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{emergency.type}</span>
                      <Badge
                        className={`${
                          emergency.status === "Critical"
                            ? "bg-red-500"
                            : emergency.status === "Urgent"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }`}
                      >
                        {emergency.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{emergency.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
