// src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '../../components/Dashboard';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if there's valid session in localStorage
    const rawSession = localStorage.getItem('session');
    
    if (!rawSession) {
      // If session not found, redirect to the sign-in page
      console.log("No session found, redirecting...");
      router.push('/signin');
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <Dashboard />
  );
};

export default Page;
