import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startAddSwatchToSwatchList } from "../../../actions/swatch";
import Plus from "../../../assets/images/Plus";
import HashTagImage from "../../../assets/images/hashtag_swatch.svg";

import {
  calculateDimensionsOnWindowChange,
  cropImage,
  getContrastYIQ,
  isHexColor,
  openMenu,
  rgbToHex,
} from "../../../utils/swatch";
import AdderRadialMenu from "../../radial menu/AdderRadialMenu";
import { closeMenuOnHoverLeaveD3, openCircleMenuD3 } from "../../../utils/d3";
import ColourAdderChoice from "../../radial menu/ColourAdderChoice";

interface SwatchTypes {
  startAddSwatchToSwatchList: (hex: string) => void;
  setSwatchId: (swatchId: string) => void;
  swatchId: string;
}

const SwatchAdderCard = ({
  startAddSwatchToSwatchList,
  swatchId,
  setSwatchId,
}: SwatchTypes) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [colourLoaded, setColourLoaded] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const widthRef = useRef<string | null>(null);
  const [largeWindowSize, setLargeWindowSize] = useState<Boolean | null>(null);
  const [swatchHover, setSwatchHover] = useState<boolean | string>(false);
  const [openButtonDisplay, setOpenButtonDisplay] =
    useState<string>("inline-block");
  const [imgColour, setImageColour] = useState<number[]>([]);
  const inputFileRef = useRef<any>();
  const [choiceButtonDisplay, setChoiceButtonDisplay] =
    useState<string>("none");

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

  const handleImageAdd = () => {
    setImageColour([]);
    startAddSwatchToSwatchList(rgbToHex(imgColour));
  };

  const handleImageCapture = async (target: HTMLInputElement) => {
    inputFileRef.current.click();
    cropImage(target, setImageColour);
  };

  const circleMenuArray = [
    { image: HashTagImage, text: "upload", func: handleImageCapture },
    { image: HashTagImage, text: "lock", func: handleImageCapture },
    {
      image: HashTagImage,
      text: "delete",
      func: handleImageCapture,
    },
  ];

  const circleMenuDecider = [
    { image: HashTagImage, text: "add", func: handleImageAdd },
    { image: HashTagImage, text: "edit", func: handleImageCapture },
  ];

  const closeMenu = () => {
    circleMenuArray.forEach((e, i) => {
      const circleId: string = `circle_${e.text}`;
      closeMenuOnHoverLeaveD3(circleId, i, centerX, centerY, [0, 0, 0]);
    });
  };

  useEffect(() => {
    if (imgColour.length > 0) {
      openMenu("swatch_adder", circleMenuDecider, 2, 0, 40, "decider");
      setChoiceButtonDisplay("inline-block");
    } else {
      console.log("close menu");
    }
  }, [imgColour]);

  // useEffect(() => {
  //   openMenu("swatch_adder", circleMenuDecider, 2, 0, 40, "decider");
  //   setChoiceButtonDisplay("inline-block");
  // }, []);

  useEffect(() => {
    // This useEffect first checks to see if the choice buttons are open
    // Then it hides the hover button so the 3 radial manu can't be opened
    if (imgColour.length > 0) {
      setTimeout(() => {
        setOpenButtonDisplay("none");
      }, 300);
      // Then it checks to see if the radial is open, if it is - it hides the hover button
    } else if (
      swatchId !== "swatch_adder" ||
      !menuOpen ||
      (!menuOpen && swatchHover)
    ) {
      setOpenButtonDisplay("inline-block");
    }
    // A timeout is in place to stop the top <g> from entering a hover state too early
    else
      setTimeout(() => {
        setOpenButtonDisplay("none");
      }, 300);
  }, [menuOpen, swatchHover, swatchId, imgColour]);

  return (
    <div
      style={{
        backgroundColor:
          imgColour.length < 1 ? "lightgrey" : `rgba(${imgColour})`,
      }}
      // key={color[0]}
      className="swatch_card"
      onMouseEnter={() => {
        if (!menuOpen && largeWindowSize) {
          setSwatchHover(true);
          setSwatchId("swatch_adder");
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
            openMenu("swatch_adder", circleMenuArray, 2, 0.5, 45, "circle");
            setMenuOpen(true);
            setSwatchId("swatch_adder");
          }
        }}
        onClick={() => {
          if (!largeWindowSize) {
            openMenu("swatch_adder", circleMenuArray, 2, 0.5, 45, "circle");
            setMenuOpen(true);
            setSwatchId("swatch_adder");
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
        <svg width="180" height="180" className="menu_circle">
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
      <svg
        width="180"
        height="180"
        className="menu_circle"
        style={{ display: choiceButtonDisplay }}
      >
        {circleMenuDecider.map((menu, index) => (
          <ColourAdderChoice
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
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={(e) => handleImageCapture(e.target)}
        ref={inputFileRef}
      />
    </div>
  );
};

export default connect(null, { startAddSwatchToSwatchList })(SwatchAdderCard);
