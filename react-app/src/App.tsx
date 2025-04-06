import { useState, useContext } from "react";
import { Gohar, GoharContext } from "./gohar/index.tsx";
import { GoharLoader } from "./gohar/Loader.tsx";
import "./App.css";
import { SingleNoteKeyboardSelector } from "./piano/SingleNote.tsx";
import { ScalePatternSelector } from "./scale/PatternSelector.tsx";

export default function App() {
  return (
    <GoharLoader>
      <ScaleExplorer />
    </GoharLoader>
  );
}

export function ScaleExplorer() {
  const [currentPattern, setPattern] = useState<number>(0b101010110101);
  const [currentPitch, setPitch] = useState<number | null>(null);

  const gohar = useContext<Gohar>(GoharContext);
  gohar.setLocale("fr");

  let highlighted: number[] = [];
  if (currentPitch != null && currentPattern) {
    highlighted = gohar
      .scalePatternPitches(currentPattern)
      .map((pitch) => pitch + currentPitch);
  }
  return (
    <>
      <ScalePatternSelector
        selected={currentPattern}
        onSelectionChanged={setPattern}
      />
      <SingleNoteKeyboardSelector
        lowest={-11}
        highest={24}
        highlighted={highlighted}
        selected={currentPitch}
        onSelectionChanged={setPitch}
      />
    </>
  );
}
