import { useState } from "react";
import UserFormModal from "./modals/UserFormModal";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

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
      setEditModalOpen(false);
      onRefresh();
    } catch (err) {
        console.error("Error updating user:", err);
      alert("Edit failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/users/${selectedUser._id}`);
      setDeleteModalOpen(false);
      onRefresh();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">All Users</h2>
      <table className="min-w-full bg-white border border-gray-200">
           <tbody>
        {users.map((u) => {
          const isEditingAdmin = u.role === "admin";
          const canEdit = !(currentUser.role === "editor" && isEditingAdmin);
          const canDelete = !(currentUser.role === "editor" && isEditingAdmin);
            return (
            <tr key={u._id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2 space-x-2">
                {canEdit && (
                    <button onClick={() => handleEdit(u)} className="text-blue-500">
                    Edit
                    </button>
                )}
                {canDelete && (
                    <button onClick={() => handleDelete(u)} className="text-red-500">
                    Delete
                    </button>
                )}
                </td>
            </tr>
            );
        })}
        </tbody>
      </table>
   

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
