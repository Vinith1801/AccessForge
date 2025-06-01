// src/components/modals/AssignPermissionsModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

// Dummy available permissions
const allPermissions = [
  "view_users",
  "edit_users",
  "delete_users",
  "create_roles",
  "edit_roles",
  "delete_roles",
];

const AssignPermissionsModal = ({ isOpen, onClose, role, assigned = [] }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
    if (assigned && assigned.length > 0) {
        setSelectedPermissions(assigned);
    } else {
        setSelectedPermissions([]);
    }
    }, [assigned]);

  const handleToggle = (perm) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assigning permissions to role:", role.name);
    console.log("Permissions:", selectedPermissions);
    onClose();
  };

  return (
    <Modal title={`Assign Permissions - ${role?.name || "Role"}`} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {allPermissions.map((perm) => (
            <label key={perm} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(perm)}
                onChange={() => handleToggle(perm)}
              />
              <span>{perm}</span>
            </label>
          ))}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Permissions
        </button>
      </form>
    </Modal>
  );
};

export default AssignPermissionsModal;
