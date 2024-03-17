import { NavLink as RouterLink } from "react-router-dom";
import { NavLink as StyledLink } from "@mantine/core";

function NavLink({ label, to, icon }) {
  return (
    <RouterLink to={to}>
      {({ isActive }) => (
        <StyledLink
          component="span"
          label={label}
          active={isActive}
          color={isActive ? "violet" : ""}
          leftSection={icon}
        />
      )}
    </RouterLink>
  );
}

export default NavLink;
