import { useState, useEffect, useRef } from "react";

const UserFormModal = ({ user, currentUser, onClose, onSubmit }) => {
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const [loading, setLoading] = useState(false); // ⬅️ loading state

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      await onSubmit(formData); // assumes async
      onClose(); // close modal after success
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Close on outside click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm transition-all"
    >
      {/* Gradient Blur Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-400 to-fuchsia-500 opacity-25 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-teal-400 opacity-20 rounded-full blur-3xl"></div>
      </div>

<form
  ref={modalRef}
  onSubmit={handleSubmit}
  className="w-96 bg-white/5 backdrop-blur-xl border border-cyan-400/20 text-white rounded-2xl shadow-[0_0_30px_#0ff3] p-6 space-y-5 z-10"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title" className="text-xl font-bold text-cyan-300">
    Edit User
  </h2>

  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    className="w-full p-3 rounded-lg bg-white/10 border border-cyan-300/20 placeholder:text-cyan-200 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
    placeholder="Name"
    required
  />

  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    className="w-full p-3 rounded-lg bg-white/10 border border-cyan-300/20 placeholder:text-cyan-200 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
    placeholder="Email"
    required
  />

 <select
  name="role"
  value={formData.role}
  onChange={handleChange}
  className="w-full p-3 rounded-lg bg-white/10 text-white border border-cyan-300/20 backdrop-blur-md appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
>
  {currentUser.role === "admin" && (
    <option className="bg-slate-900 text-white" value="admin">
      Admin
    </option>
  )}
  <option className="bg-slate-900 text-white" value="editor">
    Editor
  </option>
  <option className="bg-slate-900 text-white" value="user">
    User
  </option>
</select>

  <div className="flex justify-end gap-3 pt-2">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 rounded-lg bg-white/10 text-cyan-100 hover:bg-white/20 transition border border-cyan-300/20"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={loading}
      className={`px-4 py-2 rounded-lg text-white transition font-semibold ${
        loading
          ? "bg-cyan-400 cursor-not-allowed opacity-70"
          : "bg-cyan-600 hover:bg-cyan-700 shadow-lg"
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
          Saving...
        </span>
      ) : (
        "Save"
      )}
    </button>
  </div>
</form>

    </div>
  );
};

export default UserFormModal;
