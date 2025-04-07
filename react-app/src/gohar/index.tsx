import { createContext } from "react";

export interface Gohar {
  isLoaded: boolean;
  scalePatterns: number[];
  setLocale: (locale: string) => void;
  scaleName: (root: number, pattern: number) => string;
  scalePatternName: (pattern: number) => string;
  scalePatternPitches: (pattern: number) => number[];
}

export const defaultGoharCtx = {
  isLoaded: false,
  scalePatterns: [],
  setLocale: () => {},
  scaleName: () => "loading...",
  scalePatternName: () => "loading...",
  scalePatternPitches: () => [],
};

export const GoharContext = createContext<Gohar>(defaultGoharCtx);

export interface Scale {
  root: number;
  notes: number[];
  pitches: number[];
  pattern: number;
}
