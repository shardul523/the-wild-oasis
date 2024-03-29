import { Outlet } from "react-router-dom";
import { AppShell, Flex } from "@mantine/core";
import Logo from "./Logo";
import NavList from "./NavList";

function AppLayout() {
  return (
    <AppShell
      layout={"alt"}
      padding={{ base: 10, sm: 15, lg: "xl" }}
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "md" }}
    >
      <AppShell.Header>Header</AppShell.Header>
      <AppShell.Navbar>
        <Logo />
        <NavList />
      </AppShell.Navbar>
      <AppShell.Main bg={"gray.0"}>
        <Flex direction={"column"} gap={20}>
          <Outlet />
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}

export default AppLayout;
