export function adjustAmbitus(
  low: number,
  high: number
): { low: number; high: number } {
  let highest = high;
  let lowest = low;

  if (lowest > highest) {
    highest = low;
    lowest = high;
  }

  if (!isWhiteKey(lowest)) lowest--;
  if (!isWhiteKey(highest)) highest++;
  if (highest - lowest < 12) {
    highest = lowest + 12;
  }
  return {
    high: highest,
    low: lowest,
  };
}

const whiteKeys = [
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
];

export function isWhiteKey(pitch: number): boolean {
  return whiteKeys[wrap(pitch, 12)];
}

function wrap(a: number, mod: number): number {
  a = a % mod;
  if (a < 0) {
    a += mod;
  }
  return a;
}

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
  selectedFill: "#47a",
  highlightedFill: "#8db",
};

export interface keyShape {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  ry: number;
}
export const whiteShape: keyShape = {
  width: 20,
  height: 100,
  x: 0,
  y: -10,
  rx: 5,
  ry: 5,
};
export const blackShape: keyShape = {
  width: 14,
  height: 70,
  x: -7,
  y: -10,
  rx: 3,
  ry: 3,
};
export interface keyColorProfile {
  baseColor: string;
  baseHoverColor: string;
  selColor: string;
  selHoverColor: string;
  highColor: string;
  highHoverColor: string;
}
export function whiteColorProfile(style: Style): keyColorProfile {
  return {
    baseColor: style.whiteFill || "#fff",
    baseHoverColor: "url(#whiteHover)",
    selColor: style.selectedFill || "#47a",
    selHoverColor: "url(#whiteSelHover)",
    highColor: style.highlightedFill || "#8bf",
    highHoverColor: "url(#highSelHover)",
  };
}
export function blackColorProfile(style: Style): keyColorProfile {
  return {
    baseColor: style.blackFill || "#000",
    baseHoverColor: "url(#blackHover)",
    selColor: style.selectedFill || "#47a",
    selHoverColor: "url(#blackSelHover)",
    highColor: style.highlightedFill || "#8bf",
    highHoverColor: "url(#highSelHover)",
  };
}
export function computeColor(
  colors: keyColorProfile,
  selected: boolean,
  high: boolean,
  mouseOver: boolean
): string {
  if (selected) {
    return mouseOver ? colors.selHoverColor : colors.selColor;
  }
  if (high) {
    return mouseOver ? colors.highHoverColor : colors.highColor;
  }
  return mouseOver ? colors.baseHoverColor : colors.baseColor;
}
