import React from "react";

interface SwatchTypes {
  color: number[];
}

const SwatchAdderCard = ({ color }: SwatchTypes) => {
  return (
    <div
      className='swatch_adder_card'
      style={{ backgroundColor: `rgb(${color}, 0.3)` }}
    >
      hd
    </div>
  );
};

export default SwatchAdderCard;
