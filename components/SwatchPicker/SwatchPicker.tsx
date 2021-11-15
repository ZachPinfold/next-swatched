import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { rgbToHex } from "../../utils/swatch";
import Lock from "./lock/Lock";
import refreshIcon from "../../assets/images/refresh_icon.svg";
import SwatchCard from "./swatch card/SwatchCard";

// Apply any to allow for includes() function

interface Swatches {
  swatches: any[];
}

const SwatchPicker = ({ swatches }: Swatches) => {
  const [swatchesUi, setSwatchesUi] = useState(swatches);
  const [hoverSwatch, setHoverSwatch] = useState<number[] | string>("");
  const [lockedSwatches, setLockedSwatches] = useState<number[][]>([]);

  const handleRefresh = async () => {
    let swatchesForRefresh;
    if (lockedSwatches) {
      swatchesForRefresh = swatchesUi.map((s) =>
        !lockedSwatches.includes(s) ? (s = "N") : (s = s)
      );
    } else swatchesForRefresh = swatchesUi;

    const url = "http://colormind.io/api/";
    const data = {
      model: "default",
      input: swatchesForRefresh,
    };
    const headers = {
      "Content-Type": "text/plain",
    };
    const colorPallete = await axios.post(url, data, { headers });
    console.log(swatchesForRefresh);

    const result = swatchesForRefresh.map((a, index) => {
      if (a === "N") a = colorPallete.data.result[index];
      return a;
    });

    setSwatchesUi(result);
  };

  return (
    <div className='outer_swatch'>
      <div className='swatch_area'>
        {swatchesUi.map((swatch, index) => {
          <h1>hello</h1>;
          return (
            <SwatchCard
              swatch={swatch}
              hoverSwatch={hoverSwatch}
              index={index}
              setHoverSwatch={setHoverSwatch}
              setLockedSwatches={setLockedSwatches}
              lockedSwatches={lockedSwatches}
            />
          );
        })}
      </div>
      <img
        onClick={handleRefresh}
        src={refreshIcon.src}
        alt='refresh_icon'
        className='refresh_icon'
      />
    </div>
  );
};

export default SwatchPicker;
