import React, { useState } from "react";
import PermissionFormModal from "../../components/modals/PermissionFormModal";

const permissions = [
  { id: 1, name: "create_user" },
  { id: 2, name: "edit_user" },
  { id: 3, name: "delete_user" },
  { id: 4, name: "view_user" },
  { id: 5, name: "manage_roles" },
];

const PermissionsPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Permissions Management</h2>

      <div className="mb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          + Create Permission
        </button>
        <PermissionFormModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Permission Name</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, idx) => (
              <tr key={perm.id} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{perm.name}</td>
                <td className="px-4 py-2 border">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 text-sm">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionsPage;
