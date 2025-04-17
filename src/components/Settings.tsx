"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

const SettingsPage = () => {
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
          <a href="/settings" className="hover:text-blue-200 font-semibold underline underline-offset-4">Settings</a>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </nav>
      </header>


      <main className="p-6 md:p-10 space-y-8">
        <h2 className="text-2xl font-semibold">Account Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Personal Info</h3>
            <p className="text-gray-500 mb-4">Update your email address.</p>
      
            <input
              className="w-full p-2 border rounded"
              placeholder="Email"
              defaultValue={user.email}
            />
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>


          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Notifications</h3>
            <p className="text-gray-500 mb-4">Choose when to receive email alerts.</p>
            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" defaultChecked />
              <span>Email me about account activity</span>
            </label>
            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" />
              <span>Notify me about payment due dates</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Product updates and offers</span>
            </label>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Preferences
            </button>
          </div>



<div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
  <h3 className="text-lg font-medium text-gray-700 mb-2">Change Password</h3>
  <p className="text-gray-500 mb-4">Ensure your account is using a strong password.</p>
  <button
    onClick={() => router.push("/change-password")}
    className="text-blue-600 hover:underline font-medium"
  >
    Change your password
  </button>
</div>



          <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
            <h3 className="text-lg font-medium text-red-700 mb-2">Close Account</h3>
            <p className="text-gray-500 mb-4">This will permanently close your account. Proceed with caution.</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Close My Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
