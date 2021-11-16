import React from "react";
import Lock from "../lock/Lock";
import { rgbToHex } from "../../../utils/swatch";

interface Actions {
  swatch: number[];
  index: number;
  setHoverSwatch: (swatch: number[] | string) => void;
  setLockedSwatches: (swatch: number[][]) => void;
  lockedSwatches: number[][];
  onColourHover: (swatch: string) => void;
  setColourName: (swatch: string) => void;
}

const SwatchCard = ({
  swatch,
  index,
  setHoverSwatch,
  setLockedSwatches,
  lockedSwatches,
  onColourHover,
  setColourName,
}: Actions) => {
  return (
    <div
      className='inner_swatch'
      key={index}
      onMouseEnter={() => {
        setHoverSwatch(swatch);
        onColourHover(rgbToHex(swatch));
      }}
      onMouseLeave={() => {
        setHoverSwatch("");
        setColourName("");
      }}
    >
      <Lock
        setLockedSwatches={setLockedSwatches}
        result={swatch}
        lockedSwatches={lockedSwatches}
      />
    </div>
  );
};

export default SwatchCard;
