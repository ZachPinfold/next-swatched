import React from "react";
import LockedImage from "../../../assets/images/locked_swatch.svg";
import { CardHover } from "../../../types/swatches";

interface Actions {
  initialLoadRef: any;
  swatch: number[];
  hoverSwatch: number[];
  index: number;
  largeWindowSize: Boolean | null;
  setClicked: React.Dispatch<React.SetStateAction<number[]>>;
  setHoverSwatch: React.Dispatch<React.SetStateAction<number[]>>;
  clicked: number[];
  lockedSwatches: number[][];
  cardHover: CardHover[];
  copied: number[];
}

const HomepageSwatchCard = ({
  initialLoadRef,
  swatch,
  hoverSwatch,
  index,
  largeWindowSize,
  setClicked,
  lockedSwatches,
  clicked,
  setHoverSwatch,
  cardHover,
  copied,
}: Actions) => {
  return (
    <div
      className={!initialLoadRef ? "initial_colour_card" : "colour_card"}
      style={{
        backgroundColor: !initialLoadRef ? "white" : `rgb(${swatch})`,
        width: hoverSwatch === swatch ? "23%" : "20%",
      }}
      key={index}
    >
      {cardHover.map((e) => {
        const { image, message, type, func, clickedMessage } = e;
        console.log(clicked, swatch, type);
        return (
          <div
            style={{
              height: largeWindowSize ? `${100 / cardHover.length}%` : "33%",
            }}
            className="hover_third"
            key={type}
            onClick={() => func(swatch)}
            onMouseLeave={() => {
              largeWindowSize &&
                setTimeout(function () {
                  setClicked([]);
                }, 250);
              setHoverSwatch([]);
            }}
            onMouseEnter={() => {
              setHoverSwatch(swatch);
            }}
          >
            <img src={image.src} alt={type} />
            {copied === swatch && type === "copy" ? (
              <h5>{clickedMessage}</h5>
            ) : clicked === swatch && type === "save" ? (
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
    </div>
  );
};

export default HomepageSwatchCard;
