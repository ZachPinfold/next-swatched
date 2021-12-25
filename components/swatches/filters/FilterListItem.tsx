import React from "react";

interface Actions {
  setColorFilter: (color: string) => void;
  color: string;
  setDropdownOpen: (bool: boolean) => void;
  rgb: number[];
}

const FilterListItem = ({
  setColorFilter,
  color,
  setDropdownOpen,
}: Actions) => {
  const someStyle: any = {
    "--color": color,
  };

  console.log(someStyle["--color"]);

  return (
    <li
      onClick={() => {
        setColorFilter(color);
        setDropdownOpen(false);
      }}
      key={color}
      style={someStyle}
    >
      {color}
    </li>
  );
};

export default FilterListItem;
