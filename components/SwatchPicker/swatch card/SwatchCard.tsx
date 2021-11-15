import React from "react";
import Lock from "../lock/Lock";

interface Actions {
  swatch: number[];
  hoverSwatch: number[] | string;
  index: number;
  setHoverSwatch: (swatch: number[] | string) => void;
  setLockedSwatches: (swatch: number[][]) => void;
  lockedSwatches: number[][];
}

const SwatchCard = ({
  swatch,
  hoverSwatch,
  index,
  setHoverSwatch,
  setLockedSwatches,
  lockedSwatches,
}: Actions) => {
  return (
    <div
      className='inner_swatch'
      style={{
        backgroundColor: `rgb(${swatch})`,
        width: hoverSwatch === swatch ? "23%" : "20%",
      }}
      key={index}
      onMouseEnter={() => setHoverSwatch(swatch)}
      onMouseLeave={() => setHoverSwatch("")}
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
