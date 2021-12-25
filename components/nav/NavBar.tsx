import React from "react";
import Menu from "../../assets/images/Menu";

const NavBar = () => {
  return (
    <nav className="wrapper">
      <div className="wrapper_inner inner_nav">
        <div className="left_area">
          <h1>Swatched</h1>
          <p>
            Use deep learning to find and save colour swatches, powered by the{" "}
            <span>ColormindAPI</span>{" "}
          </p>
        </div>
        <Menu />
      </div>
    </nav>
  );
};

export default NavBar;
