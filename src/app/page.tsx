'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import SigninForm from "../components/SignInForm";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in (by checking localStorage)
    const session = localStorage.getItem("session");

    if (session) {
      // If user is loggedin, redirect them to the dashboard
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <section className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-16 py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white relative">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <Hero />
        </div>

        <div className="w-full lg:w-[400px]">
          <SigninForm />
        </div>
      </section>
      <Features />
    </>
  );
}
