import React from "react";
import { connect } from "react-redux";
import Menu from "../../assets/images/Menu";
import { SwatchObject } from "../../types/swatches";

interface Actions {
  initialSwatches: SwatchObject[];
  compact: boolean;
}

const NavBar = ({ initialSwatches, compact }: Actions) => {
  return (
    <nav style={{ height: compact ? "60px" : "100px" }} className="wrapper">
      <div className="wrapper_inner inner_nav">
        <div className="left_area">
          <h1 style={{ fontSize: compact ? "30px" : "40px" }}>Swatched</h1>
          {!compact && (
            <p>
              Use <strong> deep learning</strong> to find and save colours to
              your swatch, powered by the <span>ColormindAPI</span>{" "}
            </p>
          )}
        </div>
        {initialSwatches.length > 0 && (
          <Menu initialSwatches={initialSwatches} />
        )}
      </div>
    </nav>
  );
};

interface StateProps {
  initialSwatches: SwatchObject[];
}

const mapStateToProps = (state: any): StateProps => ({
  initialSwatches: state.swatches.initialSwatches,
});

export default connect(mapStateToProps, {})(NavBar);
