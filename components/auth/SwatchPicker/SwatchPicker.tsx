import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface InitialSwatch {
  swatches: string[][];
}

const SwatchPicker = ({ swatches }: InitialSwatch) => {
  const loadRef = useRef(false);
  const [swatchesUi, setSwatchesUi] = useState([
    [23, 64, 50],
    [113, 147, 10],
    [141, 195, 33],
    [222, 244, 55],
    [216, 194, 136],
  ]);

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

  return <div>{swatchesUi[0][0]}</div>;
};

export default SwatchPicker;
