import React from "react";
import { SwatchObject } from "../../../types/swatches";
import { rgbToHex } from "../../../utils/swatch";

interface SwatchTypes {
  color: number[];
  setCompareArray: (userUid: number[][]) => void;
  selectSwatchToCompareRef: any;
}

const SwatchCard = ({
  color,
  setCompareArray,
  selectSwatchToCompareRef,
}: SwatchTypes) => {
  return (
    <div
      style={{ backgroundColor: rgbToHex(color) }}
      key={color[0]}
      className='swatch_card'
      onClick={() => {
        setCompareArray([color]);
        selectSwatchToCompareRef.current = true;
      }}
    ></div>
  );
};

export default SwatchCard;
