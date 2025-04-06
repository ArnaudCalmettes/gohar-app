//go:build js && wasm

package main

import (
	"fmt"
	"syscall/js"

	"github.com/ArnaudCalmettes/gohar"
	"github.com/ArnaudCalmettes/gohar/lib/js/convert"
)

func main() {
	done := make(chan struct{})
	js.Global().Set("gohar", js.ValueOf(map[string]any{
		"isLoaded":               js.ValueOf(true),
		"setLocale":              js.FuncOf(setLocale),
		"sprintNote":             js.FuncOf(sprintNote),
		"sprintScaleName":        js.FuncOf(sprintScaleName),
		"sprintScalePatternName": js.FuncOf(sprintScalePatternName),
		"scalePatternPitches":    js.FuncOf(scalePatternPitches),
		"scalePatterns": js.ValueOf([]any{
			int(gohar.ScalePatternMajor),
			int(gohar.ScalePatternMelodicMinor),
			int(gohar.ScalePatternHarmonicMinor),
			int(gohar.ScalePatternHarmonicMajor),
			int(gohar.ScalePatternDoubleHarmonicMajor),
		}),
	}))
	<-done
}

func setLocale(_ js.Value, args []js.Value) any {
	if len(args) != 1 {
		panic(fmt.Errorf("setLocale: expected 1 arg, got %d", len(args)))
	}
	switch args[0].String() {
	case "fr":
		gohar.CurrentLocale = &gohar.LocaleFrench
	case "en":
		gohar.CurrentLocale = &gohar.LocaleEnglish
	}
	return js.Null()
}

func sprintNote(_ js.Value, args []js.Value) any {
	if len(args) != 1 {
		panic(fmt.Errorf("sprintNote: expected 1 arg, got %d", len(args)))
	}
	note := convert.NoteFromJS(args[0])
	result, err := gohar.SprintNote(note)
	if err != nil {
		panic(fmt.Errorf("sprintNote: %w", err))
	}
	return js.ValueOf(result)
}

func sprintScaleName(_ js.Value, args []js.Value) any {
	if len(args) != 2 {
		panic(fmt.Errorf("sprintScaleName: expected 2 args, got %d", len(args)))
	}
	note := convert.NoteFromJS(args[0])
	pattern := convert.ScalePatternFromJS(args[1])
	result, err := gohar.SprintScale(gohar.Scale{Root: note, Pattern: pattern})
	if err != nil {
		panic(fmt.Errorf("sprintScaleName: %w", err))
	}
	return js.ValueOf(result)
}

func sprintScalePatternName(_ js.Value, args []js.Value) any {
	if len(args) != 1 {
		panic(fmt.Errorf("sprintScalePatternName: expected 1 arg, got %d", len(args)))
	}
	pattern := convert.ScalePatternFromJS(args[0])
	result, err := gohar.SprintScalePatternName(pattern)
	if err != nil {
		panic(fmt.Errorf("sprintScalePatternName: %w", err))
	}
	return js.ValueOf(result)
}

func scalePatternPitches(_ js.Value, args []js.Value) any {
	if len(args) != 1 {
		panic(fmt.Errorf("scalePatternPitches: expected 1 arg, got %d", len(args)))
	}
	pattern := convert.ScalePatternFromJS(args[0])
	pitches, err := pattern.AsPitchSliceInto(make([]gohar.Pitch, 0, 12))
	if err != nil {
		panic(fmt.Errorf("scalePatternPitches: %w", err))
	}
	return convert.PitchSliceToJS(pitches)
}
