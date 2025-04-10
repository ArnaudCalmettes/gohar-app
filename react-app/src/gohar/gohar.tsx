import { createContext } from "react";

export interface Gohar {
  isLoaded: boolean;
  scalePatterns: number[];
  setLocale: (locale: string) => void;
  noteName: (note: number) => string;
  notePitch: (note: number) => number;
  scaleName: (root: number, pattern: number) => string;
  scalePatternName: (pattern: number) => string;
  scalePatternPitches: (pattern: number) => number[];
  scaleNotesFromPitch: (pitch: number, pattern: number) => number[];
}

export const defaultGoharCtx = {
  isLoaded: false,
  scalePatterns: [],
  noteName: () => "loading...",
  notePitch: () => 0,
  setLocale: () => {},
  scaleName: () => "loading...",
  scalePatternName: () => "loading...",
  scalePatternPitches: () => [],
  scaleNotesFromPitch: () => [],
};

export const GoharContext = createContext<Gohar>(defaultGoharCtx);

export interface Scale {
  root: number;
  pattern: number;
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
