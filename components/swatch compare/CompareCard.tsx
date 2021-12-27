import React, { useState } from "react";
import { rgbToHex, setCompareWidths } from "../../utils/swatch";
import SaveImage from "../../assets/images/save_swatch.svg";
import CopyImage from "../../assets/images/copy_swatch.svg";
import { connect } from "react-redux";
import { startAddSwatchToSwatchList } from "../../actions/swatch";

interface Actions {
  compareSwatch: number[];
  swatchNumber: number;
  index: number;
  largeWindowSize: Boolean | null;
  startAddSwatchToSwatchList: (rgb: number[]) => any;
  selectSwatchToCompareRef: boolean;
  setSwatchToCompare: (rgb: number[]) => any;
}

const CompareCard = ({
  compareSwatch,
  index,
  swatchNumber,
  startAddSwatchToSwatchList,
  largeWindowSize,
  setSwatchToCompare,
  selectSwatchToCompareRef,
}: Actions) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const copyToClip = () => {
    navigator.clipboard.writeText(rgbToHex(compareSwatch));
    setClicked(true);
  };

  const addToSwatch = () => {
    startAddSwatchToSwatchList(compareSwatch);
  };

  const loadNewColor = () => {
    selectSwatchToCompareRef = true;
    setSwatchToCompare(compareSwatch);
  };
  const arr = [
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
      clickedMessage: "color saved!",
      func: addToSwatch,
    },

    {
      type: "lock",
      image: SaveImage,
      message: "lock color",
      clickedMessage: "color saved!",
      func: loadNewColor,
    },
  ];
  return (
    <div
      style={{
        backgroundColor: rgbToHex(compareSwatch),
        width: largeWindowSize
          ? index < swatchNumber
            ? setCompareWidths(swatchNumber)
            : "0"
          : "100%",
        height: !largeWindowSize
          ? index < swatchNumber
            ? setCompareWidths(swatchNumber)
            : "0"
          : "100%",
      }}
      className="inner_compare_card"
      key={index}
    >
      {arr.map((e, i) => {
        const { image, message, type, func, clickedMessage } = e;
        return (
          <div
            style={{
              height: largeWindowSize ? `${100 / arr.length}%` : "100%",
            }}
            className="hover_third"
            key={type}
            onClick={func}
            onMouseLeave={() => {
              setTimeout(function () {
                setClicked(false);
              }, 250);
            }}
          >
            <img
              style={{
                opacity: index >= swatchNumber ? "0" : "1",
              }}
              src={image.src}
              alt={type}
            />
            {clicked ? <h5>{clickedMessage}</h5> : <h5>{message}</h5>}
          </div>
        );
      })}
    </div>
  );
};

export default connect(null, { startAddSwatchToSwatchList })(CompareCard);
