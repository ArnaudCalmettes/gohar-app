import { useState } from "react";
import { Style } from "./Style";

export function Key({
  x,
  name,
  shape,
  style,
  colorProfile,
  highlighted,
  selected,
  onSelect,
}: {
  x: number;
  name: string;
  shape: KeyShape;
  style: Style;
  colorProfile: KeyColorProfile;
  highlighted: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const baseStyle = {
    fill: computeBaseColor(colorProfile, selected, highlighted),
    stroke: style.stroke,
    strokeWidth: style.strokeWidth,
  };
  const overlayStyle = structuredClone(baseStyle);
  overlayStyle.fill = computeOverlayColor(
    colorProfile,
    style,
    selected,
    mouseOver
  );

  return (
    <g
      onClick={onSelect}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <rect
        width={shape.width}
        height={shape.height}
        x={shape.x + x}
        y={shape.y}
        rx={shape.rx}
        ry={shape.ry}
        clipPath="url(#canvas)"
        style={baseStyle}
      />
      <text
        x={shape.x + x + (shape.width - 2) / 2 + 1}
        y={shape.y + shape.height - 3}
        fill="black"
        fontSize="6"
        textAnchor="middle"
      >
        {selected || highlighted ? name : ""}
      </text>
      <rect
        width={shape.width}
        height={shape.height}
        x={shape.x + x}
        y={shape.y}
        rx={shape.rx}
        ry={shape.ry}
        clipPath="url(#canvas)"
        style={overlayStyle}
      />
    </g>
  );
}

export interface KeyShape {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  ry: number;
}

export interface KeyColorProfile {
  baseColor: string;
  selColor: string;
  highColor: string;
}

function computeBaseColor(
  colors: KeyColorProfile,
  selected: boolean,
  high: boolean
): string {
  if (selected) {
    return colors.selColor;
  }
  if (high) {
    return colors.highColor;
  }
  return colors.baseColor;
}

function computeOverlayColor(
  colors: KeyColorProfile,
  style: Style,
  selected: boolean,
  mouseOver: boolean
): string {
  if (!mouseOver) {
    return "none";
  }
  if (!selected) {
    return "url(#Hover)";
  }
  return colors.baseColor == style.whiteFill
    ? "url(#whiteHoverback)"
    : "url(#blackHoverback)";
}
