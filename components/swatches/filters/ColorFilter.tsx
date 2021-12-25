import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../../../actions/swatch";
import { ColorNamesType } from "../../../types/swatches";
import FilterListItem from "./FilterListItem";

const colorNames: ColorNamesType[] = [
  { name: "all", rgb: [0, 0, 0] },
  { name: "red", rgb: [255, 28, 0] },
  { name: "yellow", rgb: [255, 247, 94] },
  { name: "green", rgb: [3, 192, 60] },
  { name: "cyan", rgb: [0, 255, 255] },
  { name: "blue", rgb: [0, 0, 255] },
  { name: "magenta", rgb: [255, 0, 255] },
  { name: "pink", rgb: [255, 183, 197] },
];

interface Actions {
  startGetUserSwatches: (userUid: string, colorFilter: string) => void;
}

const ColorFilter = ({ startGetUserSwatches }: Actions) => {
  const [colorFilter, setColorFilter] = useState<string>("all");
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const colorRef = useRef<string>();

  useEffect(() => {
    colorFilter &&
      colorRef.current &&
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
            if (colorFilter !== color.name)
              return (
                <FilterListItem
                  color={color.name}
                  rgb={color.rgb}
                  setColorFilter={setColorFilter}
                  setDropdownOpen={setDropdownOpen}
                />
              );
          })}
        </ul>
      </div>
    </div>
  );
};

export default connect(null, { startGetUserSwatches })(ColorFilter);
