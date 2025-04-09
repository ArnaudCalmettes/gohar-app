//go:build js && wasm

package main

import "github.com/ArnaudCalmettes/gohar/lib/js"

func main() {
	done := make(chan struct{})
	js.ImportGoharBindings()
	<-done
}
