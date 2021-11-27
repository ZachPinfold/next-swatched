export type SwatchObject = {
  color: number[];
  colourId: string;
  timeAdded: Date;
};

export interface Swatches {
  swatches: SwatchObject[];
  loading: Boolean;
}
