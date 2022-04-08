import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../actions/swatch";
import HueSwatch from "../assets/images/HueSwatch";
import Tips from "../assets/images/Tips";
import SwatchSelector from "../components/swatch compare/SwatchCompare";
import ColorFilter from "../components/swatches/filters/ColorFilter";
import SwatchList from "../components/swatches/swatch list/SwatchList";
import Dropdown from "../components/utils/Dropdown";
import { ColorNamesType, SwatchObject, TutTypes } from "../types/swatches";
import LockedImage from "../assets/images/LockedSwatch";
import CopySwatch from "../assets/images/CopySwatch";
import DeleteSwatch from "../assets/images/DeleteSwatch";
import Plus from "../assets/images/Plus";
import Responsive from "../components/utils/Responsive";
import { startIsResponsive } from "../actions/layout";
import { useRouter } from "next/router";
import Head from "next/head";
import { startTriggerTutorial } from "../actions/tutorial";

const colorNames: ColorNamesType[] = [
  { name: "all swatches", rgb: [197, 199, 196] },
  { name: "red", rgb: [255, 28, 0] },
  { name: "orange", rgb: [255, 179, 71] },
  { name: "yellow", rgb: [255, 223, 0] },
  { name: "green", rgb: [3, 192, 60] },
  { name: "cyan", rgb: [0, 255, 255] },
  { name: "blue", rgb: [0, 0, 255] },
  { name: "magenta", rgb: [255, 0, 255] },
  { name: "pink", rgb: [255, 183, 197] },
];

interface Actions {
  startGetUserSwatches: (
    userUid: string,
    colorFilter: string,
    isInitialLoad: boolean
  ) => void;
  swatches: SwatchObject[];
  startIsResponsive: (isLarge: boolean) => void;
  userID: string;
  largeWindowSize: boolean;
  step: number;
  startTriggerTutorial: (step: number) => void;
}

const tutorialObjectArray: TutTypes[] = [
  { img: LockedImage, text: "compare a colour" },
  { img: CopySwatch, text: "copy the hex" },
  { img: DeleteSwatch, text: "delete a swatch" },
];

