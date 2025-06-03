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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">Roles</h2>
        <button
          onClick={() => {
            setSelectedRole(null);
            setShowFormModal(true);
          }}
          className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
        >
          + Add Role
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Permissions</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyRoles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{role.name}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {role.permissions.length > 0 ? (
                    role.permissions.map((p, i) => (
                      <span
                        key={i}
                        className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded mr-1 mb-1"
                      >
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="italic text-gray-400">None</span>
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-yellow-600 hover:text-yellow-800 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(role)}
                    className="text-red-600 hover:text-red-800 text-xs"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAssignPermissions(role)}
                    className="text-green-600 hover:text-green-800 text-xs"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
