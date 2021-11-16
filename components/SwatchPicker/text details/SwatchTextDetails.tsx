import React from "react";

interface Content {
  colourName: string;
}

const SwatchTextDetails = ({ colourName }: Content) => {
  return (
    <div className='colour_text_area'>
      <p>{colourName}</p>
    </div>
  );
};

export default SwatchTextDetails;
