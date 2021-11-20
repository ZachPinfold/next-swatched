export type SwatchObject = {
  color: string;
  colourId: string;
  order: number;
};

export interface Swatches {
  swatches: SwatchObject[];
  loading: Boolean;
}
