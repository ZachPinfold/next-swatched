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

  useEffect(() => {
    startGetUserSwatches("");
  }, [startGetUserSwatches]);

  return (
    <div className="wrapper swatches_page">
      {" "}
      <SwatchList
        swatches={swatches}
        setCompareArray={setCompareArray}
        selectSwatchToCompareRef={selectSwatchToCompareRef}
      />
      <div className="outer_selector">
        <SwatchSelector
          compareArray={compareArray}
          setCompareArray={setCompareArray}
          selectSwatchToCompareRef={selectSwatchToCompareRef}
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
