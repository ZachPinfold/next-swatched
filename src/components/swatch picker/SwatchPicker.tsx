import React, { useState } from "react";
import HomepageSwatchCard from "./swatch card/HomepageSwatchCard";
import SaveImage from "../../assets/images/save_swatch.svg";
import CopyImage from "../../assets/images/copy_swatch.svg";
import LockedImage from "../../assets/images/locked_swatch.svg";
import copy from "copy-to-clipboard";

import { rgbToHex } from "../../utils/swatch";
import { startAddSwatchToSwatchList } from "../../actions/swatch";
import { connect } from "react-redux";
import { CardHover } from "../../types/swatches";

interface Swatches {
  swatches: any[];
  setLockedSwatches: (swatch: number[][]) => void;
  lockedSwatches: number[][];
  initialLoadRef: any;
  startAddSwatchToSwatchList: (rgb: number[], userID: string) => any;
  largeWindowSize: boolean;
  userID: string;
}

const SwatchPicker = ({
  swatches,
  setLockedSwatches,
  lockedSwatches,
  startAddSwatchToSwatchList,
  initialLoadRef,
  largeWindowSize,
  userID,
}: Swatches) => {
  const [hoverSwatch, setHoverSwatch] = useState<number[]>([]);
  const [clicked, setClicked] = useState<number[]>([]);
  const [copied, setCopied] = useState<number[]>([]);

  const copyToClip = (swatch: number[]) => {
    copy(rgbToHex(swatch));
    setCopied(swatch);
  };

  const addToSwatch = (swatch: number[]) => {
    startAddSwatchToSwatchList(swatch, userID);
    setClicked(swatch);
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
      clickedMessage: "saved!",
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
              copied={copied}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

interface StateProps {
  largeWindowSize: boolean;
  userID: string;
}

const mapStateToProps = (state: any): StateProps => ({
  largeWindowSize: state.layout.isLargeWindowSize,
  userID: state.auth.userID,
});

export default connect(mapStateToProps, { startAddSwatchToSwatchList })(
  SwatchPicker
);
