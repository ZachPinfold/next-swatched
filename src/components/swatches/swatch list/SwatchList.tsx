import React, { useState } from "react";
import CurvedArrow from "../../../assets/images/CurvedArrow";
import { SwatchObject } from "../../../types/swatches";
import SwatchAdderCard from "../swatch adder/SwatchAdderCard";
import SwatchCard from "../swatch card/SwatchCard";

interface SwatchTypes {
  swatches: SwatchObject[];
  setCompareArray: React.Dispatch<React.SetStateAction<number[][]>>;
  selectSwatchToCompareRef: any;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
  openState: boolean;
  setNumberOfSwatches: React.Dispatch<React.SetStateAction<number>>;
  setSwatchToCompare: React.Dispatch<React.SetStateAction<number[]>>;
  swatchToCompare: number[];
  step: number;
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
  step,
}: SwatchTypes) => {
  const [swatchId, setSwatchId] = useState<string>("");

  return (
    <ul className="swatch_grid wrapper_inner swatch_list">
      <SwatchAdderCard
        key={"add_hex_card"}
        swatchId={swatchId}
        setSwatchId={setSwatchId}
        step={step}
      />
      <div className="tut_text">
        <h4>Welcome to swatched!</h4>
        {step === 0 && <p>To get started, hover over the plus symbol,</p>}
        {step === 0 && <p>then click the # symbol to add a hex colour</p>}
        {step === 1 && <p>Add a swatch colour, eg: CC5040</p>}
        <div
          className="curved_arrow"
          style={{ left: step === 1 ? "-30px" : "-80px" }}
        >
          <CurvedArrow />
        </div>
      </div>
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
              frontPage={false}
              step={step}
              index={index}
            />
          );
        }
      })}
    </ul>
  );
};

export default SwatchList;
