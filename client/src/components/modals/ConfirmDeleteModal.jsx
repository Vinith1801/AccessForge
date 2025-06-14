import { useEffect, useRef, useState } from "react";

const ConfirmDeleteModal = ({ user, onClose, onConfirm }) => {
  const modalRef = useRef();
  const [loading, setLoading] = useState(false);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onConfirm(); // ensure this is an async function
      onClose();         // close modal after successful delete
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
 <div
  onClick={handleBackdropClick}
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md transition-all"
  aria-modal="true"
  role="dialog"
  aria-labelledby="delete-modal-title"
>
  {/* 🔮 Floating Gradient Backgrounds */}
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500 to-purple-500 opacity-25 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-pink-400 opacity-20 rounded-full blur-3xl"></div>
  </div>

  {/* 🧊 Glassmorphic Modal */}
  <div
    ref={modalRef}
    className="w-96 p-6 rounded-2xl shadow-xl border border-white/20 bg-white/10 backdrop-blur-xl space-y-5 z-10 text-white"
  >
    <h2 id="delete-modal-title" className="text-xl font-bold text-red-300">
      Confirm Deletion
    </h2>

    <p className="text-white/90">
      Are you sure you want to delete{" "}
      <span className="font-semibold text-red-400">{user.name}</span>? This
      action cannot be undone.
    </p>

    <div className="flex justify-end gap-3 pt-2">
      <button
        onClick={onClose}
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition backdrop-blur-sm disabled:opacity-60"
      >
        Cancel
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-white font-medium transition ${
          loading
            ? "bg-red-400 cursor-not-allowed opacity-70"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              />
            </svg>
            Deleting...
          </span>
        ) : (
          "Delete"
        )}
      </button>
    </div>
  </div>
</div>

  );
};

export default ConfirmDeleteModal;
