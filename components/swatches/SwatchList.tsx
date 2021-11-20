import React, { Fragment } from "react";
import { SwatchObject } from "../../types/swatches";
import SwatchCard from "./swatch card/SwatchCard";

interface SwatchTypes {
  swatches: SwatchObject[];
}

const SwatchList = ({ swatches }: SwatchTypes) => {
  return (
    <div className='swatch_grid wrapper_inner'>
      {swatches.map((swatch) => {
        return <SwatchCard color={swatch.color} />;
      })}
    </div>
  );
};

export default SwatchList;
