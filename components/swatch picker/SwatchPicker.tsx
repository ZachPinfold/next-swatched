import axios from "axios";
import React, { useState } from "react";
import refreshIcon from "../../assets/images/refresh_icon.svg";
import SwatchCard from "./swatch card/SwatchCard";

// Apply any to allow for includes() function

interface Swatches {
  swatches: any[];
  setLockedSwatches: (swatch: number[][]) => void;
  lockedSwatches: number[][];
}

const SwatchPicker = ({
  swatches,
  setLockedSwatches,
  lockedSwatches,
  initialLoadRef,
}: Swatches) => {
  const [hoverSwatch, setHoverSwatch] = useState<number[]>([]);

  return (
    <div className="outer_swatch">
      <div className="swatch_area">
        {swatches.map((swatch, index) => {
          return (
            <div
              className={
                !initialLoadRef.current ? "initial_colour_card" : "colour_card"
              }
              style={{
                backgroundColor: !initialLoadRef.current
                  ? "white"
                  : `rgb(${swatch})`,
                width: hoverSwatch === swatch ? "23%" : "20%",
              }}
              key={index}
            >
              {initialLoadRef.current && (
                <SwatchCard
                  swatch={swatch}
                  index={index}
                  setHoverSwatch={setHoverSwatch}
                  setLockedSwatches={setLockedSwatches}
                  lockedSwatches={lockedSwatches}
                  hoverSwatch={hoverSwatch}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SwatchPicker;
