import React, { useEffect, useState } from "react";
import Lock from "../lock/Lock";
import { getContrastYIQ, rgbToHex } from "../../../utils/swatch";
import axios from "axios";
import SwatchTextDetails from "../text details/SwatchTextDetails";

interface Actions {
  swatch: number[];
  index: number;
  setHoverSwatch: (swatch: number[]) => void;
  setLockedSwatches: (swatch: number[][]) => void;
  lockedSwatches: number[][];
  hoverSwatch: number[];
}

const SwatchCard = ({
  swatch,
  index,
  setHoverSwatch,
  setLockedSwatches,
  lockedSwatches,
  hoverSwatch,
}: Actions) => {
  const [colourData, setColourName] = useState<any>({});

  useEffect(() => {
    const getColourDetails = async (hex: string) => {
      const colourDetails = await axios.get(
        `https://www.thecolorapi.com/id?hex=${hex.replace("#", "")}`
      );

      const name = colourDetails.data.name.value;
      const cmyk = colourDetails.data.cmyk.value;
      const rgb = colourDetails.data.rgb.value;
      const hexName = colourDetails.data.hex.value;

      setColourName({ name, cmyk, rgb, hexName });
    };
    getColourDetails(rgbToHex(swatch));
  }, [swatch]);

  return (
    <div
      className='inner_swatch'
      key={index}
      onMouseEnter={() => {
        setHoverSwatch(swatch);
        setHoverSwatch(swatch);
      }}
      onMouseLeave={() => {
        setHoverSwatch([]);
      }}
    >
      <Lock
        setLockedSwatches={setLockedSwatches}
        result={swatch}
        lockedSwatches={lockedSwatches}
        color={getContrastYIQ(rgbToHex(swatch))}
      />
      {hoverSwatch === swatch && (
        <SwatchTextDetails
          name={colourData.name}
          cmyk={colourData.cmyk}
          rgb={colourData.rgb}
          hexName={colourData.hexName}
        />
      )}
    </div>
  );
};

export default SwatchCard;
