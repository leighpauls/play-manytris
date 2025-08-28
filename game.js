import * as wasm from "./game_bg.wasm";
export * from "./game_bg.js";
import { __wbg_set_wasm } from "./game_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
