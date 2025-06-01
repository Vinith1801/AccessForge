// src/components/modals/PermissionFormModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const PermissionFormModal = ({ isOpen, onClose, isEdit = false, initialData = {} }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (isEdit && initialData) {
      setName(initialData.name || "");
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const permissionData = { name };
    if (isEdit) {
      console.log("Update Permission:", permissionData);
    } else {
      console.log("Create Permission:", permissionData);
    }
    onClose();
  };

  return (
    <Modal title={isEdit ? "Edit Permission" : "Create Permission"} isOpen={isOpen} onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Permission Name"
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

export default PermissionFormModal;
