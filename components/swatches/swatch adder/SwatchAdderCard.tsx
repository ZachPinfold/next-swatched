import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { startAddSwatchToSwatchList } from "../../../actions/swatch";
import PlusHex from "../../../assets/images/PlusHex";
import HashTagImage from "../../../assets/images/hashtag_swatch.svg";
import BackImage from "../../../assets/images/back_swatch.svg";
import UploadImage from "../../../assets/images/upload_swatch.svg";
import RGBImage from "../../../assets/images/rgb_swatch.svg";

import {
  checkIfRgb,
  hexToRgb,
  isHexColor,
  openMenu,
} from "../../../utils/swatch";
import AdderRadialMenu from "../../radial menu/AdderRadialMenu";
import { closeMenuOnHoverLeaveD3, openCircleMenuD3 } from "../../../utils/d3";
import ColourAdderChoice from "../../radial menu/ColourAdderChoice";
import { select } from "d3";
import Plus from "../../../assets/images/Plus";
import ModalWrapper from "../../Modal/ModalWrapper";
import RgbAdder from "./RgbAdder";
import HexAdder from "./HexAdder";
import ImageDropper from "./ImageDropper";
import { startShowModal } from "../../../actions/layout";
import AddImageButton from "./AddImageButton";

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
  startAddSwatchToSwatchList: (rgb: number[]) => void;
  setSwatchId: (swatchId: string) => void;
  swatchId: string;
  startShowModal: (modal: boolean, type: string) => void;
  showModal: boolean;
  modalType: string;
  largeWindowSize: boolean;
}

