import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import refreshIcon from "../../assets/images/refresh_icon.svg";
import SwatchCard from "./swatch card/SwatchCard";
import SaveImage from "../../assets/images/save_swatch.svg";
import CopyImage from "../../assets/images/copy_swatch.svg";
import LockedImage from "../../assets/images/locked_swatch.svg";

import {
  calculateDimensionsOnWindowChange,
  rgbToHex,
} from "../../utils/swatch";
import { startAddSwatchToSwatchList } from "../../actions/swatch";
import { connect } from "react-redux";
// Apply any to allow for includes() function

interface Swatches {
  swatches: any[];
  setLockedSwatches: (swatch: number[][]) => void;
  lockedSwatches: number[][];
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

  const copyToClip = (swatch) => {
    navigator.clipboard.writeText(rgbToHex(swatch));
    setClicked(true);
  };

  const addToSwatch = (swatch) => {
    startAddSwatchToSwatchList(swatch);
  };

  const removeFromSwatch = (swatch: number[]) => {
    setLockedSwatches(lockedSwatches.filter((r) => r !== swatch));
  };

  const setLockedSwatch = (swatch) => {
    !lockedSwatches.includes(swatch)
      ? setLockedSwatches([...lockedSwatches, swatch])
      : removeFromSwatch(swatch);
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
          console.log(swatch, lockedSwatches);

          return (
            <div
              className={
                !initialLoadRef ? "initial_colour_card" : "colour_card"
              }
              style={{
                backgroundColor: !initialLoadRef ? "white" : `rgb(${swatch})`,
                width: hoverSwatch === swatch ? "23%" : "20%",
              }}
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
                    onClick={() => func(swatch)}
                    onMouseLeave={() => {
                      setTimeout(function () {
                        setClicked(false);
                      }, 250);
                      setHoverSwatch([]);
                    }}
                    onMouseEnter={() => {
                      setHoverSwatch(swatch);
                      setHoverSwatch(swatch);
                    }}
                  >
                    <img src={image.src} alt={type} />
                    {clicked ? (
                      <h5>{clickedMessage}</h5>
                    ) : (
                      <h5>
                        {lockedSwatches.includes(swatch) && type === "lock"
                          ? "unlock"
                          : message}
                      </h5>
                    )}
                  </div>
                );
              })}
              <img
                className="small_lock"
                src={LockedImage.src}
                alt="locked_image"
                style={{
                  opacity: lockedSwatches.includes(swatch) ? "1" : "0",
                }}
              />

              {/* {initialLoadRef.current && (
                <SwatchCard
                  swatch={swatch}
                  index={index}
                  setHoverSwatch={setHoverSwatch}
                  setLockedSwatches={setLockedSwatches}
                  lockedSwatches={lockedSwatches}
                  hoverSwatch={hoverSwatch}
                />
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default connect(null, { startAddSwatchToSwatchList })(SwatchPicker);
