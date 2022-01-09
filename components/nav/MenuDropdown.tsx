import React from "react";
import Link from "next/link";

interface Actions {
  setDropdownOpen: (open: boolean) => void;
  isDropdownOpen: boolean;
}

const MenuDropdown = ({ isDropdownOpen, setDropdownOpen }: Actions) => {
  const menu = [
    { title: "my swatches", destination: "swatches" },
    { title: "my account", destination: "" },
    { title: "logout", destination: "" },
  ];

  return (
    <ul id="dropdown_comp" className={"menu_dropdown "}>
      {menu.map((item) => {
        return (
          <Link key={item.title} href={`/${item.destination}`}>
            <li onClick={() => setDropdownOpen(false)} id="dropdown_comp">
              {" "}
              {item.title}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default MenuDropdown;
