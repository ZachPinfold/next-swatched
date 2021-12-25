import React from "react";
import { ColorNamesType } from "../../../types/swatches";

interface Actions {
  setColorFilter: (color: ColorNamesType) => void;
  color: ColorNamesType;
  setDropdownOpen: (bool: boolean) => void;
}

const FilterListItem = ({
  setColorFilter,
  color,
  setDropdownOpen,
}: Actions) => {
  const someStyle: any = {
    "--color": color.rgb,
  };

  return (
    <li
      onClick={() => {
        setColorFilter(color);
        setDropdownOpen(false);
      }}
      style={someStyle}
    >
      {color.name}
    </li>
  );
};

export default FilterListItem;
