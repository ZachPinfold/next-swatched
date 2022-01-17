import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import refreshIcon from "../../assets/images/refresh_icon.svg";
import HomepageSwatchCard from "./swatch card/HomepageSwatchCard";
import SaveImage from "../../assets/images/save_swatch.svg";
import CopyImage from "../../assets/images/copy_swatch.svg";
import LockedImage from "../../assets/images/locked_swatch.svg";

import {
  calculateDimensionsOnWindowChange,
  rgbToHex,
} from "../../utils/swatch";
import { startAddSwatchToSwatchList } from "../../actions/swatch";
import { connect } from "react-redux";
import { CardHover } from "../../types/swatches";
// Apply any to allow for includes() function

interface Swatches {
  swatches: any[];
  setLockedSwatches: (swatch: number[][]) => void;
  lockedSwatches: number[][];
  initialLoadRef: any;
  startAddSwatchToSwatchList: (rgb: number[]) => void;
}

const SwatchPicker = ({
  swatches,
  setLockedSwatches,
  lockedSwatches,
  startAddSwatchToSwatchList,
  initialLoadRef,
}: Swatches) => {
  const [hoverSwatch, setHoverSwatch] = useState<number[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [largeWindowSize, setLargeWindowSize] = useState<Boolean | null>(null);
  const widthRef = useRef<string | null>(null);

  const widthChange = () => {
    calculateDimensionsOnWindowChange(widthRef.current, setLargeWindowSize);
  };

  useEffect(() => {
    window.addEventListener("resize", widthChange, true);
    calculateDimensionsOnWindowChange(widthRef.current, setLargeWindowSize);
  }, [calculateDimensionsOnWindowChange]);

  const copyToClip = (swatch: number[]) => {
    navigator.clipboard.writeText(rgbToHex(swatch));
    setClicked(true);
  };

  const addToSwatch = (swatch: number[]) => {
    startAddSwatchToSwatchList(swatch);
  };

  const removeFromSwatch = (swatch: number[]) => {
    setLockedSwatches(lockedSwatches.filter((r) => r !== swatch));
  };

  const setLockedSwatch = (swatch: number[]) => {
    !lockedSwatches.includes(swatch)
      ? setLockedSwatches([...lockedSwatches, swatch])
      : removeFromSwatch(swatch);
  };

  const cardHover: CardHover[] = [
    {
      type: "copy",
      image: CopyImage,
      message: "copy hex",
      clickedMessage: "hex copied!",
      func: copyToClip,
    },
    {
      type: "save",
      image: SaveImage,
      message: "save to swatch",
      clickedMessage: "save to swatch",
      func: addToSwatch,
    },

    {
      type: "lock",
      image: LockedImage,
      message: "lock color",
      clickedMessage: "color saved!",
      func: setLockedSwatch,
    },
  ];
  const swatchNumber = 1;

  return (
    <div className="outer_swatch">
      <div className="swatch_area">
        {swatches.map((swatch, index) => {
          return (
            <HomepageSwatchCard
              swatch={swatch}
              index={index}
              setHoverSwatch={setHoverSwatch}
              hoverSwatch={hoverSwatch}
              lockedSwatches={lockedSwatches}
              largeWindowSize={largeWindowSize}
              setClicked={setClicked}
              clicked={clicked}
              cardHover={cardHover}
              initialLoadRef={initialLoadRef}
            />
          );
        })}
      </div>
    </div>
  );
};

export default connect(null, { startAddSwatchToSwatchList })(SwatchPicker);
