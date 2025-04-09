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
