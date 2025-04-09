import { useState, useContext, FormEvent } from "react";
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
  const [locale, setLocale] = useState<string>("en");

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
      <LocaleSelector selected={locale} onSelectionChanged={setLocale} />
      <ScalePatternSelector
        selected={currentPattern}
        onSelectionChanged={setPattern}
      />
      <SingleNoteKeyboardSelector
        lowest={-12}
        highest={12}
        highlightedNotes={highlightedNotes}
        selectedPitch={currentPitch}
        onSelectionChanged={setPitch}
      />
    </>
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
