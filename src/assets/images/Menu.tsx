import React from "react";
import { SwatchObject } from "../../types/swatches";
import { rgbToHex } from "../../utils/swatch";

interface Actions {
  initialSwatches: SwatchObject[];
  hover: boolean;
}

const Menu = ({ initialSwatches, hover }: Actions) => {
  const arrayCopy = JSON.parse(JSON.stringify(initialSwatches));
  hover && arrayCopy.reverse();

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 18.4 17.5"
      className="menu_circle_svg"
    >
      {arrayCopy.map((color: SwatchObject, index: number) => {
        if (index < 9)
          return (
            <circle
              fill={rgbToHex(color.color)}
              className="st0"
              key={index}
              cx={
                (index + 1) % 3 === 0
                  ? "15.9"
                  : (index + 2) % 3 === 0
                  ? "9.2"
                  : "2.4"
              }
              cy={index > 5 ? "15.1" : index > 2 && index < 6 ? "8.8" : "2.4"}
              r="2.4"
            />
          );
      })}
    </svg>
  );
};

export default Menu;
