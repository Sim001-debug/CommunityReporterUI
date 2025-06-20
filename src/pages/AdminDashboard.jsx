export const AdminDashboard = () => {
  // Dummy data - replace with API fetch later
  const reports = [
    {
      id: 1,
      title: "Potholes on Main Street",
      category: "Potholes",
      status: "Pending",
      date: "2025-05-15",
    },
    {
      id: 2,
      title: "Streetlight not working",
      category: "Electricity",
      status: "In Progress",
      date: "2024-07-16",
    },
    {
      id: 3,
      title: "Robbery reported",
      category: "Crime",
      status: "Resolved",
      date: "2024-07-14",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "In Progress":
        return "bg-blue-200 text-blue-800";
      case "Resolved":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Review & update the status of user-submitted reports.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{report.title}</td>
                <td className="p-4">{report.category}</td>
                <td className="p-4">{report.date}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-blue-600 hover:underline text-sm">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
