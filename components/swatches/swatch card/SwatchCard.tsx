import React, { useState } from "react";
import { rgbToHex } from "../../../utils/swatch";
import CompareImage from "../../../assets/images/compare_swatch.svg";
import CopyImage from "../../../assets/images/copy_swatch.svg";

interface SwatchTypes {
  color: number[];
  setCompareArray: (userUid: number[][]) => void;
  selectSwatchToCompareRef: any;
  setOpenState: (setOpenState: boolean) => void;
  setNumberOfSwatches: (num: number) => void;
  openState: boolean;
}

const SwatchCard = ({
  color,
  setCompareArray,
  selectSwatchToCompareRef,
  setOpenState,
  setNumberOfSwatches,
  openState,
}: SwatchTypes) => {
  const [copyClicked, setCopyClicked] = useState(false);

  const setCompareClick = () => {
    if (openState) {
      setOpenState(false);
      setTimeout(function () {
        setOpenState(true);
        setNumberOfSwatches(2);
        setCompareArray([color]);
      }, 250);
    } else {
      setOpenState(true);
      setNumberOfSwatches(2);
      setCompareArray([color]);
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
    </div>
  );
};

export default SwatchCard;
