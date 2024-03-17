import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";
import Logo from "./Logo";
import NavList from "./NavList";

function AppLayout() {
  return (
    <AppShell
      layout={"alt"}
      padding={"md"}
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm" }}
    >
      <AppShell.Header>Header</AppShell.Header>
      <AppShell.Navbar>
        <Logo />
        <NavList />
      </AppShell.Navbar>
      <AppShell.Main bg={"gray.0"}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default AppLayout;
