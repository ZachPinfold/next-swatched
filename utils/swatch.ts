export const rgbToHex = (rgb) => {
  const ColorToHex = (color) => {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  };

  const ConvertRGBtoHex = (red, green, blue) => {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  };

  ConvertRGBtoHex(rgb[0], rgb[1], rgb[2]);
};
