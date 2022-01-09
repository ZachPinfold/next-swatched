import React, { useRef, useState } from "react";
import SwatchCard from "../swatches/swatch card/SwatchCard";

const FeaturedSwatches = ({ swatches }) => {
  const [compareArray, setCompareArray] = useState<number[][]>([]);
  const selectSwatchToCompareRef = useRef<boolean>(true);
  const [openState, setOpenState] = useState<boolean>(false);
  const [swatchNumber, setNumberOfSwatches] = useState<number>(2);
  const [swatchToCompare, setSwatchToCompare] = useState<number[]>([]);
  const [swatchId, setSwatchId] = useState<string>("");

  return (
    <ul className="swatch_grid wrapper_inner">
      {swatches.map((swatch, index) => {
        if (swatch.colourId !== "none-colour" && index < 11) {
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
              frontPage={true}
            />
          );
        }
      })}
    </ul>
  );
};

export default FeaturedSwatches;
