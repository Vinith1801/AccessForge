import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
 <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden font-mono text-white">
  {/* Futuristic Background Glows */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-2xl animate-pulse delay-1000"></div>

  <form
    onSubmit={handleLogin}
    className="relative z-10 border border-cyan-400/30 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_5px_rgba(0,255,255,0.1)] rounded-3xl p-10 w-full max-w-md space-y-6"
  >
    <h2 className="text-3xl font-bold text-center text-cyan-300 tracking-widest">
      WELCOME BACK
    </h2>
    <p className="text-center text-gray-400 tracking-wide">
      Access the future
    </p>

    <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-400 transition">
      <FiMail className="text-cyan-400 mr-2" />
      <input
        type="email"
        placeholder="Email"
        className="w-full bg-transparent outline-none text-white placeholder-gray-400"
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
    </div>

    <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-400 transition">
      <FiLock className="text-cyan-400 mr-2" />
      <input
        type="password"
        placeholder="Password"
        className="w-full bg-transparent outline-none text-white placeholder-gray-400"
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
    </div>

    <button
      type="submit"
      disabled={isLoading}
      className={`w-full font-semibold py-3 rounded-lg tracking-wider transition-all duration-200 shadow-lg ${
        isLoading
          ? "bg-cyan-400/70 cursor-not-allowed"
          : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:scale-105 text-white"
      }`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            ></path>
          </svg>
          Logging in...
        </span>
      ) : (
        "Login"
      )}
    </button>

    <p className="text-center text-sm text-gray-400">
      Don’t have an account?{" "}
      <a href="/register" className="text-cyan-400 hover:underline font-medium">
        Register here
      </a>
    </p>
  </form>
</div>

  );
};

export default Login;
