import React, { useState } from "react";
import { rgbToHex } from "../../../utils/swatch";
import CompareImage from "../../../assets/images/compare_swatch.svg";
import CopyImage from "../../../assets/images/copy_swatch.svg";
import { connect } from "react-redux";
import { startDeleteSwatchFromSwatchList } from "../../../actions/swatch";
import { SwatchObject } from "../../../types/swatches";

interface SwatchTypes {
  color: number[];
  setCompareArray: (userUid: number[][]) => void;
  selectSwatchToCompareRef: any;
  setOpenState: (setOpenState: boolean) => void;
  setNumberOfSwatches: (num: number) => void;
  openState: boolean;
  swatch: SwatchObject;
  startDeleteSwatchFromSwatchList: (hex: SwatchObject) => void;
  setSwatchToCompare: (num: number[]) => void;
}

const SwatchCard = ({
  color,
  setCompareArray,
  selectSwatchToCompareRef,
  setOpenState,
  setNumberOfSwatches,
  openState,
  swatch,
  startDeleteSwatchFromSwatchList,
  setSwatchToCompare,
}: SwatchTypes) => {
  const [copyClicked, setCopyClicked] = useState<boolean>(false);

  const setCompareClick = () => {
    if (openState) {
      // This booleon exists so the compare section stays in the same place, and only the colours change
      setOpenState(true);
      setSwatchToCompare(color);
    } else {
      // Here we need to clear out the array to ensure the compare array only appears when the colours have been filled
      setCompareArray([]);
      setSwatchToCompare(color);
      setOpenState(true);
      setNumberOfSwatches(2);
    }
  };

  return (
    <div
      style={{ backgroundColor: rgbToHex(color) }}
      key={color[0]}
      className="swatch_card"
      onClick={() => {
        selectSwatchToCompareRef.current = true;
      }}
    >
      <div className="half_circle_hovers">
        <div onClick={setCompareClick} className="half half_top">
          <img src={CompareImage.src} alt="compare_image" />
          <h4>compare swatch</h4>
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(rgbToHex(color));
            setCopyClicked(true);
          }}
          onMouseLeave={() => {
            setTimeout(function () {
              setCopyClicked(false);
            }, 200);
          }}
          className="half half_bottom"
        >
          <img src={CopyImage.src} alt="compare_image" />
          {!copyClicked ? <h4>copy hex</h4> : <h4>copied!</h4>}
        </div>
      </div>
      <button onClick={() => startDeleteSwatchFromSwatchList(swatch)}>
        delete
      </button>
    </div>
  );
};

export default connect(null, { startDeleteSwatchFromSwatchList })(SwatchCard);
