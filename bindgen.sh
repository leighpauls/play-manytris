#!/bin/sh

wasm-bindgen \
    --out-dir . \
    --out-name game \
    --target no-modules \
    --no-typescript \
    ~/src/manytris/target/wasm32-unknown-unknown/debug/manytris.wasm
