import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../actions/swatch";

interface Actions {
  startGetUserSwatches: (userUid: string) => void;
}

const swatchPage = ({ startGetUserSwatches }: Actions) => {
  useEffect(() => {
    startGetUserSwatches("");
  }, []);

  return <div className='swatch-grid'></div>;
};

interface StateProps {
  swatches: string[];
}

const mapStateToProps = (state: any): StateProps => ({
  swatches: state.swatches,
});

export default connect(mapStateToProps, { startGetUserSwatches })(swatchPage);
