import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import UserManagement from "../components/UserManagement";
import ProfileCard from "../components/ProfileCard";

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (user?.role !== "user") fetchUsers();
  }, []);

  const handleUserUpdate = (updatedFields) => {
  updatedUser(updatedFields);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}</h1>
      <p className="text-gray-600">Role: {user.role}</p>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      {/* Admin Panel */}
      {user.role === "admin" && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          <p className="text-gray-600">Full access to manage users.</p>

          <UserTable users={users} />
        </div>
      )}

      {/* Editor Panel */}
      {user.role === "editor" && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Editor Panel</h2>
          <p className="text-gray-600">You can view and edit users (except Admins).</p>

          <UserTable users={users} />
        </div>
      )}

      {/* User Panel */}
      {user.role === "user" && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">User Dashboard</h2>
          <p className="text-gray-600">You can view and update your own profile.</p>
        </div>
      )}

      {/* Conditional rendering based on user role */}
      {user.role === "admin" || user.role === "editor" ? (
        <UserManagement users={users} currentUser={user} onRefresh={fetchUsers} />
        ) : (
        <ProfileCard user={user} onUpdate={updateUser} />
        )}
        

    </div>
  );
};

const UserTable = ({ users }) => (
  <table className="mt-4 w-full border text-left text-sm">
    <thead className="bg-gray-200">
      <tr>
        <th className="p-2">Name</th>
        <th className="p-2">Email</th>
        <th className="p-2">Role</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <tr key={u._id} className="border-t hover:bg-gray-50">
          <td className="p-2">{u.name}</td>
          <td className="p-2">{u.email}</td>
          <td className="p-2">{u.role}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Dashboard;
