// src/components/modals/ConfirmDeleteModal.jsx
import React from "react";
import Modal from "./Modal";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName = "item" }) => {
  return (
    <Modal title="Confirm Delete" isOpen={isOpen} onClose={onClose}>
      <p className="mb-4">Are you sure you want to delete <strong>{itemName}</strong>?</p>
      <div className="flex justify-end space-x-2">
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
