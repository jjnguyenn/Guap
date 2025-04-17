// components/Navbar.tsx
import React from "react";
import Link from "next/link";


const Navbar = () => {
  return (
    <nav className="bg-teal-500 text-white p-4 fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold">Guap</Link>
        <div className="space-x-4">
          <a href="/signin" className="hover:text-gray-300">Login</a>
          <a href="/signup" className="hover:text-gray-300">Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
