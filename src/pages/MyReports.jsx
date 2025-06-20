import { useEffect, useState } from "react";

export const MyReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this with actual userId from login context/auth
  const userId = "123";

  useEffect(() => {
    // Simulated fetch
    const fetchReports = async () => {
      setLoading(true);
      try {
        // Replace with real API call
        const response = await fetch(`/api/reports?userId=${userId}`);
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Failed to load reports", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="p-4">
      <h4 className="text-lg font-bold mb-3">My Reports</h4>
      <p className="mb-4">You can view the reports you have submitted below:</p>

      {loading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No reports submitted yet.</p>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border p-4 rounded shadow bg-white"
            >
              <h5 className="text-md font-semibold">
                {report.title || "Untitled Report"}
              </h5>
              <p>Status: <span className="font-medium">{report.status}</span></p>
              <p>Date: {new Date(report.createdAt).toLocaleDateString()}</p>
              <p>Description: {report.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
