import axios from "axios";
import React, { useEffect, useState } from "react";
import { rgbToHex, setCompareWidths } from "../../utils/swatch";

interface Actions {
  compareArray: number[][];
  setCompareArray: (userUid: number[][]) => void;
  selectSwatchToCompareRef: any;
}

const SwatchSelector = ({
  compareArray,
  setCompareArray,
  selectSwatchToCompareRef,
}: Actions) => {
  const [swatchNumber, setNumberOfSwatches] = useState<number>(2);

  useEffect(() => {
    const getCompareColours = async () => {
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
      selectSwatchToCompareRef.current = false;
    };
    if (selectSwatchToCompareRef.current === true && compareArray.length > 0) {
      getCompareColours();
    }
  }, [compareArray]);

  return (
    <div
      className={
        "swatch_selector " + (compareArray.length > 1 && "show_selector")
      }
    >
      <button
        disabled={swatchNumber === 2 && true}
        onClick={() => setNumberOfSwatches(swatchNumber - 1)}
      >
        remove
      </button>

      {compareArray.length > 0 &&
        compareArray.map((compareSwatch, index) => {
          return (
            <div
              style={{
                backgroundColor: rgbToHex(compareSwatch),
                width:
                  index < swatchNumber ? setCompareWidths(swatchNumber) : "0",
              }}
              key={index}
            ></div>
          );
        })}
      <button
        disabled={swatchNumber === 5 && true}
        onClick={() => setNumberOfSwatches(swatchNumber + 1)}
      >
        add
      </button>
    </div>
  );
};

export default SwatchSelector;
