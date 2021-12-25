export type SwatchObject = {
  color: number[];
  colourId: string;
  timeAdded: Date;
};

export interface Swatches {
  swatches: SwatchObject[];
  loading: Boolean;
}

export type LookupTypes = {
  color: string;
  other: string;
};

export interface ColorNamesType {
  name: string;
  rgb: number[];
}
