import { FormEvent, useContext } from "react";
import { GoharContext } from "../gohar";

export function ScalePatternSelector({
  selected,
  onSelectionChanged,
}: {
  selected: number;
  onSelectionChanged: (pattern: number) => void;
}) {
  const gohar = useContext(GoharContext);

  function changeHandler(e: FormEvent<HTMLSelectElement>) {
    const pattern = parseInt(e.currentTarget.value);
    console.log(pattern);
    onSelectionChanged(pattern);
  }

  const options = gohar.scalePatterns.map((pattern: number) => {
    const value = pattern.toString();
    return (
      <option key={value} value={value}>
        {capitalize(gohar.scalePatternName(pattern))}
      </option>
    );
  });

  return (
    <select value={selected.toString()} onChange={changeHandler}>
      {options}
    </select>
  );
}

function capitalize(val: string): string {
  return val.charAt(0).toUpperCase() + val.slice(1);
}
