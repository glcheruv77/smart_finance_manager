import { Outlet } from "react-router-dom";
import AppShell from "./Appshell";

export default function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
