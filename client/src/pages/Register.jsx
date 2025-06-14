import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [isLoading, setIsLoading] = useState(false); // ⬅️ Loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ⬅️ Start loading
    try {
      await api.post("/auth/register", form);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false); // ⬅️ Stop loading
    }
  };

  return (
<div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden font-mono text-white">
  {/* Futuristic Background Glows */}
  <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-pink-500 opacity-20 rounded-full blur-2xl animate-pulse delay-1000"></div>

  <form
    onSubmit={handleRegister}
    className="relative z-10 border border-cyan-500/30 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_5px_rgba(0,255,255,0.1)] rounded-2xl px-10 py-12 w-full max-w-md space-y-6"
  >
    <h2 className="text-3xl font-bold text-center tracking-widest text-cyan-300">
      CREATE ACCOUNT
    </h2>
    <p className="text-center text-gray-400 tracking-wide">
      Welcome to the future of the web
    </p>

    {/* Input with neon border on focus */}
    <div className="flex items-center bg-transparent border border-gray-500 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-400 transition">
      <FiUser className="text-cyan-400 mr-2" />
      <input
        name="name"
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full bg-transparent outline-none text-white placeholder-gray-400"
        autoComplete="name"
      />
    </div>

    {/* Email */}
    <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-400 transition">
      <FiMail className="text-cyan-400 mr-2" />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full bg-transparent outline-none text-white placeholder-gray-400"
        autoComplete="email"
      />
    </div>

    {/* Password */}
    <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-400 transition">
      <FiLock className="text-cyan-400 mr-2" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full bg-transparent outline-none text-white placeholder-gray-400"
        autoComplete="new-password"
      />
    </div>

    {/* Futuristic Button */}
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full font-semibold py-3 rounded-lg tracking-wider transition-all duration-200 shadow-lg ${
        isLoading
          ? "bg-cyan-400/70 cursor-not-allowed"
          : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:scale-105 text-white"
      }`}
    >
      {isLoading ? "Registering..." : "Register"}
    </button>

    <p className="text-center text-sm text-gray-400">
      Already have an account?{" "}
      <a
        href="/login"
        className="text-cyan-400 hover:underline font-medium"
      >
        Login
      </a>
    </p>
  </form>
</div>

  );
};

export default Register;
