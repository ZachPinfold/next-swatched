import React from "react";
import { SwatchObject } from "../../../types/swatches";

interface SwatchTypes {
  color: string;
}

const SwatchCard = ({ color }: SwatchTypes) => {
  return (
    <div
      style={{ backgroundColor: `#${color}` }}
      key={color}
      className='swatch_card'
    ></div>
  );
};

export default SwatchCard;
