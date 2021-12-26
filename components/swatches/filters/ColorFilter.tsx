import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../../../actions/swatch";
import DropDownArrow from "../../../assets/images/DropDownArrow";
import HueSwatch from "../../../assets/images/HueSwatch";
import { ColorNamesType } from "../../../types/swatches";
import FilterListItem from "./FilterListItem";

const colorNames: ColorNamesType[] = [
  { name: "all swatches", rgb: [197, 199, 196] },
  { name: "red", rgb: [255, 28, 0] },
  { name: "orange", rgb: [255, 179, 71] },
  { name: "yellow", rgb: [255, 223, 0] },
  { name: "green", rgb: [3, 192, 60] },
  { name: "cyan", rgb: [0, 255, 255] },
  { name: "blue", rgb: [0, 0, 255] },
  { name: "magenta", rgb: [255, 0, 255] },
  { name: "pink", rgb: [255, 183, 197] },
];

interface Actions {
  startGetUserSwatches: (
    userUid: string,
    colorFilter: string,
    isInitialLoad: boolean
  ) => void;
  isClickedOutside: boolean;
  setIsClickedOutside: (close: boolean) => void;
  colorFilter: ColorNamesType;
  setColorFilter: (color: ColorNamesType) => void;
}

const ColorFilter = ({
  startGetUserSwatches,
  isClickedOutside,
  setIsClickedOutside,
  setColorFilter,
  colorFilter,
  isDropdownOpen,
  setDropdownOpen,
}: Actions) => {
  const colorRef = useRef<string>();

  useEffect(() => {
    if (isClickedOutside) {
      setDropdownOpen(false);
      setIsClickedOutside(false);
    }
  }, [isClickedOutside]);

  useEffect(() => {
    colorFilter &&
      colorRef.current &&
      colorFilter.name !== colorRef.current &&
      startGetUserSwatches("", colorFilter.name, false);
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
        <div
          className="dropdown_arrow_box"
          style={{
            transform: isDropdownOpen ? `rotate(180deg)` : `rotate(0deg)`,
            marginTop: isDropdownOpen ? `-4px` : `0`,
          }}
        >
          <DropDownArrow />
        </div>
      </div>
      <div
        style={someStyle}
        className={"dropdown_list " + (isDropdownOpen && "open_list")}
      >
        {" "}
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
