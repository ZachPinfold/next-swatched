import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { rgbToHex } from "../../../utils/swatch";

interface InitialSwatch {
  swatches: number[][];
}

const SwatchPicker = ({ swatches }: InitialSwatch) => {
  const loadRef = useRef(false);
  const [swatchesUi, setSwatchesUi] = useState(swatches);

  let list: Array<number> = swatches[0];

  rgbToHex(list);

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
    }
    loadRef.current = true;
  }, [loadRef]);

  return <div>hello</div>;
};

export default SwatchPicker;
