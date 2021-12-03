import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../actions/swatch";
import SwatchSelector from "../components/swatch compare/SwatchCompare";
import SwatchList from "../components/swatches/SwatchList";
import { SwatchObject } from "../types/swatches";

interface Actions {
  startGetUserSwatches: (userUid: string) => void;
  swatches: SwatchObject[];
}

const swatchPage = ({ startGetUserSwatches, swatches }: Actions) => {
  const [compareArray, setCompareArray] = useState<number[][]>([]);
  const selectSwatchToCompareRef = useRef<boolean>(false);
  const [openState, setOpenState] = useState<boolean>(false);
  const [swatchNumber, setNumberOfSwatches] = useState<number>(2);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [swatchToCompare, setSwatchToCompare] = useState<number[]>([]);

  useEffect(() => {
    startGetUserSwatches("");
  }, [startGetUserSwatches]);

  useEffect(() => {
    const getCompareColours = async () => {
      try {
        const data = {
          model: "default",
          input: [swatchToCompare, "N", "N", "N", "N"],
        };

        const apiResponse = await axios.post("/api/colorMind", data);

        setCompareArray(apiResponse.data.colourData);
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

  return (
    <div className="wrapper swatches_page">
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
          selectSwatchToCompareRef={selectSwatchToCompareRef}
          setOpenState={setOpenState}
          openState={openState}
          setNumberOfSwatches={setNumberOfSwatches}
          swatchNumber={swatchNumber}
          setFullScreen={setFullScreen}
          fullScreen={fullScreen}
          swatchToCompare={swatchToCompare}
          setSwatchToCompare={setSwatchToCompare}
        />
      </div>
    </div>
  );
};

interface StateProps {
  swatches: SwatchObject[];
}

const mapStateToProps = (state: any): StateProps => ({
  swatches: state.swatches.swatches,
});

export default connect(mapStateToProps, { startGetUserSwatches })(swatchPage);
