import { useState, useContext } from 'react';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post('/auth/login', form);
    login(res.data.token);
    navigate('/dashboard');
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message); // ✅ Add this line
    alert(err.response?.data?.message || 'Login failed');
  }
};


  return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-1">Login</h2>
    <p className="text-sm text-gray-500 mb-6">
      Welcome back! Please login to your account.
    </p>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
    <p className="mt-4 text-sm text-gray-600 text-center">
      Don't have an account?{' '}
      <a href="/register" className="text-blue-600 hover:underline">
        Register
      </a>
    </p>
  </div>
</div>

  );
}
