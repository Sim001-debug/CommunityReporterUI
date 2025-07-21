import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    role: "",
  });

  console.log("Register formData:", formData);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_COMMUNITY_REPORTER_API_URL}/Auth/register`,
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let resultText = await response.text();
      let result;
      try {
        result = JSON.parse(resultText);
      } catch {
        result = resultText;
      }

      if (!response.ok) {
        // if result is an object, try to extract a message or title
        let errorMsg = "Registration failed";
        if (typeof result === "string") {
          errorMsg = result; 
        } else if (result?.message) {
          errorMsg = result.message;
        } else if (result?.title) {
          errorMsg = result.title;
        }
        setError(result?.message || result?.error || result || "Registration failed");
        return;
      }

      console.log("User registered:", result);

      // Redirect to login after successful registration
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="role"
          placeholder="Role (e.g., User, Admin)"
          value={formData.role}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};
