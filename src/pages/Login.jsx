import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Here you would normally call your login API
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (username === "username" && password === "password") {
        alert("Login successful!");
        // Redirect or update your app state here
      } else {
        setError("Invalid username or password");
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
            type="username"
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
