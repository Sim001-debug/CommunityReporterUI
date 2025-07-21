import { useState } from "react";
import { useNavigate } from "react-router-dom";
import illustration from "../image/login-illustration.png"; // Make sure the image path is correct

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
        localStorage.setItem("user", JSON.stringify({ id: result.id, userName: username }));
        localStorage.setItem("token", result.token);
        alert("Login successful!");
        navigate("/home");
      } else {
        setError(result?.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4 py-10">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Illustration - left side */}
        {/* <div className="w-full md:w-1/2 bg-blue-100 flex items-center justify-center p-6">
          <img
            src={illustration}
            alt="Login Illustration"
            className="w-full h-auto max-w-xs md:max-w-md object-contain"
          />
        </div> */}

        {/* Login form - right side */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Welcome!</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="border px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* <div className="text-sm text-right">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div> */}

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
              >
                {loading ? "Signing in..." : "SIGN IN"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
