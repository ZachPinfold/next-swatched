export const rgbToHex = (rgb: Array<number>) => {
  const ColorToHex = (color: number) => {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  };

  const ConvertRGBtoHex = (red: number, green: number, blue: number) => {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  };

  console.log(ConvertRGBtoHex(rgb[0], rgb[1], rgb[2]));
};
