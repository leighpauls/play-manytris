const lAudioContext = (typeof AudioContext !== 'undefined' ? AudioContext : (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : undefined));
let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


function isLikeNone(x) {
    return x === undefined || x === null;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_1.set(idx, obj);
    return idx;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedInt32ArrayMemory0 = null;

function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedUint8ClampedArrayMemory0 = null;

function getUint8ClampedArrayMemory0() {
    if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.byteLength === 0) {
        cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachedUint8ClampedArrayMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_6.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_6.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
function __wbg_adapter_36(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h33074d78573b8cea(arg0, arg1);
}

function __wbg_adapter_39(arg0, arg1, arg2) {
    wasm.closure3063_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_42(arg0, arg1, arg2) {
    wasm.closure3057_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_45(arg0, arg1, arg2) {
    wasm.closure3059_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_48(arg0, arg1, arg2) {
    wasm.closure3061_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_51(arg0, arg1, arg2) {
    wasm.closure4864_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_54(arg0, arg1, arg2) {
    wasm.closure4866_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_57(arg0, arg1, arg2) {
    wasm.closure4870_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_60(arg0, arg1, arg2) {
    wasm.closure4868_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_63(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0f90e54e3d652b01(arg0, arg1);
}

function __wbg_adapter_66(arg0, arg1, arg2) {
    wasm.closure4860_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_69(arg0, arg1, arg2) {
    wasm.closure4862_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_72(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hcb55d1e9118615d5(arg0, arg1, isLikeNone(arg2) ? 0 : addToExternrefTable0(arg2));
}

function __wbg_adapter_75(arg0, arg1, arg2) {
    wasm.closure4858_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_78(arg0, arg1, arg2, arg3) {
    wasm.closure4874_externref_shim(arg0, arg1, arg2, arg3);
}

function __wbg_adapter_81(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4f2dd92d5ea48018(arg0, arg1);
}

function __wbg_adapter_84(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb782c4508dc6ae58(arg0, arg1);
}

function __wbg_adapter_87(arg0, arg1, arg2) {
    wasm.closure64539_externref_shim(arg0, arg1, arg2);
}

const __wbindgen_enum_BinaryType = ["blob", "arraybuffer"];

const __wbindgen_enum_GamepadMappingType = ["", "standard"];

const __wbindgen_enum_PremultiplyAlpha = ["none", "premultiply", "default"];

const __wbindgen_enum_RequestCache = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];

const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];

const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];

const __wbindgen_enum_ResizeObserverBoxOptions = ["border-box", "content-box", "device-pixel-content-box"];

const __wbindgen_enum_VisibilityState = ["hidden", "visible"];

export function __wbg_Window_02fa58b243352adf(arg0) {
    const ret = arg0.Window;
    return ret;
};

export function __wbg_Window_4c2c8fac559ab522(arg0) {
    const ret = arg0.Window;
    return ret;
};

export function __wbg_WorkerGlobalScope_7b9805991ec727df(arg0) {
    const ret = arg0.WorkerGlobalScope;
    return ret;
};

export function __wbg_abort_8d4ada33948fb9ea(arg0) {
    arg0.abort();
};

export function __wbg_abort_fa31d30f1b02fda9(arg0, arg1) {
    arg0.abort(arg1);
};

export function __wbg_activeElement_becfda7322e50ce5(arg0) {
    const ret = arg0.activeElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_activeTexture_5aa73095f462bec4(arg0, arg1) {
    arg0.activeTexture(arg1 >>> 0);
};

export function __wbg_activeTexture_b5a778fe84c7b1b9(arg0, arg1) {
    arg0.activeTexture(arg1 >>> 0);
};

export function __wbg_addEventListener_ad9617755da8fbe8() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_addListener_001fcd193cbd1c5b() { return handleError(function (arg0, arg1) {
    arg0.addListener(arg1);
}, arguments) };

export function __wbg_altKey_d2ad93ef54deb903(arg0) {
    const ret = arg0.altKey;
    return ret;
};

export function __wbg_altKey_f67310930ad89813(arg0) {
    const ret = arg0.altKey;
    return ret;
};

export function __wbg_animate_84e5cf117f6f9cc6(arg0, arg1, arg2) {
    const ret = arg0.animate(arg1, arg2);
    return ret;
};

export function __wbg_appendChild_daddabaedb4a1728() { return handleError(function (arg0, arg1) {
    const ret = arg0.appendChild(arg1);
    return ret;
}, arguments) };

export function __wbg_append_7d0ec8d7eeb807f8() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_arrayBuffer_244b9be4ec34cae8() { return handleError(function (arg0) {
    const ret = arg0.arrayBuffer();
    return ret;
}, arguments) };

export function __wbg_attachShader_181ea1bf44405a98(arg0, arg1, arg2) {
    arg0.attachShader(arg1, arg2);
};

export function __wbg_attachShader_baf52fda9659f1a5(arg0, arg1, arg2) {
    arg0.attachShader(arg1, arg2);
};

export function __wbg_axes_80e72f9eff9953ab(arg0) {
    const ret = arg0.axes;
    return ret;
};

export function __wbg_beginQuery_231e25ffaf8fe6d1(arg0, arg1, arg2) {
    arg0.beginQuery(arg1 >>> 0, arg2);
};

export function __wbg_bindAttribLocation_06d73644e579da90(arg0, arg1, arg2, arg3, arg4) {
    arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export function __wbg_bindAttribLocation_3403ed3dd924bdb3(arg0, arg1, arg2, arg3, arg4) {
    arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export function __wbg_bindBufferRange_ef74dd50a5dd0bf9(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.bindBufferRange(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_bindBuffer_6912ac7e00682088(arg0, arg1, arg2) {
    arg0.bindBuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindBuffer_8b96d9574f64c6c2(arg0, arg1, arg2) {
    arg0.bindBuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindFramebuffer_6eeb273edc40e835(arg0, arg1, arg2) {
    arg0.bindFramebuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindFramebuffer_7ceda1018d1afe39(arg0, arg1, arg2) {
    arg0.bindFramebuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindRenderbuffer_2cdf9077ff6d00b7(arg0, arg1, arg2) {
    arg0.bindRenderbuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindRenderbuffer_53cf5cf1652b3c96(arg0, arg1, arg2) {
    arg0.bindRenderbuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindSampler_6d29dc6a793191f8(arg0, arg1, arg2) {
    arg0.bindSampler(arg1 >>> 0, arg2);
};

export function __wbg_bindTexture_9bc4eff1f2399bdd(arg0, arg1, arg2) {
    arg0.bindTexture(arg1 >>> 0, arg2);
};

export function __wbg_bindTexture_c468b95701f98c38(arg0, arg1, arg2) {
    arg0.bindTexture(arg1 >>> 0, arg2);
};

export function __wbg_bindVertexArrayOES_e740c9f040ab8630(arg0, arg1) {
    arg0.bindVertexArrayOES(arg1);
};

export function __wbg_bindVertexArray_d4891a2b16261245(arg0, arg1) {
    arg0.bindVertexArray(arg1);
};

export function __wbg_blendColor_077904b56e13eea7(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendColor(arg1, arg2, arg3, arg4);
};

export function __wbg_blendColor_0ea439628e227c60(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendColor(arg1, arg2, arg3, arg4);
};

export function __wbg_blendEquationSeparate_a9e2531bc60fd51f(arg0, arg1, arg2) {
    arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendEquationSeparate_bc26e2412a579764(arg0, arg1, arg2) {
    arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendEquation_15e5475d20dd6ae6(arg0, arg1) {
    arg0.blendEquation(arg1 >>> 0);
};

export function __wbg_blendEquation_4f1760973892b54b(arg0, arg1) {
    arg0.blendEquation(arg1 >>> 0);
};

export function __wbg_blendFuncSeparate_528025e9f31aa073(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_blendFuncSeparate_66c9f437fdca76e0(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_blendFunc_2a173cb371ceefe5(arg0, arg1, arg2) {
    arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFunc_be28df4c28d82df5(arg0, arg1, arg2) {
    arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blitFramebuffer_b5f2d72bbabd0a33(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
};

export function __wbg_blockSize_b7d269019589a677(arg0) {
    const ret = arg0.blockSize;
    return ret;
};

export function __wbg_body_39801f8e28a17e0d(arg0) {
    const ret = arg0.body;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_brand_40436d69045d92d1(arg0, arg1) {
    const ret = arg1.brand;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_brands_9a126c172d9c5ada(arg0) {
    const ret = arg0.brands;
    return ret;
};

export function __wbg_bufferData_2d4184f5911dca6a(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_5a3562b28a310859(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_71b1b552b57168e8(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_afe3510c5bd76329(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferSubData_21b164137b407c59(arg0, arg1, arg2, arg3) {
    arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_bufferSubData_ae7bcb1386342db3(arg0, arg1, arg2, arg3) {
    arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_buffer_609cc3eee51ed158(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_button_e8c44aa42b50bef9(arg0) {
    const ret = arg0.button;
    return ret;
};

export function __wbg_buttons_ba4b154198a468d9(arg0) {
    const ret = arg0.buttons;
    return ret;
};

export function __wbg_buttons_fae5ac2abe849a92(arg0) {
    const ret = arg0.buttons;
    return ret;
};

export function __wbg_call_672a4d21634d4a24() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

export function __wbg_call_7cccdd69e0791ae2() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_cancelAnimationFrame_92a9c4fac2c844b9() { return handleError(function (arg0, arg1) {
    arg0.cancelAnimationFrame(arg1);
}, arguments) };

export function __wbg_cancelIdleCallback_5337fdeae1123734(arg0, arg1) {
    arg0.cancelIdleCallback(arg1 >>> 0);
};

export function __wbg_cancel_4dbed12d0bf46179(arg0) {
    arg0.cancel();
};

export function __wbg_catch_a6e601879b2610e9(arg0, arg1) {
    const ret = arg0.catch(arg1);
    return ret;
};

export function __wbg_clearBufferfv_964242e554ef6b18(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_clearBufferiv_33971fdb95b237a8(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
};

export function __wbg_clearBufferuiv_44a03b24d7385381(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferuiv(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
};

export function __wbg_clearDepth_20fb5b7fa4fa65a3(arg0, arg1) {
    arg0.clearDepth(arg1);
};

export function __wbg_clearDepth_b245300e03254af6(arg0, arg1) {
    arg0.clearDepth(arg1);
};

export function __wbg_clearStencil_497912d0ca4bd728(arg0, arg1) {
    arg0.clearStencil(arg1);
};

export function __wbg_clearStencil_95b91d4022674197(arg0, arg1) {
    arg0.clearStencil(arg1);
};

export function __wbg_clearTimeout_1416cd1dd273f0a3(arg0, arg1) {
    arg0.clearTimeout(arg1);
};

export function __wbg_clearTimeout_6222fede17abcb1a(arg0) {
    const ret = clearTimeout(arg0);
    return ret;
};

export function __wbg_clear_88ca031f4c7e14a4(arg0, arg1) {
    arg0.clear(arg1 >>> 0);
};

export function __wbg_clear_b1a1e2f0a5642d32(arg0, arg1) {
    arg0.clear(arg1 >>> 0);
};

export function __wbg_clientWaitSync_bdb87f4dcff8c437(arg0, arg1, arg2, arg3) {
    const ret = arg0.clientWaitSync(arg1, arg2 >>> 0, arg3 >>> 0);
    return ret;
};

export function __wbg_close_2a46c0eeaf705b24() { return handleError(function (arg0) {
    const ret = arg0.close();
    return ret;
}, arguments) };

export function __wbg_close_646588aea32817fc() { return handleError(function (arg0) {
    arg0.close();
}, arguments) };

export function __wbg_close_7e2e3fa784b27273(arg0) {
    arg0.close();
};

export function __wbg_code_a944eeadf57f0247(arg0, arg1) {
    const ret = arg1.code;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_colorMask_a8ffe684f989e72b(arg0, arg1, arg2, arg3, arg4) {
    arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_colorMask_ca265abda7a73817(arg0, arg1, arg2, arg3, arg4) {
    arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_compileShader_12d8715581b93b10(arg0, arg1) {
    arg0.compileShader(arg1);
};

export function __wbg_compileShader_62bc4c13ce17e252(arg0, arg1) {
    arg0.compileShader(arg1);
};

export function __wbg_compressedTexSubImage2D_49b79788eb4096ca(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
};

export function __wbg_compressedTexSubImage2D_539f1c2cd10921b1(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
};

export function __wbg_compressedTexSubImage2D_5c16a9e773440f2f(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
};

export function __wbg_compressedTexSubImage3D_bb5d2ca82e1ca9a9(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
};

export function __wbg_compressedTexSubImage3D_bdd52f6f96743ba2(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10);
};

export function __wbg_connect_270c7a3d1dbda60e() { return handleError(function (arg0, arg1) {
    const ret = arg0.connect(arg1);
    return ret;
}, arguments) };

export function __wbg_connected_bd90674a1adf52d6(arg0) {
    const ret = arg0.connected;
    return ret;
};

export function __wbg_contains_22fdbc10524057b2(arg0, arg1) {
    const ret = arg0.contains(arg1);
    return ret;
};

export function __wbg_contentRect_54bb36d71d23433b(arg0) {
    const ret = arg0.contentRect;
    return ret;
};

export function __wbg_copyBufferSubData_014de241942d5955(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_copyTexSubImage2D_5684e6b6204ea845(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
};

export function __wbg_copyTexSubImage2D_f4b78275240f57e4(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
};

export function __wbg_copyTexSubImage3D_a933623a8694261a(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.copyTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
};

export function __wbg_copyToChannel_bc42153b17f3eb74() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.copyToChannel(getArrayF32FromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_createBufferSource_26276291f6ed3a2f() { return handleError(function (arg0) {
    const ret = arg0.createBufferSource();
    return ret;
}, arguments) };

export function __wbg_createBuffer_82ce184f87e04e6d(arg0) {
    const ret = arg0.createBuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createBuffer_a0b9a15b57328706() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.createBuffer(arg1 >>> 0, arg2 >>> 0, arg3);
    return ret;
}, arguments) };

export function __wbg_createBuffer_f1d4892ba11ff953(arg0) {
    const ret = arg0.createBuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createElement_51ffea4765cb1cc5() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments) };

export function __wbg_createFramebuffer_7b520e3b0982bef5(arg0) {
    const ret = arg0.createFramebuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createFramebuffer_a06c1d434e8dd65b(arg0) {
    const ret = arg0.createFramebuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createImageBitmap_03ce0f17b2abd107() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.createImageBitmap(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_createObjectURL_e7c66c573508d0c2() { return handleError(function (arg0, arg1) {
    const ret = URL.createObjectURL(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_createProgram_3de4a971625b8c80(arg0) {
    const ret = arg0.createProgram();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createProgram_dbfff5482d357c9f(arg0) {
    const ret = arg0.createProgram();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createQuery_064dd6318758e021(arg0) {
    const ret = arg0.createQuery();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createRenderbuffer_add28e8618a4e08d(arg0) {
    const ret = arg0.createRenderbuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createRenderbuffer_e9e04845c0be5a99(arg0) {
    const ret = arg0.createRenderbuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createSampler_a3539f44dc551317(arg0) {
    const ret = arg0.createSampler();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createShader_0ddd59315e296aca(arg0, arg1) {
    const ret = arg0.createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createShader_4d7ee41ff6054009(arg0, arg1) {
    const ret = arg0.createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createTexture_5efe57f24849d21c(arg0) {
    const ret = arg0.createTexture();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createTexture_aefc75d3a5c9dae7(arg0) {
    const ret = arg0.createTexture();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createVertexArrayOES_fcc062d13651dbaa(arg0) {
    const ret = arg0.createVertexArrayOES();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createVertexArray_ed244a71e68ea2fb(arg0) {
    const ret = arg0.createVertexArray();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_crypto_ed58b8e10a292839(arg0) {
    const ret = arg0.crypto;
    return ret;
};

export function __wbg_ctrlKey_b18a47cac80f5ed7(arg0) {
    const ret = arg0.ctrlKey;
    return ret;
};

export function __wbg_ctrlKey_c4da49dff331d249(arg0) {
    const ret = arg0.ctrlKey;
    return ret;
};

export function __wbg_cullFace_24fe030b0ea86278(arg0, arg1) {
    arg0.cullFace(arg1 >>> 0);
};

export function __wbg_cullFace_3b66eaf3e7bf1abd(arg0, arg1) {
    arg0.cullFace(arg1 >>> 0);
};

export function __wbg_currentTime_8e1cd82c8336ade9(arg0) {
    const ret = arg0.currentTime;
    return ret;
};

export function __wbg_data_2882c202e16286bf(arg0) {
    const ret = arg0.data;
    return ret;
};

export function __wbg_decode_4ee450fc2bdcbf49(arg0) {
    const ret = arg0.decode();
    return ret;
};

export function __wbg_deleteBuffer_24f07b4df816a9e5(arg0, arg1) {
    arg0.deleteBuffer(arg1);
};

export function __wbg_deleteBuffer_47ca67f56fb633db(arg0, arg1) {
    arg0.deleteBuffer(arg1);
};

export function __wbg_deleteFramebuffer_09543918a4832da5(arg0, arg1) {
    arg0.deleteFramebuffer(arg1);
};

export function __wbg_deleteFramebuffer_69c8a2eb67e42779(arg0, arg1) {
    arg0.deleteFramebuffer(arg1);
};

export function __wbg_deleteProgram_9bac693cdf2b4a09(arg0, arg1) {
    arg0.deleteProgram(arg1);
};

export function __wbg_deleteProgram_a32f66b87c1d3fc3(arg0, arg1) {
    arg0.deleteProgram(arg1);
};

export function __wbg_deleteQuery_128396bd681ca134(arg0, arg1) {
    arg0.deleteQuery(arg1);
};

export function __wbg_deleteRenderbuffer_762e9f0185130229(arg0, arg1) {
    arg0.deleteRenderbuffer(arg1);
};

export function __wbg_deleteRenderbuffer_c84044686177f50d(arg0, arg1) {
    arg0.deleteRenderbuffer(arg1);
};

export function __wbg_deleteSampler_e99808b3ae1a09a3(arg0, arg1) {
    arg0.deleteSampler(arg1);
};

export function __wbg_deleteShader_aecb3015782be6bf(arg0, arg1) {
    arg0.deleteShader(arg1);
};

export function __wbg_deleteShader_fcd487a13ced9034(arg0, arg1) {
    arg0.deleteShader(arg1);
};

export function __wbg_deleteSync_7ae8f7846f704f5f(arg0, arg1) {
    arg0.deleteSync(arg1);
};

export function __wbg_deleteTexture_06675b026250ee01(arg0, arg1) {
    arg0.deleteTexture(arg1);
};

export function __wbg_deleteTexture_c775a3cbc96b6f50(arg0, arg1) {
    arg0.deleteTexture(arg1);
};

export function __wbg_deleteVertexArrayOES_4c425364e66ff25f(arg0, arg1) {
    arg0.deleteVertexArrayOES(arg1);
};

export function __wbg_deleteVertexArray_65d0ab3d474cbb12(arg0, arg1) {
    arg0.deleteVertexArray(arg1);
};

export function __wbg_deltaMode_698d172df6c839e5(arg0) {
    const ret = arg0.deltaMode;
    return ret;
};

export function __wbg_deltaX_59d7039450ee61a1(arg0) {
    const ret = arg0.deltaX;
    return ret;
};

export function __wbg_deltaY_291c4603ac6dd206(arg0) {
    const ret = arg0.deltaY;
    return ret;
};

export function __wbg_depthFunc_c52a4d872d8d38c1(arg0, arg1) {
    arg0.depthFunc(arg1 >>> 0);
};

export function __wbg_depthFunc_d8dc9911a03e9716(arg0, arg1) {
    arg0.depthFunc(arg1 >>> 0);
};

export function __wbg_depthMask_68f370c2b567f98b(arg0, arg1) {
    arg0.depthMask(arg1 !== 0);
};

export function __wbg_depthMask_9ad5d01681e18803(arg0, arg1) {
    arg0.depthMask(arg1 !== 0);
};

export function __wbg_depthRange_30f703a1e2c93c8a(arg0, arg1, arg2) {
    arg0.depthRange(arg1, arg2);
};

export function __wbg_depthRange_3784425befd07b7f(arg0, arg1, arg2) {
    arg0.depthRange(arg1, arg2);
};

export function __wbg_destination_70b3e430ac0b143c(arg0) {
    const ret = arg0.destination;
    return ret;
};

export function __wbg_devicePixelContentBoxSize_1e5844ec1fb36f10(arg0) {
    const ret = arg0.devicePixelContentBoxSize;
    return ret;
};

export function __wbg_devicePixelRatio_5f923c8fc4d19c84(arg0) {
    const ret = arg0.devicePixelRatio;
    return ret;
};

export function __wbg_disableVertexAttribArray_98229514ecf341ba(arg0, arg1) {
    arg0.disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_disableVertexAttribArray_c8acb98d6c4e0f5c(arg0, arg1) {
    arg0.disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_disable_b1260f96493bc34d(arg0, arg1) {
    arg0.disable(arg1 >>> 0);
};

export function __wbg_disable_cbe78645765a9247(arg0, arg1) {
    arg0.disable(arg1 >>> 0);
};

export function __wbg_disconnect_0f45836d1393121c(arg0) {
    arg0.disconnect();
};

export function __wbg_disconnect_2e5b9bf6f22a99f1(arg0) {
    arg0.disconnect();
};

export function __wbg_document_7689f46a8f647c96(arg0) {
    const ret = arg0.document;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_done_769e5ede4b31c67b(arg0) {
    const ret = arg0.done;
    return ret;
};

export function __wbg_drawArraysInstancedANGLE_1d8c1ab13266b7b4(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawArraysInstancedANGLE(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_drawArraysInstanced_d6d94fd2f6eae7e2(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawArraysInstanced(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_drawArrays_281edba8ecaa52f9(arg0, arg1, arg2, arg3) {
    arg0.drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_drawArrays_cd8277d77fffe8b2(arg0, arg1, arg2, arg3) {
    arg0.drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_drawBuffersWEBGL_92efdc722ad0778d(arg0, arg1) {
    arg0.drawBuffersWEBGL(arg1);
};

export function __wbg_drawBuffers_140619e6806c5886(arg0, arg1) {
    arg0.drawBuffers(arg1);
};

export function __wbg_drawElementsInstancedANGLE_398dc3dc8939d5b9(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawElementsInstancedANGLE(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_drawElementsInstanced_d38f7e7f264a3bc4(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawElementsInstanced(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_enableVertexAttribArray_53dc5bb40ddae735(arg0, arg1) {
    arg0.enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_enableVertexAttribArray_e141eaa18ded8ecc(arg0, arg1) {
    arg0.enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_enable_e32036616112c6e7(arg0, arg1) {
    arg0.enable(arg1 >>> 0);
};

export function __wbg_enable_fe606ea53da6bc9b(arg0, arg1) {
    arg0.enable(arg1 >>> 0);
};

export function __wbg_endQuery_1cfa50eb258641fe(arg0, arg1) {
    arg0.endQuery(arg1 >>> 0);
};

export function __wbg_error_60fcc97857bb0a12(arg0) {
    const ret = arg0.error;
    return ret;
};

export function __wbg_error_7534b8e9a36f1ab4(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

export function __wbg_error_c9d56f7fe24be077(arg0, arg1) {
    console.error(arg0, arg1);
};

export function __wbg_eval_e10dc02e9547f640() { return handleError(function (arg0, arg1) {
    const ret = eval(getStringFromWasm0(arg0, arg1));
    return ret;
}, arguments) };

export function __wbg_exec_3e2d2d0644c927df(arg0, arg1, arg2) {
    const ret = arg0.exec(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_exitFullscreen_6fb4e4e975953b98(arg0) {
    arg0.exitFullscreen();
};

export function __wbg_exitPointerLock_38a5d462b01f5f75(arg0) {
    arg0.exitPointerLock();
};

export function __wbg_fenceSync_f2c2c828ff0b2c55(arg0, arg1, arg2) {
    const ret = arg0.fenceSync(arg1 >>> 0, arg2 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_fetch_7eed3b2d9daa14ca(arg0, arg1, arg2) {
    const ret = arg0.fetch(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_fetch_859e3c783ceecb84(arg0, arg1, arg2) {
    const ret = arg0.fetch(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_fetch_f156d10be9a5c88a(arg0) {
    const ret = fetch(arg0);
    return ret;
};

export function __wbg_fetch_f649bd7134840205(arg0, arg1) {
    const ret = arg0.fetch(arg1);
    return ret;
};

export function __wbg_focus_212dfd266121c08b() { return handleError(function (arg0) {
    arg0.focus();
}, arguments) };

export function __wbg_framebufferRenderbuffer_4ab802a7e1bae6dc(arg0, arg1, arg2, arg3, arg4) {
    arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
};

export function __wbg_framebufferRenderbuffer_bb3fc357dca214dc(arg0, arg1, arg2, arg3, arg4) {
    arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
};

export function __wbg_framebufferTexture2D_4e26ad36fe90a94a(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
};

export function __wbg_framebufferTexture2D_f809cc44f7088f3a(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
};

export function __wbg_framebufferTextureLayer_213b89730a192624(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTextureLayer(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_framebufferTextureMultiviewOVR_97e7468a148628f3(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.framebufferTextureMultiviewOVR(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5, arg6);
};

export function __wbg_frontFace_64a412cfe58720b0(arg0, arg1) {
    arg0.frontFace(arg1 >>> 0);
};

export function __wbg_frontFace_6b0868c7a7362e57(arg0, arg1) {
    arg0.frontFace(arg1 >>> 0);
};

export function __wbg_fullscreenElement_72f9c7bbc56823bf(arg0) {
    const ret = arg0.fullscreenElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getBoundingClientRect_ae014ea61e3f9c1c(arg0) {
    const ret = arg0.getBoundingClientRect();
    return ret;
};

export function __wbg_getBufferSubData_7009342773b796de(arg0, arg1, arg2, arg3) {
    arg0.getBufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_getCoalescedEvents_543f457e8a526a93(arg0) {
    const ret = arg0.getCoalescedEvents();
    return ret;
};

export function __wbg_getCoalescedEvents_6be9cfa851cc5363(arg0) {
    const ret = arg0.getCoalescedEvents;
    return ret;
};

export function __wbg_getComputedStyle_eeea06c7f9efb520() { return handleError(function (arg0, arg1) {
    const ret = arg0.getComputedStyle(arg1);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_294a7d64e282e1d2() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_bf3e22b911179c11() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_c5a42aaaf5c0c4e1() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getExtension_60482221d3101292() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getGamepads_8e93f6bf6c28f265() { return handleError(function (arg0) {
    const ret = arg0.getGamepads();
    return ret;
}, arguments) };

export function __wbg_getIndexedParameter_74ec9e3e9dd97fde() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getIndexedParameter(arg1 >>> 0, arg2 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getOwnPropertyDescriptor_9dd936a3c0cbd368(arg0, arg1) {
    const ret = Object.getOwnPropertyDescriptor(arg0, arg1);
    return ret;
};

export function __wbg_getParameter_58e1653f279d08bc() { return handleError(function (arg0, arg1) {
    const ret = arg0.getParameter(arg1 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getParameter_89088cdd66ea3410() { return handleError(function (arg0, arg1) {
    const ret = arg0.getParameter(arg1 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getProgramInfoLog_1b61b06aedbfd60f(arg0, arg1, arg2) {
    const ret = arg1.getProgramInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getProgramInfoLog_c318792349d10e6b(arg0, arg1, arg2) {
    const ret = arg1.getProgramInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getProgramParameter_3a31d2c97230156b(arg0, arg1, arg2) {
    const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getProgramParameter_cff34d6b5bc329c6(arg0, arg1, arg2) {
    const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getPropertyValue_58a0d8083acf6d25() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_getQueryParameter_11c2bdd0d8a21c1d(arg0, arg1, arg2) {
    const ret = arg0.getQueryParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getRandomValues_bcb4912f16000dc4() { return handleError(function (arg0, arg1) {
    arg0.getRandomValues(arg1);
}, arguments) };

export function __wbg_getShaderInfoLog_879a410806728897(arg0, arg1, arg2) {
    const ret = arg1.getShaderInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getShaderInfoLog_f5d03335d4dfdcb5(arg0, arg1, arg2) {
    const ret = arg1.getShaderInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getShaderParameter_a7b34d5ddb7b12e2(arg0, arg1, arg2) {
    const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getShaderParameter_d84b0d17b92da111(arg0, arg1, arg2) {
    const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getSupportedExtensions_62e62c1b9ca06abd(arg0) {
    const ret = arg0.getSupportedExtensions();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getSupportedProfiles_822ae222926130de(arg0) {
    const ret = arg0.getSupportedProfiles();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getSyncParameter_3d2014fdef479e5d(arg0, arg1, arg2) {
    const ret = arg0.getSyncParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getUniformBlockIndex_21363c211638b7b5(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformBlockIndex(arg1, getStringFromWasm0(arg2, arg3));
    return ret;
};

export function __wbg_getUniformLocation_27fb43894ee395d8(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getUniformLocation_cd0452a6b0a36c45(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_get_67b2ba62fc30de12() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments) };

export function __wbg_get_b9b93047fe3cf45b(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
};

export function __wbg_has_a5ea9117f258a0ec() { return handleError(function (arg0, arg1) {
    const ret = Reflect.has(arg0, arg1);
    return ret;
}, arguments) };

export function __wbg_headers_cc3fc3b432f8aabc(arg0) {
    const ret = arg0.headers;
    return ret;
};

export function __wbg_height_48788a8e48440edd(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_height_78f65bb08ba82673(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_height_984723ef832f73cd(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_height_cc619078e10727f7(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_height_e5c9272659763de8(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_height_eec15330891242f8(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_id_f67b95cad11f6005(arg0, arg1) {
    const ret = arg1.id;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_includes_937486a108ec147b(arg0, arg1, arg2) {
    const ret = arg0.includes(arg1, arg2);
    return ret;
};

export function __wbg_index_6b8bda0853e4db11(arg0) {
    const ret = arg0.index;
    return ret;
};

export function __wbg_inlineSize_6541a4f787fa5f77(arg0) {
    const ret = arg0.inlineSize;
    return ret;
};

export function __wbg_instanceof_ArrayBuffer_e14585432e3737fc(arg0) {
    let result;
    try {
        result = arg0 instanceof ArrayBuffer;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Blob_46058a55d5d0856a(arg0) {
    let result;
    try {
        result = arg0 instanceof Blob;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_DomException_7c3bcc74fd0a8783(arg0) {
    let result;
    try {
        result = arg0 instanceof DOMException;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_HtmlCanvasElement_2a28011dadb2990c(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLCanvasElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Response_d1b3f08d4983dc43(arg0) {
    let result;
    try {
        result = arg0 instanceof Response;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_WebGl2RenderingContext_3c5b212f593f345e(arg0) {
    let result;
    try {
        result = arg0 instanceof WebGL2RenderingContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Window_47f723ed0409d724(arg0) {
    let result;
    try {
        result = arg0 instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_invalidateFramebuffer_907e326adfd56387() { return handleError(function (arg0, arg1, arg2) {
    arg0.invalidateFramebuffer(arg1 >>> 0, arg2);
}, arguments) };

export function __wbg_isIntersecting_41f2072f4e185729(arg0) {
    const ret = arg0.isIntersecting;
    return ret;
};

export function __wbg_isSecureContext_ff1d90083791ba64(arg0) {
    const ret = arg0.isSecureContext;
    return ret;
};

export function __wbg_is_c7481c65e7e5df9e(arg0, arg1) {
    const ret = Object.is(arg0, arg1);
    return ret;
};

export function __wbg_iterator_9a24c88df860dc65() {
    const ret = Symbol.iterator;
    return ret;
};

export function __wbg_key_2b8b9e4072a84c6b(arg0, arg1) {
    const ret = arg1.key;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_length_a446193dc22c12f8(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_length_e2d2a49132c1b256(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_linkProgram_8ecbe70054dd2a15(arg0, arg1) {
    arg0.linkProgram(arg1);
};

export function __wbg_linkProgram_dc7033de8d47f58f(arg0, arg1) {
    arg0.linkProgram(arg1);
};

export function __wbg_location_0e7480ef0feace25(arg0) {
    const ret = arg0.location;
    return ret;
};

export function __wbg_log_0cc1b7768397bcfe(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

export function __wbg_log_cb9e190acc5753fb(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.log(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

export function __wbg_mapping_c2b25d26233f06d4(arg0) {
    const ret = arg0.mapping;
    return (__wbindgen_enum_GamepadMappingType.indexOf(ret) + 1 || 3) - 1;
};

export function __wbg_mark_7438147ce31e9d4b(arg0, arg1) {
    performance.mark(getStringFromWasm0(arg0, arg1));
};

export function __wbg_matchMedia_7c5948ee3f15f7b0() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.matchMedia(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_matches_b6366d41e30870bd(arg0) {
    const ret = arg0.matches;
    return ret;
};

export function __wbg_maxChannelCount_c4dce5b75564aa7b(arg0) {
    const ret = arg0.maxChannelCount;
    return ret;
};

export function __wbg_measure_fb7825c11612c823() { return handleError(function (arg0, arg1, arg2, arg3) {
    let deferred0_0;
    let deferred0_1;
    let deferred1_0;
    let deferred1_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        deferred1_0 = arg2;
        deferred1_1 = arg3;
        performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}, arguments) };

export function __wbg_media_ba90891cafc17cd1(arg0, arg1) {
    const ret = arg1.media;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_message_0d6a459d229e9bd0(arg0, arg1) {
    const ret = arg1.message;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_message_451b19ba898ebd87(arg0, arg1) {
    const ret = arg1.message;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_metaKey_139fd4bb4a7f3fdc(arg0) {
    const ret = arg0.metaKey;
    return ret;
};

export function __wbg_metaKey_fb1826ad4845fa17(arg0) {
    const ret = arg0.metaKey;
    return ret;
};

export function __wbg_movementX_4970fb2c6e1292f7(arg0) {
    const ret = arg0.movementX;
    return ret;
};

export function __wbg_movementY_d4063429f4808c25(arg0) {
    const ret = arg0.movementY;
    return ret;
};

export function __wbg_msCrypto_0a36e2ec3a343d26(arg0) {
    const ret = arg0.msCrypto;
    return ret;
};

export function __wbg_name_af1aa5f86e5bfff1(arg0, arg1) {
    const ret = arg1.name;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_navigator_c44d2c517c3dbb22(arg0) {
    const ret = arg0.navigator;
    return ret;
};

export function __wbg_new_03aeda27ca3a0d30() { return handleError(function (arg0) {
    const ret = new ResizeObserver(arg0);
    return ret;
}, arguments) };

export function __wbg_new_3955c5041f5c225a() { return handleError(function () {
    const ret = new AbortController();
    return ret;
}, arguments) };

export function __wbg_new_405e22f390576ce2() {
    const ret = new Object();
    return ret;
};

export function __wbg_new_40cb0d75632e8781() { return handleError(function (arg0, arg1) {
    const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
    return ret;
}, arguments) };

export function __wbg_new_63847613cde5d4bc(arg0, arg1, arg2, arg3) {
    const ret = new RegExp(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
    return ret;
};

export function __wbg_new_78feb108b6472713() {
    const ret = new Array();
    return ret;
};

export function __wbg_new_7e0a94577e551499() { return handleError(function (arg0, arg1) {
    const ret = new Worker(getStringFromWasm0(arg0, arg1));
    return ret;
}, arguments) };

export function __wbg_new_7e88e66811461aba() { return handleError(function () {
    const ret = new FileReader();
    return ret;
}, arguments) };

export function __wbg_new_85c15aa1915d0107() { return handleError(function (arg0) {
    const ret = new IntersectionObserver(arg0);
    return ret;
}, arguments) };

export function __wbg_new_8a6f238a6ece86ea() {
    const ret = new Error();
    return ret;
};

export function __wbg_new_9d9027fccb1f4cb1() { return handleError(function () {
    const ret = new Headers();
    return ret;
}, arguments) };

export function __wbg_new_a12002a7f91c75be(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};

export function __wbg_new_bcf0200bf062e557() { return handleError(function () {
    const ret = new Image();
    return ret;
}, arguments) };

export function __wbg_new_c62260614ab9b2bf() { return handleError(function () {
    const ret = new MessageChannel();
    return ret;
}, arguments) };

export function __wbg_newnoargs_105ed471475aaf50(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_840f3c038856d4e9(arg0, arg1, arg2) {
    const ret = new Int8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_999332a180064b59(arg0, arg1, arg2) {
    const ret = new Int32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_d4a86622320ea258(arg0, arg1, arg2) {
    const ret = new Uint16Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354(arg0, arg1, arg2) {
    const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_f1dead44d1fc7212(arg0, arg1, arg2) {
    const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_f254047f7e80e7ff(arg0, arg1, arg2) {
    const ret = new Int16Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithcontextoptions_102fd4dcd24c9904() { return handleError(function (arg0) {
    const ret = new lAudioContext(arg0);
    return ret;
}, arguments) };

export function __wbg_newwithlength_a381634e90c276d4(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
};

export function __wbg_newwithstrandinit_80f4e7be678ad35c() { return handleError(function (arg0, arg1, arg2) {
    const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
    return ret;
}, arguments) };

export function __wbg_newwithstrsequenceandoptions_1bedcbd588e2463b() { return handleError(function (arg0, arg1) {
    const ret = new Blob(arg0, arg1);
    return ret;
}, arguments) };

export function __wbg_newwithu8clampedarray_98a983e8664758ee() { return handleError(function (arg0, arg1, arg2) {
    const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0);
    return ret;
}, arguments) };

export function __wbg_next_25feadfc0913fea9(arg0) {
    const ret = arg0.next;
    return ret;
};

export function __wbg_next_6574e1a8a62d1055() { return handleError(function (arg0) {
    const ret = arg0.next();
    return ret;
}, arguments) };

export function __wbg_node_02999533c4ea02e3(arg0) {
    const ret = arg0.node;
    return ret;
};

export function __wbg_now_2c95c9de01293173(arg0) {
    const ret = arg0.now();
    return ret;
};

export function __wbg_now_807e54c39636c349() {
    const ret = Date.now();
    return ret;
};

export function __wbg_observe_660a6c4955e2cb17(arg0, arg1) {
    arg0.observe(arg1);
};

export function __wbg_observe_98c0f530514010a8(arg0, arg1) {
    arg0.observe(arg1);
};

export function __wbg_observe_eaae049c28066ef5(arg0, arg1, arg2) {
    arg0.observe(arg1, arg2);
};

export function __wbg_of_2eaf5a02d443ef03(arg0) {
    const ret = Array.of(arg0);
    return ret;
};

export function __wbg_of_66b3ee656cbd962b(arg0, arg1) {
    const ret = Array.of(arg0, arg1);
    return ret;
};

export function __wbg_offsetX_8e060d66bbb1f8dd(arg0) {
    const ret = arg0.offsetX;
    return ret;
};

export function __wbg_offsetY_5dab9d4911e2c63e(arg0) {
    const ret = arg0.offsetY;
    return ret;
};

export function __wbg_performance_7a3ffd0b17f663ad(arg0) {
    const ret = arg0.performance;
    return ret;
};

export function __wbg_persisted_5a2d8364a26e3927(arg0) {
    const ret = arg0.persisted;
    return ret;
};

export function __wbg_pixelStorei_136cc611cfda1458(arg0, arg1, arg2) {
    arg0.pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_pixelStorei_eb8e27478b40e6dc(arg0, arg1, arg2) {
    arg0.pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_play_a6bc6925ade4d076(arg0) {
    arg0.play();
};

export function __wbg_pointerId_f534d1692f4da9a4(arg0) {
    const ret = arg0.pointerId;
    return ret;
};

export function __wbg_pointerType_7c590786b1fb1279(arg0, arg1) {
    const ret = arg1.pointerType;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_polygonOffset_86274a5801b73e08(arg0, arg1, arg2) {
    arg0.polygonOffset(arg1, arg2);
};

export function __wbg_polygonOffset_be6fd482f971d8cb(arg0, arg1, arg2) {
    arg0.polygonOffset(arg1, arg2);
};

export function __wbg_port1_0d88b67321c61caf(arg0) {
    const ret = arg0.port1;
    return ret;
};

export function __wbg_port2_acd7a421ed5b91aa(arg0) {
    const ret = arg0.port2;
    return ret;
};

export function __wbg_postMessage_4e25268f26c1eb76() { return handleError(function (arg0, arg1, arg2) {
    arg0.postMessage(arg1, arg2);
}, arguments) };

export function __wbg_postMessage_c8bbfd62dc1987b2() { return handleError(function (arg0, arg1) {
    arg0.postMessage(arg1);
}, arguments) };

export function __wbg_postTask_fdf481d32281b639(arg0, arg1, arg2) {
    const ret = arg0.postTask(arg1, arg2);
    return ret;
};

export function __wbg_pressed_e4f58198e1f14a97(arg0) {
    const ret = arg0.pressed;
    return ret;
};

export function __wbg_pressure_76e94c30701a0050(arg0) {
    const ret = arg0.pressure;
    return ret;
};

export function __wbg_preventDefault_7cd87fa71683fc8f(arg0) {
    arg0.preventDefault();
};

export function __wbg_process_5c1d670bc53614b8(arg0) {
    const ret = arg0.process;
    return ret;
};

export function __wbg_prototype_f40a930ee96df84e() {
    const ret = ResizeObserverEntry.prototype;
    return ret;
};

export function __wbg_push_737cfc8c1432c2c6(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
};

export function __wbg_queryCounterEXT_9505c72de9068454(arg0, arg1, arg2) {
    arg0.queryCounterEXT(arg1, arg2 >>> 0);
};

export function __wbg_querySelector_ab5b6a4f61d535d5() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_queueMicrotask_59e43cd0e99b8ca9(arg0, arg1) {
    arg0.queueMicrotask(arg1);
};

export function __wbg_queueMicrotask_5a8a9131f3f0b37b(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
};

export function __wbg_queueMicrotask_6d79674585219521(arg0) {
    queueMicrotask(arg0);
};

export function __wbg_randomFillSync_ab2cfe79ebbf2740() { return handleError(function (arg0, arg1) {
    arg0.randomFillSync(arg1);
}, arguments) };

export function __wbg_readAsArrayBuffer_77056febf4be93ea() { return handleError(function (arg0, arg1) {
    arg0.readAsArrayBuffer(arg1);
}, arguments) };

export function __wbg_readBuffer_2ea579be4a23dcf6(arg0, arg1) {
    arg0.readBuffer(arg1 >>> 0);
};

export function __wbg_readPixels_a35883e1cdff6e3d() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_readPixels_a672c9a063f8e2a9() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_readPixels_a8827948de5467c3() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_removeEventListener_f420b4f37f515116() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_removeListener_5fdddaf11f89511d() { return handleError(function (arg0, arg1) {
    arg0.removeListener(arg1);
}, arguments) };

export function __wbg_removeProperty_e9ac299501b9d225() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.removeProperty(getStringFromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_renderbufferStorageMultisample_c2d9bd03d15353fd(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_renderbufferStorage_20c9844f177431db(arg0, arg1, arg2, arg3, arg4) {
    arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_renderbufferStorage_58c7bd7350fe2348(arg0, arg1, arg2, arg3, arg4) {
    arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_repeat_a0a8a6127f35aec6(arg0) {
    const ret = arg0.repeat;
    return ret;
};

export function __wbg_requestAnimationFrame_c63a6b8ad5f85d24() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestAnimationFrame(arg1);
    return ret;
}, arguments) };

export function __wbg_requestFullscreen_846483b65ab4bcfd(arg0) {
    const ret = arg0.requestFullscreen;
    return ret;
};

export function __wbg_requestFullscreen_d384a396f57b5e23(arg0) {
    const ret = arg0.requestFullscreen();
    return ret;
};

export function __wbg_requestIdleCallback_85d8c40249375ed6() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestIdleCallback(arg1);
    return ret;
}, arguments) };

export function __wbg_requestIdleCallback_ffa13e71f9f7eab7(arg0) {
    const ret = arg0.requestIdleCallback;
    return ret;
};

export function __wbg_requestPointerLock_3f337812f87c885c(arg0) {
    arg0.requestPointerLock();
};

export function __wbg_require_79b1e9274cde3c87() { return handleError(function () {
    const ret = module.require;
    return ret;
}, arguments) };

export function __wbg_resolve_4851785c9c5f573d(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
};

export function __wbg_result_cb63abef9f147b35() { return handleError(function (arg0) {
    const ret = arg0.result;
    return ret;
}, arguments) };

export function __wbg_resume_b0ab6d04195104a4() { return handleError(function (arg0) {
    const ret = arg0.resume();
    return ret;
}, arguments) };

export function __wbg_revokeObjectURL_d505253d4a1e5b65() { return handleError(function (arg0, arg1) {
    URL.revokeObjectURL(getStringFromWasm0(arg0, arg1));
}, arguments) };

export function __wbg_samplerParameterf_c47e7f1ad8dae991(arg0, arg1, arg2, arg3) {
    arg0.samplerParameterf(arg1, arg2 >>> 0, arg3);
};

export function __wbg_samplerParameteri_5a2ef125bf04f811(arg0, arg1, arg2, arg3) {
    arg0.samplerParameteri(arg1, arg2 >>> 0, arg3);
};

export function __wbg_scheduler_1e4096f328db402d(arg0) {
    const ret = arg0.scheduler;
    return ret;
};

export function __wbg_scheduler_9ae0e75645230265(arg0) {
    const ret = arg0.scheduler;
    return ret;
};

export function __wbg_scissor_59abe091ff49819a(arg0, arg1, arg2, arg3, arg4) {
    arg0.scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_scissor_ea487ef04cb6fcb3(arg0, arg1, arg2, arg3, arg4) {
    arg0.scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_send_4686d7f932ed7feb() { return handleError(function (arg0, arg1, arg2) {
    arg0.send(getStringFromWasm0(arg1, arg2));
}, arguments) };

export function __wbg_send_f31d227db2b26cc2() { return handleError(function (arg0, arg1, arg2) {
    arg0.send(getArrayU8FromWasm0(arg1, arg2));
}, arguments) };

export function __wbg_setAttribute_3d1326b2d681f50e() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setPointerCapture_e01aa24a929223fb() { return handleError(function (arg0, arg1) {
    arg0.setPointerCapture(arg1);
}, arguments) };

export function __wbg_setProperty_6e030598ab0f3b70() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setTimeout_0da9746efaff7f7e() { return handleError(function (arg0, arg1) {
    const ret = arg0.setTimeout(arg1);
    return ret;
}, arguments) };

export function __wbg_setTimeout_21f535ce88ddefae() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.setTimeout(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_setTimeout_2b339866a2aa3789(arg0, arg1) {
    const ret = setTimeout(arg0, arg1);
    return ret;
};

export function __wbg_set_65595bdd868b3009(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};

export function __wbg_set_bb8cecf6a62b9f46() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(arg0, arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_setbinaryType_b418b560c2e75332(arg0, arg1) {
    arg0.binaryType = __wbindgen_enum_BinaryType[arg1];
};

export function __wbg_setbody_e622304a359e9997(arg0, arg1) {
    arg0.body = arg1;
};

export function __wbg_setbox_cc8ea5a970f704d1(arg0, arg1) {
    arg0.box = __wbindgen_enum_ResizeObserverBoxOptions[arg1];
};

export function __wbg_setbuffer_e7d594cb176819b6(arg0, arg1) {
    arg0.buffer = arg1;
};

export function __wbg_setcache_702a02c6b1733757(arg0, arg1) {
    arg0.cache = __wbindgen_enum_RequestCache[arg1];
};

export function __wbg_setchannelCount_f7063a5d49b4d789(arg0, arg1) {
    arg0.channelCount = arg1 >>> 0;
};

export function __wbg_setcredentials_6c1850c906a4c7d8(arg0, arg1) {
    arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
};

export function __wbg_setcursor_79816658eb4d479e(arg0, arg1, arg2) {
    arg0.cursor = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setduration_1cc57e20d0fffc9c(arg0, arg1) {
    arg0.duration = arg1;
};

export function __wbg_setheaders_37c4507b6650184a(arg0, arg1) {
    arg0.headers = arg1;
};

export function __wbg_setheight_6d068aac3809b5be(arg0, arg1) {
    arg0.height = arg1 >>> 0;
};

export function __wbg_setheight_ef8682f90e6c89d9(arg0, arg1) {
    arg0.height = arg1 >>> 0;
};

export function __wbg_setiterations_3e05faecce5ce8ca(arg0, arg1) {
    arg0.iterations = arg1;
};

export function __wbg_setmethod_20004624d0bb3c04(arg0, arg1, arg2) {
    arg0.method = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setmode_cfeb23c22a98ee10(arg0, arg1) {
    arg0.mode = __wbindgen_enum_RequestMode[arg1];
};

export function __wbg_setonclose_02a3958c440a6a5d(arg0, arg1) {
    arg0.onclose = arg1;
};

export function __wbg_setonended_3d2a95d9476a0c8a(arg0, arg1) {
    arg0.onended = arg1;
};

export function __wbg_setonerror_11f26fd0dccd2aa4(arg0, arg1) {
    arg0.onerror = arg1;
};

export function __wbg_setonloadend_48839b314bfaf4a5(arg0, arg1) {
    arg0.onloadend = arg1;
};

export function __wbg_setonmessage_93c66c6d7fb90158(arg0, arg1) {
    arg0.onmessage = arg1;
};

export function __wbg_setonmessage_bd9040088d96e132(arg0, arg1) {
    arg0.onmessage = arg1;
};

export function __wbg_setonopen_e7c583e673ea3571(arg0, arg1) {
    arg0.onopen = arg1;
};

export function __wbg_setpremultiplyalpha_c6664e6190755efa(arg0, arg1) {
    arg0.premultiplyAlpha = __wbindgen_enum_PremultiplyAlpha[arg1];
};

export function __wbg_setsamplerate_19c8bdfa09aea405(arg0, arg1) {
    arg0.sampleRate = arg1;
};

export function __wbg_setsignal_1c7fc807a0404525(arg0, arg1) {
    arg0.signal = arg1;
};

export function __wbg_setsrc_308536c5baa0e0b1(arg0, arg1, arg2) {
    arg0.src = getStringFromWasm0(arg1, arg2);
};

export function __wbg_settype_8bac22cb8a404937(arg0, arg1, arg2) {
    arg0.type = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setwidth_0a97529809a7b5ce(arg0, arg1) {
    arg0.width = arg1 >>> 0;
};

export function __wbg_setwidth_c27496fac9d7cbcd(arg0, arg1) {
    arg0.width = arg1 >>> 0;
};

export function __wbg_shaderSource_00ae5f7fdfcbcc8a(arg0, arg1, arg2, arg3) {
    arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
};

export function __wbg_shaderSource_07600d75c5e52ee8(arg0, arg1, arg2, arg3) {
    arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
};

export function __wbg_shiftKey_15a826ae86780b66(arg0) {
    const ret = arg0.shiftKey;
    return ret;
};

export function __wbg_shiftKey_faedef72ca4993d0(arg0) {
    const ret = arg0.shiftKey;
    return ret;
};

export function __wbg_signal_05cd9a8401da1904(arg0) {
    const ret = arg0.signal;
    return ret;
};

export function __wbg_stack_0ed75d68575b0f3c(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_start_09bc3431127c018b(arg0) {
    arg0.start();
};

export function __wbg_start_80af40cd3e84d34f() { return handleError(function (arg0, arg1) {
    arg0.start(arg1);
}, arguments) };

export function __wbg_static_accessor_GLOBAL_88a902d13a557d07() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_SELF_37c5d418e4bf5819() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_WINDOW_5de37043a91a9c40() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_status_0469c5287b59ffc5(arg0) {
    const ret = arg0.status;
    return ret;
};

export function __wbg_stencilFuncSeparate_0157f18e790f6bfa(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
};

export function __wbg_stencilFuncSeparate_2dc59edc13b28fc6(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
};

export function __wbg_stencilMaskSeparate_3caa7748f1b26cd6(arg0, arg1, arg2) {
    arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_stencilMaskSeparate_52cbb32878267078(arg0, arg1, arg2) {
    arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_stencilMask_521a52ddfe5a6cd4(arg0, arg1) {
    arg0.stencilMask(arg1 >>> 0);
};

export function __wbg_stencilMask_6d9a784c7bc351ce(arg0, arg1) {
    arg0.stencilMask(arg1 >>> 0);
};

export function __wbg_stencilOpSeparate_0c978eb9b15c9f85(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_stencilOpSeparate_e827f9e978e1b09a(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_stringify_f7ed6987935b4a24() { return handleError(function (arg0) {
    const ret = JSON.stringify(arg0);
    return ret;
}, arguments) };

export function __wbg_style_26e0ea49287f923a(arg0) {
    const ret = arg0.style;
    return ret;
};

export function __wbg_subarray_aa9065fa9dc5df96(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_texImage2D_497bb4fda2bff198() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texImage2D_64119485ec5c83c5() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texImage3D_685f14380c3292c5() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
}, arguments) };

export function __wbg_texParameteri_57e5020007d28a78(arg0, arg1, arg2, arg3) {
    arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_texParameteri_638be2eabe09adbe(arg0, arg1, arg2, arg3) {
    arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_texStorage2D_8b915caf1da46ce4(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_texStorage3D_0568b2363f484a4f(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.texStorage3D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
};

export function __wbg_texSubImage2D_25ba041814bc8e21() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_58b3b8ef58a4f11e() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_62ec55b6e2d2a279() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_7c1af8ea2e445bf9() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_9709c068b2b4de26() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_a6d54e1bacae4401() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_dc0bf4e5d109f6a9() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_e670a30252e68a5f() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage3D_3020ea0c2e4af671() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_31dddb79286a750e() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_4e10da0b59035caf() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_5152f65f00cea2c1() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_9accaba68879d2bb() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_caef58ba35d2b1dc() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_f923048e43a90691() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_then_44b73946d2fb3e7d(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
};

export function __wbg_then_48b406749878a531(arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
};

export function __wbg_toBlob_6b76689a7a76c567() { return handleError(function (arg0, arg1) {
    arg0.toBlob(arg1);
}, arguments) };

export function __wbg_transferFromImageBitmap_01ecc44dd9f75baa(arg0, arg1) {
    arg0.transferFromImageBitmap(arg1);
};

export function __wbg_uniform1f_163140cf8098fd27(arg0, arg1, arg2) {
    arg0.uniform1f(arg1, arg2);
};

export function __wbg_uniform1f_24e297dbe82b3e8b(arg0, arg1, arg2) {
    arg0.uniform1f(arg1, arg2);
};

export function __wbg_uniform1i_321dc6f551dc43a2(arg0, arg1, arg2) {
    arg0.uniform1i(arg1, arg2);
};

export function __wbg_uniform1i_c336bd57bb635632(arg0, arg1, arg2) {
    arg0.uniform1i(arg1, arg2);
};

export function __wbg_uniform1ui_f08a50dc1fbc1a12(arg0, arg1, arg2) {
    arg0.uniform1ui(arg1, arg2 >>> 0);
};

export function __wbg_uniform2fv_e35eebfe7745fcbd(arg0, arg1, arg2, arg3) {
    arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2fv_f4f5cdbddd309e4e(arg0, arg1, arg2, arg3) {
    arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2iv_1ce9f168e7c65400(arg0, arg1, arg2, arg3) {
    arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2iv_d846357c5c3dae05(arg0, arg1, arg2, arg3) {
    arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2uiv_b858f856d34c25a5(arg0, arg1, arg2, arg3) {
    arg0.uniform2uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3fv_2227834b10c7b12d(arg0, arg1, arg2, arg3) {
    arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3fv_25d27a1149eb4860(arg0, arg1, arg2, arg3) {
    arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3iv_2ff71c5f5fa3ce41(arg0, arg1, arg2, arg3) {
    arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3iv_ca926607f47cfeb6(arg0, arg1, arg2, arg3) {
    arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3uiv_3d625ec4e84c34e4(arg0, arg1, arg2, arg3) {
    arg0.uniform3uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4f_7c3650ab50e68564(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_uniform4f_d60121a6b2a97dc8(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_uniform4fv_18992c16bbabd9c0(arg0, arg1, arg2, arg3) {
    arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4fv_530e745d431feb37(arg0, arg1, arg2, arg3) {
    arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4iv_1a955cae115903da(arg0, arg1, arg2, arg3) {
    arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4iv_9c807bd0d2a8e4a8(arg0, arg1, arg2, arg3) {
    arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4uiv_95e9545ab34cb124(arg0, arg1, arg2, arg3) {
    arg0.uniform4uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniformBlockBinding_c444994f1ea2a94b(arg0, arg1, arg2, arg3) {
    arg0.uniformBlockBinding(arg1, arg2 >>> 0, arg3 >>> 0);
};

export function __wbg_uniformMatrix2fv_6e733aa755842b90(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2fv_6f4364e64c7c9421(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2x3fv_976bbb06d85dfd0e(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2x4fv_92e5b6db630a5fa8(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3fv_03411c8bf29bce4f(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3fv_3b9f87ac337e8818(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3x2fv_c460042a2723adaa(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3x4fv_6ef1e75b29e19c73(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4fv_42709953443a0a25(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4fv_b1f3c4e6fee094ba(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4x2fv_b234c3cfc3c0f072(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4x3fv_aff68033ad4371cd(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_unobserve_3e1d2ed8c8f9304d(arg0, arg1) {
    arg0.unobserve(arg1);
};

export function __wbg_url_0f5a9de9ca05e0eb(arg0, arg1) {
    const ret = arg1.url;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_useProgram_4b9fefb6ddf3c9db(arg0, arg1) {
    arg0.useProgram(arg1);
};

export function __wbg_useProgram_84c836d2cadce6f4(arg0, arg1) {
    arg0.useProgram(arg1);
};

export function __wbg_userAgentData_9a0f2cb9c44f04e3(arg0) {
    const ret = arg0.userAgentData;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_userAgent_1ec9a943344ce531() { return handleError(function (arg0, arg1) {
    const ret = arg1.userAgent;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_value_ad7f8bc04ccebe94(arg0) {
    const ret = arg0.value;
    return ret;
};

export function __wbg_value_cd1ffa7b1ab794f1(arg0) {
    const ret = arg0.value;
    return ret;
};

export function __wbg_versions_c71aa1626a93e0a1(arg0) {
    const ret = arg0.versions;
    return ret;
};

export function __wbg_vertexAttribDivisorANGLE_61512b78a513b150(arg0, arg1, arg2) {
    arg0.vertexAttribDivisorANGLE(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_vertexAttribDivisor_d085158bfa542d48(arg0, arg1, arg2) {
    arg0.vertexAttribDivisor(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_vertexAttribIPointer_428f7a653f85a577(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_vertexAttribPointer_34d6fd8e96154da2(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_vertexAttribPointer_9805416e06cf92de(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_videoHeight_2304fcc48af2e7cb(arg0) {
    const ret = arg0.videoHeight;
    return ret;
};

export function __wbg_videoWidth_e744eed0752c3e65(arg0) {
    const ret = arg0.videoWidth;
    return ret;
};

export function __wbg_viewport_a6c7d2f5470dbbac(arg0, arg1, arg2, arg3, arg4) {
    arg0.viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_viewport_ae6852be2ba7c8b1(arg0, arg1, arg2, arg3, arg4) {
    arg0.viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_visibilityState_7eed63363cbc05d9(arg0) {
    const ret = arg0.visibilityState;
    return (__wbindgen_enum_VisibilityState.indexOf(ret) + 1 || 3) - 1;
};

export function __wbg_webkitExitFullscreen_100c7339a43dde6c(arg0) {
    arg0.webkitExitFullscreen();
};

export function __wbg_webkitFullscreenElement_c8ff6ae6cbb7ea16(arg0) {
    const ret = arg0.webkitFullscreenElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_webkitRequestFullscreen_cf31245d47b10448(arg0) {
    arg0.webkitRequestFullscreen();
};

export function __wbg_width_116078e7490d57e3(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_width_5919db608d47d0b9(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_width_59df68dab3035138(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_width_8edf59c193346831(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_width_91d0657fa0600886(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_width_a0516de9803a3357(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_x_eee19989e8080baa(arg0) {
    const ret = arg0.x;
    return ret;
};

export function __wbg_y_06bcd329d9542e18(arg0) {
    const ret = arg0.y;
    return ret;
};

export function __wbindgen_boolean_get(arg0) {
    const v = arg0;
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export function __wbindgen_cb_drop(arg0) {
    const obj = arg0.original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

export function __wbindgen_closure_wrapper15182(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2569, __wbg_adapter_36);
    return ret;
};

export function __wbindgen_closure_wrapper19050(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3064, __wbg_adapter_39);
    return ret;
};

export function __wbindgen_closure_wrapper19052(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3058, __wbg_adapter_42);
    return ret;
};

export function __wbindgen_closure_wrapper19054(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3060, __wbg_adapter_45);
    return ret;
};

export function __wbindgen_closure_wrapper19056(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3062, __wbg_adapter_48);
    return ret;
};

export function __wbindgen_closure_wrapper215551(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 36680, __wbg_adapter_81);
    return ret;
};

export function __wbindgen_closure_wrapper28564(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 4865, __wbg_adapter_51);
    return ret;
};

export function __wbindgen_closure_wrapper28566(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 4867, __wbg_adapter_54);
    return ret;
};

export function __wbindgen_closure_wrapper28568(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 4871, __wbg_adapter_57);
    return ret;
};

export function __wbindgen_closure_wrapper28570(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 4869, __wbg_adapter_60);
    return ret;
};

export function __wbindgen_closure_wrapper28572(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 4857, __wbg_adapter_63);
    return ret;
};

export function __wbindgen_closure_wrapper28574(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 4861, __wbg_adapter_66);
    return ret;
};

export function __wbindgen_closure_wrapper28576(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 4863, __wbg_adapter_69);
    return ret;
};

export function __wbindgen_closure_wrapper28578(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 4873, __wbg_adapter_72);
    return ret;
};

export function __wbindgen_closure_wrapper28580(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 4859, __wbg_adapter_75);
    return ret;
};

export function __wbindgen_closure_wrapper28582(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 4875, __wbg_adapter_78);
    return ret;
};

export function __wbindgen_closure_wrapper363077(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 64021, __wbg_adapter_84);
    return ret;
};

export function __wbindgen_closure_wrapper375281(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 64540, __wbg_adapter_87);
    return ret;
};

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_export_1;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

export function __wbindgen_is_function(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
};

export function __wbindgen_is_null(arg0) {
    const ret = arg0 === null;
    return ret;
};

export function __wbindgen_is_object(arg0) {
    const val = arg0;
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

export function __wbindgen_is_string(arg0) {
    const ret = typeof(arg0) === 'string';
    return ret;
};

export function __wbindgen_is_undefined(arg0) {
    const ret = arg0 === undefined;
    return ret;
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return ret;
};

export function __wbindgen_number_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return ret;
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

