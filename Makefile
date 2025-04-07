wasm:
	GOOS=js GOARCH=wasm go build -o react-app/public/gohar.wasm ./gohar-wasm
	cp `go env GOROOT`/lib/wasm/wasm_exec.js react-app/src/

wasm-tinygo:
	GOOS=js GOARCH=wasm tinygo build -o react-app/public/gohar.wasm ./gohar-wasm
	cp `tinygo env TINYGOROOT`/targets/wasm_exec.js react-app/src/
