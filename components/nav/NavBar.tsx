import React from "react";

const NavBar = () => {
  return (
    <nav className="wrapper">
      <div className="wrapper_inner">
        <h1>Swatched</h1>
        <p>
          Use deep learning to find and save colour swatches, powered by the{" "}
          <span>ColormindAPI</span>{" "}
        </p>
        <ul className="links">{/* <li></li> */}</ul>
      </div>
    </nav>
  );
};

export default NavBar;
