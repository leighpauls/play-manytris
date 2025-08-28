/* tslint:disable */
/* eslint-disable */

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly main: (a: number, b: number) => number;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_1: WebAssembly.Table;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_6: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h33074d78573b8cea: (a: number, b: number) => void;
  readonly closure3063_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure3057_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure3059_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure3061_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure4864_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure4866_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure4870_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure4868_externref_shim: (a: number, b: number, c: any) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0f90e54e3d652b01: (a: number, b: number) => void;
  readonly closure4860_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure4862_externref_shim: (a: number, b: number, c: any) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hcb55d1e9118615d5: (a: number, b: number, c: number) => void;
  readonly closure4858_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure4874_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4f2dd92d5ea48018: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb782c4508dc6ae58: (a: number, b: number) => void;
  readonly closure64539_externref_shim: (a: number, b: number, c: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
