import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiSave } from "react-icons/fi";

const ProfileCard = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.put("/users/me", { name, email });
      if (onUpdate) onUpdate(data.user);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="max-w-md mx-auto p-8 rounded-3xl shadow-2xl border border-white/20 bg-white/10 backdrop-blur-xl transition-all">

  <h2 className="text-3xl font-extrabold text-white text-center mb-8 tracking-tight">
    Your Profile
  </h2>

  <form onSubmit={handleSubmit} className="space-y-6 text-white">
    {/* Name Field */}
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
        Name
      </label>
      <div className="relative">
        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
        <input
          id="name"
          type="text"
          className="pl-10 w-full bg-white/5 border border-white/20 text-white placeholder-white/60 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 transition backdrop-blur-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          placeholder="Enter your name"
        />
      </div>
    </div>

    {/* Email Field */}
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
        Email
      </label>
      <div className="relative">
        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
        <input
          id="email"
          type="email"
          className="pl-10 w-full bg-white/5 border border-white/20 text-white placeholder-white/60 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 transition backdrop-blur-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="Enter your email"
        />
      </div>
    </div>

    {/* Save Button */}
    <button
      type="submit"
      disabled={loading}
      className={`w-full font-semibold py-3 rounded-xl transition flex justify-center items-center gap-2 shadow-md ${
        loading
          ? "bg-purple-400/40 text-white/80 cursor-not-allowed"
          : "bg-gradient-to-tr from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white"
      }`}
    >
      <FiSave className="text-lg" />
      {loading ? "Saving..." : "Save Changes"}
    </button>
  </form>
</div>

  );
};

export default ProfileCard;
