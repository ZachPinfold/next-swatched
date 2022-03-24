import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { startLogout } from "../../actions/auth";
import { NextRouter, useRouter } from "next/router";

interface Actions {
  setDropdownOpen: (open: boolean) => void;
  isDropdownOpen: boolean;
  startLogout: (router: NextRouter) => void;
}

const MenuDropdown = ({
  isDropdownOpen,
  setDropdownOpen,
  startLogout,
}: Actions) => {
  const router: NextRouter = useRouter();

  const menu = [
    { title: "my swatches", destination: "swatches" },
    // { title: "my account", destination: "" },
    { title: "logout", destination: "", func: startLogout },
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
            <button
              onClick={() => {
                item.func(router);
              }}
              key={item.title}
            >
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
