import { MapPin, Users, Clock, AlertTriangle, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

interface EmergencySummaryProps {
  emergency: Emergency
}

export function EmergencySummary({ emergency }: EmergencySummaryProps) {
  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
            Current Emergency: {emergency.type}
          </h2>
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
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Location</h3>
            <p className="flex items-center mt-1">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              {emergency.location}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Caller Information</h3>
            <p className="mt-1">{emergency.callerName}</p>
            <p className="flex items-center mt-1">
              <Phone className="h-4 w-4 text-gray-500 mr-1" />
              {emergency.callerPhone}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Time Reported</h3>
            <p className="flex items-center mt-1">
              <Clock className="h-4 w-4 text-gray-500 mr-1" />
              {emergency.time}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-sm">{emergency.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Assigned Responders</h3>
            <div className="flex items-center mt-1">
              <Users className="h-4 w-4 text-gray-500 mr-1" />
              <div className="flex flex-wrap gap-1 mt-1">
                {emergency.responders.map((responder) => (
                  <Badge key={responder} variant="outline" className="bg-blue-50">
                    {responder}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex justify-between">
          <button className="text-sm text-blue-600 hover:text-blue-800">View Full Details</button>
          <button className="text-sm text-blue-600 hover:text-blue-800">Update Status</button>
        </div>
      </div>
    </div>
  )
}
