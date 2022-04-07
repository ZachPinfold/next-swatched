import React, { useState } from "react";
import CurvedArrow from "../../../assets/images/CurvedArrow";
import DeleteSwatch from "../../../assets/images/DeleteSwatch";
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
  isTutorial: boolean;
  closeTutorial: () => void;
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
  closeTutorial,
  isTutorial,
}: SwatchTypes) => {
  const [swatchId, setSwatchId] = useState<string>("");

  const body = document.getElementsByTagName("body");

  return (
    <ul className="swatch_grid wrapper_inner swatch_list">
      <SwatchAdderCard
        key={"add_hex_card"}
        swatchId={swatchId}
        setSwatchId={setSwatchId}
        step={step}
      />
      {step < 3 && isTutorial && (
        <div
          className="tut_text"
          style={{ left: step === 2 ? "420px" : "230px" }}
        >
          <h4>Welcome to swatched!</h4>
          {step === 0 && (
            <p>
              To get started, hover over the plus symbol, <br />
              then click the # symbol to add a hex colour
            </p>
          )}

          {step === 1 && <p>Try adding a hex colour, eg: CC5040</p>}
          {step === 2 && (
            <p>Now hover over the circle, and click the match icon</p>
          )}
          <button onClick={closeTutorial} className="close_onboarding">
            <DeleteSwatch color="white" />
          </button>

          <div
            className="curved_arrow"
            style={{ left: step === 1 ? "-80px" : "-80px" }}
          >
            <CurvedArrow />
          </div>
        </div>
      )}
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
