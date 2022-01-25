import { SwatchObject } from "../types/swatches";
import { openCircleMenuD3 } from "./d3";

export const rgbToHex = (rgb: Array<number>) => {
  const ColorToHex = (color: number) => {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  };

  const ConvertRGBtoHex = (red: number, green: number, blue: number) => {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  };

  return ConvertRGBtoHex(rgb[0], rgb[1], rgb[2]);
};

export const getContrastYIQ = (hexcolor: string) => {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};

export const setCompareWidths = (number: number) => {
  let percentage: string = "20%";

  switch (number) {
    case 1:
      percentage = "100%";
      break;
    case 2:
      percentage = "50%";
      break;
    case 3:
      percentage = "33.33333333%";
      break;
    case 4:
      percentage = "25%";
      break;
    case 5:
      percentage = "20%";
      break;
    default:
      "20%";
      break;
  }

  return percentage;
};

export function isHexColor(hex: string) {
  return (
    typeof hex === "string" && hex.length === 6 && !isNaN(Number("0x" + hex))
  );
}

export const hexToRgb = (hex: string) => {
  const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (normal) return normal.slice(1).map((e) => parseInt(e, 16));

  const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (shorthand) return shorthand.slice(1).map((e) => 0x11 * parseInt(e, 16));

  return [0, 0, 0];
};

export const calculateDimensionsOnWindowChange = (
  widthRef: string | null,
  setLargeWindowSize: (size: boolean | null) => void
) => {
  switch (true) {
    case window.innerWidth >= 525:
      if (widthRef !== "large") {
        setLargeWindowSize(true);
      }
      widthRef = "large";
      break;
    case window.innerWidth < 525:
      if (widthRef !== "small") {
        setLargeWindowSize(false);
      }
      widthRef = "small";
      break;
    default:
      break;
  }
};

export const getAverageRGB = (imgEl: any) => {
  let blockSize = 5, // only visit every 5 pixels
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
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

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
};

export const cropImage = async (
  target: HTMLInputElement,
  setImageColour: (colour: number[]) => void
) => {
  if (target.files) {
    if (target.files.length !== 0) {
      const file = target.files[0];
      const newUrl = URL.createObjectURL(file);

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
        // if (inputImageAspectRatio > outputImageAspectRatio) {
        outputWidth = inputWidth * outputImageAspectRatio;
        // } else if (inputImageAspectRatio < outputImageAspectRatio) {
        outputHeight = inputWidth * outputImageAspectRatio;
        // }

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
        if (ctx) {
          ctx.drawImage(inputImage, outputX, outputY);
          setImageColour(Object.values(getAverageRGB(outputImage)));
        }

        // // show both the image and the canvas
        // document.body.appendChild(inputImage);
        // document.body.appendChild(outputImage);
      };

      // start loading our image
      inputImage.src = newUrl;
    }
  }
};

interface SwatchCircleInput {
  image: string;
  text: string;
  func: any;
}

export const openMenu = (
  localSwatchId: string,
  circleArray: SwatchCircleInput[],
  position: number,
  angle: number,
  r: number,
  type: string,
  largeWindowSize: Boolean | null
) => {
  const radius = r; // the radius as a constant
  /* THETA is the angle of separation between each elemtents */
  const theta = (position * Math.PI) / circleArray.length;

  circleArray.forEach((e, i) => {
    let id;

    localSwatchId === "swatch_adder" ? (id = e.text) : (id = localSwatchId);

    const circleId: string = `${type}_${id}`;

    let xPosition, yPosition;

    const currentAngle = i * theta + angle; // calculate the current angle
    /* Get the positions */
    xPosition = radius * Math.cos(currentAngle);
    yPosition = radius * Math.sin(currentAngle);

    openCircleMenuD3(
      circleId,
      i,
      xPosition,
      yPosition,
      localSwatchId,
      largeWindowSize
    );
  });
};

export const hueToColorName = (hue: number) => {
  let name: string = "none";

  switch (true) {
    case hue >= 1 && hue <= 15:
      name = "red";
      break;
    case hue >= 16 && hue <= 50:
      name = "orange";
      break;
    case hue >= 51 && hue <= 72:
      name = "yellow";
      break;
    case hue >= 73 && hue <= 155:
      name = "green";
      break;
    case hue >= 156 && hue <= 185:
      name = "cyan";
      break;
    case hue >= 186 && hue <= 268:
      name = "blue";
      break;
    case hue >= 269 && hue <= 310:
      name = "magenta";
      break;
    case hue >= 311 && hue <= 344:
      name = "pink";
      break;
    case hue >= 345 && hue <= 359:
      name = "red";
      break;
    default:
      name = "none";
      break;
  }

  return name;
};

export const rgb2hsv = (rgb: number[]) => {
  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b);
  let h =
    c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  const result = [60 * (h < 0 ? h + 6 : h), v && c / v, v];
  return hueToColorName(parseInt(result[0].toFixed()));
};

export const checkIfRgb = (rgb: string[]) => {
  let ret = true;

  const numberRgb: number[] = rgb.map((num) => {
    if (num.length === 0) ret = false;
    const numFromString = parseInt(num);
    return numFromString;
  });

  if (!ret) return false;

  const total: number = parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2]);

  if (total > 765) {
    return false;
  } else {
    return numberRgb;
  }
};

export const randomRgba = () => {
  const o = Math.round,
    r = Math.random,
    s = 255;
  return [o(r() * s), o(r() * s), o(r() * s)];
};

export const buildNoneAuthColors = () => {
  const colours = [
    [208, 97, 80],
    [60, 124, 125],
    [87, 207, 163],
    [96, 129, 171],
    [249, 199, 104],
  ];

  const noneAuthColours: SwatchObject[] = [];

  for (let i = 0; i < 5; i++) {
    const color = {
      color: [211, 211, 211],
      colorName: "grey",
      colourId: "",
      timeAdded: new Date(),
    };

    color.color = colours[i];
    noneAuthColours.push(color);
  }

  return noneAuthColours;
};
