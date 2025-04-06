import { useState } from "react";
import {
  adjustAmbitus,
  blackColorProfile,
  blackShape,
  computeColor,
  defaultStyle,
  isWhiteKey,
  keyColorProfile,
  keyShape,
  Style,
  whiteColorProfile,
  whiteShape,
} from "./common";
import { BaseSvgDefs } from "./BaseSvgDefs";

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
        <BaseSvgDefs style={style} />
      </defs>
      <g id="white-keys">{whiteKeys}</g>
      <g id="black-keys">{blackKeys}</g>
      <path d={"M0.5 1h" + x} style={style} />
    </svg>
  );
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