const swatchPage = ({
  startGetUserSwatches,
  swatches,
  userID,
  startIsResponsive,
  step,
  largeWindowSize,
  startTriggerTutorial,
}: Actions) => {
  const router = useRouter();

  let refFilterId = "dropdown_filter";
  let refTutorialId = "dropdown_tutorial";
  let refSwatchGroupId = "dropdown_swatch_group";

  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isTutorial, setIsTutorial] = useState<boolean>(false);
  const [compareArray, setCompareArray] = useState<number[][]>([]);
  const selectSwatchToCompareRef = useRef<boolean>(true);

  const [openState, setOpenState] = useState<boolean>(false);
  const [swatchNumber, setNumberOfSwatches] = useState<number>(2);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [reloadSwatches, setReloadSwatches] = useState<boolean>(false);
  const [swatchToCompare, setSwatchToCompare] = useState<number[]>([]);
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);
  const [compareLoading, setCompareLoading] = useState<boolean>(false);

  const [isTutClickedOutside, setIsTutClickedOutside] =
    useState<boolean>(false);
  const [colorFilter, setColorFilter] = useState<ColorNamesType>({
    name: "all swatches",
    rgb: [197, 199, 196],
  });

  const body = document.getElementsByTagName("body");

  Responsive(startIsResponsive);

  useEffect(() => {
    const tipsInLocal = localStorage.getItem("tips");

    if (!tipsInLocal) {
      setIsTutorial(true);
      body && (body[0].style.overflow = "hidden");
    }
  }, []);

  const closeTutorial = () => {
    setIsTutorial(false);
    body && (body[0].style.overflow = "inherit");
    localStorage.setItem("tips", "true");
  };

  useEffect(() => {
    userID.length > 0 && startGetUserSwatches(userID, "all", true);
  }, [startGetUserSwatches, userID]);

  useEffect(() => {
    const getCompareColours = async () => {
      setCompareLoading(true);

      try {
        const data = {
          model: "default",
          input: [swatchToCompare, "N", "N", "N", "N"],
        };

        const apiResponse = await axios.post("/api/colorMind", data);

        const { colourData } = apiResponse.data;

        colourData[0] = swatchToCompare;

        setCompareArray(colourData);
        setReloadSwatches(false);
        if (apiResponse) setCompareLoading(false);
      } catch (error) {
        console.log(error);
      }
      selectSwatchToCompareRef.current = false;
    };

    if (
      (selectSwatchToCompareRef.current === true &&
        swatchToCompare.length > 0) ||
      reloadSwatches
    ) {
      getCompareColours();
    }
  }, [swatchToCompare, reloadSwatches]);

  useEffect(() => {
    if (isTutClickedOutside) {
      setIsTutorial(false);
      setIsTutClickedOutside(false);
    }
  }, [isTutClickedOutside]);

  return (
    <div className="wrapper swatches_page">
      {isTutorial && <div className="tut_overlay"></div>}
      <Head>
        <title>Swatched: My Swatches</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="upper_area wrapper_inner">
        <Dropdown
          Component={
            <ColorFilter
              isClickedOutside={isClickedOutside}
              setIsClickedOutside={setIsClickedOutside}
              colorFilter={colorFilter}
              setColorFilter={setColorFilter}
              setDropdownOpen={setDropdownOpen}
              isDropdownOpen={isDropdownOpen}
              refId={refFilterId}
              list={colorNames}
            />
          }
          setIsClickedOutside={setIsClickedOutside}
          refId={refFilterId}
        />
        <HueSwatch currentColour={colorFilter.name} />

        <div className="tips_wrap" id={refTutorialId}>
          <div
            onClick={() => {
              setIsTutorial(true);
              startTriggerTutorial(0);
              body && (body[0].style.overflow = "hidden");
            }}
            className={"tips_button " + (isTutorial && "open_button")}
          >
            <p>tips</p>
            <Tips refTutorialId={refTutorialId} />
          </div>
        </div>
      </div>
      <div className="text_tutorial_area wrapper_inner">
        <div className="left_area">
          <p>
            Hover over the {<Plus color={"#5fadbf"} />} to add a swatch colour
          </p>
        </div>
        <div className="right_area">
          <div className="tutorial_icons">
            {tutorialObjectArray.map((obj) => {
              return (
                <div key={obj.text} className="inner_tutorial">
                  {" "}
                  <obj.img color={"#5fadbf"} />
                  <p>{obj.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <SwatchList
        swatches={swatches}
        setCompareArray={setCompareArray}
        selectSwatchToCompareRef={selectSwatchToCompareRef}
        setOpenState={setOpenState}
        setNumberOfSwatches={setNumberOfSwatches}
        openState={openState}
        setSwatchToCompare={setSwatchToCompare}
        swatchToCompare={swatchToCompare}
        step={step}
        isTutorial={isTutorial}
        closeTutorial={closeTutorial}
        largeWindowSize={largeWindowSize}
      />
      <div
        className="outer_selector "
        style={{
          zIndex: compareArray.length > 0 ? "1" : "-1",
          height: fullScreen ? "100%" : "35%",
        }}
      >
        <SwatchSelector
          compareArray={compareArray}
          setCompareArray={setCompareArray}
          setOpenState={setOpenState}
          openState={openState}
          setNumberOfSwatches={setNumberOfSwatches}
          swatchNumber={swatchNumber}
          setFullScreen={setFullScreen}
          fullScreen={fullScreen}
          swatchToCompare={swatchToCompare}
          setSwatchToCompare={setSwatchToCompare}
          selectSwatchToCompareRef={selectSwatchToCompareRef}
          setReloadSwatches={setReloadSwatches}
          compareLoading={compareLoading}
          step={step}
          closeTutorial={closeTutorial}
          isTutorial={isTutorial}
        />
      </div>
      <div
        style={{ opacity: compareArray.length === 0 && openState ? "1" : "0" }}
        className="loader home_loader"
      ></div>
    </div>
  );
};

interface StateProps {
  swatches: SwatchObject[];
  userID: string;
  largeWindowSize: boolean;
  step: number;
}

const mapStateToProps = (state: any): StateProps => ({
  swatches: state.swatches.swatches,
  largeWindowSize: state.layout.isLargeWindowSize,
  userID: state.auth.userID,
  step: state.tutorials.step,
});

export default connect(mapStateToProps, {
  startGetUserSwatches,
  startIsResponsive,
  startTriggerTutorial,
})(swatchPage);
