import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import firebase from '../firebase';

function Login({ setUser }) {
  const auth = firebase.auth;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return alert('Email and password are required');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/');
    } catch (error) {
      alert('Invalid credentials or user not found');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-purple-300">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">Welcome Back</h2>

        <label className="block text-sm font-medium text-purple-800 mb-1">Email</label>
        <input
          type="email"
          className="input input-bordered w-full mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium text-purple-800 mb-1">Password</label>
        <input
          type="password"
          className="input input-bordered w-full mb-6"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="btn btn-block bg-purple-700 hover:bg-purple-800 text-white">
          Login
        </button>

        <p className="text-center text-sm mt-4 text-gray-700">
          Don't have an account?
        </p>
        <NavLink
          to="/register"
          className="btn btn-block mt-2 bg-purple-400 hover:bg-purple-500 text-white"
        >
          Register
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
