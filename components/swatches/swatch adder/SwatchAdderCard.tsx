import React from "react";
import { connect } from "react-redux";
import { startAddSwatchToSwatchList } from "../../../actions/swatch";

interface SwatchTypes {
  color: number[];
  startAddSwatchToSwatchList: () => void;
}

const SwatchAdderCard = ({
  color,
  startAddSwatchToSwatchList,
}: SwatchTypes) => {
  return (
    <div
      onClick={() => startAddSwatchToSwatchList()}
      className='swatch_adder_card'
      style={{ backgroundColor: `rgb(${color}, 0.3)` }}
    >
      hd
    </div>
  );
};

export default connect(null, { startAddSwatchToSwatchList })(SwatchAdderCard);
