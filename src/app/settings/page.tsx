import dynamic from "next/dynamic";

const SettingsPage = dynamic(() => import ("@/components/Settings"));

export default function Settings() {
  return <SettingsPage />;
}
