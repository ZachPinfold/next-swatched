import React from "react";
import Link from "next/link";

const MenuDropdown = ({ isDropdownOpen }) => {
  const menu = [
    { title: "my swatches", destination: "swatches" },
    { title: "my account" },
    { title: "logout" },
  ];

  return (
    <ul
      id="dropdown_comp"
      className={"menu_dropdown " + (isDropdownOpen && "open_list")}
    >
      {menu.map((item) => {
        return (
          <Link href={`/${item.destination}`}>
            <li> {item.title}</li>
          </Link>
        );
      })}
    </ul>
  );
};

export default MenuDropdown;
