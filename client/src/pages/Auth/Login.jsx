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
    console.log("Submitting login with:", form); // ✅ Add this line
    const res = await API.post('/auth/login', form);
    login(res.data.token);
    navigate('/dashboard');
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message); // ✅ Add this line
    alert(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div>
      <h2>Login</h2>
      <p>Welcome back! Please login to your account.</p>
          <form onSubmit={handleSubmit}>
      <input name="email" type="email" onChange={handleChange} required />
      <input name="password" type="password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
