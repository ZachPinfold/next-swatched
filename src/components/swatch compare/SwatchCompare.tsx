import React, { useEffect } from "react";
import Plus from "../../assets/images/Plus";
import Minus from "../../assets/images/Minus";
import expandImage from "../../assets/images/arrow_swatch.svg";
import CompareCard from "./CompareCard";
import { connect } from "react-redux";
import ReloadButton from "../../assets/images/ReloadButton";

interface Actions {
  compareArray: number[][];
  setCompareArray: (userUid: number[][]) => void;
  setOpenState: (setOpenState: boolean) => void;
  openState: boolean;
  setNumberOfSwatches: (num: number) => void;
  swatchNumber: number;
  setFullScreen: (fullScreen: boolean) => void;
  fullScreen: boolean;
  swatchToCompare: number[];
  setSwatchToCompare: (color: number[]) => void;
  selectSwatchToCompareRef: any;
  isCompact: boolean;
  largeWindowSize: boolean;
  setReloadSwatches: React.Dispatch<React.SetStateAction<boolean>>;
  compareLoading: boolean;
  step: number;
  closeTutorial: () => void;
  isTutorial: boolean;
}

const SwatchSelector = ({
  compareArray,
  setCompareArray,
  openState,
  setOpenState,
  swatchNumber,
  setNumberOfSwatches,
  setFullScreen,
  fullScreen,
  swatchToCompare,
  setSwatchToCompare,
  selectSwatchToCompareRef,
  isCompact,
  setReloadSwatches,
  largeWindowSize,
  compareLoading,
  step,
  isTutorial,
  closeTutorial,
}: Actions) => {
  useEffect(() => {
    openState
      ? window.addEventListener("keydown", onKeyUp)
      : window.removeEventListener("keydown", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyUp);
    };
  }, [openState]);

  const onKeyUp = (event: KeyboardEvent) => {
    const { code } = event;
    const finalNum = parseInt(code[code.length - 1]);

    if (code.includes("Digit") && finalNum < 6) {
      event.preventDefault();
      handleProgressClick(finalNum - 1);
    }

    if (code === "Escape") {
      event.preventDefault();
      handleClose();
      closeTutorial();
    }
    if (code === "Space") {
      event.preventDefault();
      setReloadSwatches(true);
    }
  };

  const handleProgressClick = (index: number) => {
    setNumberOfSwatches(index + 1);
  };

  const handleClose = () => {
    setOpenState(false);
    closeTutorial();
    setTimeout(function () {
      setNumberOfSwatches(2);
      setCompareArray([]);
      setSwatchToCompare([]);
      setFullScreen(false);
      selectSwatchToCompareRef.current = true;
    }, 200);
  };

  return (
    <div
      className={"swatch_selector"}
      style={{
        height: fullScreen ? "100%" : "40%",
        paddingTop:
          fullScreen && isCompact
            ? "50px"
            : fullScreen && !isCompact
            ? "80px"
            : "0",
        transform:
          compareArray.length > 2 && openState
            ? " translatey(0%)"
            : "translatey(100%)",
        zIndex: step === 3 && isTutorial ? "101" : "2",
      }}
    >
      <div className="compare_colour_area">
        <button
          disabled={swatchNumber === 1 && true}
          onClick={() => setNumberOfSwatches(swatchNumber - 1)}
          style={{
            opacity: swatchNumber === 1 ? "0.5" : "1",
          }}
          className="plusMinus"
        >
          <Minus color={"#FF6459"} />
        </button>

        <button
          onClick={() => setReloadSwatches(true)}
          className="current_colour"
          style={{
            backgroundColor: `rgb(${swatchToCompare})`,
            marginTop:
              fullScreen && isCompact
                ? "60px"
                : fullScreen && !isCompact
                ? "100px"
                : "0",
          }}
        >
          <div
            style={{ opacity: !compareLoading ? "1" : "0" }}
            className="reload"
          >
            <ReloadButton />
          </div>
          <div
            style={{ opacity: compareLoading ? "1" : "0" }}
            className="loader"
          ></div>
        </button>
        <div className="inner_compare">
          {compareArray.length > 0 &&
            compareArray.map((compareSwatch, index) => {
              return (
                <CompareCard
                  compareSwatch={compareSwatch}
                  index={index}
                  swatchNumber={swatchNumber}
                  key={index}
                  largeWindowSize={largeWindowSize}
                  setSwatchToCompare={setSwatchToCompare}
                  selectSwatchToCompareRef={selectSwatchToCompareRef}
                />
              );
            })}
        </div>

        <button
          disabled={swatchNumber === 5 && true}
          onClick={() => setNumberOfSwatches(swatchNumber + 1)}
          style={{
            opacity: swatchNumber === 5 ? "0.5" : "1",
          }}
          className="plusMinus"
        >
          <Plus color={"#06D6A3"} />
        </button>

        <button
          className="close_btn"
          style={{
            marginTop:
              fullScreen && isCompact
                ? "60px"
                : fullScreen && !isCompact
                ? "100px"
                : "0",
          }}
          onClick={handleClose}
        >
          <Plus color={"#ff6459"} />
        </button>

        <button
          className="expand_btn"
          style={{
            marginTop:
              fullScreen && isCompact
                ? "60px"
                : fullScreen && !isCompact
                ? "100px"
                : "0",
          }}
          onClick={() => {
            setFullScreen(!fullScreen);
            closeTutorial();
          }}
        >
          <img src={expandImage.src} alt="" />
        </button>
      </div>
      <div className="progress_area">
        {compareArray.map((e, index) => (
          <div
            style={{
              backgroundColor:
                index < swatchNumber ? `rgb(${compareArray[0]})` : "white",
              border: `rgb(${compareArray[0]}) solid 1px`,
            }}
            key={index}
            className="progress_circle"
            onClick={() => handleProgressClick(index)}
          ></div>
        ))}
      </div>
      {largeWindowSize && (
        <p className="space_reload">Hit the spacebar to refresh colours</p>
      )}
      {compareArray.length > 2 && openState && isTutorial && step === 3 && (
        <div className="tut">
          <h3>
            This is where you can match your colour to other colours in a
            palette
          </h3>
          <ol>
            <li>
              Add more colours by using the buttons, or use your keyboard
              numbers (1, 2, 3, 4, 5).
            </li>
            <li>
              Hit the refresh button or spacebar to try a new colour palette.
            </li>
            <li>Hover over the colours for options.</li>
            <li>Close the tutorial below, or by hitting esc</li>
          </ol>
          <button onClick={closeTutorial} className="close_onboarding">
            close tutorial
          </button>
        </div>
      )}
    </div>
  );
};

interface StateProps {
  isCompact: boolean;
  largeWindowSize: boolean;
}

const mapStateToProps = (state: any): StateProps => ({
  isCompact: state.layout.isCompact,
  largeWindowSize: state.layout.isLargeWindowSize,
});

export default connect(mapStateToProps, {})(SwatchSelector);
