import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { rgbToHex } from "../../utils/swatch";
import Lock from "./lock/Lock";
import refreshIcon from "../../assets/images/refresh_icon.svg";

interface Swatches {
  swatches: number[][];
}

const SwatchPicker = ({ swatches }: Swatches) => {
  const loadRef = useRef(false);
  const [swatchesUi, setSwatchesUi] = useState(swatches);
  const [hoverSwatch, setHoverSwatch] = useState<string | null>(null);
  const [lockedSwatch, setLockedSwatch] = useState<string | null>(null);

  const handleRefresh = async () => {
    const url = "http://colormind.io/api/";
    const data = {
      model: "default",
    };
    const headers = {
      "Content-Type": "text/plain",
    };
    const colorPallete = await axios.post(url, data, { headers });
    const result = colorPallete.data.result;
    setSwatchesUi(result);
  };

  // useEffect(() => {
  //   if (!loadRef.current) {
  //     setSwatchesUi(swatches);
  //   }
  //   loadRef.current = true;
  // }, [loadRef]);

  return (
    <div className='outer_swatch'>
      <div className='swatch_area'>
        {swatchesUi.map((swatch) => {
          let result: string = rgbToHex(swatch);

          return (
            <div
              className='inner_swatch'
              style={{
                backgroundColor: result,
                width: hoverSwatch === result ? "23%" : "20%",
              }}
              key={result}
              onMouseEnter={() => setHoverSwatch(result)}
              onMouseLeave={() => setHoverSwatch(null)}
            >
              <Lock
                setLockedSwatch={setLockedSwatch}
                result={result}
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
