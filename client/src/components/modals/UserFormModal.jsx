// src/components/modals/UserFormModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const UserFormModal = ({ isOpen, onClose, isEdit = false, initialData = {} }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (isEdit && initialData) {
      setName(initialData.name || "");
      setEmail(initialData.email || "");
      setRole(initialData.role || "");
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, role };
    if (isEdit) {
      console.log("Update User:", userData);
      // call update API
    } else {
      console.log("Create User:", userData);
      // call create API
    }
    onClose();
  };

  return (
    <Modal title={isEdit ? "Edit User" : "Create User"} isOpen={isOpen} onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {isEdit ? "Update" : "Save"}
        </button>
      </form>
    </Modal>
  );
};

export default UserFormModal;
