import { useState, useContext, FormEvent } from "react";
import { Gohar, GoharContext } from "./gohar/gohar.tsx";
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
  const [locale, setLocale] = useState<string>("en");
  const [octaves, setOctaves] = useState<number>(2);

  const gohar = useContext<Gohar>(GoharContext);
  if (gohar.isLoaded) {
    gohar.setLocale(locale);
  }

  let highlightedNotes: number[] = [];
  if (currentPitch != null && currentPattern) {
    highlightedNotes = gohar.scaleNotesFromPitch(currentPitch, currentPattern);
  }
  return (
    <>
      <KeyboardRangeSelector onSelectionChanged={setOctaves} />
      <LocaleSelector selected={locale} onSelectionChanged={setLocale} />
      <ScalePatternSelector
        selected={currentPattern}
        onSelectionChanged={setPattern}
      />
      <SingleNoteKeyboardSelector
        octaves={octaves}
        highlightedNotes={highlightedNotes}
        selectedPitch={currentPitch}
        onSelectionChanged={setPitch}
      />
    </>
  );
}

function KeyboardRangeSelector({
  onSelectionChanged,
}: {
  onSelectionChanged: (octaves: number) => void;
}) {
  return (
    <p>
      Octaves:
      <input
        id="keyboardRangeSelector"
        type="number"
        step={1}
        min={2}
        max={8}
        defaultValue={2}
        onInput={(e) => onSelectionChanged(parseInt(e.currentTarget.value))}
      />
    </p>
  );
}

function LocaleSelector({
  selected,
  onSelectionChanged,
}: {
  selected: string;
  onSelectionChanged: (locale: string) => void;
}) {
  function changeHandler(e: FormEvent<HTMLSelectElement>) {
    onSelectionChanged(e.currentTarget.value);
  }

  return (
    <select id="localeSelector" value={selected} onChange={changeHandler}>
      <option key="en" value="en">
        English
      </option>
      <option key="fr" value="fr">
        Français
      </option>
    </select>
  );
}
