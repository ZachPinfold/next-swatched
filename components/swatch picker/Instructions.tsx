import React from "react";
import LockedImage from "../../assets/images/LockedSwatch";

const Instructions = ({ refreshClick }: { refreshClick: boolean }) => {
  return (
    <div className="instructions_area">
      <p className="instructions">
        Hover for options, click the {<LockedImage color="#4eadab" />} to lock
        colour in place and compare against other colours.
      </p>
      <div
        style={{ opacity: refreshClick ? "1" : "0" }}
        className="loader home_loader upper_loader"
      ></div>
    </div>
  );
};

export default Instructions;
