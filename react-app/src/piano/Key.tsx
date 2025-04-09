import { useState } from "react";
import { keyShape, Style, keyColorProfile, computeColor } from "./common";

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
