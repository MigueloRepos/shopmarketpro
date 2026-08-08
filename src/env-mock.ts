// Mock module to satisfy unwasm's static resolution of "env" imports during building
export const memory =
  typeof WebAssembly !== "undefined" ? new WebAssembly.Memory({ initial: 256 }) : null;
export const table =
  typeof WebAssembly !== "undefined"
    ? new WebAssembly.Table({ initial: 0, element: "anyfunc" })
    : null;
