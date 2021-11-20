import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { rgbToHex, setCompareWidths } from "../../utils/swatch";

const SwatchSelector = () => {
  const [compareArray, setCompareArray] = useState<number[][]>([[100, 39, 35]]);
  const [swatchNumber, setNumberOfSwatches] = useState<number>(1);
  const loadRef = useRef(false);

  useEffect(() => {
    const getCompareColours = async () => {
      console.log("fire");

      try {
        const data = {
          model: "default",
          input: [compareArray[0], "N", "N", "N", "N"],
        };

        const apiResponse = await axios.post("/api/colorMind", data);

        setCompareArray(apiResponse.data.colourData);
      } catch (error) {
        console.log(error);
      }
    };
    if (loadRef.current === false) {
      getCompareColours();
    }
    loadRef.current = true;
  }, []);

  return (
    <div className='swatch_selector'>
      {compareArray.map((compareSwatch, index) => {
        return (
          <div
            style={{
              backgroundColor: rgbToHex(compareSwatch),
              width: setCompareWidths(swatchNumber),
              display: index > swatchNumber ? "none" : "block",
            }}
            key={index}
          ></div>
        );
      })}
      <button onClick={() => setNumberOfSwatches(swatchNumber + 1)}>add</button>
    </div>
  );
};

export default SwatchSelector;
