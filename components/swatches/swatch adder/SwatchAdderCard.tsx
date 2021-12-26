import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startAddSwatchToSwatchList } from "../../../actions/swatch";
import PlusHex from "../../../assets/images/PlusHex";
import HashTagImage from "../../../assets/images/hashtag_swatch.svg";
import BackImage from "../../../assets/images/back_swatch.svg";
import UploadImage from "../../../assets/images/upload_swatch.svg";
import RGBImage from "../../../assets/images/rgb_swatch.svg";

import {
  calculateDimensionsOnWindowChange,
  cropImage,
  getContrastYIQ,
  hexToRgb,
  isHexColor,
  openMenu,
  rgbToHex,
} from "../../../utils/swatch";
import AdderRadialMenu from "../../radial menu/AdderRadialMenu";
import { closeMenuOnHoverLeaveD3, openCircleMenuD3 } from "../../../utils/d3";
import ColourAdderChoice from "../../radial menu/ColourAdderChoice";
import { select } from "d3";
import Plus from "../../../assets/images/Plus";

const circleMenuDecider = [
  { image: HashTagImage, text: "add" },
  { image: HashTagImage, text: "edit" },
];

interface SwatchCircleInput {
  image: string;
  text: string;
  func: any;
}

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
  const [rgbInputValue, setRgbInputValue] = useState<string[]>(["", "", ""]);
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
  const [hexInput, setHexInput] = useState<boolean>(false);
  const [rgbInput, setRgbInput] = useState<boolean>(false);

  const hexFocus = useRef<any>();

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

  const applyHexInput = (e: string) => {
    const str: string = e.replace("#", "");

    const isHexColour: boolean = isHexColor(str);

    setInputValue(str);

    if (isHexColour) {
      setColourLoaded(true);

      setImageColour(hexToRgb(`#${str}`));
    } else setColourLoaded(false);
  };

  const handleHexAdd = (e: any) => {
    e.preventDefault();
    if (colourLoaded) startAddSwatchToSwatchList(`#${inputValue}`);
    setHexInput(false);
    setInputValue("");
    setImageColour([]);
    setColourLoaded(false);
  };

  const applyRgbInput = (e: string, id: string) => {
    console.log(id);

    const rgbs = JSON.parse(JSON.stringify(rgbInputValue));

    rgbs[id] = e;

    setRgbInputValue(rgbs);
    // setInputValue(str);

    // if (isHexColour) {
    //   setColourLoaded(true);

    //   setImageColour(hexToRgb(`#${str}`));
    // } else setColourLoaded(false);
  };

  const handleImageAdd = () => {
    setImageColour([]);
    startAddSwatchToSwatchList(rgbToHex(imgColour));
    setMenuOpen(false);
  };

  const handleImageCapture = async () => {
    inputFileRef.current.click();
  };

  const closeMenu = (arrayToClose: SwatchCircleInput[]) => {
    arrayToClose.forEach((e, i) => {
      const circleId: string = `circle_${e.text}`;
      closeMenuOnHoverLeaveD3(circleId, i, centerX, centerY, [0, 0, 0]);
    });
  };

  const handleRgbInputSelection = () => {
    closeMenu(circleMenuArray);
    setTimeout(() => {
      setRgbInput(true);
      setMenuOpen(false);
    }, 250);
  };

  const handleHexInputSelection = () => {
    closeMenu(circleMenuArray);
    setTimeout(() => {
      setHexInput(true);
      setMenuOpen(false);
    }, 250);
  };

  useEffect(() => {
    hexInput && hexFocus.current.focus();
  }, [hexInput]);

  const circleMenuArray = [
    { image: UploadImage, text: "upload", func: handleImageCapture },
    { image: HashTagImage, text: "hex", func: handleHexInputSelection },
    {
      image: RGBImage,
      text: "rgb",
      func: handleRgbInputSelection,
    },
  ];

  const handleImageCropAndColour = (target: HTMLInputElement) => {
    cropImage(target, setImageColour);
    closeMenu(circleMenuArray);
  };

  const editImageSelection = () => {
    circleMenuDecider.forEach((e, i) => {
      const circleId = `decider_${e.text}`;
      closeMenuOnHoverLeaveD3(circleId, i, centerX, centerY, [0, 0, 0]);
    });
    handleImageCapture();
    setImageColour([]);
  };

  const circleMenuDecider = [
    { image: HashTagImage, text: "add", func: handleImageAdd },
    { image: HashTagImage, text: "edit", func: editImageSelection },
  ];

  // This useEffect opens the 'decider' circles when all the conditions are met

  useEffect(() => {
    if (imgColour.length > 0 && inputFileRef.current && !hexInput) {
      openMenu("swatch_adder", circleMenuDecider, 2, 0, 40, "decider");
      setChoiceButtonDisplay("inline-block");
    } else {
      setChoiceButtonDisplay("none");
    }
  }, [imgColour]);

  useEffect(() => {
    // This useEffect first checks to see if the choice buttons are open
    // Then it hides the hover button so the 3 radial manu can't be opened
    if (imgColour.length > 0 || hexInput || rgbInput) {
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
    else if (menuOpen)
      setTimeout(() => {
        setOpenButtonDisplay("none");
      }, 100);
  }, [menuOpen, swatchHover, swatchId, imgColour, hexInput, rgbInput]);

  return (
    <li
      style={{
        backgroundColor:
          imgColour.length < 1 ? "lightgrey" : `rgba(${imgColour})`,
      }}
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
          closeMenu(circleMenuArray);
        }
      }}
    >
      {(hexInput || rgbInput) && (
        <div className="back_arrow">
          <img
            onClick={() => {
              openMenu("swatch_adder", circleMenuArray, 2, 0.5, 45, "circle");
              setMenuOpen(true);
              setSwatchId("swatch_adder");
              setHexInput(false);
              setRgbInput(false);
              setInputValue("");
              setImageColour([]);
            }}
            src={BackImage.src}
            alt=""
          />
        </div>
      )}
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
            : "1",
          cursor: menuOpen ? "inherit" : swatchHover ? "pointer" : "inherit",
          display: openButtonDisplay,
          backgroundColor: `rgba(white, 0.2)`,
        }}
      >
        <Plus color={"#FFFFFF"} />
      </div>
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
              key={index}
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
            key={index}
          />
        ))}
      </svg>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={(e) => handleImageCropAndColour(e.target)}
        ref={inputFileRef}
      />

      {hexInput && (
        <Fragment>
          <form
            style={{ right: colourLoaded ? "20px" : "0" }}
            className={`hex_input`}
            onSubmit={(e) => handleHexAdd(e)}
          >
            <span style={{ opacity: inputValue.length > 0 ? "1" : "0" }}>
              #
            </span>
            <input
              value={inputValue}
              onChange={(e) => applyHexInput(e.target.value)}
              type="text"
              placeholder="# add hex"
              style={{
                padding:
                  inputValue.length < 1
                    ? "4px 6px 4px 6px"
                    : "4px 6px 4px 15px",
              }}
              ref={hexFocus}
            />
          </form>
          <div
            style={{ opacity: colourLoaded ? "1" : "0" }}
            className="outer_svg"
          >
            <PlusHex
              color={"white"}
              colourLoaded={colourLoaded}
              handleHexAdd={handleHexAdd}
            />
          </div>
        </Fragment>
      )}
      {rgbInput && (
        <Fragment>
          <form
            style={{ right: colourLoaded ? "20px" : "0" }}
            className={`rgb_input`}
            onSubmit={(e) => handleHexAdd(e)}
          >
            <span style={{ opacity: inputValue.length > 0 ? "1" : "0" }}>
              #
            </span>
            <input
              value={rgbInputValue[0]}
              onChange={(e) => applyRgbInput(e.target.value, e.target.id)}
              type="text"
              id={"0"}
              style={{
                padding:
                  inputValue.length < 1
                    ? "4px 6px 4px 6px"
                    : "4px 6px 4px 15px",
              }}
              ref={hexFocus}
            />
            <input
              value={rgbInputValue[1]}
              onChange={(e) => applyRgbInput(e.target.value, e.target.id)}
              type="text"
              id={"1"}
              style={{
                padding:
                  inputValue.length < 1
                    ? "4px 6px 4px 6px"
                    : "4px 6px 4px 15px",
              }}
              ref={hexFocus}
            />
            <input
              value={rgbInputValue[2]}
              onChange={(e) => applyRgbInput(e.target.value, e.target.id)}
              type="text"
              id={"2"}
              style={{
                padding:
                  inputValue.length < 1
                    ? "4px 6px 4px 6px"
                    : "4px 6px 4px 15px",
              }}
              ref={hexFocus}
            />
          </form>
          <div
            style={{ opacity: colourLoaded ? "1" : "0" }}
            className="outer_svg"
          >
            <PlusHex
              color={"white"}
              colourLoaded={colourLoaded}
              handleHexAdd={handleHexAdd}
            />
          </div>
        </Fragment>
      )}
    </li>
  );
};

export default connect(null, { startAddSwatchToSwatchList })(SwatchAdderCard);

// useEffect(() => {
//   openMenu("swatch_adder", circleMenuArray, 2, 0, 40, "circle");
//   setChoiceButtonDisplay("inline-block");
// }, []);
