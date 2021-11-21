import React, { Fragment } from "react";
import { SwatchObject } from "../../types/swatches";
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
      {swatches.map((swatch) => {
        return (
          <SwatchCard
            color={swatch.color}
            setCompareArray={setCompareArray}
            selectSwatchToCompareRef={selectSwatchToCompareRef}
          />
        );
      })}
    </div>
  );
};

export default SwatchList;
