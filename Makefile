wasm:
	GOOS=js GOARCH=wasm go build -o react-app/public/gohar.wasm ./gohar-wasm
	cp `go env GOROOT`/lib/wasm/wasm_exec.js react-app/src/