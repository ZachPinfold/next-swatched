import React, { Fragment, useRef, useState } from "react";
import SwatchCard from "../swatches/swatch card/SwatchCard";
import Link from "next/link";
import { SwatchObject } from "../../types/swatches";
import { startShowModal } from "../../actions/layout";
import { connect } from "react-redux";

interface SwatchTypes {
  swatches: SwatchObject[];
  isAuthenticated: boolean;
  startShowModal: (openModal: boolean, type: string) => void;
}

const FeaturedSwatches = ({
  swatches,
  isAuthenticated,
  startShowModal,
}: SwatchTypes) => {
  const [compareArray, setCompareArray] = useState<number[][]>([]);
  const selectSwatchToCompareRef = useRef<boolean>(true);
  const [openState, setOpenState] = useState<boolean>(false);
  const [swatchNumber, setNumberOfSwatches] = useState<number>(2);
  const [swatchToCompare, setSwatchToCompare] = useState<number[]>([]);
  const [swatchId, setSwatchId] = useState<string>("");

  return (
    <div className="outer_featured">
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
              <button
                className="button_main"
                onClick={() => startShowModal(true, "signup")}
              >
                Create an account to start building your swatches
              </button>
              <p>
                Have an account?{" "}
                <span onClick={() => startShowModal(true, "login")}>login</span>{" "}
              </p>
            </div>
          )}
        </ul>
        {isAuthenticated && (
          <div className="outer_button">
            <Link href={isAuthenticated ? "/swatches" : "/"}>
              View all colours
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(null, { startShowModal })(FeaturedSwatches);
