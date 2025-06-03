const AdminHome = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Admin Dashboard</h3>
      <p className="text-gray-600 mb-6">
        Use the sidebar to manage users, roles, and permissions.
      </p>

      <div className="space-y-2">
        <a
          href="/register"
          className="inline-block text-blue-600 hover:text-blue-800 underline transition"
        >
          Register
        </a>
        <br />
        <a
          href="/login"
          className="inline-block text-blue-600 hover:text-blue-800 underline transition"
        >
          Login here
        </a>
      </div>
    </div>
  );
};

export default AdminHome;
