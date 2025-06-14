import { useState } from "react";
import UserFormModal from "./modals/UserFormModal";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const UserManagement = ({ users, onRefresh }) => {
  const { user: currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const submitEdit = async (updatedData) => {
    try {
      await api.put(`/users/${selectedUser._id}`, updatedData);
      toast.success("User updated successfully!");
      setEditModalOpen(false);
      onRefresh();
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/users/${selectedUser._id}`);
      toast.success("User deleted successfully!");
      setDeleteModalOpen(false);
      onRefresh();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  return (
<div className="mt-12">
  <h2 className="text-3xl font-bold text-white mb-6 text-center">All Users</h2>

  <div className="overflow-x-auto rounded-2xl shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md transition-all">
    <table className="min-w-full text-sm text-left text-white/90">
      <thead className="bg-gradient-to-tr from-purple-500/30 to-fuchsia-500/30 text-white uppercase tracking-wider text-xs font-semibold">
        <tr>
          <th className="px-6 py-4">Name</th>
          <th className="px-6 py-4">Email</th>
          <th className="px-6 py-4">Role</th>
          <th className="px-6 py-4">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-white/10">
        {users.map((u) => {
          const isAdmin = u.role === "admin";
          const canEdit = !(currentUser.role === "editor" && isAdmin);
          const canDelete = !(currentUser.role === "editor" && isAdmin);

          return (
            <tr
              key={u._id}
              className="hover:bg-white/10 transition-all duration-200"
            >
              <td className="px-6 py-4">{u.name}</td>
              <td className="px-6 py-4">{u.email}</td>
              <td className="px-6 py-4 capitalize">{u.role}</td>
              <td className="px-6 py-4 space-x-4">
                {canEdit && (
                  <button
                    onClick={() => handleEdit(u)}
                    className="inline-flex items-center text-indigo-300 hover:text-indigo-100 font-medium transition"
                    aria-label={`Edit ${u.name}`}
                  >
                    <FiEdit className="mr-1" />
                    Edit
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={() => handleDelete(u)}
                    className="inline-flex items-center text-red-400 hover:text-red-200 font-medium transition"
                    aria-label={`Delete ${u.name}`}
                  >
                    <FiTrash2 className="mr-1" />
                    Delete
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  {/* Modals */}
  {editModalOpen && (
    <UserFormModal
      user={selectedUser}
      currentUser={currentUser}
      onClose={() => setEditModalOpen(false)}
      onSubmit={submitEdit}
    />
  )}

  {deleteModalOpen && (
    <ConfirmDeleteModal
      user={selectedUser}
      onClose={() => setDeleteModalOpen(false)}
      onConfirm={confirmDelete}
    />
  )}
</div>

  );
};

export default UserManagement;
