import React, { useState } from "react";
import { SwatchObject } from "../../types/swatches";
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
          return <SwatchAdderCard key={"add_hex_card"} color={swatch.color} />;
      })}
    </div>
  );
};

export default SwatchList;
