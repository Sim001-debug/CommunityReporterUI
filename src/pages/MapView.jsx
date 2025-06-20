import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

// Create custom icons based on status
const icons = {
    open: new L.Icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    }),
    "in-progress": new L.Icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    }),
    closed: new L.Icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    }),
};

// Sample issues data with lat/lng and status
const reportedIssues = [
  { id: 1, lat: -25.7479, lng: 28.2293, status: 'open', description: 'Pothole on street' },
  { id: 2, lat: -25.7485, lng: 28.2300, status: 'closed', description: 'Broken street light' },
  { id: 3, lat: -25.7490, lng: 28.2280, status: 'in-progress', description: 'Graffiti removal' },
];

export const MapView = () => {
  return (
    <div className="w-full h-[500px]">
      <h3 className="mb-4 text-xl font-semibold">MapView Section</h3>

      <MapContainer center={[-25.7479, 28.2293]} zoom={15} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reportedIssues.map((issue) => (
          <Marker 
            key={issue.id} 
            position={[issue.lat, issue.lng]}
            icon={icons[issue.status]}
            >
            <Popup>
              <strong>Status:</strong> {issue.status} <br />
              {issue.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
