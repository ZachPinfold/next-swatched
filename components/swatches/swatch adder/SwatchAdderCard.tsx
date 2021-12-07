import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startAddSwatchToSwatchList } from "../../../actions/swatch";
import Plus from "../../../assets/images/Plus";
import HashTagImage from "../../../assets/images/hashtag_swatch.svg";

import {
  calculateDimensionsOnWindowChange,
  getContrastYIQ,
  isHexColor,
} from "../../../utils/swatch";
import AdderRadialMenu from "../../radial menu/AdderRadialMenu";
import { closeMenuOnHoverLeaveD3, openCircleMenuD3 } from "../../../utils/d3";
interface SwatchTypes {
  color: number[];
  startAddSwatchToSwatchList: (hex: string) => void;
}

const SwatchAdderCard = ({ startAddSwatchToSwatchList }: SwatchTypes) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [colourLoaded, setColourLoaded] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const widthRef = useRef<string | null>(null);
  const [largeWindowSize, setLargeWindowSize] = useState<Boolean | null>(null);
  const [swatchHover, setSwatchHover] = useState<boolean | string>(false);
  const [openButtonDisplay, setOpenButtonDisplay] =
    useState<string>("inline-block");

  const width = 180;
  const height = 180;
  const circleRadius = 35;
  const centerY = height / 2 - circleRadius;
  const centerX = width / 2 - circleRadius;

  const widthChange = () => {
    calculateDimensionsOnWindowChange(widthRef.current, setLargeWindowSize);
  };

  useEffect(() => {
    window.addEventListener("resize", widthChange, true);
    calculateDimensionsOnWindowChange(widthRef.current, setLargeWindowSize);
  }, [calculateDimensionsOnWindowChange]);

  const copyHex = () => {
    console.log("fire");
  };

  const circleMenuArray = [
    { image: HashTagImage, text: "copy", func: copyHex },
    { image: HashTagImage, text: "lock", func: copyHex },
    {
      image: HashTagImage,
      text: "delete",
      func: copyHex,
    },
  ];

  const applyHexInput = (e: string) => {
    const str: string = e.replace("#", "");

    const isHexColour: boolean = isHexColor(str);

    setInputValue(str);
    isHexColour ? setColourLoaded(true) : setColourLoaded(false);
  };

  const handleHexAdd = (e: any) => {
    console.log(inputValue);

    e.preventDefault();
    if (colourLoaded) startAddSwatchToSwatchList(`#${inputValue}`);
  };

  const openMenu = (localSwatchId: string) => {
    const radius = 45; // the radius as a constant
    /* THETA is the angle of separation between each elemtents */
    const theta = (2 * Math.PI) / circleMenuArray.length;

    circleMenuArray.forEach((e, i) => {
      const circleId: string = `circle_${e.text}`;

      let xPosition, yPosition;

      const currentAngle = i * theta + 0.5; // calculate the current angle
      /* Get the positions */
      xPosition = radius * Math.cos(currentAngle);
      yPosition = radius * Math.sin(currentAngle);

      openCircleMenuD3(circleId, i, xPosition, yPosition, localSwatchId);
    });
  };

  const closeMenu = () => {
    circleMenuArray.forEach((e, i) => {
      const circleId: string = `circle_${e.text}`;

      closeMenuOnHoverLeaveD3(circleId, i, centerX, centerY, [0, 0, 0]);
    });
  };

  return (
    <div
      style={{ backgroundColor: "lightgrey" }}
      // key={color[0]}
      className="swatch_card"
      onMouseEnter={() => {
        if (!menuOpen && largeWindowSize) {
          setSwatchHover(true);
        }
      }}
      onMouseLeave={() => {
        if (largeWindowSize) {
          setSwatchHover(false);
          setMenuOpen(false);
          closeMenu();
        }
      }}
    >
      <div
        onMouseEnter={() => {
          if (largeWindowSize) {
            openMenu("swatch_adder");
            // setMenuOpen(true);
            // setSwatchId(swatch.colourId);
          }
        }}
        onClick={() => {
          if (!largeWindowSize) {
            // openMenu(swatch.colourId);
            // setMenuOpen(true);
            // setSwatchId(swatch.colourId);
          }
        }}
        className="hover_button"
        style={{
          opacity: !largeWindowSize
            ? "1"
            : menuOpen
            ? "0"
            : swatchHover
            ? "1"
            : "0",
          cursor: menuOpen ? "inherit" : swatchHover ? "pointer" : "inherit",
          display: openButtonDisplay,
          backgroundColor: `rgba(white, 0.2)`,
        }}
      ></div>
      <div className="circle_hovers">
        <svg width="180" height="180">
          {circleMenuArray.map((menu, index) => (
            <AdderRadialMenu
              index={index}
              image={menu.image}
              text={menu.text}
              centerY={centerY}
              centerX={centerX}
              circleRadius={circleRadius}
              menuOpen={menuOpen}
              func={menu.func}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default connect(null, { startAddSwatchToSwatchList })(SwatchAdderCard);
