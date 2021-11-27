import axios from "axios";
import React, { useEffect, useState } from "react";
import { rgbToHex, setCompareWidths } from "../../utils/swatch";
import Plus from "../../assets/images/Plus";
import Minus from "../../assets/images/Minus";

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

  console.log(compareArray);

  return (
    <div
      className={"swatch_selector"}
      style={{
        transform:
          compareArray.length > 2 ? " translatey(0%)" : "translatey(100%)",
      }}
    >
      <div className="compare_colour_area">
        <button
          disabled={swatchNumber === 2 && true}
          onClick={() => setNumberOfSwatches(swatchNumber - 1)}
          style={{
            opacity: swatchNumber === 2 ? "0.5" : "1",
            border: " #FF6459 solid 1px",
          }}
        >
          <Minus color={"#FF6459"} />
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
                className="inner_compare_card"
                key={index}
              ></div>
            );
          })}
        <button
          disabled={swatchNumber === 5 && true}
          onClick={() => setNumberOfSwatches(swatchNumber + 1)}
          style={{
            opacity: swatchNumber === 5 ? "0.5" : "1",
            border: " #06d6a3 solid 1px",
          }}
        >
          <Plus color={"#06D6A3"} />
        </button>
      </div>
      <div className="progress_area">
        {compareArray.map((e, index) => (
          <div
            style={{
              backgroundColor:
                index < swatchNumber ? `rgb(${compareArray[0]})` : "white",
              border: `rgb(${compareArray[0]}) solid 1px`,
            }}
            key={index}
            className="progress_circle"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SwatchSelector;
