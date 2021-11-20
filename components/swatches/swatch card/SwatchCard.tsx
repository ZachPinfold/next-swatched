import React from "react";
import { SwatchObject } from "../../../types/swatches";
import { rgbToHex } from "../../../utils/swatch";

interface SwatchTypes {
  color: number[];
}

const SwatchCard = ({ color }: SwatchTypes) => {
  return (
    <div
      style={{ backgroundColor: rgbToHex(color) }}
      key={color[0]}
      className='swatch_card'
    ></div>
  );
};

export default SwatchCard;
