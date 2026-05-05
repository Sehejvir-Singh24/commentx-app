var Gg = Object.defineProperty; var Hg = (e, t, r) => t in e ? Gg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r; var mo = (e, t, r) => Hg(e, typeof t != "symbol" ? t + "" : t, r); function Fg() { return new Promise(e => { const t = document.querySelector("video"); if (t) { e({ videoEl: t, playerType: Ei() }); return } const r = new MutationObserver(i => { for (const a of i) if (a.addedNodes) for (const n of a.addedNodes) { if (n.tagName === "VIDEO") { r.disconnect(), e({ videoEl: n, playerType: Ei() }); return } if (n.querySelectorAll) { const s = n.querySelector("video"); if (s) { r.disconnect(), e({ videoEl: s, playerType: Ei() }); return } } } }); r.observe(document.body, { childList: !0, subtree: !0 }) }) } function Ei() { const e = window.location.hostname; return e.includes("youtube.com") ? "youtube" : e.includes("twitch.tv") ? "twitch" : "html5" } let Me = null, Zr = null; const zi = 320, Ci = 180; function Qd(e) { Me || (Me = document.createElement("canvas"), Zr = Me.getContext("2d", { willReadFrequently: !0 })); const t = e.videoWidth || e.clientWidth || zi, r = e.videoHeight || e.clientHeight || Ci; let i = t, a = r; if (i > zi || a > Ci) { const n = zi / i, s = Ci / a, u = Math.min(n, s); i = Math.floor(i * u), a = Math.floor(a * u) } (Me.width !== i || Me.height !== a) && (Me.width = i, Me.height = a) } function jg(e) { if (!e) return null; Qd(e); try { return Zr.drawImage(e, 0, 0, Me.width, Me.height), Zr.getImageData(0, 0, Me.width, Me.height) } catch (t) { return console.error("CommentX: Error capturing raw frame:", t), null } } function Kg(e) { if (!e) return null; Qd(e); try { return Zr.drawImage(e, 0, 0, Me.width, Me.height), Me.toDataURL("image/jpeg", .4).split(",")[1] } catch (t) { return console.error("CommentX: Error capturing base64 frame:", t), null } } function Xg(e, t, r, i, a) {
  const n = document.createElement("div"); n.id = "commentx-toolbar-container", n.style.position = "absolute", n.style.top = "10px", n.style.right = "10px", n.style.zIndex = "2147483647", n.style.pointerEvents = "auto"; const s = n.attachShadow({ mode: "closed" }), u = document.createElement("style"); u.textContent = `
    .toolbar {
      display: flex; align-items: center; gap: 10px;
      background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px);
      padding: 8px 12px; border-radius: 8px; color: white;
      font-family: system-ui, -apple-system, sans-serif; font-size: 14px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
    }
    button, select, input {
      background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);
      color: white; border-radius: 4px; padding: 4px 8px; cursor: pointer; outline: none;
    }
    button:hover, select:hover { background: rgba(255, 255, 255, 0.2); }
    .status-dot { width: 10px; height: 10px; border-radius: 50%; background: #888; transition: background 0.3s; }
    .status-dot.active { background: #4caf50; box-shadow: 0 0 5px #4caf50; }
    .status-dot.error { background: #f44336; box-shadow: 0 0 5px #f44336; }
    .toggle { font-weight: bold; }
    .toggle.active { background: #4caf50; border-color: #4caf50; }

    .commentary-box {
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 600px;
      width: 90%;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      color: #fff;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      padding: 14px 20px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      text-align: center;
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
      z-index: 2147483647;
    }
    .commentary-box.visible {
      opacity: 1;
    }
    .commentary-box .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #4caf50;
      margin-bottom: 6px;
      font-weight: 700;
    }
  `; const l = document.createElement("div"); l.className = "toolbar"; const p = document.createElement("div"); p.className = "status-dot"; const f = document.createElement("button"); f.className = "toggle", f.textContent = "CommentX: OFF"; const h = document.createElement("select");["Sports", "Gaming", "Documentary", "Custom"].forEach(v => { const w = document.createElement("option"); w.value = v.toLowerCase(), w.textContent = v, h.appendChild(w) }), h.value = (t == null ? void 0 : t.mode) || "sports"; const g = document.createElement("input"); g.type = "range", g.min = "0", g.max = "100", g.value = (t == null ? void 0 : t.volume) || "50", g.style.width = "60px", l.append(p, f, h, g); const y = document.createElement("div"); y.className = "commentary-box", y.innerHTML = '<div class="label">🎙️ CommentX</div><div class="text"></div>', s.append(u, l, y); let _ = null; n.style.position = "fixed", n.style.top = "20px", n.style.right = "20px", document.body.appendChild(n); let b = !1; f.addEventListener("click", () => { b = !b, f.textContent = b ? "CommentX: ON" : "CommentX: OFF", f.classList.toggle("active", b), p.className = `status-dot ${b ? "active" : ""}`, r(b) }), h.addEventListener("change", v => i(v.target.value)), g.addEventListener("input", v => a(parseInt(v.target.value, 10))); const S = new MutationObserver(() => { document.contains(e) || (n.remove(), S.disconnect()) }); return S.observe(document.body, { childList: !0, subtree: !0 }), { setStatus: v => { p.className = "status-dot", v === "active" && p.classList.add("active"), v === "error" && p.classList.add("error") }, showCommentary: v => { if (!v) return; const w = y.querySelector(".text"); w.textContent = v, y.classList.add("visible"), _ && clearTimeout(_), _ = setTimeout(() => { y.classList.remove("visible") }, 8e3) }, remove: () => { n.remove(), S.disconnect() } }
}/*!
 * ONNX Runtime Web v1.25.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Ha = Object.defineProperty, Zg = Object.getOwnPropertyDescriptor, Qg = Object.getOwnPropertyNames, Yg = Object.prototype.hasOwnProperty, Jg = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e)(function (e) { if (typeof require < "u") return require.apply(this, arguments); throw Error('Dynamic require of "' + e + '" is not supported') }), U = (e, t) => () => (e && (t = e(e = 0)), t), jt = (e, t) => { for (var r in t) Ha(e, r, { get: t[r], enumerable: !0 }) }, e0 = (e, t, r, i) => { if (t && typeof t == "object" || typeof t == "function") for (let a of Qg(t)) !Yg.call(e, a) && a !== r && Ha(e, a, { get: () => t[a], enumerable: !(i = Zg(t, a)) || i.enumerable }); return e }, yr = e => e0(Ha({}, "__esModule", { value: !0 }), e), Jt, gt, Vt, go, Yd, Jd = U(() => { Jt = new Map, gt = [], Vt = (e, t, r) => { if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") { let i = Jt.get(e); if (i === void 0) Jt.set(e, { backend: t, priority: r }); else { if (i.priority > r) return; if (i.priority === r && i.backend !== t) throw new Error(`cannot register backend "${e}" using priority ${r}`) } if (r >= 0) { let a = gt.indexOf(e); a !== -1 && gt.splice(a, 1); for (let n = 0; n < gt.length; n++)if (Jt.get(gt[n]).priority <= r) { gt.splice(n, 0, e); return } gt.push(e) } return } throw new TypeError("not a valid backend") }, go = async e => { let t = Jt.get(e); if (!t) return "backend not found."; if (t.initialized) return t.backend; if (t.aborted) return t.error; { let r = !!t.initPromise; try { return r || (t.initPromise = t.backend.init(e)), await t.initPromise, t.initialized = !0, t.backend } catch (i) { return r || (t.error = `${i}`, t.aborted = !0), t.error } finally { delete t.initPromise } } }, Yd = async e => { let t = e.executionProviders || [], r = t.map(l => typeof l == "string" ? l : l.name), i = r.length === 0 ? gt : r, a, n = [], s = new Set; for (let l of i) { let p = await go(l); typeof p == "string" ? n.push({ name: l, err: p }) : (a || (a = p), a === p && s.add(l)) } if (!a) throw new Error(`no available backend found. ERR: ${n.map(l => `[${l.name}] ${l.err}`).join(", ")}`); for (let { name: l, err: p } of n) r.includes(l) && console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`); let u = t.filter(l => s.has(typeof l == "string" ? l : l.name)); return [a, new Proxy(e, { get: (l, p) => p === "executionProviders" ? u : Reflect.get(l, p) })] } }), t0 = U(() => { Jd() }), ep, r0 = U(() => { ep = "1.25.1" }), Ai, Ee, tp = U(() => { r0(), Ai = "warning", Ee = { wasm: {}, webgl: {}, webgpu: {}, versions: { common: ep }, set logLevel(e) { if (e !== void 0) { if (typeof e != "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(e) === -1) throw new Error(`Unsupported logging level: ${e}`); Ai = e } }, get logLevel() { return Ai } }, Object.defineProperty(Ee, "logLevel", { enumerable: !0 }) }), $e, i0 = U(() => { tp(), $e = Ee }), rp, ip, a0 = U(() => { rp = (e, t) => { let r = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1); r.width = e.dims[3], r.height = e.dims[2]; let i = r.getContext("2d"); if (i != null) { let a, n; (t == null ? void 0 : t.tensorLayout) !== void 0 && t.tensorLayout === "NHWC" ? (a = e.dims[2], n = e.dims[3]) : (a = e.dims[3], n = e.dims[2]); let s = (t == null ? void 0 : t.format) !== void 0 ? t.format : "RGB", u = t == null ? void 0 : t.norm, l, p; u === void 0 || u.mean === void 0 ? l = [255, 255, 255, 255] : typeof u.mean == "number" ? l = [u.mean, u.mean, u.mean, u.mean] : (l = [u.mean[0], u.mean[1], u.mean[2], 0], u.mean[3] !== void 0 && (l[3] = u.mean[3])), u === void 0 || u.bias === void 0 ? p = [0, 0, 0, 0] : typeof u.bias == "number" ? p = [u.bias, u.bias, u.bias, u.bias] : (p = [u.bias[0], u.bias[1], u.bias[2], 0], u.bias[3] !== void 0 && (p[3] = u.bias[3])); let f = n * a, h = 0, g = f, y = f * 2, _ = -1; s === "RGBA" ? (h = 0, g = f, y = f * 2, _ = f * 3) : s === "RGB" ? (h = 0, g = f, y = f * 2) : s === "RBG" && (h = 0, y = f, g = f * 2); for (let b = 0; b < n; b++)for (let S = 0; S < a; S++) { let v = (e.data[h++] - p[0]) * l[0], w = (e.data[g++] - p[1]) * l[1], I = (e.data[y++] - p[2]) * l[2], T = _ === -1 ? 255 : (e.data[_++] - p[3]) * l[3]; i.fillStyle = "rgba(" + v + "," + w + "," + I + "," + T + ")", i.fillRect(S, b, 1, 1) } if ("toDataURL" in r) return r.toDataURL(); throw new Error("toDataURL is not supported") } else throw new Error("Can not access image data") }, ip = (e, t) => { let r = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), i; if (r != null) { let a, n, s; (t == null ? void 0 : t.tensorLayout) !== void 0 && t.tensorLayout === "NHWC" ? (a = e.dims[2], n = e.dims[1], s = e.dims[3]) : (a = e.dims[3], n = e.dims[2], s = e.dims[1]); let u = t !== void 0 && t.format !== void 0 ? t.format : "RGB", l = t == null ? void 0 : t.norm, p, f; l === void 0 || l.mean === void 0 ? p = [255, 255, 255, 255] : typeof l.mean == "number" ? p = [l.mean, l.mean, l.mean, l.mean] : (p = [l.mean[0], l.mean[1], l.mean[2], 255], l.mean[3] !== void 0 && (p[3] = l.mean[3])), l === void 0 || l.bias === void 0 ? f = [0, 0, 0, 0] : typeof l.bias == "number" ? f = [l.bias, l.bias, l.bias, l.bias] : (f = [l.bias[0], l.bias[1], l.bias[2], 0], l.bias[3] !== void 0 && (f[3] = l.bias[3])); let h = n * a; if (t !== void 0 && (t.format !== void 0 && s === 4 && t.format !== "RGBA" || s === 3 && t.format !== "RGB" && t.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims"); let g = 4, y = 0, _ = 1, b = 2, S = 3, v = 0, w = h, I = h * 2, T = -1; u === "RGBA" ? (v = 0, w = h, I = h * 2, T = h * 3) : u === "RGB" ? (v = 0, w = h, I = h * 2) : u === "RBG" && (v = 0, I = h, w = h * 2), i = r.createImageData(a, n); for (let E = 0; E < n * a; y += g, _ += g, b += g, S += g, E++)i.data[y] = (e.data[v++] - f[0]) * p[0], i.data[_] = (e.data[w++] - f[1]) * p[1], i.data[b] = (e.data[I++] - f[2]) * p[2], i.data[S] = T === -1 ? 255 : (e.data[T++] - f[3]) * p[3] } else throw new Error("Can not access image data"); return i } }), Or, ap, np, sp, op, up, n0 = U(() => { Fa(), Or = (e, t) => { if (e === void 0) throw new Error("Image buffer must be defined"); if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined"); if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet"); let { height: r, width: i } = t, a = t.norm ?? { mean: 255, bias: 0 }, n, s; typeof a.mean == "number" ? n = [a.mean, a.mean, a.mean, a.mean] : n = [a.mean[0], a.mean[1], a.mean[2], a.mean[3] ?? 255], typeof a.bias == "number" ? s = [a.bias, a.bias, a.bias, a.bias] : s = [a.bias[0], a.bias[1], a.bias[2], a.bias[3] ?? 0]; let u = t.format !== void 0 ? t.format : "RGBA", l = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB", p = r * i, f = l === "RGBA" ? new Float32Array(p * 4) : new Float32Array(p * 3), h = 4, g = 0, y = 1, _ = 2, b = 3, S = 0, v = p, w = p * 2, I = -1; u === "RGB" && (h = 3, g = 0, y = 1, _ = 2, b = -1), l === "RGBA" ? I = p * 3 : l === "RBG" ? (S = 0, w = p, v = p * 2) : l === "BGR" && (w = 0, v = p, S = p * 2); for (let T = 0; T < p; T++, g += h, _ += h, y += h, b += h)f[S++] = (e[g] + s[0]) / n[0], f[v++] = (e[y] + s[1]) / n[1], f[w++] = (e[_] + s[2]) / n[2], I !== -1 && b !== -1 && (f[I++] = (e[b] + s[3]) / n[3]); return l === "RGBA" ? new qe("float32", f, [1, 4, r, i]) : new qe("float32", f, [1, 3, r, i]) }, ap = async (e, t) => { let r = typeof HTMLImageElement < "u" && e instanceof HTMLImageElement, i = typeof ImageData < "u" && e instanceof ImageData, a = typeof ImageBitmap < "u" && e instanceof ImageBitmap, n = typeof e == "string", s, u = t ?? {}, l = () => { if (typeof document < "u") return document.createElement("canvas"); if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1); throw new Error("Canvas is not supported") }, p = f => typeof HTMLCanvasElement < "u" && f instanceof HTMLCanvasElement || f instanceof OffscreenCanvas ? f.getContext("2d") : null; if (r) { let f = l(); f.width = e.width, f.height = e.height; let h = p(f); if (h != null) { let g = e.height, y = e.width; if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (g = t.resizedHeight, y = t.resizedWidth), t !== void 0) { if (u = t, t.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement"); u.tensorFormat = "RGBA", u.height = g, u.width = y } else u.tensorFormat = "RGBA", u.height = g, u.width = y; h.drawImage(e, 0, 0), s = h.getImageData(0, 0, y, g).data } else throw new Error("Can not access image data") } else if (i) { let f, h; if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (f = t.resizedHeight, h = t.resizedWidth) : (f = e.height, h = e.width), t !== void 0 && (u = t), u.format = "RGBA", u.height = f, u.width = h, t !== void 0) { let g = l(); g.width = h, g.height = f; let y = p(g); if (y != null) y.putImageData(e, 0, 0), s = y.getImageData(0, 0, h, f).data; else throw new Error("Can not access image data") } else s = e.data } else if (a) { if (t === void 0) throw new Error("Please provide image config with format for Imagebitmap"); let f = l(); f.width = e.width, f.height = e.height; let h = p(f); if (h != null) { let g = e.height, y = e.width; return h.drawImage(e, 0, 0, y, g), s = h.getImageData(0, 0, y, g).data, u.height = g, u.width = y, Or(s, u) } else throw new Error("Can not access image data") } else { if (n) return new Promise((f, h) => { let g = l(), y = p(g); if (!e || !y) return h(); let _ = new Image; _.crossOrigin = "Anonymous", _.src = e, _.onload = () => { g.width = _.width, g.height = _.height, y.drawImage(_, 0, 0, g.width, g.height); let b = y.getImageData(0, 0, g.width, g.height); u.height = g.height, u.width = g.width, f(Or(b.data, u)) } }); throw new Error("Input data provided is not supported - aborted tensor creation") } if (s !== void 0) return Or(s, u); throw new Error("Input data provided is not supported - aborted tensor creation") }, np = (e, t) => { let { width: r, height: i, download: a, dispose: n } = t, s = [1, i, r, 4]; return new qe({ location: "texture", type: "float32", texture: e, dims: s, download: a, dispose: n }) }, sp = (e, t) => { let { dataType: r, dims: i, download: a, dispose: n } = t; return new qe({ location: "gpu-buffer", type: r ?? "float32", gpuBuffer: e, dims: i, download: a, dispose: n }) }, op = (e, t) => { let { dataType: r, dims: i, download: a, dispose: n } = t; return new qe({ location: "ml-tensor", type: r ?? "float32", mlTensor: e, dims: i, download: a, dispose: n }) }, up = (e, t, r) => new qe({ location: "cpu-pinned", type: e, data: t, dims: r ?? [t.length] }) }), Et, dr, Oi, lp, s0 = U(() => { Et = new Map([["float32", Float32Array], ["uint8", Uint8Array], ["int8", Int8Array], ["uint16", Uint16Array], ["int16", Int16Array], ["int32", Int32Array], ["bool", Uint8Array], ["float64", Float64Array], ["uint32", Uint32Array], ["int4", Uint8Array], ["uint4", Uint8Array]]), dr = new Map([[Float32Array, "float32"], [Uint8Array, "uint8"], [Int8Array, "int8"], [Uint16Array, "uint16"], [Int16Array, "int16"], [Int32Array, "int32"], [Float64Array, "float64"], [Uint32Array, "uint32"]]), Oi = !1, lp = () => { if (!Oi) { Oi = !0; let e = typeof BigInt64Array < "u" && BigInt64Array.from, t = typeof BigUint64Array < "u" && BigUint64Array.from, r = globalThis.Float16Array, i = typeof r < "u" && r.from; e && (Et.set("int64", BigInt64Array), dr.set(BigInt64Array, "int64")), t && (Et.set("uint64", BigUint64Array), dr.set(BigUint64Array, "uint64")), i ? (Et.set("float16", r), dr.set(r, "float16")) : Et.set("float16", Uint16Array) } } }), dp, pp, o0 = U(() => { Fa(), dp = e => { let t = 1; for (let r = 0; r < e.length; r++) { let i = e[r]; if (typeof i != "number" || !Number.isSafeInteger(i)) throw new TypeError(`dims[${r}] must be an integer, got: ${i}`); if (i < 0) throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`); t *= i } return t }, pp = (e, t) => { switch (e.location) { case "cpu": return new qe(e.type, e.data, t); case "cpu-pinned": return new qe({ location: "cpu-pinned", data: e.data, type: e.type, dims: t }); case "texture": return new qe({ location: "texture", texture: e.texture, type: e.type, dims: t }); case "gpu-buffer": return new qe({ location: "gpu-buffer", gpuBuffer: e.gpuBuffer, type: e.type, dims: t }); case "ml-tensor": return new qe({ location: "ml-tensor", mlTensor: e.mlTensor, type: e.type, dims: t }); default: throw new Error(`tensorReshape: tensor location ${e.location} is not supported`) } } }), qe, Fa = U(() => { a0(), n0(), s0(), o0(), qe = class { constructor(e, t, r) { lp(); let i, a; if (typeof e == "object" && "location" in e) switch (this.dataLocation = e.location, i = e.type, a = e.dims, e.location) { case "cpu-pinned": { let s = Et.get(i); if (!s) throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`); if (!(e.data instanceof s)) throw new TypeError(`buffer should be of type ${s.name}`); this.cpuData = e.data; break } case "texture": { if (i !== "float32") throw new TypeError(`unsupported type "${i}" to create tensor from texture`); this.gpuTextureData = e.texture, this.downloader = e.download, this.disposer = e.dispose; break } case "gpu-buffer": { if (i !== "float32" && i !== "float16" && i !== "int32" && i !== "int64" && i !== "uint32" && i !== "uint8" && i !== "bool" && i !== "uint4" && i !== "int4") throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`); this.gpuBufferData = e.gpuBuffer, this.downloader = e.download, this.disposer = e.dispose; break } case "ml-tensor": { if (i !== "float32" && i !== "float16" && i !== "int32" && i !== "int64" && i !== "uint32" && i !== "uint64" && i !== "int8" && i !== "uint8" && i !== "bool" && i !== "uint4" && i !== "int4") throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`); this.mlTensorData = e.mlTensor, this.downloader = e.download, this.disposer = e.dispose; break } default: throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`) } else { let s, u; if (typeof e == "string") if (i = e, u = r, e === "string") { if (!Array.isArray(t)) throw new TypeError("A string tensor's data must be a string array."); s = t } else { let l = Et.get(e); if (l === void 0) throw new TypeError(`Unsupported tensor type: ${e}.`); if (Array.isArray(t)) { if (e === "float16" && l === Uint16Array || e === "uint4" || e === "int4") throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`); e === "uint64" || e === "int64" ? s = l.from(t, BigInt) : s = l.from(t) } else if (t instanceof l) s = t; else if (t instanceof Uint8ClampedArray) if (e === "uint8") s = Uint8Array.from(t); else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8"); else if (e === "float16" && t instanceof Uint16Array && l !== Uint16Array) s = new globalThis.Float16Array(t.buffer, t.byteOffset, t.length); else throw new TypeError(`A ${i} tensor's data must be type of ${l}`) } else if (u = t, Array.isArray(e)) { if (e.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array."); let l = typeof e[0]; if (l === "string") i = "string", s = e; else if (l === "boolean") i = "bool", s = Uint8Array.from(e); else throw new TypeError(`Invalid element type of data array: ${l}.`) } else if (e instanceof Uint8ClampedArray) i = "uint8", s = Uint8Array.from(e); else { let l = dr.get(e.constructor); if (l === void 0) throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`); i = l, s = e } if (u === void 0) u = [s.length]; else if (!Array.isArray(u)) throw new TypeError("A tensor's dims must be a number array"); a = u, this.cpuData = s, this.dataLocation = "cpu" } let n = dp(a); if (this.cpuData && n !== this.cpuData.length && !((i === "uint4" || i === "int4") && Math.ceil(n / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`); this.type = i, this.dims = a, this.size = n } static async fromImage(e, t) { return ap(e, t) } static fromTexture(e, t) { return np(e, t) } static fromGpuBuffer(e, t) { return sp(e, t) } static fromMLTensor(e, t) { return op(e, t) } static fromPinnedBuffer(e, t, r) { return up(e, t, r) } toDataURL(e) { return rp(this, e) } toImageData(e) { return ip(this, e) } get data() { if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly."); return this.cpuData } get location() { return this.dataLocation } get texture() { if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture."); return this.gpuTextureData } get gpuBuffer() { if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer."); return this.gpuBufferData } get mlTensor() { if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor."); return this.mlTensorData } async getData(e) { switch (this.ensureValid(), this.dataLocation) { case "cpu": case "cpu-pinned": return this.data; case "texture": case "gpu-buffer": case "ml-tensor": { if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader."); if (this.isDownloading) throw new Error("The current tensor is being downloaded."); try { this.isDownloading = !0; let t = await this.downloader(); return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = t, e && this.disposer && (this.disposer(), this.disposer = void 0), t } finally { this.isDownloading = !1 } } default: throw new Error(`cannot get data from location: ${this.dataLocation}`) } } dispose() { if (this.isDownloading) throw new Error("The current tensor is being downloaded."); this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none" } ensureValid() { if (this.dataLocation === "none") throw new Error("The tensor is disposed.") } reshape(e) { if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource."); return pp(this, e) } } }), Ye, cp = U(() => { Fa(), Ye = qe }), Qr, Ri, at, Je, At, Ot, hp = U(() => { tp(), Qr = (e, t) => { (typeof Ee.trace > "u" ? !Ee.wasm.trace : !Ee.trace) || console.timeStamp(`${e}::ORT::${t}`) }, Ri = (e, t) => { var a; let r = ((a = new Error().stack) == null ? void 0 : a.split(/\r\n|\r|\n/g)) || [], i = !1; for (let n = 0; n < r.length; n++) { if (i && !r[n].includes("TRACE_FUNC")) { let s = `FUNC_${e}::${r[n].trim().split(" ")[1]}`; t && (s += `::${t}`), Qr("CPU", s); return } r[n].includes("TRACE_FUNC") && (i = !0) } }, at = e => { (typeof Ee.trace > "u" ? !Ee.wasm.trace : !Ee.trace) || Ri("BEGIN", e) }, Je = e => { (typeof Ee.trace > "u" ? !Ee.wasm.trace : !Ee.trace) || Ri("END", e) }, At = e => { (typeof Ee.trace > "u" ? !Ee.wasm.trace : !Ee.trace) || console.time(`ORT::${e}`) }, Ot = e => { (typeof Ee.trace > "u" ? !Ee.wasm.trace : !Ee.trace) || console.timeEnd(`ORT::${e}`) } }), fp, u0 = U(() => { Jd(), cp(), hp(), fp = class mp { constructor(t) { this.handler = t } async run(t, r, i) { at(), At("InferenceSession.run"); let a = {}, n = {}; if (typeof t != "object" || t === null || t instanceof Ye || Array.isArray(t)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values."); let s = !0; if (typeof r == "object") { if (r === null) throw new TypeError("Unexpected argument[1]: cannot be null."); if (r instanceof Ye) throw new TypeError("'fetches' cannot be a Tensor"); if (Array.isArray(r)) { if (r.length === 0) throw new TypeError("'fetches' cannot be an empty array."); s = !1; for (let p of r) { if (typeof p != "string") throw new TypeError("'fetches' must be a string array or an object."); if (this.outputNames.indexOf(p) === -1) throw new RangeError(`'fetches' contains invalid output name: ${p}.`); a[p] = null } if (typeof i == "object" && i !== null) n = i; else if (typeof i < "u") throw new TypeError("'options' must be an object.") } else { let p = !1, f = Object.getOwnPropertyNames(r); for (let h of this.outputNames) if (f.indexOf(h) !== -1) { let g = r[h]; (g === null || g instanceof Ye) && (p = !0, s = !1, a[h] = g) } if (p) { if (typeof i == "object" && i !== null) n = i; else if (typeof i < "u") throw new TypeError("'options' must be an object.") } else n = r } } else if (typeof r < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'."); for (let p of this.inputNames) if (typeof t[p] > "u") throw new Error(`input '${p}' is missing in 'feeds'.`); if (s) for (let p of this.outputNames) a[p] = null; let u = await this.handler.run(t, a, n), l = {}; for (let p in u) if (Object.hasOwnProperty.call(u, p)) { let f = u[p]; f instanceof Ye ? l[p] = f : l[p] = new Ye(f.type, f.data, f.dims) } return Ot("InferenceSession.run"), Je(), l } async release() { return this.handler.dispose() } static async create(t, r, i, a) { at(), At("InferenceSession.create"); let n, s = {}; if (typeof t == "string") { if (n = t, typeof r == "object" && r !== null) s = r; else if (typeof r < "u") throw new TypeError("'options' must be an object.") } else if (t instanceof Uint8Array) { if (n = t, typeof r == "object" && r !== null) s = r; else if (typeof r < "u") throw new TypeError("'options' must be an object.") } else if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) { let f = t, h = 0, g = t.byteLength; if (typeof r == "object" && r !== null) s = r; else if (typeof r == "number") { if (h = r, !Number.isSafeInteger(h)) throw new RangeError("'byteOffset' must be an integer."); if (h < 0 || h >= f.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`); if (g = t.byteLength - h, typeof i == "number") { if (g = i, !Number.isSafeInteger(g)) throw new RangeError("'byteLength' must be an integer."); if (g <= 0 || h + g > f.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength - h}].`); if (typeof a == "object" && a !== null) s = a; else if (typeof a < "u") throw new TypeError("'options' must be an object.") } else if (typeof i < "u") throw new TypeError("'byteLength' must be a number.") } else if (typeof r < "u") throw new TypeError("'options' must be an object."); n = new Uint8Array(f, h, g) } else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'."); let [u, l] = await Yd(s), p = await u.createInferenceSessionHandler(n, l); return Ot("InferenceSession.create"), Je(), new mp(p) } startProfiling() { this.handler.startProfiling() } endProfiling() { this.handler.endProfiling() } get inputNames() { return this.handler.inputNames } get outputNames() { return this.handler.outputNames } get inputMetadata() { return this.handler.inputMetadata } get outputMetadata() { return this.handler.outputMetadata } } }), ja, l0 = U(() => { u0(), ja = fp }), d0 = U(() => { }), p0 = U(() => { }), c0 = U(() => { }), h0 = U(() => { }), f0 = {}; jt(f0, { InferenceSession: () => ja, TRACE: () => Qr, TRACE_EVENT_BEGIN: () => At, TRACE_EVENT_END: () => Ot, TRACE_FUNC_BEGIN: () => at, TRACE_FUNC_END: () => Je, Tensor: () => Ye, env: () => $e, registerBackend: () => Vt }); var Ge = U(() => { t0(), i0(), l0(), cp(), d0(), p0(), hp(), c0(), h0() }), Ka = U(() => { }), gp = {}; jt(gp, { default: () => yp }); var Bi, Ni, yp, m0 = U(() => { var e; xf(), Dt(), Xa(), Bi = "ort-wasm-proxy-worker", Ni = ((e = globalThis.self) == null ? void 0 : e.name) === Bi, Ni && (self.onmessage = t => { let { type: r, in: i } = t.data; try { switch (r) { case "init-wasm": Za(i.wasm).then(() => { fn(i).then(() => { postMessage({ type: r }) }, a => { postMessage({ type: r, err: a }) }) }, a => { postMessage({ type: r, err: a }) }); break; case "init-ep": { let { epName: a, env: n } = i; mn(n, a).then(() => { postMessage({ type: r }) }, s => { postMessage({ type: r, err: s }) }); break } case "copy-from": { let { buffer: a } = i, n = ai(a); postMessage({ type: r, out: n }); break } case "create": { let { model: a, options: n } = i; gn(a, n).then(s => { postMessage({ type: r, out: s }) }, s => { postMessage({ type: r, err: s }) }); break } case "release": yn(i), postMessage({ type: r }); break; case "run": { let { sessionId: a, inputIndices: n, inputs: s, outputIndices: u, options: l } = i; _n(a, n, s, u, new Array(u.length).fill(null), l).then(p => { p.some(f => f[3] !== "cpu") ? postMessage({ type: r, err: "Proxy does not support non-cpu tensor location." }) : postMessage({ type: r, out: p }, wn([...s, ...p])) }, p => { postMessage({ type: r, err: p }) }); break } case "end-profiling": bn(i), postMessage({ type: r }); break; default: } } catch (a) { postMessage({ type: r, err: a }) } }), yp = Ni ? null : t => new Worker(t ?? Pe, { type: "module", name: Bi }) }), _p = {}; jt(_p, { default: () => bp }); async function yo(e = {}) {
  var ho, fo; var t = e, r = !!globalThis.window, i = !!globalThis.WorkerGlobalScope, a = i && ((ho = self.name) == null ? void 0 : ho.startsWith("em-pthread")); t.mountExternalData = (o, d) => { o.startsWith("./") && (o = o.substring(2)), (t.Xc || (t.Xc = new Map)).set(o, d) }, t.unmountExternalData = () => { delete t.Xc }, globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({ initial: 0, maximum: 0, Yd: !0 }).buffer.constructor; let n = o => async (...d) => {
    var m; try {
      if (t.Yc) throw Error("Session already started"); let c = t.Yc = { Kd: d[0], errors: [] }, $ = await o(...d); if (t.Yc !== c) throw Error("Session mismatch"); (m = t.dd) == null || m.flush(); let k = c.errors; if (0 < k.length) {
        let z = await Promise.all(k); if (z = z.filter(B => B), 0 < z.length) throw Error(z.join(`
`))
      } return $
    } finally { t.Yc = null }
  }; t.jsepInit = (o, d) => { if (o === "webgpu") { [t.dd, t.Ad, t.Ed, t.ed, t.Dd, t.$b, t.Fd, t.Hd, t.Bd, t.Cd, t.Gd] = d; let m = t.dd; t.jsepRegisterBuffer = (c, $, k, z) => m.registerBuffer(c, $, k, z), t.jsepGetBuffer = c => m.getBuffer(c), t.jsepCreateDownloader = (c, $, k) => m.createDownloader(c, $, k), t.jsepOnCreateSession = c => { m.onCreateSession(c) }, t.jsepOnReleaseSession = c => { m.onReleaseSession(c) }, t.jsepOnRunStart = c => m.onRunStart(c), t.Id = (c, $) => { m.upload(c, $) } } else if (o === "webnn") { let m = d[0];[t.Wd, t.sd, t.webnnEnsureTensor, t.td, t.webnnDownloadTensor, t.Rd, t.webnnEnableTraceEvent] = d.slice(1), t.webnnReleaseTensorId = t.sd, t.webnnUploadTensor = t.td, t.webnnRegisterMLContext = t.Rd, t.webnnOnRunStart = c => m.onRunStart(c), t.webnnOnRunEnd = m.onRunEnd.bind(m), t.webnnOnReleaseSession = c => { m.onReleaseSession(c) }, t.webnnCreateMLTensorDownloader = (c, $) => m.createMLTensorDownloader(c, $), t.webnnRegisterMLTensor = (c, $, k, z) => m.registerMLTensor(c, $, k, z), t.webnnCreateMLContext = c => m.createMLContext(c), t.webnnRegisterMLConstant = (c, $, k, z, B, L) => m.registerMLConstant(c, $, k, z, B, t.Xc, L), t.webnnRegisterGraphInput = m.registerGraphInput.bind(m), t.webnnIsGraphInput = m.isGraphInput.bind(m), t.webnnRegisterGraphOutput = m.registerGraphOutput.bind(m), t.webnnIsGraphOutput = m.isGraphOutput.bind(m), t.webnnCreateTemporaryTensor = m.createTemporaryTensor.bind(m), t.webnnIsGraphInputOutputTypeSupported = m.isGraphInputOutputTypeSupported.bind(m) } }; let s = () => { let o = d => (...m) => { let c = tt; return m = d(...m), tt != c ? new Promise(($, k) => { mi = { resolve: $, reject: k } }) : m }; (() => { for (let d of ["_OrtAppendExecutionProvider", "_OrtCreateSession", "_OrtRun", "_OrtRunWithBinding", "_OrtBindInput"]) t[d] = o(t[d]) })(), n !== void 0 && (t._OrtRun = n(t._OrtRun), t._OrtRunWithBinding = n(t._OrtRunWithBinding)), s = void 0 }; t.asyncInit = () => { s == null || s() }; var u, l, p = (o, d) => { throw d }, f = "", h = ""; if (r || i) { try { h = new URL(".", f).href } catch { } i && (l = o => { var d = new XMLHttpRequest; return d.open("GET", o, !1), d.responseType = "arraybuffer", d.send(null), new Uint8Array(d.response) }), u = async o => { if (A(o)) return new Promise((m, c) => { var $ = new XMLHttpRequest; $.open("GET", o, !0), $.responseType = "arraybuffer", $.onload = () => { $.status == 200 || $.status == 0 && $.response ? m($.response) : c($.status) }, $.onerror = c, $.send(null) }); var d = await fetch(o, { credentials: "same-origin" }); if (d.ok) return d.arrayBuffer(); throw Error(d.status + " : " + d.url) } } var g, y, _, b, S, v, w = console.log.bind(console), I = console.error.bind(console), T = w, E = I, C = !1, A = o => o.startsWith("file://"); function x() { ct.buffer != D.buffer && V() } if (a) { let o = function (d) { try { var m = d.data, c = m.Sc; if (c === "load") { let $ = []; self.onmessage = k => $.push(k), v = () => { postMessage({ Sc: "loaded" }); for (let k of $) o(k); self.onmessage = o }; for (let k of m.xd) t[k] && !t[k].proxy || (t[k] = (...z) => { postMessage({ Sc: "callHandler", wd: k, args: z }) }, k == "print" && (T = t[k]), k == "printErr" && (E = t[k])); ct = m.Od, V(), y = m.Pd, We(), Ar() } else if (c === "run") { (function ($) { var k = (x(), K)[$ + 52 >>> 2 >>> 0]; $ = (x(), K)[$ + 56 >>> 2 >>> 0], vs(k, k - $), se(k) })(m.Rc), wi(m.Rc, 0, 0, 1, 0, 0), xn(), ci(m.Rc), M || (gs(), M = !0); try { Mf(m.Md, m.bd) } catch ($) { if ($ != "unwind") throw $ } } else m.target !== "setimmediate" && (c === "checkMailbox" ? M && Sr() : c && (E(`worker: received unknown command ${c}`), E(m))) } catch ($) { throw ys(), $ } }; var M = !1; self.onunhandledrejection = d => { throw d.reason || d }, self.onmessage = o } var D, H, F, j, R, K, X, ee, he, W, ue, P = !1; function V() { var o = ct.buffer; t.HEAP8 = D = new Int8Array(o), F = new Int16Array(o), t.HEAPU8 = H = new Uint8Array(o), j = new Uint16Array(o), t.HEAP32 = R = new Int32Array(o), t.HEAPU32 = K = new Uint32Array(o), X = new Float32Array(o), ee = new Float64Array(o), he = new BigInt64Array(o), W = new BigUint64Array(o) } function Z() { P = !0, a ? v() : st.sb() } function q(o) { throw E(o = "Aborted(" + o + ")"), C = !0, o = new WebAssembly.RuntimeError(o + ". Build with -sASSERTIONS for more info."), S == null || S(o), o } function me() { return { a: { la: ng, gb: ag, g: Df, J: Uf, f: Pf, p: qf, h: Lf, ga: Wf, b: Vf, S: Gf, Ha: zn, n: Hf, _: Rn, Xa: Bn, Da: Nn, Fa: Mn, Ya: Dn, Va: Un, Oa: Pn, Ua: qn, ja: Ln, Ea: Wn, Ba: Vn, Wa: Gn, Ca: Hn, bb: Ff, da: jf, wa: Kf, ua: Zf, ca: Yf, O: Jf, H: em, va: tm, Z: um, xa: lm, Ra: dm, za: cm, Ia: hm, sa: fm, ea: mm, Qa: ci, _a: gm, Q: wm, r: km, c: di, hb: Tm, y: Im, M: Em, D: zm, l: Cm, s: Jn, ib: Am, I: Om, R: Rm, j: Bm, u: Nm, q: Mm, k: Dm, La: Um, Ma: Pm, Na: qm, Ja: is, Ka: as, ta: ns, db: Wm, ab: Gm, v: Hm, $: Fm, fa: jm, $a: Vm, V: Km, Za: Xm, Aa: Zm, F: Lm, T: Qm, ka: zr, ya: Jm, fb: Ym, eb: eg, Sa: ls, Ta: ds, Ga: Kt, U: ps, ia: cs, Pa: hs, ha: fs, kb: Lg, ma: Mg, lb: qg, na: Ng, G: kg, e: lg, t: og, w: sg, B: bg, mb: Og, K: vg, x: cg, oa: Rg, X: Dg, aa: Ag, nb: Cg, ob: zg, qa: Tg, pa: Eg, pb: Ig, N: xg, Y: Bg, d: ug, A: pg, m: dg, jb: Wg, o: fg, z: mg, C: hg, E: gg, L: wg, qb: Sg, P: Ug, ba: $g, W: Pg, rb: _g, ra: yg, i: rg, a: ct, cb: Ue } } } async function We() { function o(c, $) { var k = st = c.exports; c = {}; for (let [z, B] of Object.entries(k)) typeof B == "function" ? (k = ym(B), c[z] = k) : c[z] = B; return st = c, st = function () { var z = st, B = G => ne => G(ne) >>> 0, L = G => () => G() >>> 0; return (z = Object.assign({}, z)).tb = B(z.tb), z.Xb = L(z.Xb), z.Zb = B(z.Zb), z.lc = B(z.lc), z.mc = L(z.mc), z.qc = B(z.qc), z }(), $n.push(st._b), ms = (c = st).tb, gs = c.ub, t._OrtInit = c.vb, t._OrtGetLastError = c.wb, t._OrtCreateSessionOptions = c.xb, t._OrtAppendExecutionProvider = c.yb, t._OrtAddFreeDimensionOverride = c.zb, t._OrtAddSessionConfigEntry = c.Ab, t._OrtReleaseSessionOptions = c.Bb, t._OrtCreateSession = c.Cb, t._OrtReleaseSession = c.Db, t._OrtGetInputOutputCount = c.Eb, t._OrtGetInputOutputMetadata = c.Fb, t._OrtFree = c.Gb, t._OrtCreateTensor = c.Hb, t._OrtGetTensorData = c.Ib, t._OrtReleaseTensor = c.Jb, t._OrtCreateRunOptions = c.Kb, t._OrtAddRunConfigEntry = c.Lb, t._OrtReleaseRunOptions = c.Mb, t._OrtCreateBinding = c.Nb, t._OrtBindInput = c.Ob, t._OrtBindOutput = c.Pb, t._OrtClearBoundOutputs = c.Qb, t._OrtReleaseBinding = c.Rb, t._OrtRunWithBinding = c.Sb, t._OrtRun = c.Tb, t._OrtEndProfiling = c.Ub, t._JsepOutput = c.Vb, t._JsepGetNodeName = c.Wb, Cr = c.Xb, rt = t._free = c.Yb, Qt = t._malloc = c.Zb, wi = c.ac, ys = c.bc, _s = c.cc, bs = c.dc, $i = c.ec, ws = c.fc, $s = c.gc, le = c.hc, Yt = c.ic, vs = c.jc, se = c.kc, vi = c.lc, oe = c.mc, xs = c.nc, xi = c.oc, Ss = c.pc, ks = c.qc, Ts = c.rc, Si = c.sc, Is = c.tc, Es = c.uc, zs = c.vc, Cs = c.wc, As = c.xc, Os = c.yc, Rs = c.zc, Bs = c.Ac, Ns = c.Bc, Ms = c.Cc, Ds = c.Dc, Us = c.Ec, Ps = c.Fc, qs = c.Gc, Ls = c.Hc, Ws = c.Ic, Vs = c.Jc, Gs = c.Kc, Hs = c.Lc, Fs = c.Mc, js = c.Nc, Ks = c.Pc, Xs = c.Qc, Zs = c.$c, Qs = c.ad, Ys = c.fd, Js = c.jd, eo = c.kd, to = c.ld, ro = c.md, io = c.nd, ao = c.od, no = c.pd, so = c.qd, oo = c.vd, uo = c.Sd, lo = c.Td, po = c.Ud, co = c.Vd, y = $, st } var d, m = me(); return t.instantiateWasm ? new Promise(c => { t.instantiateWasm(m, ($, k) => { c(o($, k)) }) }) : a ? o(new WebAssembly.Instance(y, me()), y) : (ue ?? (ue = t.locateFile ? t.locateFile ? t.locateFile("ort-wasm-simd-threaded.jsep.wasm", h) : h + "ort-wasm-simd-threaded.jsep.wasm" : new URL("/assets/ort-wasm-simd-threaded.jsep-B5xtfCw5.wasm", "").href), d = await async function (c) { var $ = ue; if (!g && !A($)) try { var k = fetch($, { credentials: "same-origin" }); return await WebAssembly.instantiateStreaming(k, c) } catch (z) { E(`wasm streaming compile failed: ${z}`), E("falling back to ArrayBuffer instantiation") } return async function (z, B) { try { var L = await async function (G) { if (!g) try { var ne = await u(G); return new Uint8Array(ne) } catch { } if (G == ue && g) G = new Uint8Array(g); else { if (!l) throw "both async and sync fetching of the wasm failed"; G = l(G) } return G }(z); return await WebAssembly.instantiate(L, B) } catch (G) { E(`failed to asynchronously prepare wasm: ${G}`), q(G) } }($, c) }(m), o(d.instance, d.module)) } class Se { constructor(d) { mo(this, "name", "ExitStatus"); this.message = `Program terminated with exit(${d})`, this.status = d } } var Oe = o => { o.terminate(), o.onmessage = () => { } }, Re = [], De = 0, Be = null, dt = o => { pt.length == 0 && (kn(), Sn(pt[0])); var d = pt.pop(); if (!d) return 6; Xt.push(d), $t[o.Rc] = d, d.Rc = o.Rc; var m = { Sc: "run", Md: o.Ld, bd: o.bd, Rc: o.Rc }; return d.postMessage(m, o.rd), 0 }, be = 0, re = (o, d, ...m) => { var c, $ = 16 * m.length, k = oe(), z = vi($), B = z >>> 3; for (c of m) typeof c == "bigint" ? ((x(), he)[B++ >>> 0] = 1n, (x(), he)[B++ >>> 0] = c) : ((x(), he)[B++ >>> 0] = 0n, (x(), ee)[B++ >>> 0] = c); return o = _s(o, 0, $, z, d), se(k), o }; function Ue(o) { if (a) return re(0, 1, o); if (_ = o, !(0 < be)) { for (var d of Xt) Oe(d); for (d of pt) Oe(d); pt = [], Xt = [], $t = {}, C = !0 } p(0, new Se(o)) } function br(o) { if (a) return re(1, 0, o); Kt(o) } var Kt = o => { if (_ = o, a) throw br(o), "unwind"; Ue(o) }, pt = [], Xt = [], $n = [], $t = {}, vn = o => { var d = o.Rc; delete $t[d], pt.push(o), Xt.splice(Xt.indexOf(o), 1), o.Rc = 0, bs(d) }; function xn() { $n.forEach(o => o()) } var Sn = o => new Promise(d => { o.onmessage = $ => { var k = $.data; if ($ = k.Sc, k.Zc && k.Zc != Cr()) { var z = $t[k.Zc]; z ? z.postMessage(k, k.rd) : E(`Internal error! Worker sent a message "${$}" to target pthread ${k.Zc}, but that thread no longer exists!`) } else $ === "checkMailbox" ? Sr() : $ === "spawnThread" ? dt(k) : $ === "cleanupThread" ? xr(() => { vn($t[k.Nd]) }) : $ === "loaded" ? (o.loaded = !0, d(o)) : k.target === "setimmediate" ? o.postMessage(k) : $ === "uncaughtException" ? o.onerror(k.error) : $ === "callHandler" ? t[k.wd](...k.args) : $ && E(`worker sent an unknown command ${$}`) }, o.onerror = $ => { throw E(`worker sent an error! ${$.filename}:${$.lineno}: ${$.message}`), $ }; var m, c = []; for (m of []) t.propertyIsEnumerable(m) && c.push(m); o.postMessage({ Sc: "load", xd: c, Od: ct, Pd: y }) }); function kn() { var o = new Worker((() => { let d = URL; return new URL("") })(), { type: "module", workerData: "em-pthread", name: "em-pthread" }); pt.push(o) } var ct, Mf = (o, d) => { be = 0, o = Si(o, d), 0 < be ? _ = o : $i(o) }, wr = [], $r = 0; function Df(o) { var d = new si(o >>>= 0); return (x(), D)[d.Tc + 12 >>> 0] == 0 && (Tn(d, !0), $r--), In(d, !1), wr.push(d), ks(o) } var Pt = 0, Uf = () => { le(0, 0); var o = wr.pop(); xs(o.cd), Pt = 0 }; function Tn(o, d) { d = d ? 1 : 0, (x(), D)[o.Tc + 12 >>> 0] = d } function In(o, d) { d = d ? 1 : 0, (x(), D)[o.Tc + 13 >>> 0] = d } class si { constructor(d) { this.cd = d, this.Tc = d - 24 } } var oi = o => { var d = Pt; if (!d) return Yt(0), 0; var m = new si(d); (x(), K)[m.Tc + 16 >>> 2 >>> 0] = d; var c = (x(), K)[m.Tc + 4 >>> 2 >>> 0]; if (!c) return Yt(0), d; for (var $ of o) { if ($ === 0 || $ === c) break; if (Ss($, c, m.Tc + 16)) return Yt($), d } return Yt(c), d }; function Pf() { return oi([]) } function qf(o) { return oi([o >>> 0]) } function Lf(o, d, m, c) { return oi([o >>> 0, d >>> 0, m >>> 0, c >>> 0]) } var Wf = () => { var o = wr.pop(); o || q("no exception to throw"); var d = o.cd; throw (x(), D)[o.Tc + 13 >>> 0] == 0 && (wr.push(o), In(o, !0), Tn(o, !1), $r++), xi(d), Pt = d }; function Vf(o, d, m) { var c = new si(o >>>= 0); throw d >>>= 0, m >>>= 0, (x(), K)[c.Tc + 16 >>> 2 >>> 0] = 0, (x(), K)[c.Tc + 4 >>> 2 >>> 0] = d, (x(), K)[c.Tc + 8 >>> 2 >>> 0] = m, xi(o), $r++, Pt = o } var Gf = () => $r; function En(o, d, m, c) { return a ? re(2, 1, o, d, m, c) : zn(o, d, m, c) } function zn(o, d, m, c) { if (o >>>= 0, d >>>= 0, m >>>= 0, c >>>= 0, !globalThis.SharedArrayBuffer) return 6; var $ = []; return a && $.length === 0 ? En(o, d, m, c) : (o = { Ld: m, Rc: o, bd: c, rd: $ }, a ? (o.Sc = "spawnThread", postMessage(o, $), 0) : dt(o)) } function Hf(o) { throw Pt || (Pt = o >>> 0), Pt } var Cn = globalThis.TextDecoder && new TextDecoder, An = (o, d, m, c) => { if (m = d + m, c) return m; for (; o[d] && !(d >= m);)++d; return d }, On = (o, d = 0, m, c) => { if (16 < (m = An(o, d >>>= 0, m, c)) - d && o.buffer && Cn) return Cn.decode(o.buffer instanceof ArrayBuffer ? o.subarray(d, m) : o.slice(d, m)); for (c = ""; d < m;) { var $ = o[d++]; if (128 & $) { var k = 63 & o[d++]; if ((224 & $) == 192) c += String.fromCharCode((31 & $) << 6 | k); else { var z = 63 & o[d++]; 65536 > ($ = (240 & $) == 224 ? (15 & $) << 12 | k << 6 | z : (7 & $) << 18 | k << 12 | z << 6 | 63 & o[d++]) ? c += String.fromCharCode($) : ($ -= 65536, c += String.fromCharCode(55296 | $ >> 10, 56320 | 1023 & $)) } } else c += String.fromCharCode($) } return c }, ke = (o, d, m) => (o >>>= 0) ? On((x(), H), o, d, m) : ""; function Rn(o, d, m) { return a ? re(3, 1, o, d, m) : 0 } function Bn(o, d) { if (a) return re(4, 1, o, d) } function Nn(o, d) { if (a) return re(5, 1, o, d) } function Mn(o, d, m) { if (a) return re(6, 1, o, d, m) } function Dn(o, d, m) { return a ? re(7, 1, o, d, m) : 0 } function Un(o, d) { if (a) return re(8, 1, o, d) } function Pn(o, d, m) { if (a) return re(9, 1, o, d, m) } function qn(o, d, m, c) { if (a) return re(10, 1, o, d, m, c) } function Ln(o, d, m, c) { if (a) return re(11, 1, o, d, m, c) } function Wn(o, d, m, c) { if (a) return re(12, 1, o, d, m, c) } function Vn(o) { if (a) return re(13, 1, o) } function Gn(o, d) { if (a) return re(14, 1, o, d) } function Hn(o, d, m) { if (a) return re(15, 1, o, d, m) } var Ff = () => q(""), et = o => { o >>>= 0; for (var d = ""; ;) { var m = (x(), H)[o++ >>> 0]; if (!m) return d; d += String.fromCharCode(m) } }, ui = {}, li = {}, qt = class extends Error { constructor(o) { super(o), this.name = "BindingError" } }; function nt(o, d, m = {}) { return function (c, $, k = {}) { var z = $.name; if (!c) throw new qt(`type "${z}" must have a positive integer typeid pointer`); if (li.hasOwnProperty(c)) { if (k.yd) return; throw new qt(`Cannot register type '${z}' twice`) } li[c] = $, ui.hasOwnProperty(c) && ($ = ui[c], delete ui[c], $.forEach(B => B())) }(o, d, m) } var Fn = (o, d, m) => { switch (d) { case 1: return m ? c => (x(), D)[c >>> 0] : c => (x(), H)[c >>> 0]; case 2: return m ? c => (x(), F)[c >>> 1 >>> 0] : c => (x(), j)[c >>> 1 >>> 0]; case 4: return m ? c => (x(), R)[c >>> 2 >>> 0] : c => (x(), K)[c >>> 2 >>> 0]; case 8: return m ? c => (x(), he)[c >>> 3 >>> 0] : c => (x(), W)[c >>> 3 >>> 0]; default: throw new TypeError(`invalid integer width (${d}): ${o}`) } }; function jf(o, d, m, c, $) { o >>>= 0, m >>>= 0, d = et(d >>> 0); let k = z => z; if (c = c === 0n) { let z = 8 * m; k = B => BigInt.asUintN(z, B), $ = k($) } nt(o, { name: d, Oc: k, Vc: (z, B) => (typeof B == "number" && (B = BigInt(B)), B), Uc: Fn(d, m, !c), Wc: null }) } function Kf(o, d, m, c) { nt(o >>>= 0, { name: d = et(d >>> 0), Oc: function ($) { return !!$ }, Vc: function ($, k) { return k ? m : c }, Uc: function ($) { return this.Oc((x(), H)[$ >>> 0]) }, Wc: null }) } var jn = [], vt = [0, 1, , 1, null, 1, !0, 1, !1, 1]; function di(o) { 9 < (o >>>= 0) && --vt[o + 1] == 0 && (vt[o] = void 0, jn.push(o)) } var Ve = o => { if (!o) throw new qt(`Cannot use deleted val. handle = ${o}`); return vt[o] }, He = o => { switch (o) { case void 0: return 2; case null: return 4; case !0: return 6; case !1: return 8; default: let d = jn.pop() || vt.length; return vt[d] = o, vt[d + 1] = 1, d } }; function pi(o) { return this.Oc((x(), K)[o >>> 2 >>> 0]) } var Xf = { name: "emscripten::val", Oc: o => { var d = Ve(o); return di(o), d }, Vc: (o, d) => He(d), Uc: pi, Wc: null }; function Zf(o) { return nt(o >>> 0, Xf) } var Qf = (o, d) => { switch (d) { case 4: return function (m) { return this.Oc((x(), X)[m >>> 2 >>> 0]) }; case 8: return function (m) { return this.Oc((x(), ee)[m >>> 3 >>> 0]) }; default: throw new TypeError(`invalid float width (${d}): ${o}`) } }; function Yf(o, d, m) { m >>>= 0, nt(o >>>= 0, { name: d = et(d >>> 0), Oc: c => c, Vc: (c, $) => $, Uc: Qf(d, m), Wc: null }) } function Jf(o, d, m, c, $) { o >>>= 0, m >>>= 0, d = et(d >>> 0); let k = B => B; if (c === 0) { var z = 32 - 8 * m; k = B => B << z >>> z, $ = k($) } nt(o, { name: d, Oc: k, Vc: (B, L) => L, Uc: Fn(d, m, c !== 0), Wc: null }) } function em(o, d, m) { function c(k) { var z = (x(), K)[k >>> 2 >>> 0]; return k = (x(), K)[k + 4 >>> 2 >>> 0], new $((x(), D).buffer, k, z) } var $ = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][d]; nt(o >>>= 0, { name: m = et(m >>> 0), Oc: c, Uc: c }, { yd: !0 }) } var ht = (o, d, m) => { var c = (x(), H); if (d >>>= 0, 0 < m) { var $ = d; m = d + m - 1; for (var k = 0; k < o.length; ++k) { var z = o.codePointAt(k); if (127 >= z) { if (d >= m) break; c[d++ >>> 0] = z } else if (2047 >= z) { if (d + 1 >= m) break; c[d++ >>> 0] = 192 | z >> 6, c[d++ >>> 0] = 128 | 63 & z } else if (65535 >= z) { if (d + 2 >= m) break; c[d++ >>> 0] = 224 | z >> 12, c[d++ >>> 0] = 128 | z >> 6 & 63, c[d++ >>> 0] = 128 | 63 & z } else { if (d + 3 >= m) break; c[d++ >>> 0] = 240 | z >> 18, c[d++ >>> 0] = 128 | z >> 12 & 63, c[d++ >>> 0] = 128 | z >> 6 & 63, c[d++ >>> 0] = 128 | 63 & z, k++ } } c[d >>> 0] = 0, o = d - $ } else o = 0; return o }, vr = o => { for (var d = 0, m = 0; m < o.length; ++m) { var c = o.charCodeAt(m); 127 >= c ? d++ : 2047 >= c ? d += 2 : 55296 <= c && 57343 >= c ? (d += 4, ++m) : d += 3 } return d }; function tm(o, d) { nt(o >>>= 0, { name: d = et(d >>> 0), Oc(m) { var c = (x(), K)[m >>> 2 >>> 0]; return c = ke(m + 4, c, !0), rt(m), c }, Vc(m, c) { c instanceof ArrayBuffer && (c = new Uint8Array(c)); var $ = typeof c == "string"; if (!($ || ArrayBuffer.isView(c) && c.BYTES_PER_ELEMENT == 1)) throw new qt("Cannot pass non-string to std::string"); var k = $ ? vr(c) : c.length, z = Qt(4 + k + 1), B = z + 4; return (x(), K)[z >>> 2 >>> 0] = k, $ ? ht(c, B, k + 1) : (x(), H).set(c, B >>> 0), m !== null && m.push(rt, z), z }, Uc: pi, Wc(m) { rt(m) } }) } var Kn = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, rm = (o, d, m) => { if (o >>>= 1, 16 < (d = An((x(), j), o, d / 2, m)) - o && Kn) return Kn.decode((x(), j).slice(o, d)); for (m = ""; o < d; ++o) { var c = (x(), j)[o >>> 0]; m += String.fromCharCode(c) } return m }, im = (o, d, m) => { if (m ?? (m = 2147483647), 2 > m) return 0; var c = d; m = (m -= 2) < 2 * o.length ? m / 2 : o.length; for (var $ = 0; $ < m; ++$) { var k = o.charCodeAt($); (x(), F)[d >>> 1 >>> 0] = k, d += 2 } return (x(), F)[d >>> 1 >>> 0] = 0, d - c }, am = o => 2 * o.length, nm = (o, d, m) => { var c = ""; o >>>= 2; for (var $ = 0; !($ >= d / 4); $++) { var k = (x(), K)[o + $ >>> 0]; if (!k && !m) break; c += String.fromCodePoint(k) } return c }, sm = (o, d, m) => { if (d >>>= 0, m ?? (m = 2147483647), 4 > m) return 0; var c = d; m = c + m - 4; for (var $ = 0; $ < o.length; ++$) { var k = o.codePointAt($); if (65535 < k && $++, (x(), R)[d >>> 2 >>> 0] = k, (d += 4) + 4 > m) break } return (x(), R)[d >>> 2 >>> 0] = 0, d - c }, om = o => { for (var d = 0, m = 0; m < o.length; ++m)65535 < o.codePointAt(m) && m++, d += 4; return d }; function um(o, d, m) { if (o >>>= 0, d >>>= 0, m = et(m >>>= 0), d === 2) var c = rm, $ = im, k = am; else c = nm, $ = sm, k = om; nt(o, { name: m, Oc: z => { var B = (x(), K)[z >>> 2 >>> 0]; return B = c(z + 4, B * d, !0), rt(z), B }, Vc: (z, B) => { if (typeof B != "string") throw new qt(`Cannot pass non-string to C++ string type ${m}`); var L = k(B), G = Qt(4 + L + d); return (x(), K)[G >>> 2 >>> 0] = L / d, $(B, G + 4, L + d), z !== null && z.push(rt, G), G }, Uc: pi, Wc(z) { rt(z) } }) } function lm(o, d) { nt(o >>>= 0, { zd: !0, name: d = et(d >>> 0), Oc: () => { }, Vc: () => { } }) } function dm(o) { wi(o >>> 0, !i, 1, !r, 131072, !1), xn() } var xr = o => { if (!C) try { if (o(), !(0 < be)) try { a ? Cr() && $i(_) : Kt(_) } catch (d) { d instanceof Se || d == "unwind" || p(0, d) } } catch (d) { d instanceof Se || d == "unwind" || p(0, d) } }, pm = !Atomics.waitAsync || ((fo = globalThis.navigator) == null ? void 0 : fo.userAgent) && 91 > Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./) || [])[2]); function ci(o) { o >>>= 0, pm || (Atomics.waitAsync((x(), R), o >>> 2, o).value.then(Sr), o += 128, Atomics.store((x(), R), o >>> 2, 1)) } var Sr = () => xr(() => { var o = Cr(); o && (ci(o), $s()) }); function cm(o, d) { (o >>>= 0) == d >>> 0 ? setTimeout(Sr) : a ? postMessage({ Zc: o, Sc: "checkMailbox" }) : (o = $t[o]) && o.postMessage({ Sc: "checkMailbox" }) } var hi = []; function hm(o, d, m, c, $) { for (d >>>= 0, $ >>>= 0, hi.length = 0, m = $ >>> 3, c = $ + c >>> 3; m < c;) { var k; k = (x(), he)[m++ >>> 0] ? (x(), he)[m++ >>> 0] : (x(), ee)[m++ >>> 0], hi.push(k) } return (d ? ki[d] : ig[o])(...hi) } var fm = () => { be = 0 }; function mm(o) { o >>>= 0, a ? postMessage({ Sc: "cleanupThread", Nd: o }) : vn($t[o]) } function gm(o) { } var kr = o => { try { o() } catch (d) { q(d) } }; function ym(o) { var d = (...m) => { Tr.push(o); try { return o(...m) } finally { C || (Tr.pop(), tt && ft === 1 && Tr.length === 0 && (ft = 0, be += 1, kr(lo), typeof Fibers < "u" && Fibers.$d())) } }; return Qn.set(o, d), d } var ft = 0, tt = null, Xn = 0, Tr = [], fi = new Map, Zn = new Map, Qn = new Map, _m = 0, mi = null, bm = [], Yn = o => function (d) { if (!C) { if (ft === 0) { var m = !1, c = !1; d(($ = 0) => { if (!C && (Xn = $, m = !0, c)) { ft = 2, kr(() => po(tt)), typeof MainLoop < "u" && MainLoop.ud && MainLoop.resume(), $ = !1; try { var k = function () { var L = (x(), R)[tt + 8 >>> 2 >>> 0]; return L = Zn.get(L), L = Qn.get(L), --be, L() }() } catch (L) { k = L, $ = !0 } var z = !1; if (!tt) { var B = mi; B && (mi = null, ($ ? B.reject : B.resolve)(k), z = !0) } if ($ && !z) throw k } }), c = !0, m || (ft = 1, tt = function () { var $ = Qt(65548), k = $ + 12; if ((x(), K)[$ >>> 2 >>> 0] = k, (x(), K)[$ + 4 >>> 2 >>> 0] = k + 65536, k = Tr[0], !fi.has(k)) { var z = _m++; fi.set(k, z), Zn.set(z, k) } return k = fi.get(k), (x(), R)[$ + 8 >>> 2 >>> 0] = k, $ }(), typeof MainLoop < "u" && MainLoop.ud && MainLoop.pause(), kr(() => uo(tt))) } else ft === 2 ? (ft = 0, kr(co), rt(tt), tt = null, bm.forEach(xr)) : q(`invalid state: ${ft}`); return Xn } }(d => { o().then(d) }); function wm(o) { return o >>>= 0, Yn(async () => { var d = await Ve(o); return He(d) }) } var gi = [], $m = o => { var d = gi.length; return gi.push(o), d }, vm = (o, d) => { for (var m = Array(o), c = 0; c < o; ++c) { var $ = c, k = (x(), K)[d + 4 * c >>> 2 >>> 0], z = li[k]; if (z === void 0) throw o = `parameter ${c}`, k = ms(k), d = et(k), rt(k), new qt(`${o} has unknown type ${d}`); m[$] = z } return m }, xm = (o, d, m) => { var c = []; return o = o(c, m), c.length && ((x(), K)[d >>> 2 >>> 0] = He(c)), o }, Sm = {}, Ir = o => { var d = Sm[o]; return d === void 0 ? et(o) : d }; function km(o, d, m) {
    var [c, ...$] = vm(o, d >>> 0); d = c.Vc.bind(c); var k = $.map(L => L.Uc.bind(L)); o--; var z = { toValue: Ve }; switch (o = k.map((L, G) => { var ne = `argFromPtr${G}`; return z[ne] = L, `${ne}(args${G ? "+" + 8 * G : ""})` }), m) { case 0: var B = "toValue(handle)"; break; case 2: B = "new (toValue(handle))"; break; case 3: B = ""; break; case 1: z.getStringOrSymbol = Ir, B = "toValue(handle)[getStringOrSymbol(methodName)]" }return B += `(${o})`, c.zd || (z.toReturnWire = d, z.emval_returnValue = xm, B = `return emval_returnValue(toReturnWire, destructorsRef, ${B})`), B = `return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`, m = new Function(Object.keys(z), B)(...Object.values(z)), B = `methodCaller<(${$.map(L => L.name)}) => ${c.name}>`, $m(Object.defineProperty(m, "name", { value: B }))
  } function Tm(o, d) { return d >>>= 0, (o = Ve(o >>> 0)) == Ve(d) } function Im(o) { return (o >>>= 0) ? (o = Ir(o), He(globalThis[o])) : He(globalThis) } function Em(o) { return o = Ir(o >>> 0), He(t[o]) } function zm(o, d) { return d >>>= 0, o = Ve(o >>> 0), d = Ve(d), He(o[d]) } function Cm(o) { 9 < (o >>>= 0) && (vt[o + 1] += 1) } function Jn(o, d, m, c, $) { return gi[o >>> 0](d >>> 0, m >>> 0, c >>> 0, $ >>> 0) } function Am(o, d, m, c, $) { return Jn(o >>> 0, d >>> 0, m >>> 0, c >>> 0, $ >>> 0) } function Om() { return He([]) } function Rm(o) { o = Ve(o >>> 0); for (var d = Array(o.length), m = 0; m < o.length; m++)d[m] = o[m]; return He(d) } function Bm(o) { return He(Ir(o >>> 0)) } function Nm() { return He({}) } function Mm(o) { for (var d = Ve(o >>>= 0); d.length;) { var m = d.pop(); d.pop()(m) } di(o) } function Dm(o, d, m) { d >>>= 0, m >>>= 0, o = Ve(o >>> 0), d = Ve(d), m = Ve(m), o[d] = m } function Um(o, d) { o = -9007199254740992 > o || 9007199254740992 < o ? NaN : Number(o), d >>>= 0, o = new Date(1e3 * o), (x(), R)[d >>> 2 >>> 0] = o.getUTCSeconds(), (x(), R)[d + 4 >>> 2 >>> 0] = o.getUTCMinutes(), (x(), R)[d + 8 >>> 2 >>> 0] = o.getUTCHours(), (x(), R)[d + 12 >>> 2 >>> 0] = o.getUTCDate(), (x(), R)[d + 16 >>> 2 >>> 0] = o.getUTCMonth(), (x(), R)[d + 20 >>> 2 >>> 0] = o.getUTCFullYear() - 1900, (x(), R)[d + 24 >>> 2 >>> 0] = o.getUTCDay(), o = (o.getTime() - Date.UTC(o.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, (x(), R)[d + 28 >>> 2 >>> 0] = o } var es = o => o % 4 == 0 && (o % 100 != 0 || o % 400 == 0), ts = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], rs = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]; function Pm(o, d) { o = -9007199254740992 > o || 9007199254740992 < o ? NaN : Number(o), d >>>= 0, o = new Date(1e3 * o), (x(), R)[d >>> 2 >>> 0] = o.getSeconds(), (x(), R)[d + 4 >>> 2 >>> 0] = o.getMinutes(), (x(), R)[d + 8 >>> 2 >>> 0] = o.getHours(), (x(), R)[d + 12 >>> 2 >>> 0] = o.getDate(), (x(), R)[d + 16 >>> 2 >>> 0] = o.getMonth(), (x(), R)[d + 20 >>> 2 >>> 0] = o.getFullYear() - 1900, (x(), R)[d + 24 >>> 2 >>> 0] = o.getDay(); var m = (es(o.getFullYear()) ? ts : rs)[o.getMonth()] + o.getDate() - 1 | 0; (x(), R)[d + 28 >>> 2 >>> 0] = m, (x(), R)[d + 36 >>> 2 >>> 0] = -60 * o.getTimezoneOffset(), m = new Date(o.getFullYear(), 6, 1).getTimezoneOffset(); var c = new Date(o.getFullYear(), 0, 1).getTimezoneOffset(); o = 0 | (m != c && o.getTimezoneOffset() == Math.min(c, m)), (x(), R)[d + 32 >>> 2 >>> 0] = o } function qm(o) { o >>>= 0; var d = new Date((x(), R)[o + 20 >>> 2 >>> 0] + 1900, (x(), R)[o + 16 >>> 2 >>> 0], (x(), R)[o + 12 >>> 2 >>> 0], (x(), R)[o + 8 >>> 2 >>> 0], (x(), R)[o + 4 >>> 2 >>> 0], (x(), R)[o >>> 2 >>> 0], 0), m = (x(), R)[o + 32 >>> 2 >>> 0], c = d.getTimezoneOffset(), $ = new Date(d.getFullYear(), 6, 1).getTimezoneOffset(), k = new Date(d.getFullYear(), 0, 1).getTimezoneOffset(), z = Math.min(k, $); return 0 > m ? (x(), R)[o + 32 >>> 2 >>> 0] = +($ != k && z == c) : 0 < m != (z == c) && ($ = Math.max(k, $), d.setTime(d.getTime() + 6e4 * ((0 < m ? z : $) - c))), (x(), R)[o + 24 >>> 2 >>> 0] = d.getDay(), m = (es(d.getFullYear()) ? ts : rs)[d.getMonth()] + d.getDate() - 1 | 0, (x(), R)[o + 28 >>> 2 >>> 0] = m, (x(), R)[o >>> 2 >>> 0] = d.getSeconds(), (x(), R)[o + 4 >>> 2 >>> 0] = d.getMinutes(), (x(), R)[o + 8 >>> 2 >>> 0] = d.getHours(), (x(), R)[o + 12 >>> 2 >>> 0] = d.getDate(), (x(), R)[o + 16 >>> 2 >>> 0] = d.getMonth(), (x(), R)[o + 20 >>> 2 >>> 0] = d.getYear(), o = d.getTime(), BigInt(isNaN(o) ? -1 : o / 1e3) } function is(o, d, m, c, $, k, z) { return a ? re(16, 1, o, d, m, c, $, k, z) : -52 } function as(o, d, m, c, $, k) { if (a) return re(17, 1, o, d, m, c, $, k) } var Zt = {}, Lm = () => performance.timeOrigin + performance.now(); function ns(o, d) { if (a) return re(18, 1, o, d); if (Zt[o] && (clearTimeout(Zt[o].id), delete Zt[o]), !d) return 0; var m = setTimeout(() => { delete Zt[o], xr(() => ws(o, performance.timeOrigin + performance.now())) }, d); return Zt[o] = { id: m, Zd: d }, 0 } function Wm(o, d, m, c) { o >>>= 0, d >>>= 0, m >>>= 0, c >>>= 0; var $ = new Date().getFullYear(), k = new Date($, 0, 1).getTimezoneOffset(); $ = new Date($, 6, 1).getTimezoneOffset(); var z = Math.max(k, $); (x(), K)[o >>> 2 >>> 0] = 60 * z, (x(), R)[d >>> 2 >>> 0] = +(k != $), o = (d = B => { var L = Math.abs(B); return `UTC${0 <= B ? "-" : "+"}${String(Math.floor(L / 60)).padStart(2, "0")}${String(L % 60).padStart(2, "0")}` })(k), d = d($), $ < k ? (ht(o, m, 17), ht(d, c, 17)) : (ht(o, c, 17), ht(d, m, 17)) } var Vm = () => Date.now(); function Gm(o, d, m) { return m >>>= 0, 0 <= o && 3 >= o ? (o === 0 ? o = Date.now() : o = performance.timeOrigin + performance.now(), o = Math.round(1e6 * o), (x(), he)[m >>> 3 >>> 0] = BigInt(o), 0) : 28 } var yi = [], ss = (o, d) => { yi.length = 0; for (var m; m = (x(), H)[o++ >>> 0];) { var c = m != 105; d += (c &= m != 112) && d % 8 ? 4 : 0, yi.push(m == 112 ? (x(), K)[d >>> 2 >>> 0] : m == 106 ? (x(), he)[d >>> 3 >>> 0] : m == 105 ? (x(), R)[d >>> 2 >>> 0] : (x(), ee)[d >>> 3 >>> 0]), d += c ? 8 : 4 } return yi }; function Hm(o, d, m) { return o >>>= 0, d = ss(d >>> 0, m >>> 0), ki[o](...d) } function Fm(o, d, m) { return o >>>= 0, d = ss(d >>> 0, m >>> 0), ki[o](...d) } var jm = () => { }; function Km(o, d) { return E(ke(o >>> 0, d >>> 0)) } var Xm = () => { throw be += 1, "unwind" }; function Zm() { return 4294901760 } var Qm = () => navigator.hardwareConcurrency, xt = {}, Er = o => { var d; return (d = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o)) ? +d[1] : (d = /:(\d+):\d+(?:\)|$)/.exec(o)) ? 2147483648 | +d[1] : 0 }, os = o => { for (var d of o) (o = Er(d)) && (xt[o] = d) }; function Ym() {
    var o = Error().stack.toString().split(`
`); return o[0] == "Error" && o.shift(), os(o), xt.gd = Er(o[3]), xt.Jd = o, xt.gd
  } function zr(o) { if (!(o = xt[o >>> 0])) return 0; var d; if (d = /^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o)) o = d[1]; else if (d = /^\s+at (.*) \(.*\)$/.exec(o)) o = d[1]; else { if (!(d = /^(.+?)@/.exec(o))) return 0; o = d[1] } rt(zr.hd ?? 0), d = vr(o) + 1; var m = Qt(d); return m && ht(o, m, d), zr.hd = m, zr.hd } function Jm(o) { o >>>= 0; var d = (x(), H).length; if (o <= d || 4294901760 < o) return !1; for (var m = 1; 4 >= m; m *= 2) { var c = d * (1 + .2 / m); c = Math.min(c, o + 100663296); e: { c = (Math.min(4294901760, 65536 * Math.ceil(Math.max(o, c) / 65536)) - ct.buffer.byteLength + 65535) / 65536 | 0; try { ct.grow(c), V(); var $ = 1; break e } catch { } $ = void 0 } if ($) return !0 } return !1 } function eg(o, d, m) {
    if (o >>>= 0, d >>>= 0, xt.gd == o) var c = xt.Jd; else (c = Error().stack.toString().split(`
`))[0] == "Error" && c.shift(), os(c); for (var $ = 3; c[$] && Er(c[$]) != o;)++$; for (o = 0; o < m && c[o + $]; ++o)(x(), R)[d + 4 * o >>> 2 >>> 0] = Er(c[o + $]); return o
  } var _i, bi = {}, us = () => { var c; if (!_i) { var o, d = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (((c = globalThis.navigator) == null ? void 0 : c.language) ?? "C").replace("-", "_") + ".UTF-8", _: "./this.program" }; for (o in bi) bi[o] === void 0 ? delete d[o] : d[o] = bi[o]; var m = []; for (o in d) m.push(`${o}=${d[o]}`); _i = m } return _i }; function ls(o, d) { if (a) return re(19, 1, o, d); o >>>= 0, d >>>= 0; var m, c = 0, $ = 0; for (m of us()) { var k = d + c; (x(), K)[o + $ >>> 2 >>> 0] = k, c += ht(m, k, 1 / 0) + 1, $ += 4 } return 0 } function ds(o, d) { if (a) return re(20, 1, o, d); o >>>= 0, d >>>= 0; var m = us(); for (var c of ((x(), K)[o >>> 2 >>> 0] = m.length, o = 0, m)) o += vr(c) + 1; return (x(), K)[d >>> 2 >>> 0] = o, 0 } function ps(o) { return a ? re(21, 1, o) : 52 } function cs(o, d, m, c) { return a ? re(22, 1, o, d, m, c) : 52 } function hs(o, d, m, c) { return a ? re(23, 1, o, d, m, c) : 70 } var tg = [null, [], []]; function fs(o, d, m, c) { if (a) return re(24, 1, o, d, m, c); d >>>= 0, m >>>= 0, c >>>= 0; for (var $ = 0, k = 0; k < m; k++) { var z = (x(), K)[d >>> 2 >>> 0], B = (x(), K)[d + 4 >>> 2 >>> 0]; d += 8; for (var L = 0; L < B; L++) { var G = o, ne = (x(), H)[z + L >>> 0], pe = tg[G]; ne === 0 || ne === 10 ? ((G === 1 ? T : E)(On(pe)), pe.length = 0) : pe.push(ne) } $ += B } return (x(), K)[c >>> 2 >>> 0] = $, 0 } function rg(o) { return o >>> 0 } a || function () { for (var o = t.numThreads - 1; o--;)kn(); Re.push(async () => { var d = async function () { if (!a) return Promise.all(pt.map(Sn)) }(); De++, await d, --De == 0 && Be && (d = Be, Be = null, d()) }) }(), a || (ct = new WebAssembly.Memory({ initial: 256, maximum: 65536, shared: !0 }), V()), t.wasmBinary && (g = t.wasmBinary), t.stackSave = () => oe(), t.stackRestore = o => se(o), t.stackAlloc = o => vi(o), t.setValue = function (o, d, m = "i8") { switch (m.endsWith("*") && (m = "*"), m) { case "i1": case "i8": (x(), D)[o >>> 0] = d; break; case "i16": (x(), F)[o >>> 1 >>> 0] = d; break; case "i32": (x(), R)[o >>> 2 >>> 0] = d; break; case "i64": (x(), he)[o >>> 3 >>> 0] = BigInt(d); break; case "float": (x(), X)[o >>> 2 >>> 0] = d; break; case "double": (x(), ee)[o >>> 3 >>> 0] = d; break; case "*": (x(), K)[o >>> 2 >>> 0] = d; break; default: q(`invalid type for setValue: ${m}`) } }, t.getValue = function (o, d = "i8") { switch (d.endsWith("*") && (d = "*"), d) { case "i1": case "i8": return (x(), D)[o >>> 0]; case "i16": return (x(), F)[o >>> 1 >>> 0]; case "i32": return (x(), R)[o >>> 2 >>> 0]; case "i64": return (x(), he)[o >>> 3 >>> 0]; case "float": return (x(), X)[o >>> 2 >>> 0]; case "double": return (x(), ee)[o >>> 3 >>> 0]; case "*": return (x(), K)[o >>> 2 >>> 0]; default: q(`invalid type for getValue: ${d}`) } }, t.UTF8ToString = ke, t.stringToUTF8 = ht, t.lengthBytesUTF8 = vr; var ms, gs, Cr, rt, Qt, wi, ys, _s, bs, $i, ws, $s, le, Yt, vs, se, vi, oe, xs, xi, Ss, ks, Ts, Si, Is, Es, zs, Cs, As, Os, Rs, Bs, Ns, Ms, Ds, Us, Ps, qs, Ls, Ws, Vs, Gs, Hs, Fs, js, Ks, Xs, Zs, Qs, Ys, Js, eo, to, ro, io, ao, no, so, oo, uo, lo, po, co, st, ig = [Ue, br, En, Rn, Bn, Nn, Mn, Dn, Un, Pn, qn, Ln, Wn, Vn, Gn, Hn, is, as, ns, ls, ds, ps, cs, hs, fs], ki = { 958812: (o, d, m, c, $) => { if (t === void 0 || !t.Xc) return 1; if ((o = ke(Number(o >>> 0))).startsWith("./") && (o = o.substring(2)), !(o = t.Xc.get(o))) return 2; if (d = Number(d >>> 0), m = Number(m >>> 0), c = Number(c >>> 0), d + m > o.byteLength) return 3; try { let k = o.subarray(d, d + m); switch ($) { case 0: (x(), H).set(k, c >>> 0); break; case 1: t.Qd ? t.Qd(c, k) : t.Id(c, k); break; default: return 4 }return 0 } catch { return 4 } }, 959636: (o, d, m) => { t.td(o, (x(), H).subarray(d >>> 0, d + m >>> 0)) }, 959700: () => t.Wd(), 959742: o => { t.sd(o) }, 959779: () => { t.Bd() }, 959810: () => { t.Cd() }, 959839: () => { t.Gd() }, 959864: o => t.Ad(o), 959897: o => t.Ed(o), 959929: (o, d, m) => { t.ed(Number(o), Number(d), Number(m), !0) }, 959992: (o, d, m) => { t.ed(Number(o), Number(d), Number(m)) }, 960049: () => typeof wasmOffsetConverter < "u", 960106: o => { t.$b("Abs", o, void 0) }, 960157: o => { t.$b("Neg", o, void 0) }, 960208: o => { t.$b("Floor", o, void 0) }, 960261: o => { t.$b("Ceil", o, void 0) }, 960313: o => { t.$b("Reciprocal", o, void 0) }, 960371: o => { t.$b("Sqrt", o, void 0) }, 960423: o => { t.$b("Exp", o, void 0) }, 960474: o => { t.$b("Erf", o, void 0) }, 960525: o => { t.$b("Sigmoid", o, void 0) }, 960580: (o, d, m) => { t.$b("HardSigmoid", o, { alpha: d, beta: m }) }, 960659: o => { t.$b("Log", o, void 0) }, 960710: o => { t.$b("Sin", o, void 0) }, 960761: o => { t.$b("Cos", o, void 0) }, 960812: o => { t.$b("Tan", o, void 0) }, 960863: o => { t.$b("Asin", o, void 0) }, 960915: o => { t.$b("Acos", o, void 0) }, 960967: o => { t.$b("Atan", o, void 0) }, 961019: o => { t.$b("Sinh", o, void 0) }, 961071: o => { t.$b("Cosh", o, void 0) }, 961123: o => { t.$b("Asinh", o, void 0) }, 961176: o => { t.$b("Acosh", o, void 0) }, 961229: o => { t.$b("Atanh", o, void 0) }, 961282: o => { t.$b("Tanh", o, void 0) }, 961334: o => { t.$b("Not", o, void 0) }, 961385: (o, d, m) => { t.$b("Clip", o, { min: d, max: m }) }, 961454: o => { t.$b("Clip", o, void 0) }, 961506: (o, d) => { t.$b("Elu", o, { alpha: d }) }, 961564: o => { t.$b("Gelu", o, void 0) }, 961616: o => { t.$b("Relu", o, void 0) }, 961668: (o, d) => { t.$b("LeakyRelu", o, { alpha: d }) }, 961732: (o, d) => { t.$b("ThresholdedRelu", o, { alpha: d }) }, 961802: (o, d) => { t.$b("Cast", o, { to: d }) }, 961860: o => { t.$b("Add", o, void 0) }, 961911: o => { t.$b("Sub", o, void 0) }, 961962: o => { t.$b("Mul", o, void 0) }, 962013: o => { t.$b("Div", o, void 0) }, 962064: o => { t.$b("Pow", o, void 0) }, 962115: o => { t.$b("Equal", o, void 0) }, 962168: o => { t.$b("Greater", o, void 0) }, 962223: o => { t.$b("GreaterOrEqual", o, void 0) }, 962285: o => { t.$b("Less", o, void 0) }, 962337: o => { t.$b("LessOrEqual", o, void 0) }, 962396: (o, d, m, c, $) => { t.$b("ReduceMean", o, { keepDims: !!d, noopWithEmptyAxes: !!m, axes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 962571: (o, d, m, c, $) => { t.$b("ReduceMax", o, { keepDims: !!d, noopWithEmptyAxes: !!m, axes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 962745: (o, d, m, c, $) => { t.$b("ReduceMin", o, { keepDims: !!d, noopWithEmptyAxes: !!m, axes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 962919: (o, d, m, c, $) => { t.$b("ReduceProd", o, { keepDims: !!d, noopWithEmptyAxes: !!m, axes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 963094: (o, d, m, c, $) => { t.$b("ReduceSum", o, { keepDims: !!d, noopWithEmptyAxes: !!m, axes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 963268: (o, d, m, c, $) => { t.$b("ReduceL1", o, { keepDims: !!d, noopWithEmptyAxes: !!m, axes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 963441: (o, d, m, c, $) => { t.$b("ReduceL2", o, { keepDims: !!d, noopWithEmptyAxes: !!m, axes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 963614: (o, d, m, c, $) => { t.$b("ReduceLogSum", o, { keepDims: !!d, noopWithEmptyAxes: !!m, axes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 963791: (o, d, m, c, $) => { t.$b("ReduceSumSquare", o, { keepDims: !!d, noopWithEmptyAxes: !!m, axes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 963971: (o, d, m, c, $) => { t.$b("ReduceLogSumExp", o, { keepDims: !!d, noopWithEmptyAxes: !!m, axes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 964151: o => { t.$b("Where", o, void 0) }, 964204: (o, d, m) => { t.$b("Transpose", o, { perm: d ? Array.from((x(), R).subarray(Number(d) >>> 0, Number(m) >>> 0)) : [] }) }, 964328: (o, d, m, c) => { t.$b("DepthToSpace", o, { blocksize: d, mode: ke(m), format: c ? "NHWC" : "NCHW" }) }, 964461: (o, d, m, c) => { t.$b("DepthToSpace", o, { blocksize: d, mode: ke(m), format: c ? "NHWC" : "NCHW" }) }, 964594: (o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we, mt) => { t.$b("ConvTranspose", o, { format: L ? "NHWC" : "NCHW", autoPad: d, dilations: [m], group: c, kernelShape: [$], pads: [k, z], strides: [B], wIsConst: () => !!(x(), D)[G >>> 0], outputPadding: ne ? Array.from((x(), R).subarray(Number(ne) >>> 0, Number(pe) >>> 0)) : [], outputShape: ye ? Array.from((x(), R).subarray(Number(ye) >>> 0, Number(we) >>> 0)) : [], activation: ke(mt) }) }, 965027: (o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we) => { t.$b("ConvTranspose", o, { format: B ? "NHWC" : "NCHW", autoPad: d, dilations: Array.from((x(), R).subarray(Number(m) >>> 0, 2 + (Number(m) >>> 0) >>> 0)), group: c, kernelShape: Array.from((x(), R).subarray(Number($) >>> 0, 2 + (Number($) >>> 0) >>> 0)), pads: Array.from((x(), R).subarray(Number(k) >>> 0, 4 + (Number(k) >>> 0) >>> 0)), strides: Array.from((x(), R).subarray(Number(z) >>> 0, 2 + (Number(z) >>> 0) >>> 0)), wIsConst: () => !!(x(), D)[L >>> 0], outputPadding: G ? Array.from((x(), R).subarray(Number(G) >>> 0, Number(ne) >>> 0)) : [], outputShape: pe ? Array.from((x(), R).subarray(Number(pe) >>> 0, Number(ye) >>> 0)) : [], activation: ke(we) }) }, 965688: (o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we, mt) => { t.$b("ConvTranspose", o, { format: L ? "NHWC" : "NCHW", autoPad: d, dilations: [m], group: c, kernelShape: [$], pads: [k, z], strides: [B], wIsConst: () => !!(x(), D)[G >>> 0], outputPadding: ne ? Array.from((x(), R).subarray(Number(ne) >>> 0, Number(pe) >>> 0)) : [], outputShape: ye ? Array.from((x(), R).subarray(Number(ye) >>> 0, Number(we) >>> 0)) : [], activation: ke(mt) }) }, 966121: (o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we) => { t.$b("ConvTranspose", o, { format: B ? "NHWC" : "NCHW", autoPad: d, dilations: Array.from((x(), R).subarray(Number(m) >>> 0, 2 + (Number(m) >>> 0) >>> 0)), group: c, kernelShape: Array.from((x(), R).subarray(Number($) >>> 0, 2 + (Number($) >>> 0) >>> 0)), pads: Array.from((x(), R).subarray(Number(k) >>> 0, 4 + (Number(k) >>> 0) >>> 0)), strides: Array.from((x(), R).subarray(Number(z) >>> 0, 2 + (Number(z) >>> 0) >>> 0)), wIsConst: () => !!(x(), D)[L >>> 0], outputPadding: G ? Array.from((x(), R).subarray(Number(G) >>> 0, Number(ne) >>> 0)) : [], outputShape: pe ? Array.from((x(), R).subarray(Number(pe) >>> 0, Number(ye) >>> 0)) : [], activation: ke(we) }) }, 966782: (o, d) => { t.$b("GlobalAveragePool", o, { format: d ? "NHWC" : "NCHW" }) }, 966873: (o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we) => { t.$b("AveragePool", o, { format: we ? "NHWC" : "NCHW", auto_pad: d, ceil_mode: m, count_include_pad: c, storage_order: $, dilations: k ? Array.from((x(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [], kernel_shape: B ? Array.from((x(), R).subarray(Number(B) >>> 0, Number(L) >>> 0)) : [], pads: G ? Array.from((x(), R).subarray(Number(G) >>> 0, Number(ne) >>> 0)) : [], strides: pe ? Array.from((x(), R).subarray(Number(pe) >>> 0, Number(ye) >>> 0)) : [] }) }, 967352: (o, d) => { t.$b("GlobalAveragePool", o, { format: d ? "NHWC" : "NCHW" }) }, 967443: (o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we) => { t.$b("AveragePool", o, { format: we ? "NHWC" : "NCHW", auto_pad: d, ceil_mode: m, count_include_pad: c, storage_order: $, dilations: k ? Array.from((x(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [], kernel_shape: B ? Array.from((x(), R).subarray(Number(B) >>> 0, Number(L) >>> 0)) : [], pads: G ? Array.from((x(), R).subarray(Number(G) >>> 0, Number(ne) >>> 0)) : [], strides: pe ? Array.from((x(), R).subarray(Number(pe) >>> 0, Number(ye) >>> 0)) : [] }) }, 967922: (o, d) => { t.$b("GlobalMaxPool", o, { format: d ? "NHWC" : "NCHW" }) }, 968009: (o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we) => { t.$b("MaxPool", o, { format: we ? "NHWC" : "NCHW", auto_pad: d, ceil_mode: m, count_include_pad: c, storage_order: $, dilations: k ? Array.from((x(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [], kernel_shape: B ? Array.from((x(), R).subarray(Number(B) >>> 0, Number(L) >>> 0)) : [], pads: G ? Array.from((x(), R).subarray(Number(G) >>> 0, Number(ne) >>> 0)) : [], strides: pe ? Array.from((x(), R).subarray(Number(pe) >>> 0, Number(ye) >>> 0)) : [] }) }, 968484: (o, d) => { t.$b("GlobalMaxPool", o, { format: d ? "NHWC" : "NCHW" }) }, 968571: (o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we) => { t.$b("MaxPool", o, { format: we ? "NHWC" : "NCHW", auto_pad: d, ceil_mode: m, count_include_pad: c, storage_order: $, dilations: k ? Array.from((x(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [], kernel_shape: B ? Array.from((x(), R).subarray(Number(B) >>> 0, Number(L) >>> 0)) : [], pads: G ? Array.from((x(), R).subarray(Number(G) >>> 0, Number(ne) >>> 0)) : [], strides: pe ? Array.from((x(), R).subarray(Number(pe) >>> 0, Number(ye) >>> 0)) : [] }) }, 969046: (o, d, m, c, $) => { t.$b("Gemm", o, { alpha: d, beta: m, transA: c, transB: $ }) }, 969150: o => { t.$b("MatMul", o, void 0) }, 969204: (o, d, m, c) => { t.$b("ArgMax", o, { keepDims: !!d, selectLastIndex: !!m, axis: c }) }, 969312: (o, d, m, c) => { t.$b("ArgMin", o, { keepDims: !!d, selectLastIndex: !!m, axis: c }) }, 969420: (o, d) => { t.$b("Softmax", o, { axis: d }) }, 969483: (o, d) => { t.$b("Concat", o, { axis: d }) }, 969543: (o, d, m, c, $) => { t.$b("Split", o, { axis: d, numOutputs: m, splitSizes: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 969699: o => { t.$b("Expand", o, void 0) }, 969753: (o, d) => { t.$b("Gather", o, { axis: Number(d) }) }, 969824: (o, d) => { t.$b("GatherElements", o, { axis: Number(d) }) }, 969903: (o, d) => { t.$b("GatherND", o, { batch_dims: Number(d) }) }, 969982: (o, d, m, c, $, k, z, B, L, G, ne) => { t.$b("Resize", o, { antialias: d, axes: m ? Array.from((x(), R).subarray(Number(m) >>> 0, Number(c) >>> 0)) : [], coordinateTransformMode: ke($), cubicCoeffA: k, excludeOutside: z, extrapolationValue: B, keepAspectRatioPolicy: ke(L), mode: ke(G), nearestMode: ke(ne) }) }, 970344: (o, d, m, c, $, k, z) => { t.$b("Slice", o, { starts: d ? Array.from((x(), R).subarray(Number(d) >>> 0, Number(m) >>> 0)) : [], ends: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [], axes: k ? Array.from((x(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [] }) }, 970608: o => { t.$b("Tile", o, void 0) }, 970660: (o, d, m) => { t.$b("InstanceNormalization", o, { epsilon: d, format: m ? "NHWC" : "NCHW" }) }, 970774: (o, d, m) => { t.$b("InstanceNormalization", o, { epsilon: d, format: m ? "NHWC" : "NCHW" }) }, 970888: o => { t.$b("Range", o, void 0) }, 970941: (o, d) => { t.$b("Einsum", o, { equation: ke(d) }) }, 971022: (o, d, m, c, $) => { t.$b("Pad", o, { mode: d, value: m, pads: c ? Array.from((x(), R).subarray(Number(c) >>> 0, Number($) >>> 0)) : [] }) }, 971165: (o, d, m, c, $, k) => { t.$b("BatchNormalization", o, { epsilon: d, momentum: m, spatial: !!$, trainingMode: !!c, format: k ? "NHWC" : "NCHW" }) }, 971334: (o, d, m, c, $, k) => { t.$b("BatchNormalization", o, { epsilon: d, momentum: m, spatial: !!$, trainingMode: !!c, format: k ? "NHWC" : "NCHW" }) }, 971503: (o, d, m) => { t.$b("CumSum", o, { exclusive: Number(d), reverse: Number(m) }) }, 971600: (o, d, m) => { t.$b("DequantizeLinear", o, { axis: d, blockSize: m }) }, 971690: (o, d, m, c, $) => { t.$b("GridSample", o, { align_corners: d, mode: ke(m), padding_mode: ke(c), format: $ ? "NHWC" : "NCHW" }) }, 971860: (o, d, m, c, $) => { t.$b("GridSample", o, { align_corners: d, mode: ke(m), padding_mode: ke(c), format: $ ? "NHWC" : "NCHW" }) }, 972030: (o, d) => { t.$b("ScatterND", o, { reduction: ke(d) }) }, 972115: (o, d, m, c, $, k, z, B, L) => { t.$b("Attention", o, { numHeads: d, isUnidirectional: m, maskFilterValue: c, scale: $, doRotary: k, qkvHiddenSizes: z ? Array.from((x(), R).subarray(Number(B) >>> 0, Number(B) + z >>> 0)) : [], pastPresentShareBuffer: !!L }) }, 972387: o => { t.$b("BiasAdd", o, void 0) }, 972442: o => { t.$b("BiasSplitGelu", o, void 0) }, 972503: o => { t.$b("FastGelu", o, void 0) }, 972559: (o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we, mt, Ti) => { t.$b("Conv", o, { format: pe ? "NHWC" : "NCHW", auto_pad: d, dilations: m ? Array.from((x(), R).subarray(Number(m) >>> 0, Number(c) >>> 0)) : [], group: $, kernel_shape: k ? Array.from((x(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [], pads: B ? Array.from((x(), R).subarray(Number(B) >>> 0, Number(L) >>> 0)) : [], strides: G ? Array.from((x(), R).subarray(Number(G) >>> 0, Number(ne) >>> 0)) : [], w_is_const: () => !!(x(), D)[Number(ye) >>> 0], activation: ke(we), activation_params: mt ? Array.from((x(), X).subarray(Number(mt) >>> 0, Number(Ti) >>> 0)) : [] }) }, 973143: o => { t.$b("Gelu", o, void 0) }, 973195: (o, d, m, c, $, k, z, B, L) => { t.$b("GroupQueryAttention", o, { numHeads: d, kvNumHeads: m, scale: c, softcap: $, doRotary: k, rotaryInterleaved: z, smoothSoftmax: B, localWindowSize: L }) }, 973412: (o, d, m, c) => { t.$b("LayerNormalization", o, { axis: d, epsilon: m, simplified: !!c }) }, 973523: (o, d, m, c) => { t.$b("LayerNormalization", o, { axis: d, epsilon: m, simplified: !!c }) }, 973634: (o, d, m, c, $, k) => { t.$b("MatMulNBits", o, { k: d, n: m, accuracyLevel: c, bits: $, blockSize: k }) }, 973761: (o, d, m, c, $, k) => { t.$b("MultiHeadAttention", o, { numHeads: d, isUnidirectional: m, maskFilterValue: c, scale: $, doRotary: k }) }, 973920: (o, d) => { t.$b("QuickGelu", o, { alpha: d }) }, 973984: (o, d, m, c, $) => { t.$b("RotaryEmbedding", o, { interleaved: !!d, numHeads: m, rotaryEmbeddingDim: c, scale: $ }) }, 974123: (o, d, m) => { t.$b("SkipLayerNormalization", o, { epsilon: d, simplified: !!m }) }, 974225: (o, d, m) => { t.$b("SkipLayerNormalization", o, { epsilon: d, simplified: !!m }) }, 974327: (o, d, m, c) => { t.$b("GatherBlockQuantized", o, { gatherAxis: d, quantizeAxis: m, blockSize: c }) }, 974448: o => { t.Fd(o) }, 974482: (o, d) => t.Hd(Number(o), Number(d), t.Yc.Kd, t.Yc.errors) }; function ag(o, d, m) { return Yn(async () => { await t.Dd(Number(o), Number(d), Number(m)) }) } function ng() { return typeof wasmOffsetConverter < "u" } function sg(o, d, m, c) { var $ = oe(); try { return Bs(o, d, m, c) } catch (k) { if (se($), k !== k + 0) throw k; le(1, 0) } } function og(o, d, m) { var c = oe(); try { return Cs(o, d, m) } catch ($) { if (se(c), $ !== $ + 0) throw $; le(1, 0) } } function ug(o) { var d = oe(); try { Is(o) } catch (m) { if (se(d), m !== m + 0) throw m; le(1, 0) } } function lg(o, d) { var m = oe(); try { return Si(o, d) } catch (c) { if (se(m), c !== c + 0) throw c; le(1, 0) } } function dg(o, d, m) { var c = oe(); try { Ts(o, d, m) } catch ($) { if (se(c), $ !== $ + 0) throw $; le(1, 0) } } function pg(o, d) { var m = oe(); try { Ns(o, d) } catch (c) { if (se(m), c !== c + 0) throw c; le(1, 0) } } function cg(o, d, m, c, $, k, z) { var B = oe(); try { return Os(o, d, m, c, $, k, z) } catch (L) { if (se(B), L !== L + 0) throw L; le(1, 0) } } function hg(o, d, m, c, $, k) { var z = oe(); try { Es(o, d, m, c, $, k) } catch (B) { if (se(z), B !== B + 0) throw B; le(1, 0) } } function fg(o, d, m, c) { var $ = oe(); try { Rs(o, d, m, c) } catch (k) { if (se($), k !== k + 0) throw k; le(1, 0) } } function mg(o, d, m, c, $) { var k = oe(); try { zs(o, d, m, c, $) } catch (z) { if (se(k), z !== z + 0) throw z; le(1, 0) } } function gg(o, d, m, c, $, k, z) { var B = oe(); try { Ds(o, d, m, c, $, k, z) } catch (L) { if (se(B), L !== L + 0) throw L; le(1, 0) } } function yg(o, d, m, c, $, k, z) { var B = oe(); try { Us(o, d, m, c, $, k, z) } catch (L) { if (se(B), L !== L + 0) throw L; le(1, 0) } } function _g(o, d, m, c, $, k, z, B) { var L = oe(); try { Ws(o, d, m, c, $, k, z, B) } catch (G) { if (se(L), G !== G + 0) throw G; le(1, 0) } } function bg(o, d, m, c, $) { var k = oe(); try { return Ms(o, d, m, c, $) } catch (z) { if (se(k), z !== z + 0) throw z; le(1, 0) } } function wg(o, d, m, c, $, k, z, B) { var L = oe(); try { Vs(o, d, m, c, $, k, z, B) } catch (G) { if (se(L), G !== G + 0) throw G; le(1, 0) } } function $g(o, d, m, c, $, k, z, B, L, G, ne, pe) { var ye = oe(); try { Ps(o, d, m, c, $, k, z, B, L, G, ne, pe) } catch (we) { if (se(ye), we !== we + 0) throw we; le(1, 0) } } function vg(o, d, m, c, $, k) { var z = oe(); try { return qs(o, d, m, c, $, k) } catch (B) { if (se(z), B !== B + 0) throw B; le(1, 0) } } function xg(o, d, m) { var c = oe(); try { return Gs(o, d, m) } catch ($) { if (se(c), $ !== $ + 0) throw $; return le(1, 0), 0n } } function Sg(o, d, m, c, $, k, z, B, L) { var G = oe(); try { As(o, d, m, c, $, k, z, B, L) } catch (ne) { if (se(G), ne !== ne + 0) throw ne; le(1, 0) } } function kg(o) { var d = oe(); try { return Hs(o) } catch (m) { if (se(d), m !== m + 0) throw m; le(1, 0) } } function Tg(o, d, m) { var c = oe(); try { return Fs(o, d, m) } catch ($) { if (se(c), $ !== $ + 0) throw $; le(1, 0) } } function Ig(o, d) { var m = oe(); try { return oo(o, d) } catch (c) { if (se(m), c !== c + 0) throw c; return le(1, 0), 0n } } function Eg(o) { var d = oe(); try { return js(o) } catch (m) { if (se(d), m !== m + 0) throw m; return le(1, 0), 0n } } function zg(o, d, m, c) { var $ = oe(); try { return Js(o, d, m, c) } catch (k) { if (se($), k !== k + 0) throw k; le(1, 0) } } function Cg(o, d, m, c, $) { var k = oe(); try { return eo(o, d, m, c, $) } catch (z) { if (se(k), z !== z + 0) throw z; le(1, 0) } } function Ag(o, d, m, c, $, k) { var z = oe(); try { return to(o, d, m, c, $, k) } catch (B) { if (se(z), B !== B + 0) throw B; le(1, 0) } } function Og(o, d, m, c, $, k) { var z = oe(); try { return ro(o, d, m, c, $, k) } catch (B) { if (se(z), B !== B + 0) throw B; le(1, 0) } } function Rg(o, d, m, c, $, k, z, B) { var L = oe(); try { return Ls(o, d, m, c, $, k, z, B) } catch (G) { if (se(L), G !== G + 0) throw G; le(1, 0) } } function Bg(o, d, m, c, $) { var k = oe(); try { return io(o, d, m, c, $) } catch (z) { if (se(k), z !== z + 0) throw z; return le(1, 0), 0n } } function Ng(o, d, m, c) { var $ = oe(); try { return ao(o, d, m, c) } catch (k) { if (se($), k !== k + 0) throw k; le(1, 0) } } function Mg(o, d, m, c) { var $ = oe(); try { return no(o, d, m, c) } catch (k) { if (se($), k !== k + 0) throw k; le(1, 0) } } function Dg(o, d, m, c, $, k, z, B, L, G, ne, pe) { var ye = oe(); try { return so(o, d, m, c, $, k, z, B, L, G, ne, pe) } catch (we) { if (se(ye), we !== we + 0) throw we; le(1, 0) } } function Ug(o, d, m, c, $, k, z, B, L, G, ne) { var pe = oe(); try { Qs(o, d, m, c, $, k, z, B, L, G, ne) } catch (ye) { if (se(pe), ye !== ye + 0) throw ye; le(1, 0) } } function Pg(o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we, mt, Ti) { var Vg = oe(); try { Ys(o, d, m, c, $, k, z, B, L, G, ne, pe, ye, we, mt, Ti) } catch (Ii) { if (se(Vg), Ii !== Ii + 0) throw Ii; le(1, 0) } } function qg(o, d, m) { var c = oe(); try { return Ks(o, d, m) } catch ($) { if (se(c), $ !== $ + 0) throw $; le(1, 0) } } function Lg(o, d, m) { var c = oe(); try { return Xs(o, d, m) } catch ($) { if (se(c), $ !== $ + 0) throw $; le(1, 0) } } function Wg(o, d, m, c) { var $ = oe(); try { Zs(o, d, m, c) } catch (k) { if (se($), k !== k + 0) throw k; le(1, 0) } } function Ar() { if (0 < De) Be = Ar; else if (a) b == null || b(t), Z(); else { for (var o = Re; 0 < o.length;)o.shift()(t); 0 < De ? Be = Ar : (t.calledRun = !0, C || (Z(), b == null || b(t))) } } return a || (st = await We(), Ar()), t.PTR_SIZE = 4, P ? t : new Promise((o, d) => { b = o, S = d })
} var bp, _o, g0 = U(() => { var e, t; bp = yo, _o = (t = (e = globalThis.self) == null ? void 0 : e.name) == null ? void 0 : t.startsWith("em-pthread"), _o && yo() }), Mi, za, bo, Pe, wp, Rr, wo, $o, Di, vo, Ui, $p, Pi, vp, Xa = U(() => { Ka(), Mi = typeof location > "u" ? void 0 : location.origin, za = !1, bo = () => { { if (za) { let e = URL; return new URL(new e("ort.bundle.min.mjs", "").href, Mi).href } return "" } }, Pe = bo(), wp = () => { if (Pe && !Pe.startsWith("blob:")) return Pe.substring(0, Pe.lastIndexOf("/") + 1) }, Rr = (e, t) => { try { let r = t ?? Pe; return (r ? new URL(e, r) : new URL(e)).origin === Mi } catch { return !1 } }, wo = (e, t) => { let r = t ?? Pe; try { return (r ? new URL(e, r) : new URL(e)).href } catch { return } }, $o = (e, t) => `${t ?? "./"}${e}`, Di = async e => { let t = await (await fetch(e, { credentials: "same-origin" })).blob(); return URL.createObjectURL(t) }, vo = async e => (await import(e)).default, Ui = (m0(), yr(gp)).default, $p = async () => { if (!Pe) throw new Error("Failed to load proxy worker: cannot determine the script source URL."); if (Rr(Pe)) return [void 0, Ui()]; let e = await Di(Pe); return [e, Ui(e)] }, Pi = (g0(), yr(_p)).default, vp = async (e, t, r, i) => { let a = Pi && !(e || t); if (a) if (Pe) a = Rr(Pe) || i && !r; else if (i && !r) a = !0; else throw new Error("cannot determine the script source URL."); if (a) return [void 0, Pi]; { let n = "ort-wasm-simd-threaded.jsep.mjs", s = e ?? wo(n, t), u = r && s && !Rr(s, t), l = u ? await Di(s) : s ?? $o(n, t); return [u ? l : void 0, await vo(l)] } } }), qi, Br, er, Li, xo, So, ko, Za, _e, Dt = U(() => { Xa(), Br = !1, er = !1, Li = !1, xo = () => { if (typeof SharedArrayBuffer > "u") return !1; try { return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11])) } catch { return !1 } }, So = () => { try { return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 30, 1, 28, 0, 65, 0, 253, 15, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 186, 1, 26, 11])) } catch { return !1 } }, ko = () => { try { return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 19, 1, 17, 0, 65, 1, 253, 15, 65, 2, 253, 15, 65, 3, 253, 15, 253, 147, 2, 11])) } catch { return !1 } }, Za = async e => { if (Br) return Promise.resolve(); if (er) throw new Error("multiple calls to 'initializeWebAssembly()' detected."); if (Li) throw new Error("previous call to 'initializeWebAssembly()' failed."); er = !0; let t = e.initTimeout, r = e.numThreads; if (e.simd !== !1) { if (e.simd === "relaxed") { if (!ko()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.") } else if (!So()) throw new Error("WebAssembly SIMD is not supported in the current environment.") } let i = xo(); r > 1 && !i && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + r + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), e.numThreads = r = 1); let a = e.wasmPaths, n = typeof a == "string" ? a : void 0, s = a == null ? void 0 : a.mjs, u = (s == null ? void 0 : s.href) ?? s, l = a == null ? void 0 : a.wasm, p = (l == null ? void 0 : l.href) ?? l, f = e.wasmBinary, [h, g] = await vp(u, n, r > 1, !!f || !!p), y = !1, _ = []; if (t > 0 && _.push(new Promise(b => { setTimeout(() => { y = !0, b() }, t) })), _.push(new Promise((b, S) => { let v = { numThreads: r }; if (f) v.wasmBinary = f, v.locateFile = w => w; else if (p || n) v.locateFile = w => p ?? n + w; else if (u && u.indexOf("blob:") !== 0) v.locateFile = w => new URL(w, u).href; else if (h) { let w = wp(); w && (v.locateFile = I => w + I) } g(v).then(w => { er = !1, Br = !0, qi = w, b(), h && URL.revokeObjectURL(h) }, w => { er = !1, Li = !0, S(w) }) })), await Promise.race(_), y) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`) }, _e = () => { if (Br && qi) return qi; throw new Error("WebAssembly is not initialized yet.") } }), Qe, Yr, ge, Qa = U(() => { Dt(), Qe = (e, t) => { let r = _e(), i = r.lengthBytesUTF8(e) + 1, a = r._malloc(i); return r.stringToUTF8(e, a, i), t.push(a), a }, Yr = (e, t, r, i) => { if (typeof e == "object" && e !== null) { if (r.has(e)) throw new Error("Circular reference in options"); r.add(e) } Object.entries(e).forEach(([a, n]) => { let s = t ? t + a : a; if (typeof n == "object") Yr(n, s + ".", r, i); else if (typeof n == "string" || typeof n == "number") i(s, n.toString()); else if (typeof n == "boolean") i(s, n ? "1" : "0"); else throw new Error(`Can't handle extra config type: ${typeof n}`) }) }, ge = e => { let t = _e(), r = t.stackSave(); try { let i = t.PTR_SIZE, a = t.stackAlloc(2 * i); t._OrtGetLastError(a, a + i); let n = Number(t.getValue(a, i === 4 ? "i32" : "i64")), s = t.getValue(a + i, "*"), u = s ? t.UTF8ToString(s) : ""; throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${u}`) } finally { t.stackRestore(r) } } }), xp, y0 = U(() => { Dt(), Qa(), xp = e => { let t = _e(), r = 0, i = [], a = e || {}; try { if ((e == null ? void 0 : e.logSeverityLevel) === void 0) a.logSeverityLevel = 2; else if (typeof e.logSeverityLevel != "number" || !Number.isInteger(e.logSeverityLevel) || e.logSeverityLevel < 0 || e.logSeverityLevel > 4) throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`); if ((e == null ? void 0 : e.logVerbosityLevel) === void 0) a.logVerbosityLevel = 0; else if (typeof e.logVerbosityLevel != "number" || !Number.isInteger(e.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`); (e == null ? void 0 : e.terminate) === void 0 && (a.terminate = !1); let n = 0; return (e == null ? void 0 : e.tag) !== void 0 && (n = Qe(e.tag, i)), r = t._OrtCreateRunOptions(a.logSeverityLevel, a.logVerbosityLevel, !!a.terminate, n), r === 0 && ge("Can't create run options."), (e == null ? void 0 : e.extra) !== void 0 && Yr(e.extra, "", new WeakSet, (s, u) => { let l = Qe(s, i), p = Qe(u, i); t._OrtAddRunConfigEntry(r, l, p) !== 0 && ge(`Can't set a run config entry: ${s} - ${u}.`) }), [r, i] } catch (n) { throw r !== 0 && t._OrtReleaseRunOptions(r), i.forEach(s => t._free(s)), n } } }), To, Io, Eo, tr, zo, Sp, _0 = U(() => { Dt(), Qa(), To = e => { switch (e) { case "disabled": return 0; case "basic": return 1; case "extended": return 2; case "layout": return 3; case "all": return 99; default: throw new Error(`unsupported graph optimization level: ${e}`) } }, Io = e => { switch (e) { case "sequential": return 0; case "parallel": return 1; default: throw new Error(`unsupported execution mode: ${e}`) } }, Eo = e => { e.extra || (e.extra = {}), e.extra.session || (e.extra.session = {}); let t = e.extra.session; t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), e.executionProviders && e.executionProviders.some(r => (typeof r == "string" ? r : r.name) === "webgpu") && (e.enableMemPattern = !1) }, tr = (e, t, r, i) => { let a = Qe(t, i), n = Qe(r, i); _e()._OrtAddSessionConfigEntry(e, a, n) !== 0 && ge(`Can't set a session config entry: ${t} - ${r}.`) }, zo = async (e, t, r) => { let i = t.executionProviders; for (let a of i) { let n = typeof a == "string" ? a : a.name, s = []; switch (n) { case "webnn": if (n = "WEBNN", typeof a != "string") { let h = a == null ? void 0 : a.deviceType; h && tr(e, "deviceType", h, r) } break; case "webgpu": if (n = "JS", typeof a != "string") { let h = a; if (h != null && h.preferredLayout) { if (h.preferredLayout !== "NCHW" && h.preferredLayout !== "NHWC") throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${h.preferredLayout}`); tr(e, "preferredLayout", h.preferredLayout, r) } } break; case "wasm": case "cpu": continue; default: throw new Error(`not supported execution provider: ${n}`) }let u = Qe(n, r), l = s.length, p = 0, f = 0; if (l > 0) { p = _e()._malloc(l * _e().PTR_SIZE), r.push(p), f = _e()._malloc(l * _e().PTR_SIZE), r.push(f); for (let h = 0; h < l; h++)_e().setValue(p + h * _e().PTR_SIZE, s[h][0], "*"), _e().setValue(f + h * _e().PTR_SIZE, s[h][1], "*") } await _e()._OrtAppendExecutionProvider(e, u, p, f, l) !== 0 && ge(`Can't append execution provider: ${n}.`) } }, Sp = async e => { let t = _e(), r = 0, i = [], a = e || {}; Eo(a); try { let n = To(a.graphOptimizationLevel ?? "all"), s = Io(a.executionMode ?? "sequential"), u = typeof a.logId == "string" ? Qe(a.logId, i) : 0, l = a.logSeverityLevel ?? 2; if (!Number.isInteger(l) || l < 0 || l > 4) throw new Error(`log severity level is not valid: ${l}`); let p = a.logVerbosityLevel ?? 0; if (!Number.isInteger(p) || p < 0 || p > 4) throw new Error(`log verbosity level is not valid: ${p}`); let f = typeof a.optimizedModelFilePath == "string" ? Qe(a.optimizedModelFilePath, i) : 0; if (r = t._OrtCreateSessionOptions(n, !!a.enableCpuMemArena, !!a.enableMemPattern, s, !!a.enableProfiling, 0, u, l, p, f), r === 0 && ge("Can't create session options."), a.executionProviders && await zo(r, a, i), a.enableGraphCapture !== void 0) { if (typeof a.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`); tr(r, "enableGraphCapture", a.enableGraphCapture.toString(), i) } if (a.freeDimensionOverrides) for (let [h, g] of Object.entries(a.freeDimensionOverrides)) { if (typeof h != "string") throw new Error(`free dimension override name must be a string: ${h}`); if (typeof g != "number" || !Number.isInteger(g) || g < 0) throw new Error(`free dimension override value must be a non-negative integer: ${g}`); let y = Qe(h, i); t._OrtAddFreeDimensionOverride(r, y, g) !== 0 && ge(`Can't set a free dimension override: ${h} - ${g}.`) } return a.extra !== void 0 && Yr(a.extra, "", new WeakSet, (h, g) => { tr(r, h, g, i) }), [r, i] } catch (n) { throw r !== 0 && t._OrtReleaseSessionOptions(r) !== 0 && ge("Can't release session options."), i.forEach(s => t._free(s)), n } } }), zt, ut, Ct, ni, Jr, Ya, Ja, Ca, te = U(() => { zt = e => { switch (e) { case "int8": return 3; case "uint8": return 2; case "bool": return 9; case "int16": return 5; case "uint16": return 4; case "int32": return 6; case "uint32": return 12; case "float16": return 10; case "float32": return 1; case "float64": return 11; case "string": return 8; case "int64": return 7; case "uint64": return 13; case "int4": return 22; case "uint4": return 21; default: throw new Error(`unsupported data type: ${e}`) } }, ut = e => { switch (e) { case 3: return "int8"; case 2: return "uint8"; case 9: return "bool"; case 5: return "int16"; case 4: return "uint16"; case 6: return "int32"; case 12: return "uint32"; case 10: return "float16"; case 1: return "float32"; case 11: return "float64"; case 8: return "string"; case 7: return "int64"; case 13: return "uint64"; case 22: return "int4"; case 21: return "uint4"; default: throw new Error(`unsupported data type: ${e}`) } }, Ct = (e, t) => { let r = [-1, 4, 1, 1, 2, 2, 4, 8, -1, 1, 2, 8, 4, 8, -1, -1, -1, -1, -1, -1, -1, .5, .5][e], i = typeof t == "number" ? t : t.reduce((a, n) => a * n, 1); return r > 0 ? Math.ceil(i * r) : void 0 }, ni = e => { switch (e) { case "float16": return typeof Float16Array < "u" && Float16Array.from ? Float16Array : Uint16Array; case "float32": return Float32Array; case "uint8": return Uint8Array; case "int8": return Int8Array; case "uint16": return Uint16Array; case "int16": return Int16Array; case "int32": return Int32Array; case "bool": return Uint8Array; case "float64": return Float64Array; case "uint32": return Uint32Array; case "int64": return BigInt64Array; case "uint64": return BigUint64Array; default: throw new Error(`unsupported type: ${e}`) } }, Jr = e => { switch (e) { case "verbose": return 0; case "info": return 1; case "warning": return 2; case "error": return 3; case "fatal": return 4; default: throw new Error(`unsupported logging level: ${e}`) } }, Ya = e => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", Ja = e => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint64" || e === "int8" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", Ca = e => { switch (e) { case "none": return 0; case "cpu": return 1; case "cpu-pinned": return 2; case "texture": return 3; case "gpu-buffer": return 4; case "ml-tensor": return 5; default: throw new Error(`unsupported data location: ${e}`) } } }), en, kp = U(() => { Ka(), en = async e => { if (typeof e == "string") { let t = await fetch(e); if (!t.ok) throw new Error(`failed to load external data file: ${e}`); let r = t.headers.get("Content-Length"), i = r ? parseInt(r, 10) : 0; if (i < 1073741824) return new Uint8Array(await t.arrayBuffer()); { if (!t.body) throw new Error(`failed to load external data file: ${e}, no response body.`); let a = t.body.getReader(), n; try { n = new ArrayBuffer(i) } catch (u) { if (u instanceof RangeError) { let l = Math.ceil(i / 65536); n = new WebAssembly.Memory({ initial: l, maximum: l }).buffer } else throw u } let s = 0; for (; ;) { let { done: u, value: l } = await a.read(); if (u) break; let p = l.byteLength; new Uint8Array(n, s, p).set(l), s += p } return new Uint8Array(n, 0, i) } } else return e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : e instanceof Uint8Array ? e : new Uint8Array(e) } }), Co, Ao, Oo, Ro, tn, Bo, de, lt = U(() => { te(), Co = ["V", "I", "W", "E", "F"], Ao = (e, t) => { console.log(`[${Co[e]},${new Date().toISOString()}]${t}`) }, tn = (e, t) => { Oo = e, Ro = t }, Bo = (e, t) => { let r = Jr(e), i = Jr(Oo); r >= i && Ao(r, typeof t == "function" ? t() : t) }, de = (...e) => { Ro && Bo(...e) } }), No, Ht, O, ei, Tp, Ip, Ep, ie = U(() => { No = class { static calcMatMulShape(e, t) { return e[1] !== t[0] ? void 0 : [e[0], t[1]] } }, Ht = class { static calcShape(e, t, r = !1) { let i = e.length, a = t.length; if (i === 0) return t; if (a === 0) return e; let n = Math.max(e.length, t.length), s = new Array(n); if (r) { if (i < 2 || a < 2) return; let u = No.calcMatMulShape([e[i - 2], e[i - 1]], [t[a - 2], t[a - 1]]); if (u === void 0) return;[s[n - 2], s[n - 1]] = u } for (let u = r ? 3 : 1; u <= n; u++) { let l = i - u < 0 ? 1 : e[i - u], p = a - u < 0 ? 1 : t[a - u]; if (l !== p && l > 1 && p > 1) return; let f = Math.max(l, p); if (l && p) s[n - u] = Math.max(l, p); else { if (f > 1) return; s[n - u] = 0 } } return s } static isValidBroadcast(e, t) { let r = e.length, i = t.length; if (r > i) return !1; for (let a = 1; a <= r; a++)if (e[r - a] !== 1 && e[r - a] !== t[i - a]) return !1; return !0 } }, O = class Kr { static size(t) { return Kr.getSizeFromDimensionRange(t, 0, t.length) } static convertShape(t, r = 4) { let i = t.length; if (i === 0) return []; let a = new Array(i), n = i - 1; for (; n >= 0;) { if (t[n] % r === 0) { a[n] = t[n] / r; break } if (r % t[n] !== 0) throw new Error("cannot convert shape"); a[n] = 1, r /= t[n], n-- } for (n--; n >= 0; n--)a[n] = t[n]; return a } static sizeFromDimension(t, r) { if (r < 0 || r > t.length) throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`); return Kr.getSizeFromDimensionRange(t, r, t.length) } static sizeToDimension(t, r) { if (r < 0 || r > t.length) throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`); return Kr.getSizeFromDimensionRange(t, 0, r) } static getSizeFromDimensionRange(t, r, i) { let a = 1; for (let n = r; n < i; n++) { if (t[n] < 0) throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them."); a *= Number(t[n]) } return a } static computeStrides(t) { let r = t.length; if (r === 0) return []; if (r === 1) return [1]; let i = new Array(r); i[r - 1] = 1, i[r - 2] = t[r - 1]; for (let a = r - 3; a >= 0; --a)i[a] = i[a + 1] * t[a + 1]; return i } static normalizeAxis(t, r) { if (t < -r && t >= r) throw new Error("unsupported axis for this operation."); return t < 0 ? t + r : t } static normalizeAxes(t, r) { return t.map(i => this.normalizeAxis(i, r ?? t.length)) } static sortBasedOnPerm(t, r) { return r ? r.map(i => t[i]) : t.slice().reverse() } static padShape(t, r) { let i = t.length; return t.map((a, n) => a + r[n] + r[n + i]) } static areEqual(t, r) { return t.length !== r.length ? !1 : t.every((i, a) => i === r[a]) } }, ei = class pr { static adjustPoolAttributes(t, r, i, a, n, s) { if (!t && i.length !== r.length - 2) throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions"); if (t) for (let u = 0; u < r.length - 2; u++)u >= i.length ? i.push(r[u + 2]) : i[u] = r[u + 2]; for (let u = 0; u < i.length; u++)if (u < a.length) { if (a[u] < 0) throw new Error("strides should be greater than or equal to 1") } else a.push(1); for (let u = 0; u < i.length; u++)if (u < n.length) { if (n[u] < 0) throw new Error("dilations should be greater than or equal to 1") } else n.push(1); for (let u = 0; u < i.length * 2; u++)if (u < s.length) { if (s[u] < 0) throw new Error("pad should be greater than or equal to 1") } else s.push(0); for (let u = 0; u < i.length; u++) { if (i[u] <= 0) throw new Error("kernel shapes need to be greater than 0"); if (s[u] >= i[u] || s[u + i.length] >= i[u]) throw new Error("pads should be smaller than kernel") } } static adjustPadsBasedOnAutoPad(t, r, i, a, n, s, u) { if (u) { if (n.length !== 2 * (t.length - 2)) throw new Error("length of pads should be twice the length of data dimensions"); if (r.length !== t.length - 2) throw new Error("length of strides should be the length of data dimensions"); if (a.length !== t.length - 2) throw new Error("length of kernel shapes should be the length of data dimensions"); for (let l = 0; l < t.length - 2; l++)pr.adjustPadAndReturnShape(t[l + (s ? 1 : 2)], r[l], i[l], a[l], n, l, l + t.length - 2, u) } } static computePoolOutputShape(t, r, i, a, n, s, u) { if (r.length <= 0) throw new Error("input shape must be of size greater than 0"); let l = [r[0], r[1]]; return pr.computeShapeHelper(t, r, l, i, a, n, s, u), l } static computeConvOutputShape(t, r, i, a, n, s, u) { if (t.length <= 0 || r.length <= 0) throw new Error("invalid input tensor dims or invalid filter tensor dims"); let l = [t[0], r[0]]; return pr.computeShapeHelper(!1, t, l, i, a, n, s, u), l } static computeShapeHelper(t, r, i, a, n, s, u, l) { if (t) for (let p = 0; p < r.length - 2; p++)i.push(1); else for (let p = 0; p < r.length - 2; p++)i.push(pr.adjustPadAndReturnShape(r[p + 2], a[p], n[p], s[p], u, p, p + r.length - 2, l)) } static adjustPadAndReturnShape(t, r, i, a, n, s, u, l) { let p = i * (a - 1) + 1; if (l && l !== "NOTSET") switch (l) { case "VALID": return n[s] = 0, n[u] = 0, Math.floor((t - p) / r + 1); case "SAME_LOWER": case "SAME_UPPER": if (i !== 1) throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER"); { let f = ((t + r - 1) / r - 1) * r + a - t; return n[s] = Math.floor(l === "SAME_LOWER" ? (f + 1) / 2 : f / 2), n[u] = f - n[s], Math.floor((t + f - a) / r + 1) } default: throw new Error("Unsupported AutoPad type") } else return Math.floor((t + n[s] + n[u] - p) / r + 1) } }, Tp = class { static getShapeOfGemmResult(e, t, r, i, a) { if (e.length !== 2 || r.length !== 2) throw new Error("shape need to be of size 2"); let n, s, u; t ? (n = e[1], s = e[0]) : (n = e[0], s = e[1]); let l = -1; if (i ? (u = r[0], l = 1) : (u = r[1], l = 0), r[l] !== s) throw new Error("dimension mismatch"); if (n <= 0 || u <= 0 || s <= 0) throw new Error("invalid shape specified"); if (a && !Ht.isValidBroadcast(a, [n, u])) throw new Error("gemm: invalid bias shape for broadcast"); return [n, u, s] } }, Ip = -34028234663852886e22, Ep = 34028234663852886e22 }), rn, zp = U(() => { te(), rn = (e, t) => new (ni(t))(e) }), Wi, Aa, Vi, Mo, Gi, Do, Hi, Fi, ji, Uo, Cp, b0 = U(() => { te(), lt(), Wi = new Map([["float32", 32], ["float16", 16], ["int32", 32], ["uint32", 32], ["int64", 64], ["uint64", 64], ["int8", 8], ["uint8", 8], ["int4", 4], ["uint4", 4]]), Aa = (e, t) => { if (t === "int32") return e; let r = Wi.get(t); if (!r) throw new Error(`WebNN backend does not support data type: ${t}`); let i = r / 8; if (e.byteLength % i !== 0) throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`); let a = e.byteLength / i, n = new (ni(t))(e.buffer, e.byteOffset, a); switch (t) { case "int64": case "uint64": { let s = new Int32Array(a); for (let u = 0; u < a; u++) { let l = n[u]; if (l > 2147483647n || l < -2147483648n) throw new Error("Can not convert int64 data to int32 - value out of range."); s[u] = Number(l) } return new Uint8Array(s.buffer) } case "int8": case "uint8": case "uint32": { if (t === "uint32" && n.some(u => u > 2147483647)) throw new Error("Can not convert uint32 data to int32 - value out of range."); let s = Int32Array.from(n, Number); return new Uint8Array(s.buffer) } default: throw new Error(`Unsupported data conversion from ${t} to 'int32'`) } }, Vi = (e, t) => { if (t === "int32") return e; if (e.byteLength % 4 !== 0) throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32)."); let r = e.byteLength / 4, i = new Int32Array(e.buffer, e.byteOffset, r); switch (t) { case "int64": { let a = BigInt64Array.from(i, BigInt); return new Uint8Array(a.buffer) } case "uint64": { if (i.some(n => n < 0)) throw new Error("Can not convert int32 data to uin64 - negative value found."); let a = BigUint64Array.from(i, BigInt); return new Uint8Array(a.buffer) } case "int8": { if (i.some(n => n < -128 || n > 127)) throw new Error("Can not convert int32 data to int8 - value out of range."); let a = Int8Array.from(i, Number); return new Uint8Array(a.buffer) } case "uint8": { if (i.some(a => a < 0 || a > 255)) throw new Error("Can not convert int32 data to uint8 - value out of range."); return Uint8Array.from(i, Number) } case "uint32": { if (i.some(n => n < 0)) throw new Error("Can not convert int32 data to uint32 - negative value found."); let a = Uint32Array.from(i, Number); return new Uint8Array(a.buffer) } default: throw new Error(`Unsupported data conversion from 'int32' to ${t}`) } }, Mo = 1, Gi = () => Mo++, Do = new Map([["int8", "int32"], ["uint8", "int32"], ["uint32", "int32"], ["int64", "int32"]]), Hi = (e, t) => { let r = Wi.get(e); if (!r) throw new Error(`WebNN backend does not support data type: ${e}`); return t.length > 0 ? Math.ceil(t.reduce((i, a) => i * a) * r / 8) : 0 }, Fi = class { constructor(e) { this.isDataConverted = !1; let { sessionId: t, context: r, tensor: i, dataType: a, shape: n, fallbackDataType: s } = e; this.sessionId = t, this.mlContext = r, this.mlTensor = i, this.dataType = a, this.tensorShape = n, this.fallbackDataType = s } get tensor() { return this.mlTensor } get type() { return this.dataType } get fallbackType() { return this.fallbackDataType } get shape() { return this.tensorShape } get byteLength() { return Hi(this.dataType, this.tensorShape) } destroy() { de("verbose", () => "[WebNN] TensorWrapper.destroy"), this.mlTensor.destroy() } write(e) { this.mlContext.writeTensor(this.mlTensor, e) } async read(e) { if (this.fallbackDataType) { let t = await this.mlContext.readTensor(this.mlTensor), r = Vi(new Uint8Array(t), this.dataType); if (e) { (e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength)).set(r); return } else return r.buffer } else return e ? this.mlContext.readTensor(this.mlTensor, e) : this.mlContext.readTensor(this.mlTensor) } canReuseTensor(e, t, r) { return this.mlContext === e && this.dataType === t && this.tensorShape.length === r.length && this.tensorShape.every((i, a) => i === r[a]) } setIsDataConverted(e) { this.isDataConverted = e } }, ji = class { constructor(e, t) { this.tensorManager = e, this.wrapper = t } get tensorWrapper() { return this.wrapper } releaseTensor() { this.tensorWrapper && (this.tensorManager.releaseTensor(this.tensorWrapper), this.wrapper = void 0) } async ensureTensor(e, t, r, i) { let a = this.tensorManager.getMLContext(e), n = this.tensorManager.getMLOpSupportLimits(e), s; if (!(n != null && n.input.dataTypes.includes(t))) { if (s = Do.get(t), !s || (n == null ? void 0 : n.input.dataTypes.includes(s))) throw new Error(`WebNN backend does not support data type: ${t}`); de("verbose", () => `[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`) } if (this.wrapper) { if (this.wrapper.canReuseTensor(a, t, r)) return this.wrapper.tensor; if (i) { if (this.wrapper.byteLength !== Hi(t, r)) throw new Error("Unable to copy data to tensor with different size."); this.activeUpload = new Uint8Array(await this.wrapper.read()) } this.tensorManager.releaseTensor(this.wrapper) } let u = typeof MLTensorUsage > "u" ? void 0 : MLTensorUsage.READ | MLTensorUsage.WRITE; return this.wrapper = await this.tensorManager.getCachedTensor(e, t, r, u, !0, !0, s), i && this.activeUpload && (this.wrapper.write(this.activeUpload), this.activeUpload = void 0), this.wrapper.tensor } upload(e) { let t = e; if (this.wrapper) { if (this.wrapper.fallbackType) if (this.wrapper.fallbackType === "int32") t = Aa(e, this.wrapper.type), this.wrapper.setIsDataConverted(!0); else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`); if (e.byteLength === this.wrapper.byteLength) { this.wrapper.write(t); return } else de("verbose", () => "Data size does not match tensor size. Releasing tensor."), this.releaseTensor() } this.activeUpload ? this.activeUpload.set(t) : this.activeUpload = new Uint8Array(t) } async download(e) { var t, r; if (this.activeUpload) { let i = (t = this.wrapper) != null && t.isDataConverted ? Vi(this.activeUpload, (r = this.wrapper) == null ? void 0 : r.type) : this.activeUpload; if (e) { e instanceof ArrayBuffer ? new Uint8Array(e).set(i) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength).set(i); return } else return i.buffer } if (!this.wrapper) throw new Error("Tensor has not been created."); return e ? this.wrapper.read(e) : this.wrapper.read() } }, Uo = class { constructor(e) { this.backend = e, this.tensorTrackersById = new Map, this.freeTensors = [], this.externalTensors = new Set } getMLContext(e) { let t = this.backend.getMLContext(e); if (!t) throw new Error("MLContext not found for session."); return t } getMLOpSupportLimits(e) { return this.backend.getMLOpSupportLimits(e) } reserveTensorId() { let e = Gi(); return this.tensorTrackersById.set(e, new ji(this)), e } releaseTensorId(e) { let t = this.tensorTrackersById.get(e); t && (this.tensorTrackersById.delete(e), t.tensorWrapper && this.releaseTensor(t.tensorWrapper)) } async ensureTensor(e, t, r, i, a) { de("verbose", () => `[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`); let n = this.tensorTrackersById.get(t); if (!n) throw new Error("Tensor not found."); return n.ensureTensor(e, r, i, a) } upload(e, t) { let r = this.tensorTrackersById.get(e); if (!r) throw new Error("Tensor not found."); r.upload(t) } async download(e, t) { de("verbose", () => `[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t == null ? void 0 : t.byteLength}}`); let r = this.tensorTrackersById.get(e); if (!r) throw new Error("Tensor not found."); return r.download(t) } releaseTensorsForSession(e) { for (let t of this.freeTensors) t.sessionId === e && t.destroy(); this.freeTensors = this.freeTensors.filter(t => t.sessionId !== e) } registerTensor(e, t, r, i) { let a = this.getMLContext(e), n = Gi(), s = new Fi({ sessionId: e, context: a, tensor: t, dataType: r, shape: i }); return this.tensorTrackersById.set(n, new ji(this, s)), this.externalTensors.add(s), n } async getCachedTensor(e, t, r, i, a, n, s) { let u = this.getMLContext(e); for (let [p, f] of this.freeTensors.entries()) if (f.canReuseTensor(u, t, r)) { de("verbose", () => `[WebNN] Reusing tensor {dataType: ${t}, ${s ? `fallbackDataType: ${s},` : ""} shape: ${r}`); let h = this.freeTensors.splice(p, 1)[0]; return h.sessionId = e, h } de("verbose", () => `[WebNN] MLContext.createTensor {dataType: ${t}, ${s ? `fallbackDataType: ${s},` : ""} shape: ${r}}`); let l = await u.createTensor({ dataType: s ?? t, shape: r, dimensions: r, usage: i, writable: a, readable: n }); return new Fi({ sessionId: e, context: u, tensor: l, dataType: t, shape: r, fallbackDataType: s }) } releaseTensor(e) { this.externalTensors.has(e) && this.externalTensors.delete(e), this.freeTensors.push(e) } }, Cp = (...e) => new Uo(...e) }), rr, Po, Ap, w0 = U(() => { te(), Dt(), zp(), b0(), lt(), rr = new Map([[1, "float32"], [10, "float16"], [6, "int32"], [12, "uint32"], [7, "int64"], [13, "uint64"], [22, "int4"], [21, "uint4"], [3, "int8"], [2, "uint8"], [9, "uint8"]]), Po = (e, t) => { if (e === t) return !0; if (e === void 0 || t === void 0) return !1; let r = Object.keys(e).sort(), i = Object.keys(t).sort(); return r.length === i.length && r.every((a, n) => a === i[n] && e[a] === t[a]) }, Ap = class { constructor(e) { this.tensorManager = Cp(this), this.mlContextBySessionId = new Map, this.sessionIdsByMLContext = new Map, this.mlContextCache = [], this.sessionGraphInputs = new Map, this.sessionGraphOutputs = new Map, this.temporaryGraphInputs = [], this.temporaryGraphOutputs = [], this.temporarySessionTensorIds = new Map, this.mlOpSupportLimitsBySessionId = new Map, tn(e.logLevel, !!e.debug) } get currentSessionId() { if (this.activeSessionId === void 0) throw new Error("No active session"); return this.activeSessionId } onRunStart(e) { de("verbose", () => `[WebNN] onRunStart {sessionId: ${e}}`), this.activeSessionId = e } onRunEnd(e) { de("verbose", () => `[WebNN] onRunEnd {sessionId: ${e}}`); let t = this.temporarySessionTensorIds.get(e); if (t) { for (let r of t) de("verbose", () => `[WebNN] releasing temporary tensor {tensorId: ${r}}`), this.tensorManager.releaseTensorId(r); this.temporarySessionTensorIds.delete(e), this.activeSessionId = void 0 } } async createMLContext(e) { if (e instanceof GPUDevice) { let r = this.mlContextCache.findIndex(i => i.gpuDevice === e); if (r !== -1) return this.mlContextCache[r].mlContext; { let i = await navigator.ml.createContext(e); return this.mlContextCache.push({ gpuDevice: e, mlContext: i }), i } } else if (e === void 0) { let r = this.mlContextCache.findIndex(i => i.options === void 0 && i.gpuDevice === void 0); if (r !== -1) return this.mlContextCache[r].mlContext; { let i = await navigator.ml.createContext(); return this.mlContextCache.push({ mlContext: i }), i } } let t = this.mlContextCache.findIndex(r => Po(r.options, e)); if (t !== -1) return this.mlContextCache[t].mlContext; { let r = await navigator.ml.createContext(e); return this.mlContextCache.push({ options: e, mlContext: r }), r } } registerMLContext(e, t) { this.mlContextBySessionId.set(e, t); let r = this.sessionIdsByMLContext.get(t); r || (r = new Set, this.sessionIdsByMLContext.set(t, r)), r.add(e), this.mlOpSupportLimitsBySessionId.has(e) || this.mlOpSupportLimitsBySessionId.set(e, t.opSupportLimits()), this.temporaryGraphInputs.length > 0 && (this.sessionGraphInputs.set(e, this.temporaryGraphInputs), this.temporaryGraphInputs = []), this.temporaryGraphOutputs.length > 0 && (this.sessionGraphOutputs.set(e, this.temporaryGraphOutputs), this.temporaryGraphOutputs = []) } onReleaseSession(e) { this.sessionGraphInputs.delete(e), this.sessionGraphOutputs.delete(e); let t = this.mlContextBySessionId.get(e); if (!t) return; this.tensorManager.releaseTensorsForSession(e), this.mlContextBySessionId.delete(e), this.mlOpSupportLimitsBySessionId.delete(e); let r = this.sessionIdsByMLContext.get(t); if (r.delete(e), r.size === 0) { this.sessionIdsByMLContext.delete(t); let i = this.mlContextCache.findIndex(a => a.mlContext === t); i !== -1 && this.mlContextCache.splice(i, 1) } } getMLContext(e) { return this.mlContextBySessionId.get(e) } getMLOpSupportLimits(e) { return this.mlOpSupportLimitsBySessionId.get(e) } reserveTensorId() { return this.tensorManager.reserveTensorId() } releaseTensorId(e) { de("verbose", () => `[WebNN] releaseTensorId {tensorId: ${e}}`), this.tensorManager.releaseTensorId(e) } async ensureTensor(e, t, r, i, a) { let n = rr.get(r); if (!n) throw new Error(`Unsupported ONNX data type: ${r}`); return this.tensorManager.ensureTensor(e ?? this.currentSessionId, t, n, i, a) } async createTemporaryTensor(e, t, r) { de("verbose", () => `[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`); let i = rr.get(t); if (!i) throw new Error(`Unsupported ONNX data type: ${t}`); let a = this.tensorManager.reserveTensorId(); await this.tensorManager.ensureTensor(e, a, i, r, !1); let n = this.temporarySessionTensorIds.get(e); return n ? n.push(a) : this.temporarySessionTensorIds.set(e, [a]), a } uploadTensor(e, t) { if (!_e().shouldTransferToMLTensor) throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false"); de("verbose", () => `[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`), this.tensorManager.upload(e, t) } async downloadTensor(e, t) { return this.tensorManager.download(e, t) } createMLTensorDownloader(e, t) { return async () => { let r = await this.tensorManager.download(e); return rn(r, t) } } registerMLTensor(e, t, r, i) { let a = rr.get(r); if (!a) throw new Error(`Unsupported ONNX data type: ${r}`); let n = this.tensorManager.registerTensor(e, t, a, i); return de("verbose", () => `[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${n}}`), n } registerMLConstant(e, t, r, i, a, n, s = !1) { if (!n) throw new Error("External mounted files are not available."); let u = e; e.startsWith("./") && (u = e.substring(2)); let l = n.get(u); if (!l) throw new Error(`File with name ${u} not found in preloaded files.`); if (t + r > l.byteLength) throw new Error("Out of bounds: data offset and length exceed the external file data size."); let p = l.slice(t, t + r).buffer, f; switch (a.dataType) { case "float32": f = new Float32Array(p); break; case "float16": f = typeof Float16Array < "u" && Float16Array.from ? new Float16Array(p) : new Uint16Array(p); break; case "int32": f = new Int32Array(p); break; case "uint32": f = new Uint32Array(p); break; case "int64": if (s) { let h = Aa(new Uint8Array(p), "int64"); f = new Int32Array(h.buffer), a.dataType = "int32" } else f = new BigInt64Array(p); break; case "uint64": f = new BigUint64Array(p); break; case "int8": f = new Int8Array(p); break; case "int4": case "uint4": case "uint8": f = new Uint8Array(p); break; default: throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`) }return de("verbose", () => `[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${s ? "(Note: it was int64 data type and registered to int32 as workaround)" : ""}`), i.constant(a, f) } registerGraphInput(e) { this.temporaryGraphInputs.push(e) } registerGraphOutput(e) { this.temporaryGraphOutputs.push(e) } isGraphInput(e, t) { let r = this.sessionGraphInputs.get(e); return r ? r.includes(t) : !1 } isGraphOutput(e, t) { let r = this.sessionGraphOutputs.get(e); return r ? r.includes(t) : !1 } isGraphInputOutputTypeSupported(e, t, r = !0) { let i = rr.get(zt(t)), a = this.mlOpSupportLimitsBySessionId.get(e); return typeof i > "u" ? !1 : r ? !!(a != null && a.input.dataTypes.includes(i)) : !!(a != null && a.output.dataTypes.includes(i)) } flush() { } } }), an = U(() => { }), Ki, Nr, Mr, qo, Lo, Xi, Oa, Wo, Op, $0 = U(() => {
  lt(), an(), Ki = new Map([[64, 250], [128, 200], [256, 200], [512, 200], [2048, 230], [4096, 200], [8192, 50], [16384, 50], [32768, 50], [65536, 50], [131072, 50], [262144, 50], [524288, 50], [1048576, 50], [2097152, 30], [4194304, 20], [8388608, 10], [12582912, 10], [16777216, 10], [26214400, 15], [33554432, 22], [44236800, 2], [58982400, 6], [67108864, 6], [134217728, 6], [167772160, 6]]), Nr = [], Mr = e => Math.ceil(Number(e) / 16) * 16, qo = e => { for (let t = 0; t < Nr.length; t++) { let r = Nr[t]; if (e <= r) return r } return Math.ceil(e / 16) * 16 }, Lo = 1, Xi = () => Lo++, Oa = async (e, t, r, i) => { let a = Mr(r), n = e.device.createBuffer({ size: a, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ }); try { let s = e.getCommandEncoder(); e.endComputePass(), s.copyBufferToBuffer(t, 0, n, 0, a), e.flush(), await n.mapAsync(GPUMapMode.READ); let u = n.getMappedRange(); if (i) { let l = i(); return l.set(new Uint8Array(u, 0, r)), l } else return new Uint8Array(u.slice(0, r)) } finally { n.destroy() } }, Wo = class {
    constructor(e) { this.backend = e, this.storageCache = new Map, this.freeBuffers = new Map, this.freeUniformBuffers = new Map, this.buffersPending = [], this.capturedPendingBuffers = new Map; for (let [t] of Ki) Nr.push(t), this.freeBuffers.set(t, []), this.freeUniformBuffers.set(t, []); this.sessionCount = 0 } upload(e, t) { let r = t.buffer, i = t.byteOffset, a = t.byteLength, n = Mr(a), s = this.storageCache.get(e); if (!s) throw new Error("gpu data for uploading does not exist"); if (Number(s.originalSize) !== a) throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`); let u = this.backend.device.createBuffer({ mappedAtCreation: !0, size: n, usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC }), l = u.getMappedRange(); new Uint8Array(l).set(new Uint8Array(r, i, a)), u.unmap(); let p = this.backend.device.createCommandEncoder(); p.copyBufferToBuffer(u, 0, s.gpuData.buffer, 0, n), this.backend.device.queue.submit([p.finish()]), u.destroy(), de("verbose", () => `[WebGPU] GpuDataManager.upload(id=${e})`) } memcpy(e, t) { let r = this.storageCache.get(e); if (!r) throw new Error("source gpu data for memcpy does not exist"); let i = this.storageCache.get(t); if (!i) throw new Error("destination gpu data for memcpy does not exist"); if (r.originalSize !== i.originalSize) throw new Error("inconsistent source and destination gpu data size"); let a = Mr(r.originalSize), n = this.backend.getCommandEncoder(); this.backend.endComputePass(), n.copyBufferToBuffer(r.gpuData.buffer, 0, i.gpuData.buffer, 0, a) } registerExternalBuffer(e, t, r) {
      let i; if (r) {
        if (i = r[0], e === r[1]) return de("verbose", () => `[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`), i; if (this.backend.capturedCommandList.has(this.backend.currentSessionId)) throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)
      } else i = Xi(); return this.storageCache.set(i, { gpuData: { id: i, type: 0, buffer: e }, originalSize: t }), de("verbose", () => `[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`), i
    } unregisterExternalBuffer(e) { e !== void 0 && (this.storageCache.delete(e), de("verbose", () => `[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`)) } create(e, t = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST) { let r = qo(e), i, a = (t & GPUBufferUsage.STORAGE) === GPUBufferUsage.STORAGE, n = (t & GPUBufferUsage.UNIFORM) === GPUBufferUsage.UNIFORM; if (a || n) { let u = (a ? this.freeBuffers : this.freeUniformBuffers).get(r); u ? u.length > 0 ? i = u.pop() : i = this.backend.device.createBuffer({ size: r, usage: t }) : i = this.backend.device.createBuffer({ size: r, usage: t }) } else i = this.backend.device.createBuffer({ size: r, usage: t }); let s = { id: Xi(), type: 0, buffer: i }; return this.storageCache.set(s.id, { gpuData: s, originalSize: Number(e) }), de("verbose", () => `[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`), s } get(e) { var t; return (t = this.storageCache.get(e)) == null ? void 0 : t.gpuData } release(e) { let t = typeof e == "bigint" ? Number(e) : e, r = this.storageCache.get(t); if (!r) { if (this.storageCache.size === 0) return 0; throw new Error("releasing data does not exist") } return de("verbose", () => `[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`), this.storageCache.delete(t), this.buffersPending.push(r.gpuData.buffer), r.originalSize } async download(e, t) { let r = this.storageCache.get(Number(e)); if (!r) throw new Error("data does not exist"); await Oa(this.backend, r.gpuData.buffer, r.originalSize, t) } refreshPendingBuffers() { if (this.buffersPending.length !== 0) if (this.backend.sessionStatus === "default") { for (let e of this.buffersPending) { let t = Ki.get(e.size); if ((e.usage & GPUBufferUsage.STORAGE) === GPUBufferUsage.STORAGE) { let r = this.freeBuffers.get(e.size) || []; t === void 0 || r.length >= t ? e.destroy() : r.push(e) } else if ((e.usage & GPUBufferUsage.UNIFORM) === GPUBufferUsage.UNIFORM) { let r = this.freeUniformBuffers.get(e.size) || []; t === void 0 || r.length >= t ? e.destroy() : r.push(e) } else e.destroy() } this.buffersPending = [] } else { let e = this.capturedPendingBuffers.get(this.backend.currentSessionId); e || (e = [], this.capturedPendingBuffers.set(this.backend.currentSessionId, e)); for (let t of this.buffersPending) e.push(t); this.buffersPending = [] } } dispose() { this.freeBuffers.forEach(e => { e.forEach(t => { t.destroy() }) }), this.freeUniformBuffers.forEach(e => { e.forEach(t => { t.destroy() }) }), this.storageCache.forEach(e => { e.gpuData.buffer.destroy() }), this.capturedPendingBuffers.forEach(e => { e.forEach(t => { t.destroy() }) }), this.storageCache = new Map, this.freeBuffers = new Map, this.freeUniformBuffers = new Map, this.capturedPendingBuffers = new Map } onCreateSession() { this.sessionCount += 1 } onReleaseSession(e) { let t = this.capturedPendingBuffers.get(e); t && (t.forEach(r => { r.destroy() }), this.capturedPendingBuffers.delete(e)), this.sessionCount -= 1, this.sessionCount === 0 && (de("warning", () => "[WebGPU] Clearing webgpu buffer cache"), this.storageCache.forEach(r => { r.gpuData.buffer.destroy() }), this.storageCache = new Map) }
  }, Op = (...e) => new Wo(...e)
}), Vo, fe, xe = U(() => { Vo = class { constructor(e) { Object.assign(this, e) } get cacheKey() { return this.key || (this.key = Object.getOwnPropertyNames(this).sort().map(e => `${this[e]}`).join(";")), this.key } }, fe = e => new Vo(e) }), Ft, Dr, Ie, Ce, J, ve, Ra, Gt, bt, Y, ir, N, Q, Rp, nn, Go, Bp, ae = U(() => {
  te(), ie(), Ft = 64, Dr = (e, t) => { if (t === 3) throw new Error("vec3 has same alignment as vec4, use vec4 instead"); switch (Number(e)) { case 10: return t > 1 ? `vec${t}<f16>` : "f16"; case 1: return t > 1 ? `vec${t}<f32>` : "f32"; case 6: return t > 1 ? `vec${t}<i32>` : "i32"; case 12: return t > 1 ? `vec${t}<u32>` : "u32"; case 7: if (t > 1) throw new Error("currently not supported vecX of uint64 yet"); return ["vec2<u32>", "i32"]; case 13: if (t > 1) throw new Error("currently not supported vecX of uint64 yet"); return ["vec2<u32>", "u32"]; case 9: if (t !== 4) throw new Error("bool must be vec4"); return ["u32", "vec4<bool>"]; case 22: return "i32"; case 21: return "u32"; default: throw new Error(`Unknown data type: ${e}`) } }, Ie = (e, t = 1) => { let r = Dr(e, t); return typeof r == "string" ? r : r[0] }, Ce = (e, t = 1) => { let r = Dr(e, t); return typeof r == "string" ? r : r[1] }, J = (...e) => { let t = []; return e.forEach(r => { r.length !== 0 && t.push({ type: 12, data: r }, { type: 12, data: O.computeStrides(r) }) }), t }, ve = e => e % 4 === 0 ? 4 : e % 2 === 0 ? 2 : 1, Ra = (e = "f32", t, r = "0") => !t || t === 1 ? `${e}(${r})` : `vec${t}<${e}>(${r})`, Gt = (e, t, r) => e === "f32" ? r : t === 1 ? `f32(${r})` : `vec${t}<f32>(${r})`, bt = (e, t) => t === 4 ? `(${e}.x + ${e}.y + ${e}.z + ${e}.w)` : t === 2 ? `(${e}.x + ${e}.y)` : t === 3 ? `(${e}.x + ${e}.y + ${e}.z)` : e, Y = (e, t, r, i) => e.startsWith("uniforms.") && r > 4 ? typeof t == "string" ? i === "f16" ? `${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]` : `${e}[(${t}) / 4][(${t}) % 4]` : i === "f16" ? `${e}[${Math.floor(t / 8)}][${Math.floor(t % 8 / 4)}][${t % 8 % 4}]` : `${e}[${Math.floor(t / 4)}][${t % 4}]` : r > 1 ? `${e}[${t}]` : e, ir = (e, t, r, i, a) => {
    let n = typeof r == "number", s = n ? r : r.length, u = [...new Array(s).keys()], l = s < 2 ? "u32" : s <= 4 ? `vec${s}<u32>` : `array<u32, ${s}>`, p = Dr(t, a), f = typeof p == "string" ? p : p[1], h = typeof p == "string" ? p : p[0], g = { indices: l, value: f, storage: h, tensor: t }, y = P => typeof P == "string" ? P : `${P}u`, _ = { offsetToIndices: !1, indicesToOffset: !1, broadcastedIndicesToOffset: !1, set: !1, setByIndices: !1, get: !1, getByIndices: !1 }, b = n ? "uniforms." : "", S = `${b}${e}_shape`, v = `${b}${e}_strides`, w = ""; for (let P = 0; P < s - 1; P++)w += `
    let dim${P} = current / ${Y(v, P, s)};
    let rest${P} = current % ${Y(v, P, s)};
    indices[${P}] = dim${P};
    current = rest${P};
    `; w += `indices[${s - 1}] = current;`; let I = s < 2 ? "" : `
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`, T = P => (_.offsetToIndices = !0, s < 2 ? P : `o2i_${e}(${P})`), E = []; if (s >= 2) for (let P = s - 1; P >= 0; P--)E.push(`${Y(v, P, s)} * (indices[${P}])`); let C = s < 2 ? "" : `
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${E.join("+")};
  }`, A = P => (_.indicesToOffset = !0, s < 2 ? P : `i2o_${e}(${P})`), x = (...P) => s === 0 ? "0u" : `${g.indices}(${P.map(y).join(",")})`, M = (P, V) => s < 2 ? `${P}` : `${Y(P, V, s)}`, D = (P, V, Z) => s < 2 ? `${P}=${Z};` : `${Y(P, V, s)}=${Z};`, H = {}, F = (P, V) => {
        _.broadcastedIndicesToOffset = !0; let Z = `${V.name}broadcastedIndicesTo${e}Offset`; if (Z in H) return `${Z}(${P})`; let q = []; for (let me = s - 1; me >= 0; me--) { let We = V.indicesGet("outputIndices", me + V.rank - s); q.push(`${M(v, me)} * (${We} % ${M(S, me)})`) } return H[Z] = `fn ${Z}(outputIndices: ${V.type.indices}) -> u32 {
             return ${q.length > 0 ? q.join("+") : "0u"};
           }`, `${Z}(${P})`
      }, j = (P, V) => (() => { if (g.storage === g.value) return `${e}[${P}]=${V};`; if (g.storage === "vec2<u32>" && g.value === "i32") return `${e}[${P}]=vec2<u32>(u32(${V}), select(0u, 0xFFFFFFFFu, ${V} < 0));`; if (g.storage === "vec2<u32>" && g.value === "u32") return `${e}[${P}]=vec2<u32>(u32(${V}), 0u);`; if (g.storage === "u32" && g.value === "vec4<bool>") return `${e}[${P}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${V}));`; throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`) })(), R = P => (() => { if (g.storage === g.value) return `${e}[${P}]`; if (g.storage === "vec2<u32>" && g.value === "i32") return `i32(${e}[${P}].x)`; if (g.storage === "vec2<u32>" && g.value === "u32") return `u32(${e}[${P}].x)`; if (g.storage === "u32" && g.value === "vec4<bool>") return `vec4<bool>(bool(${e}[${P}] & 0xFFu), bool(${e}[${P}] & 0xFF00u), bool(${e}[${P}] & 0xFF0000u), bool(${e}[${P}] & 0xFF000000u))`; throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`) })(), K = s < 2 ? "" : `
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${f} {
    return ${R(`i2o_${e}(indices)`)};
  }`, X = s < 2 ? "" : (() => {
        let P = u.map(Z => `d${Z}: u32`).join(", "), V = u.map(Z => `d${Z}`).join(", "); return `
  fn get_${e}(${P}) -> ${f} {
    return get_${e}ByIndices(${x(V)});
  }`})(), ee = (...P) => { if (P.length !== s) throw new Error(`indices length must be ${s}`); let V = P.map(y).join(","); return s === 0 ? R("0u") : s === 1 ? R(V[0]) : (_.get = !0, _.getByIndices = !0, _.indicesToOffset = !0, `get_${e}(${V})`) }, he = P => s < 2 ? R(P) : (_.getByIndices = !0, _.indicesToOffset = !0, `get_${e}ByIndices(${P})`), W = s < 2 ? "" : `
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${f}) {
    ${j(`i2o_${e}(indices)`, "value")}
  }`, ue = s < 2 ? "" : (() => {
        let P = u.map(Z => `d${Z}: u32`).join(", "), V = u.map(Z => `d${Z}`).join(", "); return `
  fn set_${e}(${P}, value: ${f}) {
    set_${e}ByIndices(${x(V)}, value);
  }`})(); return {
      impl: () => {
        let P = [], V = !1; return _.offsetToIndices && (P.push(I), V = !0), _.indicesToOffset && (P.push(C), V = !0), _.broadcastedIndicesToOffset && (Object.values(H).forEach(Z => P.push(Z)), V = !0), _.set && (P.push(ue), V = !0), _.setByIndices && (P.push(W), V = !0), _.get && (P.push(X), V = !0), _.getByIndices && (P.push(K), V = !0), !n && V && P.unshift(`const ${S} = ${g.indices}(${r.join(",")});`, `const ${v} = ${g.indices}(${O.computeStrides(r).join(",")});`), P.join(`
`)
      }, type: g, offsetToIndices: T, indicesToOffset: A, broadcastedIndicesToOffset: F, indices: x, indicesGet: M, indicesSet: D, set: (...P) => { if (P.length !== s + 1) throw new Error(`indices length must be ${s}`); let V = P[s]; if (typeof V != "string") throw new Error("value must be string"); let Z = P.slice(0, s).map(y).join(","); return s === 0 ? j("0u", V) : s === 1 ? j(Z[0], V) : (_.set = !0, _.setByIndices = !0, _.indicesToOffset = !0, `set_${e}(${Z}, ${V})`) }, setByOffset: j, setByIndices: (P, V) => s < 2 ? j(P, V) : (_.setByIndices = !0, _.indicesToOffset = !0, `set_${e}ByIndices(${P}, ${V});`), get: ee, getByOffset: R, getByIndices: he, usage: i, name: e, strides: v, shape: S, rank: s
    }
  }, N = (e, t, r, i = 1) => ir(e, t, r, "input", i), Q = (e, t, r, i = 1) => ir(e, t, r, "output", i), Rp = (e, t, r) => ir(e, t, r, "atomicOutput", 1), nn = (e, t, r, i = 1) => ir(e, t, r, "internal", i), Go = class {
    constructor(e, t) { this.normalizedDispatchGroup = e, this.limits = t, this.internalVariables = [], this.variables = [], this.uniforms = [], this.variableIndex = 0 } guardAgainstOutOfBoundsWorkgroupSizes(e) { return `if (global_idx >= ${typeof e == "number" ? `${e}u` : e}) { return; }` } mainStart(e = Ft) {
      let t = typeof e == "number" ? e : e[0], r = typeof e == "number" ? 1 : e[1], i = typeof e == "number" ? 1 : e[2]; if (t > this.limits.maxComputeWorkgroupSizeX || r > this.limits.maxComputeWorkgroupSizeY || i > this.limits.maxComputeWorkgroupSizeZ) throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`); if (t * r * i > this.limits.maxComputeInvocationsPerWorkgroup) throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`); let a = this.normalizedDispatchGroup[1] === 1 && this.normalizedDispatchGroup[2] === 1, n = a ? `@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`: `@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`, s = a ? `let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`: `let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t * r * i}u + local_idx;`; return `@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${n}) {
    ${s}
  `} appendVariableUniforms(e) { e.rank !== 0 && (e.shape.startsWith("uniforms.") && this.uniforms.push({ name: e.shape.replace("uniforms.", ""), type: "u32", length: e.rank }), e.strides.startsWith("uniforms.") && this.uniforms.push({ name: e.strides.replace("uniforms.", ""), type: "u32", length: e.rank })) } declareVariable(e, t) { if (e.usage === "internal") throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead."); this.variables.push(e), this.appendVariableUniforms(e); let r = e.usage === "input" ? "read" : "read_write", i = e.usage === "atomicOutput" ? "atomic<i32>" : e.type.storage; return `@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;` } declareVariables(...e) {
      return e.map(t => this.declareVariable(t, this.variableIndex++)).join(`
`)
    } registerInternalVariable(e) { if (e.usage !== "internal") throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead."); this.internalVariables.push(e), this.appendVariableUniforms(e) } registerInternalVariables(...e) { return e.forEach(t => this.registerInternalVariable(t)), this } registerUniform(e, t, r = 1) { return this.uniforms.push({ name: e, type: t, length: r }), this } registerUniforms(e) { return this.uniforms = this.uniforms.concat(e), this } uniformDeclaration() {
      if (this.uniforms.length === 0) return ""; let e = []; for (let { name: t, type: r, length: i } of this.uniforms) if (i && i > 4) r === "f16" ? e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i / 8)}>`) : e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i / 4)}>`); else { let a = i == null || i === 1 ? r : `vec${i}<${r}>`; e.push(`${t}:${a}`) } return `
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`
    } get additionalImplementations() {
      return this.uniformDeclaration() + this.variables.map(e => e.impl()).join(`
`) + this.internalVariables.map(e => e.impl()).join(`
`)
    } get variablesInfo() { if (this.uniforms.length === 0) return; let e = t => [12, 10, 1, 6][["u32", "f16", "f32", "i32"].indexOf(t)]; return this.uniforms.map(t => [e(t.type), t.length ?? 1]) }
  }, Bp = (e, t) => new Go(e, t)
}), Ho, Zi, Fo, jo, Ko, Xo, Le, Np, Mp, wt = U(() => {
  te(), ie(), xe(), ae(), Ho = (e, t) => { if (!e || e.length !== 1) throw new Error("Transpose requires 1 input."); if (t.length !== 0 && t.length !== e[0].dims.length) throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`) }, Zi = (e, t) => t.length !== 0 ? t : [...new Array(e).keys()].reverse(), Fo = (e, t) => O.sortBasedOnPerm(e, Zi(e.length, t)), jo = (e, t, r, i) => {
    let a = `fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`; for (let n = 0; n < t; ++n)a += `a[${e[n]}]=i[${n}];`; return a += "return a;}"
  }, Ko = (e, t) => { let r = [], i = []; for (let a = 0; a < e.length; ++a)e[a] !== 1 && r.push(e[a]), e[t[a]] !== 1 && i.push(t[a]); return { newShape: r, newPerm: i } }, Xo = (e, t) => { let r = 0; for (let i = 0; i < e.length; ++i)if (t[e[i]] !== 1) { if (e[i] < r) return !1; r = e[i] } return !0 }, Le = (e, t) => {
    let r = e.dataType, i = e.dims.length, a = Zi(i, t), n = Fo(e.dims, a), s = e.dims, u = n, l = i < 2 || Xo(a, e.dims), p; if (l) return p = _ => {
      let b = N("input", r, s, 4), S = Q("output", r, u, 4); return `
  ${_.registerUniform("output_size", "u32").declareVariables(b, S)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}, { name: "TransposeCopy", shaderCache: { inputDependencies: ["type"] }, getRunData: () => { let _ = O.size(n); return { outputs: [{ dims: n, dataType: e.dataType }], dispatchGroup: { x: Math.ceil(_ / 64 / 4) }, programUniforms: [{ type: 12, data: Math.ceil(_ / 4) }] } }, getShaderSource: p }; let { newShape: f, newPerm: h } = Ko(e.dims, a), g = O.areEqual(h, [2, 3, 1]), y = O.areEqual(h, [3, 1, 2]); if (f.length === 2 || g || y) {
      s = g ? [f[0], f[1] * f[2]] : y ? [f[0] * f[1], f[2]] : f, u = [s[1], s[0]]; let _ = 16; return p = b => {
        let S = N("a", r, s.length), v = Q("output", r, u.length); return `
  ${b.registerUniform("output_size", "u32").declareVariables(S, v)}
  var<workgroup> tile : array<array<${v.type.value}, ${_ + 1}>, ${_}>;
  ${b.mainStart([_, _, 1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`, "tile[local_id.x][local_id.y]")}
    }
  }`}, { name: "TransposeShared", shaderCache: { inputDependencies: ["type"] }, getRunData: () => { let b = O.size(n); return { outputs: [{ dims: n, dataType: e.dataType }], dispatchGroup: { x: Math.ceil(u[1] / _), y: Math.ceil(u[0] / _) }, programUniforms: [{ type: 12, data: b }, ...J(s, u)] } }, getShaderSource: p }
    } return p = _ => {
      let b = N("a", r, s.length), S = Q("output", r, u.length); return `
  ${_.registerUniform("output_size", "u32").declareVariables(b, S)}

  ${jo(a, i, b, S)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx", b.getByIndices("aIndices"))}
  }`}, { name: "Transpose", shaderCache: { hint: `${t}`, inputDependencies: ["rank"] }, getRunData: () => { let _ = O.size(n); return { outputs: [{ dims: n, dataType: e.dataType }], dispatchGroup: { x: Math.ceil(_ / 64) }, programUniforms: [{ type: 12, data: _ }, ...J(s, u)] } }, getShaderSource: p }
  }, Np = (e, t) => { Ho(e.inputs, t.perm), e.compute(Le(e.inputs[0], t.perm)) }, Mp = e => fe({ perm: e.perm })
}), Zo, Qo, Yo, Jo, eu, tu, ru, iu, au, nu, Fe, Dp, Up, Pp, qp, Lp, Wp, Vp, Gp, Hp, Fp, v0 = U(() => {
  te(), ie(), ae(), sn(), wt(), Zo = { max: "select(bestValue, candidate, candidate > bestValue)", min: "select(bestValue, candidate, candidate < bestValue)", mean: "bestValue + candidate", sum: "bestValue + candidate", prod: "bestValue * candidate", sumSquare: "bestValue + candidate * candidate", logSumExp: "bestValue + exp(candidate)", l1: "bestValue + abs(candidate)", l2: "bestValue + candidate * candidate", logSum: "bestValue + candidate" }, Qo = { max: "select(bestValue, candidate, candidate > bestValue)", min: "select(bestValue, candidate, candidate < bestValue)", mean: "bestValue + candidate", sum: "bestValue + candidate", prod: "bestValue * candidate", sumSquare: "bestValue + candidate", logSumExp: "bestValue + candidate", l1: "bestValue + candidate", l2: "bestValue + candidate", logSum: "bestValue + candidate" }, Yo = { max: "_A[offset]", min: "_A[offset]", mean: "0", sum: "0", prod: "1", sumSquare: "0", logSumExp: "0", l1: "0", l2: "0", logSum: "0" }, Jo = { max: "bestValue", min: "bestValue", sum: "bestValue", prod: "bestValue", sumSquare: "bestValue", logSumExp: "log(bestValue)", l1: "bestValue", l2: "sqrt(bestValue)", logSum: "log(bestValue)" }, eu = (e, t) => { let r = []; for (let i = t - e; i < t; ++i)r.push(i); return r }, tu = (e, t) => { let r = [], i = e.length; for (let n = 0; n < i; n++)t.indexOf(n) === -1 && r.push(e[n]); let a = t.map(n => e[n]); return [r, a] }, ru = (e, t) => { let r = e.length + t.length, i = [], a = 0; for (let n = 0; n < r; n++)t.indexOf(n) === -1 ? i.push(e[a++]) : i.push(1); return i }, iu = (e, t) => { for (let r = 0; r < e.length; ++r)if (e[e.length - r - 1] !== t - 1 - r) return !1; return !0 }, au = (e, t) => { let r = []; if (!iu(e, t)) { for (let i = 0; i < t; ++i)e.indexOf(i) === -1 && r.push(i); e.forEach(i => r.push(i)) } return r }, nu = (e, t, r, i, a, n, s) => {
    let u = r[0].dims, l = O.size(n), p = O.size(s), f = N("_A", r[0].dataType, u), h = Q("output", a, n), g = 64; l === 1 && (g = 256); let y = `
          var<workgroup> aBestValues : array<f32, ${g}>;
       `, _ = b => `
        ${b.registerUniform("reduceSize", "u32").declareVariables(f, h)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Yo[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${Zo[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Qo[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex", `${i === "mean" ? `${h.type.storage}(bestValue / f32(uniforms.reduceSize))` : `${h.type.storage}(${Jo[i]})`}`)};
         }
        }`; return { name: e, shaderCache: { hint: `${t};${g}`, inputDependencies: ["type"] }, getShaderSource: _, getRunData: () => ({ outputs: [{ dims: n, dataType: a }], dispatchGroup: { x: l }, programUniforms: [{ type: 12, data: p }] }) }
  }, Fe = (e, t, r, i) => { let a = e.inputs.length === 1 ? r : Ba(e.inputs, r), n = a.axes; n.length === 0 && !a.noopWithEmptyAxes && (n = e.inputs[0].dims.map((y, _) => _)); let s = O.normalizeAxes(n, e.inputs[0].dims.length), u = s, l = e.inputs[0], p = au(u, e.inputs[0].dims.length); p.length > 0 && (l = e.compute(Le(e.inputs[0], p), { inputs: [0], outputs: [-1] })[0], u = eu(u.length, l.dims.length)); let [f, h] = tu(l.dims, u), g = f; a.keepDims && (g = ru(f, s)), e.compute(nu(t, a.cacheKey, [l], i, e.inputs[0].dataType, g, h), { inputs: [l] }) }, Dp = (e, t) => { Fe(e, "ReduceMeanShared", t, "mean") }, Up = (e, t) => { Fe(e, "ReduceL1Shared", t, "l1") }, Pp = (e, t) => { Fe(e, "ReduceL2Shared", t, "l2") }, qp = (e, t) => { Fe(e, "ReduceLogSumExpShared", t, "logSumExp") }, Lp = (e, t) => { Fe(e, "ReduceMaxShared", t, "max") }, Wp = (e, t) => { Fe(e, "ReduceMinShared", t, "min") }, Vp = (e, t) => { Fe(e, "ReduceProdShared", t, "prod") }, Gp = (e, t) => { Fe(e, "ReduceSumShared", t, "sum") }, Hp = (e, t) => { Fe(e, "ReduceSumSquareShared", t, "sumSquare") }, Fp = (e, t) => { Fe(e, "ReduceLogSumShared", t, "logSum") }
}), je, su, ti, Ba, Ke, ou, uu, lu, du, pu, cu, hu, fu, mu, gu, Xe, jp, Kp, Xp, Zp, Qp, Yp, Jp, ec, tc, rc, sn = U(() => {
  te(), ie(), xe(), ae(), v0(), je = e => { if (!e || e.length === 0 || e.length > 2) throw new Error("Reduce op requires 1 or 2 inputs."); if (e.length === 2 && e[1].dims.length !== 1) throw new Error("Invalid axes input dims.") }, su = e => ["", "", `var value = ${e.getByIndices("input_indices")};`, ""], ti = (e, t, r, i, a, n, s = !1, u = !1) => {
    let l = [], p = r[0].dims, f = p.length, h = O.normalizeAxes(a, f), g = !u && h.length === 0; p.forEach((b, S) => { g || h.indexOf(S) >= 0 ? s && l.push(1) : l.push(b) }); let y = l.length, _ = O.size(l); return {
      name: e, shaderCache: t, getShaderSource: b => {
        let S = [], v = N("_A", r[0].dataType, f), w = Q("output", n, y), I = i(v, w, h), T = I[2]; for (let E = 0, C = 0; E < f; E++)g || h.indexOf(E) >= 0 ? (s && C++, T = `for(var j${E}: u32 = 0; j${E} < ${p[E]}; j${E}++) {
                  ${I[2].includes("last_index") ? `let last_index = j${E};` : ""}
                  ${v.indicesSet("input_indices", E, `j${E}`)}
                  ${T}
                }`) : (S.push(`${v.indicesSet("input_indices", E, w.indicesGet("output_indices", C))};`), C++); return `

        ${b.registerUniform("output_size", "u32").declareVariables(v, w)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${T}
          ${I[3]}
          ${I.length === 4 ? w.setByOffset("global_idx", "value") : I.slice(4).join(`
`)}
        }`}, getRunData: () => ({ outputs: [{ dims: l, dataType: n }], dispatchGroup: { x: Math.ceil(_ / 64) }, programUniforms: [{ type: 12, data: _ }, ...J(p, l)] })
    }
  }, Ba = (e, t) => { let r = []; return e[1].dims[0] > 0 && e[1].getBigInt64Array().forEach(i => r.push(Number(i))), fe({ axes: r, keepDims: t.keepDims, noopWithEmptyAxes: t.noopWithEmptyAxes }) }, Ke = (e, t, r, i) => { let a = e.inputs, n = a.length === 1 ? r : Ba(a, r); e.compute(ti(t, { hint: n.cacheKey, inputDependencies: ["rank"] }, [a[0]], n.noopWithEmptyAxes && n.axes.length === 0 ? su : i, n.axes, a[0].dataType, n.keepDims, n.noopWithEmptyAxes), { inputs: [0] }) }, ou = (e, t) => { je(e.inputs), Ke(e, "ReduceLogSum", t, (r, i) => [`var value = ${i.type.storage}(0);`, "", `value += ${r.getByIndices("input_indices")};`, "value = log(value);"]) }, uu = (e, t) => { je(e.inputs), Ke(e, "ReduceL1", t, (r, i) => [`var value = ${i.type.storage}(0);`, "", `value += abs(${r.getByIndices("input_indices")});`, ""]) }, lu = (e, t) => { je(e.inputs), Ke(e, "ReduceL2", t, (r, i) => [`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`, "", `t = ${r.getByIndices("input_indices")}; value += (t * t);`, "value = sqrt(value);"]) }, du = (e, t) => { je(e.inputs), Ke(e, "ReduceLogSumExp", t, (r, i) => [`var value = ${i.type.storage}(0);`, "", `value += exp(${r.getByIndices("input_indices")});`, "value = log(value);"]) }, pu = (e, t) => {
    je(e.inputs), Ke(e, "ReduceMax", t, (r, i, a) => {
      let n = []; for (let s = 0; s < r.rank; s++)(a.indexOf(s) >= 0 || a.length === 0) && n.push(r.indicesSet("input_indices", s, 0)); return [`${n.join(`
`)}`, `var value = ${r.getByIndices("input_indices")};`, `value = max(value, ${r.getByIndices("input_indices")});`, ""]
    })
  }, cu = (e, t) => { je(e.inputs), Ke(e, "ReduceMean", t, (r, i, a) => { let n = 1; for (let s = 0; s < r.rank; s++)(a.indexOf(s) >= 0 || a.length === 0) && (n *= e.inputs[0].dims[s]); return ["var sum = f32(0);", "", `sum += f32(${r.getByIndices("input_indices")});`, `let value = ${i.type.value}(sum / ${n});`] }) }, hu = (e, t) => {
    je(e.inputs), Ke(e, "ReduceMin", t, (r, i, a) => {
      let n = []; for (let s = 0; s < r.rank; s++)(a.indexOf(s) >= 0 || a.length === 0) && n.push(`input_indices[${s}] = 0;`); return [`${n.join(`
`)}`, `var value = ${r.getByIndices("input_indices")};`, `value = min(value, ${r.getByIndices("input_indices")});`, ""]
    })
  }, fu = (e, t) => { je(e.inputs), Ke(e, "ReduceProd", t, (r, i) => [`var value = ${i.type.storage}(1);`, "", `value *= ${r.getByIndices("input_indices")};`, ""]) }, mu = (e, t) => { je(e.inputs), Ke(e, "ReduceSum", t, (r, i) => [`var value = ${i.type.storage}(0);`, "", `value += ${r.getByIndices("input_indices")};`, ""]) }, gu = (e, t) => { je(e.inputs), Ke(e, "ReduceSumSquare", t, (r, i) => [`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`, "", `t = ${r.getByIndices("input_indices")}; value += t * t;`, ""]) }, Xe = (e, t, r) => { if (t.length === 0) return r; let i = 1, a = 1; for (let n = 0; n < t.length; n++)t.indexOf(n) === -1 ? i *= e[n] : a *= e[n]; return a < 32 && i > 1024 }, jp = (e, t) => { Xe(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? cu(e, t) : Dp(e, t) }, Kp = (e, t) => { Xe(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? uu(e, t) : Up(e, t) }, Xp = (e, t) => { Xe(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? lu(e, t) : Pp(e, t) }, Zp = (e, t) => { Xe(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? du(e, t) : qp(e, t) }, Qp = (e, t) => { Xe(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? pu(e, t) : Lp(e, t) }, Yp = (e, t) => { Xe(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? hu(e, t) : Wp(e, t) }, Jp = (e, t) => { Xe(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? fu(e, t) : Vp(e, t) }, ec = (e, t) => { Xe(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? mu(e, t) : Gp(e, t) }, tc = (e, t) => { Xe(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? gu(e, t) : Hp(e, t) }, rc = (e, t) => { Xe(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? ou(e, t) : Fp(e, t) }
}), Qi, ic, ac, Na, x0 = U(() => {
  te(), xe(), sn(), Qi = e => { if (!e || e.length === 0 || e.length > 2) throw new Error("ArgMinMaxOp op requires 1 or 2 inputs."); if (e[0].dataType !== 1) throw new Error("Invalid input type.") }, ic = (e, t) => {
    Qi(e.inputs); let r = (i, a, n) => {
      let s = []; for (let u = 0; u < i.rank; u++)(n.indexOf(u) >= 0 || n.length === 0) && s.push(`input_indices[${u}] = 0;`); return [`${s.join(`
`)}`, `var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`, `if (${i.getByIndices("input_indices")} ${t.selectLastIndex > 0 ? "<=" : "<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`, "", a.setByOffset("global_idx", "best_index")]
    }; e.compute(ti("ArgMin", { hint: t.cacheKey, inputDependencies: ["rank"] }, [e.inputs[0]], r, [t.axis], 7, t.keepDims), { inputs: [0] })
  }, ac = (e, t) => {
    Qi(e.inputs); let r = (i, a, n) => {
      let s = []; for (let u = 0; u < i.rank; u++)(n.indexOf(u) >= 0 || n.length === 0) && s.push(`input_indices[${u}] = 0;`); return [`${s.join(`
`)}`, `var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`, `if (${i.getByIndices("input_indices")} ${t.selectLastIndex > 0 ? ">=" : ">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`, "", a.setByOffset("global_idx", "best_index")]
    }; e.compute(ti("argMax", { hint: t.cacheKey, inputDependencies: ["rank"] }, [e.inputs[0]], r, [t.axis], 7, t.keepDims), { inputs: [0] })
  }, Na = e => fe(e)
}), yu, Ur, _u, bu, wu, _r, $u, nc, on = U(() => {
  te(), ie(), an(), ae(), yu = (e, t) => { let r = e[0], i = e[1], a = e[2], n = e[3], s = e[4], u = e[5]; if (s && u) throw new Error("Attention cannot have both past and attention_bias"); if (r.dims.length !== 3) throw new Error('Input "input" must have 3 dimensions'); let l = r.dims[0], p = r.dims[1], f = r.dims[2]; if (a.dims.length !== 1) throw new Error('Input "bias" is expected to have 1 dimensions'); if (i.dims.length !== 2) throw new Error('Input "weights" is expected to have 2 dimensions'); if (i.dims[0] !== f) throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0"); if (a.dims[0] !== i.dims[1]) throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"'); let h = a.dims[0] / 3, g = h, y = g; if (t.qkvHiddenSizes.length > 0) { if (t.qkvHiddenSizes.length !== 3) throw new Error("qkv_hidden_sizes attribute should have 3 elements"); for (let I of t.qkvHiddenSizes) if (I % t.numHeads !== 0) throw new Error("qkv_hidden_sizes should be divisible by num_heads"); h = t.qkvHiddenSizes[0], g = t.qkvHiddenSizes[1], y = t.qkvHiddenSizes[2] } let _ = p; if (h !== g) throw new Error("qkv_hidden_sizes first element should be same as the second"); if (a.dims[0] !== h + g + y) throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes'); let b = 0; if (s) { if (g !== y) throw new Error('Input "past" expect k_hidden_size == v_hidden_size'); if (s.dims.length !== 5) throw new Error('Input "past" must have 5 dimensions'); if (s.dims[0] !== 2) throw new Error('Input "past" first dimension must be 2'); if (s.dims[1] !== l) throw new Error('Input "past" second dimension must be batch_size'); if (s.dims[2] !== t.numHeads) throw new Error('Input "past" third dimension must be num_heads'); if (s.dims[4] !== g / t.numHeads) throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads'); t.pastPresentShareBuffer || (b = s.dims[3]) } let S = _ + b, v = -1, w = 0; if (n) throw new Error("Mask not supported"); if (s) throw new Error("past is not supported"); if (u) { if (u.dims.length !== 4) throw new Error('Input "attention_bias" must have 4 dimensions'); if (u.dims[0] !== l || u.dims[1] !== t.numHeads || u.dims[2] !== p || u.dims[3] !== S) throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)') } return { batchSize: l, sequenceLength: p, pastSequenceLength: b, kvSequenceLength: _, totalSequenceLength: S, maxSequenceLength: v, inputHiddenSize: f, hiddenSize: h, vHiddenSize: y, headSize: Math.floor(h / t.numHeads), vHeadSize: Math.floor(y / t.numHeads), numHeads: t.numHeads, isUnidirectional: !1, pastPresentShareBuffer: !1, maskFilterValue: t.maskFilterValue, maskType: w, scale: t.scale, broadcastResPosBias: !1, passPastInKv: !1, qkvFormat: 1 } }, Ur = (e, t, r) => t && e ? `
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e == null ? void 0 : e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `: `
    ${r ? "let past_sequence_length = uniforms.past_sequence_length" : ""};
    let present_sequence_length = total_sequence_length;
    `, _u = (e, t, r, i, a, n, s, u) => {
    let l = ve(s ? 1 : n), p = 64, f = n / l; f < p && (p = 32); let h = Math.ceil(n / l / p), g = [{ type: 12, data: t }, { type: 12, data: r }, { type: 12, data: i }, { type: 12, data: a }, { type: 12, data: f }, { type: 12, data: h }], y = Ie(e.dataType, l), _ = Ce(1, l), b = ["type"]; s && b.push("type"), u && b.push("type"); let S = v => {
      let w = Q("x", e.dataType, e.dims, l), I = [w], T = s ? N("seq_lens", s.dataType, s.dims) : void 0; T && I.push(T); let E = u ? N("total_sequence_length_input", u.dataType, u.dims) : void 0; E && I.push(E); let C = Ce(e.dataType), A = [{ name: "batch_size", type: "u32" }, { name: "num_heads", type: "u32" }, { name: "past_sequence_length", type: "u32" }, { name: "sequence_length", type: "u32" }, { name: "total_sequence_length", type: "u32" }, { name: "elements_per_thread", type: "u32" }]; return `
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${v.registerUniforms(A).declareVariables(...I)}
  ${v.mainStart([p, 1, 1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Ur(T, E, !1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s ? "u32(past_sequence_length + workgroup_id.y + 1)" : "total_sequence_length"};
    var thread_max_vector = ${_}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(() => { switch (l) { case 1: return "thread_max_vector"; case 2: return "max(thread_max_vector.x, thread_max_vector.y)"; case 4: return "max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))"; default: throw new Error(`Unsupported components: ${l}`) } })()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(() => { switch (l) { case 1: return "sum_vector"; case 2: return "sum_vector.x + sum_vector.y"; case 4: return "sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w"; default: throw new Error(`Unsupported components: ${l}`) } })()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s ? `
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${C}(0));
        }`: ""};
  }`}; return { name: "AttentionProbsSoftmax", shaderCache: { hint: `${p};${y};${l}`, inputDependencies: b }, getShaderSource: S, getRunData: () => ({ outputs: [], dispatchGroup: { x: 1, y: a, z: t * r }, programUniforms: g }) }
  }, bu = (e, t, r, i, a, n, s, u, l) => {
    let p = s + n.kvSequenceLength, f = [n.batchSize, n.numHeads, n.sequenceLength, p], h = e > 1 && i, g = n.kvNumHeads ? n.kvNumHeads : n.numHeads, y = h ? [n.batchSize, g, p, n.headSize] : void 0, _ = n.nReps ? n.nReps : 1, b = n.scale === 0 ? 1 / Math.sqrt(n.headSize) : n.scale, S = ve(n.headSize), v = n.headSize / S, w = 12, I = { x: Math.ceil(p / w), y: Math.ceil(n.sequenceLength / w), z: n.batchSize * n.numHeads }, T = [{ type: 12, data: n.sequenceLength }, { type: 12, data: v }, { type: 12, data: p }, { type: 12, data: n.numHeads }, { type: 12, data: n.headSize }, { type: 1, data: b }, { type: 12, data: s }, { type: 12, data: n.kvSequenceLength }, { type: 12, data: _ }], E = h && i && O.size(i.dims) > 0, C = ["type", "type"]; E && C.push("type"), a && C.push("type"), u && C.push("type"), l && C.push("type"); let A = [{ dims: f, dataType: t.dataType, gpuDataType: 0 }]; h && A.push({ dims: y, dataType: t.dataType, gpuDataType: 0 }); let x = M => {
      let D = N("q", t.dataType, t.dims, S), H = N("key", r.dataType, r.dims, S), F = [D, H]; if (E) { let W = N("past_key", i.dataType, i.dims, S); F.push(W) } a && F.push(N("attention_bias", a.dataType, a.dims)); let j = u ? N("seq_lens", u.dataType, u.dims) : void 0; j && F.push(j); let R = l ? N("total_sequence_length_input", l.dataType, l.dims) : void 0; R && F.push(R); let K = Q("output", t.dataType, f), X = [K]; h && X.push(Q("present_key", t.dataType, y, S)); let ee = Ce(1, S), he = [{ name: "M", type: "u32" }, { name: "K", type: "u32" }, { name: "N", type: "u32" }, { name: "num_heads", type: "u32" }, { name: "head_size", type: "u32" }, { name: "alpha", type: "f32" }, { name: "past_sequence_length", type: "u32" }, { name: "kv_sequence_length", type: "u32" }, { name: "n_reps", type: "u32" }]; return `
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${D.type.storage}, ${w * w}>;
  var<workgroup> tileK: array<${D.type.storage}, ${w * w}>;
  ${M.registerUniforms(he).declareVariables(...F, ...X)}
  ${M.mainStart([w, w, 1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_ === 1 ? "headIdx" : "headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_ === 1 ? "uniforms.num_heads" : "uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Ur(j, R, !0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E && h ? "let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;" : ""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h ? "let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;" : ""}
    var value = ${ee}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E && h ? `
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`: `
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h ? `if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`: ""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ee}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(() => { switch (S) { case 1: return "value"; case 2: return "value.x + value.y"; case 4: return "value.x + value.y + value.z + value.w"; default: throw new Error(`Unsupported components: ${S}`) } })()};
        output[outputIdx] = ${K.type.value} (sum * uniforms.alpha) + ${a ? "attention_bias[outputIdx]" : "0.0"};
    }
  }`}; return { name: "AttentionProbs", shaderCache: { hint: `${S};${a !== void 0};${i !== void 0};${e}`, inputDependencies: C }, getRunData: () => ({ outputs: A, dispatchGroup: I, programUniforms: T }), getShaderSource: x }
  }, wu = (e, t, r, i, a, n, s = void 0, u = void 0) => {
    let l = n + a.kvSequenceLength, p = a.nReps ? a.nReps : 1, f = a.vHiddenSize * p, h = e > 1 && i, g = a.kvNumHeads ? a.kvNumHeads : a.numHeads, y = h ? [a.batchSize, g, l, a.headSize] : void 0, _ = [a.batchSize, a.sequenceLength, f], b = 12, S = { x: Math.ceil(a.vHeadSize / b), y: Math.ceil(a.sequenceLength / b), z: a.batchSize * a.numHeads }, v = [{ type: 12, data: a.sequenceLength }, { type: 12, data: l }, { type: 12, data: a.vHeadSize }, { type: 12, data: a.numHeads }, { type: 12, data: a.headSize }, { type: 12, data: f }, { type: 12, data: n }, { type: 12, data: a.kvSequenceLength }, { type: 12, data: p }], w = h && i && O.size(i.dims) > 0, I = ["type", "type"]; w && I.push("type"), s && I.push("type"), u && I.push("type"); let T = [{ dims: _, dataType: t.dataType, gpuDataType: 0 }]; h && T.push({ dims: y, dataType: t.dataType, gpuDataType: 0 }); let E = C => {
      let A = N("probs", t.dataType, t.dims), x = N("v", r.dataType, r.dims), M = [A, x]; w && M.push(N("past_value", i.dataType, i.dims)); let D = s ? N("seq_lens", s.dataType, s.dims) : void 0; s && M.push(D); let H = u ? N("total_sequence_length_input", u.dataType, u.dims) : void 0; u && M.push(H); let F = [Q("output", t.dataType, _)]; h && F.push(Q("present_value", t.dataType, y)); let j = [{ name: "M", type: "u32" }, { name: "K", type: "u32" }, { name: "N", type: "u32" }, { name: "num_heads", type: "u32" }, { name: "head_size", type: "u32" }, { name: "v_hidden_size", type: "u32" }, { name: "past_sequence_length", type: "u32" }, { name: "kv_sequence_length", type: "u32" }, { name: "n_reps", type: "u32" }]; return `
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${A.type.value}, ${b * b}>;
  var<workgroup> tileV: array<${A.type.value}, ${b * b}>;
  ${C.registerUniforms(j).declareVariables(...M, ...F)}
  ${C.mainStart([b, b, 1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p === 1 ? "headIdx" : "headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p === 1 ? "uniforms.num_heads" : "uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Ur(D, H, !0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w && h ? "let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;" : ""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h ? "let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;" : ""}
   var value = ${A.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w && h ? `
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `: `
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h ? `
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`: ""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}; return { name: "AttentionScore", shaderCache: { hint: `${i !== void 0};${e}`, inputDependencies: I }, getRunData: () => ({ outputs: T, dispatchGroup: S, programUniforms: v }), getShaderSource: E }
  }, _r = (e, t, r, i, a, n, s, u, l, p, f = void 0, h = void 0) => { let g = Math.min(e.outputCount, 1 + (s ? 1 : 0) + (u ? 1 : 0)), y = g > 1 ? p.pastSequenceLength : 0, _ = y + p.kvSequenceLength, b = l && O.size(l.dims) > 0 ? l : void 0, S = [t, r]; g > 1 && s && O.size(s.dims) > 0 && S.push(s), b && S.push(b), f && S.push(f), h && S.push(h); let v = e.compute(bu(g, t, r, s, b, p, y, f, h), { inputs: S, outputs: g > 1 ? [-1, 1] : [-1] })[0]; e.compute(_u(v, p.batchSize, p.numHeads, y, p.sequenceLength, _, f, h), { inputs: f && h ? [v, f, h] : [v], outputs: [] }); let w = [v, i]; g > 1 && u && O.size(u.dims) > 0 && w.push(u), f && w.push(f), h && w.push(h), e.compute(wu(g, v, i, u, p, y, f, h), { inputs: w, outputs: g > 1 ? [0, 2] : [0] }) }, $u = (e, t) => {
    let r = [t.batchSize, t.numHeads, t.sequenceLength, t.headSize], i = t.sequenceLength, a = t.inputHiddenSize, n = t.headSize, s = 12, u = { x: Math.ceil(t.headSize / s), y: Math.ceil(t.sequenceLength / s), z: t.batchSize * t.numHeads }, l = [e.inputs[0], e.inputs[1], e.inputs[2]], p = [{ type: 12, data: i }, { type: 12, data: a }, { type: 12, data: n }, { type: 12, data: t.numHeads }, { type: 12, data: t.headSize }, { type: 12, data: t.hiddenSize }, { type: 12, data: t.hiddenSize + t.hiddenSize + t.vHiddenSize }], f = h => {
      let g = Q("output_q", l[0].dataType, r), y = Q("output_k", l[0].dataType, r), _ = Q("output_v", l[0].dataType, r), b = N("input", l[0].dataType, l[0].dims), S = N("weight", l[1].dataType, l[1].dims), v = N("bias", l[2].dataType, l[2].dims), w = b.type.storage, I = [{ name: "M", type: "u32" }, { name: "K", type: "u32" }, { name: "N", type: "u32" }, { name: "num_heads", type: "u32" }, { name: "head_size", type: "u32" }, { name: "hidden_size", type: "u32" }, { name: "ldb", type: "u32" }]; return `
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${w}, ${s * s}>;
  var<workgroup> tileWeightQ: array<${w}, ${s * s}>;
  var<workgroup> tileWeightK: array<${w}, ${s * s}>;
  var<workgroup> tileWeightV: array<${w}, ${s * s}>;
  ${h.registerUniforms(I).declareVariables(b, S, v, g, y, _)}
  ${h.mainStart([s, s, 1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`}; return e.compute({ name: "AttentionPrepare", shaderCache: { inputDependencies: ["type", "type", "type"] }, getRunData: () => ({ outputs: [{ dims: r, dataType: e.inputs[0].dataType, gpuDataType: 0 }, { dims: r, dataType: e.inputs[0].dataType, gpuDataType: 0 }, { dims: r, dataType: e.inputs[0].dataType, gpuDataType: 0 }], dispatchGroup: u, programUniforms: p }), getShaderSource: f }, { inputs: l, outputs: [-1, -1, -1] })
  }, nc = (e, t) => { let r = yu(e.inputs, t), [i, a, n] = $u(e, r); return _r(e, i, a, n, e.inputs[4], void 0, void 0, void 0, e.inputs[5], r) }
}), vu, xu, Su, sc, S0 = U(() => {
  Ge(), te(), ie(), xe(), ae(), vu = (e, t) => { if (!e || e.length !== 5) throw new Error("BatchNormalization requires 5 inputs"); let r = (i, a, n) => { let s = a.length; if (s !== i.length) throw new Error(`${n}: num dimensions != ${s}`); a.forEach((u, l) => { if (u !== i[l]) throw new Error(`${n}: dim[${l}] do not match`) }) }; if (e[0].dims.length > 1) { let i = t.format === "NHWC" ? t.spatial ? e[0].dims.slice(-1) : e[0].dims.slice(-1).concat(e[0].dims.slice(1, e[0].dims.length - 1)) : e[0].dims.slice(1, t.spatial ? 2 : void 0); r(e[1].dims, i, "Invalid input scale"), r(e[2].dims, i, "Invalid input B"), r(e[3].dims, i, "Invalid input mean"), r(e[4].dims, i, "Invalid input var") } else r(e[1].dims, [1], "Invalid input scale"), r(e[2].dims, [1], "Invalid input B"), r(e[3].dims, [1], "Invalid input mean"), r(e[4].dims, [1], "Invalid input var") }, xu = (e, t) => {
    let { epsilon: r, spatial: i, format: a } = t, n = e[0].dims, s = i ? ve(n[n.length - 1]) : 1, u = a === "NHWC" && n.length > 1 ? s : 1, l = O.size(n) / s, p = i, f = p ? n.length : n, h = N("x", e[0].dataType, e[0].dims, s), g = N("scale", e[1].dataType, e[1].dims, u), y = N("bias", e[2].dataType, e[2].dims, u), _ = N("inputMean", e[3].dataType, e[3].dims, u), b = N("inputVar", e[4].dataType, e[4].dims, u), S = Q("y", e[0].dataType, f, s), v = () => {
      let I = ""; if (i) I = `let cOffset = ${n.length === 1 ? "0u" : a === "NHWC" ? `outputIndices[${n.length - 1}] / ${s}` : "outputIndices[1]"};`; else if (a === "NCHW") I = `
            ${S.indicesSet("outputIndices", "0", "0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`; else {
        I = `var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length - 1}];`; for (let T = 1; T < g.rank; T++)I += `cIndices[${T}] = outputIndices[${T}];`; I += `let cOffset = ${g.indicesToOffset("cIndices")};`
      } return I
    }, w = I => `
  const epsilon = ${r};
  ${I.registerUniform("outputSize", "u32").declareVariables(h, g, y, _, b, S)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx", "value")}
  }`; return { name: "BatchNormalization", shaderCache: { hint: `${t.epsilon}_${t.format}_${i}_${s}`, inputDependencies: p ? ["rank", "type", "type", "type", "type"] : void 0 }, getShaderSource: w, getRunData: () => ({ outputs: [{ dims: e[0].dims, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(l / 64) }, programUniforms: p ? [{ type: 12, data: l }, ...J(n)] : [{ type: 12, data: l }] }) }
  }, Su = e => fe(e), sc = (e, t) => { let { inputs: r, outputCount: i } = e, a = Su({ ...t, outputCount: i }); if ($e.webgpu.validateInputContent && vu(r, a), t.trainingMode) throw new Error("BatchNormalization trainingMode is not supported yet."); e.compute(xu(r, a)) }
}), ku, Tu, oc, k0 = U(() => {
  ie(), ae(), ku = e => { if (e[0].dims.length !== 3) throw new Error("input should have 3 dimensions"); if (![320, 640, 1280].includes(e[0].dims[2])) throw new Error("number of channels should be 320, 640 or 1280"); if (e[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions"); if (e[0].dims[2] !== e[1].dims[0]) throw new Error("last dimension of input and bias are not the same") }, Tu = e => {
    let t = e[0].dims, r = e[0].dims[2], i = O.size(t) / 4, a = e[0].dataType, n = N("input", a, t, 4), s = N("bias", a, [r], 4), u = N("residual", a, t, 4), l = Q("output", a, t, 4); return {
      name: "BiasAdd", getRunData: () => ({ outputs: [{ dims: t, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(i / 64) } }), getShaderSource: p => `
  const channels = ${r}u / 4;
  ${p.declareVariables(n, s, u, l)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx", "value")}
  }`}
  }, oc = e => { ku(e.inputs), e.compute(Tu(e.inputs)) }
}), Iu, ce, uc, lc, dc, pc, cc, hc, fc, mc, gc, Eu, yc, _c, bc, wc, cr, $c, Xr, vc, xc, Sc, kc, Tc, Ic, Ec, zc, Cc, Ac, Oc, Rc, Bc, Nc, Mc, Dc, Yi, Uc, Ma, Da, Pc, qc, Lc, zu, Cu, Wc, un = U(() => {
  te(), ie(), xe(), ae(), Iu = (e, t, r, i, a, n, s) => {
    let u = Math.ceil(t / 4), l = ""; typeof a == "string" ? l = `${a}(a)` : l = a("a"); let p = N("inputData", r, [u], 4), f = Q("outputData", i, [u], 4), h = [{ name: "vec_size", type: "u32" }]; return s && h.push(...s), `
      ${e.registerUniforms(h).declareVariables(p, f)}

  ${n ?? ""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${f.setByOffset("global_idx", l)}
  }`}, ce = (e, t, r, i, a, n = e.dataType, s, u) => { let l = [{ type: 12, data: Math.ceil(O.size(e.dims) / 4) }]; return s && l.push(...s), { name: t, shaderCache: { hint: a, inputDependencies: ["type"] }, getShaderSource: p => Iu(p, O.size(e.dims), e.dataType, n, r, i, u), getRunData: p => ({ outputs: [{ dims: e.dims, dataType: n }], dispatchGroup: { x: Math.ceil(O.size(p[0].dims) / 64 / 4) }, programUniforms: l }) } }, uc = e => { e.compute(ce(e.inputs[0], "Abs", "abs")) }, lc = e => { e.compute(ce(e.inputs[0], "Acos", "acos")) }, dc = e => { e.compute(ce(e.inputs[0], "Acosh", "acosh")) }, pc = e => { e.compute(ce(e.inputs[0], "Asin", "asin")) }, cc = e => { e.compute(ce(e.inputs[0], "Asinh", "asinh")) }, hc = e => { e.compute(ce(e.inputs[0], "Atan", "atan")) }, fc = e => { e.compute(ce(e.inputs[0], "Atanh", "atanh")) }, mc = e => fe(e), gc = (e, t) => { let r; switch (t.to) { case 10: r = "vec4<f16>"; break; case 1: r = "vec4<f32>"; break; case 12: r = "vec4<u32>"; break; case 6: r = "vec4<i32>"; break; case 9: r = "vec4<bool>"; break; default: throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`) }e.compute(ce(e.inputs[0], "Cast", r, void 0, t.cacheKey, t.to)) }, Eu = e => { let t, r, i = e.length >= 2 && e[1].data !== 0, a = e.length >= 3 && e[2].data !== 0; switch (e[0].dataType) { case 1: t = i ? e[1].getFloat32Array()[0] : -34028234663852886e22, r = a ? e[2].getFloat32Array()[0] : 34028234663852886e22; break; case 10: t = i ? e[1].getUint16Array()[0] : 64511, r = a ? e[2].getUint16Array()[0] : 31743; break; default: throw new Error("Unsupport data type") }return fe({ min: t, max: r }) }, yc = (e, t) => { let r = t || Eu(e.inputs), i = Ce(e.inputs[0].dataType); e.compute(ce(e.inputs[0], "Clip", a => `clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`, void 0, r.cacheKey, void 0, [{ type: e.inputs[0].dataType, data: r.min }, { type: e.inputs[0].dataType, data: r.max }], [{ name: "min", type: i }, { name: "max", type: i }]), { inputs: [0] }) }, _c = e => { e.compute(ce(e.inputs[0], "Ceil", "ceil")) }, bc = e => { e.compute(ce(e.inputs[0], "Cos", "cos")) }, wc = e => { e.compute(ce(e.inputs[0], "Cosh", "cosh")) }, cr = e => fe(e), $c = (e, t) => {
    let r = Ce(e.inputs[0].dataType); e.compute(ce(e.inputs[0], "Elu", i => `elu_vf32(${i})`, `
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`, t.cacheKey))
  }, Xr = (e = "f32") => `
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`, vc = e => { let t = Ce(e.inputs[0].dataType); e.compute(ce(e.inputs[0], "Erf", r => `erf_vf32(${r})`, Xr(t))) }, xc = e => { e.compute(ce(e.inputs[0], "Exp", "exp")) }, Sc = e => { e.compute(ce(e.inputs[0], "Floor", "floor")) }, kc = e => { let t = Ce(e.inputs[0].dataType); e.compute(ce(e.inputs[0], "Gelu", r => `0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`, Xr(t))) }, Tc = (e, t) => { let r = Ce(e.inputs[0].dataType); e.compute(ce(e.inputs[0], "LeakyRelu", i => `select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`, `const leaky_relu_alpha_ = ${r}(${t.alpha});`, t.cacheKey)) }, Ic = e => { e.compute(ce(e.inputs[0], "Not", t => `!${t}`)) }, Ec = e => { e.compute(ce(e.inputs[0], "Neg", t => `-${t}`)) }, zc = e => { e.compute(ce(e.inputs[0], "Reciprocal", t => `1.0/${t}`)) }, Cc = e => { let t = Ce(e.inputs[0].dataType); e.compute(ce(e.inputs[0], "Relu", r => `select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`)) }, Ac = e => { e.compute(ce(e.inputs[0], "Sigmoid", t => `(1.0 / (1.0 + exp(-${t})))`)) }, Oc = e => fe(e), Rc = (e, t) => { let r = Ce(e.inputs[0].dataType); e.compute(ce(e.inputs[0], "HardSigmoid", i => `max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`, void 0, t.cacheKey)) }, Bc = e => { e.compute(ce(e.inputs[0], "Sin", "sin")) }, Nc = e => { e.compute(ce(e.inputs[0], "Sinh", "sinh")) }, Mc = e => { e.compute(ce(e.inputs[0], "Sqrt", "sqrt")) }, Dc = e => { e.compute(ce(e.inputs[0], "Tan", "tan")) }, Yi = e => `sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`, Uc = e => { e.compute(ce(e.inputs[0], "Tanh", Yi)) }, Ma = (e = "f32") => `
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Yi("v")};
}
`, Da = e => `(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`, Pc = e => { let t = Ce(e.inputs[0].dataType); e.compute(ce(e.inputs[0], "FastGelu", Da, Ma(t), void 0, e.inputs[0].dataType)) }, qc = (e, t) => { let r = Ce(e.inputs[0].dataType); return e.compute(ce(e.inputs[0], "ThresholdedRelu", i => `select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`, `const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`, t.cacheKey)), 0 }, Lc = e => { e.compute(ce(e.inputs[0], "Log", "log")) }, zu = (e, t) => `
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`, Cu = e => `quick_gelu_impl(${e})`, Wc = (e, t) => { let r = Ce(e.inputs[0].dataType); e.compute(ce(e.inputs[0], "QuickGelu", Cu, zu(r, t.alpha), t.cacheKey, e.inputs[0].dataType)) }
}), Au, Ou, Vc, T0 = U(() => {
  ie(), ae(), un(), Au = e => { if (e[0].dims.length !== 3) throw new Error("input should have 3 dimensions"); if (![2560, 5120, 10240].includes(e[0].dims[2])) throw new Error("hidden state should be 2560, 5120 or 10240"); if (e[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions"); if (e[0].dims[2] !== e[1].dims[0]) throw new Error("last dimension of input and bias are not the same") }, Ou = e => {
    let t = e[0].dims.slice(); t[2] = t[2] / 2; let r = N("input", e[0].dataType, e[0].dims, 4), i = N("bias", e[0].dataType, [e[0].dims[2]], 4), a = Q("output", e[0].dataType, t, 4), n = O.size(t) / 4, s = Ie(e[0].dataType); return {
      name: "BiasSplitGelu", getRunData: () => ({ outputs: [{ dims: t, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(n / 64) } }), getShaderSource: u => `
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2] / 4 / 2}u;

  ${u.declareVariables(r, i, a)}

  ${Xr(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx", "valueLeft * geluRight")}
  }`}
  }, Vc = e => { Au(e.inputs), e.compute(Ou(e.inputs)) }
}), Ru, Bu, Ze, Gc, Hc, Fc, jc, Kc, Xc, Zc, Qc, Yc, Jc, I0 = U(() => {
  te(), ie(), ae(), Ru = (e, t, r, i, a, n, s, u, l, p, f, h) => {
    let g, y; typeof u == "string" ? g = y = (w, I) => `${u}((${w}),(${I}))` : typeof u == "function" ? g = y = u : (g = u.scalar, y = u.vector); let _ = Q("outputData", f, i.length, 4), b = N("aData", l, t.length, 4), S = N("bData", p, r.length, 4), v; if (a) if (n) {
      let w = O.size(t) === 1, I = O.size(r) === 1, T = t.length > 0 && t[t.length - 1] % 4 === 0, E = r.length > 0 && r[r.length - 1] % 4 === 0; w || I ? v = _.setByOffset("global_idx", y(w ? `${b.type.value}(${b.getByOffset("0")}.x)` : b.getByOffset("global_idx"), I ? `${S.type.value}(${S.getByOffset("0")}.x)` : S.getByOffset("global_idx"))) : v = `
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices", _)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices", _)};
            ${_.setByOffset("global_idx", y(s || T ? b.getByOffset("offsetA / 4u") : `${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`, s || E ? S.getByOffset("offsetB / 4u") : `${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `} else v = _.setByOffset("global_idx", y(b.getByOffset("global_idx"), S.getByOffset("global_idx"))); else {
      if (!n) throw new Error("no necessary to use scalar implementation for element-wise binary op implementation."); let w = (I, T, E = "") => {
        let C = `aData[indexA${T}][componentA${T}]`, A = `bData[indexB${T}][componentB${T}]`; return `
            let outputIndices${T} = ${_.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${b.broadcastedIndicesToOffset(`outputIndices${T}`, _)};
            let offsetB${T} = ${S.broadcastedIndicesToOffset(`outputIndices${T}`, _)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${I}[${T}] = ${E}(${g(C, A)});
          `}; f === 9 ? v = `
            var data = vec4<u32>(0);
            ${w("data", 0, "u32")}
            ${w("data", 1, "u32")}
            ${w("data", 2, "u32")}
            ${w("data", 3, "u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`: v = `
            ${w("outputData[global_idx]", 0)}
            ${w("outputData[global_idx]", 1)}
            ${w("outputData[global_idx]", 2)}
            ${w("outputData[global_idx]", 3)}
          `} return `
        ${e.registerUniform("vec_size", "u32").declareVariables(b, S, _)}

        ${h ?? ""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`}, Bu = (e, t, r, i, a, n, s = r.dataType) => { let u = r.dims.map(Number), l = i.dims.map(Number), p = !O.areEqual(u, l), f = u, h = O.size(u), g = !1, y = !1, _ = [p]; if (p) { let b = Ht.calcShape(u, l, !1); if (!b) throw new Error("Can't perform binary op on the given tensors"); f = b.slice(), h = O.size(f); let S = O.size(u) === 1, v = O.size(l) === 1, w = u.length > 0 && u[u.length - 1] % 4 === 0, I = l.length > 0 && l[l.length - 1] % 4 === 0; _.push(S), _.push(v), _.push(w), _.push(I); let T = 1; for (let E = 1; E < f.length; E++) { let C = u[u.length - E], A = l[l.length - E]; if (C === A) T *= C; else break } T % 4 === 0 ? (y = !0, g = !0) : (S || v || w || I) && (g = !0) } else g = !0; return _.push(g), { name: e, shaderCache: { hint: t + _.map(b => b.toString()).join("_"), inputDependencies: ["rank", "rank"] }, getShaderSource: b => Ru(b, u, l, f, g, p, y, a, r.dataType, i.dataType, s, n), getRunData: () => ({ outputs: [{ dims: f, dataType: s }], dispatchGroup: { x: Math.ceil(h / 64 / 4) }, programUniforms: [{ type: 12, data: Math.ceil(O.size(f) / 4) }, ...J(u, l, f)] }) } }, Ze = (e, t, r, i, a, n) => { e.compute(Bu(t, a ?? "", e.inputs[0], e.inputs[1], r, i, n)) }, Gc = e => { Ze(e, "Add", (t, r) => `${t}+${r}`) }, Hc = e => { Ze(e, "Div", (t, r) => `${t}/${r}`) }, Fc = e => { Ze(e, "Equal", { scalar: (t, r) => `u32(${t}==${r})`, vector: (t, r) => `vec4<u32>(${t}==${r})` }, void 0, void 0, 9) }, jc = e => { Ze(e, "Mul", (t, r) => `${t}*${r}`) }, Kc = e => {
    let t = N("input", e.inputs[0].dataType, e.inputs[0].dims).type.value; Ze(e, "Pow", { scalar: (r, i) => `pow_custom(${r},${i})`, vector: (r, i) => `pow_vector_custom(${r},${i})` }, `
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t === "i32" ? "round" : ""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)
  }, Xc = e => { Ze(e, "Sub", (t, r) => `${t}-${r}`) }, Zc = e => { Ze(e, "Greater", { scalar: (t, r) => `u32(${t}>${r})`, vector: (t, r) => `vec4<u32>(${t}>${r})` }, void 0, void 0, 9) }, Qc = e => { Ze(e, "Less", { scalar: (t, r) => `u32(${t}<${r})`, vector: (t, r) => `vec4<u32>(${t}<${r})` }, void 0, void 0, 9) }, Yc = e => { Ze(e, "GreaterOrEqual", { scalar: (t, r) => `u32(${t}>=${r})`, vector: (t, r) => `vec4<u32>(${t}>=${r})` }, void 0, void 0, 9) }, Jc = e => { Ze(e, "LessOrEqual", { scalar: (t, r) => `u32(${t}<=${r})`, vector: (t, r) => `vec4<u32>(${t}<=${r})` }, void 0, void 0, 9) }
}), Nu, Mu, Du, Uu, eh, th, E0 = U(() => {
  te(), ie(), xe(), ae(), Nu = (e, t) => { if (!e || e.length < 1) throw new Error("too few inputs"); let r = 0, i = e[r], a = i.dataType, n = i.dims.length; e.forEach((s, u) => { if (u !== r) { if (s.dataType !== a) throw new Error("input tensors should be one type"); if (s.dims.length !== n) throw new Error("input tensors should have the same shape"); s.dims.forEach((l, p) => { if (p !== t && l !== i.dims[p]) throw new Error("non concat dimensions must match") }) } }) }, Mu = (e, t) => `
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`, Du = (e, t) => {
    let r = e.length, i = []; for (let a = 0; a < r; ++a) { let n = t.setByOffset("global_idx", e[a].getByIndices("indices")); r === 1 ? i.push(n) : a === 0 ? i.push(`if (inputIndex == ${a}u) { ${n} }`) : a === r - 1 ? i.push(`else { ${n} }`) : i.push(`else if (inputIndex == ${a}) { ${n} }`) } return i.join(`
`)
  }, Uu = (e, t, r, i) => {
    let a = O.size(r), n = new Array(e.length), s = new Array(e.length), u = 0, l = [], p = [], f = [{ type: 12, data: a }]; for (let b = 0; b < e.length; ++b)u += e[b].dims[t], n[b] = u, p.push(e[b].dims.length), s[b] = N(`input${b}`, i, p[b]), l.push("rank"), f.push({ type: 12, data: n[b] }); for (let b = 0; b < e.length; ++b)f.push(...J(e[b].dims)); f.push(...J(r)); let h = Q("output", i, r.length), g = h.indicesGet("indices", t), y = Array.from(Array(n.length).keys()).map(b => `uniforms.sizeInConcatAxis${b}`).join(","), _ = b => `

  ${(() => { b.registerUniform("outputSize", "u32"); for (let S = 0; S < e.length; S++)b.registerUniform(`sizeInConcatAxis${S}`, "u32"); return b.declareVariables(...s, h) })()}

  ${Mu(n.length, y)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${y});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Du(s, h)}
  }`; return { name: "Concat", shaderCache: { hint: `${t}`, inputDependencies: l }, getRunData: () => ({ outputs: [{ dims: r, dataType: i }], dispatchGroup: { x: Math.ceil(a / 64) }, programUniforms: f }), getShaderSource: _ }
  }, eh = (e, t) => { let r = e.inputs, i = r[0].dims, a = O.normalizeAxis(t.axis, i.length); Nu(r, a); let n = i.slice(); n[a] = r.reduce((u, l) => u + (l.dims.length > a ? l.dims[a] : 0), 0); let s = r.filter(u => O.size(u.dims) > 0); e.compute(Uu(s, a, n, r[0].dataType), { inputs: s }) }, th = e => fe({ axis: e.axis })
}), Bt, Nt, Mt, ln, Ut = U(() => {
  te(), ie(), Bt = (e, t, r = "f32") => {
    switch (e.activation) {
      case "Relu": return `value = max(value, ${t}(0.0));`; case "Sigmoid": return `value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`; case "Clip": return `value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`; case "HardSigmoid": return `value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`; case "LeakyRelu": return `value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`; case "Tanh": return `let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `; case "": return ""; default: throw new Error(`Unsupported activation ${e.activation}`)
    }
  }, Nt = (e, t) => { e.activation === "Clip" ? t.push({ type: 1, data: e.clipMax }, { type: 1, data: e.clipMin }) : e.activation === "HardSigmoid" ? t.push({ type: 1, data: e.alpha }, { type: 1, data: e.beta }) : e.activation === "LeakyRelu" && t.push({ type: 1, data: e.alpha }) }, Mt = (e, t) => { e.activation === "Clip" ? t.push({ name: "clip_max", type: "f32" }, { name: "clip_min", type: "f32" }) : e.activation === "HardSigmoid" ? t.push({ name: "alpha", type: "f32" }, { name: "beta", type: "f32" }) : e.activation === "LeakyRelu" && t.push({ name: "alpha", type: "f32" }) }, ln = e => { let t = (e == null ? void 0 : e.activation) || ""; if (t === "HardSigmoid") { let [r, i] = (e == null ? void 0 : e.activation_params) || [.2, .5]; return { activation: t, alpha: r, beta: i } } else if (t === "Clip") { let [r, i] = (e == null ? void 0 : e.activation_params) || [Ip, Ep]; return { activation: t, clipMax: i, clipMin: r } } else if (t === "LeakyRelu") { let [r] = (e == null ? void 0 : e.activation_params) || [.01]; return { activation: t, alpha: r } } return { activation: t } }
}), ze, rh, dn = U(() => {
  ze = (e, t) => { switch (e) { case 1: return t; case 2: return `vec2<${t}>`; case 3: return `vec3<${t}>`; case 4: return `vec4<${t}>`; default: throw new Error(`${e}-component is not supported.`) } }, rh = e => `
      ${e ? "value = value + getBiasByOutputCoords(coords);" : ""}
      `}), ih, z0 = U(() => {
    ih = e => `
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}), fr, pn, cn = U(() => {
      te(), ie(), ae(), Ut(), fr = (e, t, r, i, a) => {
        let n = i - r; return `
      ${Array.from({ length: r }).map((s, u) => `
      if (${Y(t.shape, u, t.rank)} != 1) {
        ${t.indicesSet(e, u, Y(a, u + n, i))}
      } else {
        ${t.indicesSet(e, u, 0)}
      }`).join("")}
`}, pn = (e, t, r, i, a = !1, n) => {
        let s = e[0].dims, u = e[1].dims, l = s[s.length - 2], p = u[u.length - 1], f = s[s.length - 1], h = ve(p), g = ve(f), y = ve(l), _ = O.size(r) / h / y, b = e.length > 2, S = i ? i.slice(0, -2) : r.slice(0, -2), v = [O.size(S), l, p], w = [{ type: 12, data: _ }, { type: 12, data: l }, { type: 12, data: p }, { type: 12, data: f }]; Nt(t, w), w.push(...J(S, s, u)), b && w.push(...J(e[2].dims)), w.push(...J(v)); let I = T => {
          let E = nn("batch_dims", e[0].dataType, S.length), C = N("a", e[0].dataType, s.length, g), A = N("b", e[1].dataType, u.length, h), x = Q("output", e[0].dataType, v.length, h), M = Ie(x.type.tensor), D = Bt(t, x.type.value, M), H = [C, A], F = ""; if (b) { let K = a ? h : 1; H.push(N("bias", e[2].dataType, e[2].dims.length, K)), F = `${a ? `value += bias[col / ${K}];` : `value += ${x.type.value}(bias[row + i]);`}` } let j = [{ name: "output_size", type: "u32" }, { name: "M", type: "u32" }, { name: "N", type: "u32" }, { name: "K", type: "u32" }]; Mt(t, j); let R = () => {
            let K = `var a_data: ${C.type.value};`; for (let X = 0; X < g; X++)K += `
              let b_data${X} = b[(b_offset + (k + ${X}) * uniforms.N + col) / ${h}];`; for (let X = 0; X < y; X++) {
              K += `a_data = a[(a_offset + (row + ${X}) * uniforms.K + k) / ${g}];`; for (let ee = 0; ee < g; ee++)K += `
            values[${X}] = fma(${A.type.value}(a_data${g === 1 ? "" : `[${ee}]`}), b_data${ee}, values[${X}]);
`} return K
          }; return `
  ${T.registerUniforms(j).registerInternalVariables(E).declareVariables(...H, x)}
  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${r.length === 2 ? "" : `let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${fr("a_indices", C, C.rank - 2, E.rank, "batch_indices")}
    ${C.indicesSet("a_indices", C.rank - 2, 0)}
    ${C.indicesSet("a_indices", C.rank - 1, 0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${fr("b_indices", A, A.rank - 2, E.rank, "batch_indices")}
    ${A.indicesSet("b_indices", A.rank - 2, 0)}
    ${A.indicesSet("b_indices", A.rank - 1, 0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${x.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${R()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${F}
      ${D}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${h}`, "value")};
    }
  }
  `}; return { name: "MatMulNaive", shaderCache: { hint: `${t.activation};${h};${g};${y};${a}`, inputDependencies: b ? ["rank", "rank", "rank"] : ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: n ? n(r) : r, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(_ / 64) }, programUniforms: w }), getShaderSource: I }
      }
    }), Pu, qu, Ua, Ji, Lu, Pa, Wu, ri, hn = U(() => {
      te(), ie(), ae(), Ut(), cn(), dn(), Pu = (e, t) => e ? `
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t ? ", batchIndices" : ""});
        `: `
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t ? ", batchIndices" : ""});
        `, qu = (e, t) => e ? `
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t === 3 ? "" : "let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t === 3 ? "" : "acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`: `
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t === 3 ? "" : "acc[i] = BCached3 * ACached.w + acc[i];"}
        }`, Ua = (e, t, r = "f32", i, a = !1, n = 32, s = !1, u = 32) => {
        let l = t[1] * e[1], p = t[0] * e[0], f = a ? l : n, h = a ? n : l, g = f / t[0], y = n / t[1]; if (!((a && g === 4 && e[1] === 4 || !a && (g === 3 || g === 4)) && f % t[0] === 0 && n % t[1] === 0 && e[0] === 4)) throw new Error(`If transposeA ${a} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`); return `
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${f / g}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p / e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s ? "0" : "i32(globalId.z)"};
  ${i ? `let batchIndices = ${i.offsetToIndices("u32(batch)")};` : ""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s ? `${Math.ceil(u / n)}` : "(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s ? `i32(globalId.z) * ${u}` : "0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Pu(a, i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i ? ", batchIndices" : ""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g === 3 ? "" : "let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${qu(a, g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`}, Ji = (e, t) => e ? `
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t ? ", batchIndices" : ""});
            `: `
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t ? ", batchIndices" : ""});
            `, Lu = e => e ? "let ACached = mm_Asub[k][tileRow + innerRow];" : "let ACached = mm_Asub[tileRow + innerRow][k];", Pa = (e, t, r = "f32", i, a = !1, n = 32, s = !1, u = 32, l = !1) => {
        let p = e[1] * t[1], f = e[0] * t[0], h = a ? p : n, g = a ? n : p; if (!(g % t[1] === 0 && h % t[0] === 0 && n % t[1] === 0)) throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`); let y = g / t[1], _ = h / t[0], b = n / t[1], S = l ? `
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Ji(a, i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i ? ", batchIndices" : ""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a ? `mm_Asub[k][localRow + innerRow * ${t[1]}];` : `mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `: `
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ji(a, i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i ? ", batchIndices" : ""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Lu(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`; return `
  var<workgroup> mm_Asub : array<array<${r}, ${h}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s ? "0" : "i32(globalId.z)"};
    ${i ? `let batchIndices = ${i.offsetToIndices("u32(batch)")};` : ""}
    let num_tiles = ${s ? `${Math.ceil(u / n)}` : "(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s ? `i32(globalId.z) * ${u}` : "0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`}, Wu = (e, t, r, i, a = !1) => {
        let [n, s, u, l] = i, p = Ie(i[0].type.tensor); return `
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${ze(e, p)} {
      var value = ${ze(e, p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${fr("aIndices", s, s.rank - 2, n.rank, "batchIndices")}
        ${s.indicesSet("aIndices", s.rank - 2, "u32(row)")}
        ${s.indicesSet("aIndices", s.rank - 1, "u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${ze(e, p)} {
      var value = ${ze(e, p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${fr("bIndices", u, u.rank - 2, n.rank, "batchIndices")}
        ${u.indicesSet("bIndices", u.rank - 2, "u32(row)")}
        ${u.indicesSet("bIndices", u.rank - 1, "u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ze(e, p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t ? `value = value + ${a ? "bias[colIn]" : `${ze(e, p)}(bias[row])`};` : ""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)", "value")}
      }
    }
    `}, ri = (e, t, r, i, a = !1, n) => {
        let s = e[0].dims, u = e[1].dims, l = s.slice(0, -2), p = u.slice(0, -2), f = i ? i.slice(0, -2) : r.slice(0, -2), h = O.size(f), g = s[s.length - 2], y = s[s.length - 1], _ = u[u.length - 1], b = y % 4 === 0 && _ % 4 === 0, S = g <= 8 ? [4, 1, 1] : [4, 4, 1], v = [8, 8, 1], w = [Math.ceil(_ / v[0] / S[0]), Math.ceil(g / v[1] / S[1]), Math.ceil(h / v[2] / S[2])], I = b ? 4 : 1, T = [...l, g, y / I], E = T.length, C = [...p, y, _ / I], A = C.length, x = [h, g, _ / I], M = [{ type: 6, data: g }, { type: 6, data: _ }, { type: 6, data: y }]; Nt(t, M), M.push(...J(f, T, C)); let D = ["rank", "rank"], H = e.length > 2; H && (M.push(...J(e[2].dims)), D.push("rank")), M.push(...J(x)); let F = j => {
          let R = f.length, K = nn("batchDims", e[0].dataType, R, 1), X = Ie(e[0].dataType), ee = N("a", e[0].dataType, E, I), he = N("b", e[1].dataType, A, I), W = Q("result", e[0].dataType, x.length, I), ue = [ee, he]; if (H) { let me = a ? I : 1; ue.push(N("bias", e[2].dataType, e[2].dims.length, me)) } let P = [{ name: "dim_a_outer", type: "i32" }, { name: "dim_b_outer", type: "i32" }, { name: "dim_inner", type: "i32" }]; Mt(t, P); let V = Ie(W.type.tensor), Z = Bt(t, W.type.value, V), q = Wu(I, H, Z, [K, ee, he, W], a); return `
  ${j.registerUniforms(P).registerInternalVariables(K).declareVariables(...ue, W)}
  ${q}
  ${b ? Ua(S, v, X, K) : Pa(S, v, X, K)}
                   `}; return { name: "MatMul", shaderCache: { hint: `${S};${t.activation};${b};${a}`, inputDependencies: D }, getRunData: () => ({ outputs: [{ dims: n ? n(r) : r, dataType: e[0].dataType }], dispatchGroup: { x: w[0], y: w[1], z: w[2] }, programUniforms: M }), getShaderSource: F }
      }
    }), Vu, ah, C0 = U(() => {
      te(), lt(), ae(), Ut(), dn(), z0(), hn(), Vu = (e, t, r, i, a = !1, n, s = 4, u = 4, l = 4, p = "f32") => {
        let f = M => { switch (M) { case 1: return "resData = x[xIndex];"; case 3: return `resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`; case 4: return "resData = x[xIndex / 4];"; default: throw new Error(`innerElementSize ${M} is not supported.`) } }, h = M => { switch (M) { case 1: return "return w[row * i32(uniforms.w_shape[3]) + colIn];"; case 4: return "return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];"; default: throw new Error(`innerElementSize ${M} is not supported.`) } }, g = e ? `
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `: `
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `, y = e ? `
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `: `
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `, _ = e ? "i32(uniforms.x_shape[1])" : "i32(uniforms.x_shape[2])", b = e ? "i32(uniforms.x_shape[2])" : "i32(uniforms.x_shape[3])", S = e ? "row" : "col", v = e ? "col" : "row", w = `
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e ? "i32(uniforms.result_shape[2])" : "i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${ze(s, p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${b}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`, I = e ? t && i ? `
    let col = colIn * ${s};
    ${w}` : `
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${ze(s, p)}(0.0);` : i && r ? `
    let col = colIn * ${s};
    ${w}` : `
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${ze(s, p)}(0.0);`, T = e ? i && r ? h(u) : `
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(u)}
    }
    return ${ze(u, p)}(0.0);` : `
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(u)}
    }
    return ${ze(u, p)}(0.0);`, E = ze(l, p), C = ze(e ? s : u, p), A = ze(e ? u : s, p), x = Bt(n, E, p); return `
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e ? I : T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e ? T : I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e ? "i32(uniforms.result_shape[2])" : "i32(uniforms.result_shape[3])"};
      ${y}
      ${rh(a)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`}, ah = (e, t, r, i, a, n, s, u, l) => {
        let p = t.format === "NHWC", f = p ? e[0].dims[3] : e[0].dims[1], h = r[0], g = p ? r[2] : r[3], y = p ? r[1] : r[2], _ = p ? r[3] : r[1], b = p && (f % 4 === 0 || f % 3 === 0) && _ % 4 === 0, S = p ? _ : g * y, v = p ? g * y : _, w = [8, 8, 1], I = i <= 8 ? [4, 1, 1] : [4, 4, 1], T = [Math.ceil(S / w[0] / I[0]), Math.ceil(v / w[1] / I[1]), Math.ceil(h / w[2] / I[2])]; de("verbose", () => `[conv2d_mm_webgpu] dispatch = ${T}`); let E = b ? p && f % 4 !== 0 ? 3 : 4 : 1, C = w[1] * I[1], A = w[0] * I[0], x = Math.max(w[0] * E, w[1]), M = i % C === 0, D = a % A === 0, H = n % x === 0, F = b ? [E, 4, 4] : [1, 1, 1], j = [{ type: 6, data: i }, { type: 6, data: a }, { type: 6, data: n }, { type: 6, data: [t.pads[0], t.pads[1]] }, { type: 6, data: t.strides }, { type: 6, data: t.dilations }]; Nt(t, j), j.push(...J(e[0].dims, e[1].dims)); let R = ["rank", "rank"]; s && (j.push(...J(e[2].dims)), R.push("rank")), j.push(...J(r)); let K = X => {
          let ee = [{ name: "dim_a_outer", type: "i32" }, { name: "dim_b_outer", type: "i32" }, { name: "dim_inner", type: "i32" }, { name: "pad", type: "i32", length: 2 }, { name: "stride", type: "i32", length: 2 }, { name: "dilation", type: "i32", length: 2 }]; Mt(t, ee); let he = b ? 4 : 1, W = Ie(e[0].dataType), ue = `
      fn setOutputAtIndex(flatIndex : i32, value : ${b ? `vec4<${W}>` : W}) {
        result[flatIndex] = ${b ? `vec4<${W}>` : W}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b ? `vec4<${W}>` : W}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b ? "/ 4" : ""}, value);
      }`, P = N("x", e[0].dataType, e[0].dims.length, E === 3 ? 1 : E), V = N("w", e[1].dataType, e[1].dims.length, he), Z = [P, V], q = Q("result", e[0].dataType, r.length, he); if (s) {
            let me = N("bias", e[2].dataType, e[2].dims.length, he); Z.push(me), ue += `
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b ? `vec4<${W}>` : W} {
          return bias[coords.${p ? "w" : "y"}${b ? "/ 4" : ""}];
        }`} return `
        ${ih("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(ee).declareVariables(...Z, q)}
        ${ue}
        ${Vu(p, M, D, H, s, t, F[0], F[1], F[2], W)}
        ${b ? Ua(I, w, W, void 0, !p, x) : Pa(I, w, W, void 0, !p, x, !1, void 0, u)}`
        }; return { name: "Conv2DMatMul", shaderCache: { hint: `${t.cacheKey};${E};${b};${M};${D};${H};${C};${A};${x}`, inputDependencies: R }, getRunData: () => ({ outputs: [{ dims: l ? l(r) : r, dataType: e[0].dataType }], dispatchGroup: { x: T[0], y: T[1], z: T[2] }, programUniforms: j }), getShaderSource: K }
      }
    }), Gu, ea, ar, Hu, ta, Fu, nh, sh, A0 = U(() => {
      te(), lt(), ie(), ae(), Ut(), dn(), Gu = e => { let t = 1; for (let r = 0; r < e.length; r++)t *= e[r]; return t }, ea = e => typeof e == "number" ? [e, e, e] : e, ar = (e, t) => t <= 1 ? e : e + (e - 1) * (t - 1), Hu = (e, t, r, i = 1) => { let a = ar(t, i); return Math.floor((e[0] * (r - 1) - r + a) / 2) }, ta = (e, t, r, i, a) => { a == null && (a = Hu(e, t[0], i[0])); let n = [0, 0, 0, r]; for (let s = 0; s < 3; s++)e[s] + 2 * a >= t[s] && (n[s] = Math.trunc((e[s] - t[s] + 2 * a) / i[s] + 1)); return n }, Fu = (e, t, r, i, a, n, s, u, l, p) => { let f, h, g, y; if (e === "VALID" && (e = 0), typeof e == "number") { f = { top: e, bottom: e, left: e, right: e, front: e, back: e }; let _ = ta([t, r, i, 1], [u, l, p], 1, [a, n, s], e); h = _[0], g = _[1], y = _[2] } else if (Array.isArray(e)) { if (!e.every((b, S, v) => b === v[0])) throw Error(`Unsupported padding parameter: ${e}`); f = { top: e[0], bottom: e[1], left: e[2], right: e[3], front: e[4], back: e[5] }; let _ = ta([t, r, i, 1], [u, l, p], 1, [a, n, s], e[0]); h = _[0], g = _[1], y = _[2] } else if (e === "SAME_UPPER") { h = Math.ceil(t / a), g = Math.ceil(r / n), y = Math.ceil(i / s); let _ = (h - 1) * a + u - t, b = (g - 1) * n + l - r, S = (y - 1) * s + p - i, v = Math.floor(_ / 2), w = _ - v, I = Math.floor(b / 2), T = b - I, E = Math.floor(S / 2), C = S - E; f = { top: I, bottom: T, left: E, right: C, front: v, back: w } } else throw Error(`Unknown padding parameter: ${e}`); return { padInfo: f, outDepth: h, outHeight: g, outWidth: y } }, nh = (e, t, r, i, a, n = !1, s = "channelsLast") => { let u, l, p, f, h; if (s === "channelsLast") [u, l, p, f, h] = e; else if (s === "channelsFirst") [u, h, l, p, f] = e; else throw new Error(`Unknown dataFormat ${s}`); let [g, , y, _, b] = t, [S, v, w] = ea(r), [I, T, E] = ea(i), C = ar(y, I), A = ar(_, T), x = ar(b, E), { padInfo: M, outDepth: D, outHeight: H, outWidth: F } = Fu(a, l, p, f, S, v, w, C, A, x), j = n ? g * h : g, R = [0, 0, 0, 0, 0]; return s === "channelsFirst" ? R = [u, j, D, H, F] : s === "channelsLast" && (R = [u, D, H, F, j]), { batchSize: u, dataFormat: s, inDepth: l, inHeight: p, inWidth: f, inChannels: h, outDepth: D, outHeight: H, outWidth: F, outChannels: j, padInfo: M, strideDepth: S, strideHeight: v, strideWidth: w, filterDepth: y, filterHeight: _, filterWidth: b, effectiveFilterDepth: C, effectiveFilterHeight: A, effectiveFilterWidth: x, dilationDepth: I, dilationHeight: T, dilationWidth: E, inShape: e, outShape: R, filterShape: t } }, sh = (e, t, r, i, a, n) => {
        let s = n === "channelsLast"; s ? e[0].dims[3] : e[0].dims[1]; let u = [64, 1, 1], l = { x: r.map((S, v) => v) }, p = [Math.ceil(Gu(l.x.map(S => r[S])) / u[0]), 1, 1]; de("verbose", () => `[conv3d_naive_webgpu] dispatch = ${p}`); let f = 1, h = O.size(r), g = [{ type: 12, data: h }, { type: 12, data: i }, { type: 12, data: a }, { type: 12, data: t.strides }, { type: 12, data: t.dilations }]; Nt(t, g), g.push(...J(e[0].dims, e[1].dims)); let y = ["rank", "rank"], _ = e.length === 3; _ && (g.push(...J(e[2].dims)), y.push("rank")), g.push(...J(r)); let b = S => {
          let v = [{ name: "output_size", type: "u32" }, { name: "filter_dims", type: "u32", length: i.length }, { name: "pads", type: "u32", length: a.length }, { name: "strides", type: "u32", length: t.strides.length }, { name: "dilations", type: "u32", length: t.dilations.length }]; Mt(t, v); let w = 1, I = Ie(e[0].dataType), T = N("x", e[0].dataType, e[0].dims.length, f), E = N("W", e[1].dataType, e[1].dims.length, w), C = [T, E], A = Q("result", e[0].dataType, r.length, w), x = ""; if (_) {
            let H = N("bias", e[2].dataType, e[2].dims.length, w); C.push(H), x += `
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${I} {
          return bias[${s ? Y("coords", 4, 5) : Y("coords", 1, 5)}];
        }`} let M = ze(f, I), D = Bt(t, M, I); return `
            ${x}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${T.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
          ${S.registerUniforms(v).declareVariables(...C, A)}
          ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${Y("coords", 0, T.rank)};
              let d2 = ${s ? Y("coords", T.rank - 1, T.rank) : Y("coords", 1, T.rank)};
              let xFRCCorner = vec3<u32>(${s ? Y("coords", 1, T.rank) : Y("coords", 2, T.rank)},
              ${s ? Y("coords", 2, T.rank) : Y("coords", 3, T.rank)},
              ${s ? Y("coords", 3, T.rank) : Y("coords", 4, T.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s ? Y("uniforms.x_shape", 1, T.rank) : Y("uniforms.x_shape", 2, T.rank)};
              let xShapeZ = ${s ? Y("uniforms.x_shape", 2, T.rank) : Y("uniforms.x_shape", 3, T.rank)};
              let xShapeW = ${s ? Y("uniforms.x_shape", 3, T.rank) : Y("uniforms.x_shape", 4, T.rank)};
              let xShapeU = ${s ? Y("uniforms.x_shape", 4, T.rank) : Y("uniforms.x_shape", 1, T.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s ? `let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `: `let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s ? `value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`: `value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s ? `let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `: `let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s ? `let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `: `let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${_ ? "value = value + getBiasByOutputCoords(coords)" : ""};
              ${D}
              result[global_idx] = f32(value);
          }`}; return { name: "Conv3DNaive", shaderCache: { hint: `${t.cacheKey};${s};${f};${_}`, inputDependencies: y }, getRunData: () => ({ outputs: [{ dims: r, dataType: e[0].dataType }], dispatchGroup: { x: p[0], y: p[1], z: p[2] }, programUniforms: g }), getShaderSource: b }
      }
    }), oh, uh, O0 = U(() => {
      te(), ie(), ae(), Ut(), oh = (e, t, r, i) => {
        let a = e.length > 2, n = a ? "value += b[output_channel];" : "", s = e[0].dims, u = e[1].dims, l = t.format === "NHWC", p = l ? r[3] : r[1], f = p / t.group, h = l && f >= 4 ? ve(p) : 1, g = O.size(r) / h, y = [{ type: 12, data: g }, { type: 12, data: t.dilations }, { type: 12, data: [t.strides[0], t.strides[1]] }, { type: 12, data: [t.pads[0], t.pads[1]] }, { type: 12, data: f }]; Nt(t, y), y.push(...J(s, [u[0], u[1], u[2], u[3] / h])); let _ = a ? ["rank", "rank", "rank"] : ["rank", "rank"]; y.push(...J([r[0], r[1], r[2], r[3] / h])); let b = S => {
          let v = Q("output", e[0].dataType, r.length, h), w = Ie(v.type.tensor), I = Bt(t, v.type.value, w), T = N("x", e[0].dataType, s.length), E = N("w", e[1].dataType, u.length, h), C = [T, E]; a && C.push(N("b", e[2].dataType, e[2].dims, h)); let A = [{ name: "output_size", type: "u32" }, { name: "dilations", type: "u32", length: t.dilations.length }, { name: "strides", type: "u32", length: 2 }, { name: "pads", type: "u32", length: 2 }, { name: "output_channels_per_group", type: "u32" }]; Mt(t, A); let x = l ? `
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${T.get("batch", "xHeight", "xWidth", "input_channel")};
            let wVal = ${E.get("wHeight", "wWidth", "wInChannel", "output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `: `
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${T.get("batch", "input_channel", "xHeight", "xWidth")};
            let wVal = ${E.get("output_channel", "wInChannel", "wHeight", "wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `; return `
  ${S.registerUniforms(A).declareVariables(...C, v)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l ? 3 : 1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l ? 1 : 2}], outputIndices[${l ? 2 : 3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l ? 2 : 1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${x}
    ${n}
    ${I}
    ${v.setByOffset("global_idx", "value")}
  }`}; return { name: "GroupedConv", shaderCache: { hint: `${t.cacheKey}_${h}`, inputDependencies: _ }, getRunData: () => ({ outputs: [{ dims: i ? i(r) : r, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(g / 64) }, programUniforms: y }), getShaderSource: b }
      }, uh = (e, t, r, i) => {
        let a = e.length > 2, n = ve(r[3]), s = ve(r[2]), u = O.size(r) / n / s, l = [e[0].dims[0], e[0].dims[1], e[0].dims[2], e[0].dims[3] / n], p = [e[1].dims[0], e[1].dims[1], e[1].dims[2], e[1].dims[3] / n], f = [r[0], r[1], r[2], r[3] / n], h = [{ type: 12, data: u }, { type: 6, data: [t.strides[0], t.strides[1]] }, { type: 6, data: [t.pads[0], t.pads[1]] }]; Nt(t, h), h.push(...J(l, p, f)); let g = (s - 1) * t.strides[1] + p[1], y = _ => {
          let b = Q("output", e[0].dataType, f.length, n), S = Ie(b.type.tensor), v = Bt(t, b.type.value, S), w = N("x", e[0].dataType, l.length, n), I = N("w", e[1].dataType, p.length, n), T = [w, I]; a && T.push(N("b", e[2].dataType, e[2].dims, n)); let E = a ? "value += b[output_channel];" : "", C = [{ name: "output_size", type: "u32" }, { name: "strides", type: "i32", length: 2 }, { name: "pads", type: "i32", length: 2 }]; return Mt(t, C), `
  ${_.registerUniforms(C).declareVariables(...T, b)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${g}>;
    var values: array<${b.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch", "u32(x_height)", "u32(x_width)", "input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${I.get("w_height", "w_width", "0", "output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${E}
      ${v}
      ${b.set("batch", "row", "col + i", "output_channel", "value")};
    }
  }`}; return { name: "GroupedConv-Vectorize", shaderCache: { hint: `${t.cacheKey};${n};${s};${g};${p[0]};${p[1]}`, inputDependencies: a ? ["rank", "rank", "type"] : ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: i ? i(r) : r, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(u / 64) }, programUniforms: h }), getShaderSource: y }
      }
    }), ju, Pr, Ku, qr, qa, ra, Xu, Zu, La, R0 = U(() => { ie(), C0(), A0(), hn(), O0(), Ut(), cn(), wt(), ju = (e, t, r, i, a, n) => { let s = e[0], u = e.slice(n ? 1 : 2, n ? 3 : 4), l = u.length, p = t[0], f = t.slice(2).map((g, y) => g + (g - 1) * (r[y] - 1)), h = u.map((g, y) => g + i[y] + i[y + l]).map((g, y) => Math.floor((g - f[y] + a[y]) / a[y])); return h.splice(0, 0, s), h.splice(n ? 3 : 1, 0, p), h }, Pr = [2, 3, 1, 0], Ku = (e, t) => { if (!e || e.length !== 2 && e.length !== 3) throw new Error("Conv requires 2 or 3 inputs"); if (e[0].dims.length > 5) throw new Error("greater than 5D is not supported"); if (e[0].dims.length !== e[1].dims.length) throw new Error("filter does not have same dimension as input"); let r = e[0].dims[t.format === "NHWC" ? e[0].dims.length - 1 : 1], i = e[1].dims[1] * t.group; if (r !== i) throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL"); if (e.length === 3 && (e[2].dims.length !== 1 || e[1].dims[0] !== e[2].dims[0])) throw new Error("invalid bias"); let a = e[0].dims.length - 2; if (t.dilations.length !== a) throw new Error(`dilations should be ${a}D`); if (t.strides.length !== a) throw new Error(`strides should be ${a}D`); if (t.pads.length !== a * 2) throw new Error(`pads should be ${a * 2}D`); if (t.kernelShape.length !== 0 && t.kernelShape.length !== e[1].dims.length - 2) throw new Error("invalid kernel shape") }, qr = (e, t) => { let r = e.kernelShape.slice(); r.length < t[1].dims.length - 2 && r.push(...Array(t[1].dims.length - 2 - r.length).fill(0)); for (let n = 2; n < t[1].dims.length; ++n)r[n - 2] === 0 && (r[n - 2] = t[1].dims[n]); let i = e.pads.slice(); ei.adjustPadsBasedOnAutoPad(t[0].dims, e.strides, e.dilations, r, i, e.format === "NHWC", e.autoPad); let a = Object.assign({}, e); return Object.assign(a, { kernelShape: r, pads: i }), a }, qa = e => { let t = ln(e), r = e.format, i = ["NOTSET", "VALID", "SAME_UPPER", "SAME_LOWER"][e.auto_pad], a = e.dilations, n = e.group, s = e.kernel_shape, u = e.pads, l = e.strides, p = e.w_is_const(); return { autoPad: i, format: r, dilations: a, group: n, kernelShape: s, pads: u, strides: l, wIsConst: p, ...t, cacheKey: `${e.format};${t.activation};` } }, ra = (e, t, r, i) => { let a = r.format === "NHWC", n = ju(t[0].dims, t[1].dims, r.dilations, r.pads, r.strides, a); if (r.group !== 1) { let C = [t[0]]; if (a) { let A = e.kernelCustomData.wT ?? e.compute(Le(t[1], Pr), { inputs: [1], outputs: [r.wIsConst ? -2 : -1] })[0]; r.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = A), C.push(A) } else C.push(t[1]); t.length === 3 && C.push(t[2]), !e.adapterInfo.isArchitecture("ampere") && a && t[1].dims[0] === r.group && t[1].dims[1] === 1 && r.dilations[0] === 1 && r.dilations[1] === 1 ? e.compute(uh(C, r, n, i), { inputs: C }) : e.compute(oh(C, r, n, i), { inputs: C }); return } let s = t.length === 3, u = t[0].dims[a ? 1 : 2], l = t[0].dims[a ? 2 : 3], p = t[0].dims[a ? 3 : 1], f = t[1].dims[2], h = t[1].dims[3], g = n[a ? 1 : 2], y = n[a ? 2 : 3], _ = n[a ? 3 : 1], b = a && f === u && h === l && r.pads[0] === 0 && r.pads[1] === 0; if (b || f === 1 && h === 1 && r.dilations[0] === 1 && r.dilations[1] === 1 && r.strides[0] === 1 && r.strides[1] === 1 && r.pads[0] === 0 && r.pads[1] === 0) { let C = n[0], A, x, M, D = []; if (a) { let j = e.kernelCustomData.wT ?? e.compute(Le(t[1], Pr), { inputs: [1], outputs: [r.wIsConst ? -2 : -1] })[0]; if (r.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = j), b) { let R = u * l * p; A = t[0].reshape([1, C, R]), x = j.reshape([1, R, _]), M = [1, C, _] } else A = t[0].reshape([C, u * l, p]), x = j.reshape([1, p, _]), M = [C, g * y, _]; D.push(A), D.push(x) } else A = t[0].reshape([C, p, u * l]), x = t[1].reshape([1, _, p]), M = [C, _, g * y], D.push(x), D.push(A); s && D.push(t[2]); let H = M[2], F = D[0].dims[D[0].dims.length - 1]; H < 8 && F < 8 ? e.compute(pn(D, r, n, M, a, i), { inputs: D }) : e.compute(ri(D, r, n, M, a, i), { inputs: D }); return } let S = !0, v = e.kernelCustomData.wT ?? e.compute(Le(t[1], Pr), { inputs: [1], outputs: [r.wIsConst ? -2 : -1] })[0]; r.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = v); let w = [t[0], v]; s && w.push(t[2]); let I = a ? g * y : _, T = a ? _ : g * y, E = f * h * p; e.compute(ah(w, r, n, I, T, E, s, S, i), { inputs: w }) }, Xu = (e, t) => { let r = t.format === "NHWC", i = [e.inputs[0].reshape(r ? [e.inputs[0].dims[0], 1, e.inputs[0].dims[1], e.inputs[0].dims[2]] : [e.inputs[0].dims[0], e.inputs[0].dims[1], 1, e.inputs[0].dims[2]]), e.inputs[1].reshape([e.inputs[1].dims[0], e.inputs[1].dims[1], 1, e.inputs[1].dims[2]])]; e.inputs.length === 3 && i.push(e.inputs[2]); let a = [0, t.pads[0], 0, t.pads[1]], n = [1].concat(t.strides), s = [1].concat(t.dilations), u = [1].concat(t.kernelShape), l = qr({ ...t, pads: a, strides: n, dilations: s, kernelShape: u }, i); ra(e, i, l, p => r ? [p[0], p[2], p[3]] : [p[0], p[1], p[3]]) }, Zu = (e, t, r) => { let i = r.format === "NHWC" ? "channelsLast" : "channelsFirst", a = qr(r, t), n = r.autoPad === "NOTSET" ? r.pads : r.autoPad, s = nh(t[0].dims, t[1].dims, r.strides, r.dilations, n, !1, i); e.compute(sh(t, a, s.outShape, [s.filterDepth, s.filterHeight, s.filterWidth], [s.padInfo.front, s.padInfo.top, s.padInfo.left], i)) }, La = (e, t) => { if (Ku(e.inputs, t), e.inputs[0].dims.length === 3) Xu(e, t); else if (e.inputs[0].dims.length === 5) Zu(e, e.inputs, t); else { let r = qr(t, e.inputs); ra(e, e.inputs, r) } } }), lh, B0 = U(() => {
      te(), lt(), ie(), ae(), lh = (e, t, r) => {
        let i = e.length > 2, a = t.outputShape, n = t.format === "NHWC", s = t.group, u = e[1].dims, l = u[2] / s, p = u[3], f = n ? ve(l) : 1, h = n && p === 1 && l >= 4, g = h ? Math.floor(l / 4) * 4 : Math.floor(l / f) * f, y = l - g, _ = n ? ve(p) : 1, b = n ? p === 1 ? f : _ : 1, S = O.size(a) / _, v = [Math.ceil(S / 64), 1, 1]; de("verbose", () => `[conv2d_backprop_webgpu] dispatch = ${v}`); let w = ["rank", "rank"], I = [t.strides[0], t.strides[1]], T = [t.kernelShape[n ? 1 : 2], t.kernelShape[n ? 2 : 3]], E = [t.dilations[0], t.dilations[1]], C = [T[0] + (t.dilations[0] <= 1 ? 0 : (t.kernelShape[n ? 1 : 2] - 1) * (t.dilations[0] - 1)), T[1] + (t.dilations[1] <= 1 ? 0 : (t.kernelShape[n ? 2 : 3] - 1) * (t.dilations[1] - 1))], A = [C[0] - 1 - Math.floor((t.pads[0] + t.pads[2]) / 2), C[1] - 1 - Math.floor((t.pads[1] + t.pads[3]) / 2)], x = [{ type: 12, data: S }, { type: 12, data: I }, { type: 12, data: T }, { type: 12, data: E }, { type: 12, data: C }, { type: 6, data: A }, { type: 12, data: g }, { type: 12, data: l }, { type: 12, data: p }, ...J(e[0].dims, e[1].dims)]; i && (x.push(...J(e[2].dims)), w.push("rank")), x.push(...J(a)); let M = D => {
          let H = [{ name: "output_size", type: "u32" }, { name: "strides", type: "u32", length: I.length }, { name: "filter_dims", type: "u32", length: T.length }, { name: "dilations", type: "u32", length: T.length }, { name: "effective_filter_dims", type: "u32", length: C.length }, { name: "pads", type: "i32", length: A.length }, { name: "input_channels_per_group_int", type: "u32" }, { name: "input_channels_per_group", type: "u32" }, { name: "output_channels_per_group", type: "u32" }], F = Ie(e[0].dataType), j = n ? 1 : 2, R = n ? 2 : 3, K = n ? 3 : 1, X = N("W", e[1].dataType, e[1].dims.length, b), ee = N("Dy", e[0].dataType, e[0].dims.length, f), he = [ee, X]; i && he.push(N("bias", e[2].dataType, [a[K]].length, _)); let W = Q("result", e[0].dataType, a.length, _), ue = () => {
            let Z = ""; if (h) f === 4 ? Z += `
        let xValue = ${ee.getByOffset("x_offset")};
        let wValue = ${X.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`: f === 2 ? Z += `
          dotProd = dotProd + dot(vec4<${F}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}), vec4<${F}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`: f === 1 && (Z += `
          dotProd = dotProd + dot(vec4<${F}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}, ${ee.getByOffset("x_offset + 2u")}, ${ee.getByOffset("x_offset + 3u")}), vec4<${F}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}, ${X.getByOffset("w_offset + 2u")}, ${X.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`); else if (Z += `
                  let xValue = ${n ? ee.getByOffset(`${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`) : ee.get("batch", "inputChannel", "idyR", "idyC")};
        `, f === 1) Z += `
          let w_offset = ${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${X.getByOffset(`w_offset / ${b}`)};
          dotProd = dotProd + xValue * wValue;`; else for (let q = 0; q < f; q++)Z += `
            let wValue${q} = ${X.getByOffset(`${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${q}, wOutChannel)`)} / ${b}`)};
            dotProd = dotProd + xValue[${q}] * wValue${q};`; return Z
          }, P = () => {
            if (y === 0) return ""; if (!h) throw new Error(`packInputAs4 ${h} is not true.`); let Z = ""; if (f === 1) {
              Z += "dotProd = dotProd"; for (let q = 0; q < y; q++)Z += `
            + ${ee.getByOffset(`x_offset + ${q}`)} * ${X.getByOffset(`w_offset + ${q}`)}`; Z += ";"
            } else if (f === 2) {
              if (y !== 2) throw new Error(`Invalid inputChannelsRemainder ${y}.`); Z += `
          let xValue = ${ee.getByOffset("x_offset")};
          let wValue = ${X.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`} return Z
          }, V = `
            let outputIndices = ${W.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${W.indicesGet("outputIndices", 0)};
            let d1 = ${W.indicesGet("outputIndices", K)};
            let r = ${W.indicesGet("outputIndices", j)};
            let c = ${W.indicesGet("outputIndices", R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${W.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${F}(dyRCorner) + ${F}(wR)) / ${F}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${F}(uniforms.Dy_shape[${j}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${F}(dyCCorner) + ${F}(wC)) / ${F}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${F}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${h ? `
                var x_offset = ${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${X.indicesToOffset(`${X.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${b};
                  `: ""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h ? 4 : f}) {
                  ${ue()}
                  inputChannel = inputChannel + ${h ? 4 : f};
                }
                ${P()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i ? ` + bias[d1 / ${_}]` : ""};
            ${W.setByOffset("global_idx", "value")};
          `; return `
    ${D.registerUniforms(H).declareVariables(...he, W)}
      ${D.mainStart()}
      ${D.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${V}}`
        }; return { name: "ConvTranspose2D", shaderCache: { hint: `${t.cacheKey};${f}${b}${_}${h}${y}`, inputDependencies: w }, getRunData: () => ({ dispatchGroup: { x: v[0], y: v[1], z: v[2] }, outputs: [{ dims: r ? r(a) : a, dataType: e[0].dataType }], programUniforms: x }), getShaderSource: M }
      }
    }), Qu, Yu, Ju, ia, dh, el, aa, tl, ph, N0 = U(() => { B0(), Ut(), wt(), Qu = (e, t, r, i, a, n) => (e - 1) * t + r + (i - 1) * a + 1 - n, Yu = (e, t, r, i, a) => { let n = Math.floor(e / 2); t === "SAME_UPPER" ? (r[i] = n, r[a] = e - n) : t === "SAME_LOWER" && (r[i] = e - n, r[a] = n) }, Ju = (e, t, r, i, a, n, s, u, l, p) => { let f = e.length - 2, h = p.length === 0; l.length < f && l.push(...Array(f - l.length).fill(0)); let g = e[0], y = t[u ? 3 : 1] * a; for (let _ = 0, b = e.length - f - (u ? 1 : 0); _ < f; ++_, ++b) { let S = e[b], v = h ? S * s[_] : p[_], w = Qu(S, s[_], n[_], t[b], r[_], v); Yu(w, i, n, _, _ + f), h && p.push(s[_] * (S - 1) + l[_] + (t[b] - 1) * r[_] + 1 - n[_] - n[_ + f]) } p.splice(0, 0, g), p.splice(u ? 3 : 1, 0, y) }, ia = (e, t) => { let r = e.kernelShape.slice(); if (e.kernelShape.length === 0 || e.kernelShape.reduce((h, g) => h * g, 1) === 0) { r.length = 0; for (let h = 2; h < t[1].dims.length; ++h)r.push(t[1].dims[h]) } let i = e.format === "NHWC"; r.splice(0, 0, t[1].dims[0]), r.splice(i ? 3 : 1, 0, t[1].dims[1]); let a = e.pads.slice(), n = e.outputShape.slice(), s = e.outputPadding.slice(), u = t[0].dims, l = e.dilations.slice(); if (l.reduce((h, g) => h + g, 0) === 0) { let h = t[0].dims.length - 2; l = new Array(h).fill(1) } let p = e.strides.slice(); if (p.reduce((h, g) => h + g, 0) === 0) { let h = t[0].dims.length - 2; p = new Array(h).fill(1) } Ju(u, r, l, e.autoPad, e.group, a, p, i, s, n); let f = Object.assign({}, e); return Object.assign(f, { kernelShape: r, pads: a, outputPadding: s, outputShape: n, dilations: l, strides: p }), f }, dh = e => { let t = ln(e), r = e.format, i = ["NOTSET", "VALID", "SAME_UPPER", "SAME_LOWER"][typeof e.autoPad > "u" ? 0 : e.autoPad], a = e.dilations, n = e.group ?? 1, s = e.kernelShape, u = e.pads, l = e.strides, p = e.wIsConst(), f = e.outputPadding, h = e.outputShape; return { autoPad: i, format: r, dilations: a, group: n, kernelShape: s, outputPadding: f, outputShape: h, pads: u, strides: l, wIsConst: p, ...t, cacheKey: `${e.format};${t.activation};` } }, el = (e, t) => { if (!e || e.length !== 2 && e.length !== 3) throw new Error("Conv requires 2 or 3 inputs"); if (e[0].dims.length !== 4 && e[0].dims.length !== 3) throw new Error("currently only support 2-dimensional conv"); if (e[0].dims.length !== e[1].dims.length) throw new Error("filter does not have same dimension as input"); let r = e[0].dims[t.format === "NHWC" ? e[0].dims.length - 1 : 1], i = e[1].dims[0]; if (r !== i) throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL"); let a = e[1].dims[1] * t.group; if (e.length === 3 && (e[2].dims.length !== 1 || e[2].dims[0] !== a)) throw new Error("invalid bias"); let n = e[0].dims.length - 2; if (t.dilations.reduce((s, u) => s + u, 0) > 0 && t.dilations.length !== n) throw new Error(`dilations should be ${n}D`); if (t.strides.reduce((s, u) => s + u, 0) > 0 && t.strides.length !== n) throw new Error(`strides should be ${n}D`); if (t.pads.reduce((s, u) => s + u, 0) > 0 && t.pads.length !== n * 2) throw new Error(`pads should be ${n * 2}D`); if (t.outputPadding.length !== n && t.outputPadding.length !== 0) throw new Error(`output_padding should be ${n}D`); if (t.kernelShape.reduce((s, u) => s + u, 0) > 0 && t.kernelShape.length !== 0 && t.kernelShape.length !== e[1].dims.length - 2) throw new Error("invalid kernel shape"); if (t.outputShape.length !== 0 && t.outputShape.length !== e[0].dims.length - 2) throw new Error("invalid output shape") }, aa = (e, t, r, i) => { let a = e.kernelCustomData.wT ?? e.compute(Le(t[1], [2, 3, 0, 1]), { inputs: [1], outputs: [r.wIsConst ? -2 : -1] })[0]; r.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = a); let n = [t[0], a]; t.length === 3 && n.push(t[2]), e.compute(lh(n, r, i), { inputs: n }) }, tl = (e, t) => { let r = t.format === "NHWC", i = [e.inputs[0].reshape(r ? [e.inputs[0].dims[0], 1, e.inputs[0].dims[1], e.inputs[0].dims[2]] : [e.inputs[0].dims[0], e.inputs[0].dims[1], 1, e.inputs[0].dims[2]]), e.inputs[1].reshape([e.inputs[1].dims[0], e.inputs[1].dims[1], 1, e.inputs[1].dims[2]])]; e.inputs.length === 3 && i.push(e.inputs[2]); let a = t.kernelShape; (a.length === 0 || a[0] === 0) && (a = [e.inputs[1].dims[2]]); let n = t.dilations; (n.length === 0 || n[0] === 0) && (n = [1]); let s = t.strides; (s.length === 0 || s[0] === 0) && (s = [1]); let u = t.pads; u.length === 0 && (u = [0, 0]), u = [0, u[0], 0, u[1]], s = [1].concat(s), n = [1].concat(n), a = [1].concat(a); let l = t.outputPadding; l = [0].concat(l); let p = ia({ ...t, pads: u, strides: s, dilations: n, kernelShape: a, outputPadding: l }, i); aa(e, i, p, f => r ? [f[0], f[2], f[3]] : [f[0], f[1], f[3]]) }, ph = (e, t) => { if (el(e.inputs, t), e.inputs[0].dims.length === 3) tl(e, t); else { let r = ia(t, e.inputs); aa(e, e.inputs, r) } } }), rl, ch, hh, M0 = U(() => {
      te(), ie(), xe(), ae(), rl = (e, t, r, i) => {
        let a = O.size(t), n = t.length, s = N("input", e, n), u = Q("output", e, n), l = r.dataType === 6 ? r.getInt32Array()[0] : Number(r.getBigInt64Array()[0]), p = O.normalizeAxis(l, n), f = h => {
          let g = ` i32(${s.indicesGet("inputIndices", "uniforms.axis")}) `, y = Y("uniforms.input_shape", "uniforms.axis", n), _ = i.reverse ? g + (i.exclusive ? " + 1" : "") : "0", b = i.reverse ? y : g + (i.exclusive ? "" : " + 1"); return `
                ${h.registerUniform("outputSize", "u32").registerUniform("axis", "u32").declareVariables(s, u)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices", "uniforms.axis", "u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx", "sum")};
                }`}; return { name: "CumSum", shaderCache: { hint: i.cacheKey, inputDependencies: ["rank"] }, getRunData: () => ({ outputs: [{ dims: t, dataType: e }], dispatchGroup: { x: Math.ceil(a / 64) }, programUniforms: [{ type: 12, data: a }, { type: 12, data: p }, ...J(t, t)] }), getShaderSource: f }
      }, ch = (e, t) => { let r = e.inputs[0].dims, i = e.inputs[0].dataType, a = e.inputs[1]; e.compute(rl(i, r, a, t), { inputs: [0] }) }, hh = e => { let t = e.exclusive === 1, r = e.reverse === 1; return fe({ exclusive: t, reverse: r }) }
    }), il, al, nl, fh, mh, D0 = U(() => {
      te(), ie(), xe(), ae(), il = e => { if (!e || e.length !== 1) throw new Error("DepthToSpace requires 1 input."); if (e[0].dims.length !== 4) throw new Error("DepthToSpace requires 4D input.") }, al = (e, t, r, i) => {
        let a = []; a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`); for (let n = 0; n < t; ++n)a.push(r.indicesSet("a", e[n], `i[${n}]`)); return a.push("return a;}"), a.join(`
`)
      }, nl = (e, t) => {
        let r, i, a, n, s, u, l = t.format === "NHWC", p = t.blocksize, f = t.mode === "DCR"; l ? ([r, i, a, n] = e.dims, s = f ? [r, i, a, p, p, n / p ** 2] : [r, i, a, n / p ** 2, p, p], u = f ? [0, 1, 3, 2, 4, 5] : [0, 1, 4, 2, 5, 3]) : ([r, i, a, n] = [e.dims[0], e.dims[2], e.dims[3], e.dims[1]], s = f ? [r, p, p, n / p ** 2, i, a] : [r, n / p ** 2, p, p, i, a], u = f ? [0, 3, 4, 1, 5, 2] : [0, 1, 4, 2, 5, 3]); let h = e.reshape(s), g = h.dims.length, y = e.dataType, _ = N("a", y, g), b = Q("output", y, g), S = v => `
  ${v.registerUniform("output_size", "u32").declareVariables(_, b)}

  ${al(u, g, _, b)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx", _.getByIndices("aIndices"))}
  }`; return { name: "DepthToSpace", shaderCache: { hint: `${e.dims};${t.blocksize};${t.mode}`, inputDependencies: ["rank"] }, getRunData: v => { let w = l ? [r, i * p, a * p, n / p ** 2] : [r, n / p ** 2, i * p, a * p], I = O.size(w), T = h.dims, E = O.sortBasedOnPerm(T, u); return { outputs: [{ dims: w, dataType: v[0].dataType }], dispatchGroup: { x: Math.ceil(I / 64) }, programUniforms: [{ type: 12, data: I }, ...J(T, E)] } }, getShaderSource: S }
      }, fh = (e, t) => { il(e.inputs), e.compute(nl(e.inputs[0], t)) }, mh = e => fe({ blocksize: e.blocksize, mode: e.mode, format: e.format })
    }), Lr, nr, na, sl, ol, ul, ll, sa, dl, gh, yh, U0 = U(() => {
      te(), ie(), xe(), ae(), Lr = "[a-zA-Z]|\\.\\.\\.", nr = "(" + Lr + ")+", na = "^" + nr + "$", sl = "(" + nr + ",)*" + nr, ol = "^" + sl + "$", ul = class { constructor(e = -1) { this.symbolToIndices = new Map, this.inputIndex = e } addSymbol(e, t) { let r = this.symbolToIndices.get(e); r === void 0 ? r = [t] : r.push(t), this.symbolToIndices.set(e, r) } }, ll = class { constructor(e, t) { var a; this.equation = t, this.hasEllipsis = !1, this.symbolToInfo = new Map, this.lhs = new Array, this.outputDims = []; let [r, i] = t.includes("->") ? t.split("->", 2) : [t, ""]; if (!r.match(RegExp(ol))) throw new Error("Invalid LHS term"); if (r.split(",").forEach((n, s) => { let u = e[s].dims.slice(); if (!n.match(RegExp(na))) throw new Error("Invalid LHS term"); let l = this.processTerm(n, !0, u, s); this.lhs.push(l) }), i === "") i += [...this.symbolToInfo.entries()].filter(([n, s]) => s.count === 1 || n === "...").map(([n]) => n).join(""); else if (!i.match(RegExp(nr))) throw new Error("Invalid RHS"); (a = i.match(RegExp(Lr, "g"))) == null || a.forEach(n => { if (n === "...") this.outputDims = this.outputDims.concat(this.ellipsisDims); else { let s = this.symbolToInfo.get(n); if (s === void 0) throw new Error("Invalid RHS symbol"); this.outputDims.push(s.dimValue) } }), this.rhs = this.processTerm(i, !1, this.outputDims) } addSymbol(e, t, r) { let i = this.symbolToInfo.get(e); if (i !== void 0) { if (i.dimValue !== t && i.count !== 1) throw new Error("Dimension mismatch"); i.count++, i.inputIndices.push(r) } else i = { count: 1, dimValue: t, inputIndices: [r] }; this.symbolToInfo.set(e, i) } processTerm(e, t, r, i = -1) { let a = r.length, n = !1, s = [], u = 0; if (!e.match(RegExp(na)) && !t && e !== "") throw new Error("Invalid LHS term"); let l = e.match(RegExp(Lr, "g")), p = new ul(i); return l == null || l.forEach((f, h) => { if (f === "...") { if (n) throw new Error("Only one ellipsis is allowed per input term"); n = !0; let g = a - l.length + 1; if (g < 0) throw new Error("Ellipsis out of bounds"); if (s = r.slice(u, u + g), this.hasEllipsis) { if (this.ellipsisDims.length !== s.length || this.ellipsisDims.toString() !== s.toString()) throw new Error("Ellipsis dimensions mismatch") } else if (t) this.hasEllipsis = !0, this.ellipsisDims = s; else throw new Error("Ellipsis must be specified in the LHS"); for (let y = 0; y < s.length; y++) { let _ = String.fromCharCode(48 + y); p.addSymbol(_, h + y), this.addSymbol(_, r[u++], i) } } else p.addSymbol(f, h + (this.hasEllipsis ? this.ellipsisDims.length - 1 : 0)), this.addSymbol(f, r[u++], i) }), p } }, sa = e => e + "_max", dl = (e, t, r, i) => {
        let a = e.map(p => p.length).map((p, f) => N(`input${f}`, t, p)), n = O.size(i), s = Q("output", t, i.length), u = [...r.symbolToInfo.keys()].filter(p => !r.rhs.symbolToIndices.has(p)), l = p => {
          let f = [], h = "var prod = 1.0;", g = "var sum = 0.0;", y = "sum += prod;", _ = [], b = [], S = [], v = [], w = r.symbolToInfo.size === r.rhs.symbolToIndices.size; r.symbolToInfo.forEach((T, E) => { var C; if (r.rhs.symbolToIndices.has(E)) { let A = (C = r.rhs.symbolToIndices.get(E)) == null ? void 0 : C[0]; A !== void 0 && r.lhs.forEach((x, M) => { if (T.inputIndices.includes(M)) { let D = x.symbolToIndices.get(E); if (D === void 0) throw new Error("Invalid symbol error"); D.forEach(H => { f.push(`${a[M].indicesSet(`input${M}Indices`, H, s.indicesGet("outputIndices", A))}`) }) } }) } else r.lhs.forEach((A, x) => { if (T.inputIndices.includes(x)) { let M = A.symbolToIndices.get(E); if (M === void 0) throw new Error("Invalid symbol error"); M.forEach(D => { _.push(`${a[x].indicesSet(`input${x}Indices`, D, `${E}`)}`) }), v.push(`prod *= ${a[x].getByIndices(`input${x}Indices`)};`) } }), b.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${sa(E)}; ${E}++) {`), S.push("}") }); let I = w ? [...f, `let sum = ${a.map((T, E) => T.getByIndices(`input${E}Indices`)).join(" * ")};`] : [...f, g, ...b, ..._, h, ...v, y, ...S]; return `
            ${p.registerUniforms(u.map(T => ({ name: `${sa(T)}`, type: "u32" }))).registerUniform("outputSize", "u32").declareVariables(...a, s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((T, E) => `var input${E}Indices: ${a[E].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${s.setByOffset("global_idx", "sum")};
          }`}; return { name: "Einsum", shaderCache: { hint: r.equation, inputDependencies: e.map(() => "rank") }, getRunData: () => { let p = u.filter(h => r.symbolToInfo.has(h)).map(h => { var g; return { type: 12, data: ((g = r.symbolToInfo.get(h)) == null ? void 0 : g.dimValue) || 0 } }); p.push({ type: 12, data: n }); let f = e.map((h, g) => [...J(h)]).reduce((h, g) => h.concat(g), p); return f.push(...J(i)), { outputs: [{ dims: i, dataType: t }], dispatchGroup: { x: Math.ceil(n / 64) }, programUniforms: f } }, getShaderSource: l }
      }, gh = (e, t) => { let r = new ll(e.inputs, t.equation), i = r.outputDims, a = e.inputs.map((n, s) => n.dims); e.compute(dl(a, e.inputs[0].dataType, r, i)) }, yh = e => { let t = e.equation.replace(/\s+/g, ""); return fe({ equation: t }) }
    }), pl, oa, cl, hl, _h, P0 = U(() => {
      te(), ie(), ae(), pl = e => { if (!e || e.length !== 2) throw new Error("Expand requires 2 input."); let t = e[0].dims, r = Array.from(e[1].getBigInt64Array(), Number), i = r.length < t.length ? 0 : r.length - t.length, a = t.length < r.length ? 0 : t.length - r.length; for (; i < r.length && a < t.length; ++i, ++a)if (r[i] !== t[a] && r[i] !== 1 && t[a] !== 1) throw new Error("Expand requires shape to be broadcastable to input") }, oa = (e, t) => { let r = e.length - t.length, i = []; for (let a = 0; a < r; ++a)i.push(e[a]); for (let a = 0; a < t.length; ++a)i.push(t[a] === 1 ? e[a + r] : t[a]); return i }, cl = (e, t) => e.length > t.length ? oa(e, t) : oa(t, e), hl = e => {
        let t = e[0].dims, r = Array.from(e[1].getBigInt64Array(), Number), i = cl(t, r), a = e[0].dataType, n = a === 9 || O.size(t) === 1, s = a === 9 || t.length > 0 && t[t.length - 1] % 4 === 0 ? 4 : 1, u = n || i.length > 0 && i[i.length - 1] % 4 === 0 ? 4 : 1, l = Math.ceil(O.size(i) / u), p = h => {
          let g = N("input", a, t.length, s), y = Q("output", a, i.length, u), _; if (a === 9) {
            let b = (S, v, w = "") => `
          let outputIndices${v} = ${y.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${g.broadcastedIndicesToOffset(`outputIndices${v}`, y)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${S}[${v}] = ${w}(${g.getByOffset(`index${v}`)}[component${v}]);
        `; _ = `
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${b("data", 0, "u32")}
        ${b("data", 1, "u32")}
        ${b("data", 2, "u32")}
        ${b("data", 3, "u32")}
        ${y.setByOffset("global_idx", "data")}
      }`} else _ = `
        let outputIndices = ${y.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices", y)};
        let data = ${y.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${y.setByOffset("global_idx", "data")}
      }`; return `
    ${h.registerUniform("vec_size", "u32").declareVariables(g, y)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`
        }, f = [{ type: 12, data: l }, ...J(t, i)]; return { name: "Expand", shaderCache: { hint: `${i.length};${s}${u}`, inputDependencies: ["rank"] }, getShaderSource: p, getRunData: () => ({ outputs: [{ dims: i, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(l / 64) }, programUniforms: f }) }
      }, _h = e => { pl(e.inputs), e.compute(hl(e.inputs), { inputs: [0] }) }
    }), fl, bh, q0 = U(() => {
      te(), ie(), ae(), un(), fl = e => {
        let t = e[0].dataType, r = O.size(e[0].dims), i = O.size(e[1].dims), a = i % 4 === 0, n = s => {
          let u = N("x", t, [1], 4), l = N("bias", t, [1], 4), p = Q("y", t, [1], 4), f = [{ name: "output_vec_size", type: "u32" }, { name: "bias_size", type: "u32" }], h = y => `
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${l.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`, g = a ? `
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};` : `${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`; return `${s.registerUniforms(f).declareVariables(u, l, p)}

    ${Ma(Ce(t))}

    ${s.mainStart(Ft)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx", Da("x_in"))}
    }`}; return { name: "FastGeluWithBias", shaderCache: { hint: `${a}`, inputDependencies: ["type", "type"] }, getShaderSource: n, getRunData: s => ({ outputs: [{ dims: s[0].dims, dataType: s[0].dataType }], programUniforms: [{ type: 12, data: Math.ceil(r / 4) }, { type: 12, data: i }], dispatchGroup: { x: Math.ceil(r / Ft / 4) } }) }
      }, bh = e => { e.inputs.length < 2 || O.size(e.inputs[1].dims) === 0 ? Pc(e) : e.compute(fl(e.inputs)) }
    }), ml, gl, wh, $h, L0 = U(() => {
      te(), ie(), xe(), ae(), ml = e => { if (!e || e.length !== 2) throw new Error("Gather requires 2 inputs.") }, gl = (e, t) => {
        let r = e[0].dims, i = e[1].dims, a = r.length, n = O.normalizeAxis(t.axis, a), s = r.slice(0); s.splice(n, 1, ...i); let u = r[n], l = e[0].dataType === 9 ? 4 : 1, p = Math.ceil(O.size(s) / l), f = [{ type: 12, data: p }, { type: 6, data: u }, { type: 12, data: n }, ...J(e[0].dims, e[1].dims, s)], h = g => {
          let y = N("data", e[0].dataType, e[0].dims.length, l), _ = N("inputIndices", e[1].dataType, e[1].dims.length), b = Q("output", e[0].dataType, s.length, l), S = w => {
            let I = i.length, T = `var indicesIndices${w}  = ${_.type.indices}(0);`; for (let E = 0; E < I; E++)T += `${I > 1 ? `indicesIndices${w}[${E}]` : `indicesIndices${w}`} = ${s.length > 1 ? `outputIndices${w}[uniforms.axis + ${E}]` : `outputIndices${w}`};`; T += `
          var idx${w} = ${_.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${y.type.indices};
        `; for (let E = 0, C = 0; E < a; E++)E === n ? (T += `${a > 1 ? `dataIndices${w}[${E}]` : `dataIndices${w}`} = u32(idx${w});`, C += I) : (T += `${a > 1 ? `dataIndices${w}[${E}]` : `dataIndices${w}`} = ${s.length > 1 ? `outputIndices${w}[${C}]` : `outputIndices${w}`};`, C++); return T
          }, v; if (e[0].dataType === 9) {
            let w = (I, T, E = "") => `
          let outputIndices${T} = ${b.offsetToIndices(`outputOffset + ${T}u`)};
          ${S(T)};
          let offset${T} = ${y.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${I}[${T}] = ${E}(${y.getByOffset(`index${T}`)}[component${T}]);
        `; v = `
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${w("value", 0, "u32")}
        ${w("value", 1, "u32")}
        ${w("value", 2, "u32")}
        ${w("value", 3, "u32")}
        ${b.setByOffset("global_idx", "value")}
      `} else v = `
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${y.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx", "value")};
      `; return `
      ${g.registerUniform("outputSize", "u32").registerUniform("axisDimLimit", "i32").registerUniform("axis", "u32").declareVariables(y, _, b)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`}; return { name: "Gather", shaderCache: { hint: t.cacheKey, inputDependencies: ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: s, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(p / 64) }, programUniforms: f }), getShaderSource: h }
      }, wh = e => fe({ axis: e.axis }), $h = (e, t) => { let r = e.inputs; ml(r), e.compute(gl(e.inputs, t)) }
    }), yl, vh, xh, W0 = U(() => {
      te(), ie(), ae(), yl = (e, t, r, i, a, n, s, u, l) => {
        let p = [{ type: 12, data: n }, { type: 12, data: i }, { type: 12, data: a }, { type: 12, data: r }, { type: 12, data: s }, { type: 12, data: u }, { type: 12, data: l }], f = [n]; p.push(...J(t.dims, f)); let h = g => {
          let y = N("indices_data", t.dataType, t.dims.length), _ = Q("input_slice_offsets_data", 12, 1, 1), b = [y, _], S = [{ name: "output_size", type: "u32" }, { name: "batch_dims", type: "u32" }, { name: "input_dims", type: "u32", length: a.length }, { name: "sizes_from_slice_dims_data", type: "u32", length: r.length }, { name: "num_slices_per_batch", type: "u32" }, { name: "input_batch_stride", type: "u32" }, { name: "num_slice_dims", type: "u32" }]; return `
  ${g.registerUniforms(S).declareVariables(...b)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length === 1 ? "index += i32(uniforms.input_dims);" : "index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length === 1 ? "relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);" : "relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}; return e.compute({ name: "computeSliceOffsets", shaderCache: { hint: `${a.length}_${r.length}`, inputDependencies: ["rank"] }, getRunData: () => ({ outputs: [{ dims: f, dataType: e.inputs[1].dataType }], dispatchGroup: { x: Math.ceil(n / 64) }, programUniforms: p }), getShaderSource: h }, { inputs: [t], outputs: [-1] })[0]
      }, vh = (e, t) => {
        let r = e.inputs, i = r[0].dims, a = r[0].dataType, n = r[1].dims, s = n[n.length - 1], u = O.sizeToDimension(n, n.length - 1), l = O.sizeFromDimension(i, t.batchDims + s), p = O.sizeToDimension(i, t.batchDims), f = O.sizeFromDimension(i, t.batchDims), h = u / p, g = new Array(s), y = l; for (let T = 0; T < s; ++T)g[s - 1 - T] = y, y *= i[t.batchDims + s - 1 - T]; let _ = yl(e, r[1], g, t.batchDims, i, u, h, f, s), b = t.batchDims + s; if (b > i.length) throw new Error("last dimension of indices must not be larger than rank of input tensor"); let S = n.slice(0, -1).concat(i.slice(b)), v = O.size(S), w = [{ type: 12, data: v }, { type: 12, data: l }, ...J(r[0].dims, _.dims, S)], I = T => {
          let E = N("data", r[0].dataType, r[0].dims.length), C = N("slice_offsets", 12, _.dims.length), A = Q("output", r[0].dataType, S.length); return `
          ${T.registerUniform("output_size", "u32").registerUniform("slice_size", "u32").declareVariables(E, C, A)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}; e.compute({ name: "GatherND", shaderCache: { hint: t.cacheKey, inputDependencies: ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: S, dataType: a }], dispatchGroup: { x: Math.ceil(v / 64) }, programUniforms: w }), getShaderSource: I }, { inputs: [r[0], _] })
      }, xh = e => ({ batchDims: e.batch_dims, cacheKey: "" })
    }), _l, bl, Sh, kh, V0 = U(() => {
      te(), ie(), xe(), ae(), _l = (e, t) => { if (e.length < 3 || e.length > 4) throw new Error("GatherBlockQuantized requires 3 or 4 inputs."); let r = O.normalizeAxis(t.quantizeAxis, e[0].dims.length), i = t.blockSize, a = e[0], n = e[2], s = e.length === 4 ? e[3] : void 0; if (n.dims.length !== a.dims.length || !a.dims.map((u, l) => l === r ? Math.ceil(u / i) === n.dims[l] : u === n.dims[l]).reduce((u, l) => u && l, !0)) throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis."); if (s) { if (s.dataType !== a.dataType) throw new Error("Zero point must have the same data type as the input tensor."); if (s.dims.length !== n.dims.length || !s.dims.map((u, l) => u === n.dims[l]).reduce((u, l) => u && l, !0)) throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.") } }, bl = (e, t) => {
        let r = e[0].dims, i = e[1].dims, a = r.length, n = O.normalizeAxis(t.gatherAxis, a), s = O.normalizeAxis(t.quantizeAxis, a), u = r.slice(0); u.splice(n, 1, ...i); let l = O.size(u), p = e[2].dataType, f = e[0].dataType === 22, h = [{ type: 12, data: l }, { type: 12, data: s }, { type: 12, data: n }, { type: 12, data: t.blockSize }, ...J(...e.map((y, _) => y.dims), u)], g = y => {
          let _ = N("data", e[0].dataType, e[0].dims.length), b = N("inputIndices", e[1].dataType, e[1].dims.length), S = N("scales", e[2].dataType, e[2].dims.length), v = e.length > 3 ? N("zeroPoint", e[3].dataType, e[3].dims.length) : void 0, w = Q("output", p, u.length), I = [_, b, S]; v && I.push(v); let T = [{ name: "output_size", type: "u32" }, { name: "quantize_axis", type: "u32" }, { name: "gather_axis", type: "u32" }, { name: "block_size", type: "u32" }]; return `
        ${y.registerUniforms(T).declareVariables(...I, w)}
        ${y.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${i.length > 1 ? `
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices", "uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices", "i", "index")};
          }`: `indices_indices = ${w.indicesGet("output_indices", "uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices", "i")};
          ${_.indicesSet("data_indices", "i", "index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[n]};
        }
        ${_.indicesSet("data_indices", "uniforms.gather_axis", "u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${w.indicesGet("output_indices", `i + ${i.length} - 1`)};
          ${_.indicesSet("data_indices", "i", "index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f ? "unpack4xI8" : "unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices", "uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices", "uniforms.quantize_axis", "quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${v ? `
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f ? "unpack4xI8" : "unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`: "var zero_point = 0"};
        let dequantized_data = ${Ce(p)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx", "dequantized_data")};
    }`}; return { name: "GatherBlockQuantized", shaderCache: { hint: `${t.cacheKey};${e.filter((y, _) => _ !== 1).map(y => y.dims.join("_")).join(";")}`, inputDependencies: Array.from({ length: e.length }, (y, _) => "rank") }, getRunData: () => ({ outputs: [{ dims: u, dataType: p }], dispatchGroup: { x: Math.ceil(l / 64) }, programUniforms: h }), getShaderSource: g }
      }, Sh = (e, t) => { let r = e.inputs; _l(r, t), e.compute(bl(e.inputs, t)) }, kh = e => fe({ blockSize: e.blockSize, gatherAxis: e.gatherAxis, quantizeAxis: e.quantizeAxis })
    }), wl, $l, Th, Ih, G0 = U(() => {
      te(), ie(), xe(), ae(), wl = e => {
        if (!e || e.length !== 2) throw new Error("GatherElements requires 2 inputs."); if (e[0].dims.length < 1) throw new Error("GatherElements requires that the data input be rank >= 1."); if (e[0].dims.length !== e[1].dims.length) throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)
      }, $l = (e, t) => {
        let r = e[0].dims, i = e[0].dataType, a = r.length, n = e[1].dims, s = e[1].dataType, u = O.normalizeAxis(t.axis, a), l = r[u], p = n.slice(0), f = O.size(p), h = N("input", i, a), g = N("indicesInput", s, n.length), y = Q("output", i, p.length), _ = [{ type: 12, data: f }, { type: 6, data: l }, { type: 12, data: u }]; return _.push(...J(r, n, p)), {
          name: "GatherElements", shaderCache: { inputDependencies: ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: p, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(f / 64) }, programUniforms: _ }), getShaderSource: b => `
      ${b.registerUniform("outputSize", "u32").registerUniform("axisDimLimit", "i32").registerUniform("axis", "u32").declareVariables(h, g, y)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices", "uniforms.axis", "u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx", "value")};
  }`}
      }, Th = e => fe({ axis: e.axis }), Ih = (e, t) => { let r = e.inputs; wl(r), e.compute($l(e.inputs, t)) }
    }), vl, xl, Eh, zh, H0 = U(() => {
      te(), ie(), ae(), vl = e => { if (!e) throw new Error("Input is missing"); if (e.length < 2 || e.length > 3) throw new Error("Invaid input number."); if (e.length === 3 && e[2].dims.length > 2) throw new Error("Invalid input shape of C"); if (e[0].dataType !== e[1].dataType || e.length === 3 && e[0].dataType !== e[2].dataType) throw new Error("Input types are mismatched") }, xl = (e, t) => {
        let r = e[0].dims.slice(), i = e[1].dims.slice(), [a, n, s] = Tp.getShapeOfGemmResult(r, t.transA, i, t.transB, e.length === 3 ? e[2].dims : void 0), u = [a, n]; if (!u) throw new Error("Can't use gemm on the given tensors"); let l = 16, p = Math.ceil(n / l), f = Math.ceil(a / l), h = !0, g = O.size(u), y = [{ type: 12, data: h ? p : g }, { type: 12, data: a }, { type: 12, data: n }, { type: 12, data: s }, { type: 1, data: t.alpha }, { type: 1, data: t.beta }], _ = ["type", "type"]; e.length === 3 && (y.push(...J(e[2].dims)), _.push("rank")), y.push(...J(u)); let b = v => {
          let w = ""; t.transA && t.transB ? w = "value += a[k * uniforms.M + m] * b[n * uniforms.K + k];" : t.transA && !t.transB ? w = "value += a[k * uniforms.M + m] * b[k * uniforms.N + n];" : !t.transA && t.transB ? w = "value += a[m * uniforms.K + k] * b[n * uniforms.K + k];" : !t.transA && !t.transB && (w = "value += a[m * uniforms.K + k] * b[k * uniforms.N + n];"); let I = t.alpha === 1 ? "" : "value *= uniforms.alpha;", T = N("a", e[0].dataType, e[0].dims), E = N("b", e[1].dataType, e[1].dims), C = T.type.value, A = null, x = [T, E]; e.length === 3 && (A = N("c", e[2].dataType, e[2].dims.length), x.push(A)); let M = Q("output", e[0].dataType, u.length); x.push(M); let D = [{ name: "output_size", type: "u32" }, { name: "M", type: "u32" }, { name: "N", type: "u32" }, { name: "K", type: "u32" }, { name: "alpha", type: "f32" }, { name: "beta", type: "f32" }]; return `
  ${v.registerUniforms(D).declareVariables(...x)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${I}
    ${A != null ? `let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)", M)}; value += ${C}(uniforms.beta) * ${A.getByOffset("cOffset")};` : ""}
    output[global_idx] = value;
  }`}, S = v => {
            let w = N("a", e[0].dataType, e[0].dims), I = N("b", e[1].dataType, e[1].dims), T = null, E = [w, I]; e.length === 3 && (T = N("c", e[2].dataType, e[2].dims.length), E.push(T)); let C = Q("output", e[0].dataType, u.length); E.push(C); let A = [{ name: "num_tile_n", type: "u32" }, { name: "M", type: "u32" }, { name: "N", type: "u32" }, { name: "K", type: "u32" }, { name: "alpha", type: "f32" }, { name: "beta", type: "f32" }], x = "", M = ""; t.transA && t.transB ? (M = `
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `, x = "value += tile_a[k][local_id.y] * tile_b[local_id.x][k];") : t.transA && !t.transB ? (M = `
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `, x = "value += tile_a[k][local_id.y] * tile_b[k][local_id.x];") : !t.transA && t.transB ? (M = `
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `, x = "value += tile_a[local_id.y][k] * tile_b[local_id.x][k];") : !t.transA && !t.transB && (M = `
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `, x = "value += tile_a[local_id.y][k] * tile_b[k][local_id.x];"); let D = t.alpha === 1 ? "" : "value *= uniforms.alpha;"; return `
  ${v.registerUniforms(A).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${l}>, ${l}>;
  ${v.mainStart([l, l, 1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${M}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${x}
      }
      workgroupBarrier();
    }

    ${D}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${T != null ? `let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)", C)}; value += ${C.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};` : ""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}; return h ? { name: "GemmShared", shaderCache: { hint: `${t.cacheKey}`, inputDependencies: _ }, getRunData: () => ({ outputs: [{ dims: u, dataType: e[0].dataType }], dispatchGroup: { x: p * f }, programUniforms: y }), getShaderSource: S } : { name: "Gemm", shaderCache: { hint: `${t.cacheKey}`, inputDependencies: _ }, getRunData: () => ({ outputs: [{ dims: u, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(g / 64) }, programUniforms: y }), getShaderSource: b }
      }, Eh = e => { let t = e.transA, r = e.transB, i = e.alpha, a = e.beta; return { transA: t, transB: r, alpha: i, beta: a, cacheKey: `${e.transA};${e.transB};${e.alpha === 1}` } }, zh = (e, t) => { vl(e.inputs), e.compute(xl(e.inputs, t)) }
    }), it, ot, St, kt, Sl, kl, Tl, Il, El, zl, Cl, Al, Ch, Ah, F0 = U(() => {
      te(), ie(), xe(), ae(), [it, ot, St, kt] = [0, 1, 2, 3], Sl = e => { if (e[0].dims.length !== 4) throw new Error("only 4-D tensor is supported."); if (e[0].dims.length !== e[1].dims.length) throw new Error("input dimensions must be equal to grid dimensions"); if (e[0].dims.length - 2 !== e[1].dims[e[1].dims.length - 1]) throw new Error(`last dimension of grid must be equal to ${e[0].dims.length - 2}`); if (e[0].dims[0] !== e[1].dims[0]) throw new Error("grid batch size must match input batch size") }, kl = `
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`, Tl = e => `
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`, Il = e => `
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners === 0 ? `
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `: `
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`, El = e => `
  ${e.paddingMode === "reflection" ? `
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`: ""}
`, zl = (e, t, r) => `
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${it}] = batch;
     indices[${ot}] = channel;` + (() => {
          switch (r.paddingMode) {
            case "zeros": return `
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${St}] = u32(r);
            indices[${kt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `; case "border": return `
          indices[${St}] = u32(clamp(r, 0, H - 1));
          indices[${kt}] = u32(clamp(c, 0, W - 1));
        `; case "reflection": return `
          indices[${St}] = gs_reflect(r, border[1], border[3]);
          indices[${kt}] = gs_reflect(c, border[0], border[2]);
        `; default: throw new Error(`padding mode ${r.paddingMode} is not supported`)
          }
        })() + `
    return ${e.getByIndices("indices")};
  }
`, Cl = (e, t, r) => (() => {
        switch (r.mode) {
          case "nearest": return `
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${it}], indices[${ot}], border);
        `; case "bilinear": return `
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${it}], indices[${ot}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${it}], indices[${ot}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${it}], indices[${ot}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${it}], indices[${ot}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `; case "bicubic": return `
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${it}], indices[${ot}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `; default: throw new Error(`mode ${r.mode} is not supported`)
        }
      })() + `${e.setByOffset("global_idx", "result")}`, Al = (e, t) => {
        let r = N("x", e[0].dataType, e[0].dims.length), i = [e[1].dims[0], e[1].dims[1], e[1].dims[2]], a = N("grid", e[1].dataType, i.length, 2), n = [e[0].dims[0], e[0].dims[1], e[1].dims[1], e[1].dims[2]]; t.format === "NHWC" && (n = [e[0].dims[0], e[1].dims[1], e[1].dims[2], e[0].dims[3]], [it, ot, St, kt] = [0, 3, 1, 2]); let s = Q("output", e[0].dataType, n.length), u = r.type.value, l = O.size(n), p = [{ type: 12, data: l }, ...J(e[0].dims, i, n)], f = h => `
  ${h.registerUniform("output_size", "u32").declareVariables(r, a, s)}
  ${kl}
  ${Tl(u)}
  ${Il(t)}
  ${El(t)}
  ${zl(r, u, t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${St}]);
      let W_in = i32(uniforms.x_shape[${kt}]);

      ${t.alignCorners === 0 ? `
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `: `
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${it}], indices[${St}], indices[${kt}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Cl(s, u, t)}
  }`; return { name: "GridSample", shaderCache: { hint: `${t.cacheKey}`, inputDependencies: ["type", "type"] }, getRunData: h => { let g = O.size(n); return { outputs: [{ dims: n, dataType: h[0].dataType }], dispatchGroup: { x: Math.ceil(g / 64) }, programUniforms: p } }, getShaderSource: f }
      }, Ch = (e, t) => { Sl(e.inputs), e.compute(Al(e.inputs, t)) }, Ah = e => fe({ alignCorners: e.align_corners, mode: e.mode, paddingMode: e.padding_mode, format: e.format })
    }), Ae, Ol, Oh, ua, Rl, hr, Rh, Bh = U(() => {
      te(), ie(), xe(), an(), on(), ae(), wt(), Ae = (e, t) => e.length > t && e[t].dims.length > 0 ? e[t] : void 0, Ol = (e, t) => { let r = e[0], i = Ae(e, 1), a = Ae(e, 2), n = Ae(e, 3), s = Ae(e, 4), u = Ae(e, 5), l = Ae(e, 6), p = Ae(e, 7); if (r.dims.length !== 3 && r.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions"); let f = r.dims[0], h = r.dims[1], g = r.dims.length === 3 ? r.dims[2] : t.numHeads * r.dims[4], y = h, _ = 0, b = 0, S = Math.floor(g / t.numHeads); if (l && p && O.size(l.dims) && O.size(p.dims)) { if (l.dims.length !== 4) throw new Error('Input "past_key" is expected to have 4 dimensions'); if (l.dims[0] !== f || l.dims[1] !== t.numHeads || l.dims[3] !== S) throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)'); if (p.dims[0] !== f || p.dims[1] !== t.numHeads || p.dims[3] !== S) throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)'); if (l.dims[2] !== p.dims[2]) throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)'); if (p.dims.length !== 4) throw new Error('Input "past_value" is expected to have 4 dimensions'); _ = l.dims[2], b = l.dims[2] } else if (l && O.size(l.dims) || p && O.size(p.dims)) throw new Error('Input "past_key" and "past_value" shall be both present or both absent'); let v; if (i && O.size(i.dims) > 0) { if (r.dims.length !== 3) throw new Error('Input "query" is expected to have 3 dimensions when key is given'); if (i.dims.length < 3 || i.dims.length > 5) throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions'); if (r.dims[0] !== i.dims[0]) throw new Error('Input "query" and "key" shall have same dim 0 (batch size)'); if (i.dims.length === 3) { if (i.dims[2] !== r.dims[2]) throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)'); v = 2, y = i.dims[1] } else if (i.dims.length === 5) { if (i.dims[2] !== t.numHeads || i.dims[3] !== 2 || i.dims[4] !== S) throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv'); if (a) throw new Error('Expect "value" be none when "key" has packed kv format.'); v = 5, y = i.dims[1] } else { if (i.dims[1] !== t.numHeads || i.dims[3] !== S) throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key'); v = 0, y = i.dims[2] } } else { if (r.dims.length !== 5) throw new Error('Input "query" is expected to have 5 dimensions when key is empty'); if (r.dims[2] !== t.numHeads || r.dims[3] !== 3) throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv'); v = 3 } if (n && O.size(n.dims) > 0) { if (n.dims.length !== 1) throw new Error('Input "bias" is expected to have 1 dimension'); if (i && i.dims.length === 5 && i.dims[3] === 2) throw new Error("bias is not allowed for packed kv.") } let w = _ + y, I = 0; if (s && O.size(s.dims) > 0) { I = 8; let A = s.dims; throw A.length === 1 ? A[0] === f ? I = 1 : A[0] === 3 * f + 2 && (I = 3) : A.length === 2 && A[0] === f && A[1] === w && (I = 5), I === 8 ? new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)') : new Error("Mask not supported") } let T = !1, E = g; if (a && O.size(a.dims) > 0) { if (a.dims.length !== 3 && a.dims.length !== 4) throw new Error('Input "value" is expected to have 3 or 4 dimensions'); if (r.dims[0] !== a.dims[0]) throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)'); if (a.dims.length === 3) { if (y !== a.dims[1]) throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)'); E = a.dims[2] } else { if (y !== a.dims[2]) throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)'); E = a.dims[1] * a.dims[3], T = !0 } } let C = !1; if (s && O.size(s.dims) > 0) throw new Error("Key padding mask is not supported"); if (u && O.size(u.dims) > 0) { if (u.dims.length !== 4) throw new Error('Input "attention_bias" is expected to have 4 dimensions'); if (u.dims[0] !== f || u.dims[1] !== t.numHeads || u.dims[2] !== h || u.dims[3] !== w) throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)') } return { batchSize: f, sequenceLength: h, pastSequenceLength: _, kvSequenceLength: y, totalSequenceLength: w, maxSequenceLength: b, inputHiddenSize: 0, hiddenSize: g, vHiddenSize: E, headSize: S, vHeadSize: Math.floor(E / t.numHeads), numHeads: t.numHeads, isUnidirectional: !1, pastPresentShareBuffer: !1, maskFilterValue: t.maskFilterValue, maskType: I, scale: t.scale, broadcastResPosBias: C, passPastInKv: T, qkvFormat: v } }, Oh = e => fe({ ...e }), ua = fe({ perm: [0, 2, 1, 3] }), Rl = (e, t, r, i, a, n, s) => {
        let u = [i, a, n], l = O.size(u), p = [{ type: 12, data: l }, { type: 12, data: s }, { type: 12, data: n }], f = h => {
          let g = Q("qkv_with_bias", t.dataType, u), y = N("qkv", t.dataType, u), _ = N("bias", r.dataType, u), b = [{ name: "output_size", type: "u32" }, { name: "bias_offset", type: "u32" }, { name: "hidden_size", type: "u32" }]; return `
  ${h.registerUniforms(b).declareVariables(y, _, g)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}; return e.compute({ name: "MultiHeadAttentionAddBias", shaderCache: { inputDependencies: ["type", "type"] }, getRunData: () => ({ outputs: [{ dims: u, dataType: t.dataType, gpuDataType: 0 }], dispatchGroup: { x: Math.ceil(l / 64) }, programUniforms: p }), getShaderSource: f }, { inputs: [t, r], outputs: [-1] })[0]
      }, hr = (e, t, r, i, a, n, s, u) => { let l = n; if (s && O.size(s.dims) > 0) { if (i === 1) throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV"); return l = Rl(e, n, s, t, i, r * a, u), l = l.reshape([t, i, r, a]), r === 1 || i === 1 ? l : e.compute(Le(l, ua.perm), { inputs: [l], outputs: [-1] })[0] } else return n.dims.length === 3 && (l = n.reshape([t, i, r, a])), r === 1 || i === 1 ? l : e.compute(Le(l, ua.perm), { inputs: [l], outputs: [-1] })[0] }, Rh = (e, t) => { let r = Ol(e.inputs, t), i = e.inputs[0], a = Ae(e.inputs, 1), n = Ae(e.inputs, 2), s = Ae(e.inputs, 3), u = Ae(e.inputs, 4), l = Ae(e.inputs, 5), p = Ae(e.inputs, 6), f = Ae(e.inputs, 7); if (i.dims.length === 5) throw new Error("Packed QKV is not implemented"); if ((a == null ? void 0 : a.dims.length) === 5) throw new Error("Packed KV is not implemented"); let h = a && n && a.dims.length === 4 && n.dims.length === 4, g = hr(e, r.batchSize, r.numHeads, r.sequenceLength, r.headSize, i, s, 0); if (h) return _r(e, g, a, n, u, void 0, p, f, l, r); if (!a || !n) throw new Error("key and value must be provided"); let y = hr(e, r.batchSize, r.numHeads, r.kvSequenceLength, r.headSize, a, s, r.hiddenSize), _ = hr(e, r.batchSize, r.numHeads, r.kvSequenceLength, r.vHeadSize, n, s, 2 * r.hiddenSize); _r(e, g, y, _, u, void 0, p, f, l, r) }
    }), Bl, Nl, Ml, Dl, Wa, Nh, Mh, Dh = U(() => {
      te(), ie(), xe(), ae(), Bl = e => { if (!e || e.length < 1) throw new Error("too few inputs") }, Nl = (e, t) => { let r = [], i = t.numOutputs; return e[1].dims[0] > 0 && (e[1].getBigInt64Array().forEach(a => r.push(Number(a))), i = r.length), fe({ numOutputs: i, axis: t.axis, splitSizes: r }) }, Ml = e => `
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Y("uniforms.size_in_split_axis", "i", e)}) {
        return i;
    }
    }
    return ${e}u;
}`, Dl = e => {
        let t = e.length, r = []; for (let i = 0; i < t; ++i) { let a = e[i].setByIndices("indices", "input[global_idx]"); t === 1 ? r.push(a) : i === 0 ? r.push(`if (output_number == ${i}u) { ${a} }`) : i === t - 1 ? r.push(`else { ${a} }`) : r.push(`else if (output_number == ${i}) { ${a} }`) } return `
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`}, Wa = (e, t) => {
        let r = e[0].dims, i = O.size(r), a = e[0].dataType, n = O.normalizeAxis(t.axis, r.length), s = new Array(t.numOutputs), u = N("input", a, r.length), l = new Array(t.numOutputs), p = [], f = [], h = 0, g = [{ type: 12, data: i }]; for (let _ = 0; _ < t.numOutputs; _++) { h += t.splitSizes[_], l[_] = h; let b = r.slice(); b[n] = t.splitSizes[_], f.push(b), s[_] = Q(`output${_}`, a, b.length), p.push({ dims: f[_], dataType: e[0].dataType }) } g.push({ type: 12, data: l }, ...J(r, ...f)); let y = _ => `
  ${_.registerUniform("input_size", "u32").registerUniform("size_in_split_axis", "u32", l.length).declareVariables(u, ...s)}
  ${Ml(l.length)}
  ${Dl(s)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices", n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Y("uniforms.size_in_split_axis", "output_number - 1u", l.length)};
      ${u.indicesSet("indices", n, "index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`; return { name: "Split", shaderCache: { hint: t.cacheKey, inputDependencies: ["rank"] }, getShaderSource: y, getRunData: () => ({ outputs: p, dispatchGroup: { x: Math.ceil(i / 64) }, programUniforms: g }) }
      }, Nh = (e, t) => { Bl(e.inputs); let r = e.inputs.length === 1 ? t : Nl(e.inputs, t); e.compute(Wa(e.inputs, r), { inputs: [0] }) }, Mh = e => { let t = e.axis, r = e.splitSizes, i = e.numOutputs < 0 ? r.length : e.numOutputs; if (i !== r.length) throw new Error("numOutputs and splitSizes length must be equal"); return fe({ axis: t, numOutputs: i, splitSizes: r }) }
    }), Ul, ii, Uh, Ph = U(() => {
      te(), ie(), xe(), ae(), Ul = (e, t) => { let [r, i, a, n] = e, { numHeads: s, rotaryEmbeddingDim: u } = t; if (r.dims.length !== 3 && r.dims.length !== 4) throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`); if (!O.areEqual(i.dims, []) && !O.areEqual(i.dims, [1]) && i.dims.length !== 2) throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`); if (a.dims.length !== 2) throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`); if (n.dims.length !== 2) throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`); if (!O.areEqual(a.dims, n.dims)) throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape"); if (u > 0 && s === 0) throw new Error("num_heads must be provided if rotary_embedding_dim is specified"); let l = r.dims[0], p = r.dims[r.dims.length - 2], f = a.dims[0], h = O.sizeFromDimension(r.dims, 1) / p, g = u === 0 ? a.dims[1] * 2 : h / s; if (u > g) throw new Error("rotary_embedding_dim must be less than or equal to head_size"); if (i.dims.length === 2) { if (l !== i.dims[0]) throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`); if (p !== i.dims[1]) throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`) } if (g / 2 !== a.dims[1] && u / 2 !== a.dims[1]) throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`); if (p > f) throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported") }, ii = (e, t) => {
        let { interleaved: r, numHeads: i, rotaryEmbeddingDim: a, scale: n } = t, s = e[0].dims[0], u = O.sizeFromDimension(e[0].dims, 1), l = e[0].dims[e[0].dims.length - 2], p = u / l, f = e[2].dims[1], h = a === 0 ? f * 2 : p / i, g = new Array(s, l, p / h, h - f), y = O.computeStrides(g), _ = [{ type: 1, data: n }, { type: 12, data: g }, { type: 12, data: y }, ...e[0].dims.length === 3 ? new Array({ type: 12, data: [u, p, h, 1] }) : [], ...e[0].dims.length === 4 ? new Array({ type: 12, data: [u, h, l * h, 1] }) : [], ...J(e[0].dims, e[1].dims, e[2].dims, e[3].dims, e[0].dims)], b = S => {
          let v = N("input", e[0].dataType, e[0].dims.length), w = N("position_ids", e[1].dataType, e[1].dims.length), I = N("cos_cache", e[2].dataType, e[2].dims.length), T = N("sin_cache", e[3].dataType, e[3].dims.length), E = Q("output", e[0].dataType, e[0].dims.length); return S.registerUniforms([{ name: "scale", type: "f32" }, { name: "global_shape", type: "u32", length: g.length }, { name: "global_strides", type: "u32", length: y.length }, { name: "input_output_strides", type: "u32", length: y.length }]), `
        ${S.declareVariables(v, w, I, T, E)}

        ${S.mainStart(Ft)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy", Q("", w.type.tensor, 2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${I.get("position_id", "bsnh[3]")} -
                ${v.getByOffset("j")} * ${T.get("position_id", "bsnh[3]")};
            ${E.setByOffset("i", "re")}
            let im = ${v.getByOffset("i")} * ${T.get("position_id", "bsnh[3]")} +
                ${v.getByOffset("j")} * ${I.get("position_id", "bsnh[3]")};
            ${E.setByOffset("j", "im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k", v.getByOffset("k"))}
          }
        }`}; return { name: "RotaryEmbedding", shaderCache: { hint: fe({ interleaved: r }).cacheKey, inputDependencies: ["rank", "rank", "rank", "rank"] }, getShaderSource: b, getRunData: () => ({ outputs: [{ dims: e[0].dims, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(O.size(g) / Ft) }, programUniforms: _ }) }
      }, Uh = (e, t) => { Ul(e.inputs, t), e.compute(ii(e.inputs, t)) }
    }), Pl, ql, la, Ll, qh, j0 = U(() => {
      xe(), te(), on(), Bh(), Dh(), wt(), Ph(), ae(), Pl = (e, t) => { if (t.doRotary && e.length <= 7) throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified"); let r = e[0], i = e[1], a = e[2], n = e[3], s = e[4]; if (t.doRotary !== 0 && e.length <= 7) throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero"); if (t.localWindowSize !== -1) throw new Error("Local attention is not supported"); if (t.softcap !== 0) throw new Error("Softcap is not supported"); if (t.rotaryInterleaved !== 0) throw new Error("Rotary interleaved is not supported"); if (t.smoothSoftmax) throw new Error("Smooth softmax is not supported"); if (r.dims.length !== 3 && r.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions"); let u = !1, l = r.dims[0], p = r.dims[1], f = r.dims.length === 3 ? u ? r.dims[2] / 3 : r.dims[2] : t.numHeads * r.dims[4], h = p, g = 0, y = !i || i.dims.length === 0, _ = Math.floor(y ? f / (t.numHeads + 2 * t.kvNumHeads) : f / t.numHeads); y && (f = _ * t.numHeads); let b = n && n.dims.length !== 0, S = s && s.dims.length !== 0; if (b && n.dims.length === 4 && n.dims[0] === l && n.dims[1] !== t.kvNumHeads && n.dims[2] === t.kvNumHeads && n.dims[3] === _) throw new Error("BSNH pastKey/pastValue is not supported"); if (b && S) { if (n.dims.length !== 4) throw new Error('Input "past_key" is expected to have 4 dimensions'); if (s.dims.length !== 4) throw new Error('Input "past_value" is expected to have 4 dimensions'); g = n.dims[2] } else if (b || S) throw new Error('Input "past_key" and "past_value" shall be both present or both absent'); let v = 1; if (i && i.dims.length > 0) { if (r.dims.length !== 3) throw new Error('Input "query" is expected to have 3 dimensions when key is given'); if (i.dims.length < 3 || i.dims.length > 5) throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions'); if (r.dims[0] !== i.dims[0]) throw new Error('Input "query" and "key" shall have same dim 0 (batch size)'); if (i.dims.length === 3) { if (r.dims[2] % i.dims[2] !== 0) throw new Error('Dimension 2 of "query" should be a multiple of "key"'); h = i.dims[1] } else if (i.dims.length === 5) { if (i.dims[2] !== t.numHeads || i.dims[3] !== 2 || i.dims[4] !== _) throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv'); if (a) throw new Error('Expect "value" be none when "key" has packed kv format.'); h = i.dims[1] } else { if (i.dims[1] !== t.numHeads || i.dims[3] !== _) throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key'); h = i.dims[2] } } else { if (r.dims.length !== 3 && r.dims.length !== 5) throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty'); if (r.dims.length === 5 && (r.dims[2] !== t.numHeads || r.dims[3] !== 3)) throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv'); v = 3 } let w = 0, I = !1, T = t.kvNumHeads ? _ * t.kvNumHeads : f; if (a && a.dims.length > 0) { if (a.dims.length !== 3 && a.dims.length !== 4) throw new Error('Input "value" is expected to have 3 or 4 dimensions'); if (r.dims[0] !== a.dims[0]) throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)'); if (a.dims.length === 3) { if (h !== a.dims[1]) throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)'); T = a.dims[2] } else { if (h !== a.dims[2]) throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)'); T = a.dims[1] * a.dims[3], I = !0 } } let E = e.length > 4 ? e[5] : void 0; if (E && E.dims.length !== 1 && E.dims[0] !== l) throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size'); return { batchSize: l, sequenceLength: p, pastSequenceLength: g, kvSequenceLength: h, totalSequenceLength: -1, maxSequenceLength: -1, inputHiddenSize: 0, hiddenSize: f, vHiddenSize: T, headSize: _, vHeadSize: Math.floor(T / t.kvNumHeads), numHeads: t.numHeads, kvNumHeads: t.kvNumHeads, nReps: t.numHeads / t.kvNumHeads, pastPresentShareBuffer: !1, maskType: w, scale: t.scale, broadcastResPosBias: !1, passPastInKv: I, qkvFormat: v } }, ql = fe({ perm: [0, 2, 1, 3] }), la = (e, t, r) => { let i = t, a = r.kvNumHeads; return t.dims.length === 3 && r.kvSequenceLength !== 0 && (i = t.reshape([r.batchSize, r.kvSequenceLength, a, r.headSize]), i = e.compute(Le(i, ql.perm), { inputs: [i], outputs: [-1] })[0]), i }, Ll = (e, t, r, i) => {
        let a = 7, n = ["type", "type"], s = [e * t], u = e * t, l = [{ type: 12, data: u }, { type: 12, data: t }, { type: 12, data: e }], p = f => {
          let h = N("seq_lens", r.dataType, r.dims), g = N("total_seq_lens", i.dataType, i.dims), y = Q("pos_ids", a, s), _ = [{ name: "output_size", type: "u32" }, { name: "sequence_length", type: "u32" }, { name: "batch_size", type: "u32" }]; return `
  ${f.registerUniforms(_).declareVariables(h, g, y)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${h.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx", "pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx", "pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${y.setByOffset("global_idx", "seqlen")}
    };
  }
  `}; return { name: "GeneratePositionIds", shaderCache: { hint: `${e};${t}`, inputDependencies: n }, getRunData: () => ({ outputs: [{ dims: s, dataType: a }], dispatchGroup: { x: Math.ceil(u / 64) }, programUniforms: l }), getShaderSource: p }
      }, qh = (e, t) => { var T; let r = Pl(e.inputs, t); if (e.inputs[0].dims.length === 5) throw new Error("Packed QKV is not implemented"); if (((T = e.inputs[1]) == null ? void 0 : T.dims.length) === 5) throw new Error("Packed KV is not implemented"); let i = e.inputs[0], a = e.inputs[1] && e.inputs[1].dims.length > 0 ? e.inputs[1] : void 0, n = e.inputs[2] && e.inputs[2].dims.length > 0 ? e.inputs[2] : void 0, s = e.inputs[3] && e.inputs[3].dims.length !== 0 ? e.inputs[3] : void 0, u = e.inputs[4] && e.inputs[4].dims.length !== 0 ? e.inputs[4] : void 0, l = e.inputs.length > 4 ? e.inputs[5] : void 0, p = e.inputs.length > 5 ? e.inputs[6] : void 0, f = r.kvNumHeads ? r.kvNumHeads : r.numHeads, h = fe({ axis: 2, numOutputs: 3, splitSizes: [r.numHeads * r.headSize, f * r.headSize, f * r.headSize] }), [g, y, _] = !a && !n ? e.compute(Wa([i], h), { inputs: [i], outputs: [-1, -1, -1] }) : [i, a, n], b, S; if (t.doRotary) { let E = e.compute(Ll(r.batchSize, r.sequenceLength, l, p), { inputs: [l, p], outputs: [-1] })[0], C = e.inputs[7], A = e.inputs[8], x = fe({ interleaved: t.rotaryInterleaved !== 0, numHeads: r.numHeads, rotaryEmbeddingDim: 0, scale: t.scale }), M = [g, E, C, A], D = [-1]; b = e.compute(ii(M, x), { inputs: M, outputs: D })[0], M.splice(0, 1, y); let H = fe({ interleaved: t.rotaryInterleaved !== 0, numHeads: r.kvNumHeads, rotaryEmbeddingDim: 0, scale: t.scale }); S = e.compute(ii(M, H), { inputs: M, outputs: D })[0] } let v = hr(e, r.batchSize, r.numHeads, r.sequenceLength, r.headSize, t.doRotary ? b : g, void 0, 0), w = la(e, t.doRotary ? S : y, r), I = la(e, _, r); _r(e, v, w, I, void 0, void 0, s, u, void 0, r, l, p) }
    }), da, Wl, Vl, Lh, K0 = U(() => {
      te(), ie(), wt(), ae(), da = (e, t, r, i, a, n, s, u) => {
        let l = ve(n), p = l === 1 ? "f32" : `vec${l}f`, f = l === 1 ? "vec2f" : `mat2x${l}f`, h = a * s, g = 64; h === 1 && (g = 256); let y = [a, s, n / l], _ = [a, s, 2], b = ["rank", "type", "type"], S = []; S.push(...J(y, _)); let v = w => {
          let I = N("x", t.dataType, 3, l), T = N("scale", r.dataType, r.dims), E = N("bias", i.dataType, i.dims), C = Q("output", 1, 3, 2), A = [I, T, E, C]; return `
  var<workgroup> workgroup_shared : array<${f}, ${g}>;
  const workgroup_size = ${g}u;
  ${w.declareVariables(...A)}
  ${w.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${I.get("batch", "channel", "h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${bt("workgroup_shared[0][0]", l)} / f32(hight * ${l});
      let squared_sum_final = ${bt("workgroup_shared[0][1]", l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}; return e.compute({ name: "InstanceNormComputeChannelScaleShift", shaderCache: { hint: `${l};${u};${g}`, inputDependencies: b }, getRunData: () => ({ outputs: [{ dims: _, dataType: 1 }], dispatchGroup: { x: h }, programUniforms: S }), getShaderSource: v }, { inputs: [t, r, i], outputs: [-1] })[0]
      }, Wl = (e, t, r) => {
        let i = t[0].dims, a = i, n = 2, s = i[0], u = i[1], l = O.sizeFromDimension(i, n), p = ve(l), f = O.size(a) / p, h = da(e, t[0], t[1], t[2], s, l, u, r.epsilon), g = [s, u, l / p], y = [s, u], _ = ["type", "none"], b = S => {
          let v = N("x", t[0].dataType, g.length, p), w = N("scale_shift", 1, y.length, 2), I = Q("output", t[0].dataType, g.length, p), T = [v, w, I]; return `
  ${S.registerUniform("output_size", "u32").declareVariables(...T)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx", "value")};
  }`}; e.compute({ name: "InstanceNormalization", shaderCache: { hint: `${p}`, inputDependencies: _ }, getRunData: () => ({ outputs: [{ dims: a, dataType: t[0].dataType }], dispatchGroup: { x: Math.ceil(f / 64) }, programUniforms: [{ type: 12, data: f }, ...J(g, y, g)] }), getShaderSource: b }, { inputs: [t[0], h] })
      }, Vl = (e, t, r) => {
        let i = t[0].dims, a = i, n = i[0], s = i[i.length - 1], u = O.sizeFromDimension(i, 1) / s, l = ve(s), p = O.size(a) / l, f = [{ type: 12, data: u }, { type: 12, data: Math.floor(s / l) }], h = ["type", "type"], g = !1, y = [0, i.length - 1]; for (let v = 0; v < i.length - 2; v++)g = g || i[v + 1] !== 1, y.push(v + 1); g = g && i[i.length - 1] !== 1; let _ = g ? e.compute(Le(e.inputs[0], y), { inputs: [e.inputs[0]], outputs: [-1] })[0] : e.inputs[0].reshape(Array.from({ length: i.length }, (v, w) => i[y[w]])), b = da(e, _, t[1], t[2], n, u, s, r.epsilon), S = v => {
          let w = Ie(t[0].dataType), I = l === 1 ? "vec2f" : `mat${l}x2f`, T = A => { let x = A === 0 ? "x" : "y", M = l === 1 ? "f32" : `vec${l}f`; switch (l) { case 1: return `${w}(${M}(scale.${x}))`; case 2: return `vec2<${w}>(${M}(scale[0].${x}, scale[1].${x}))`; case 4: return `vec4<${w}>(${M}(scale[0].${x}, scale[1].${x}, scale[2].${x}, scale[3].${x}))`; default: throw new Error(`Not supported compoents ${l}`) } }, E = N("input", t[0].dataType, t[0].dims, l), C = Q("output", t[0].dataType, a, l); return `
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`}; e.compute({ name: "InstanceNormalizationNHWC", shaderCache: { hint: `${l}`, inputDependencies: h }, getRunData: () => ({ outputs: [{ dims: a, dataType: t[0].dataType }], dispatchGroup: { x: Math.ceil(p / 64) }, programUniforms: f }), getShaderSource: S }, { inputs: [t[0], b] })
      }, Lh = (e, t) => { t.format === "NHWC" ? Vl(e, e.inputs, t) : Wl(e, e.inputs, t) }
    }), Gl, Hl, Wh, X0 = U(() => {
      te(), ie(), ae(), Gl = e => { if (!e || e.length < 2) throw new Error("layerNorm requires at least 2 inputs.") }, Hl = (e, t, r) => {
        let i = t.simplified, a = e[0].dims, n = e[1], s = !i && e[2], u = a, l = O.normalizeAxis(t.axis, a.length), p = O.sizeToDimension(a, l), f = O.sizeFromDimension(a, l), h = O.size(n.dims), g = s ? O.size(s.dims) : 0; if (h !== f || s && g !== f) throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${g}`); let y = []; for (let E = 0; E < a.length; ++E)E < l ? y.push(a[E]) : y.push(1); let _ = ve(f), b = ["type", "type"], S = [{ type: 12, data: p }, { type: 1, data: f }, { type: 12, data: Math.floor(f / _) }, { type: 1, data: t.epsilon }]; s && b.push("type"); let v = r > 1, w = r > 2, I = E => {
          let C = Ie(e[0].dataType), A = [N("x", e[0].dataType, e[0].dims, _), N("scale", n.dataType, n.dims, _)]; s && A.push(N("bias", s.dataType, s.dims, _)), A.push(Q("output", e[0].dataType, u, _)), v && A.push(Q("mean_data_output", 1, y)), w && A.push(Q("inv_std_output", 1, y)); let x = [{ name: "norm_count", type: "u32" }, { name: "norm_size", type: "f32" }, { name: "norm_size_vectorized", type: "u32" }, { name: "epsilon", type: "f32" }]; return `
  ${E.registerUniforms(x).declareVariables(...A)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Ra("f32", _)};
    var mean_square_vector = ${Ra("f32", _)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Gt(C, _, "x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${bt("mean_vector", _)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${bt("mean_square_vector", _)} / uniforms.norm_size ${i ? "" : "- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Gt(C, _, "x[j + offset]")};
      let f32scale = ${Gt(C, _, "scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${i ? "" : "- mean"}) * inv_std_dev * f32scale
        ${s ? `+ ${Gt(C, _, "bias[j]")}` : ""}
      );
    }

    ${v ? "mean_data_output[global_idx] = mean" : ""};
    ${w ? "inv_std_output[global_idx] = inv_std_dev" : ""};
  }`}, T = [{ dims: u, dataType: e[0].dataType }]; return v && T.push({ dims: y, dataType: 1 }), w && T.push({ dims: y, dataType: 1 }), { name: "LayerNormalization", shaderCache: { hint: `${_};${r};${i}`, inputDependencies: b }, getRunData: () => ({ outputs: T, dispatchGroup: { x: Math.ceil(p / 64) }, programUniforms: S }), getShaderSource: I }
      }, Wh = (e, t) => { Gl(e.inputs), e.compute(Hl(e.inputs, t, e.outputCount)) }
    }), Fl, Vh, Z0 = U(() => { ie(), cn(), hn(), Fl = e => { if (!e || e.length !== 2) throw new Error("MatMul requires 2 inputs."); if (e[0].dims[e[0].dims.length - 1] !== e[1].dims[e[1].dims.length - 2]) throw new Error("shared dimension does not match.") }, Vh = e => { Fl(e.inputs); let t = Ht.calcShape(e.inputs[0].dims, e.inputs[1].dims, !0); if (!t) throw new Error("Can't use matmul on the given tensors"); let r = t[t.length - 1], i = e.inputs[0].dims[e.inputs[0].dims.length - 1]; if (r < 8 && i < 8) e.compute(pn(e.inputs, { activation: "" }, t)); else { let a = t[t.length - 2], n = O.size(e.inputs[0].dims.slice(0, -2)), s = O.size(e.inputs[1].dims.slice(0, -2)); if (n !== 1 && a === 1 && s === 1) { let u = e.inputs[0].reshape([1, n, i]), l = e.inputs[1].reshape([1, i, r]), p = [1, n, r], f = [u, l]; e.compute(ri(f, { activation: "" }, t, p), { inputs: f }) } else e.compute(ri(e.inputs, { activation: "" }, t)) } } }), jl, Kl, Xl, Gh, Hh, Q0 = U(() => {
      te(), ie(), xe(), ae(), jl = (e, t) => { if (e.length < 3 || e.length > 4) throw new Error("MatMulNBits requires 3 or 4 inputs"); let r = e[0], i = r.dims.length; if (r.dims[i - 1] !== t.k) throw new Error("The last dim of input shape does not match the k value"); let a = Math.floor((t.k + t.blockSize - 1) / t.blockSize), n = t.blockSize / 8 * t.bits, s = e[1]; if (!O.areEqual(s.dims, [t.n, a, n])) throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize"); let u = e[2].dims; if (O.size(u) !== t.n * a) throw new Error("scales input size error."); if (e.length === 4) { let l = e[3].dims, p = t.n * (t.bits === 8 ? a : Math.floor((a * t.bits + 7) / 8)); if (O.size(l) !== p) throw new Error("zeroPoints input size error.") } }, Kl = (e, t) => {
        let r = e[0].dims, i = r.length, a = r[i - 2], n = t.k, s = t.n, u = r.slice(0, i - 2), l = O.size(u), p = e[1].dims[2] / 4, f = e[0].dataType, h = ve(t.k), g = ve(p), y = ve(s), _ = u.concat([a, s]), b = a > 1 && s / y % 2 === 0 ? 2 : 1, S = O.size(_) / y / b, v = 64, w = [], I = [l, a, n / h], T = O.convertShape(e[1].dims).slice(); T.splice(-1, 1, p / g), w.push(...J(I)), w.push(...J(T)), w.push(...J(e[2].dims)), e.length === 4 && w.push(...J(O.convertShape(e[3].dims))); let E = [l, a, s / y]; w.push(...J(E)); let C = A => {
          let x = I.length, M = N("a", e[0].dataType, x, h), D = N("b", 12, T.length, g), H = N("scales", e[2].dataType, e[2].dims.length), F = [M, D, H], j = e.length === 4 ? N("zero_points", 12, e[3].dims.length) : void 0; j && F.push(j); let R = E.length, K = Q("output", e[0].dataType, R, y), X = Ie(e[0].dataType), ee = (() => { switch (h) { case 1: return `array<${X}, 8>`; case 2: return `mat4x2<${X}>`; case 4: return `mat2x4<${X}>`; default: throw new Error(`${h}-component is not supported.`) } })(), he = Math.floor(32 / t.bits), W = Math.floor(he / 8), ue = () => {
            let Z = ""; for (let q = 0; q < W; q++) {
              let me = q * t.bits * 4, We = me + t.bits; Z += `
          // reuse a data (pass ${q})
            var input_offset${q > 0 ? q : ""} = ${q === 0 ? M.indicesToOffset(`${M.type.indices}(batch, row, word_offset)`) : "input_offset"};
            var a_data${q > 0 ? q : ""}: ${ee};
            for (var j${q > 0 ? q : ""}: u32 = 0; j${q > 0 ? q : ""} < ${8 / h}; j${q > 0 ? q : ""}++) {
              a_data${q > 0 ? q : ""}[j${q > 0 ? q : ""}] = ${M.getByOffset(`input_offset${q > 0 ? q : ""}`)};
              input_offset${q > 0 ? q : ""}++;
            }
          `; for (let Se = 0; Se < y * b; Se++)Z += `
            b_value = ${g === 1 ? `b${Se}_data` : `b${Se}_data[i]`};
            ${t.bits === 2 ? `{
              let half_word = b_value >> ${q * 16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`: `b_value_lower = unpack4xU8((b_value >> ${me}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${We}u) & b_mask);`}
            b_quantized_values = ${ee}(${Array.from({ length: 4 }, (Oe, Re) => `${X}(b_value_lower[${Re}]), ${X}(b_value_upper[${Re}])`).join(", ")});
            b_dequantized_values = ${h === 1 ? `${ee}(${Array.from({ length: 8 }, (Oe, Re) => `(b_quantized_values[${Re}] - ${j ? `zero_point${Se}` : "zero_point"}) * scale${Se}`).join(", ")});` : `(b_quantized_values - ${ee}(${Array(8).fill(`${j ? `zero_point${Se}` : "zero_point"}`).join(",")})) * scale${Se};`};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(Se / y)}]${y > 1 ? `[${Se % y}]` : ""} += ${Array.from({ length: 8 / h }, (Oe, Re) => `${h === 1 ? `a_data${q > 0 ? q : ""}[${Re}] * b_dequantized_values[${Re}]` : `dot(a_data${q > 0 ? q : ""}[${Re}], b_dequantized_values[${Re}])`}`).join(" + ")};
          `} return Z
          }, P = () => {
            let Z = `
            var col_index = col * ${y};
            ${j ? `
            let zero_point_values_per_byte: u32 = ${Math.floor(8 / t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`: `
            // The default zero point is ${Math.pow(2, t.bits - 1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${X}(${Math.pow(2, t.bits - 1).toFixed(1)});`}
            `; for (let q = 0; q < y * b; q++)Z += `
            let scale${q} = ${H.getByOffset("col_index * nBlocksPerCol + block")};
            ${j ? `
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${q} = ${X}((zero_point_word) & ${t.bits === 2 ? "0x3u" : "0xFu"});` : ""}
            col_index += 1;`; return Z
          }, V = () => {
            let Z = `col_index = col * ${y};`; for (let q = 0; q < y * b; q++)Z += `
            let b${q}_data = ${D.getByIndices(`${D.type.indices}(col_index, block, word)`)};
            col_index += 1;`; return Z += `
            var b_value: u32;
            let b_mask: u32 = ${t.bits === 2 ? "0x03030303u" : "0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ee};
            var b_dequantized_values: ${ee};`, Z
          }; return `
        var<workgroup> workgroup_shared: array<${K.type.value}, ${b * v}>;
        ${A.declareVariables(...F, K)}
        ${A.mainStart([v, 1, 1])}
          let output_indices = ${K.offsetToIndices(`(global_idx / ${v}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize / h};
            ${P()}
            for (var word: u32 = 0; word < ${p}; word += ${g}) {
              ${V()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${ue()}
                word_offset += ${he / h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${K.type.value} = ${K.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${K.setByIndices(`${K.type.indices}(batch, row, col + local_id.x)`, "output_value")};
          }
        }`}; return { name: "MatMulNBits", shaderCache: { hint: `${t.blockSize};${t.bits};${h};${g};${y};${b};${v}`, inputDependencies: Array(e.length).fill("rank") }, getRunData: () => ({ outputs: [{ dims: _, dataType: f }], dispatchGroup: { x: S }, programUniforms: w }), getShaderSource: C }
      }, Xl = (e, t) => {
        let r = e[0].dims, i = r.length, a = r[i - 2], n = t.k, s = t.n, u = r.slice(0, i - 2), l = O.size(u), p = e[1].dims[2] / 4, f = e[0].dataType, h = ve(t.k), g = ve(p), y = u.concat([a, s]), _ = 128, b = s % 8 === 0 ? 8 : s % 4 === 0 ? 4 : 1, S = _ / b, v = Math.floor(32 / t.bits), w = S * g * v, I = w / h, T = w / t.blockSize, E = O.size(y) / b, C = [], A = [l, a, n / h], x = O.convertShape(e[1].dims).slice(); x.splice(-1, 1, p / g), C.push(...J(A)), C.push(...J(x)), C.push(...J(e[2].dims)), e.length === 4 && C.push(...J(O.convertShape(e[3].dims))); let M = [l, a, s]; C.push(...J(M)); let D = H => {
          let F = A.length, j = N("a", e[0].dataType, F, h), R = N("b", 12, x.length, g), K = N("scales", e[2].dataType, e[2].dims.length), X = [j, R, K], ee = e.length === 4 ? N("zero_points", 12, e[3].dims.length) : void 0; ee && X.push(ee); let he = M.length, W = Q("output", e[0].dataType, he), ue = Ie(e[0].dataType), P = () => {
            switch (h) {
              case 1: return `
          let a_data0 = vec4<${ue}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ue}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`; case 2: return `
          let a_data0 = vec4<${ue}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ue}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`; case 4: return `
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`; default: throw new Error(`${h}-component is not supported.`)
            }
          }; return `
        var<workgroup> sub_a: array<${j.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${W.type.value}, ${S}>, ${b}>;
        ${H.declareVariables(...X, W)}
        ${H.mainStart([S, b, 1])}
          let output_indices = ${W.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${j.getByIndices(`${j.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${j.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${ee ? `
            let zero_point_values_per_byte: u32 = ${Math.floor(8 / t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ue}((zero_point_word) & ${t.bits === 2 ? "0x3u" : "0xFu"});` : `
            // The default zero point is ${Math.pow(2, t.bits - 1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${ue}(${Math.pow(2, t.bits - 1).toFixed(1)});`}
            let scale = ${K.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${R.getByIndices(`${R.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize / h};
            for (var i: u32 = 0; i < ${g}; i++) {
              let b_value = ${g === 1 ? "b_data" : "b_data[i]"};
              ${(() => {
              let V = Math.floor(v / 8), Z = ""; for (let q = 0; q < V; q++) {
                let me = q * t.bits * 4, We = me + t.bits; Z += `
              ${P()}
              {${t.bits === 2 ? `
                let half_word = b_value >> ${q * 16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`: `
                let b_value_lower = unpack4xU8((b_value >> ${me}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${We}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${ue}>(${Array.from({ length: 4 }, (Se, Oe) => `${ue}(b_value_lower[${Oe}]), ${ue}(b_value_upper[${Oe}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${ue}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({ length: 2 }, (Se, Oe) => `${`dot(a_data${Oe}, b_dequantized_values[${Oe}])`}`).join(" + ")};
              }
              word_offset += ${8 / h};`
              } return Z
            })()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${W.type.value} = ${W.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${W.setByIndices(`${W.type.indices}(batch, row, col + local_idx)`, "output_value")}
            }
          }
        }`}; return { name: "BlockwiseMatMulNBits32", shaderCache: { hint: `${t.blockSize};${h};${g};${S};${b}`, inputDependencies: Array(e.length).fill("rank") }, getRunData: () => ({ outputs: [{ dims: y, dataType: f }], dispatchGroup: { x: E }, programUniforms: C }), getShaderSource: D }
      }, Gh = (e, t) => { jl(e.inputs, t), t.blockSize === 32 && e.adapterInfo.isVendor("intel") && e.adapterInfo.isArchitecture("gen-12lp") ? e.compute(Xl(e.inputs, t)) : e.compute(Kl(e.inputs, t)) }, Hh = e => fe(e)
    }), Zl, Ql, Yl, Jl, ed, td, rd, id, Fh, Y0 = U(() => {
      te(), ie(), ae(), Zl = e => { if (!e || e.length < 1) throw new Error("Too few inputs"); if (e[0].dataType !== 1 && e[0].dataType !== 10) throw new Error("Input type must be float or float16."); if (e.length >= 2) { let t = e[0].dims.length * 2 === e[1].dims[0]; if (e.length === 4 && (t = e[3].dims[0] * 2 === e[1].dims[0]), !t) throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].") } }, Ql = (e, t, r) => {
        let i = ""; for (let a = t - 1; a >= 0; --a)i += `
            k = i32(${e.indicesGet("indices", a)}) - ${Y("uniforms.pads", a, r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Y("uniforms.x_shape", a, t)})) {
              break;
            }
            offset += k * i32(${Y("uniforms.x_strides", a, t)});
        `; return `
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `}, Yl = (e, t, r) => {
        let i = ""; for (let a = t - 1; a >= 0; --a)i += `
                k = i32(${e.indicesGet("indices", a)}) - ${Y("uniforms.pads", a, r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Y("uniforms.x_shape", a, t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Y("uniforms.x_shape", a, t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Y("uniforms.x_strides", a, t)});
            `; return `
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `}, Jl = (e, t, r) => {
        let i = ""; for (let a = t - 1; a >= 0; --a)i += `
                k = i32(${e.indicesGet("indices", a)}) - ${Y("uniforms.pads", a, r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Y("uniforms.x_shape", a, t)})) {
                  k = i32(${Y("uniforms.x_shape", a, t)}) - 1;
                }
                offset += k * i32(${Y("uniforms.x_strides", a, t)});
            `; return `
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `}, ed = (e, t, r) => {
        let i = ""; for (let a = t - 1; a >= 0; --a)i += `
                k = i32(${e.indicesGet("indices", a)}) - ${Y("uniforms.pads", a, r)};
                if (k < 0)  {
                  k += i32(${Y("uniforms.x_shape", a, t)}]);
                }
                if (k >= i32(${Y("uniforms.x_shape", a, t)})) {
                  k -= i32(${Y("uniforms.x_shape", a, t)});
                }
                offset += k * i32(${Y("uniforms.x_strides", a, t)});
            `; return `
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `}, td = (e, t, r) => { switch (r.mode) { case 0: return Ql(e, t, r.pads.length); case 1: return Yl(e, t, r.pads.length); case 2: return Jl(e, t, r.pads.length); case 3: return ed(e, t, r.pads.length); default: throw new Error("Invalid mode") } }, rd = (e, t) => {
        let r = O.padShape(e[0].dims.slice(), t.pads), i = e[0].dims, a = O.size(r), n = [{ type: 12, data: a }, { type: 6, data: t.pads }], s = e.length >= 3 && e[2].data; t.mode === 0 && n.push({ type: s ? e[2].dataType : 1, data: t.value }), n.push(...J(e[0].dims, r)); let u = ["rank"], l = p => {
          let f = Q("output", e[0].dataType, r.length), h = N("x", e[0].dataType, i.length), g = h.type.value, y = td(f, i.length, t), _ = [{ name: "output_size", type: "u32" }, { name: "pads", type: "i32", length: t.pads.length }]; return t.mode === 0 && _.push({ name: "constant_value", type: s ? g : "f32" }), `
            ${p.registerUniforms(_).declareVariables(h, f)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${y}
            output[global_idx] = value;
        }`}; return { name: "Pad", shaderCache: { hint: `${t.mode}${s}`, inputDependencies: u }, getRunData: () => ({ outputs: [{ dims: r, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(O.size(r) / 64) }, programUniforms: n }), getShaderSource: l }
      }, id = (e, t) => { if (e.length > 1) { let r = e[1].getBigInt64Array(), i = e.length >= 3 && e[2].data ? e[2].dataType === 10 ? e[2].getUint16Array()[0] : e[2].getFloat32Array()[0] : 0, a = e[0].dims.length, n = new Int32Array(2 * a).fill(0); if (e.length >= 4) { let u = e[3].getBigInt64Array(); for (let l = 0; l < u.length; l++)n[Number(u[l])] = Number(r[l]), n[Number(u[l]) + a] = Number(r[l + u.length]) } else r.forEach((u, l) => n[Number(l)] = Number(u)); let s = []; return n.forEach(u => s.push(u)), { mode: t.mode, value: i, pads: s } } else return t }, Fh = (e, t) => { Zl(e.inputs); let r = id(e.inputs, t); e.compute(rd(e.inputs, r), { inputs: [0] }) }
    }), sr, pa, ca, ha, fa, ad, nd, ma, ga, jh, Kh, ya, Xh, Zh, _a, Qh, Yh, Jh, ef, J0 = U(() => {
      Ge(), te(), ie(), ae(), sr = e => { if ($e.webgpu.validateInputContent && (!e || e.length !== 1)) throw new Error("Pool ops requires 1 input.") }, pa = (e, t, r) => { let i = t.format === "NHWC", a = e.dims.slice(); i && a.splice(1, 0, a.pop()); let n = Object.hasOwnProperty.call(t, "dilations"), s = t.kernelShape.slice(), u = t.strides.slice(), l = n ? t.dilations.slice() : [], p = t.pads.slice(); ei.adjustPoolAttributes(r, a, s, u, l, p); let f = ei.computePoolOutputShape(r, a, u, l, s, p, t.autoPad), h = Object.assign({}, t); n ? Object.assign(h, { kernelShape: s, strides: u, pads: p, dilations: l, cacheKey: t.cacheKey }) : Object.assign(h, { kernelShape: s, strides: u, pads: p, cacheKey: t.cacheKey }); let g = f.slice(); return g.push(g.splice(1, 1)[0]), [h, i ? g : f] }, ca = (e, t) => { let r = t.format === "NHWC", i = O.size(e), a = O.size(t.kernelShape), n = [{ type: 12, data: i }, { type: 12, data: a }], s = [{ name: "outputSize", type: "u32" }, { name: "kernelSize", type: "u32" }]; if (t.kernelShape.length <= 2) { let u = t.kernelShape[t.kernelShape.length - 1], l = t.strides[t.strides.length - 1], p = t.pads[t.pads.length / 2 - 1], f = t.pads[t.pads.length - 1], h = !!(p + f); n.push({ type: 12, data: u }, { type: 12, data: l }, { type: 12, data: p }, { type: 12, data: f }), s.push({ name: "kw", type: "u32" }, { name: "sw", type: "u32" }, { name: "pwStart", type: "u32" }, { name: "pwEnd", type: "u32" }); let g = !1; if (t.kernelShape.length === 2) { let y = t.kernelShape[t.kernelShape.length - 2], _ = t.strides[t.strides.length - 2], b = t.pads[t.pads.length / 2 - 2], S = t.pads[t.pads.length - 2]; g = !!(b + S), n.push({ type: 12, data: y }, { type: 12, data: _ }, { type: 12, data: b }, { type: 12, data: S }), s.push({ name: "kh", type: "u32" }, { name: "sh", type: "u32" }, { name: "phStart", type: "u32" }, { name: "phEnd", type: "u32" }) } return [n, s, !0, h, g] } else { if (r) throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format."); let u = O.computeStrides(t.kernelShape); n.push({ type: 12, data: u }, { type: 12, data: t.pads }, { type: 12, data: t.strides }), s.push({ name: "kernelStrides", type: "u32", length: u.length }, { name: "pads", type: "u32", length: t.pads.length }, { name: "strides", type: "u32", length: t.strides.length }); let l = t.pads.reduce((p, f) => p + f); return [n, s, !!l, !1, !1] } }, ha = (e, t, r, i, a, n, s, u, l, p, f, h) => {
        let g = a.format === "NHWC", y = t.type.value, _ = Q("output", t.type.tensor, i); if (a.kernelShape.length <= 2) {
          let b = "", S = "", v = "", w = r - (g ? 2 : 1); if (f ? b = `
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`: b = `
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`, a.kernelShape.length === 2) {
            let I = r - (g ? 3 : 2); h ? S = `
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `: S = `
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                `, v = `
              }
            `} return `
            ${e.registerUniforms(l).declareVariables(t, _)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${y}(${u});
              var pad = 0;
              ${S}
              ${b}
              ${v}
              ${s}

              output[global_idx] = value;
            }`} else {
          if (g) throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format."); let b = a.kernelShape.length, S = a.pads.length, v = ""; return p ? v = `
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`: v = `
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `, `
            ${e.registerUniforms(l).declareVariables(t, _)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${y}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b - 1}u; j++) {
                  offsets[j] = offset / ${Y("uniforms.kernelStrides", "j", b)};
                  offset -= offsets[j] * ${Y("uniforms.kernelStrides", "j", b)};
                }
                offsets[${b - 1}] = offset;

                isPad = false;
                for (var j = ${r - b}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Y("uniforms.strides", `j - ${r - b}u`, b)}
                    + offsets[j - ${r - b}u] - ${Y("uniforms.pads", "j - 2u", S)};
                  ${v}
              }
              ${s}

              output[global_idx] = value;
            }`}
      }, fa = e => `${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`, ad = e => `${fa(e)};${e.countIncludePad}`, nd = e => `${fa(e)};${e.storageOrder};${e.dilations}`, ma = e => ({ format: e.format, autoPad: ["NOTSET", "VALID", "SAME_UPPER", "SAME_LOWER"][e.auto_pad], ceilMode: e.ceil_mode, kernelShape: e.kernel_shape, strides: e.strides, pads: e.pads }), ga = (e, t, r, i) => { let [a, n] = pa(t, i, r), s = N("x", t.dataType, t.dims.length), u = s.type.value, l = "value += x_val;", p = ""; a.countIncludePad ? p += `value /= ${u}(uniforms.kernelSize);` : p += `value /= ${u}(i32(uniforms.kernelSize) - pad);`; let [f, h, g, y, _] = ca(n, a); f.push(...J(t.dims, n)); let b = ["rank"]; return { name: e, shaderCache: { hint: `${i.cacheKey};${g};${y};${_}`, inputDependencies: b }, getRunData: () => ({ outputs: [{ dims: n, dataType: t.dataType }], dispatchGroup: { x: Math.ceil(O.size(n) / 64) }, programUniforms: f }), getShaderSource: S => ha(S, s, t.dims.length, n.length, a, l, p, 0, h, g, y, _) } }, jh = e => { let t = e.count_include_pad !== 0, r = ma(e); if (r.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for AveragePool"); let i = { countIncludePad: t, ...r, cacheKey: "" }; return { ...i, cacheKey: ad(i) } }, Kh = (e, t) => { sr(e.inputs), e.compute(ga("AveragePool", e.inputs[0], !1, t)) }, ya = { autoPad: "", ceilMode: 0, countIncludePad: !1, kernelShape: [], strides: [], pads: [], storageOrder: 0, dilations: [] }, Xh = e => { let t = e.format; return { format: t, ...ya, cacheKey: t } }, Zh = (e, t) => { sr(e.inputs), e.compute(ga("GlobalAveragePool", e.inputs[0], !0, t)) }, _a = (e, t, r, i) => {
        let [a, n] = pa(t, i, r), s = `
      value = max(x_val, value);
    `, u = "", l = N("x", t.dataType, t.dims.length), p = ["rank"], [f, h, g, y, _] = ca(n, a); return f.push(...J(t.dims, n)), { name: e, shaderCache: { hint: `${i.cacheKey};${g};${y};${_}`, inputDependencies: p }, getRunData: () => ({ outputs: [{ dims: n, dataType: t.dataType }], dispatchGroup: { x: Math.ceil(O.size(n) / 64) }, programUniforms: f }), getShaderSource: b => ha(b, l, t.dims.length, n.length, a, s, u, t.dataType === 10 ? -65504 : -1e5, h, g, y, _) }
      }, Qh = (e, t) => { sr(e.inputs), e.compute(_a("MaxPool", e.inputs[0], !1, t)) }, Yh = e => { let t = e.storage_order, r = e.dilations, i = ma(e); if (t !== 0) throw new Error("column major storage order is not yet supported for MaxPool"); if (i.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for MaxPool"); let a = { storageOrder: t, dilations: r, ...i, cacheKey: "" }; return { ...a, cacheKey: nd(a) } }, Jh = e => { let t = e.format; return { format: t, ...ya, cacheKey: t } }, ef = (e, t) => { sr(e.inputs), e.compute(_a("GlobalMaxPool", e.inputs[0], !0, t)) }
    }), sd, od, tf, rf, ey = U(() => {
      te(), ie(), xe(), ae(), sd = (e, t) => { if (e.length < 2 || e.length > 3) throw new Error("DequantizeLinear requires 2 or 3 inputs."); if (e.length === 3 && e[1].dims === e[2].dims) throw new Error("x-scale and x-zero-point must have the same shape."); if (e.length === 3 && e[0].dataType !== e[2].dataType) throw new Error("x and x-zero-point must have the same data type."); if (e[1].dims.length !== 0 && e[1].dims.length !== 1 && e[1].dims.length !== e[0].dims.length) throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor."); if (e.length > 2) { if (e[0].dataType !== e[2].dataType) throw new Error("x and x-zero-point must have the same data type."); if (e[1].dims.length !== e[2].dims.length) throw new Error("scale and zero-point inputs must have the same rank."); if (!e[1].dims.map((r, i) => r === e[2].dims[i]).reduce((r, i) => r && i, !0)) throw new Error("scale and zero-point inputs must have the same shape.") } if (t.blockSize > 0) { if (e[1].dims.length === 0 || e[1].dims.length === 1 && e[1].dims[0] === 1) throw new Error("blockSize must be set only for block quantization."); if (!e[1].dims.map((a, n) => n === t.axis || a === e[0].dims[n]).reduce((a, n) => a && n, !0)) throw new Error("For block qunatization, scale input shape to match the input shape except for the axis"); if (e[1].dims.length !== e[0].dims.length) throw new Error("For block qunatization the scale input rank must be the same as the x rank."); let r = e[0].dims[t.axis], i = e[1].dims[t.axis]; if (t.blockSize < Math.ceil(r / i) || t.blockSize > Math.ceil(r / (i - 1) - 1)) throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].") } }, od = (e, t) => {
        let r = O.normalizeAxis(t.axis, e[0].dims.length), i = e[0].dataType, a = i === 3, n = e[0].dims, s = e[1].dataType, u = O.size(n), l = i === 3 || i === 2, p = l ? [Math.ceil(O.size(e[0].dims) / 4)] : e[0].dims, f = e[1].dims, h = e.length > 2 ? e[2] : void 0, g = h ? l ? [Math.ceil(O.size(h.dims) / 4)] : h.dims : void 0, y = f.length === 0 || f.length === 1 && f[0] === 1, _ = y === !1 && f.length === 1, b = ve(u), S = y && (!l || b === 4), v = S ? b : 1, w = S && !l ? b : 1, I = N("input", l ? 12 : i, p.length, w), T = N("scale", s, f.length), E = h ? N("zero_point", l ? 12 : i, g.length) : void 0, C = Q("output", s, n.length, v), A = [I, T]; E && A.push(E); let x = [p, f]; h && x.push(g); let M = [{ type: 12, data: u / v }, { type: 12, data: r }, { type: 12, data: t.blockSize }, ...J(...x, n)], D = H => {
          let F = [{ name: "output_size", type: "u32" }, { name: "axis", type: "u32" }, { name: "block_size", type: "u32" }]; return `
      ${H.registerUniforms(F).declareVariables(...A, C)}
      ${H.mainStart()}
          ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${l ? `
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${a ? "unpack4xI8(input)" : "unpack4xU8(input)"};
            let x_value = ${v === 1 ? "x_vec[global_idx % 4]" : "x_vec"};` : `let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${y ? `let scale_value= ${T.getByOffset("0")}` : _ ? `
            let scale_index = ${C.indicesGet("output_indices", "uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};` : `
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices", "uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices", "uniforms.axis", "index")};
            let scale_value= ${T.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E ? y ? l ? `
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${a ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`: `let zero_point_value = ${E.getByOffset("0")}` : _ ? l ? `
                let zero_point_index = ${C.indicesGet("output_indices", "uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`: `
                let zero_point_index = ${C.indicesGet("output_indices", "uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};` : l ? `
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`: `let zero_point_value = ${E.getByIndices("scale_indices")};` : `let zero_point_value = ${l ? a ? "i32" : "u32" : I.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx", `${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`}; return { name: "DequantizeLinear", shaderCache: { hint: t.cacheKey, inputDependencies: E ? ["rank", "rank", "rank"] : ["rank", "rank"] }, getShaderSource: D, getRunData: () => ({ outputs: [{ dims: n, dataType: s }], dispatchGroup: { x: Math.ceil(u / v / 64), y: 1, z: 1 }, programUniforms: M }) }
      }, tf = (e, t) => { sd(e.inputs, t), e.compute(od(e.inputs, t)) }, rf = e => fe({ axis: e.axis, blockSize: e.blockSize })
    }), ud, ld, af, ty = U(() => {
      Ge(), te(), ae(), ud = (e, t, r) => { let i = e === t, a = e < t && r < 0, n = e > t && r > 0; if (i || a || n) throw new Error("Range these inputs' contents are invalid.") }, ld = (e, t, r, i) => {
        let a = Math.abs(Math.ceil((t - e) / r)), n = [a], s = a, u = [{ type: 12, data: s }, { type: i, data: e }, { type: i, data: r }, ...J(n)], l = p => {
          let f = Q("output", i, n.length), h = f.type.value, g = [{ name: "outputSize", type: "u32" }, { name: "start", type: h }, { name: "delta", type: h }]; return `
        ${p.registerUniforms(g).declareVariables(f)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`}; return { name: "Range", shaderCache: { hint: `${i}` }, getShaderSource: l, getRunData: () => ({ outputs: [{ dims: n, dataType: i }], dispatchGroup: { x: Math.ceil(s / 64) }, programUniforms: u }) }
      }, af = e => { let t = 0, r = 0, i = 0; e.inputs[0].dataType === 6 ? (t = e.inputs[0].getInt32Array()[0], r = e.inputs[1].getInt32Array()[0], i = e.inputs[2].getInt32Array()[0]) : e.inputs[0].dataType === 1 && (t = e.inputs[0].getFloat32Array()[0], r = e.inputs[1].getFloat32Array()[0], i = e.inputs[2].getFloat32Array()[0]), $e.webgpu.validateInputContent && ud(t, r, i), e.compute(ld(t, r, i, e.inputs[0].dataType), { inputs: [] }) }
    }), dd, pd, nf, sf, ry = U(() => {
      te(), ie(), xe(), ae(), dd = (e, t, r, i) => {
        if (e !== "none" && i !== "i32" && i !== "u32" && i !== "f32") throw new Error(`Input ${i} is not supported with reduction ${e}.`); let a = `{
                var oldValue = 0;
                loop {
                  let newValueF32 =`, n = `;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`; switch (e) {
          case "none": return `${t}=${r};`; case "add": return i === "i32" || i === "u32" ? `atomicAdd(&${t}, bitcast<${i}>(${r}));` : `
              ${a}bitcast<${i}>(oldValue) + (${r})${n}`; case "max": return i === "i32" || i === "u32" ? `atomicMax(&${t}, bitcast<${i}>(${r}));` : `
                ${a}max(bitcast<f32>(oldValue), (${r}))${n}`; case "min": return i === "i32" || i === "u32" ? `atomicMin(&${t}, bitcast<${i}>(${r}));` : `${a}min(bitcast<${i}>(oldValue), (${r}))${n}`; case "mul": return `${a}(bitcast<${i}>(oldValue) * (${r}))${n}`; default: throw new Error(`Reduction ${e} is not supported.`)
        }
      }, pd = (e, t) => {
        let r = e[0].dims, i = e[1].dims, a = r, n = 1, s = Math.ceil(O.sizeToDimension(i, i.length - 1) / n), u = i[i.length - 1], l = O.sizeFromDimension(r, u), p = [{ type: 12, data: s }, { type: 12, data: u }, { type: 12, data: l }, ...J(e[1].dims, e[2].dims, a)], f = h => {
          let g = N("indices", e[1].dataType, e[1].dims.length), y = N("updates", e[2].dataType, e[2].dims.length, n), _ = t.reduction !== "none" && t.reduction !== "" ? Rp("output", e[0].dataType, a.length) : Q("output", e[0].dataType, a.length, n); return `
      ${h.registerUniform("output_size", "u32").registerUniform("last_index_dimension", "u32").registerUniform("num_updates_elements", "u32").declareVariables(g, y, _)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length === 1 ? `
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`: `
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${dd(t.reduction, "output[data_offset + i]", "value", _.type.value)}
  }

      }`}; return { name: "ScatterND", shaderCache: { hint: `${t.cacheKey}_${t.reduction}`, inputDependencies: ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: a, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(s / 64) }, programUniforms: p }), getShaderSource: f }
      }, nf = e => fe({ reduction: e.reduction }), sf = (e, t) => { e.compute(pd(e.inputs, t), { inputs: [e.inputs[1], e.inputs[2]], outputs: [] }) }
    }), cd, hd, fd, ba, md, gd, yd, _d, bd, wd, $d, vd, wa, xd, Sd, kd, Td, Id, of, uf, iy = U(() => {
      te(), ie(), xe(), ae(), cd = (e, t) => {
        if (e.every(r => r > 0 || (() => { throw new Error("Resize requires scales input values to be positive") })), e.length > 0) {
          if (t.mode === "linear") {
            if (!(e.length === 2 || e.length === 3 || e.length === 4 && e[0] === 1 && e[1] === 1 || e.length === 4 && e[0] === 1 && e[3] === 1 || e.length === 5 && e[0] === 1 && e[1] === 1)) throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)
          } else if (t.mode === "cubic" && !(e.length === 2 || e.length === 4 && e[0] === 1 && e[1] === 1 || e.length === 4 && e[0] === 1 && e[3] === 1)) throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")
        }
      }, hd = (e, t, r) => { t.every(a => a >= 0 && a < r || (() => { throw new Error("Resize requires axes input values to be positive and less than rank") })); let i = new Array(r).fill(1); return t.forEach((a, n) => i[a] = e[n]), i }, fd = (e, t, r, i, a, n) => { let [s, u, l] = r > 10 ? [1, 2, 3] : [-1, e.length > 1 ? 1 : -1, -1], p = e[0].dims.length; if (s > 0 && e.length > s && e[s].dims.length > 0) e[s].getFloat32Array().forEach(f => n.push(f)); else if (t.coordinateTransformMode === "tf_crop_and_resize") throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize"); if (u > 0 && e.length > u && e[u].dims.length === 1 && e[u].dims[0] > 0) { if (e[u].getFloat32Array().forEach(f => i.push(f)), i.length !== 0 && i.length !== p && r >= 18 && i.length !== t.axes.length) throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up"); cd(i, t), t.axes.length > 0 && hd(i, t.axes, p).forEach((f, h) => i[h] = f) } if (l > 0 && e.length > l && e[l].dims.length === 1 && e[l].dims[0] > 0 && (e[l].getBigInt64Array().forEach(f => a.push(Number(f))), a.length !== 0 && a.length !== p && r >= 18 && a.length !== t.axes.length)) throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up"); if (t.axes.length > 0) { if (i.length !== 0 && i.length !== t.axes.length) throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified'); if (a.length !== 0 && a.length !== t.axes.length) throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified') } if (typeof i < "u" && typeof a < "u" && i.length > 0 && a.length > p) throw new Error("Resize requires only of scales or sizes to be specified") }, ba = (e, t, r, i) => `
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`, md = (e, t) => `fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { ` + (() => {
          switch (e) {
            case "asymmetric": return `
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${ba("xResized", "lengthOriginal", "lengthResized", t)}
          }
        `; case "pytorch_half_pixel": return `if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`; case "tf_half_pixel_for_nn": return `return (${t}(xResized) + 0.5) / ${t}(xScale);`; case "align_corners": return `if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${ba("xResized", "lengthOriginal - 1", "lengthResized - 1", t)}
                  }`; case "tf_crop_and_resize": return `if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`; case "half_pixel_symmetric": return `const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`; case "half_pixel": return `return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`; default: throw new Error(`Coordinate transform mode ${e} is not supported`)
          }
        })() + "}", gd = (e, t, r) => `fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {` + (() => { switch (e) { case "round_prefer_ceil": return "if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }"; case "floor": return "return floor(xOriginal);"; case "ceil": return "return ceil(xOriginal);"; case "round_prefer_floor": return "if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }"; case "simple": default: if (t < 11) return "if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }"; throw new Error(`Nearest mode ${e} is not supported`) } })() + "}", yd = (e, t, r) => { let i = new Array(r).fill(0).concat(new Array(r).fill(1)), a = e.length === 0 ? i : e.slice(); return t.length > 0 ? (t.forEach((n, s) => { i[n] = a[s], i[s + r] = a[t.length + s] }), i) : a }, _d = (e, t, r, i) => { let a = []; if (r.length > 0) if (i.length > 0) { if (e.forEach(n => a.push(n)), Math.max(...i) > e.length) throw new Error("axes is out of bound"); i.forEach((n, s) => a[n] = r[s]) } else r.forEach(n => a.push(n)); else { if (t.length === 0) throw new Error("Resize requires either scales or sizes."); a = e.map((n, s) => Math.round(n * t[s])) } return a }, bd = (e, t, r) => { let i = (() => { switch (r.keepAspectRatioPolicy) { case "not_larger": return r.axes.length > 0 ? Math.min(...r.axes.map(n => t[n]), Number.MAX_VALUE) : Math.min(...t, Number.MAX_VALUE); case "not_smaller": return r.axes.length > 0 ? Math.max(...r.axes.map(n => t[n]), Number.MIN_VALUE) : Math.max(...t, Number.MIN_VALUE); default: throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`) } })(); t.fill(1, 0, t.length); let a = e.slice(); return r.axes.length > 0 ? (r.axes.forEach(n => t[n] = i), r.axes.forEach(n => a[n] = Math.round(e[n] * t[n]))) : (t.fill(i, 0, t.length), a.forEach((n, s) => a[s] = Math.round(n * t[s]))), a }, wd = (e, t, r, i, a) => `
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices", "i")};
        var scale = ${Y("uniforms.scales", "i", i)};
        var roi_low = ${Y("uniforms.roi", "i", a)};
        var roi_hi = ${Y("uniforms.roi", `i + ${t.length}`, a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Y("uniforms.input_shape", "i", t.length)};
          var output_shape_i = ${Y("uniforms.output_shape", "i", r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`, $d = (e, t, r, i, a, n, s) => `
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices", "i")};
        var input_index: u32;
        var scale = ${Y("uniforms.scales", "i", a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Y("uniforms.roi", "i", n)};
          var roi_hi = ${Y("uniforms.roi", `i + ${r.length}`, n)};
          var input_shape_i = ${Y("uniforms.input_shape", "i", r.length)};
          var output_shape_i = ${Y("uniforms.output_shape", "i", i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices", "i", "input_index")}
      }
      return input_indices;
    }`, vd = (e, t) => `
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices", "i")};
        if (input_index < 0 || input_index >= ${Y("uniforms.input_shape", "i", t.length)}) {
          return false;
        }
      }
      return true;
    }`, wa = (e, t, r, i) => e.rank > i ? `
    ${e.indicesSet("input_indices", t, "channel")};
    ${e.indicesSet("input_indices", r, "batch")};
`: "", xd = (e, t, r, i, a) => {
        let [n, s, u, l] = r.length === 2 ? [-1, 0, 1, -1] : [0, 2, 3, 1], p = e.type.value; return `
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices", s, `max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices", u, `max(0, min(col, ${r[u]} - 1))`)};
      ${wa(e, l, n, 2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${u}];
      ${i ? `if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }`: ""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length > 2 ? `u32(originalIndices[${l}])` : "0"};
      var batch: u32 =  ${r.length > 2 ? `u32(originalIndices[${n}])` : "0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`}, Sd = (e, t, r, i, a, n, s, u, l, p) => {
        let f = r.length === 2, [h, g] = f ? [0, 1] : [2, 3], y = e.type.value, _ = b => {
          let S = b === h ? "row" : "col"; return `
      fn ${S}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices", b)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[b]},
        ${i[b]}, ${r[b]}, ${n[b]}, ${n[b]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[b]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${S}: ${y} = originalIdx + ${y}(i);
          if (${S} < 0 || ${S} >= ${r[b]}) {
            ${p ? `coefs[i + 1] = 0.0;
                        continue;`: u ? `return ${l};` : `${S} = max(0, min(${S}, ${r[b]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy", b, `u32(${S})`)};
          data[i + 1] = ${b === h ? e.getByIndices("input_indices_copy") : "rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`}; return `
    ${_(h)};
    ${_(g)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `}, kd = (e, t, r, i, a) => {
        let [n, s, u, l, p] = r.length === 3 ? [-1, 0, 1, 2, -1] : [0, 2, 3, 4, 1], f = e.type.value; return `
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices", s, `max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices", u, `max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices", l, `max(0, min(width, ${r[l]} - 1))`)};
      ${wa(e, p, n, 3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${s}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${l}];
      ${i ? `if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${a};
        }`: ""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length > 3 ? `u32(originalIndices[${p}])` : "0"};
      var batch: u32 =  ${r.length > 3 ? `u32(originalIndices[${n}])` : "0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`}, Td = (e, t, r, i, a, n) => {
        let s = e.dims, u = yd(n, t.axes, s.length), l = _d(s, i, a, t.axes), p = i.slice(); i.length === 0 && (p = s.map((w, I) => w === 0 ? 1 : l[I] / w), t.keepAspectRatioPolicy !== "stretch" && (l = bd(s, p, t))); let f = Q("output", e.dataType, l.length), h = N("input", e.dataType, s.length), g = O.size(l), y = s.length === l.length && s.every((w, I) => w === l[I]), _ = t.coordinateTransformMode === "tf_crop_and_resize", b = t.extrapolationValue, S = h.type.value, v = w => `
      ${y ? "" : `
      ${md(t.coordinateTransformMode, S)};
      ${(() => {
              switch (t.mode) {
                case "nearest": return `
              ${vd(h, s)};
              ${gd(t.nearestMode, r, S)};
              ${$d(h, f, s, l, p.length, u.length, _)};
              `; case "linear": return `
              ${wd(f, s, l, p.length, u.length)};
              ${(() => { if (s.length === 2 || s.length === 4) return `${xd(h, f, s, _, b)}`; if (s.length === 3 || s.length === 5) return `${kd(h, f, s, _, b)}`; throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.") })()};
            `; case "cubic": return `
            ${(() => { if (s.length === 2 || s.length === 4) return `${Sd(h, f, s, l, p, u, t.cubicCoeffA, _, t.extrapolationValue, t.excludeOutside)}`; throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.") })()};
            `; default: throw Error("Invalid resize mode")
              }
            })()};
      `}
      ${w.registerUniform("output_size", "u32").registerUniform("scales", "f32", p.length).registerUniform("roi", "f32", u.length).declareVariables(h, f)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y ? "output[global_idx] = input[global_idx];" : `
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(() => {
              switch (t.mode) {
                case "nearest": return `input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`; case "linear": return `output[global_idx] = ${s.length === 2 || s.length === 4 ? "bilinearInterpolation" : "trilinearInterpolation"}(output_indices);`; case "cubic": return "output[global_idx] = bicubicInterpolation(output_indices);"; default: throw Error(`Unsupported resize mode: ${t.mode}`)
              }
            })()};
`}
      }`; return { name: "Resize", shaderCache: { hint: `${t.cacheKey}|${r}|${p.length > 0 ? t.mode === "cubic" ? p : p.length : ""}|${a.length > 0 ? a : ""}|${u.length > 0 ? u : ""}|${y}|${t.mode === "nearest" ? s.length : s}`, inputDependencies: ["rank"] }, getShaderSource: v, getRunData: () => ({ outputs: [{ dims: l, dataType: e.dataType }], dispatchGroup: { x: Math.ceil(g / 64) }, programUniforms: [{ type: 12, data: g }, { type: 1, data: p }, { type: 1, data: u }, ...J(s, l)] }) }
      }, Id = e => { let t = e.customDataBuffer; return new Uint32Array(t, t.byteOffset, 1)[0] }, of = (e, t) => { let r = [], i = [], a = [], n = Id(e); if (t.antialias !== 0) throw Error("Only default value (0) for Antialias attribute is supported"); fd(e.inputs, t, n, r, i, a), e.compute(Td(e.inputs[0], t, n, r, i, a), { inputs: [0] }) }, uf = e => { let t = e.antialias, r = e.axes, i = e.coordinateTransformMode, a = e.cubicCoeffA, n = e.excludeOutside !== 0, s = e.extrapolationValue, u = e.keepAspectRatioPolicy, l = e.mode, p = e.nearestMode === "" ? "simple" : e.nearestMode; return fe({ antialias: t, axes: r, coordinateTransformMode: i, cubicCoeffA: a, excludeOutside: n, extrapolationValue: s, keepAspectRatioPolicy: u, mode: l, nearestMode: p }) }
    }), Ed, zd, lf, ay = U(() => {
      te(), ie(), ae(), Ed = e => { if (!e || e.length < 3) throw new Error("layerNorm requires at least 3 inputs."); let t = e[0], r = e[1], i = e[2]; if (t.dataType !== r.dataType || t.dataType !== i.dataType) throw new Error("All inputs must have the same data type"); if (t.dims.length !== 3 && t.dims.length !== 2) throw new Error("Input must be 2D or 3D"); if (r.dims.length !== 3 && r.dims.length !== 2) throw new Error("Skip must be 2D or 3D"); let a = t.dims[t.dims.length - 1], n = t.dims[t.dims.length - 2]; if (r.dims[r.dims.length - 1] !== a) throw new Error("Skip must have the same hidden size as input"); if (r.dims[r.dims.length - 2] !== n) throw new Error("Skip must have the same sequence length as input"); if (i.dims.length !== 1) throw new Error("Gamma must be 1D"); if (i.dims[i.dims.length - 1] !== a) throw new Error("Gamma must have the same hidden size as input"); if (e.length > 3) { let s = e[3]; if (s.dims.length !== 1) throw new Error("Beta must be 1D"); if (s.dims[s.dims.length - 1] !== a) throw new Error("Beta must have the same hidden size as input") } if (e.length > 4) { let s = e[4]; if (s.dims.length !== 1) throw new Error("Bias must be 1D"); if (s.dims[s.dims.length - 1] !== a) throw new Error("Bias must have the same hidden size as input") } }, zd = (e, t, r, i) => {
        let a = t.simplified, n = e[0].dims, s = O.size(n), u = n, l = s, p = n.slice(-1)[0], f = i ? n.slice(0, -1).concat(1) : [], h = !a && e.length > 3, g = e.length > 4, y = i && r > 1, _ = i && r > 2, b = r > 3, S = 64, v = ve(p), w = [{ type: 12, data: l }, { type: 12, data: v }, { type: 12, data: p }, { type: 1, data: t.epsilon }], I = E => {
          let C = [{ name: "output_size", type: "u32" }, { name: "components", type: "u32" }, { name: "hidden_size", type: "u32" }, { name: "epsilon", type: "f32" }], A = [N("x", e[0].dataType, e[0].dims, v), N("skip", e[1].dataType, e[1].dims, v), N("gamma", e[2].dataType, e[2].dims, v)]; h && A.push(N("beta", e[3].dataType, e[3].dims, v)), g && A.push(N("bias", e[4].dataType, e[4].dims, v)), A.push(Q("output", e[0].dataType, u, v)), y && A.push(Q("mean_output", 1, f)), _ && A.push(Q("inv_std_output", 1, f)), b && A.push(Q("input_skip_bias_sum", e[0].dataType, u, v)); let x = Ie(e[0].dataType), M = Ie(1, v); return `

      ${E.registerUniforms(C).declareVariables(...A)}
      var<workgroup> sum_shared : array<${M}, ${S}>;
      var<workgroup> sum_squared_shared : array<${M}, ${S}>;

      ${E.mainStart([S, 1, 1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S - 1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g ? "bias[offset1d + i]" : x + "(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b ? "input_skip_bias_sum[offset + i] = value;" : ""}
          output[offset + i] = value;
          let f32_value = ${Gt(x, v, "value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${bt("sum", v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${bt("square_sum", v)} / f32(uniforms.hidden_size) ${a ? "" : "- mean * mean"} + uniforms.epsilon);
        ${y ? "mean_output[global_idx] = mean;" : ""}
        ${_ ? "inv_std_output[global_idx] = inv_std_dev;" : ""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a ? "" : `- ${x}(mean)`}) *
            ${x}(inv_std_dev) * gamma[offset1d + i]
            ${h ? "+ beta[offset1d + i]" : ""};
        }
      }`}, T = [{ dims: u, dataType: e[0].dataType }]; return r > 1 && T.push({ dims: f, dataType: 1 }), r > 2 && T.push({ dims: f, dataType: 1 }), r > 3 && T.push({ dims: n, dataType: e[0].dataType }), { name: "SkipLayerNormalization", shaderCache: { hint: `${v};${y};${_};${b}`, inputDependencies: e.map((E, C) => "type") }, getShaderSource: I, getRunData: () => ({ outputs: T, dispatchGroup: { x: Math.ceil(l / p) }, programUniforms: w }) }
      }, lf = (e, t) => { Ed(e.inputs); let r = [0]; e.outputCount > 1 && r.push(-3), e.outputCount > 2 && r.push(-3), e.outputCount > 3 && r.push(3), e.compute(zd(e.inputs, t, e.outputCount, !1), { outputs: r }) }
    }), Cd, or, Ad, $a, Od, Rd, df, pf, ny = U(() => {
      te(), ie(), xe(), ae(), Cd = (e, t) => { if (!e || e.length < 1) throw new Error("too few inputs"); if (t.axes.length !== 0) { if (t.axes.length !== t.starts.length || t.axes.length !== t.ends.length) throw new Error("axes, starts and ends must have the same length") } else if (t.starts.length !== t.ends.length) throw new Error("starts and ends must have the same length"); e.slice(1).forEach((r, i) => { if (e[i + 1].dataType !== 6 && e[i + 1].dataType !== 7) throw new Error(`Input ${i} must be an array of int32 or int64`) }) }, or = (e, t) => { let r = []; if (e.length > t) if (e[t].dataType === 7) e[t].getBigInt64Array().forEach(i => r.push(Number(i))); else if (e[t].dataType === 6) e[t].getInt32Array().forEach(i => r.push(Number(i))); else throw new Error(`Input ${t} must be an array of int32 or int64`); return r }, Ad = (e, t) => { if (e.length > 1) { let r = or(e, 1), i = or(e, 2), a = or(e, 3); return a.length === 0 && (a = [...Array(e[0].dims.length).keys()]), fe({ starts: r, ends: i, axes: a }) } else return t }, $a = (e, t, r, i, a) => { let n = e; return e < 0 && (n += r[i[t]]), a[t] < 0 ? Math.max(0, Math.min(n, r[i[t]] - 1)) : Math.max(0, Math.min(n, r[i[t]])) }, Od = (e, t, r) => `fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length - 1}; i >= 0; i--) {
            let input_shape_i = ${Y("uniforms.input_shape", "i", r.length)};
            let steps_i = ${Y("uniforms.steps", "i", r.length)};
            let signs_i = ${Y("uniforms.signs", "i", r.length)};
            let starts_i = ${Y("uniforms.starts", "i", r.length)};
            var output_index = ${t.indicesGet("output_indices", "i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices", "i", "input_index")};
          }
          return input_indices;
      }`, Rd = (e, t) => {
        let r = e[0].dims, i = O.size(r), a = t.axes.length > 0 ? O.normalizeAxes(t.axes, r.length) : [...Array(r.length).keys()], n = or(e, 4); n.forEach(v => v !== 0 || (() => { throw new Error("step cannot be 0") })), n.length === 0 && (n = Array(a.length).fill(1)); let s = t.starts.map((v, w) => $a(v, w, r, a, n)), u = t.ends.map((v, w) => $a(v, w, r, a, n)); if (a.length !== s.length || a.length !== u.length) throw new Error("start, ends and axes should have the same number of elements"); if (a.length !== r.length) for (let v = 0; v < r.length; ++v)a.includes(v) || (s.splice(v, 0, 0), u.splice(v, 0, r[v]), n.splice(v, 0, 1)); let l = n.map(v => Math.sign(v)); n.forEach((v, w, I) => { if (v < 0) { let T = (u[w] - s[w]) / v, E = s[w], C = E + T * n[w]; s[w] = C, u[w] = E, I[w] = -v } }); let p = r.slice(0); a.forEach((v, w) => { p[v] = Math.ceil((u[v] - s[v]) / n[v]) }); let f = { dims: p, dataType: e[0].dataType }, h = Q("output", e[0].dataType, p.length), g = N("input", e[0].dataType, e[0].dims.length), y = O.size(p), _ = [{ name: "outputSize", type: "u32" }, { name: "starts", type: "u32", length: s.length }, { name: "signs", type: "i32", length: l.length }, { name: "steps", type: "u32", length: n.length }], b = [{ type: 12, data: y }, { type: 12, data: s }, { type: 6, data: l }, { type: 12, data: n }, ...J(e[0].dims, p)], S = v => `
      ${v.registerUniforms(_).declareVariables(g, h)}
        ${Od(g, h, r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx", g.getByIndices("input_indices"))}
      }`; return { name: "Slice", shaderCache: { hint: `${l.length}_${s.length}_${n.length}`, inputDependencies: ["rank"] }, getShaderSource: S, getRunData: () => ({ outputs: [f], dispatchGroup: { x: Math.ceil(i / 64) }, programUniforms: b }) }
      }, df = (e, t) => { Cd(e.inputs, t); let r = Ad(e.inputs, t); e.compute(Rd(e.inputs, r), { inputs: [0] }) }, pf = e => { let t = e.starts, r = e.ends, i = e.axes; return fe({ starts: t, ends: r, axes: i }) }
    }), Bd, Nd, cf, hf, sy = U(() => {
      te(), ie(), xe(), wt(), ae(), Bd = e => { if (!e || e.length !== 1) throw new Error("Softmax op requires 1 input.") }, Nd = (e, t) => {
        let r = e.inputs[0], i = r.dims, a = O.size(i), n = i.length, s = O.normalizeAxis(t.axis, n), u = s < i.length - 1, l, p = []; u ? (p = Array.from({ length: n }, (A, x) => x), p[s] = n - 1, p[n - 1] = s, l = e.compute(Le(r, p), { inputs: [r], outputs: [-1] })[0]) : l = r; let f = l.dims, h = f[n - 1], g = a / h, y = ve(h), _ = h / y, b = 64; g === 1 && (b = 256); let S = (A, x) => x === 4 ? `max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))` : x === 2 ? `max(${A}.x, ${A}.y)` : x === 3 ? `max(max(${A}.x, ${A}.y), ${A}.z)` : A, v = N("x", l.dataType, l.dims, y), w = Q("result", l.dataType, l.dims, y), I = v.type.value, T = Ie(l.dataType) === "f32" ? `var threadMax = ${I}(-3.4028234663852886e+38f);` : `var threadMax = ${I}(-65504.0h);`, E = A => `
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols", "i32").declareVariables(v, w)}
      ${A.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${T}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${I}(${S("threadShared[0]", y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${I}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${I}(${bt("threadShared[0]", y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${I}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`, C = e.compute({ name: "Softmax", shaderCache: { hint: `${y};${b}`, inputDependencies: ["type"] }, getRunData: () => ({ outputs: [{ dims: f, dataType: l.dataType }], dispatchGroup: { x: g }, programUniforms: [{ type: 6, data: _ }] }), getShaderSource: E }, { inputs: [l], outputs: [u ? -1 : 0] })[0]; u && e.compute(Le(C, p), { inputs: [C] })
      }, cf = (e, t) => { Bd(e.inputs), Nd(e, t) }, hf = e => fe({ axis: e.axis })
    }), va, Md, Dd, Ud, ff, oy = U(() => {
      te(), ie(), ae(), va = e => Array.from(e.getBigInt64Array(), Number), Md = e => { if (!e || e.length !== 2) throw new Error("Tile requires 2 inputs."); if (e[0].dataType !== 1 && e[0].dataType !== 10 && e[0].dataType !== 6 && e[0].dataType !== 12) throw new Error("Tile only support float, float16, int32, and uint32 data types"); if (e[1].dataType !== 7) throw new Error("Tile `repeats` input should be of int64 data type"); if (e[1].dims.length !== 1) throw new Error("Tile `repeats` input should be 1-D"); if (va(e[1]).length !== e[0].dims.length) throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor") }, Dd = (e, t) => { let r = []; for (let i = 0; i < e.length; ++i)r.push(e[i] * t[i]); return r }, Ud = (e, t) => {
        let r = e[0].dims, i = t ?? va(e[1]), a = Dd(r, i), n = O.size(a), s = e[0].dataType, u = N("input", s, r.length), l = Q("output", s, a.length), p = f => `
      const inputShape = ${u.indices(...r)};
      ${f.registerUniform("output_size", "u32").declareVariables(u, l)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape", "i")};
        let input_dim_value = ${l.indicesGet("output_indices", "i")}  % input_dim_i;

        ${u.indicesSet("input_indices", "i", "input_dim_value")}
      }
      ${l.setByOffset("global_idx", u.getByIndices("input_indices"))}
    }`; return { name: "Tile", shaderCache: { hint: `${i}`, inputDependencies: ["rank"] }, getRunData: () => ({ outputs: [{ dims: a, dataType: e[0].dataType }], dispatchGroup: { x: Math.ceil(n / 64) }, programUniforms: [{ type: 12, data: n }, ...J(e[0].dims, a)] }), getShaderSource: p }
      }, ff = e => { Md(e.inputs), e.compute(Ud(e.inputs), { inputs: [0] }) }
    }), Pd, qd, mf, uy = U(() => {
      te(), ie(), ae(), Pd = (e, t, r, i, a) => {
        let n = Q("output_data", a, r.length, 4), s = N("a_data", t[1].dataType, t[1].dims.length, 4), u = N("b_data", t[2].dataType, t[2].dims.length, 4), l = N("c_data", t[0].dataType, t[0].dims.length, 4), p, f = (h, g, y) => `select(${g}, ${h}, ${y})`; if (!i) p = n.setByOffset("global_idx", f(s.getByOffset("global_idx"), u.getByOffset("global_idx"), l.getByOffset("global_idx"))); else {
          let h = (g, y, _ = "") => {
            let b = `a_data[index_a${y}][component_a${y}]`, S = `b_data[index_b${y}][component_b${y}]`, v = `bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`; return `
            let output_indices${y} = ${n.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${s.broadcastedIndicesToOffset(`output_indices${y}`, n)};
            let offset_b${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`, n)};
            let offset_c${y} = ${l.broadcastedIndicesToOffset(`output_indices${y}`, n)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${g}[${y}] = ${_}(${f(b, S, v)});
          `}; a === 9 ? p = `
            var data = vec4<u32>(0);
            ${h("data", 0, "u32")}
            ${h("data", 1, "u32")}
            ${h("data", 2, "u32")}
            ${h("data", 3, "u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`: p = `
            ${h("output_data[global_idx]", 0)}
            ${h("output_data[global_idx]", 1)}
            ${h("output_data[global_idx]", 2)}
            ${h("output_data[global_idx]", 3)}
          `} return `
        ${e.registerUniform("vec_size", "u32").declareVariables(l, s, u, n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`}, qd = e => { let t = e[1].dims, r = e[2].dims, i = e[0].dims, a = e[1].dataType, n = !(O.areEqual(t, r) && O.areEqual(r, i)), s = t, u = O.size(t); if (n) { let p = Ht.calcShape(Ht.calcShape(t, r, !1), i, !1); if (!p) throw new Error("Can't perform where op on the given tensors"); s = p, u = O.size(s) } let l = Math.ceil(u / 4); return { name: "Where", shaderCache: { inputDependencies: ["rank", "rank", "rank"] }, getShaderSource: p => Pd(p, e, s, n, a), getRunData: () => ({ outputs: [{ dims: s, dataType: a }], dispatchGroup: { x: Math.ceil(u / 64 / 4) }, programUniforms: [{ type: 12, data: l }, ...J(i, t, r, s)] }) } }, mf = e => { e.compute(qd(e.inputs)) }
    }), gf, ly = U(() => { x0(), on(), S0(), k0(), T0(), I0(), E0(), R0(), N0(), M0(), D0(), U0(), P0(), q0(), L0(), W0(), V0(), G0(), H0(), F0(), j0(), K0(), X0(), Z0(), Q0(), Bh(), Y0(), J0(), ey(), ty(), ry(), sn(), iy(), Ph(), ay(), ny(), sy(), Dh(), oy(), wt(), un(), uy(), gf = new Map([["Abs", [uc]], ["Acos", [lc]], ["Acosh", [dc]], ["Add", [Gc]], ["ArgMax", [ac, Na]], ["ArgMin", [ic, Na]], ["Asin", [pc]], ["Asinh", [cc]], ["Atan", [hc]], ["Atanh", [fc]], ["Attention", [nc]], ["AveragePool", [Kh, jh]], ["BatchNormalization", [sc]], ["BiasAdd", [oc]], ["BiasSplitGelu", [Vc]], ["Cast", [gc, mc]], ["Ceil", [_c]], ["Clip", [yc]], ["Concat", [eh, th]], ["Conv", [La, qa]], ["ConvTranspose", [ph, dh]], ["Cos", [bc]], ["Cosh", [wc]], ["CumSum", [ch, hh]], ["DepthToSpace", [fh, mh]], ["DequantizeLinear", [tf, rf]], ["Div", [Hc]], ["Einsum", [gh, yh]], ["Elu", [$c, cr]], ["Equal", [Fc]], ["Erf", [vc]], ["Exp", [xc]], ["Expand", [_h]], ["FastGelu", [bh]], ["Floor", [Sc]], ["FusedConv", [La, qa]], ["Gather", [$h, wh]], ["GatherElements", [Ih, Th]], ["GatherBlockQuantized", [Sh, kh]], ["GatherND", [vh, xh]], ["Gelu", [kc]], ["Gemm", [zh, Eh]], ["GlobalAveragePool", [Zh, Xh]], ["GlobalMaxPool", [ef, Jh]], ["Greater", [Zc]], ["GreaterOrEqual", [Yc]], ["GridSample", [Ch, Ah]], ["GroupQueryAttention", [qh]], ["HardSigmoid", [Rc, Oc]], ["InstanceNormalization", [Lh]], ["LayerNormalization", [Wh]], ["LeakyRelu", [Tc, cr]], ["Less", [Qc]], ["LessOrEqual", [Jc]], ["Log", [Lc]], ["MatMul", [Vh]], ["MatMulNBits", [Gh, Hh]], ["MaxPool", [Qh, Yh]], ["Mul", [jc]], ["MultiHeadAttention", [Rh, Oh]], ["Neg", [Ec]], ["Not", [Ic]], ["Pad", [Fh]], ["Pow", [Kc]], ["QuickGelu", [Wc, cr]], ["Range", [af]], ["Reciprocal", [zc]], ["ReduceMin", [Yp]], ["ReduceMean", [jp]], ["ReduceMax", [Qp]], ["ReduceSum", [ec]], ["ReduceProd", [Jp]], ["ReduceL1", [Kp]], ["ReduceL2", [Xp]], ["ReduceLogSum", [rc]], ["ReduceLogSumExp", [Zp]], ["ReduceSumSquare", [tc]], ["Relu", [Cc]], ["Resize", [of, uf]], ["RotaryEmbedding", [Uh]], ["ScatterND", [sf, nf]], ["Sigmoid", [Ac]], ["Sin", [Bc]], ["Sinh", [Nc]], ["Slice", [df, pf]], ["SkipLayerNormalization", [lf]], ["Split", [Nh, Mh]], ["Sqrt", [Mc]], ["Softmax", [cf, hf]], ["Sub", [Xc]], ["Tan", [Dc]], ["Tanh", [Uc]], ["ThresholdedRelu", [qc, cr]], ["Tile", [ff]], ["Transpose", [Np, Mp]], ["Where", [mf]]]) }), yf, dy = U(() => {
      Ge(), lt(), ae(), yf = class {
        constructor(e) { this.backend = e, this.repo = new Map, this.attributesBound = !1 } getArtifact(e) { return this.repo.get(e) } setArtifact(e, t) { this.repo.set(e, t) } run(e, t, r, i, a) { at(e.programInfo.name); let n = this.backend.device, s = this.backend.getComputePassEncoder(); this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2); let u = []; for (let p of t) u.push({ binding: u.length, resource: { buffer: p.buffer } }); for (let p of r) u.push({ binding: u.length, resource: { buffer: p.buffer } }); a && u.push({ binding: u.length, resource: a }); let l = n.createBindGroup({ layout: e.computePipeline.getBindGroupLayout(0), entries: u, label: e.programInfo.name }); if (this.backend.sessionStatus === "capturing") { let p = { kernelId: this.backend.currentKernelId, computePipeline: e.computePipeline, bindGroup: l, dispatchGroup: i }; this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p) } s.setPipeline(e.computePipeline), s.setBindGroup(0, l), s.dispatchWorkgroups(...i), this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2 + 1), this.backend.pendingDispatchNumber++, (this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber || this.backend.queryType === "at-passes") && this.backend.endComputePass(), this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber && this.backend.flush(), Je(e.programInfo.name) } dispose() { } build(e, t) {
          at(e.name); let r = this.backend.device, i = [];[{ feature: "shader-f16", extension: "f16" }, { feature: "subgroups", extension: "subgroups" }].forEach(p => { r.features.has(p.feature) && i.push(`enable ${p.extension};`) }); let a = Bp(t, this.backend.device.limits), n = e.getShaderSource(a), s = `${i.join(`
`)}
${a.additionalImplementations}
${n}`, u = r.createShaderModule({ code: s, label: e.name }); de("verbose", () => `[WebGPU] ${e.name} shader code: ${s}`); let l = r.createComputePipeline({ compute: { module: u, entryPoint: "main" }, layout: "auto", label: e.name }); return Je(e.name), { programInfo: e, computePipeline: l, uniformVariablesInfo: a.variablesInfo }
        } normalizeDispatchGroupSize(e) { let t = typeof e == "number" ? e : e.x, r = typeof e == "number" ? 1 : e.y || 1, i = typeof e == "number" ? 1 : e.z || 1, a = this.backend.device.limits.maxComputeWorkgroupsPerDimension; if (t <= a && r <= a && i <= a) return [t, r, i]; let n = t * r * i, s = Math.ceil(Math.sqrt(n)); if (s > a) { if (s = Math.ceil(Math.cbrt(n)), s > a) throw new Error("Total dispatch size exceeds WebGPU maximum."); return [s, s, s] } else return [s, s, 1] }
      }
    }), _f = {}; jt(_f, { WebGpuBackend: () => bf }); var Ld, Wd, Vd, bf, py = U(() => { Ge(), te(), lt(), zp(), $0(), ly(), dy(), Ld = (e, t) => { if (t.length !== e.length) throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`); let r = []; for (let i = 0; i < e.length; ++i) { let a = e[i].dataType; switch (t[i]) { case "none": { r.push(""); break } case "type": { r.push(`${a}`); break } case "rank": { let n = e[i].dims.length; r.push(`${a};${n}`); break } case "dims": { let n = e[i].dims.join(","); r.push(`${a};${n}`); break } default: throw new Error(`unsupported input dependency: ${t[i]}`) } } return r.join("|") }, Wd = (e, t, r) => { var a, n; let i = e.name; return (a = e.shaderCache) != null && a.hint && (i += "[" + e.shaderCache.hint + "]"), i += ":" + r + `:${Ld(t, ((n = e.shaderCache) == null ? void 0 : n.inputDependencies) ?? new Array(t.length).fill("dims"))}`, i }, Vd = class { constructor(e) { e && (this.architecture = e.architecture, this.vendor = e.vendor) } isArchitecture(e) { return this.architecture === e } isVendor(e) { return this.vendor === e } }, bf = class { constructor() { this.currentSessionId = null, this.currentKernelId = null, this.commandEncoder = null, this.computePassEncoder = null, this.maxDispatchNumber = 16, this.pendingDispatchNumber = 0, this.pendingKernels = [], this.pendingQueries = new Map, this.sessionStatus = "default", this.capturedCommandList = new Map, this.capturedPendingKernels = new Map, this.sessionExternalDataMapping = new Map } get currentKernelCustomData() { if (this.currentKernelId === null) throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)"); let e = this.kernelCustomData.get(this.currentKernelId); return e || (e = {}, this.kernelCustomData.set(this.currentKernelId, e)), e } async initialize(e, t) { this.env = e; let r = [], i = { requiredLimits: { maxComputeWorkgroupStorageSize: t.limits.maxComputeWorkgroupStorageSize, maxComputeWorkgroupsPerDimension: t.limits.maxComputeWorkgroupsPerDimension, maxStorageBufferBindingSize: t.limits.maxStorageBufferBindingSize, maxBufferSize: t.limits.maxBufferSize, maxComputeInvocationsPerWorkgroup: t.limits.maxComputeInvocationsPerWorkgroup, maxComputeWorkgroupSizeX: t.limits.maxComputeWorkgroupSizeX, maxComputeWorkgroupSizeY: t.limits.maxComputeWorkgroupSizeY, maxComputeWorkgroupSizeZ: t.limits.maxComputeWorkgroupSizeZ }, requiredFeatures: r }, a = n => t.features.has(n) && r.push(n) && !0; a("chromium-experimental-timestamp-query-inside-passes") || a("timestamp-query"), a("shader-f16"), a("subgroups"), this.device = await t.requestDevice(i), this.adapterInfo = new Vd(t.info || await t.requestAdapterInfo()), this.gpuDataManager = Op(this), this.programManager = new yf(this), this.kernels = new Map, this.kernelPersistentData = new Map, this.kernelCustomData = new Map, tn(e.logLevel, !!e.debug), this.device.onuncapturederror = n => { n.error instanceof GPUValidationError && console.error(`An uncaught WebGPU validation error was raised: ${n.error.message}`) }, Object.defineProperty(this.env.webgpu, "device", { value: this.device, writable: !1, enumerable: !0, configurable: !0 }), Object.defineProperty(this.env.webgpu, "adapter", { value: t, writable: !1, enumerable: !0, configurable: !1 }), this.setQueryType() } dispose() { var e; typeof this.querySet < "u" && this.querySet.destroy(), this.gpuDataManager.dispose(), this.device && ((e = this.env) != null && e.webgpu) && this.device.lost.then(() => { delete this.env.webgpu.device }) } getCommandEncoder() { return this.commandEncoder || (this.commandEncoder = this.device.createCommandEncoder()), this.commandEncoder } getComputePassEncoder() { if (!this.computePassEncoder) { let e = this.getCommandEncoder(), t = {}; this.queryType === "at-passes" && (t.timestampWrites = { querySet: this.querySet, beginningOfPassWriteIndex: this.pendingDispatchNumber * 2, endOfPassWriteIndex: this.pendingDispatchNumber * 2 + 1 }), this.computePassEncoder = e.beginComputePass(t) } return this.computePassEncoder } endComputePass() { this.computePassEncoder && (this.computePassEncoder.end(), this.computePassEncoder = null) } flush() { if (!this.commandEncoder) return; at(), this.endComputePass(); let e; this.queryType !== "none" && (this.commandEncoder.resolveQuerySet(this.querySet, 0, this.pendingDispatchNumber * 2, this.queryResolveBuffer, 0), e = this.device.createBuffer({ size: this.pendingDispatchNumber * 2 * 8, usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST }), this.pendingQueries.set(e, this.pendingKernels), this.pendingKernels = [], this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer, 0, e, 0, this.pendingDispatchNumber * 2 * 8)), this.device.queue.submit([this.commandEncoder.finish()]), this.gpuDataManager.refreshPendingBuffers(), this.commandEncoder = null, this.pendingDispatchNumber = 0, this.queryType !== "none" && e.mapAsync(GPUMapMode.READ).then(() => { var i; let t = new BigUint64Array(e.getMappedRange()), r = this.pendingQueries.get(e); for (let a = 0; a < t.length / 2; a++) { let n = r[a], s = n.kernelId, u = this.kernels.get(s), l = u.kernelType, p = u.kernelName, f = n.programName, h = n.inputTensorViews, g = n.outputTensorViews, y = t[a * 2], _ = t[a * 2 + 1]; typeof this.queryTimeBase > "u" && (this.queryTimeBase = y); let b = Number(y - this.queryTimeBase), S = Number(_ - this.queryTimeBase); if (!Number.isSafeInteger(b) || !Number.isSafeInteger(S)) throw new RangeError("incorrect timestamp range"); if ((i = this.env.webgpu.profiling) != null && i.ondata) this.env.webgpu.profiling.ondata({ version: 1, inputsMetadata: h.map(v => ({ dims: v.dims, dataType: ut(v.dataType) })), outputsMetadata: g.map(v => ({ dims: v.dims, dataType: ut(v.dataType) })), kernelId: s, kernelType: l, kernelName: p, programName: f, startTime: b, endTime: S }); else { let v = ""; h.forEach((I, T) => { v += `input[${T}]: [${I.dims}] | ${ut(I.dataType)}, ` }); let w = ""; g.forEach((I, T) => { w += `output[${T}]: [${I.dims}] | ${ut(I.dataType)}, ` }), console.log(`[profiling] kernel "${s}|${l}|${p}|${f}" ${v}${w}start time: ${b} ns, execution time: ${S - b} ns`) } Qr("GPU", `${f}::${y}::${_}`) } e.unmap(), this.pendingQueries.delete(e) }), Je() } run(e, t, r, i, a, n) { at(e.name); let s = []; for (let w = 0; w < t.length; ++w) { let I = t[w].data; if (I === 0) continue; let T = this.gpuDataManager.get(I); if (!T) throw new Error(`no GPU data for input: ${I}`); s.push(T) } let { outputs: u, dispatchGroup: l, programUniforms: p } = e.getRunData(t), f = r.length === 0 ? u.map((w, I) => I) : r; if (f.length !== u.length) throw new Error(`Output size ${f.length} must be equal to ${u.length}.`); let h = [], g = []; for (let w = 0; w < u.length; ++w) { if (!Number.isInteger(f[w]) || f[w] < -3 || f[w] >= n) throw new Error(`Invalid output index: ${f[w]}`); if (f[w] === -3) continue; let I = f[w] === -1, T = f[w] === -2, E = I || T ? a(u[w].dataType, u[w].dims) : i(f[w], u[w].dataType, u[w].dims); if (h.push(E), E.data === 0) continue; let C = this.gpuDataManager.get(E.data); if (!C) throw new Error(`no GPU data for output: ${E.data}`); if (I && this.temporaryData.push(C), T) { let A = this.kernelPersistentData.get(this.currentKernelId); A || (A = [], this.kernelPersistentData.set(this.currentKernelId, A)), A.push(C) } g.push(C) } if (s.length !== t.length || g.length !== h.length) { if (g.length === 0) return Je(e.name), h; throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`) } let y; if (p) { let w = 0, I = []; p.forEach(A => { let x = typeof A.data == "number" ? [A.data] : A.data; if (x.length === 0) return; let M = A.type === 10 ? 2 : 4, D, H; A.type === 10 ? (H = x.length > 4 ? 16 : x.length > 2 ? 8 : x.length * M, D = x.length > 4 ? 16 : M * x.length) : (H = x.length <= 2 ? x.length * M : 16, D = 16), w = Math.ceil(w / H) * H, I.push(w); let F = A.type === 10 ? 8 : 4; w += x.length > 4 ? Math.ceil(x.length / F) * D : x.length * M }); let T = 16; w = Math.ceil(w / T) * T; let E = new ArrayBuffer(w); p.forEach((A, x) => { let M = I[x], D = typeof A.data == "number" ? [A.data] : A.data; if (A.type === 6) new Int32Array(E, M, D.length).set(D); else if (A.type === 12) new Uint32Array(E, M, D.length).set(D); else if (A.type === 10) new Uint16Array(E, M, D.length).set(D); else if (A.type === 1) new Float32Array(E, M, D.length).set(D); else throw new Error(`Unsupported uniform type: ${ut(A.type)}`) }); let C = this.gpuDataManager.create(w, GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM); this.device.queue.writeBuffer(C.buffer, 0, E, 0, w), this.gpuDataManager.release(C.id), y = { offset: 0, size: w, buffer: C.buffer } } let _ = this.programManager.normalizeDispatchGroupSize(l), b = _[1] === 1 && _[2] === 1, S = Wd(e, t, b), v = this.programManager.getArtifact(S); if (v || (v = this.programManager.build(e, _), this.programManager.setArtifact(S, v), de("info", () => `[artifact] key: ${S}, programName: ${e.name}`)), p && v.uniformVariablesInfo) { if (p.length !== v.uniformVariablesInfo.length) throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${p.length} in program "${v.programInfo.name}".`); for (let w = 0; w < p.length; w++) { let I = p[w], T = I.type, E = typeof I.data == "number" ? 1 : I.data.length, [C, A] = v.uniformVariablesInfo[w]; if (T !== C || E !== A) throw new Error(`Uniform variable ${w} mismatch: expect type ${C} with size ${A}, got type ${T} with size ${E} in program "${v.programInfo.name}".`) } } if (de("info", () => `[ProgramManager] run "${e.name}" (key=${S}) with ${_[0]}x${_[1]}x${_[2]}`), this.queryType !== "none" || this.sessionStatus === "capturing") { let w = { kernelId: this.currentKernelId, programName: v.programInfo.name, inputTensorViews: t, outputTensorViews: h }; this.pendingKernels.push(w), this.sessionStatus === "capturing" && this.capturedPendingKernels.get(this.currentSessionId).push(w) } return this.programManager.run(v, s, g, _, y), Je(e.name), h } upload(e, t) { this.gpuDataManager.upload(e, t) } memcpy(e, t) { this.gpuDataManager.memcpy(e, t) } async download(e, t) { await this.gpuDataManager.download(e, t) } alloc(e) { return this.gpuDataManager.create(e).id } free(e) { return this.gpuDataManager.release(e) } createKernel(e, t, r, i) { let a = gf.get(e); if (!a) throw new Error(`kernel not implemented: ${e}`); let n = { kernelType: e, kernelName: i, kernelEntry: a[0], attributes: [a[1], r] }; this.kernels.set(t, n) } releaseKernel(e) { let t = this.kernelPersistentData.get(e); if (t) { for (let r of t) this.gpuDataManager.release(r.id); this.kernelPersistentData.delete(e) } this.kernelCustomData.delete(e), this.kernels.delete(e) } computeKernel(e, t, r) { let i = this.kernels.get(e); if (!i) throw new Error(`kernel not created: ${e}`); let a = i.kernelType, n = i.kernelName, s = i.kernelEntry, u = i.attributes; if (this.currentKernelId !== null) throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`); this.currentKernelId = e, u[0] && (u[1] = u[0](u[1]), u[0] = void 0), de("info", () => `[WebGPU] Start to run kernel "[${a}] ${n}"...`); let l = this.env.debug; this.temporaryData = []; try { return l && this.device.pushErrorScope("validation"), s(t, u[1]), 0 } catch (p) { return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${p}`)), 1 } finally { l && r.push(this.device.popErrorScope().then(p => p ? `GPU validation error for kernel "[${a}] ${n}": ${p.message}` : null)); for (let p of this.temporaryData) this.gpuDataManager.release(p.id); this.temporaryData = [], this.currentKernelId = null } } registerBuffer(e, t, r, i) { let a = this.sessionExternalDataMapping.get(e); a || (a = new Map, this.sessionExternalDataMapping.set(e, a)); let n = a.get(t), s = this.gpuDataManager.registerExternalBuffer(r, i, n); return a.set(t, [s, r]), s } unregisterBuffers(e) { let t = this.sessionExternalDataMapping.get(e); t && (t.forEach(r => this.gpuDataManager.unregisterExternalBuffer(r[0])), this.sessionExternalDataMapping.delete(e)) } getBuffer(e) { let t = this.gpuDataManager.get(e); if (!t) throw new Error(`no GPU data for buffer: ${e}`); return t.buffer } createDownloader(e, t, r) { return async () => { let i = await Oa(this, e, t); return rn(i.buffer, r) } } writeTimestamp(e) { this.queryType === "inside-passes" && this.computePassEncoder.writeTimestamp(this.querySet, e) } setQueryType() { var e; this.queryType = "none", (((e = this.env.webgpu.profiling) == null ? void 0 : e.mode) === "default" || (typeof this.env.trace > "u" ? this.env.wasm.trace : this.env.trace)) && (this.device.features.has("chromium-experimental-timestamp-query-inside-passes") ? this.queryType = "inside-passes" : this.device.features.has("timestamp-query") && (this.queryType = "at-passes"), this.queryType !== "none" && typeof this.querySet > "u" && (this.querySet = this.device.createQuerySet({ type: "timestamp", count: this.maxDispatchNumber * 2 }), this.queryResolveBuffer = this.device.createBuffer({ size: this.maxDispatchNumber * 2 * 8, usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.QUERY_RESOLVE }))) } captureBegin() { de("info", "captureBegin"), this.capturedCommandList.get(this.currentSessionId) || this.capturedCommandList.set(this.currentSessionId, []), this.capturedPendingKernels.get(this.currentSessionId) || this.capturedPendingKernels.set(this.currentSessionId, []), this.flush(), this.sessionStatus = "capturing" } captureEnd() { de("info", "captureEnd"), this.flush(), this.sessionStatus = "default" } replay() { de("info", "replay"), this.sessionStatus = "replaying"; let e = this.capturedCommandList.get(this.currentSessionId), t = this.capturedPendingKernels.get(this.currentSessionId), r = e.length; this.pendingKernels = []; for (let i = 0; i < r; i++) { let a = this.getComputePassEncoder(), n = e[i]; this.writeTimestamp(this.pendingDispatchNumber * 2), a.setPipeline(n.computePipeline), a.setBindGroup(0, n.bindGroup), a.dispatchWorkgroups(...n.dispatchGroup), this.writeTimestamp(this.pendingDispatchNumber * 2 + 1), this.pendingDispatchNumber++, this.queryType !== "none" && this.pendingKernels.push(t[i]), (this.pendingDispatchNumber >= this.maxDispatchNumber || this.queryType === "at-passes") && this.endComputePass(), this.pendingDispatchNumber >= this.maxDispatchNumber && this.flush() } this.flush(), this.sessionStatus = "default" } onCreateSession() { this.gpuDataManager.onCreateSession() } onReleaseSession(e) { this.unregisterBuffers(e), this.capturedCommandList.has(e) && this.capturedCommandList.delete(e), this.capturedPendingKernels.has(e) && this.capturedPendingKernels.delete(e), this.gpuDataManager.onReleaseSession(e) } onRunStart(e) { this.currentSessionId = e, this.setQueryType() } } }), wf = {}; jt(wf, { init: () => $f }); var Wr, Gd, $f, cy = U(() => { te(), lt(), ie(), w0(), Wr = class vf { constructor(t, r, i, a) { this.module = t, this.dataType = r, this.data = i, this.dims = a } getFloat32Array() { if (this.dataType !== 1) throw new Error("Invalid data type"); let t = O.size(this.dims); return t === 0 ? new Float32Array : new Float32Array(this.module.HEAP8.buffer, this.data, t) } getBigInt64Array() { if (this.dataType !== 7) throw new Error("Invalid data type"); let t = O.size(this.dims); return t === 0 ? new BigInt64Array : new BigInt64Array(this.module.HEAP8.buffer, this.data, t) } getInt32Array() { if (this.dataType !== 6) throw new Error("Invalid data type"); let t = O.size(this.dims); return t === 0 ? new Int32Array : new Int32Array(this.module.HEAP8.buffer, this.data, t) } getUint16Array() { if (this.dataType !== 10 && this.dataType !== 4) throw new Error("Invalid data type"); let t = O.size(this.dims); return t === 0 ? new Uint16Array : new Uint16Array(this.module.HEAP8.buffer, this.data, t) } reshape(t) { if (O.size(t) !== O.size(this.dims)) throw new Error("Invalid new shape"); return new vf(this.module, this.dataType, this.data, t) } }, Gd = class { constructor(e, t, r) { this.module = e, this.backend = t, this.customDataOffset = 0, this.customDataSize = 0, this.adapterInfo = t.adapterInfo; let i = e.PTR_SIZE, a = r / e.PTR_SIZE, n = i === 4 ? "i32" : "i64"; this.opKernelContext = Number(e.getValue(i * a++, n)); let s = Number(e.getValue(i * a++, n)); this.outputCount = Number(e.getValue(i * a++, n)), this.customDataOffset = Number(e.getValue(i * a++, "*")), this.customDataSize = Number(e.getValue(i * a++, n)); let u = []; for (let l = 0; l < s; l++) { let p = Number(e.getValue(i * a++, n)), f = Number(e.getValue(i * a++, "*")), h = Number(e.getValue(i * a++, n)), g = []; for (let y = 0; y < h; y++)g.push(Number(e.getValue(i * a++, n))); u.push(new Wr(e, p, f, g)) } this.inputs = u } get kernelCustomData() { return this.backend.currentKernelCustomData } get customDataBuffer() { return this.module.HEAPU8.subarray(this.customDataOffset, this.customDataOffset + this.customDataSize) } compute(e, t) { var s; let r = ((s = t == null ? void 0 : t.inputs) == null ? void 0 : s.map(u => typeof u == "number" ? this.inputs[u] : u)) ?? this.inputs, i = (t == null ? void 0 : t.outputs) ?? [], a = (u, l, p) => new Wr(this.module, l, this.output(u, p), p), n = (u, l) => { let p = Ct(u, l); if (!p) throw new Error(`Unsupported data type: ${u}`); let f = p > 0 ? this.backend.gpuDataManager.create(p).id : 0; return new Wr(this.module, u, f, l) }; return this.backend.run(e, r, i, a, n, this.outputCount) } output(e, t) { let r = this.module.stackSave(); try { let i = this.module.PTR_SIZE, a = i === 4 ? "i32" : "i64", n = this.module.stackAlloc((1 + t.length) * i); this.module.setValue(n, t.length, a); for (let s = 0; s < t.length; s++)this.module.setValue(n + i * (s + 1), t[s], a); return this.module._JsepOutput(this.opKernelContext, e, n) } catch (i) { throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`) } finally { this.module.stackRestore(r) } } }, $f = async (e, t, r, i) => { let a = t.jsepInit; if (!a) throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support."); if (e === "webgpu") { let n = (py(), yr(_f)).WebGpuBackend, s = new n; await s.initialize(r, i), a("webgpu", [s, u => s.alloc(Number(u)), u => s.free(u), (u, l, p, f = !1) => { if (f) de("verbose", () => `[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(p)}`), s.memcpy(Number(u), Number(l)); else { de("verbose", () => `[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(p)}`); let h = t.HEAPU8.subarray(Number(u >>> 0), Number(u >>> 0) + Number(p)); s.upload(Number(l), h) } }, async (u, l, p) => { de("verbose", () => `[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${p}`), await s.download(Number(u), () => t.HEAPU8.subarray(Number(l) >>> 0, Number(l + p) >>> 0)) }, (u, l, p) => s.createKernel(u, Number(l), p, t.UTF8ToString(t._JsepGetNodeName(Number(l)))), u => s.releaseKernel(u), (u, l, p, f) => { de("verbose", () => `[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${l}`); let h = new Gd(t, s, Number(l)); return s.computeKernel(Number(u), h, f) }, () => s.captureBegin(), () => s.captureEnd(), () => s.replay()]) } else { let n = new Ap(r); a("webnn", [n, () => n.reserveTensorId(), s => n.releaseTensorId(s), async (s, u, l, p, f) => n.ensureTensor(s, u, l, p, f), (s, u) => { n.uploadTensor(s, u) }, async (s, u) => n.downloadTensor(s, u), (s, u) => n.registerMLContext(s, u), !!r.trace]) } } }), Hd, fn, mn, yt, Fd, xa, ai, gn, yn, Sa, _n, bn, wn, xf = U(() => { Ge(), y0(), _0(), te(), Dt(), Qa(), kp(), Hd = (e, t) => { _e()._OrtInit(e, t) !== 0 && ge("Can't initialize onnxruntime.") }, fn = async e => { Hd(e.wasm.numThreads, Jr(e.logLevel)) }, mn = async (e, t) => { var i, a; (a = (i = _e()).asyncInit) == null || a.call(i); let r = e.webgpu.adapter; if (t === "webgpu") { if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment"); if (r) { if (typeof r.limits != "object" || typeof r.features != "object" || typeof r.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.") } else { let n = e.webgpu.powerPreference; if (n !== void 0 && n !== "low-power" && n !== "high-performance") throw new Error(`Invalid powerPreference setting: "${n}"`); let s = e.webgpu.forceFallbackAdapter; if (s !== void 0 && typeof s != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`); if (r = await navigator.gpu.requestAdapter({ powerPreference: n, forceFallbackAdapter: s }), !r) throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.') } } if (t === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw new Error("WebNN is not supported in current environment"); { let n = (cy(), yr(wf)).init; t === "webgpu" && await n("webgpu", _e(), e, r), t === "webnn" && await n("webnn", _e(), e) } }, yt = new Map, Fd = e => { let t = _e(), r = t.stackSave(); try { let i = t.PTR_SIZE, a = t.stackAlloc(2 * i); t._OrtGetInputOutputCount(e, a, a + i) !== 0 && ge("Can't get session input/output count."); let n = i === 4 ? "i32" : "i64"; return [Number(t.getValue(a, n)), Number(t.getValue(a + i, n))] } finally { t.stackRestore(r) } }, xa = (e, t) => { let r = _e(), i = r.stackSave(), a = 0; try { let n = r.PTR_SIZE, s = r.stackAlloc(2 * n); r._OrtGetInputOutputMetadata(e, t, s, s + n) !== 0 && ge("Can't get session input/output metadata."); let u = Number(r.getValue(s, "*")); a = Number(r.getValue(s + n, "*")); let l = r.HEAP32[a / 4]; if (l === 0) return [u, 0]; let p = r.HEAPU32[a / 4 + 1], f = []; for (let h = 0; h < p; h++) { let g = Number(r.getValue(a + 8 + h * n, "*")); f.push(g !== 0 ? r.UTF8ToString(g) : Number(r.getValue(a + 8 + (h + p) * n, "*"))) } return [u, l, f] } finally { r.stackRestore(i), a !== 0 && r._OrtFree(a) } }, ai = e => { let t = _e(), r = t._malloc(e.byteLength); if (r === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`); return t.HEAPU8.set(e, r), [r, e.byteLength] }, gn = async (e, t) => { var h, g, y, _; let r, i, a = _e(); Array.isArray(e) ? [r, i] = e : e.buffer === a.HEAPU8.buffer ? [r, i] = [e.byteOffset, e.byteLength] : [r, i] = ai(e); let n = 0, s = 0, u = 0, l = [], p = [], f = []; try { if ([s, l] = await Sp(t), (t == null ? void 0 : t.externalData) && a.mountExternalData) { let x = []; for (let M of t.externalData) { let D = typeof M == "string" ? M : M.path; x.push(en(typeof M == "string" ? M : M.data).then(H => { a.mountExternalData(D, H) })) } await Promise.all(x) } for (let x of (t == null ? void 0 : t.executionProviders) ?? []) if ((typeof x == "string" ? x : x.name) === "webnn") { if (a.shouldTransferToMLTensor = !1, typeof x != "string") { let M = x, D = M == null ? void 0 : M.context, H = M == null ? void 0 : M.gpuDevice, F = M == null ? void 0 : M.deviceType, j = M == null ? void 0 : M.powerPreference; D ? a.currentContext = D : H ? a.currentContext = await a.webnnCreateMLContext(H) : a.currentContext = await a.webnnCreateMLContext({ deviceType: F, powerPreference: j }) } else a.currentContext = await a.webnnCreateMLContext(); break } n = await a._OrtCreateSession(r, i, s), (h = a.webgpuOnCreateSession) == null || h.call(a, n), n === 0 && ge("Can't create a session."), (g = a.jsepOnCreateSession) == null || g.call(a), a.currentContext && (a.webnnRegisterMLContext(n, a.currentContext), a.currentContext = void 0, a.shouldTransferToMLTensor = !0); let [b, S] = Fd(n), v = !!(t != null && t.enableGraphCapture), w = [], I = [], T = [], E = [], C = []; for (let x = 0; x < b; x++) { let [M, D, H] = xa(n, x); M === 0 && ge("Can't get an input name."), p.push(M); let F = a.UTF8ToString(M); w.push(F), T.push(D === 0 ? { name: F, isTensor: !1 } : { name: F, isTensor: !0, type: ut(D), shape: H }) } for (let x = 0; x < S; x++) { let [M, D, H] = xa(n, x + b); M === 0 && ge("Can't get an output name."), f.push(M); let F = a.UTF8ToString(M); I.push(F), E.push(D === 0 ? { name: F, isTensor: !1 } : { name: F, isTensor: !0, type: ut(D), shape: H }); { if (v && (t == null ? void 0 : t.preferredOutputLocation) === void 0) { C.push("gpu-buffer"); continue } let j = typeof (t == null ? void 0 : t.preferredOutputLocation) == "string" ? t.preferredOutputLocation : ((y = t == null ? void 0 : t.preferredOutputLocation) == null ? void 0 : y[F]) ?? "cpu", R = a.webnnIsGraphOutput; if (j === "cpu" && R && R(n, F)) { C.push("ml-tensor-cpu-output"); continue } if (j !== "cpu" && j !== "cpu-pinned" && j !== "gpu-buffer" && j !== "ml-tensor") throw new Error(`Not supported preferred output location: ${j}.`); if (v && j !== "gpu-buffer") throw new Error(`Not supported preferred output location: ${j}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`); C.push(j) } } let A = null; return C.some(x => x === "gpu-buffer" || x === "ml-tensor" || x === "ml-tensor-cpu-output") && (u = a._OrtCreateBinding(n), u === 0 && ge("Can't create IO binding."), A = { handle: u, outputPreferredLocations: C, outputPreferredLocationsEncoded: C.map(x => x === "ml-tensor-cpu-output" ? "ml-tensor" : x).map(x => Ca(x)) }), yt.set(n, [n, p, f, A, v, !1]), [n, w, I, T, E] } catch (b) { throw p.forEach(S => a._OrtFree(S)), f.forEach(S => a._OrtFree(S)), u !== 0 && a._OrtReleaseBinding(u) !== 0 && ge("Can't release IO binding."), n !== 0 && a._OrtReleaseSession(n) !== 0 && ge("Can't release session."), b } finally { a._free(r), s !== 0 && a._OrtReleaseSessionOptions(s) !== 0 && ge("Can't release session options."), l.forEach(b => a._free(b)), (_ = a.unmountExternalData) == null || _.call(a) } }, yn = e => { var l, p, f; let t = _e(), r = yt.get(e); if (!r) throw new Error(`cannot release session. invalid session id: ${e}`); let [i, a, n, s, u] = r; s && (u && t._OrtClearBoundOutputs(s.handle) !== 0 && ge("Can't clear bound outputs."), t._OrtReleaseBinding(s.handle) !== 0 && ge("Can't release IO binding.")), (l = t.jsepOnReleaseSession) == null || l.call(t, e), (p = t.webnnOnReleaseSession) == null || p.call(t, e), (f = t.webgpuOnReleaseSession) == null || f.call(t, e), a.forEach(h => t._OrtFree(h)), n.forEach(h => t._OrtFree(h)), t._OrtReleaseSession(i) !== 0 && ge("Can't release session."), yt.delete(e) }, Sa = async (e, t, r, i, a, n, s = !1) => { if (!e) { t.push(0); return } let u = _e(), l = u.PTR_SIZE, p = e[0], f = e[1], h = e[3], g = h, y, _; if (p === "string" && (h === "gpu-buffer" || h === "ml-tensor")) throw new Error("String tensor is not supported on GPU."); if (s && h !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`); if (h === "gpu-buffer") { let v = e[2].gpuBuffer; _ = Ct(zt(p), f); { let w = u.jsepRegisterBuffer; if (!w) throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.'); y = w(i, n, v, _) } } else if (h === "ml-tensor") { let v = e[2].mlTensor; _ = Ct(zt(p), f); let w = u.webnnRegisterMLTensor; if (!w) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.'); y = w(i, v, zt(p), f) } else { let v = e[2]; if (Array.isArray(v)) { _ = l * v.length, y = u._malloc(_), r.push(y); for (let w = 0; w < v.length; w++) { if (typeof v[w] != "string") throw new TypeError(`tensor data at index ${w} is not a string`); u.setValue(y + w * l, Qe(v[w], r), "*") } } else { let w = u.webnnIsGraphInput, I = u.webnnIsGraphOutput; if (p !== "string" && w && I) { let T = u.UTF8ToString(a); if (w(i, T) || I(i, T)) { let E = zt(p); _ = Ct(E, f), g = "ml-tensor"; let C = u.webnnCreateTemporaryTensor, A = u.webnnUploadTensor; if (!C || !A) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.'); let x = await C(i, E, f); A(x, new Uint8Array(v.buffer, v.byteOffset, v.byteLength)), y = x } else _ = v.byteLength, y = u._malloc(_), r.push(y), u.HEAPU8.set(new Uint8Array(v.buffer, v.byteOffset, _), y) } else _ = v.byteLength, y = u._malloc(_), r.push(y), u.HEAPU8.set(new Uint8Array(v.buffer, v.byteOffset, _), y) } } let b = u.stackSave(), S = u.stackAlloc(4 * f.length); try { f.forEach((w, I) => u.setValue(S + I * l, w, l === 4 ? "i32" : "i64")); let v = u._OrtCreateTensor(zt(p), y, _, S, f.length, Ca(g)); v === 0 && ge(`Can't create tensor for input/output. session=${i}, index=${n}.`), t.push(v) } finally { u.stackRestore(b) } }, _n = async (e, t, r, i, a, n) => { var F, j, R, K; let s = _e(), u = s.PTR_SIZE, l = yt.get(e); if (!l) throw new Error(`cannot run inference. invalid session id: ${e}`); let p = l[0], f = l[1], h = l[2], g = l[3], y = l[4], _ = l[5], b = t.length, S = i.length, v = 0, w = [], I = [], T = [], E = [], C = [], A = s.stackSave(), x = s.stackAlloc(b * u), M = s.stackAlloc(b * u), D = s.stackAlloc(S * u), H = s.stackAlloc(S * u); try { [v, w] = xp(n), At("wasm prepareInputOutputTensor"); for (let W = 0; W < b; W++)await Sa(r[W], I, E, e, f[t[W]], t[W], y); for (let W = 0; W < S; W++)await Sa(a[W], T, E, e, h[i[W]], b + i[W], y); Ot("wasm prepareInputOutputTensor"); for (let W = 0; W < b; W++)s.setValue(x + W * u, I[W], "*"), s.setValue(M + W * u, f[t[W]], "*"); for (let W = 0; W < S; W++)s.setValue(D + W * u, T[W], "*"), s.setValue(H + W * u, h[i[W]], "*"); if (g && !_) { let { handle: W, outputPreferredLocations: ue, outputPreferredLocationsEncoded: P } = g; if (f.length !== b) throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${f.length}).`); At("wasm bindInputsOutputs"); for (let V = 0; V < b; V++) { let Z = t[V]; await s._OrtBindInput(W, f[Z], I[V]) !== 0 && ge(`Can't bind input[${V}] for session=${e}.`) } for (let V = 0; V < S; V++) { let Z = i[V]; (F = a[V]) != null && F[3] ? (C.push(T[V]), s._OrtBindOutput(W, h[Z], T[V], 0) !== 0 && ge(`Can't bind pre-allocated output[${V}] for session=${e}.`)) : s._OrtBindOutput(W, h[Z], 0, P[Z]) !== 0 && ge(`Can't bind output[${V}] to ${ue[V]} for session=${e}.`) } Ot("wasm bindInputsOutputs"), yt.set(e, [p, f, h, g, y, !0]) } (j = s.jsepOnRunStart) == null || j.call(s, p), (R = s.webnnOnRunStart) == null || R.call(s, p); let X; g ? X = await s._OrtRunWithBinding(p, g.handle, S, D, v) : X = await s._OrtRun(p, M, x, b, H, S, D, v), X !== 0 && ge("failed to call OrtRun()."); let ee = [], he = []; At("wasm ProcessOutputTensor"); for (let W = 0; W < S; W++) { let ue = Number(s.getValue(D + W * u, "*")); if (ue === T[W] || C.includes(T[W])) { ee.push(a[W]), ue !== T[W] && s._OrtReleaseTensor(ue) !== 0 && ge("Can't release tensor."); continue } let P = s.stackSave(), V = s.stackAlloc(4 * u), Z = !1, q, me = 0; try { s._OrtGetTensorData(ue, V, V + u, V + 2 * u, V + 3 * u) !== 0 && ge(`Can't access output tensor data on index ${W}.`); let We = u === 4 ? "i32" : "i64", Se = Number(s.getValue(V, We)); me = s.getValue(V + u, "*"); let Oe = s.getValue(V + u * 2, "*"), Re = Number(s.getValue(V + u * 3, We)), De = []; for (let be = 0; be < Re; be++)De.push(Number(s.getValue(Oe + be * u, We))); s._OrtFree(Oe) !== 0 && ge("Can't free memory for tensor dims."); let Be = De.reduce((be, re) => be * re, 1); q = ut(Se); let dt = g == null ? void 0 : g.outputPreferredLocations[i[W]]; if (q === "string") { if (dt === "gpu-buffer" || dt === "ml-tensor") throw new Error("String tensor is not supported on GPU."); let be = []; for (let re = 0; re < Be; re++) { let Ue = s.getValue(me + re * u, "*"), br = s.getValue(me + (re + 1) * u, "*"), Kt = re === Be - 1 ? void 0 : br - Ue; be.push(s.UTF8ToString(Ue, Kt)) } ee.push([q, De, be, "cpu"]) } else if (dt === "gpu-buffer" && Be > 0) { let be = s.jsepGetBuffer; if (!be) throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.'); let re = be(me), Ue = Ct(Se, Be); if (Ue === void 0 || !Ya(q)) throw new Error(`Unsupported data type: ${q}`); Z = !0, ee.push([q, De, { gpuBuffer: re, download: s.jsepCreateDownloader(re, Ue, q), dispose: () => { s._OrtReleaseTensor(ue) !== 0 && ge("Can't release tensor.") } }, "gpu-buffer"]) } else if (dt === "ml-tensor" && Be > 0) { let be = s.webnnEnsureTensor, re = s.webnnIsGraphInputOutputTypeSupported; if (!be || !re) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.'); if (Ct(Se, Be) === void 0 || !Ja(q)) throw new Error(`Unsupported data type: ${q}`); if (!re(e, q, !1)) throw new Error(`preferredLocation "ml-tensor" for ${q} output is not supported by current WebNN Context.`); let Ue = await be(e, me, Se, De, !1); Z = !0, ee.push([q, De, { mlTensor: Ue, download: s.webnnCreateMLTensorDownloader(me, q), dispose: () => { s.webnnReleaseTensorId(me), s._OrtReleaseTensor(ue) } }, "ml-tensor"]) } else if (dt === "ml-tensor-cpu-output" && Be > 0) { let be = s.webnnCreateMLTensorDownloader(me, q)(), re = ee.length; Z = !0, he.push((async () => { let Ue = [re, await be]; return s.webnnReleaseTensorId(me), s._OrtReleaseTensor(ue), Ue })()), ee.push([q, De, [], "cpu"]) } else { let be = ni(q), re = new be(Be); new Uint8Array(re.buffer, re.byteOffset, re.byteLength).set(s.HEAPU8.subarray(me, me + re.byteLength)), ee.push([q, De, re, "cpu"]) } } finally { s.stackRestore(P), q === "string" && me && s._free(me), Z || s._OrtReleaseTensor(ue) } } g && !y && (s._OrtClearBoundOutputs(g.handle) !== 0 && ge("Can't clear bound outputs."), yt.set(e, [p, f, h, g, y, !1])); for (let [W, ue] of await Promise.all(he)) ee[W][2] = ue; return Ot("wasm ProcessOutputTensor"), ee } finally { (K = s.webnnOnRunEnd) == null || K.call(s, p), s.stackRestore(A), I.forEach(X => s._OrtReleaseTensor(X)), T.forEach(X => s._OrtReleaseTensor(X)), E.forEach(X => s._free(X)), v !== 0 && s._OrtReleaseRunOptions(v), w.forEach(X => s._free(X)) } }, bn = e => { let t = _e(), r = yt.get(e); if (!r) throw new Error("invalid session id"); let i = r[0], a = t._OrtEndProfiling(i); a === 0 && ge("Can't get an profile file name."), t._OrtFree(a) }, wn = e => { let t = []; for (let r of e) { let i = r[2]; !Array.isArray(i) && "buffer" in i && t.push(i.buffer) } return t } }), _t, Ne, Lt, ur, lr, Vr, ka, Gr, Tt, It, jd, Sf, kf, Tf, If, Ef, zf, Cf, Af = U(() => { Ge(), xf(), Dt(), Xa(), _t = () => !!$e.wasm.proxy && typeof document < "u", Lt = !1, ur = !1, lr = !1, Gr = new Map, Tt = (e, t) => { let r = Gr.get(e); r ? r.push(t) : Gr.set(e, [t]) }, It = () => { if (Lt || !ur || lr || !Ne) throw new Error("worker not ready") }, jd = e => { switch (e.data.type) { case "init-wasm": Lt = !1, e.data.err ? (lr = !0, ka[1](e.data.err)) : (ur = !0, ka[0]()), Vr && (URL.revokeObjectURL(Vr), Vr = void 0); break; case "init-ep": case "copy-from": case "create": case "release": case "run": case "end-profiling": { let t = Gr.get(e.data.type); e.data.err ? t.shift()[1](e.data.err) : t.shift()[0](e.data.out); break } } }, Sf = async () => { if (!ur) { if (Lt) throw new Error("multiple calls to 'initWasm()' detected."); if (lr) throw new Error("previous call to 'initWasm()' failed."); if (Lt = !0, _t()) return new Promise((e, t) => { Ne == null || Ne.terminate(), $p().then(([r, i]) => { try { Ne = i, Ne.onerror = n => t(n), Ne.onmessage = jd, ka = [e, t]; let a = { type: "init-wasm", in: $e }; !a.in.wasm.wasmPaths && (r || za) && (a.in.wasm.wasmPaths = { wasm: new URL("/assets/ort-wasm-simd-threaded.jsep-B5xtfCw5.wasm", "").href }), Ne.postMessage(a), Vr = r } catch (a) { t(a) } }, t) }); try { await Za($e.wasm), await fn($e), ur = !0 } catch (e) { throw lr = !0, e } finally { Lt = !1 } } }, kf = async e => { if (_t()) return It(), new Promise((t, r) => { Tt("init-ep", [t, r]); let i = { type: "init-ep", in: { epName: e, env: $e } }; Ne.postMessage(i) }); await mn($e, e) }, Tf = async e => _t() ? (It(), new Promise((t, r) => { Tt("copy-from", [t, r]); let i = { type: "copy-from", in: { buffer: e } }; Ne.postMessage(i, [e.buffer]) })) : ai(e), If = async (e, t) => { if (_t()) { if (t != null && t.preferredOutputLocation) throw new Error('session option "preferredOutputLocation" is not supported for proxy.'); return It(), new Promise((r, i) => { Tt("create", [r, i]); let a = { type: "create", in: { model: e, options: { ...t } } }, n = []; e instanceof Uint8Array && n.push(e.buffer), Ne.postMessage(a, n) }) } else return gn(e, t) }, Ef = async e => { if (_t()) return It(), new Promise((t, r) => { Tt("release", [t, r]); let i = { type: "release", in: e }; Ne.postMessage(i) }); yn(e) }, zf = async (e, t, r, i, a, n) => { if (_t()) { if (r.some(s => s[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy."); if (a.some(s => s)) throw new Error("pre-allocated output tensor is not supported for proxy."); return It(), new Promise((s, u) => { Tt("run", [s, u]); let l = r, p = { type: "run", in: { sessionId: e, inputIndices: t, inputs: l, outputIndices: i, options: n } }; Ne.postMessage(p, wn(l)) }) } else return _n(e, t, r, i, a, n) }, Cf = async e => { if (_t()) return It(), new Promise((t, r) => { Tt("end-profiling", [t, r]); let i = { type: "end-profiling", in: e }; Ne.postMessage(i) }); bn(e) } }), Ta, Kd, Of, hy = U(() => { Ge(), Af(), te(), Ka(), kp(), Ta = (e, t) => { switch (e.location) { case "cpu": return [e.type, e.dims, e.data, "cpu"]; case "gpu-buffer": return [e.type, e.dims, { gpuBuffer: e.gpuBuffer }, "gpu-buffer"]; case "ml-tensor": return [e.type, e.dims, { mlTensor: e.mlTensor }, "ml-tensor"]; default: throw new Error(`invalid data location: ${e.location} for ${t()}`) } }, Kd = e => { switch (e[3]) { case "cpu": return new Ye(e[0], e[2], e[1]); case "gpu-buffer": { let t = e[0]; if (!Ya(t)) throw new Error(`not supported data type: ${t} for deserializing GPU tensor`); let { gpuBuffer: r, download: i, dispose: a } = e[2]; return Ye.fromGpuBuffer(r, { dataType: t, dims: e[1], download: i, dispose: a }) } case "ml-tensor": { let t = e[0]; if (!Ja(t)) throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`); let { mlTensor: r, download: i, dispose: a } = e[2]; return Ye.fromMLTensor(r, { dataType: t, dims: e[1], download: i, dispose: a }) } default: throw new Error(`invalid data location: ${e[3]}`) } }, Of = class { async fetchModelAndCopyToWasmMemory(e) { return Tf(await en(e)) } async loadModel(e, t) { at(); let r; typeof e == "string" ? r = await this.fetchModelAndCopyToWasmMemory(e) : r = e, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await If(r, t), Je() } async dispose() { return Ef(this.sessionId) } async run(e, t, r) { at(); let i = [], a = []; Object.entries(e).forEach(h => { let g = h[0], y = h[1], _ = this.inputNames.indexOf(g); if (_ === -1) throw new Error(`invalid input '${g}'`); i.push(y), a.push(_) }); let n = [], s = []; Object.entries(t).forEach(h => { let g = h[0], y = h[1], _ = this.outputNames.indexOf(g); if (_ === -1) throw new Error(`invalid output '${g}'`); n.push(y), s.push(_) }); let u = i.map((h, g) => Ta(h, () => `input "${this.inputNames[a[g]]}"`)), l = n.map((h, g) => h ? Ta(h, () => `output "${this.outputNames[s[g]]}"`) : null), p = await zf(this.sessionId, a, u, s, l, r), f = {}; for (let h = 0; h < p.length; h++)f[this.outputNames[s[h]]] = n[h] ?? Kd(p[h]); return Je(), f } startProfiling() { } endProfiling() { Cf(this.sessionId) } } }), Rf = {}; jt(Rf, { OnnxruntimeWebAssemblyBackend: () => Ga, initializeFlags: () => Va, wasmBackend: () => Bf }); var Va, Ga, Bf, fy = U(() => { Ge(), Af(), hy(), Va = () => { (typeof $e.wasm.initTimeout != "number" || $e.wasm.initTimeout < 0) && ($e.wasm.initTimeout = 0); let e = $e.wasm.simd; if (typeof e != "boolean" && e !== void 0 && e !== "fixed" && e !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`), $e.wasm.simd = !1), typeof $e.wasm.proxy != "boolean" && ($e.wasm.proxy = !1), typeof $e.wasm.trace != "boolean" && ($e.wasm.trace = !1), typeof $e.wasm.numThreads != "number" || !Number.isInteger($e.wasm.numThreads) || $e.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) $e.wasm.numThreads = 1; else { let t = typeof navigator > "u" ? Jg("node:os").cpus().length : navigator.hardwareConcurrency; $e.wasm.numThreads = Math.min(4, Math.ceil((t || 1) / 2)) } }, Ga = class { async init(e) { Va(), await Sf(), await kf(e) } async createInferenceSessionHandler(e, t) { let r = new Of; return await r.loadModel(e, t), r } }, Bf = new Ga }); Ge(); Ge(); Ge(); var my = "1.25.1"; { let e = (fy(), yr(Rf)).wasmBackend; Vt("webgpu", e, 5), Vt("webnn", e, 5), Vt("cpu", e, 10), Vt("wasm", e, 10) } Object.defineProperty($e.versions, "web", { value: my, enumerable: !0 });/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gy = ["person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat", "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "couch", "potted plant", "bed", "dining table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone", "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"]; let mr = null; $e.wasm.wasmPaths = chrome.runtime.getURL("assets/"); async function yy() { if (!mr) try { const e = chrome.runtime.getURL("src/models/yolov8n.onnx"); mr = await ja.create(e), console.log("CommentX: YOLO model loaded") } catch (e) { console.error("CommentX: Failed to load YOLO model", e) } } async function _y(e) { if (!mr || !e) return []; try { const t = e.width, r = e.height, i = e.data, a = new Float32Array(3 * 640 * 640); for (let h = 0; h < 3; h++)for (let g = 0; g < r; g++)for (let y = 0; y < t; y++)if (y < 640 && g < 640) { const _ = (g * t + y) * 4, b = h * 640 * 640 + g * 640 + y; a[b] = i[_ + h] / 255 } const n = new Ye("float32", a, [1, 3, 640, 640]), u = (await mr.run({ images: n }))[mr.outputNames[0]].data, l = [], p = 80, f = 8400; for (let h = 0; h < f; h++) { let g = 0, y = -1; for (let _ = 0; _ < p; _++) { const b = u[(4 + _) * f + h]; b > g && (g = b, y = _) } if (g > .4) { const _ = u[0 * f + h], b = u[1 * f + h], S = u[2 * f + h], v = u[3 * f + h]; l.push({ label: gy[y], confidence: g, bbox: [_ - S / 2, b - v / 2, S, v] }) } } return l } catch (t) { return console.error("CommentX: YOLO inference failed", t), [] } } let Hr = []; async function by({ base64Frame: e, detections: t, mode: r, customPrompt: i, proxyUrl: a, authToken: n }) { try { const s = await fetch(`${a}/api/commentary`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${n}` }, body: JSON.stringify({ frame: e, detections: t, context: Hr, mode: r, customPrompt: i }) }); if (!s.ok) throw new Error(`Proxy error: ${s.status}`); const p = ((await s.json()).commentary || "").trim(); return p ? (Hr.push(p), Hr.length > 10 && Hr.shift(), p) : null } catch (s) { return console.error("CommentX: generateCommentary failed", s), null } } let Nf = .5; function Ia(e) { Nf = e } function wy(e, t) { e && (e.dataset.originalVolume === void 0 && (e.dataset.originalVolume = e.volume), e.volume = t) } function Xd(e) { !e || e.dataset.originalVolume === void 0 || (e.volume = parseFloat(e.dataset.originalVolume), delete e.dataset.originalVolume) } let Fr = !1; async function $y(e, t, r, i, a) { if (!(!e || Fr)) return Fr = !0, new Promise(n => { window.speechSynthesis.cancel(), wy(a, .25); const s = new SpeechSynthesisUtterance(e); s.volume = Nf, s.rate = 1.05, s.pitch = 1; const u = window.speechSynthesis.getVoices(), l = u.find(p => p.lang.startsWith("en") && (p.name.includes("Google") || p.name.includes("Microsoft") || p.name.includes("Natural"))) || u.find(p => p.lang.startsWith("en")) || u[0]; l && (s.voice = l), s.onend = () => { Xd(a), Fr = !1, n() }, s.onerror = () => { Xd(a), Fr = !1, n() }, window.speechSynthesis.speak(s) }) } let Te = { enabled: !1, mode: "sports", volume: 50, proxyUrl: "", authToken: "", customPrompt: "", voiceId: "21m00Tcm4TlvDq8ikWAM" }, Rt = null, Wt = null, gr = null, jr = !1; async function vy() { const e = await new Promise(i => { chrome.runtime.sendMessage({ type: "GET_SETTINGS" }, i) }); e && (Te = { ...Te, ...e }), Ia(Te.volume / 100); const { videoEl: t, playerType: r } = await Fg(); Wt = t, console.log(`CommentX: Found ${r} video`), yy().catch(i => console.log("CommentX YOLO load error:", i)), gr = Xg(t, { mode: Te.mode, volume: Te.volume }, i => { Te.enabled = i, chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings: { enabled: i } }), i ? Ea() : Zd() }, i => { Te.mode = i, chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings: { mode: i } }) }, i => { Te.volume = i, Ia(i / 100), chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings: { volume: i } }) }), chrome.runtime.onMessage.addListener(i => { i.type === "SETTINGS_UPDATED" && (Te = { ...Te, ...i.settings }, Ia(Te.volume / 100), Te.enabled && !Rt ? Ea() : !Te.enabled && Rt && Zd()) }), Te.enabled && Ea() } function Ea() { Rt || (gr.setStatus("active"), Rt = setInterval(async () => { if (!jr && !(Wt.paused || Wt.ended)) { jr = !0; try { const e = Kg(Wt), t = jg(Wt); let r = []; if (t && (r = await _y(t)), !e) { jr = !1; return } const i = await by({ base64Frame: e, detections: r, mode: Te.mode, customPrompt: Te.customPrompt, proxyUrl: Te.proxyUrl, authToken: Te.authToken }); i && (gr.showCommentary(i), await $y(i, Te.voiceId, Te.proxyUrl, Te.authToken, Wt)) } catch (e) { console.error("CommentX pipeline error:", e), gr.setStatus("error") } finally { jr = !1 } } }, 8e3)) } function Zd() { Rt && (clearInterval(Rt), Rt = null), gr.setStatus("off") } vy();
