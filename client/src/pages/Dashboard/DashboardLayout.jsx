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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">AccessForge</h1>
        <nav className="space-y-4">
          <Link to="/dashboard" className="block hover:underline">
            Dashboard
          </Link>
          <Link to="/dashboard/users" className="block hover:underline">
            Users
          </Link>
          <Link to="/dashboard/roles" className="block hover:underline">
            Roles
          </Link>
          <Link to="/dashboard/permissions" className="block hover:underline">
            Permissions
          </Link>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Welcome, {user?.name}</h2>
        </div>
        <div className="bg-white rounded shadow p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
