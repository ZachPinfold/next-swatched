export type SwatchObject = {
  colourHex: number;
  colourId: string;
  order: number;
};

export interface Swatches {
  swatches: SwatchObject[];
  loading: Boolean;
}
