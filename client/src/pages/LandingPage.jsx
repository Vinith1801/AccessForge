// src/pages/LandingPage.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLock } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden font-mono text-white"
    >
      {/* Glowing Backgrounds */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 border border-cyan-400/30 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_5px_rgba(0,255,255,0.1)] rounded-3xl p-10 w-full max-w-2xl text-center space-y-8"
      >
        <h1 className="text-4xl font-extrabold text-cyan-300 tracking-widest">
          AccessForge
        </h1>
        <p className="text-gray-300 tracking-wide">
          Secure Role-Based Access Control for Modern Web Apps
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard">
            <button className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-6 py-3 rounded-lg font-semibold tracking-wider hover:scale-105 transition">
              <FaLock className="inline-block mr-2" /> Get Started
            </button>
          </Link>
          {/* <a
            href="https://github.com/your-username/accessforge"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold tracking-wider transition"
          >
            <FaGithub className="inline-block mr-2" /> View on GitHub
          </a> */}
        </div>

        <div className="text-sm text-gray-400 mt-4">
          <p><strong>Admin:</strong> admin@gmail.com / admin123</p>
          <p><strong>Editor:</strong> editor@gmail.com / editor123</p>
          <p><strong>User:</strong> 👇👇 </p>
          <p>
            Don’t have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
