import { FiEdit, FiTrash2 } from "react-icons/fi";

const EditDeleteActions = ({ currentUser, targetUser, onEdit, onDelete }) => {
  const isEditingSelf = currentUser._id === targetUser._id;
  const isTargetAdmin = targetUser.role === "admin";

  const canEdit =
    currentUser.role === "admin" ||
    (currentUser.role === "editor" && !isTargetAdmin);

  const canDelete = currentUser.role === "admin" && !isEditingSelf;

  return (
<div className="flex gap-3">
  {canEdit && (
    <button
      onClick={() => onEdit?.(targetUser)}
      className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-md bg-yellow-400/10 border border-yellow-400/40 text-yellow-200 hover:bg-yellow-500/20 hover:text-yellow-100 transition shadow-[0_0_8px_#facc15aa]"
      aria-label={`Edit ${targetUser.name}`}
    >
      <FiEdit size={16} /> Edit
    </button>
  )}
  {canDelete && (
    <button
      onClick={() => onDelete?.(targetUser)}
      className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-md bg-red-500/10 border border-red-500/40 text-red-300 hover:bg-red-600/20 hover:text-red-100 transition shadow-[0_0_8px_#f87171aa]"
      aria-label={`Delete ${targetUser.name}`}
    >
      <FiTrash2 size={16} /> Delete
    </button>
  )}
</div>

  );
};

export default EditDeleteActions;
