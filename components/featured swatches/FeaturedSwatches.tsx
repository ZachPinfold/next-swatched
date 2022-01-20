import React, { useRef, useState } from "react";
import SwatchCard from "../swatches/swatch card/SwatchCard";
import Link from "next/link";
import { SwatchObject } from "../../types/swatches";

interface SwatchTypes {
  swatches: SwatchObject[];
  isAuthenticated: boolean;
}

const FeaturedSwatches = ({ swatches, isAuthenticated }: SwatchTypes) => {
  const [compareArray, setCompareArray] = useState<number[][]>([]);
  const selectSwatchToCompareRef = useRef<boolean>(true);
  const [openState, setOpenState] = useState<boolean>(false);
  const [swatchNumber, setNumberOfSwatches] = useState<number>(2);
  const [swatchToCompare, setSwatchToCompare] = useState<number[]>([]);
  const [swatchId, setSwatchId] = useState<string>("");

  return (
    <div className="outer_home_swatches wrapper_inner">
      <h1 style={{ paddingLeft: "5px" }} className="sub_title">
        Your colours
      </h1>
      <ul
        className={
          "swatch_grid wrapper_inner home_swatch_grid " +
          (!isAuthenticated && "not_auth_swatches")
        }
      >
        {swatches.map((swatch, index) => {
          if (swatch.colourId !== "none-colour" && index < 10) {
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
        {!isAuthenticated && (
          <div className="prompt_area">
            <h2>Create an account to start building your swatches</h2>
            <button>Sign up</button>
            <p>
              Have an account? <span>login</span>{" "}
            </p>
          </div>
        )}
      </ul>
      {isAuthenticated && (
        <div className="outer_button">
          <Link href="/swatches">View all colours</Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedSwatches;
