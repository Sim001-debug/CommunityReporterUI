import { useEffect, useState } from "react";

export const MyReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser?.id;
  console.log("Current User ID:", userId);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_COMMUNITY_REPORTER_API_URL}/Reports?userId=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Failed to load reports", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchReports();
    }
  }, [userId]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h4 className="text-2xl font-bold mb-6 text-center text-purple-800">
        📄 My Submitted Reports
      </h4>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : reports.length === 0 ? (
        <p className="text-center text-gray-500">You haven't submitted any reports yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report.reportId}
              className="bg-white bg-opacity-90 rounded-lg shadow-md p-6 border border-gray-200 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-semibold text-gray-800">{report.category}</h5>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    report.status === "Open"
                      ? "bg-red-100 text-red-700"
                      : report.status === "In-Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                <strong>Date:</strong>{" "}
                {new Date(report.createdAt).toLocaleDateString()}
              </p>

              <p className="text-gray-700 mb-4">
                <strong>Description:</strong> <br />
                {report.description}
              </p>

              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p>
                  <strong>Latitude:</strong> {report.latitude}
                </p>
                <p>
                  <strong>Longitude:</strong> {report.longitude}
                </p>
                <p>
                  <strong>Owner:</strong> {report.owner}
                </p>
              </div>

              {report.imageUrl && (
                <img
                  src={report.imageUrl}
                  alt="Report Visual"
                  className="w-full h-40 object-cover rounded mt-2"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
