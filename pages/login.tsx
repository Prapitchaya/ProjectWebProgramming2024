/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../styles/globals.css';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
    
    if (res.ok) {
      alert('Login successful');
      // Store user ID in localStorage
      localStorage.setItem('userId', data.user.id); // Make sure the ID is saved
      router.push('/homepage'); // Redirect to homepage
    } else {
      alert(data.error || 'An error occurred during login');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-purple-800">
      <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md" onSubmit={handleLogin}>
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Login</h1>
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-purple-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
