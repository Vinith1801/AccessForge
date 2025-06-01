import React, { useState } from "react";
import UserFormModal from "../../components/modals/UserFormModal";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";

const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
];

const UsersPage = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowFormModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting user:", selectedUser);
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <button
          onClick={() => {
            setSelectedUser(null);
            setShowFormModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      <table className="w-full bg-white shadow border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user) => (
            <tr key={user.id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        isEdit={!!selectedUser}
        initialData={selectedUser}
      />

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        itemName={selectedUser?.name}
      />
    </div>
  );
};

export default UsersPage;
