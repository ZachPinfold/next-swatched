import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../../../actions/swatch";
import { ColorNamesType } from "../../../types/swatches";
import FilterListItem from "./FilterListItem";

const colorNames: ColorNamesType[] = [
  { name: "all", rgb: [197, 199, 196] },
  { name: "red", rgb: [255, 28, 0] },
  { name: "yellow", rgb: [255, 247, 94] },
  { name: "orange", rgb: [255, 179, 71] },
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
  const [colorFilter, setColorFilter] = useState<ColorNamesType>({
    name: "all",
    rgb: [197, 199, 196],
  });
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const colorRef = useRef<string>();

  useEffect(() => {
    colorFilter &&
      colorRef.current &&
      colorFilter.name !== colorRef.current &&
      startGetUserSwatches("", colorFilter.name);
    colorRef.current = colorFilter.name;
  }, [colorFilter]);

  const someStyle: any = {
    "--currentColor": colorFilter.rgb,
  };

  return (
    <div className="dropdown">
      <div
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="dropdown_selected"
        style={someStyle}
      >
        <p>{colorFilter.name}</p>
      </div>
      <div
        style={someStyle}
        className={"dropdown_list " + (isDropdownOpen && "open_list")}
      >
        <ul>
          {colorNames.map((color) => {
            if (colorFilter.name !== color.name)
              return (
                <Fragment key={color.name}>
                  <FilterListItem
                    color={color}
                    setColorFilter={setColorFilter}
                    setDropdownOpen={setDropdownOpen}
                  />
                </Fragment>
              );
          })}
        </ul>
      </div>
    </div>
  );
};

export default connect(null, { startGetUserSwatches })(ColorFilter);
