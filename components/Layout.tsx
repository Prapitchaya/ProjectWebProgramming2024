import React, { useState } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode; // To render content inside the layout
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Perform any necessary logout actions here
    localStorage.removeItem('user'); // Clear user from local storage or any other state
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-purple-300 text-white p-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Recipe Sharing Platform</h1>

          {/* Navbar */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/about" className="hover:text-purple-600">About</Link>
            <Link href="/contact" className="hover:text-purple-600">Contact</Link>
            <Link href="/faq" className="hover:text-purple-600">FAQ</Link>

            {/* Logout button for desktop */}
            <button
              onClick={handleLogout}
              className="bg-white text-purple-600 py-2 px-4 rounded-lg shadow-lg border-2 border-purple-600 hover:bg-purple-100 transition duration-200"
            >
              Logout
            </button>
          </nav>

          {/* Hamburger icon for mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-purple-300 text-white p-4 space-y-4">
            <Link href="/about" className="block hover:text-purple-600">ABOUT</Link>
            <Link href="/contact" className="block hover:text-purple-600">Contact</Link>
            <Link href="/faq" className="block hover:text-purple-600">FAQ</Link>

            {/* Logout button for mobile */}
            <button
              onClick={handleLogout}
              className="block w-full bg-white text-purple-600 py-2 px-4 rounded-lg shadow-lg border-2 border-purple-600 hover:bg-purple-100 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-purple-50 p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-purple-300 text-white p-4 text-center">
        <p>&copy; 2024 Recipe Sharing Platform by Prapitchaya Tantivit | Web Programming Project</p>
      </footer>
    </div>
  );
}
