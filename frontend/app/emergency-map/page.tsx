"use client"

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { emergencies } from "@/components/emergency-dashboard";

interface Responder {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive";
  coordinates: { lat: number; lng: number };
}

// Mock responder list – replace with your own data source or API call
const responders: Responder[] = [
  { id: "E5", name: "Engine 5", type: "Fire", status: "inactive", coordinates: { lat: 37.3382, lng: -121.8847 } },
  { id: "A12", name: "Ambulance 12", type: "Medical", status: "inactive", coordinates: { lat: 37.3421, lng: -121.8942 } },
  { id: "B2", name: "Battalion 2", type: "Fire", status: "inactive", coordinates: { lat: 37.3318, lng: -121.881 } },
];

// Dynamically import react‑leaflet on the client to avoid SSR errors
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer),    { ssr: false });
const Marker       = dynamic(() => import("react-leaflet").then(mod => mod.Marker),       { ssr: false });
const Popup        = dynamic(() => import("react-leaflet").then(mod => mod.Popup),        { ssr: false });
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon paths (Leaflet tries to grab from /, not /_next)
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function responderDivIcon(label: string) {
  return L.divIcon({
    className: "responder-icon",
    html: label,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
}

export default function EmergencyMapPage() {
  // Only inactive responders
  const inactiveResponders = responders.filter(r => r.status === "inactive");

  // Memoize the icon to avoid recreation
  const responderIcons = useMemo(() => {
    const map: Record<string, L.DivIcon> = {};
    inactiveResponders.forEach(r => {
      map[r.id] = responderDivIcon(r.id);
    });
    return map;
  }, [inactiveResponders]);

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-col flex-1">
        <DashboardHeader title="Emergency Map" />
        <div className="flex-1 relative">
          {/* Map fills the rest of the viewport */}
          <div className="absolute inset-0">
            <MapContainer center={[37.3382, -121.8863]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
              {emergencies.map(e => (
                <Marker key={e.id} position={[e.coordinates.lat, e.coordinates.lng]}>
                  <Popup>
                    <strong>{e.type}</strong>
                    <br />
                    {e.description}
                  </Popup>
                </Marker>
              ))}
              {inactiveResponders.map(r => (
                <Marker key={r.id} position={[r.coordinates.lat, r.coordinates.lng]} icon={responderIcons[r.id]}>
                  <Popup>
                    <strong>{r.name}</strong>
                    <br />
                    Status: {r.status}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .responder-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #1e90ff;
          color: #fff;
          font: 700 14px/1 "Segoe UI", sans-serif;
          border: 2px solid #fff;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}
