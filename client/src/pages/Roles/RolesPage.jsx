// src/pages/Dashboard/RolesPage.jsx
import React, { useState } from "react";
import RoleFormModal from "../../components/modals/RoleFormModal";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import AssignPermissionsModal from "../../components/modals/AssignPermissionsModal";

const dummyRoles = [
  { id: 1, name: "Admin", permissions: ["view_users", "edit_users"] },
  { id: 2, name: "Manager", permissions: ["view_users"] },
  { id: 3, name: "User", permissions: [] },
];

const RolesPage = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const handleEdit = (role) => {
    setSelectedRole(role);
    setShowFormModal(true);
  };

  const handleDelete = (role) => {
    setSelectedRole(role);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting role:", selectedRole);
    setShowDeleteModal(false);
  };

  const handleAssignPermissions = (role) => {
    setSelectedRole(role);
    setShowPermissionModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Roles</h2>
        <button
          onClick={() => {
            setSelectedRole(null);
            setShowFormModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Role
        </button>
      </div>

      <table className="w-full bg-white shadow border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Permissions</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyRoles.map((role) => (
            <tr key={role.id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{role.name}</td>
              <td className="p-2 border text-left">
                {role.permissions.length > 0 ? (
                  role.permissions.map((p, i) => (
                    <span key={i} className="inline-block bg-gray-200 text-xs px-2 py-1 rounded m-1">
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 italic">None</span>
                )}
              </td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(role)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(role)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAssignPermissions(role)}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                >
                  Assign Permissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <RoleFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        isEdit={!!selectedRole}
        initialData={selectedRole}
      />

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        itemName={selectedRole?.name}
      />

      <AssignPermissionsModal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        role={selectedRole}
        assigned={selectedRole?.permissions || []}
      />
    </div>
  );
};

export default RolesPage;
