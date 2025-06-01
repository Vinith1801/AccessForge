// src/components/modals/RoleFormModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const RoleFormModal = ({ isOpen, onClose, isEdit = false, initialData = {} }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (isEdit && initialData) {
      setName(initialData.name || "");
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const roleData = { name };
    if (isEdit) {
      console.log("Update Role:", roleData);
    } else {
      console.log("Create Role:", roleData);
    }
    onClose();
  };

  return (
    <Modal title={isEdit ? "Edit Role" : "Create Role"} isOpen={isOpen} onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEdit ? "Update" : "Save"}
        </button>
      </form>
    </Modal>
  );
};

export default RoleFormModal;
