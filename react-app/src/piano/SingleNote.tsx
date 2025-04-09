import { useContext } from "react";
import { adjustAmbitus, defaultStyle, isWhiteKey, Style } from "./common";
import { Key, KeyColorProfile, KeyShape } from "./Key";
import { GoharContext } from "../gohar";

export function SingleNoteKeyboardSelector({
  lowest,
  highest,
  highlightedNotes: highlighted,
  selectedPitch: selected,
  style,
  onSelectionChanged,
}: {
  lowest: number;
  highest: number;
  selectedPitch?: number | null;
  highlightedNotes?: number[];
  style?: Style;
  onSelectionChanged: (selectedPitch: number | null) => void;
}) {
  const gohar = useContext(GoharContext);
  if (selected === undefined) {
    selected = null;
  }
  style ||= defaultStyle;
  const { low, high } = adjustAmbitus(lowest, highest);

  function selectHandler(pitch: number) {
    if (selected === pitch) {
      onSelectionChanged(null);
    } else {
      onSelectionChanged(pitch);
    }
  }

  const selectedPitchIndex = selected != null ? selected - low : -1;
  const highlight = Array<boolean>(high - low + 1).fill(false);
  const names = Array<string>(high - low + 1).fill("");
  if (highlighted) {
    for (const note of highlighted) {
      const pitch = gohar.notePitch(note);
      const i = pitch - low;
      if (0 <= i && i < highlight.length) {
        highlight[i] = true;
        names[i] = capitalize(gohar.noteName(note));
      }
    }
  }

  // black keys need to be rendered after white keys to appear above them.
  const whiteKeys = [];
  const blackKeys = [];
  const wColorProfile = whiteColorProfile(style);
  const bColorProfile = blackColorProfile(style);

  let x = 1;
  for (let pitch = low; pitch <= high; pitch++) {
    const isWhite = isWhiteKey(pitch);
    const idx = pitch - low;
    const key = (
      <Key
        key={pitch}
        x={x}
        name={names[idx]}
        shape={isWhite ? whiteShape : blackShape}
        colorProfile={isWhite ? wColorProfile : bColorProfile}
        style={style}
        highlighted={highlight[idx]}
        selected={selectedPitchIndex === idx}
        onSelect={() => selectHandler(pitch)}
      />
    );
    if (isWhite) {
      whiteKeys.push(key);
      x += whiteShape.width;
    } else {
      blackKeys.push(key);
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={"0 0 " + (x + 0.5) + " 100"}
      width="100%"
      height="100%"
    >
      <defs>
        <clipPath id="canvas">
          <path d={"M0 1h" + (x + 0.5) + "v95H0z"} />
        </clipPath>
        <BaseSvgDefs style={style} />
      </defs>
      {whiteKeys}
      {blackKeys}
      <path d={"M0.5 1h" + x} style={style} />
    </svg>
  );
}

function whiteColorProfile(style: Style): KeyColorProfile {
  return {
    baseColor: style.whiteFill || "#fff",
    selColor: style.selectedFill || "#47a",
    highColor: style.highlightedFill || "#8bf",
  };
}

function blackColorProfile(style: Style): KeyColorProfile {
  return {
    baseColor: style.blackFill || "#000",
    selColor: style.selectedFill || "#47a",
    highColor: style.highlightedFill || "#8bf",
  };
}

const whiteShape: KeyShape = {
  width: 20,
  height: 100,
  x: 0,
  y: -10,
  rx: 5,
  ry: 5,
};

const blackShape: KeyShape = {
  width: 14,
  height: 70,
  x: -7,
  y: -10,
  rx: 3,
  ry: 3,
};
export function BaseSvgDefs({ style }: { style: Style }) {
  return (
    <>
      <linearGradient id="Hover" x1="0%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={style.selectedFill} />
        <stop offset="100%" stopColor={style.selectedFill} stopOpacity="0" />
      </linearGradient>
      <linearGradient id="whiteHoverback" x1="0%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={style.whiteFill} />
        <stop offset="100%" stopColor={style.whiteFill} stopOpacity="0" />
      </linearGradient>
      <linearGradient id="blackHoverback" x1="0%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={style.blackFill} />
        <stop offset="100%" stopColor={style.blackFill} stopOpacity="0" />
      </linearGradient>
    </>
  );
}

function capitalize(val: string): string {
  return val.charAt(0).toUpperCase() + val.slice(1);
}
