"use client";

import React, { useState } from "react";
import Link from "next/link";

const SignUpForm = () => {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match");
      setMessageColor("text-red-500")
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/dbconnections/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
          username,
          email,
          password,
          connection: process.env.NEXT_PUBLIC_AUTH0_DB_CONNECTION,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Account created successfully! Please check your email to verify your account.");
        setMessageColor("text-green-500")

      } else {
        setMessage(data?.message || "Something went wrong.");
        setMessageColor("text-red-500");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Unexpected error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Create Account</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-600">Username</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm" className="block text-sm font-semibold text-gray-600">Confirm Password</label>
          <input
            type="password"
            id="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="********"

          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>   
      {message && (
        <div className={`${messageColor} mt-4 text-center text-sm`}>    
          {message}
        </div>
      )}
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <Link href="/signin" className="text-sm text-blue-600 hover:underline">Sign in</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
