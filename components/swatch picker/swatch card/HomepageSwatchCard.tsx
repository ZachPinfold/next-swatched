import React from "react";
import LockedImage from "../../../assets/images/locked_swatch.svg";
import { CardHover } from "../../../types/swatches";

interface Actions {
  initialLoadRef: any;
  swatch: number[];
  hoverSwatch: number[];
  index: number;
  largeWindowSize: Boolean | null;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setHoverSwatch: React.Dispatch<React.SetStateAction<number[]>>;
  clicked: boolean;
  lockedSwatches: number[][];
  cardHover: CardHover[];
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
        return (
          <div
            style={{
              height: largeWindowSize ? `${100 / cardHover.length}%` : "100%",
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
    </div>
  );
};

export default HomepageSwatchCard;
