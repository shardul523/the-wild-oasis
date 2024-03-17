import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { Flex } from "@mantine/core";
import NavLink from "./NavLink";

const links = [
  {
    to: "/dashboard",
    icon: <HiOutlineHome />,
    label: "Home",
  },
  {
    to: "/bookings",
    icon: <HiOutlineCalendarDays />,
    label: "Bookings",
  },
  {
    to: "/cabins",
    icon: <HiOutlineHomeModern />,
    label: "Cabins",
  },
  {
    to: "/users",
    icon: <HiOutlineUsers />,
    label: "Users",
  },
  {
    to: "/settings",
    icon: <HiOutlineCog6Tooth />,
    label: "Settings",
  },
];

function NavList() {
  return (
    <Flex component="ul" direction={"column"} px={10} gap={10}>
      {links.map((link) => (
        <li className="full-width" key={link.to}>
          <NavLink {...link} />
        </li>
      ))}
    </Flex>
  );
}

export default NavList;
