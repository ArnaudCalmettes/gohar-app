import { useState } from "react";
import { adjustAmbitus, defaultStyle, isWhiteKey, Style } from "./common";

export function SingleNoteKeyboardSelector({
  lowest,
  highest,
  highlighted,
  selected,
  style,
  onSelectionChanged,
}: {
  lowest: number;
  highest: number;
  selected?: number | null;
  highlighted?: number[];
  style?: Style;
  onSelectionChanged: (selectedPitch: number | null) => void;
}) {
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
  if (highlighted) {
    for (const pitch of highlighted) {
      const i = pitch - low;
      if (0 <= i && i < highlight.length) {
        highlight[i] = true;
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
      x += 20;
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
          <path d="M0 1h440v95H0z" />
        </clipPath>
        <linearGradient id="whiteHover" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={style.selectedFill} />
          <stop offset="100%" stopColor={style.whiteFill} />
        </linearGradient>
        <linearGradient id="whiteSelHover" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={style.whiteFill} />
          <stop offset="100%" stopColor={style.selectedFill} />
        </linearGradient>
        <linearGradient id="blackHover" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={style.selectedFill} />
          <stop offset="100%" stopColor={style.blackFill} />
        </linearGradient>
        <linearGradient id="blackSelHover" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={style.blackFill} />
          <stop offset="100%" stopColor={style.selectedFill} />
        </linearGradient>
        <linearGradient id="highSelHover" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={style.selectedFill} />
          <stop offset="100%" stopColor={style.highlightedFill} />
        </linearGradient>
      </defs>
      <g id="white-keys">{whiteKeys}</g>
      <g id="black-keys">{blackKeys}</g>
      <path d={"M0.5 1h" + x} style={style} />
    </svg>
  );
}

interface keyShape {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  ry: number;
}

const whiteShape: keyShape = {
  width: 20,
  height: 100,
  x: 0,
  y: -10,
  rx: 5,
  ry: 5,
};

const blackShape: keyShape = {
  width: 14,
  height: 70,
  x: -7,
  y: -10,
  rx: 3,
  ry: 3,
};

interface keyColorProfile {
  baseColor: string;
  baseHoverColor: string;
  selColor: string;
  selHoverColor: string;
  highColor: string;
  highHoverColor: string;
}

function whiteColorProfile(style: Style): keyColorProfile {
  return {
    baseColor: style.whiteFill || "#fff",
    baseHoverColor: "url(#whiteHover)",
    selColor: style.selectedFill || "#47a",
    selHoverColor: "url(#whiteSelHover)",
    highColor: style.highlightedFill || "#8bf",
    highHoverColor: "url(#highSelHover)",
  };
}

function blackColorProfile(style: Style): keyColorProfile {
  return {
    baseColor: style.blackFill || "#000",
    baseHoverColor: "url(#blackHover)",
    selColor: style.selectedFill || "#47a",
    selHoverColor: "url(#blackSelHover)",
    highColor: style.highlightedFill || "#8bf",
    highHoverColor: "url(#highSelHover)",
  };
}

export function Key({
  x,
  shape,
  style,
  colorProfile,
  highlighted,
  selected,
  onSelect,
}: {
  x: number;
  shape: keyShape;
  style: Style;
  colorProfile: keyColorProfile;
  highlighted: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const s = structuredClone(style);
  s.fill = computeColor(colorProfile, selected, highlighted, mouseOver);

  return (
    <rect
      width={shape.width}
      height={shape.height}
      x={shape.x + x}
      y={shape.y}
      rx={shape.rx}
      ry={shape.ry}
      clipPath="url(#canvas)"
      onClick={onSelect}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={s}
    />
  );
}

function computeColor(
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
