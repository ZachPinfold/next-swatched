import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../actions/swatch";
import SwatchSelector from "../components/swatch selector/SwatchSelector";
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
    <div className='wrapper'>
      {" "}
      <SwatchList
        swatches={swatches}
        setCompareArray={setCompareArray}
        selectSwatchToCompareRef={selectSwatchToCompareRef}
      />
      <SwatchSelector
        compareArray={compareArray}
        setCompareArray={setCompareArray}
        selectSwatchToCompareRef={selectSwatchToCompareRef}
      />
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
