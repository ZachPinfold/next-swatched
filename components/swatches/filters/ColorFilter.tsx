import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../../../actions/swatch";

const colorNames: string[] = [
  "all",
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "magenta",
  "pink",
];

interface Actions {
  startGetUserSwatches: (userUid: string, colorFilter: string) => void;
}

const ColorFilter = ({ startGetUserSwatches }: Actions) => {
  const [colorFilter, setColorFilter] = useState<string>("all");
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(true);

  const colorRef = useRef<string>();

  useEffect(() => {
    colorFilter &&
      colorFilter !== colorRef.current &&
      startGetUserSwatches("", colorFilter);
    colorRef.current = colorFilter;
  }, [colorFilter]);

  return (
    <div className="dropdown">
      <div
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="dropdown_selected"
        style={{
          borderBottom: !isDropdownOpen
            ? "1px solid #06d6a0"
            : "1px solid white",
        }}
      >
        <p> {colorFilter}</p>
      </div>
      <div className={"dropdown_list " + (isDropdownOpen && "open_list")}>
        <ul>
          {colorNames.map((color) => {
            return (
              <li
                onClick={() => {
                  setColorFilter(color);
                  setDropdownOpen(false);
                }}
                key={color}
              >
                {color}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default connect(null, { startGetUserSwatches })(ColorFilter);
