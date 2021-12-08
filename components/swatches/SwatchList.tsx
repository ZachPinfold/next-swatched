import React, { useState } from "react";
import { SwatchObject } from "../../types/swatches";
import { cropImage } from "../../utils/swatch";
import SwatchAdderCard from "./swatch adder/SwatchAdderCard";
import SwatchCard from "./swatch card/SwatchCard";

interface SwatchTypes {
  swatches: SwatchObject[];
  setCompareArray: (userUid: number[][]) => void;
  selectSwatchToCompareRef: any;
  setOpenState: (setOpenState: boolean) => void;
  openState: boolean;
  setNumberOfSwatches: (num: number) => void;
  setSwatchToCompare: (num: number[]) => void;
  swatchToCompare: number[];
}
const SwatchList = ({
  swatches,
  setCompareArray,
  selectSwatchToCompareRef,
  openState,
  setOpenState,
  setNumberOfSwatches,
  setSwatchToCompare,
  swatchToCompare,
}: SwatchTypes) => {
  const [swatchId, setSwatchId] = useState<string>("");
  const [imgColour, setImageColour] = useState<number[]>([]);

  const handleCapture = async (target: HTMLInputElement) => {
    cropImage(target, setImageColour);
  };

  return (
    <div className="swatch_grid wrapper_inner">
      {swatches.map((swatch, index) => {
        if (swatch.colourId !== "none-colour") {
          return (
            <SwatchCard
              key={index}
              color={swatch.color}
              setCompareArray={setCompareArray}
              selectSwatchToCompareRef={selectSwatchToCompareRef}
              setOpenState={setOpenState}
              setNumberOfSwatches={setNumberOfSwatches}
              openState={openState}
              swatch={swatch}
              setSwatchToCompare={setSwatchToCompare}
              swatchToCompare={swatchToCompare}
              setSwatchId={setSwatchId}
              swatchId={swatchId}
            />
          );
        } else
          return (
            <SwatchAdderCard
              key={"add_hex_card"}
              swatchId={swatchId}
              setSwatchId={setSwatchId}
            />
          );
      })}
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={(e) => handleCapture(e.target)}
      />

      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: `rgb(${imgColour})`,
        }}
      ></div>
    </div>
  );
};

export default SwatchList;
