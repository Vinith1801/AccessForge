import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-10">AccessForge</h1>
        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/users"
            className="block px-3 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Users
          </Link>
          <Link
            to="/dashboard/roles"
            className="block px-3 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Roles
          </Link>
          <Link
            to="/dashboard/permissions"
            className="block px-3 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Permissions
          </Link>
          <button
            onClick={handleLogout}
            className="mt-6 w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Welcome, {user?.name || "User"}
          </h2>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
