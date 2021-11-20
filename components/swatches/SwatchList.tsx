import React, { Fragment } from "react";
import { SwatchObject } from "../../types/swatches";

interface SwatchTypes {
  swatches: SwatchObject[];
}

const SwatchList = ({ swatches }: SwatchTypes) => {
  return (
    <div className='swatch_grid wrapper_inner'>
      {swatches.map((swatch) => {
        console.log(swatch);

        return (
          <div
            style={{ backgroundColor: `#${swatch.color}` }}
            key={swatch.color}
            className='swatch_card'
          ></div>
        );
      })}
    </div>
  );
};

export default SwatchList;
