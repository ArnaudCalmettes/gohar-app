export interface Style {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  whiteFill?: string;
  blackFill?: string;
  selectedFill?: string;
  highlightedFill?: string;
}

export const defaultStyle: Style = {
  strokeWidth: 1,
  stroke: "#000",
  whiteFill: "#fff",
  blackFill: "#000",
  selectedFill: "#4ad",
  highlightedFill: "#8db",
};
