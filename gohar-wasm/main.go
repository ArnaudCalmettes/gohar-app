//go:build js && wasm

package main

import "github.com/ArnaudCalmettes/gohar/wasm"

func main() {
	done := make(chan struct{})
	wasm.ExportJSFuncs()
	<-done
}
