import { Style } from "./common";

export function BaseSvgDefs({ style }: { style: Style }) {
  return (
    <>
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
    </>
  );
}
