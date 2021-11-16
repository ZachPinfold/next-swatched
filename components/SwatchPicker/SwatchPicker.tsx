import axios from "axios";
import React, { useState } from "react";
import refreshIcon from "../../assets/images/refresh_icon.svg";
import SwatchCard from "./swatch card/SwatchCard";
import SwatchTextDetails from "./text details/SwatchTextDetails";

// Apply any to allow for includes() function

interface Swatches {
  swatches: any[];
}

const SwatchPicker = ({ swatches }: Swatches) => {
  const [colourName, setColourName] = useState<string>("");

  const [swatchesUi, setSwatchesUi] = useState(swatches);
  const [hoverSwatch, setHoverSwatch] = useState<number[] | string>("");
  const [lockedSwatches, setLockedSwatches] = useState<number[][]>([]);

  const onColourHover = async (hex: string) => {
    const colourDetails = await axios.get(
      `https://www.thecolorapi.com/id?hex=${hex.replace("#", "")}`
    );
    setColourName(colourDetails.data.name.value);
  };

  // handleRefresh handles the refreshing of the colour palette from the client.
  // Checks for locked colours and retains they're position

  const handleRefresh = async () => {
    // let swatchesForRefresh;
    // if (lockedSwatches) {
    //   swatchesForRefresh = swatchesUi.map((s) =>
    //     !lockedSwatches.includes(s) ? (s = "N") : (s = s)
    //   );
    // } else swatchesForRefresh = swatchesUi;
    // const url = "https://colormind.io/api/";
    // const data = {
    //   model: "default",
    //   input: swatchesForRefresh,
    // };
    // const headers = {
    //   "Content-Type": "text/plain",
    // };
    // const colorPallete = await axios.post(url, data, { headers });
    // const result = swatchesForRefresh.map((a, index) => {
    //   if (a === "N") a = colorPallete.data.result[index];
    //   return a;
    // });
    // setSwatchesUi(result);
    const api = await axios.get("/api/hello");
    console.log(api);
  };

  return (
    <div className='outer_swatch'>
      <div className='swatch_area'>
        {swatchesUi.map((swatch, index) => {
          return (
            <div
              className='swatch_card'
              style={{
                backgroundColor: `rgb(${swatch})`,
                width: hoverSwatch === swatch ? "23%" : "20%",
              }}
            >
              <SwatchCard
                swatch={swatch}
                index={index}
                setHoverSwatch={setHoverSwatch}
                setLockedSwatches={setLockedSwatches}
                lockedSwatches={lockedSwatches}
                onColourHover={onColourHover}
                setColourName={setColourName}
              />
              {hoverSwatch === swatch && (
                <SwatchTextDetails colourName={colourName} />
              )}
            </div>
          );
        })}
      </div>
      <img
        onClick={handleRefresh}
        src={refreshIcon.src}
        alt='refresh_icon'
        className='refresh_icon'
      />
    </div>
  );
};

export default SwatchPicker;
