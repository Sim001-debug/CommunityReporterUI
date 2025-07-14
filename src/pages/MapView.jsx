import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icons
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
    iconAnchor: [16, 32],
  }),
};

// Main component
export const MapView = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_COMMUNITY_REPORTER_API_URL}/Reports`
        );
        if (res.ok) {
          const data = await res.json();
          setReports(data);
        } else {
          console.error("Failed to fetch reports");
        }
      } catch (err) {
        console.error("Error fetching reports", err);
      }
    };

    fetchReports();
  }, []);

  const normalize = (s) =>
  s?.trim().toLowerCase().replace(/\s+/g, "-");
  


  const filteredReports = reports.filter((r) => {
    const matchesStatus =
      filter === "all" || normalize(r.status) === filter;

    const reportDate = new Date(r.createdAt);
    const matchesStart = !startDate || reportDate >= new Date(startDate);
    const matchesEnd = !endDate || reportDate <= new Date(endDate);

    return matchesStatus && matchesStart && matchesEnd;

    console.log("Status:", r.status, "Normalized:", normalize(r.status));

  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">🗺️ Report Map View</h2>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="in-progress">In-Progress</option>
          <option value="closed">Closed</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      <MapContainer
        center={[-33.918861, 18.4233]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredReports.map((report) => (
          <Marker
            key={report.reportId}
            position={[report.latitude, report.longitude]}
            icon={icons[normalize(report.status)] || icons.open}
          >
            <Popup>
              <strong>Status:</strong> {report.status} <br />
              <strong>Category:</strong> {report.category} <br />
              <strong>Description:</strong> {report.description} <br />
              <strong>Owner:</strong> {report.owner}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
