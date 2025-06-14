import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import UserManagement from "../components/UserManagement";
import ProfileCard from "../components/ProfileCard";
import toast from "react-hot-toast";
import { FiLogOut, FiUser, FiUsers } from "react-icons/fi";

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
      toast.success("Users fetched successfully!");
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    if (user?.role !== "user") fetchUsers();
  }, [user]);

  return (
<div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden p-6 font-mono">
  {/* Background Neon Glows */}
  <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
  <div className="absolute bottom-24 right-16 w-80 h-80 bg-pink-500 rounded-full blur-2xl opacity-20 animate-pulse delay-1000"></div>

  <div className="relative z-10 max-w-6xl mx-auto bg-white/5 backdrop-blur-md border border-cyan-400/10 rounded-3xl p-8 shadow-[0_0_50px_#00ffff44] space-y-10">

    {/* Header */}
    <header className="flex flex-col md:flex-row justify-between items-center border-b border-cyan-400/20 pb-6">
      <div>
        <h1 className="text-4xl font-extrabold text-cyan-300">Welcome, {user.name}</h1>
        <p className="text-cyan-100 mt-1 text-lg">Role: <span className="font-semibold capitalize text-purple-300">{user.role}</span></p>
      </div>

      <button
        onClick={logout}
        className="mt-4 md:mt-0 flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-red-600 hover:brightness-110 text-white font-semibold rounded-lg shadow-md transition"
      >
        <FiLogOut /> Logout
      </button>
    </header>

    {/* Panels */}
    <main className="space-y-8">
      {(user.role === "admin" || user.role === "editor") && (
        <section className="bg-[#1a1a2e] border border-purple-400/30 p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-purple-300 flex items-center gap-2">
            <FiUsers />
            {user.role === "admin" ? "Admin Panel" : "Editor Panel"}
          </h2>
          <p className="text-gray-300">
            {user.role === "admin"
              ? "Full access to manage all users."
              : "You can view and edit user data (except Admins)."}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition"
            >
              <FiUser />
              {showProfile ? "Hide Profile" : "View Profile"}
            </button>
          </div>

          {showProfile && (
            <div className="mt-4">
              <ProfileCard user={user} onUpdate={updateUser} />
            </div>
          )}

          <div className="mt-6">
            <UserManagement users={users} currentUser={user} onRefresh={fetchUsers} />
          </div>
        </section>
      )}

      {user.role === "user" && (
        <section className="bg-[#1f1f3d] border border-gray-500/20 rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-cyan-200 mb-2">User Dashboard</h2>
          <p className="text-gray-300 mb-4">You can view and update your own profile.</p>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition"
          >
            <FiUser />
            {showProfile ? "Hide Profile" : "View Profile"}
          </button>

          {showProfile && (
            <div className="mt-4">
              <ProfileCard user={user} onUpdate={updateUser} />
            </div>
          )}
        </section>
      )}
    </main>
  </div>
</div>

  );
};

export default Dashboard;
