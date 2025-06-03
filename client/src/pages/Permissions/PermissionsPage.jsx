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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium mb-6 text-gray-800">
          Permissions Management
        </h2>

        <div className="mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
          >
            + Create Permission
          </button>
      </div>

        <PermissionFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md table-auto text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 border border-gray-200 text-left">#</th>
              <th className="px-4 py-3 border border-gray-200 text-left">Permission Name</th>
              <th className="px-4 py-3 border border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, idx) => (
              <tr
                key={perm.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{perm.name}</td>
                <td className="px-4 py-2 text-center space-x-3">
                  <button className="text-yellow-600 hover:text-yellow-800 text-xs font-semibold focus:outline-none">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-xs font-semibold focus:outline-none">
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
