import axios from "axios";
import React, { useEffect } from "react";
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
  useEffect(() => {
    startGetUserSwatches("");
  }, [startGetUserSwatches]);

  return (
    <div className='wrapper'>
      {" "}
      <SwatchList swatches={swatches} />
      <SwatchSelector />
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
