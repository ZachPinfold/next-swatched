import React, { useEffect, useRef, useState } from "react";
import { openMenu, rgbToHex } from "../../../utils/swatch";
import LockedImage from "../../../assets/images/locked_swatch.svg";
import CopyImage from "../../../assets/images/copy_swatch.svg";
import DeleteImage from "../../../assets/images/delete_swatch.svg";
import { connect } from "react-redux";
import { startDeleteSwatchFromSwatchList } from "../../../actions/swatch";
import { SwatchObject } from "../../../types/swatches";
import RadialMenu from "../../radial menu/RadialMenu";
import {
  closeMenuOnHoverLeaveD3,
  closeNotActiceMenuCirclesD3,
} from "../../../utils/d3";
import copy from "copy-to-clipboard";

interface SwatchTypes {
  color: number[];
  setCompareArray: (userUid: number[][]) => void;
  selectSwatchToCompareRef: any;
  setOpenState: (setOpenState: boolean) => void;
  setNumberOfSwatches: (num: number) => void;
  openState: boolean;
  swatch: SwatchObject;
  startDeleteSwatchFromSwatchList: (hex: SwatchObject, userID: string) => void;
  setSwatchToCompare: (num: number[]) => void;
  swatchToCompare: number[];
  setSwatchId: (swatchId: string) => void;
  swatchId: string;
  frontPage: boolean;
  largeWindowSize: boolean;
  userID: string;
  step: number;
  index: number;
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
  swatchId,
  setSwatchId,
  // Front page cards behave slightly differenty, and will be based on this condition
  frontPage,
  largeWindowSize,
  userID,
  index,
  step,
}: SwatchTypes) => {
  const [openButtonDisplay, setOpenButtonDisplay] =
    useState<string>("inline-block");
  const [swatchHover, setSwatchHover] = useState<boolean | string>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const circleId: string = `circle_${swatch.colourId}`;

  const width = 180;
  const height = 180;
  const circleRadius = 35;
  const centerY = height / 2 - circleRadius;
  const centerX = width / 2 - circleRadius;

  const setCompareClick = () => {
    if (openState) {
      // This booleon exists so the compare section stays in the same place, and only the colours change
      selectSwatchToCompareRef.current = true;
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
    startDeleteSwatchFromSwatchList(swatch, userID);
  };

  const copySwatchHex = () => {
    copy(rgbToHex(color));
    setIsCopied(true);
  };

  const circleMenuArray = [
    { image: CopyImage, text: "copy", func: copySwatchHex },
    { image: LockedImage, text: "match", func: setCompareClick },
    {
      image: DeleteImage,
      text: "delete",
      func: deleteSwatch,
    },
  ];

  frontPage && circleMenuArray.splice(1, 1);

  // This useEffect below closes inactive circle menus on mobile

  useEffect(() => {
    closeNotActiceMenuCirclesD3(swatchId, centerX, centerY, color);
  }, [swatchId]);

  const closeMenu = () => {
    circleMenuArray.forEach((e, i) => {
      closeMenuOnHoverLeaveD3(circleId, i, centerX, centerY, color);
    });
  };

  // This useEffect below ensures the hover button is hidden, but only
  // after the menu has opened, otherwise the menu icon text
  // flashes visible in the circles

  useEffect(() => {
    if (
      !menuOpen ||
      (!menuOpen && swatchHover) ||
      swatch.colourId !== swatchId
    ) {
      setOpenButtonDisplay("inline-block");
    } else
      setTimeout(() => {
        setOpenButtonDisplay("none");
      }, 300);
  }, [menuOpen, swatchHover, swatchId, swatch.colourId]);

  return (
    <li
      style={{
        backgroundColor: rgbToHex(color),
        zIndex: step === 2 && index === 0 ? "101" : "inherit",
      }}
      key={swatch.colourId}
      className="swatch_card"
      onMouseEnter={() => {
        if (!menuOpen && largeWindowSize) {
          setSwatchHover(swatch.colourId);
          setSwatchId(swatch.colourId);
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
            openMenu(
              swatch.colourId,
              circleMenuArray,
              2,
              frontPage ? 0 : 0.5,
              45,
              "circle",
              largeWindowSize
            );
            setMenuOpen(true);
            setSwatchId(swatch.colourId);
          }
        }}
        onClick={() => {
          if (!largeWindowSize) {
            openMenu(
              swatch.colourId,
              circleMenuArray,
              2,
              frontPage ? 0 : 0.5,
              45,
              "circle",
              largeWindowSize
            );
            setMenuOpen(true);
            setSwatchId(swatch.colourId);
          }
        }}
        className="hover_button swatch_hover_button"
        style={{
          opacity: !largeWindowSize
            ? "1"
            : menuOpen
            ? "0"
            : step === 2 && index === 0
            ? "1"
            : swatchHover === swatch.colourId
            ? "1"
            : "0",
          cursor: menuOpen ? "inherit" : swatchHover ? "pointer" : "inherit",
          display: openButtonDisplay,
          backgroundColor: `rgba(white, 0.2)`,
        }}
      ></div>
      <div className="circle_hovers">
        <svg width="180" height="180" className="menu_circle">
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
              key={index}
            />
          ))}
        </svg>
      </div>
    </li>
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

export default connect(mapStateToProps, { startDeleteSwatchFromSwatchList })(
  SwatchCard
);
