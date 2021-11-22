import React from "react";
import { SwatchObject } from "../../types/swatches";
import SwatchAdderCard from "./swatch adder/SwatchAdderCard";
import SwatchCard from "./swatch card/SwatchCard";

interface SwatchTypes {
  swatches: SwatchObject[];
  setCompareArray: (userUid: number[][]) => void;
  selectSwatchToCompareRef: any;
}

const SwatchList = ({
  swatches,
  setCompareArray,
  selectSwatchToCompareRef,
}: SwatchTypes) => {
  return (
    <div className='swatch_grid wrapper_inner'>
      {swatches.map((swatch, index) => {
        if (swatch.colourId !== "none-colour") {
          return (
            <SwatchCard
              color={swatch.color}
              setCompareArray={setCompareArray}
              selectSwatchToCompareRef={selectSwatchToCompareRef}
            />
          );
        } else return <SwatchAdderCard color={swatch.color} />;
      })}
    </div>
  );
};

export default SwatchList;
