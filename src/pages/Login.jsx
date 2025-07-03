import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_COMMUNITY_REPORTER_API_URL}/Auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: username, password }),
        }
      );

      let resultText = await response.text();
      let result;
      try {
        result = JSON.parse(resultText);
      } catch {
        result = resultText;
      }
      if (response.ok && result.token) {
        //to keep the usr logged in
        localStorage.setItem("user", JSON.stringify({ userName: username }));
        localStorage.setItem("token", result.token);
        // Redirect or update your app state here
        alert("Login successful!");
        navigate("/home");
      } else {

        setError(result?.message || result?.error || result || "Invalid username or password");
      }

      } catch (err) {
        setError("Login failed. Try again.");
      }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow-md">
      <h3 className="text-2xl mb-6 font-semibold text-center">Login Section</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="username"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="********"
          />
        </label>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
