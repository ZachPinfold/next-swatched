import React, { useEffect, useRef, useState } from "react";
import {
  calculateDimensionsOnWindowChange,
  getContrastYIQ,
  rgbToHex,
} from "../../../utils/swatch";
import LockedImage from "../../../assets/images/locked_swatch.svg";
import CopyImage from "../../../assets/images/copy_swatch.svg";
import DeleteImage from "../../../assets/images/delete_swatch.svg";
import { connect } from "react-redux";
import { startDeleteSwatchFromSwatchList } from "../../../actions/swatch";
import { SwatchObject } from "../../../types/swatches";
import RadialMenu from "../../radial menu/RadialMenu";
import { select } from "d3";
import { text } from "stream/consumers";

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
  swatchToCompare: number[];
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
  swatchToCompare,
}: SwatchTypes) => {
  const [openButtonDisplay, setOpenButtonDisplay] =
    useState<string>("inline-block");
  const [swatchHover, setSwatchHover] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const widthRef = useRef<string | null>(null);
  const [largeWindowSize, setLargeWindowSize] = useState<Boolean | null>(null);

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

  const deleteSwatch = () => {
    startDeleteSwatchFromSwatchList(swatch);
  };

  const copySwatchHex = () => {
    navigator.clipboard.writeText(rgbToHex(color));
    setIsCopied(true);
  };

  const circleMenuArray = [
    { image: CopyImage, text: "copy", func: copySwatchHex },
    { image: LockedImage, text: "lock", func: setCompareClick },
    {
      image: DeleteImage,
      text: "delete",
      func: deleteSwatch,
    },
  ];

  const openMenu = () => {
    const radius = 45; // the radius as a constant
    /* THETA is the angle of separation between each elemtents */
    const theta = (2 * Math.PI) / circleMenuArray.length;

    circleMenuArray.forEach((e, i) => {
      let xPosition, yPosition;

      const currentAngle = i * theta + 0.5; // calculate the current angle
      /* Get the positions */
      xPosition = radius * Math.cos(currentAngle);
      yPosition = radius * Math.sin(currentAngle);

      select(`#${circleId}_${i}`)
        .transition()
        .attr("transform", `translate(${xPosition + 55}, ${yPosition + 55})`)
        .attr("opacity", "1");

      select(`#${circleId}_${i}_circle`)
        .transition()
        .duration(400)
        .attr("fill", "rgba(0, 0, 0, 0.15)");
    });
  };

  const closeMenu = () => {
    circleMenuArray.forEach((e, i) => {
      select(`#${circleId}_${i}`)
        .transition()
        .duration(400)
        .attr("transform", `translate(${centerX}, ${centerY})`)
        .attr("fill", rgbToHex(color))
        .attr("opacity", "0");
    });
  };

  // This useEffect below ensures the hover button is hidden, but only
  // after the menu has opened, otherwise the menu icon text
  // flashes visible in the circles

  useEffect(() => {
    if (!menuOpen || (!menuOpen && swatchHover)) {
      setOpenButtonDisplay("inline-block");
    } else
      setTimeout(() => {
        setOpenButtonDisplay("none");
      }, 300);
  }, [menuOpen, swatchHover]);

  // useEffect(() => {
  //   openMenu();
  // }, []);

  const circleId: string = `circle_${swatch.colourId}`;

  return (
    <div
      style={{ backgroundColor: rgbToHex(color) }}
      key={color[0]}
      className="swatch_card"
      onClick={() => {
        selectSwatchToCompareRef.current = true;
      }}
      onMouseEnter={() => setSwatchHover(true)}
      onMouseLeave={() => {
        setSwatchHover(false);
        setMenuOpen(false);
        closeMenu();
      }}
    >
      <div
        onMouseEnter={() => {
          if (largeWindowSize) {
            openMenu();
            setMenuOpen(true);
          }
        }}
        onClick={() => {
          if (!largeWindowSize) {
            openMenu();
            setMenuOpen(true);
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
      <div className="half_circle_hovers">
        <svg width="180" height="180">
          {circleMenuArray.map((menu, index) => (
            <RadialMenu
              color={color}
              swatchId={circleId}
              index={index}
              image={menu.image}
              text={menu.text}
              centerY={centerY}
              centerX={centerX}
              circleRadius={circleRadius}
              menuOpen={menuOpen}
              func={menu.func}
              swatchToCompare={swatchToCompare}
              isCopied={isCopied}
              setIsCopied={setIsCopied}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default connect(null, { startDeleteSwatchFromSwatchList })(SwatchCard);
