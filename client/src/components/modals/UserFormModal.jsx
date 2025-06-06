import { useState } from "react";

  const UserFormModal = ({ user, currentUser, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <form className="bg-white p-6 rounded w-96 space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold">Edit User</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />
        {currentUser.role === "admin" ? (
  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="w-full p-2 border rounded"
  >
    <option value="admin">Admin</option>
    <option value="editor">Editor</option>
    <option value="user">User</option>
  </select>
) : (
  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="w-full p-2 border rounded"
  >
    <option value="editor">Editor</option>
    <option value="user">User</option>
  </select>
)}


        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFormModal;
