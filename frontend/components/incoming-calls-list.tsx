"use client"

import { Phone, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Emergency {
  id: string
  type: string
  location: string
  status: string
  time: string
  callerName: string
  callerPhone: string
  description: string
  responders: string[]
}

interface IncomingCallsListProps {
  emergencies: Emergency[]
  selectedEmergency: string | null
  setSelectedEmergency: (id: string) => void
}

export function IncomingCallsList({ emergencies, selectedEmergency, setSelectedEmergency }: IncomingCallsListProps) {
  return (
    <div className="space-y-3">
      {emergencies.map((emergency) => (
        <div
          key={emergency.id}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            selectedEmergency === emergency.id ? "border-red-500 bg-red-50" : "hover:bg-gray-50"
          }`}
          onClick={() => setSelectedEmergency(emergency.id)}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              {emergency.status === "Critical" ? (
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              ) : (
                <Phone className="h-5 w-5 text-blue-600 mr-2" />
              )}
              <h3 className="font-medium">{emergency.type}</h3>
            </div>
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

          <div className="text-sm text-gray-600 mb-2">
            <p className="truncate">{emergency.location}</p>
            <p className="mt-1">{emergency.time}</p>
          </div>

          <div className="flex justify-between mt-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={(e) => {
                e.stopPropagation()
                // In a real app, this would open a modal or navigate to a call details page
                console.log("View details for", emergency.id)
              }}
            >
              Details
            </Button>
            <Button
              variant="default"
              size="sm"
              className="text-xs bg-red-600 hover:bg-red-700"
              onClick={(e) => {
                e.stopPropagation()
                // In a real app, this would dispatch the call
                console.log("Dispatch for", emergency.id)
              }}
            >
              Dispatch
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
