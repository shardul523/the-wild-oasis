import { Outlet } from "react-router-dom";
import {
  AppShell,
  AppShellHeader,
  AppShellNavbar,
  AppShellMain,
} from "@mantine/core";

function AppLayout() {
  return (
    <AppShell
      layout={"alt"}
      padding={"md"}
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm" }}
    >
      <AppShellHeader>Header</AppShellHeader>
      <AppShellNavbar>Navbar</AppShellNavbar>
      <AppShellMain>
        <Outlet />
      </AppShellMain>
    </AppShell>
  );
}

export default AppLayout;