const SwatchAdderCard = ({
  startAddSwatchToSwatchList,
  swatchId,
  setSwatchId,
  startShowModal,
  largeWindowSize,
  showModal,
  modalType,
}: SwatchTypes) => {
  const [hexInputValue, setHexInputValue] = useState<string>("");
  const [rgbInputValue, setRgbInputValue] = useState<string[]>(["", "", ""]);
  const [colourLoaded, setColourLoaded] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [swatchHover, setSwatchHover] = useState<boolean | string>(false);
  const [openButtonDisplay, setOpenButtonDisplay] =
    useState<string>("inline-block");
  const [imgColour, setImageColour] = useState<number[]>([]);
  const inputFileRef = useRef<any>();
  const [choiceButtonDisplay, setChoiceButtonDisplay] =
    useState<string>("none");
  const [hexInput, setHexInput] = useState<boolean>(false);
  const [rgbInput, setRgbInput] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState("");

  const hexFocus = useRef<any>();
  const rgbFocus1 = useRef<any>();
  const rgbFocus2 = useRef<any>();
  const rgbFocus3 = useRef<any>();

  const buttonClickRef = useRef<any>();

  const rgbFocusArray = [rgbFocus1, rgbFocus2, rgbFocus3];

  const width = 180;
  const height = 180;
  const circleRadius = 35;
  const centerY = height / 2 - circleRadius;
  const centerX = width / 2 - circleRadius;

  const applyHexInput = (e: string) => {
    const str: string = e.replace("#", "");

    const isHexColour: boolean = isHexColor(str);

    setHexInputValue(str);

    if (isHexColour) {
      setColourLoaded(true);
      setImageColour(hexToRgb(`#${str}`));
    } else setColourLoaded(false);
  };

  const handleHexAdd = (e: any) => {
    e.preventDefault();
    const hexRgb: number[] = hexToRgb(`#${hexInputValue}`);
    if (colourLoaded) startAddSwatchToSwatchList(hexRgb);
    setHexInput(false);
    setHexInputValue("");
    setImageColour([]);
    setColourLoaded(false);
  };

  const applyRgbInput = (e: string, id: string) => {
    const regex = /[0-9]|\./;
    const rgbs = JSON.parse(JSON.stringify(rgbInputValue));

    if (!regex.test(e[e.length - 1]) && e[e.length - 1]) return;

    let isEmptyString = false;

    rgbs[id] = e;

    if (rgbs[id].length < 4) {
      setRgbInputValue(rgbs);
    }

    if (rgbs[id].length === 3 && id !== "2") {
      rgbFocusArray[parseInt(id) + 1].current.focus();
    }

    const isFullRgb = checkIfRgb(rgbs);

    rgbs.forEach((str: string) => {
      str === "" && (isEmptyString = true);
    });

    if (isEmptyString) {
      setImageColour([]);
      setColourLoaded(false);
    } else {
      if (isFullRgb) {
        setImageColour(isFullRgb);
        setColourLoaded(true);
      }
    }
  };

  const handleRgbAdd = (e: any) => {
    e.preventDefault();
    if (colourLoaded) startAddSwatchToSwatchList(imgColour);
    setRgbInput(false);
    setRgbInputValue(["", "", ""]);
    setImageColour([]);
    setColourLoaded(false);
  };

  const handleImageAdd = () => {
    startAddSwatchToSwatchList(imgColour);
    setMenuOpen(false);
  };

  const handleImageCapture = async () => {
    setImageColour([]);
    console.log(buttonClickRef);
    buttonClickRef.current.click();
    startShowModal(true, "imageCapture");
    // inputFileRef.current.click();
    // startShowModal(true, "imageCapture");
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

  useEffect(() => {
    rgbInput && rgbFocus1.current.focus();
  }, [rgbInput]);

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
    console.log("target.files");

    if (target.files && target.files.length !== 0) {
      const file: File = target.files[0];
      const imageFile = URL.createObjectURL(file);
      setImagePreview(imageFile);
    }

    // cropImage(target, setImageColour);
    // closeMenu(circleMenuArray);
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
    if (
      imgColour.length > 0 &&
      inputFileRef.current &&
      !hexInput &&
      !rgbInputValue
    ) {
      openMenu(
        "swatch_adder",
        circleMenuDecider,
        2,
        0,
        40,
        "decider",
        largeWindowSize
      );
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

  useEffect(() => {
    !showModal && setImagePreview("");
  }, [showModal]);

  const onImage = async (failedImages, successImages) => {
    // if (!url) {
    //   console.log("missing Url");
    //   setErrorMessage("missing a url to upload to");
    //   setProgress("uploadError");
    //   return;
    // }

    // setProgress("uploading");

    try {
      console.log("successImages", successImages);
      const parts = successImages[0].split(";");
      const mime = parts[0].split(":")[1];
      const name = parts[1].split("=")[1];
      const data = parts[2];
      console.log(successImages);

      // const res = await Axios.post(url, { mime, name, image: data });

      // setImageURL(res.data.imageURL);
      // setProgress("uploaded");
    } catch (error) {
      // console.log("error in upload", error);
      // setErrorMessage(error.message);
      // setProgress("uploadError");
    }
  };

  return (
    <li
      style={{
        backgroundColor:
          imgColour.length < 1 ? "lightgrey" : `rgba(${imgColour})`,
      }}
      className="swatch_card swatch_adder_card"
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
      {imagePreview.dataURL && showModal && (
        <ModalWrapper
          showModal={startShowModal}
          Component={<ImageDropper imagePreview={imagePreview} />}
        />
      )}

      {(hexInput || rgbInput) && (
        <div className="back_arrow">
          <img
            onClick={() => {
              openMenu(
                "swatch_adder",
                circleMenuArray,
                2,
                0.5,
                45,
                "circle",
                largeWindowSize
              );
              setMenuOpen(true);
              setSwatchId("swatch_adder");
              setHexInput(false);
              setRgbInput(false);
              setHexInputValue("");
              setImageColour([]);
              setRgbInputValue(["", "", ""]);
              setImageColour([]);
              setColourLoaded(false);
            }}
            src={BackImage.src}
            alt=""
          />
        </div>
      )}
      <div
        onMouseEnter={() => {
          if (largeWindowSize) {
            openMenu(
              "swatch_adder",
              circleMenuArray,
              2,
              0.5,
              45,
              "circle",
              largeWindowSize
            );
            setMenuOpen(true);
            setSwatchId("swatch_adder");
          }
        }}
        onClick={() => {
          if (!largeWindowSize) {
            openMenu(
              "swatch_adder",
              circleMenuArray,
              2,
              0.5,
              45,
              "circle",
              largeWindowSize
            );
            setMenuOpen(true);
            setSwatchId("swatch_adder");
          }
        }}
        className="hover_button adder_button"
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
        onClick={(event: any) => {
          event.target.value = null;
        }}
        ref={inputFileRef}
      />

      {hexInput && (
        <HexAdder
          colourLoaded={colourLoaded}
          handleHexAdd={handleHexAdd}
          hexInputValue={hexInputValue}
          applyHexInput={applyHexInput}
          hexFocus={hexFocus}
          rgbInput={rgbInput}
        />
      )}
      <AddImageButton
        buttonClickRef={buttonClickRef}
        setImagePreview={setImagePreview}
      />
      {rgbInput && (
        <RgbAdder
          colourLoaded={colourLoaded}
          rgbInputValue={rgbInputValue}
          applyRgbInput={applyRgbInput}
          rgbFocus1={rgbFocus1}
          rgbFocus2={rgbFocus2}
          rgbFocus3={rgbFocus3}
          handleRgbAdd={handleRgbAdd}
          rgbInput={rgbInput}
        />
      )}
    </li>
  );
};

interface StateProps {
  showModal: boolean;
  modalType: string;
  largeWindowSize: boolean;
}

const mapStateToProps = (state: any): StateProps => ({
  showModal: state.layout.modal,
  modalType: state.layout.modalType,
  largeWindowSize: state.layout.isLargeWindowSize,
});

export default connect(mapStateToProps, {
  startAddSwatchToSwatchList,
  startShowModal,
})(SwatchAdderCard);
