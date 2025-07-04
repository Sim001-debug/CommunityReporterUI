import { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "300px" };
const mapCenter = { lat: -33.918861, lng: 18.4233 }; // Default to Cape Town

export const ReportForm = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, 
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [marker, setMarker] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!marker || !image || !currentUser) {
      setMessage("Please complete all fields including location, image, and login.");
      return;
    }

    const payload = new FormData();
    payload.append("userId", currentUser.id);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("owner", currentUser.fullName); // optional
    payload.append("latitude", marker.lat);
    payload.append("longitude", marker.lng);
    payload.append("image", image);

    console.log("Form Data:", {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      latitude: marker.lat,
      longitude: marker.lng,
      image: image,
      userId: currentUser.id
    });

    try {
      const response = await fetch(
        `${process.env.REACT_COMMUNITY_REPORTER_API_URL}/`, {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        setMessage("Report submitted successfully.");
        setFormData({ title: "", description: "", category: "" });
        setMarker(null);
        setImage(null);
      } else {
        setMessage("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting report.");
    }
  };

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Water Leak">Water Leak</option>
          <option value="Electric Fault">Electric Fault</option>
          <option value="Other">Other</option>
        </select>

        <label className="block text-sm font-medium">Select Issue Location:</label>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={mapCenter}
          onClick={handleMapClick}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
};
