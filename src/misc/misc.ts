import { hexToRgb, rgb2hsv } from "../utils/swatch";

export const initialUserArray = [
  {
    timeAdded: new Date(),
    color: hexToRgb("#e7984c"),
    colorName: rgb2hsv(hexToRgb("#e7984c")),
  },
  {
    timeAdded: new Date(),
    color: hexToRgb("#cf523e"),
    colorName: rgb2hsv(hexToRgb("#cf523e")),
  },
  {
    timeAdded: new Date(),
    color: hexToRgb("#c98a5a"),
    colorName: rgb2hsv(hexToRgb("#c98a5a")),
  },
  {
    timeAdded: new Date(),
    color: hexToRgb("#63b7b7"),
    colorName: rgb2hsv(hexToRgb("#63b7b7")),
  },
  {
    timeAdded: new Date(),
    color: hexToRgb("#85b9d4"),
    colorName: rgb2hsv(hexToRgb("#85b9d4")),
  },
];
