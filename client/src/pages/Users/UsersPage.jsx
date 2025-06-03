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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">Users</h2>
        <button
          onClick={() => {
            setSelectedUser(null);
            setShowFormModal(true);
          }}
          className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
        >
          + Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md table-auto text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 border border-gray-200 text-left">Name</th>
              <th className="px-4 py-3 border border-gray-200 text-left">Email</th>
              <th className="px-4 py-3 border border-gray-200 text-left">Role</th>
              <th className="px-4 py-3 border border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 text-center space-x-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-yellow-600 hover:text-yellow-800 text-xs font-semibold focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-red-600 hover:text-red-800 text-xs font-semibold focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
