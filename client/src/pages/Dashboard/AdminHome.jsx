const AdminHome = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Admin Dashboard</h3>
      <p>Use the sidebar to manage users, roles, and permissions.</p>
      <a href="/register" className="text-blue-600 underline">
            Register
      </a>
      <br />
      <a href="/login" className="text-blue-600 underline">
            Login here
      </a>
    </div>
  );
};

export default AdminHome;
