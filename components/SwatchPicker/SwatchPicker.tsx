import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { rgbToHex } from "../../utils/swatch";
import Lock from "./lock/Lock";
import refreshIcon from "../../assets/images/refresh_icon.svg";

interface Swatches {
  swatches: number[][] | string[];
}

const SwatchPicker = ({ swatches }: Swatches) => {
  const [swatchesUi, setSwatchesUi] = useState(swatches);
  const [hoverSwatch, setHoverSwatch] = useState<number[] | string | null>(
    null
  );
  const [lockedSwatch, setLockedSwatch] = useState<number[] | string | null>(
    null
  );

  const handleRefresh = async () => {
    const swatchesForRefresh = swatchesUi.map((s) =>
      s !== lockedSwatch ? (s = "N") : (s = s)
    );

    console.log(swatchesForRefresh);

    // const url = "http://colormind.io/api/";
    // const data = {
    //   model: "default",
    // };
    // const headers = {
    //   "Content-Type": "text/plain",
    // };
    // const colorPallete = await axios.post(url, data, { headers });
    // const result = colorPallete.data.result;
    // setSwatchesUi(result);
  };

  return (
    <div className='outer_swatch'>
      <div className='swatch_area'>
        {swatchesUi.map((swatch, index) => {
          return (
            <div
              className='inner_swatch'
              style={{
                backgroundColor: `rgb(${swatch})`,
                width: hoverSwatch === swatch ? "23%" : "20%",
              }}
              key={index}
              onMouseEnter={() => setHoverSwatch(swatch)}
              onMouseLeave={() => setHoverSwatch(null)}
            >
              <Lock
                setLockedSwatch={setLockedSwatch}
                result={swatch}
                lockedSwatch={lockedSwatch}
              />
            </div>
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
