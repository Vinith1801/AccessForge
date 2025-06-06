import { useState } from "react";
import api from "../api/axios";

const ProfileCard = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");
  try {
    const { data } = await api.put("/users/me", { name, email });  // ✅ Correct route
    setMessage("Profile updated successfully!");
    if (onUpdate) {
  onUpdate(data.user);
}

  } catch (error) {
    setMessage(
      error.response?.data?.message || "Failed to update profile"
    );
    console.error("Error updating profile:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-md p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {message && (
        <p className="mt-3 text-sm text-green-600 dark:text-green-400">{message}</p>
      )}
    </div>
  );
};

export default ProfileCard;
