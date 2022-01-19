import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { startLogout } from "../../actions/auth";

interface Actions {
  setDropdownOpen: (open: boolean) => void;
  isDropdownOpen: boolean;
}

const MenuDropdown = ({ isDropdownOpen, setDropdownOpen }: Actions) => {
  const menu = [
    { title: "my swatches", destination: "swatches" },
    { title: "my account", destination: "" },
    { title: "logout", destination: "", func: "" },
  ];

  return (
    <ul id="dropdown_comp" className={"menu_dropdown "}>
      {menu.map((item) => {
        if (!item.func) {
          return (
            <Link key={item.title} href={`/${item.destination}`}>
              <li onClick={() => setDropdownOpen(false)} id="dropdown_comp">
                {" "}
                {item.title}
              </li>
            </Link>
          );
        } else {
          return (
            <button onClick={() => {}} key={item.title}>
              <li onClick={() => setDropdownOpen(false)} id="dropdown_comp">
                {" "}
                {item.title}
              </li>
            </button>
          );
        }
      })}
    </ul>
  );
};

export default connect(null, { startLogout })(MenuDropdown);
