"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageColor("");
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Successfully signed in!");
      setMessageColor("text-green-500");

      // Set the access token and ID token in local storage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id_token", data.id_token);


      localStorage.setItem("session", JSON.stringify({ accessToken: data.access_token }));

      // Redirect to  dashboard after successful login
      router.push("/dashboard");
    } else {
      setMessage(data.error_description || "Invalid credentials.");
      setMessageColor("text-red-500");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
            Email Address
          </label>
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
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
            Password
          </label>
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
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {message && (
        <div className={`${messageColor} mt-4 text-center text-sm`}>{message}</div>
      )}

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">Don’t have an account? </span>
        <Link href="/signup" className="text-sm text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
