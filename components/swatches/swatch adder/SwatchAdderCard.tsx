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
import { select } from "d3";

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
    if (isHexColour) {
      setColourLoaded(true);
    } else setColourLoaded(false);
  };

  const handleHexAdd = (e: any) => {
    e.preventDefault();
    if (colourLoaded) startAddSwatchToSwatchList(`#${inputValue}`);
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

  const handleHexInputSelection = () => {
    setHexInput(true);
    closeMenu(circleMenuArray);
  };

  const circleMenuArray = [
    { image: HashTagImage, text: "upload", func: handleImageCapture },
    { image: HashTagImage, text: "hex", func: handleHexInputSelection },
    {
      image: HashTagImage,
      text: "delete",
      func: handleImageCapture,
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
    // openMenu("swatch_adder", circleMenuArray, 2, 0.5, 45, "circle");
    // setMenuOpen(true);
    // setSwatchId("swatch_adder");
    setImageColour([]);
  };

  const circleMenuDecider = [
    { image: HashTagImage, text: "add", func: handleImageAdd },
    { image: HashTagImage, text: "edit", func: editImageSelection },
  ];

  useEffect(() => {
    if (imgColour.length > 0) {
      openMenu("swatch_adder", circleMenuDecider, 2, 0, 40, "decider");
      setChoiceButtonDisplay("inline-block");
    } else {
      setChoiceButtonDisplay("none");
    }
  }, [imgColour]);

  // useEffect(() => {
  //   openMenu("swatch_adder", circleMenuArray, 2, 0, 40, "circle");
  //   setChoiceButtonDisplay("inline-block");
  // }, []);

  useEffect(() => {
    // This useEffect first checks to see if the choice buttons are open
    // Then it hides the hover button so the 3 radial manu can't be opened
    if (imgColour.length > 0 || hexInput) {
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
  }, [menuOpen, swatchHover, swatchId, imgColour, hexInput]);

  return (
    <div
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
        <form className={"hex_input"} onSubmit={(e) => handleHexAdd(e)}>
          <span style={{ opacity: inputValue.length > 0 ? "1" : "0" }}>#</span>
          <input
            value={inputValue}
            onChange={(e) => applyHexInput(e.target.value)}
            type="text"
            placeholder="# add hex"
            style={{
              padding:
                inputValue.length < 1 ? "4px 6px 4px 6px" : "4px 6px 4px 15px",
            }}
          />
        </form>
      )}
    </div>
  );
};

export default connect(null, { startAddSwatchToSwatchList })(SwatchAdderCard);
