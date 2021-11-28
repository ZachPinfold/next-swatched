import React, { useState } from "react";
import { rgbToHex, setCompareWidths } from "../../utils/swatch";
import SaveImage from "../../assets/images/save_swatch.svg";
import CopyImage from "../../assets/images/copy_swatch.svg";

interface Actions {
  compareSwatch: number[];
  swatchNumber: number;
  index: number;
}

const CompareCard = ({ compareSwatch, index, swatchNumber }: Actions) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const copyToClip = () => {
    navigator.clipboard.writeText(rgbToHex(compareSwatch));
    setClicked(true);
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
      clickedMessage: "colour saved!",
      func: copyToClip,
    },
  ];
  return (
    <div
      style={{
        backgroundColor: rgbToHex(compareSwatch),
        width: index < swatchNumber ? setCompareWidths(swatchNumber) : "0",
      }}
      className="inner_compare_card"
      key={index}
    >
      {arr.map((e, i) => {
        const { image, message, type, func, clickedMessage } = e;
        return (
          <div
            style={{
              height: `${100 / arr.length}%`,
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
            <img src={image.src} alt={type} />
            {clicked ? <h5>{clickedMessage}</h5> : <h5>{message}</h5>}
          </div>
        );
      })}
    </div>
  );
};

export default CompareCard;
