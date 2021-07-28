export interface Svg {
  fill: string;
}

export interface MoodData {
  key: number;
  amount: number;
  mood: string;
  svg: Svg;
}

export interface MoodCount {
  terrible?: number;
  bad?: number;
  ok?: number;
  good?: number;
  great?: number;
}

export interface Slice {
  labelCentroid: number[];
  data: MoodData[];
}

export type AxesSvgType = {
  fontSize: number;
  fill: string;
};

export type VerticalContentInsetType = {
  top: number;
  bottom: number;
};