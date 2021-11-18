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

export default getContrastYIQ;
