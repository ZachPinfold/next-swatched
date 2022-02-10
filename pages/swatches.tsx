import axios from "axios";
import React, { FC, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../actions/swatch";
import HueSwatch from "../assets/images/HueSwatch";
import Tips from "../assets/images/Tips";
import SwatchSelector from "../components/swatch compare/SwatchCompare";
import ColorFilter from "../components/swatches/filters/ColorFilter";
import SwatchList from "../components/swatches/swatch list/SwatchList";
import Tutorial from "../components/swatches/tutorials/Tutorial";
import Dropdown from "../components/utils/Dropdown";
import { ColorNamesType, SwatchObject, TutTypes } from "../types/swatches";
import LockedImage from "../assets/images/LockedSwatch";
import CopySwatch from "../assets/images/CopySwatch";
import DeleteSwatch from "../assets/images/DeleteSwatch";
import Plus from "../assets/images/Plus";
import Responsive from "../components/utils/Responsive";
import { startIsResponsive } from "../actions/layout";
import SwatchSwitcher from "../components/swatches/filters/SwatchSwitcher";

interface Actions {
  startGetUserSwatches: (
    userUid: string,
    colorFilter: string,
    isInitialLoad: boolean
  ) => void;
  swatches: SwatchObject[];
  startIsResponsive: (isLarge: boolean) => void;
}

const tutorialObjectArray: TutTypes[] = [
  { img: LockedImage, text: "compare a colour" },
  { img: CopySwatch, text: "copy the hex" },
  { img: DeleteSwatch, text: "delete a swatch" },
];

const swatchPage = ({
  startGetUserSwatches,
  swatches,
  startIsResponsive,
}: Actions) => {
  let refFilterId = "dropdown_filter";
  let refTutorialId = "dropdown_tutorial";
  let refSwatchGroupId = "dropdown_swatch_group";

  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isTutorial, setIsTutorial] = useState<boolean>(false);
  const [isSwitcher, setIsSwitcher] = useState<boolean>(false);
  const [compareArray, setCompareArray] = useState<number[][]>([]);
  const selectSwatchToCompareRef = useRef<boolean>(true);
  const [openState, setOpenState] = useState<boolean>(false);
  const [swatchNumber, setNumberOfSwatches] = useState<number>(2);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [swatchToCompare, setSwatchToCompare] = useState<number[]>([]);
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);
  const [isSwatchSelectorClickedOutside, setIsSwatchSelectorClickedOutside] =
    useState<boolean>(false);
  const [isTutClickedOutside, setIsTutClickedOutside] =
    useState<boolean>(false);
  const [colorFilter, setColorFilter] = useState<ColorNamesType>({
    name: "all swatches",
    rgb: [197, 199, 196],
  });

  Responsive(startIsResponsive);

  useEffect(() => {
    startGetUserSwatches("", "all", true);
  }, [startGetUserSwatches]);

  useEffect(() => {
    const getCompareColours = async () => {
      try {
        const data = {
          model: "default",
          input: [swatchToCompare, "N", "N", "N", "N"],
        };

        const apiResponse = await axios.post("/api/colorMind", data);

        const { colourData } = apiResponse.data;

        colourData[0] = swatchToCompare;

        setCompareArray(colourData);
      } catch (error) {
        console.log(error);
      }
      selectSwatchToCompareRef.current = false;
    };

    if (
      selectSwatchToCompareRef.current === true &&
      swatchToCompare.length > 0
    ) {
      getCompareColours();
    }
  }, [swatchToCompare]);

  useEffect(() => {
    if (isTutClickedOutside) {
      setIsTutorial(false);
      setIsTutClickedOutside(false);
      setIsSwatchSelectorClickedOutside(false);
    }
  }, [isTutClickedOutside]);

  return (
    <div className="wrapper swatches_page">
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
            />
          }
          setIsClickedOutside={setIsClickedOutside}
          refId={refFilterId}
        />
        <HueSwatch currentColour={colorFilter.name} />
        <Dropdown
          Component={
            <SwatchSwitcher
              isClickedOutside={isSwatchSelectorClickedOutside}
              setIsClickedOutside={setIsSwatchSelectorClickedOutside}
              colorFilter={colorFilter}
              setColorFilter={setColorFilter}
              setDropdownOpen={setIsSwitcher}
              isDropdownOpen={isSwitcher}
              refId={refSwatchGroupId}
            />
          }
          setIsClickedOutside={setIsSwatchSelectorClickedOutside}
          refId={refSwatchGroupId}
        />
        <div className="tips_wrap" id={refTutorialId}>
          <div
            onClick={() => {
              setIsTutorial(!isTutorial);
            }}
            className={"tips_button " + (isTutorial && "open_button")}
            id={refTutorialId}
          >
            <p id={refTutorialId}>tips</p>
            <Tips refTutorialId={refTutorialId} />
          </div>
          <Dropdown
            Component={
              <Tutorial isDropdownOpen={isTutorial} refId={refTutorialId} />
            }
            setIsClickedOutside={setIsTutClickedOutside}
            refId={refTutorialId}
          />
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
}

const mapStateToProps = (state: any): StateProps => ({
  swatches: state.swatches.swatches,
});

export default connect(mapStateToProps, {
  startGetUserSwatches,
  startIsResponsive,
})(swatchPage);
