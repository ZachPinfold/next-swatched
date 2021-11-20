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
}: Swatches) => {
  const [hoverSwatch, setHoverSwatch] = useState<number[]>([]);

  // handleRefresh handles the refreshing of the colour palette from the client.
  // Checks for locked colours and retains they're position

  return (
    <div className='outer_swatch'>
      <div className='swatch_area'>
        {swatches.map((swatch, index) => {
          return (
            <div
              className='swatch_card'
              style={{
                backgroundColor: `rgb(${swatch})`,
                width: hoverSwatch === swatch ? "23%" : "20%",
              }}
              key={index}
            >
              <SwatchCard
                swatch={swatch}
                index={index}
                setHoverSwatch={setHoverSwatch}
                setLockedSwatches={setLockedSwatches}
                lockedSwatches={lockedSwatches}
                hoverSwatch={hoverSwatch}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SwatchPicker;
