import axios from "axios";
import React, { useEffect } from "react";
import Plus from "../../assets/images/Plus";
import Minus from "../../assets/images/Minus";
import expandImage from "../../assets/images/arrow_swatch.svg";
import CompareCard from "./CompareCard";

interface Actions {
  compareArray: number[][];
  setCompareArray: (userUid: number[][]) => void;
  selectSwatchToCompareRef: any;
  setOpenState: (setOpenState: boolean) => void;
  openState: boolean;
  setNumberOfSwatches: (num: number) => void;
  swatchNumber: number;
  setFullScreen: (fullScreen: boolean) => void;
  fullScreen: boolean;
  swatchToCompare: number[];
  setSwatchToCompare: (color: number[]) => void;
}

const SwatchSelector = ({
  compareArray,
  setCompareArray,
  selectSwatchToCompareRef,
  openState,
  setOpenState,
  swatchNumber,
  setNumberOfSwatches,
  setFullScreen,
  fullScreen,
  swatchToCompare,
  setSwatchToCompare,
}: Actions) => {
  useEffect(() => {
    const getCompareColours = async () => {
      console.log("fire");

      try {
        const data = {
          model: "default",
          input: [swatchToCompare, "N", "N", "N", "N"],
        };

        const apiResponse = await axios.post("/api/colorMind", data);

        setCompareArray(apiResponse.data.colourData);
      } catch (error) {
        console.log(error);
      }
      selectSwatchToCompareRef.current = false;
    };

    if (
      selectSwatchToCompareRef.current === true &&
      swatchToCompare.length > 0
    ) {
      getCompareColours();
    }
  }, [swatchToCompare]);

  return (
    <div
      className={"swatch_selector"}
      style={{
        height: fullScreen ? "100%" : "35%",
        transform:
          compareArray.length > 2 && openState
            ? " translatey(0%)"
            : "translatey(100%)",
      }}
    >
      <div className="compare_colour_area">
        <button
          disabled={swatchNumber === 1 && true}
          onClick={() => setNumberOfSwatches(swatchNumber - 1)}
          style={{
            opacity: swatchNumber === 1 ? "0.5" : "1",
          }}
          className="plusMinus"
        >
          <Minus color={"#FF6459"} />
        </button>
        <div className="inner_compare">
          {compareArray.length > 0 &&
            compareArray.map((compareSwatch, index) => {
              return (
                <CompareCard
                  compareSwatch={compareSwatch}
                  index={index}
                  swatchNumber={swatchNumber}
                  key={index}
                />
              );
            })}
        </div>
        <button
          disabled={swatchNumber === 5 && true}
          onClick={() => setNumberOfSwatches(swatchNumber + 1)}
          style={{
            opacity: swatchNumber === 5 ? "0.5" : "1",
          }}
          className="plusMinus"
        >
          <Plus color={"#06D6A3"} />
        </button>

        <button
          className="close_btn"
          onClick={() => {
            setOpenState(false);
            setTimeout(function () {
              setNumberOfSwatches(2);
              setCompareArray([]);
              setSwatchToCompare([]);
              setFullScreen(false);
            }, 200);
          }}
        >
          <Plus color={"#ff6459"} />
        </button>
        <button
          className="expand_btn"
          onClick={() => {
            setFullScreen(!fullScreen);
          }}
        >
          <img src={expandImage.src} alt="" />
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
