const EditDeleteActions = ({ currentUser, targetUser }) => {
  const isEditingSelf = currentUser._id === targetUser._id;
  const isTargetAdmin = targetUser.role === "admin";

  const canEdit =
    currentUser.role === "admin" ||
    (currentUser.role === "editor" && !isTargetAdmin);

  const canDelete = currentUser.role === "admin" && !isEditingSelf;

  return (
    <div className="flex gap-2">
      {canEdit && (
        <button className="px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Edit
        </button>
      )}
      {canDelete && (
        <button className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
      )}
    </div>
  );
};

export default EditDeleteActions;
