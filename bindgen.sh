#!/bin/sh

wasm-bindgen --out-dir . --out-name game --target web ~/src/manytris/target/wasm32-unknown-unknown/debug/manytris.wasm
