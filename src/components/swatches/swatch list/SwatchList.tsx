import React, { useState } from "react";
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
    <ul className="swatch_grid wrapper_inner swatch_list">
      <SwatchAdderCard
        key={"add_hex_card"}
        swatchId={swatchId}
        setSwatchId={setSwatchId}
      />
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
            />
          );
        }
      })}
    </ul>
  );
};

export default SwatchList;
