import { ReactNode, useState, useEffect } from "react";
import { Gohar, defaultGoharCtx, GoharContext } from ".";
import "../wasm_exec.js";

export function GoharLoader({ children }: { children: ReactNode }) {
  const [goharCtx, setGoharCtx] = useState<Gohar>(defaultGoharCtx);
  useEffect(() => {
    async function loadWasm(): Promise<void> {
      const goWasm = new globalThis.Go();
      const result = await WebAssembly.instantiateStreaming(
        fetch("gohar.wasm"),
        goWasm.importObject
      );
      goWasm.run(result.instance);
      setGoharCtx(globalThis.gohar);
    }
    loadWasm();
  }, []);

  if (!goharCtx.isLoaded) {
    <p>Loading...</p>;
  }
  return <GoharContext value={goharCtx}>{children}</GoharContext>;
}
