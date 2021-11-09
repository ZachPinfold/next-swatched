import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { rgbToHex } from "../../utils/swatch";
import Lock from "./lock/Lock";

interface Swatches {
  swatches: number[][];
}

const SwatchPicker = ({ swatches }: Swatches) => {
  const loadRef = useRef(false);
  const [swatchesUi, setSwatchesUi] = useState(swatches);
  const [hoverSwatch, setHoverSwatch] = useState<string | null>(null);
  const [lockedSwatch, setLockedSwatch] = useState<string | null>(null);

  useEffect(() => {
    if (loadRef.current) {
      const fetchData = async () => {
        const url = "http://colormind.io/api/";
        const data = {
          model: "default",
        };
        const headers = {
          "Content-Type": "text/plain",
        };
        const colorPallete = await axios.post(url, data, { headers });
      };
      fetchData();
    } else setSwatchesUi(swatches);
    loadRef.current = true;
  }, [loadRef]);

  return (
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
  );
};

export default SwatchPicker;
