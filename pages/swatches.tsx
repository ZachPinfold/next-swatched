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

  useEffect(() => {
    startGetUserSwatches("");
  }, [startGetUserSwatches]);

  return (
    <div className="wrapper swatches_page">
      <SwatchList
        swatches={swatches}
        setCompareArray={setCompareArray}
        selectSwatchToCompareRef={selectSwatchToCompareRef}
        setOpenState={setOpenState}
        setNumberOfSwatches={setNumberOfSwatches}
        openState={openState}
      />
      <div
        className="outer_selector"
        style={{ zIndex: compareArray.length > 0 ? "1" : "-1" }}
      >
        <SwatchSelector
          compareArray={compareArray}
          setCompareArray={setCompareArray}
          selectSwatchToCompareRef={selectSwatchToCompareRef}
          setOpenState={setOpenState}
          openState={openState}
          setNumberOfSwatches={setNumberOfSwatches}
          swatchNumber={swatchNumber}
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
