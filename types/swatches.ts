export type SwatchObject = {
  color: number[];
  colourId: string;
  order: number;
};

export interface Swatches {
  swatches: SwatchObject[];
  loading: Boolean;
}
