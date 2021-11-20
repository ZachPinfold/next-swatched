import React from "react";

interface Content {
  name: string;
  cmyk: string;
  rgb: string;
  hexName: string;
}

const SwatchTextDetails = ({ name, cmyk, rgb, hexName }: Content) => {
  return (
    <div className='colour_text_area'>
      <p>{name}</p>
      <p>{hexName}</p>
      <p>{rgb}</p>
      <p>{cmyk}</p>
    </div>
  );
};

export default SwatchTextDetails;
