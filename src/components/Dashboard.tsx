"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react"; 

const AccountCenter = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const raw = localStorage.getItem("session");
      if (!raw) return router.push("/signin");
      const session = JSON.parse(raw);
      if (!session.accessToken) return router.push("/signin");

      try {
        const res = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!res.ok) return router.push("/signin");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    localStorage.clear();
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) router.push("/");
  };

  if (loading) return <div className="p-8 text-lg">Loading...</div>;
  if (!user) return <div className="p-8 text-lg">No user found.</div>;

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-blue-800 text-white px-6 py-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/")} className="hover:text-blue-200">
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold"></h1>
        </div>
        <nav className="flex gap-6 items-center">
          <a href="/dashboard" className="hover:text-blue-200">Overview</a>
          <a href="/transactions" className="hover:text-blue-200">Transactions</a>
          <a href="/settings" className="hover:text-blue-200">Settings</a>
          <a href="/cards" className="hover:text-blue-200">Cards</a>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </nav>
      </header>




      <main className="p-6 md:p-10 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Welcome, {user.name}</h2>
          <p className="text-gray-600">Here`s an overview of your account activity.</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-700">Account Balance</h3>
            <p className="text-3xl font-bold text-blue-800 mt-2">$3,254.00</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-700">Rewards</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">8,250 pts</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-700">Credit Utilization</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">42%</p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ul className="divide-y divide-gray-200">
            <li className="py-2 flex justify-between">
              <span>Starbucks</span>
              <span>-$5.75</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Amazon Purchase</span>
              <span>-$39.99</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Paycheck</span>
              <span>+$2,100.00</span>
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Spending Overview</h3>
          <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            [Graph Placeholder]
          </div>
        </section>
      </main>
      
    </div>
   
  );
};

export default AccountCenter;
