import React, { useEffect, useRef, useState } from "react";
import { SwatchObject } from "../../types/swatches";
import SwatchAdderCard from "./swatch adder/SwatchAdderCard";
import SwatchCard from "./swatch card/SwatchCard";

interface SwatchTypes {
  swatches: SwatchObject[];
  setCompareArray: (userUid: number[][]) => void;
  selectSwatchToCompareRef: any;
  setOpenState: (setOpenState: boolean) => void;
  openState: boolean;
  setNumberOfSwatches: (num: number) => void;
  setSwatchToCompare: (num: number[]) => void;
  swatchToCompare: number[];
}
const SwatchList = ({
  swatches,
  setCompareArray,
  selectSwatchToCompareRef,
  openState,
  setOpenState,
  setNumberOfSwatches,
  setSwatchToCompare,
  swatchToCompare,
}: SwatchTypes) => {
  const [swatchId, setSwatchId] = useState<string>("");

  const readAsbuff = (file) => {
    console.log(typeof file, file);

    var fr = new FileReader();
    return fr.readAsArrayBuffer(file);
  };

  const [source, setSource] = useState("");
  const [imgColour, setImageColour] = useState([]);
  const [sourceChange, setToggleSrcChange] = useState(false);
  const ref = useRef(0);
  // useEffect(() => {
  //   if (source) {
  //     var rgb = getAverageRGB(document.getElementById("i"));

  //     console.log(rgb);
  //   }
  // }, [source]);

  function getAverageRGB(imgEl) {
    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
      canvas = document.createElement("canvas"),
      context = canvas.getContext && canvas.getContext("2d"),
      data,
      width,
      height,
      i = -4,
      length,
      rgb = { r: 0, g: 0, b: 0 },
      count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height =
      imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width =
      imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    height = 10;
    width = 10;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
      /* security error, img on diff domain */ alert("x");
      return defaultRGB;
    }

    length = data.data.length;

    console.log(data);

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
  }

  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);

        const img = await createImageBitmap(target.files[0], 0, 0, 32, 32);

        // the desired aspect ratio of our output image (width / height)
        const outputImageAspectRatio = 0.5;

        // this image will hold our source image data
        const inputImage = new Image();

        // we want to wait for our image to load
        inputImage.onload = () => {
          // let's store the width and height of our image
          const inputWidth = inputImage.naturalWidth;
          const inputHeight = inputImage.naturalHeight;

          // get the aspect ratio of the input image
          const inputImageAspectRatio = inputWidth / inputHeight;

          // if it's bigger than our target aspect ratio
          let outputWidth = inputWidth;
          let outputHeight = inputHeight;
          if (inputImageAspectRatio > outputImageAspectRatio) {
            outputWidth = inputHeight * outputImageAspectRatio;
          } else if (inputImageAspectRatio < outputImageAspectRatio) {
            outputHeight = inputWidth / outputImageAspectRatio;
          }

          outputHeight = 300;

          // calculate the position to draw the image at
          const outputX = (outputWidth - inputWidth) * 0.5;
          const outputY = (outputHeight - inputHeight) * 0.5;

          // create a canvas that will present the output image
          const outputImage = document.createElement("canvas");

          // set it to the same size as the image
          outputImage.width = outputWidth;
          outputImage.height = outputHeight;

          // draw our image at position 0, 0 on the canvas
          const ctx = outputImage.getContext("2d");
          ctx.drawImage(inputImage, outputX, outputY);
          setImageColour(Object.values(getAverageRGB(outputImage)));

          // console.log(ctx);

          // // show both the image and the canvas
          // document.body.appendChild(inputImage);
          // document.body.appendChild(outputImage);
        };

        // start loading our image
        inputImage.src = newUrl;

        // ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);

        // console.log(file);

        // console.log(readAsbuff(target.files[0]));
      }
    }
  };

  // useEffect(() => {
  //   ref.current = ref.current + 1;
  //   setToggleSrcChange(!sourceChange);
  // }, [source]);

  // var rgb = document.getElementById("i");

  // console.log(rgb);
  // useEffect(() => {
  //   // console.log(ref);

  //   let rgbs;

  //   rgb && (rgbs = Object.values(getAverageRGB(rgb)));

  //   setImageColour(rgbs);
  // }, [sourceChange]);

  return (
    <div className="swatch_grid wrapper_inner">
      {swatches.map((swatch, index) => {
        if (swatch.colourId !== "none-colour") {
          return (
            <SwatchCard
              key={index}
              color={swatch.color}
              setCompareArray={setCompareArray}
              selectSwatchToCompareRef={selectSwatchToCompareRef}
              setOpenState={setOpenState}
              setNumberOfSwatches={setNumberOfSwatches}
              openState={openState}
              swatch={swatch}
              setSwatchToCompare={setSwatchToCompare}
              swatchToCompare={swatchToCompare}
              setSwatchId={setSwatchId}
              swatchId={swatchId}
            />
          );
        } else
          return <SwatchAdderCard key={"add_hex_card"} color={swatch.color} />;
      })}
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={(e) => handleCapture(e.target)}
      />
      {source && (
        <img id="i" src={source} alt={"snap"} className={"photo_box"}></img>
      )}
      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: `rgb(${imgColour})`,
        }}
      ></div>
    </div>
  );
};

export default SwatchList;
