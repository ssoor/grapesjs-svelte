/*!
 * Chart.js v3.7.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */
const sn = function() {
  return typeof window > "u" ? function(i) {
    return i();
  } : window.requestAnimationFrame;
}();
function nn(i, t, e) {
  const s = e || ((r) => Array.prototype.slice.call(r));
  let n = !1, o = [];
  return function(...r) {
    o = s(r), n || (n = !0, sn.call(window, () => {
      n = !1, i.apply(t, o);
    }));
  };
}
function eo(i, t) {
  let e;
  return function(...s) {
    return t ? (clearTimeout(e), e = setTimeout(i, t, s)) : i.apply(this, s), t;
  };
}
const yi = (i) => i === "start" ? "left" : i === "end" ? "right" : "center", X = (i, t, e) => i === "start" ? t : i === "end" ? e : (t + e) / 2, io = (i, t, e, s) => i === (s ? "left" : "right") ? e : i === "center" ? (t + e) / 2 : t;
function lt() {
}
const so = function() {
  let i = 0;
  return function() {
    return i++;
  };
}();
function T(i) {
  return i === null || typeof i > "u";
}
function B(i) {
  if (Array.isArray && Array.isArray(i))
    return !0;
  const t = Object.prototype.toString.call(i);
  return t.substr(0, 7) === "[object" && t.substr(-6) === "Array]";
}
function O(i) {
  return i !== null && Object.prototype.toString.call(i) === "[object Object]";
}
const N = (i) => (typeof i == "number" || i instanceof Number) && isFinite(+i);
function J(i, t) {
  return N(i) ? i : t;
}
function P(i, t) {
  return typeof i > "u" ? t : i;
}
const no = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 : i / t, on = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 * t : +i;
function z(i, t, e) {
  if (i && typeof i.call == "function")
    return i.apply(e, t);
}
function E(i, t, e, s) {
  let n, o, r;
  if (B(i))
    if (o = i.length, s)
      for (n = o - 1; n >= 0; n--)
        t.call(e, i[n], n);
    else
      for (n = 0; n < o; n++)
        t.call(e, i[n], n);
  else if (O(i))
    for (r = Object.keys(i), o = r.length, n = 0; n < o; n++)
      t.call(e, i[r[n]], r[n]);
}
function ke(i, t) {
  let e, s, n, o;
  if (!i || !t || i.length !== t.length)
    return !1;
  for (e = 0, s = i.length; e < s; ++e)
    if (n = i[e], o = t[e], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function Se(i) {
  if (B(i))
    return i.map(Se);
  if (O(i)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(i), s = e.length;
    let n = 0;
    for (; n < s; ++n)
      t[e[n]] = Se(i[e[n]]);
    return t;
  }
  return i;
}
function rn(i) {
  return ["__proto__", "prototype", "constructor"].indexOf(i) === -1;
}
function oo(i, t, e, s) {
  if (!rn(i))
    return;
  const n = t[i], o = e[i];
  O(n) && O(o) ? Qt(n, o, s) : t[i] = Se(o);
}
function Qt(i, t, e) {
  const s = B(t) ? t : [t], n = s.length;
  if (!O(i))
    return i;
  e = e || {};
  const o = e.merger || oo;
  for (let r = 0; r < n; ++r) {
    if (t = s[r], !O(t))
      continue;
    const a = Object.keys(t);
    for (let l = 0, c = a.length; l < c; ++l)
      o(a[l], i, t, e);
  }
  return i;
}
function Kt(i, t) {
  return Qt(i, t, { merger: ro });
}
function ro(i, t, e) {
  if (!rn(i))
    return;
  const s = t[i], n = e[i];
  O(s) && O(n) ? Kt(s, n) : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = Se(n));
}
const ao = "", lo = ".";
function ji(i, t) {
  const e = i.indexOf(lo, t);
  return e === -1 ? i.length : e;
}
function wt(i, t) {
  if (t === ao)
    return i;
  let e = 0, s = ji(t, e);
  for (; i && s > e; )
    i = i[t.substr(e, s - e)], e = s + 1, s = ji(t, e);
  return i;
}
function vi(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
const tt = (i) => typeof i < "u", gt = (i) => typeof i == "function", $i = (i, t) => {
  if (i.size !== t.size)
    return !1;
  for (const e of i)
    if (!t.has(e))
      return !1;
  return !0;
};
function co(i) {
  return i.type === "mouseup" || i.type === "click" || i.type === "contextmenu";
}
const V = Math.PI, I = 2 * V, ho = I + V, Pe = Number.POSITIVE_INFINITY, fo = V / 180, W = V / 2, Bt = V / 4, Yi = V * 2 / 3, Q = Math.log10, at = Math.sign;
function Xi(i) {
  const t = Math.round(i);
  i = qt(i, t, i / 1e3) ? t : i;
  const e = Math.pow(10, Math.floor(Q(i))), s = i / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * e;
}
function uo(i) {
  const t = [], e = Math.sqrt(i);
  let s;
  for (s = 1; s < e; s++)
    i % s === 0 && (t.push(s), t.push(i / s));
  return e === (e | 0) && t.push(e), t.sort((n, o) => n - o).pop(), t;
}
function te(i) {
  return !isNaN(parseFloat(i)) && isFinite(i);
}
function qt(i, t, e) {
  return Math.abs(i - t) < e;
}
function go(i, t) {
  const e = Math.round(i);
  return e - t <= i && e + t >= i;
}
function an(i, t, e) {
  let s, n, o;
  for (s = 0, n = i.length; s < n; s++)
    o = i[s][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function it(i) {
  return i * (V / 180);
}
function Mi(i) {
  return i * (180 / V);
}
function Ui(i) {
  if (!N(i))
    return;
  let t = 1, e = 0;
  for (; Math.round(i * t) / t !== i; )
    t *= 10, e++;
  return e;
}
function ln(i, t) {
  const e = t.x - i.x, s = t.y - i.y, n = Math.sqrt(e * e + s * s);
  let o = Math.atan2(s, e);
  return o < -0.5 * V && (o += I), {
    angle: o,
    distance: n
  };
}
function ci(i, t) {
  return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}
function po(i, t) {
  return (i - t + ho) % I - V;
}
function G(i) {
  return (i % I + I) % I;
}
function ee(i, t, e, s) {
  const n = G(i), o = G(t), r = G(e), a = G(o - n), l = G(r - n), c = G(n - o), h = G(n - r);
  return n === o || n === r || s && o === r || a > l && c < h;
}
function $(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function mo(i) {
  return $(i, -32768, 32767);
}
function ht(i, t, e, s = 1e-6) {
  return i >= Math.min(t, e) - s && i <= Math.max(t, e) + s;
}
const de = (i) => i === 0 || i === 1, Ki = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin((i - t) * I / e)), qi = (i, t, e) => Math.pow(2, -10 * i) * Math.sin((i - t) * I / e) + 1, Gt = {
  linear: (i) => i,
  easeInQuad: (i) => i * i,
  easeOutQuad: (i) => -i * (i - 2),
  easeInOutQuad: (i) => (i /= 0.5) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1),
  easeInCubic: (i) => i * i * i,
  easeOutCubic: (i) => (i -= 1) * i * i + 1,
  easeInOutCubic: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2),
  easeInQuart: (i) => i * i * i * i,
  easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
  easeInOutQuart: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2),
  easeInQuint: (i) => i * i * i * i * i,
  easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
  easeInOutQuint: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i * i : 0.5 * ((i -= 2) * i * i * i * i + 2),
  easeInSine: (i) => -Math.cos(i * W) + 1,
  easeOutSine: (i) => Math.sin(i * W),
  easeInOutSine: (i) => -0.5 * (Math.cos(V * i) - 1),
  easeInExpo: (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)),
  easeOutExpo: (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1,
  easeInOutExpo: (i) => de(i) ? i : i < 0.5 ? 0.5 * Math.pow(2, 10 * (i * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
  easeInCirc: (i) => i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
  easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
  easeInOutCirc: (i) => (i /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - i * i) - 1) : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
  easeInElastic: (i) => de(i) ? i : Ki(i, 0.075, 0.3),
  easeOutElastic: (i) => de(i) ? i : qi(i, 0.075, 0.3),
  easeInOutElastic(i) {
    return de(i) ? i : i < 0.5 ? 0.5 * Ki(i * 2, 0.1125, 0.45) : 0.5 + 0.5 * qi(i * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(i) {
    return i * i * ((1.70158 + 1) * i - 1.70158);
  },
  easeOutBack(i) {
    return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1;
  },
  easeInOutBack(i) {
    let t = 1.70158;
    return (i /= 0.5) < 1 ? 0.5 * (i * i * (((t *= 1.525) + 1) * i - t)) : 0.5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
  },
  easeInBounce: (i) => 1 - Gt.easeOutBounce(1 - i),
  easeOutBounce(i) {
    return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
  },
  easeInOutBounce: (i) => i < 0.5 ? Gt.easeInBounce(i * 2) * 0.5 : Gt.easeOutBounce(i * 2 - 1) * 0.5 + 0.5
};
/*!
 * @kurkle/color v0.1.9
 * https://github.com/kurkle/color#readme
 * (c) 2020 Jukka Kurkela
 * Released under the MIT License
 */
const Z = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, hi = "0123456789ABCDEF", bo = (i) => hi[i & 15], xo = (i) => hi[(i & 240) >> 4] + hi[i & 15], fe = (i) => (i & 240) >> 4 === (i & 15);
function _o(i) {
  return fe(i.r) && fe(i.g) && fe(i.b) && fe(i.a);
}
function yo(i) {
  var t = i.length, e;
  return i[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & Z[i[1]] * 17,
    g: 255 & Z[i[2]] * 17,
    b: 255 & Z[i[3]] * 17,
    a: t === 5 ? Z[i[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: Z[i[1]] << 4 | Z[i[2]],
    g: Z[i[3]] << 4 | Z[i[4]],
    b: Z[i[5]] << 4 | Z[i[6]],
    a: t === 9 ? Z[i[7]] << 4 | Z[i[8]] : 255
  })), e;
}
function vo(i) {
  var t = _o(i) ? bo : xo;
  return i && "#" + t(i.r) + t(i.g) + t(i.b) + (i.a < 255 ? t(i.a) : "");
}
function ne(i) {
  return i + 0.5 | 0;
}
const Ie = (i, t, e) => Math.max(Math.min(i, e), t);
function $t(i) {
  return Ie(ne(i * 2.55), 0, 255);
}
function ie(i) {
  return Ie(ne(i * 255), 0, 255);
}
function wi(i) {
  return Ie(ne(i / 2.55) / 100, 0, 1);
}
function Gi(i) {
  return Ie(ne(i * 100), 0, 100);
}
const Mo = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function wo(i) {
  const t = Mo.exec(i);
  let e = 255, s, n, o;
  if (t) {
    if (t[7] !== s) {
      const r = +t[7];
      e = 255 & (t[8] ? $t(r) : r * 255);
    }
    return s = +t[1], n = +t[3], o = +t[5], s = 255 & (t[2] ? $t(s) : s), n = 255 & (t[4] ? $t(n) : n), o = 255 & (t[6] ? $t(o) : o), {
      r: s,
      g: n,
      b: o,
      a: e
    };
  }
}
function ko(i) {
  return i && (i.a < 255 ? `rgba(${i.r}, ${i.g}, ${i.b}, ${wi(i.a)})` : `rgb(${i.r}, ${i.g}, ${i.b})`);
}
const So = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function cn(i, t, e) {
  const s = t * Math.min(e, 1 - e), n = (o, r = (o + i / 30) % 12) => e - s * Math.max(Math.min(r - 3, 9 - r, 1), -1);
  return [n(0), n(8), n(4)];
}
function Po(i, t, e) {
  const s = (n, o = (n + i / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function Co(i, t, e) {
  const s = cn(i, 1, 0.5);
  let n;
  for (t + e > 1 && (n = 1 / (t + e), t *= n, e *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - e, s[n] += t;
  return s;
}
function ki(i) {
  const e = i.r / 255, s = i.g / 255, n = i.b / 255, o = Math.max(e, s, n), r = Math.min(e, s, n), a = (o + r) / 2;
  let l, c, h;
  return o !== r && (h = o - r, c = a > 0.5 ? h / (2 - o - r) : h / (o + r), l = o === e ? (s - n) / h + (s < n ? 6 : 0) : o === s ? (n - e) / h + 2 : (e - s) / h + 4, l = l * 60 + 0.5), [l | 0, c || 0, a];
}
function Si(i, t, e, s) {
  return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, s)).map(ie);
}
function Pi(i, t, e) {
  return Si(cn, i, t, e);
}
function Do(i, t, e) {
  return Si(Co, i, t, e);
}
function Oo(i, t, e) {
  return Si(Po, i, t, e);
}
function hn(i) {
  return (i % 360 + 360) % 360;
}
function Ao(i) {
  const t = So.exec(i);
  let e = 255, s;
  if (!t)
    return;
  t[5] !== s && (e = t[6] ? $t(+t[5]) : ie(+t[5]));
  const n = hn(+t[2]), o = +t[3] / 100, r = +t[4] / 100;
  return t[1] === "hwb" ? s = Do(n, o, r) : t[1] === "hsv" ? s = Oo(n, o, r) : s = Pi(n, o, r), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: e
  };
}
function Lo(i, t) {
  var e = ki(i);
  e[0] = hn(e[0] + t), e = Pi(e), i.r = e[0], i.g = e[1], i.b = e[2];
}
function To(i) {
  if (!i)
    return;
  const t = ki(i), e = t[0], s = Gi(t[1]), n = Gi(t[2]);
  return i.a < 255 ? `hsla(${e}, ${s}%, ${n}%, ${wi(i.a)})` : `hsl(${e}, ${s}%, ${n}%)`;
}
const Zi = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, Ji = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function Ro() {
  const i = {}, t = Object.keys(Ji), e = Object.keys(Zi);
  let s, n, o, r, a;
  for (s = 0; s < t.length; s++) {
    for (r = a = t[s], n = 0; n < e.length; n++)
      o = e[n], a = a.replace(o, Zi[o]);
    o = parseInt(Ji[r], 16), i[a] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return i;
}
let ue;
function Eo(i) {
  ue || (ue = Ro(), ue.transparent = [0, 0, 0, 0]);
  const t = ue[i.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
function ge(i, t, e) {
  if (i) {
    let s = ki(i);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * e, t === 0 ? 360 : 1)), s = Pi(s), i.r = s[0], i.g = s[1], i.b = s[2];
  }
}
function dn(i, t) {
  return i && Object.assign(t || {}, i);
}
function Qi(i) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(i) ? i.length >= 3 && (t = { r: i[0], g: i[1], b: i[2], a: 255 }, i.length > 3 && (t.a = ie(i[3]))) : (t = dn(i, { r: 0, g: 0, b: 0, a: 1 }), t.a = ie(t.a)), t;
}
function Fo(i) {
  return i.charAt(0) === "r" ? wo(i) : Ao(i);
}
class Ce {
  constructor(t) {
    if (t instanceof Ce)
      return t;
    const e = typeof t;
    let s;
    e === "object" ? s = Qi(t) : e === "string" && (s = yo(t) || Eo(t) || Fo(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = dn(this._rgb);
    return t && (t.a = wi(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Qi(t);
  }
  rgbString() {
    return this._valid ? ko(this._rgb) : this._rgb;
  }
  hexString() {
    return this._valid ? vo(this._rgb) : this._rgb;
  }
  hslString() {
    return this._valid ? To(this._rgb) : this._rgb;
  }
  mix(t, e) {
    const s = this;
    if (t) {
      const n = s.rgb, o = t.rgb;
      let r;
      const a = e === r ? 0.5 : e, l = 2 * a - 1, c = n.a - o.a, h = ((l * c === -1 ? l : (l + c) / (1 + l * c)) + 1) / 2;
      r = 1 - h, n.r = 255 & h * n.r + r * o.r + 0.5, n.g = 255 & h * n.g + r * o.g + 0.5, n.b = 255 & h * n.b + r * o.b + 0.5, n.a = a * n.a + (1 - a) * o.a, s.rgb = n;
    }
    return s;
  }
  clone() {
    return new Ce(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = ie(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = ne(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = e, this;
  }
  opaquer(t) {
    const e = this._rgb;
    return e.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return ge(this._rgb, 2, t), this;
  }
  darken(t) {
    return ge(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ge(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ge(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Lo(this._rgb, t), this;
  }
}
function fn(i) {
  return new Ce(i);
}
const un = (i) => i instanceof CanvasGradient || i instanceof CanvasPattern;
function ts(i) {
  return un(i) ? i : fn(i);
}
function Ze(i) {
  return un(i) ? i : fn(i).saturate(0.5).darken(0.1).hexString();
}
const kt = /* @__PURE__ */ Object.create(null), di = /* @__PURE__ */ Object.create(null);
function Zt(i, t) {
  if (!t)
    return i;
  const e = t.split(".");
  for (let s = 0, n = e.length; s < n; ++s) {
    const o = e[s];
    i = i[o] || (i[o] = /* @__PURE__ */ Object.create(null));
  }
  return i;
}
function Je(i, t, e) {
  return typeof t == "string" ? Qt(Zt(i, t), e) : Qt(Zt(i, ""), t);
}
class Io {
  constructor(t) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (e) => e.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (e, s) => Ze(s.backgroundColor), this.hoverBorderColor = (e, s) => Ze(s.borderColor), this.hoverColor = (e, s) => Ze(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t);
  }
  set(t, e) {
    return Je(this, t, e);
  }
  get(t) {
    return Zt(this, t);
  }
  describe(t, e) {
    return Je(di, t, e);
  }
  override(t, e) {
    return Je(kt, t, e);
  }
  route(t, e, s, n) {
    const o = Zt(this, t), r = Zt(this, s), a = "_" + e;
    Object.defineProperties(o, {
      [a]: {
        value: o[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const l = this[a], c = r[n];
          return O(l) ? Object.assign({}, c, l) : P(l, c);
        },
        set(l) {
          this[a] = l;
        }
      }
    });
  }
}
var D = new Io({
  _scriptable: (i) => !i.startsWith("on"),
  _indexable: (i) => i !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
});
function zo(i) {
  return !i || T(i.size) || T(i.family) ? null : (i.style ? i.style + " " : "") + (i.weight ? i.weight + " " : "") + i.size + "px " + i.family;
}
function De(i, t, e, s, n) {
  let o = t[n];
  return o || (o = t[n] = i.measureText(n).width, e.push(n)), o > s && (s = o), s;
}
function Bo(i, t, e, s) {
  s = s || {};
  let n = s.data = s.data || {}, o = s.garbageCollect = s.garbageCollect || [];
  s.font !== t && (n = s.data = {}, o = s.garbageCollect = [], s.font = t), i.save(), i.font = t;
  let r = 0;
  const a = e.length;
  let l, c, h, d, f;
  for (l = 0; l < a; l++)
    if (d = e[l], d != null && B(d) !== !0)
      r = De(i, n, o, r, d);
    else if (B(d))
      for (c = 0, h = d.length; c < h; c++)
        f = d[c], f != null && !B(f) && (r = De(i, n, o, r, f));
  i.restore();
  const u = o.length / 2;
  if (u > e.length) {
    for (l = 0; l < u; l++)
      delete n[o[l]];
    o.splice(0, u);
  }
  return r;
}
function _t(i, t, e) {
  const s = i.currentDevicePixelRatio, n = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function es(i, t) {
  t = t || i.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, i.width, i.height), t.restore();
}
function Oe(i, t, e, s) {
  let n, o, r, a, l;
  const c = t.pointStyle, h = t.rotation, d = t.radius;
  let f = (h || 0) * fo;
  if (c && typeof c == "object" && (n = c.toString(), n === "[object HTMLImageElement]" || n === "[object HTMLCanvasElement]")) {
    i.save(), i.translate(e, s), i.rotate(f), i.drawImage(c, -c.width / 2, -c.height / 2, c.width, c.height), i.restore();
    return;
  }
  if (!(isNaN(d) || d <= 0)) {
    switch (i.beginPath(), c) {
      default:
        i.arc(e, s, d, 0, I), i.closePath();
        break;
      case "triangle":
        i.moveTo(e + Math.sin(f) * d, s - Math.cos(f) * d), f += Yi, i.lineTo(e + Math.sin(f) * d, s - Math.cos(f) * d), f += Yi, i.lineTo(e + Math.sin(f) * d, s - Math.cos(f) * d), i.closePath();
        break;
      case "rectRounded":
        l = d * 0.516, a = d - l, o = Math.cos(f + Bt) * a, r = Math.sin(f + Bt) * a, i.arc(e - o, s - r, l, f - V, f - W), i.arc(e + r, s - o, l, f - W, f), i.arc(e + o, s + r, l, f, f + W), i.arc(e - r, s + o, l, f + W, f + V), i.closePath();
        break;
      case "rect":
        if (!h) {
          a = Math.SQRT1_2 * d, i.rect(e - a, s - a, 2 * a, 2 * a);
          break;
        }
        f += Bt;
      case "rectRot":
        o = Math.cos(f) * d, r = Math.sin(f) * d, i.moveTo(e - o, s - r), i.lineTo(e + r, s - o), i.lineTo(e + o, s + r), i.lineTo(e - r, s + o), i.closePath();
        break;
      case "crossRot":
        f += Bt;
      case "cross":
        o = Math.cos(f) * d, r = Math.sin(f) * d, i.moveTo(e - o, s - r), i.lineTo(e + o, s + r), i.moveTo(e + r, s - o), i.lineTo(e - r, s + o);
        break;
      case "star":
        o = Math.cos(f) * d, r = Math.sin(f) * d, i.moveTo(e - o, s - r), i.lineTo(e + o, s + r), i.moveTo(e + r, s - o), i.lineTo(e - r, s + o), f += Bt, o = Math.cos(f) * d, r = Math.sin(f) * d, i.moveTo(e - o, s - r), i.lineTo(e + o, s + r), i.moveTo(e + r, s - o), i.lineTo(e - r, s + o);
        break;
      case "line":
        o = Math.cos(f) * d, r = Math.sin(f) * d, i.moveTo(e - o, s - r), i.lineTo(e + o, s + r);
        break;
      case "dash":
        i.moveTo(e, s), i.lineTo(e + Math.cos(f) * d, s + Math.sin(f) * d);
        break;
    }
    i.fill(), t.borderWidth > 0 && i.stroke();
  }
}
function St(i, t, e) {
  return e = e || 0.5, !t || i && i.x > t.left - e && i.x < t.right + e && i.y > t.top - e && i.y < t.bottom + e;
}
function ze(i, t) {
  i.save(), i.beginPath(), i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), i.clip();
}
function Be(i) {
  i.restore();
}
function Vo(i, t, e, s, n) {
  if (!t)
    return i.lineTo(e.x, e.y);
  if (n === "middle") {
    const o = (t.x + e.x) / 2;
    i.lineTo(o, t.y), i.lineTo(o, e.y);
  } else
    n === "after" != !!s ? i.lineTo(t.x, e.y) : i.lineTo(e.x, t.y);
  i.lineTo(e.x, e.y);
}
function Wo(i, t, e, s) {
  if (!t)
    return i.lineTo(e.x, e.y);
  i.bezierCurveTo(
    s ? t.cp1x : t.cp2x,
    s ? t.cp1y : t.cp2y,
    s ? e.cp2x : e.cp1x,
    s ? e.cp2y : e.cp1y,
    e.x,
    e.y
  );
}
function Pt(i, t, e, s, n, o = {}) {
  const r = B(t) ? t : [t], a = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (i.save(), i.font = n.string, No(i, o), l = 0; l < r.length; ++l)
    c = r[l], a && (o.strokeColor && (i.strokeStyle = o.strokeColor), T(o.strokeWidth) || (i.lineWidth = o.strokeWidth), i.strokeText(c, e, s, o.maxWidth)), i.fillText(c, e, s, o.maxWidth), Ho(i, e, s, c, o), s += n.lineHeight;
  i.restore();
}
function No(i, t) {
  t.translation && i.translate(t.translation[0], t.translation[1]), T(t.rotation) || i.rotate(t.rotation), t.color && (i.fillStyle = t.color), t.textAlign && (i.textAlign = t.textAlign), t.textBaseline && (i.textBaseline = t.textBaseline);
}
function Ho(i, t, e, s, n) {
  if (n.strikethrough || n.underline) {
    const o = i.measureText(s), r = t - o.actualBoundingBoxLeft, a = t + o.actualBoundingBoxRight, l = e - o.actualBoundingBoxAscent, c = e + o.actualBoundingBoxDescent, h = n.strikethrough ? (l + c) / 2 : c;
    i.strokeStyle = i.fillStyle, i.beginPath(), i.lineWidth = n.decorationWidth || 2, i.moveTo(r, h), i.lineTo(a, h), i.stroke();
  }
}
function Ae(i, t) {
  const { x: e, y: s, w: n, h: o, radius: r } = t;
  i.arc(e + r.topLeft, s + r.topLeft, r.topLeft, -W, V, !0), i.lineTo(e, s + o - r.bottomLeft), i.arc(e + r.bottomLeft, s + o - r.bottomLeft, r.bottomLeft, V, W, !0), i.lineTo(e + n - r.bottomRight, s + o), i.arc(e + n - r.bottomRight, s + o - r.bottomRight, r.bottomRight, W, 0, !0), i.lineTo(e + n, s + r.topRight), i.arc(e + n - r.topRight, s + r.topRight, r.topRight, 0, -W, !0), i.lineTo(e + r.topLeft, s);
}
const jo = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/), $o = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);
function Yo(i, t) {
  const e = ("" + i).match(jo);
  if (!e || e[1] === "normal")
    return t * 1.2;
  switch (i = +e[2], e[3]) {
    case "px":
      return i;
    case "%":
      i /= 100;
      break;
  }
  return t * i;
}
const Xo = (i) => +i || 0;
function Ci(i, t) {
  const e = {}, s = O(t), n = s ? Object.keys(t) : t, o = O(i) ? s ? (r) => P(i[r], i[t[r]]) : (r) => i[r] : () => i;
  for (const r of n)
    e[r] = Xo(o(r));
  return e;
}
function gn(i) {
  return Ci(i, { top: "y", right: "x", bottom: "y", left: "x" });
}
function Ot(i) {
  return Ci(i, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
}
function U(i) {
  const t = gn(i);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function j(i, t) {
  i = i || {}, t = t || D.font;
  let e = P(i.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let s = P(i.style, t.style);
  s && !("" + s).match($o) && (console.warn('Invalid font style specified: "' + s + '"'), s = "");
  const n = {
    family: P(i.family, t.family),
    lineHeight: Yo(P(i.lineHeight, t.lineHeight), e),
    size: e,
    style: s,
    weight: P(i.weight, t.weight),
    string: ""
  };
  return n.string = zo(n), n;
}
function Yt(i, t, e, s) {
  let n = !0, o, r, a;
  for (o = 0, r = i.length; o < r; ++o)
    if (a = i[o], a !== void 0 && (t !== void 0 && typeof a == "function" && (a = a(t), n = !1), e !== void 0 && B(a) && (a = a[e % a.length], n = !1), a !== void 0))
      return s && !n && (s.cacheable = !1), a;
}
function Uo(i, t, e) {
  const { min: s, max: n } = i, o = on(t, (n - s) / 2), r = (a, l) => e && a === 0 ? 0 : a + l;
  return {
    min: r(s, -Math.abs(o)),
    max: r(n, o)
  };
}
function pt(i, t) {
  return Object.assign(Object.create(i), t);
}
function Di(i, t, e) {
  e = e || ((r) => i[r] < t);
  let s = i.length - 1, n = 0, o;
  for (; s - n > 1; )
    o = n + s >> 1, e(o) ? n = o : s = o;
  return { lo: n, hi: s };
}
const dt = (i, t, e) => Di(i, e, (s) => i[s][t] < e), Ko = (i, t, e) => Di(i, e, (s) => i[s][t] >= e);
function qo(i, t, e) {
  let s = 0, n = i.length;
  for (; s < n && i[s] < t; )
    s++;
  for (; n > s && i[n - 1] > e; )
    n--;
  return s > 0 || n < i.length ? i.slice(s, n) : i;
}
const pn = ["push", "pop", "shift", "splice", "unshift"];
function Go(i, t) {
  if (i._chartjs) {
    i._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(i, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [t]
    }
  }), pn.forEach((e) => {
    const s = "_onData" + vi(e), n = i[e];
    Object.defineProperty(i, e, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const r = n.apply(this, o);
        return i._chartjs.listeners.forEach((a) => {
          typeof a[s] == "function" && a[s](...o);
        }), r;
      }
    });
  });
}
function is(i, t) {
  const e = i._chartjs;
  if (!e)
    return;
  const s = e.listeners, n = s.indexOf(t);
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (pn.forEach((o) => {
    delete i[o];
  }), delete i._chartjs);
}
function mn(i) {
  const t = /* @__PURE__ */ new Set();
  let e, s;
  for (e = 0, s = i.length; e < s; ++e)
    t.add(i[e]);
  return t.size === s ? i : Array.from(t);
}
function Oi(i, t = [""], e = i, s, n = () => i[0]) {
  tt(s) || (s = yn("_fallback", i));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: i,
    _rootScopes: e,
    _fallback: s,
    _getTarget: n,
    override: (r) => Oi([r, ...i], t, e, s)
  };
  return new Proxy(o, {
    deleteProperty(r, a) {
      return delete r[a], delete r._keys, delete i[0][a], !0;
    },
    get(r, a) {
      return xn(
        r,
        a,
        () => nr(a, t, i, r)
      );
    },
    getOwnPropertyDescriptor(r, a) {
      return Reflect.getOwnPropertyDescriptor(r._scopes[0], a);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i[0]);
    },
    has(r, a) {
      return ns(r).includes(a);
    },
    ownKeys(r) {
      return ns(r);
    },
    set(r, a, l) {
      const c = r._storage || (r._storage = n());
      return r[a] = c[a] = l, delete r._keys, !0;
    }
  });
}
function Lt(i, t, e, s) {
  const n = {
    _cacheable: !1,
    _proxy: i,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: bn(i, s),
    setContext: (o) => Lt(i, o, e, s),
    override: (o) => Lt(i.override(o), t, e, s)
  };
  return new Proxy(n, {
    deleteProperty(o, r) {
      return delete o[r], delete i[r], !0;
    },
    get(o, r, a) {
      return xn(
        o,
        r,
        () => Jo(o, r, a)
      );
    },
    getOwnPropertyDescriptor(o, r) {
      return o._descriptors.allKeys ? Reflect.has(i, r) ? { enumerable: !0, configurable: !0 } : void 0 : Reflect.getOwnPropertyDescriptor(i, r);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i);
    },
    has(o, r) {
      return Reflect.has(i, r);
    },
    ownKeys() {
      return Reflect.ownKeys(i);
    },
    set(o, r, a) {
      return i[r] = a, delete o[r], !0;
    }
  });
}
function bn(i, t = { scriptable: !0, indexable: !0 }) {
  const { _scriptable: e = t.scriptable, _indexable: s = t.indexable, _allKeys: n = t.allKeys } = i;
  return {
    allKeys: n,
    scriptable: e,
    indexable: s,
    isScriptable: gt(e) ? e : () => e,
    isIndexable: gt(s) ? s : () => s
  };
}
const Zo = (i, t) => i ? i + vi(t) : t, Ai = (i, t) => O(t) && i !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function xn(i, t, e) {
  if (Object.prototype.hasOwnProperty.call(i, t))
    return i[t];
  const s = e();
  return i[t] = s, s;
}
function Jo(i, t, e) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: r } = i;
  let a = s[t];
  return gt(a) && r.isScriptable(t) && (a = Qo(t, a, i, e)), B(a) && a.length && (a = tr(t, a, i, r.isIndexable)), Ai(t, a) && (a = Lt(a, n, o && o[t], r)), a;
}
function Qo(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _stack: a } = e;
  if (a.has(i))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + i);
  return a.add(i), t = t(o, r || s), a.delete(i), Ai(i, t) && (t = Li(n._scopes, n, i, t)), t;
}
function tr(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _descriptors: a } = e;
  if (tt(o.index) && s(i))
    t = t[o.index % t.length];
  else if (O(t[0])) {
    const l = t, c = n._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const d = Li(c, n, i, h);
      t.push(Lt(d, o, r && r[i], a));
    }
  }
  return t;
}
function _n(i, t, e) {
  return gt(i) ? i(t, e) : i;
}
const er = (i, t) => i === !0 ? t : typeof i == "string" ? wt(t, i) : void 0;
function ir(i, t, e, s, n) {
  for (const o of t) {
    const r = er(e, o);
    if (r) {
      i.add(r);
      const a = _n(r._fallback, e, n);
      if (tt(a) && a !== e && a !== s)
        return a;
    } else if (r === !1 && tt(s) && e !== s)
      return null;
  }
  return !1;
}
function Li(i, t, e, s) {
  const n = t._rootScopes, o = _n(t._fallback, e, s), r = [...i, ...n], a = /* @__PURE__ */ new Set();
  a.add(s);
  let l = ss(a, r, e, o || e, s);
  return l === null || tt(o) && o !== e && (l = ss(a, r, o, l, s), l === null) ? !1 : Oi(
    Array.from(a),
    [""],
    n,
    o,
    () => sr(t, e, s)
  );
}
function ss(i, t, e, s, n) {
  for (; e; )
    e = ir(i, t, e, s, n);
  return e;
}
function sr(i, t, e) {
  const s = i._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return B(n) && O(e) ? e : n;
}
function nr(i, t, e, s) {
  let n;
  for (const o of t)
    if (n = yn(Zo(o, i), e), tt(n))
      return Ai(i, n) ? Li(e, s, i, n) : n;
}
function yn(i, t) {
  for (const e of t) {
    if (!e)
      continue;
    const s = e[i];
    if (tt(s))
      return s;
  }
}
function ns(i) {
  let t = i._keys;
  return t || (t = i._keys = or(i._scopes)), t;
}
function or(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i)
    for (const s of Object.keys(e).filter((n) => !n.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
const rr = Number.EPSILON || 1e-14, Tt = (i, t) => t < i.length && !i[t].skip && i[t], vn = (i) => i === "x" ? "y" : "x";
function ar(i, t, e, s) {
  const n = i.skip ? t : i, o = t, r = e.skip ? t : e, a = ci(o, n), l = ci(r, o);
  let c = a / (a + l), h = l / (a + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const d = s * c, f = s * h;
  return {
    previous: {
      x: o.x - d * (r.x - n.x),
      y: o.y - d * (r.y - n.y)
    },
    next: {
      x: o.x + f * (r.x - n.x),
      y: o.y + f * (r.y - n.y)
    }
  };
}
function lr(i, t, e) {
  const s = i.length;
  let n, o, r, a, l, c = Tt(i, 0);
  for (let h = 0; h < s - 1; ++h)
    if (l = c, c = Tt(i, h + 1), !(!l || !c)) {
      if (qt(t[h], 0, rr)) {
        e[h] = e[h + 1] = 0;
        continue;
      }
      n = e[h] / t[h], o = e[h + 1] / t[h], a = Math.pow(n, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), e[h] = n * r * t[h], e[h + 1] = o * r * t[h]);
    }
}
function cr(i, t, e = "x") {
  const s = vn(e), n = i.length;
  let o, r, a, l = Tt(i, 0);
  for (let c = 0; c < n; ++c) {
    if (r = a, a = l, l = Tt(i, c + 1), !a)
      continue;
    const h = a[e], d = a[s];
    r && (o = (h - r[e]) / 3, a[`cp1${e}`] = h - o, a[`cp1${s}`] = d - o * t[c]), l && (o = (l[e] - h) / 3, a[`cp2${e}`] = h + o, a[`cp2${s}`] = d + o * t[c]);
  }
}
function hr(i, t = "x") {
  const e = vn(t), s = i.length, n = Array(s).fill(0), o = Array(s);
  let r, a, l, c = Tt(i, 0);
  for (r = 0; r < s; ++r)
    if (a = l, l = c, c = Tt(i, r + 1), !!l) {
      if (c) {
        const h = c[t] - l[t];
        n[r] = h !== 0 ? (c[e] - l[e]) / h : 0;
      }
      o[r] = a ? c ? at(n[r - 1]) !== at(n[r]) ? 0 : (n[r - 1] + n[r]) / 2 : n[r - 1] : n[r];
    }
  lr(i, n, o), cr(i, o, t);
}
function pe(i, t, e) {
  return Math.max(Math.min(i, e), t);
}
function dr(i, t) {
  let e, s, n, o, r, a = St(i[0], t);
  for (e = 0, s = i.length; e < s; ++e)
    r = o, o = a, a = e < s - 1 && St(i[e + 1], t), o && (n = i[e], r && (n.cp1x = pe(n.cp1x, t.left, t.right), n.cp1y = pe(n.cp1y, t.top, t.bottom)), a && (n.cp2x = pe(n.cp2x, t.left, t.right), n.cp2y = pe(n.cp2y, t.top, t.bottom)));
}
function fr(i, t, e, s, n) {
  let o, r, a, l;
  if (t.spanGaps && (i = i.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    hr(i, n);
  else {
    let c = s ? i[i.length - 1] : i[0];
    for (o = 0, r = i.length; o < r; ++o)
      a = i[o], l = ar(
        c,
        a,
        i[Math.min(o + 1, r - (s ? 0 : 1)) % r],
        t.tension
      ), a.cp1x = l.previous.x, a.cp1y = l.previous.y, a.cp2x = l.next.x, a.cp2y = l.next.y, c = a;
  }
  t.capBezierPoints && dr(i, e);
}
function Mn() {
  return typeof window < "u" && typeof document < "u";
}
function Ti(i) {
  let t = i.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Le(i, t, e) {
  let s;
  return typeof i == "string" ? (s = parseInt(i, 10), i.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[e])) : s = i, s;
}
const Ve = (i) => window.getComputedStyle(i, null);
function ur(i, t) {
  return Ve(i).getPropertyValue(t);
}
const gr = ["top", "right", "bottom", "left"];
function Mt(i, t, e) {
  const s = {};
  e = e ? "-" + e : "";
  for (let n = 0; n < 4; n++) {
    const o = gr[n];
    s[o] = parseFloat(i[t + "-" + o + e]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const pr = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);
function mr(i, t) {
  const e = i.native || i, s = e.touches, n = s && s.length ? s[0] : e, { offsetX: o, offsetY: r } = n;
  let a = !1, l, c;
  if (pr(o, r, e.target))
    l = o, c = r;
  else {
    const h = t.getBoundingClientRect();
    l = n.clientX - h.left, c = n.clientY - h.top, a = !0;
  }
  return { x: l, y: c, box: a };
}
function wn(i, t) {
  const { canvas: e, currentDevicePixelRatio: s } = t, n = Ve(e), o = n.boxSizing === "border-box", r = Mt(n, "padding"), a = Mt(n, "border", "width"), { x: l, y: c, box: h } = mr(i, e), d = r.left + (h && a.left), f = r.top + (h && a.top);
  let { width: u, height: g } = t;
  return o && (u -= r.width + a.width, g -= r.height + a.height), {
    x: Math.round((l - d) / u * e.width / s),
    y: Math.round((c - f) / g * e.height / s)
  };
}
function br(i, t, e) {
  let s, n;
  if (t === void 0 || e === void 0) {
    const o = Ti(i);
    if (!o)
      t = i.clientWidth, e = i.clientHeight;
    else {
      const r = o.getBoundingClientRect(), a = Ve(o), l = Mt(a, "border", "width"), c = Mt(a, "padding");
      t = r.width - c.width - l.width, e = r.height - c.height - l.height, s = Le(a.maxWidth, o, "clientWidth"), n = Le(a.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: s || Pe,
    maxHeight: n || Pe
  };
}
const Qe = (i) => Math.round(i * 10) / 10;
function xr(i, t, e, s) {
  const n = Ve(i), o = Mt(n, "margin"), r = Le(n.maxWidth, i, "clientWidth") || Pe, a = Le(n.maxHeight, i, "clientHeight") || Pe, l = br(i, t, e);
  let { width: c, height: h } = l;
  if (n.boxSizing === "content-box") {
    const d = Mt(n, "border", "width"), f = Mt(n, "padding");
    c -= f.width + d.width, h -= f.height + d.height;
  }
  return c = Math.max(0, c - o.width), h = Math.max(0, s ? Math.floor(c / s) : h - o.height), c = Qe(Math.min(c, r, l.maxWidth)), h = Qe(Math.min(h, a, l.maxHeight)), c && !h && (h = Qe(c / 2)), {
    width: c,
    height: h
  };
}
function os(i, t, e) {
  const s = t || 1, n = Math.floor(i.height * s), o = Math.floor(i.width * s);
  i.height = n / s, i.width = o / s;
  const r = i.canvas;
  return r.style && (e || !r.style.height && !r.style.width) && (r.style.height = `${i.height}px`, r.style.width = `${i.width}px`), i.currentDevicePixelRatio !== s || r.height !== n || r.width !== o ? (i.currentDevicePixelRatio = s, r.height = n, r.width = o, i.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const _r = function() {
  let i = !1;
  try {
    const t = {
      get passive() {
        return i = !0, !1;
      }
    };
    window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
  } catch {
  }
  return i;
}();
function rs(i, t) {
  const e = ur(i, t), s = e && e.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function vt(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: i.y + e * (t.y - i.y)
  };
}
function yr(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: s === "middle" ? e < 0.5 ? i.y : t.y : s === "after" ? e < 1 ? i.y : t.y : e > 0 ? t.y : i.y
  };
}
function vr(i, t, e, s) {
  const n = { x: i.cp2x, y: i.cp2y }, o = { x: t.cp1x, y: t.cp1y }, r = vt(i, n, e), a = vt(n, o, e), l = vt(o, t, e), c = vt(r, a, e), h = vt(a, l, e);
  return vt(c, h, e);
}
const as = /* @__PURE__ */ new Map();
function Mr(i, t) {
  t = t || {};
  const e = i + JSON.stringify(t);
  let s = as.get(e);
  return s || (s = new Intl.NumberFormat(i, t), as.set(e, s)), s;
}
function oe(i, t, e) {
  return Mr(t, e).format(i);
}
const wr = function(i, t) {
  return {
    x(e) {
      return i + i + t - e;
    },
    setWidth(e) {
      t = e;
    },
    textAlign(e) {
      return e === "center" ? e : e === "right" ? "left" : "right";
    },
    xPlus(e, s) {
      return e - s;
    },
    leftForLtr(e, s) {
      return e - s;
    }
  };
}, kr = function() {
  return {
    x(i) {
      return i;
    },
    setWidth(i) {
    },
    textAlign(i) {
      return i;
    },
    xPlus(i, t) {
      return i + t;
    },
    leftForLtr(i, t) {
      return i;
    }
  };
};
function At(i, t, e) {
  return i ? wr(t, e) : kr();
}
function kn(i, t) {
  let e, s;
  (t === "ltr" || t === "rtl") && (e = i.canvas.style, s = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), i.prevTextDirection = s);
}
function Sn(i, t) {
  t !== void 0 && (delete i.prevTextDirection, i.canvas.style.setProperty("direction", t[0], t[1]));
}
function Pn(i) {
  return i === "angle" ? {
    between: ee,
    compare: po,
    normalize: G
  } : {
    between: ht,
    compare: (t, e) => t - e,
    normalize: (t) => t
  };
}
function ls({ start: i, end: t, count: e, loop: s, style: n }) {
  return {
    start: i % e,
    end: t % e,
    loop: s && (t - i + 1) % e === 0,
    style: n
  };
}
function Sr(i, t, e) {
  const { property: s, start: n, end: o } = e, { between: r, normalize: a } = Pn(s), l = t.length;
  let { start: c, end: h, loop: d } = i, f, u;
  if (d) {
    for (c += l, h += l, f = 0, u = l; f < u && r(a(t[c % l][s]), n, o); ++f)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), { start: c, end: h, loop: d, style: i.style };
}
function Cn(i, t, e) {
  if (!e)
    return [i];
  const { property: s, start: n, end: o } = e, r = t.length, { compare: a, between: l, normalize: c } = Pn(s), { start: h, end: d, loop: f, style: u } = Sr(i, t, e), g = [];
  let p = !1, m = null, b, x, v;
  const y = () => l(n, v, b) && a(n, v) !== 0, _ = () => a(o, b) === 0 || l(o, v, b), w = () => p || y(), M = () => !p || _();
  for (let S = h, k = h; S <= d; ++S)
    x = t[S % r], !x.skip && (b = c(x[s]), b !== v && (p = l(b, n, o), m === null && w() && (m = a(b, n) === 0 ? S : k), m !== null && M() && (g.push(ls({ start: m, end: S, loop: f, count: r, style: u })), m = null), k = S, v = b));
  return m !== null && g.push(ls({ start: m, end: d, loop: f, count: r, style: u })), g;
}
function Dn(i, t) {
  const e = [], s = i.segments;
  for (let n = 0; n < s.length; n++) {
    const o = Cn(s[n], i.points, t);
    o.length && e.push(...o);
  }
  return e;
}
function Pr(i, t, e, s) {
  let n = 0, o = t - 1;
  if (e && !s)
    for (; n < t && !i[n].skip; )
      n++;
  for (; n < t && i[n].skip; )
    n++;
  for (n %= t, e && (o += n); o > n && i[o % t].skip; )
    o--;
  return o %= t, { start: n, end: o };
}
function Cr(i, t, e, s) {
  const n = i.length, o = [];
  let r = t, a = i[t], l;
  for (l = t + 1; l <= e; ++l) {
    const c = i[l % n];
    c.skip || c.stop ? a.skip || (s = !1, o.push({ start: t % n, end: (l - 1) % n, loop: s }), t = r = c.stop ? l : null) : (r = l, a.skip && (t = l)), a = c;
  }
  return r !== null && o.push({ start: t % n, end: r % n, loop: s }), o;
}
function Dr(i, t) {
  const e = i.points, s = i.options.spanGaps, n = e.length;
  if (!n)
    return [];
  const o = !!i._loop, { start: r, end: a } = Pr(e, n, o, s);
  if (s === !0)
    return cs(i, [{ start: r, end: a, loop: o }], e, t);
  const l = a < r ? a + n : a, c = !!i._fullLoop && r === 0 && a === n - 1;
  return cs(i, Cr(e, r, l, c), e, t);
}
function cs(i, t, e, s) {
  return !s || !s.setContext || !e ? t : Or(i, t, e, s);
}
function Or(i, t, e, s) {
  const n = i._chart.getContext(), o = hs(i.options), { _datasetIndex: r, options: { spanGaps: a } } = i, l = e.length, c = [];
  let h = o, d = t[0].start, f = d;
  function u(g, p, m, b) {
    const x = a ? -1 : 1;
    if (g !== p) {
      for (g += l; e[g % l].skip; )
        g -= x;
      for (; e[p % l].skip; )
        p += x;
      g % l !== p % l && (c.push({ start: g % l, end: p % l, loop: m, style: b }), h = b, d = p % l);
    }
  }
  for (const g of t) {
    d = a ? d : g.start;
    let p = e[d % l], m;
    for (f = d + 1; f <= g.end; f++) {
      const b = e[f % l];
      m = hs(s.setContext(pt(n, {
        type: "segment",
        p0: p,
        p1: b,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: r
      }))), Ar(m, h) && u(d, f - 1, g.loop, h), p = b, h = m;
    }
    d < f - 1 && u(d, f - 1, g.loop, h);
  }
  return c;
}
function hs(i) {
  return {
    backgroundColor: i.backgroundColor,
    borderCapStyle: i.borderCapStyle,
    borderDash: i.borderDash,
    borderDashOffset: i.borderDashOffset,
    borderJoinStyle: i.borderJoinStyle,
    borderWidth: i.borderWidth,
    borderColor: i.borderColor
  };
}
function Ar(i, t) {
  return t && JSON.stringify(i) !== JSON.stringify(t);
}
/*!
 * Chart.js v3.7.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */
class Lr {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, s, n) {
    const o = e.listeners[n], r = e.duration;
    o.forEach((a) => a({
      chart: t,
      initial: e.initial,
      numSteps: r,
      currentStep: Math.min(s - e.start, r)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = sn.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((s, n) => {
      if (!s.running || !s.items.length)
        return;
      const o = s.items;
      let r = o.length - 1, a = !1, l;
      for (; r >= 0; --r)
        l = o[r], l._active ? (l._total > s.duration && (s.duration = l._total), l.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
      a && (n.draw(), this._notify(n, s, t, "progress")), o.length || (s.running = !1, this._notify(n, s, t, "complete"), s.initial = !1), e += o.length;
    }), this._lastDate = t, e === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let s = e.get(t);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, e.set(t, s)), s;
  }
  listen(t, e, s) {
    this._getAnims(t).listeners[e].push(s);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((s, n) => Math.max(s, n._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length)
      return;
    const s = e.items;
    let n = s.length - 1;
    for (; n >= 0; --n)
      s[n].cancel();
    e.items = [], this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var ot = new Lr();
const ds = "transparent", Tr = {
  boolean(i, t, e) {
    return e > 0.5 ? t : i;
  },
  color(i, t, e) {
    const s = ts(i || ds), n = s.valid && ts(t || ds);
    return n && n.valid ? n.mix(s, e).hexString() : t;
  },
  number(i, t, e) {
    return i + (t - i) * e;
  }
};
class On {
  constructor(t, e, s, n) {
    const o = e[s];
    n = Yt([t.to, n, o, t.from]);
    const r = Yt([t.from, o, n]);
    this._active = !0, this._fn = t.fn || Tr[t.type || typeof r], this._easing = Gt[t.easing] || Gt.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = s, this._from = r, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, s) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = s - this._start, r = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Yt([t.to, e, n, t.from]), this._from = Yt([t.from, n, e]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const e = t - this._start, s = this._duration, n = this._prop, o = this._from, r = this._loop, a = this._to;
    let l;
    if (this._active = o !== a && (r || e < s), !this._active) {
      this._target[n] = a, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[n] = o;
      return;
    }
    l = e / s % 2, l = r && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(o, a, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, s) => {
      t.push({ res: e, rej: s });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej", s = this._promises || [];
    for (let n = 0; n < s.length; n++)
      s[n][e]();
  }
}
const Rr = ["x", "y", "borderWidth", "radius", "tension"], Er = ["color", "borderColor", "backgroundColor"];
D.set("animation", {
  delay: void 0,
  duration: 1e3,
  easing: "easeOutQuart",
  fn: void 0,
  from: void 0,
  loop: void 0,
  to: void 0,
  type: void 0
});
const Fr = Object.keys(D.animation);
D.describe("animation", {
  _fallback: !1,
  _indexable: !1,
  _scriptable: (i) => i !== "onProgress" && i !== "onComplete" && i !== "fn"
});
D.set("animations", {
  colors: {
    type: "color",
    properties: Er
  },
  numbers: {
    type: "number",
    properties: Rr
  }
});
D.describe("animations", {
  _fallback: "animation"
});
D.set("transitions", {
  active: {
    animation: {
      duration: 400
    }
  },
  resize: {
    animation: {
      duration: 0
    }
  },
  show: {
    animations: {
      colors: {
        from: "transparent"
      },
      visible: {
        type: "boolean",
        duration: 0
      }
    }
  },
  hide: {
    animations: {
      colors: {
        to: "transparent"
      },
      visible: {
        type: "boolean",
        easing: "linear",
        fn: (i) => i | 0
      }
    }
  }
});
class Ri {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!O(t))
      return;
    const e = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const n = t[s];
      if (!O(n))
        return;
      const o = {};
      for (const r of Fr)
        o[r] = n[r];
      (B(n.properties) && n.properties || [s]).forEach((r) => {
        (r === s || !e.has(r)) && e.set(r, o);
      });
    });
  }
  _animateOptions(t, e) {
    const s = e.options, n = zr(t, s);
    if (!n)
      return [];
    const o = this._createAnimations(n, s);
    return s.$shared && Ir(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), o;
  }
  _createAnimations(t, e) {
    const s = this._properties, n = [], o = t.$animations || (t.$animations = {}), r = Object.keys(e), a = Date.now();
    let l;
    for (l = r.length - 1; l >= 0; --l) {
      const c = r[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        n.push(...this._animateOptions(t, e));
        continue;
      }
      const h = e[c];
      let d = o[c];
      const f = s.get(c);
      if (d)
        if (f && d.active()) {
          d.update(f, h, a);
          continue;
        } else
          d.cancel();
      if (!f || !f.duration) {
        t[c] = h;
        continue;
      }
      o[c] = d = new On(f, t, c, h), n.push(d);
    }
    return n;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const s = this._createAnimations(t, e);
    if (s.length)
      return ot.add(this._chart, s), !0;
  }
}
function Ir(i, t) {
  const e = [], s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = i[s[n]];
    o && o.active() && e.push(o.wait());
  }
  return Promise.all(e);
}
function zr(i, t) {
  if (!t)
    return;
  let e = i.options;
  if (!e) {
    i.options = t;
    return;
  }
  return e.$shared && (i.options = e = Object.assign({}, e, { $shared: !1, $animations: {} })), e;
}
function fs(i, t) {
  const e = i && i.options || {}, s = e.reverse, n = e.min === void 0 ? t : 0, o = e.max === void 0 ? t : 0;
  return {
    start: s ? o : n,
    end: s ? n : o
  };
}
function Br(i, t, e) {
  if (e === !1)
    return !1;
  const s = fs(i, e), n = fs(t, e);
  return {
    top: n.end,
    right: s.end,
    bottom: n.start,
    left: s.start
  };
}
function Vr(i) {
  let t, e, s, n;
  return O(i) ? (t = i.top, e = i.right, s = i.bottom, n = i.left) : t = e = s = n = i, {
    top: t,
    right: e,
    bottom: s,
    left: n,
    disabled: i === !1
  };
}
function An(i, t) {
  const e = [], s = i._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n)
    e.push(s[n].index);
  return e;
}
function us(i, t, e, s = {}) {
  const n = i.keys, o = s.mode === "single";
  let r, a, l, c;
  if (t !== null) {
    for (r = 0, a = n.length; r < a; ++r) {
      if (l = +n[r], l === e) {
        if (s.all)
          continue;
        break;
      }
      c = i.values[l], N(c) && (o || t === 0 || at(t) === at(c)) && (t += c);
    }
    return t;
  }
}
function Wr(i) {
  const t = Object.keys(i), e = new Array(t.length);
  let s, n, o;
  for (s = 0, n = t.length; s < n; ++s)
    o = t[s], e[s] = {
      x: o,
      y: i[o]
    };
  return e;
}
function gs(i, t) {
  const e = i && i.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function Nr(i, t, e) {
  return `${i.id}.${t.id}.${e.stack || e.type}`;
}
function Hr(i) {
  const { min: t, max: e, minDefined: s, maxDefined: n } = i.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? e : Number.POSITIVE_INFINITY
  };
}
function jr(i, t, e) {
  const s = i[t] || (i[t] = {});
  return s[e] || (s[e] = {});
}
function ps(i, t, e, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = i[n.index];
    if (e && o > 0 || !e && o < 0)
      return n.index;
  }
  return null;
}
function ms(i, t) {
  const { chart: e, _cachedMeta: s } = i, n = e._stacks || (e._stacks = {}), { iScale: o, vScale: r, index: a } = s, l = o.axis, c = r.axis, h = Nr(o, r, s), d = t.length;
  let f;
  for (let u = 0; u < d; ++u) {
    const g = t[u], { [l]: p, [c]: m } = g, b = g._stacks || (g._stacks = {});
    f = b[c] = jr(n, h, p), f[a] = m, f._top = ps(f, r, !0, s.type), f._bottom = ps(f, r, !1, s.type);
  }
}
function ti(i, t) {
  const e = i.scales;
  return Object.keys(e).filter((s) => e[s].axis === t).shift();
}
function $r(i, t) {
  return pt(
    i,
    {
      active: !1,
      dataset: void 0,
      datasetIndex: t,
      index: t,
      mode: "default",
      type: "dataset"
    }
  );
}
function Yr(i, t, e) {
  return pt(i, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Vt(i, t) {
  const e = i.controller.index, s = i.vScale && i.vScale.axis;
  if (s) {
    t = t || i._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[s] === void 0 || o[s][e] === void 0)
        return;
      delete o[s][e];
    }
  }
}
const ei = (i) => i === "reset" || i === "none", bs = (i, t) => t ? i : Object.assign({}, i), Xr = (i, t, e) => i && !t.hidden && t._stacked && { keys: An(e, !0), values: null };
class st {
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.$context = void 0, this._syncList = [], this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = gs(t.vScale, t), this.addElements();
  }
  updateIndex(t) {
    this.index !== t && Vt(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, s = this.getDataset(), n = (d, f, u, g) => d === "x" ? f : d === "r" ? g : u, o = e.xAxisID = P(s.xAxisID, ti(t, "x")), r = e.yAxisID = P(s.yAxisID, ti(t, "y")), a = e.rAxisID = P(s.rAxisID, ti(t, "r")), l = e.indexAxis, c = e.iAxisID = n(l, o, r, a), h = e.vAxisID = n(l, r, o, a);
    e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(r), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(c), e.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && is(this._data, this), t._stacked && Vt(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), s = this._data;
    if (O(e))
      this._data = Wr(e);
    else if (s !== e) {
      if (s) {
        is(s, this);
        const n = this._cachedMeta;
        Vt(n), n._parsed = [];
      }
      e && Object.isExtensible(e) && Go(e, this), this._syncList = [], this._data = e;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta, s = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = e._stacked;
    e._stacked = gs(e.vScale, e), e.stack !== s.stack && (n = !0, Vt(e), e.stack = s.stack), this._resyncElements(t), (n || o !== e._stacked) && ms(this, e._parsed);
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: s, _data: n } = this, { iScale: o, _stacked: r } = s, a = o.axis;
    let l = t === 0 && e === n.length ? !0 : s._sorted, c = t > 0 && s._parsed[t - 1], h, d, f;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, f = n;
    else {
      B(n[t]) ? f = this.parseArrayData(s, n, t, e) : O(n[t]) ? f = this.parseObjectData(s, n, t, e) : f = this.parsePrimitiveData(s, n, t, e);
      const u = () => d[a] === null || c && d[a] < c[a];
      for (h = 0; h < e; ++h)
        s._parsed[h + t] = d = f[h], l && (u() && (l = !1), c = d);
      s._sorted = l;
    }
    r && ms(this, f);
  }
  parsePrimitiveData(t, e, s, n) {
    const { iScale: o, vScale: r } = t, a = o.axis, l = r.axis, c = o.getLabels(), h = o === r, d = new Array(n);
    let f, u, g;
    for (f = 0, u = n; f < u; ++f)
      g = f + s, d[f] = {
        [a]: h || o.parse(c[g], g),
        [l]: r.parse(e[g], g)
      };
    return d;
  }
  parseArrayData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, a = new Array(n);
    let l, c, h, d;
    for (l = 0, c = n; l < c; ++l)
      h = l + s, d = e[h], a[l] = {
        x: o.parse(d[0], h),
        y: r.parse(d[1], h)
      };
    return a;
  }
  parseObjectData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(n);
    let h, d, f, u;
    for (h = 0, d = n; h < d; ++h)
      f = h + s, u = e[f], c[h] = {
        x: o.parse(wt(u, a), f),
        y: r.parse(wt(u, l), f)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, s) {
    const n = this.chart, o = this._cachedMeta, r = e[t.axis], a = {
      keys: An(n, !0),
      values: e._stacks[t.axis]
    };
    return us(a, r, o.index, { mode: s });
  }
  updateRangeFromParsed(t, e, s, n) {
    const o = s[e.axis];
    let r = o === null ? NaN : o;
    const a = n && s._stacks[e.axis];
    n && a && (n.values = a, r = us(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r);
  }
  getMinMax(t, e) {
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, r = n.length, a = this._getOtherScale(t), l = Xr(e, s, this.chart), c = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }, { min: h, max: d } = Hr(a);
    let f, u;
    function g() {
      u = n[f];
      const p = u[a.axis];
      return !N(u[t.axis]) || h > p || d < p;
    }
    for (f = 0; f < r && !(!g() && (this.updateRangeFromParsed(c, t, u, l), o)); ++f)
      ;
    if (o) {
      for (f = r - 1; f >= 0; --f)
        if (!g()) {
          this.updateRangeFromParsed(c, t, u, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, s = [];
    let n, o, r;
    for (n = 0, o = e.length; n < o; ++n)
      r = e[n][t.axis], N(r) && s.push(r);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = e.iScale, n = e.vScale, o = this.getParsed(t);
    return {
      label: s ? "" + s.getLabelForValue(o[s.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"), e._clip = Vr(P(this.options.clip, Br(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, s = this._cachedMeta, n = s.data || [], o = e.chartArea, r = [], a = this._drawStart || 0, l = this._drawCount || n.length - a, c = this.options.drawActiveElementsOnTop;
    let h;
    for (s.dataset && s.dataset.draw(t, o, a, l), h = a; h < a + l; ++h) {
      const d = n[h];
      d.hidden || (d.active && c ? r.push(d) : d.draw(t, o));
    }
    for (h = 0; h < r.length; ++h)
      r[h].draw(t, o);
  }
  getStyle(t, e) {
    const s = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, e, s) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const r = this._cachedMeta.data[t];
      o = r.$context || (r.$context = Yr(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = $r(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!e, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", s) {
    const n = e === "active", o = this._cachedDataOpts, r = t + "-" + e, a = o[r], l = this.enableOptionSharing && tt(s);
    if (a)
      return bs(a, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), d = n ? [`${t}Hover`, "hover", t, ""] : [t, ""], f = c.getOptionScopes(this.getDataset(), h), u = Object.keys(D.elements[t]), g = () => this.getContext(s, n), p = c.resolveNamedOptions(f, u, g, d);
    return p.$shared && (p.$shared = l, o[r] = Object.freeze(bs(p, l))), p;
  }
  _resolveAnimations(t, e, s) {
    const n = this.chart, o = this._cachedDataOpts, r = `animation-${e}`, a = o[r];
    if (a)
      return a;
    let l;
    if (n.options.animation !== !1) {
      const h = this.chart.config, d = h.datasetAnimationScopeKeys(this._type, e), f = h.getOptionScopes(this.getDataset(), d);
      l = h.createResolver(f, this.getContext(t, s, e));
    }
    const c = new Ri(n, l && l.animations);
    return l && l._cacheable && (o[r] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || ei(t) || this.chart._animationsDisabled;
  }
  updateElement(t, e, s, n) {
    ei(n) ? Object.assign(t, s) : this._resolveAnimations(e, n).update(t, s);
  }
  updateSharedOptions(t, e, s) {
    t && !ei(e) && this._resolveAnimations(void 0, e).update(t, s);
  }
  _setStyle(t, e, s, n) {
    t.active = n;
    const o = this.getStyle(e, n);
    this._resolveAnimations(e, s, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !1);
  }
  setHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data, s = this._cachedMeta.data;
    for (const [a, l, c] of this._syncList)
      this[a](l, c);
    this._syncList = [];
    const n = s.length, o = e.length, r = Math.min(o, n);
    r && this.parse(0, r), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, e, s = !0) {
    const n = this._cachedMeta, o = n.data, r = t + e;
    let a;
    const l = (c) => {
      for (c.length += e, a = c.length - 1; a >= r; a--)
        c[a] = c[a - e];
    };
    for (l(o), a = t; a < r; ++a)
      o[a] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, e), s && this.updateElements(o, t, e, "reset");
  }
  updateElements(t, e, s, n) {
  }
  _removeElements(t, e) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const n = s._parsed.splice(t, e);
      s._stacked && Vt(s, n);
    }
    s.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [e, s, n] = t;
      this[e](s, n);
    }
    this.chart._dataChanges.push([this.index, ...t]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync(["_insertElements", this.getDataset().data.length - t, t]);
  }
  _onDataPop() {
    this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
  }
  _onDataShift() {
    this._sync(["_removeElements", 0, 1]);
  }
  _onDataSplice(t, e) {
    e && this._sync(["_removeElements", t, e]);
    const s = arguments.length - 2;
    s && this._sync(["_insertElements", t, s]);
  }
  _onDataUnshift() {
    this._sync(["_insertElements", 0, arguments.length]);
  }
}
st.defaults = {};
st.prototype.datasetElementType = null;
st.prototype.dataElementType = null;
function Ur(i, t) {
  if (!i._cache.$bar) {
    const e = i.getMatchingVisibleMetas(t);
    let s = [];
    for (let n = 0, o = e.length; n < o; n++)
      s = s.concat(e[n].controller.getAllParsedValues(i));
    i._cache.$bar = mn(s.sort((n, o) => n - o));
  }
  return i._cache.$bar;
}
function Kr(i) {
  const t = i.iScale, e = Ur(t, i.type);
  let s = t._length, n, o, r, a;
  const l = () => {
    r === 32767 || r === -32768 || (tt(a) && (s = Math.min(s, Math.abs(r - a) || s)), a = r);
  };
  for (n = 0, o = e.length; n < o; ++n)
    r = t.getPixelForValue(e[n]), l();
  for (a = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    r = t.getPixelForTick(n), l();
  return s;
}
function qr(i, t, e, s) {
  const n = e.barThickness;
  let o, r;
  return T(n) ? (o = t.min * e.categoryPercentage, r = e.barPercentage) : (o = n * s, r = 1), {
    chunk: o / s,
    ratio: r,
    start: t.pixels[i] - o / 2
  };
}
function Gr(i, t, e, s) {
  const n = t.pixels, o = n[i];
  let r = i > 0 ? n[i - 1] : null, a = i < n.length - 1 ? n[i + 1] : null;
  const l = e.categoryPercentage;
  r === null && (r = o - (a === null ? t.end - t.start : a - o)), a === null && (a = o + o - r);
  const c = o - (o - Math.min(r, a)) / 2 * l;
  return {
    chunk: Math.abs(a - r) / 2 * l / s,
    ratio: e.barPercentage,
    start: c
  };
}
function Zr(i, t, e, s) {
  const n = e.parse(i[0], s), o = e.parse(i[1], s), r = Math.min(n, o), a = Math.max(n, o);
  let l = r, c = a;
  Math.abs(r) > Math.abs(a) && (l = a, c = r), t[e.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: n,
    end: o,
    min: r,
    max: a
  };
}
function Ln(i, t, e, s) {
  return B(i) ? Zr(i, t, e, s) : t[e.axis] = e.parse(i, s), t;
}
function xs(i, t, e, s) {
  const n = i.iScale, o = i.vScale, r = n.getLabels(), a = n === o, l = [];
  let c, h, d, f;
  for (c = e, h = e + s; c < h; ++c)
    f = t[c], d = {}, d[n.axis] = a || n.parse(r[c], c), l.push(Ln(f, d, o, c));
  return l;
}
function ii(i) {
  return i && i.barStart !== void 0 && i.barEnd !== void 0;
}
function Jr(i, t, e) {
  return i !== 0 ? at(i) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function Qr(i) {
  let t, e, s, n, o;
  return i.horizontal ? (t = i.base > i.x, e = "left", s = "right") : (t = i.base < i.y, e = "bottom", s = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), { start: e, end: s, reverse: t, top: n, bottom: o };
}
function ta(i, t, e, s) {
  let n = t.borderSkipped;
  const o = {};
  if (!n) {
    i.borderSkipped = o;
    return;
  }
  const { start: r, end: a, reverse: l, top: c, bottom: h } = Qr(i);
  n === "middle" && e && (i.enableBorderRadius = !0, (e._top || 0) === s ? n = c : (e._bottom || 0) === s ? n = h : (o[_s(h, r, a, l)] = !0, n = c)), o[_s(n, r, a, l)] = !0, i.borderSkipped = o;
}
function _s(i, t, e, s) {
  return s ? (i = ea(i, t, e), i = ys(i, e, t)) : i = ys(i, t, e), i;
}
function ea(i, t, e) {
  return i === t ? e : i === e ? t : i;
}
function ys(i, t, e) {
  return i === "start" ? t : i === "end" ? e : i;
}
function ia(i, { inflateAmount: t }, e) {
  i.inflateAmount = t === "auto" ? e === 1 ? 0.33 : 0 : t;
}
class We extends st {
  parsePrimitiveData(t, e, s, n) {
    return xs(t, e, s, n);
  }
  parseArrayData(t, e, s, n) {
    return xs(t, e, s, n);
  }
  parseObjectData(t, e, s, n) {
    const { iScale: o, vScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = o.axis === "x" ? a : l, h = r.axis === "x" ? a : l, d = [];
    let f, u, g, p;
    for (f = s, u = s + n; f < u; ++f)
      p = e[f], g = {}, g[o.axis] = o.parse(wt(p, c), f), d.push(Ln(wt(p, h), g, r, f));
    return d;
  }
  updateRangeFromParsed(t, e, s, n) {
    super.updateRangeFromParsed(t, e, s, n);
    const o = s._custom;
    o && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, { iScale: s, vScale: n } = e, o = this.getParsed(t), r = o._custom, a = ii(r) ? "[" + r.start + ", " + r.end + "]" : "" + n.getLabelForValue(o[n.axis]);
    return {
      label: "" + s.getLabelForValue(o[s.axis]),
      value: a
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const e = this._cachedMeta;
    this.updateElements(e.data, 0, e.data.length, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { index: r, _cachedMeta: { vScale: a } } = this, l = a.getBasePixel(), c = a.isHorizontal(), h = this._getRuler(), d = this.resolveDataElementOptions(e, n), f = this.getSharedOptions(d), u = this.includeOptions(n, f);
    this.updateSharedOptions(f, n, d);
    for (let g = e; g < e + s; g++) {
      const p = this.getParsed(g), m = o || T(p[a.axis]) ? { base: l, head: l } : this._calculateBarValuePixels(g), b = this._calculateBarIndexPixels(g, h), x = (p._stacks || {})[a.axis], v = {
        horizontal: c,
        base: m.base,
        enableBorderRadius: !x || ii(p._custom) || r === x._top || r === x._bottom,
        x: c ? m.head : b.center,
        y: c ? b.center : m.head,
        height: c ? b.size : Math.abs(m.size),
        width: c ? Math.abs(m.size) : b.size
      };
      u && (v.options = f || this.resolveDataElementOptions(g, t[g].active ? "active" : n));
      const y = v.options || t[g].options;
      ta(v, y, x, r), ia(v, y, h.ratio), this.updateElement(t[g], g, v, n);
    }
  }
  _getStacks(t, e) {
    const n = this._cachedMeta.iScale, o = n.getMatchingVisibleMetas(this._type), r = n.options.stacked, a = o.length, l = [];
    let c, h;
    for (c = 0; c < a; ++c)
      if (h = o[c], !!h.controller.options.grouped) {
        if (typeof e < "u") {
          const d = h.controller.getParsed(e)[h.controller._cachedMeta.vScale.axis];
          if (T(d) || isNaN(d))
            continue;
        }
        if ((r === !1 || l.indexOf(h.stack) === -1 || r === void 0 && h.stack === void 0) && l.push(h.stack), h.index === t)
          break;
      }
    return l.length || l.push(void 0), l;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getStackIndex(t, e, s) {
    const n = this._getStacks(t, s), o = e !== void 0 ? n.indexOf(e) : -1;
    return o === -1 ? n.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, e = this._cachedMeta, s = e.iScale, n = [];
    let o, r;
    for (o = 0, r = e.data.length; o < r; ++o)
      n.push(s.getPixelForValue(this.getParsed(o)[s.axis], o));
    const a = t.barThickness;
    return {
      min: a || Kr(e),
      pixels: n,
      start: s._startPixel,
      end: s._endPixel,
      stackCount: this._getStackCount(),
      scale: s,
      grouped: t.grouped,
      ratio: a ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: e, _stacked: s }, options: { base: n, minBarLength: o } } = this, r = n || 0, a = this.getParsed(t), l = a._custom, c = ii(l);
    let h = a[e.axis], d = 0, f = s ? this.applyStack(e, a, s) : h, u, g;
    f !== h && (d = f - h, f = h), c && (h = l.barStart, f = l.barEnd - l.barStart, h !== 0 && at(h) !== at(l.barEnd) && (d = 0), d += h);
    const p = !T(n) && !c ? n : d;
    let m = e.getPixelForValue(p);
    if (this.chart.getDataVisibility(t) ? u = e.getPixelForValue(d + f) : u = m, g = u - m, Math.abs(g) < o && (g = Jr(g, e, r) * o, h === r && (m -= g / 2), u = m + g), m === e.getPixelForValue(r)) {
      const b = at(g) * e.getLineWidthForValue(r) / 2;
      m += b, g -= b;
    }
    return {
      size: g,
      base: m,
      head: u,
      center: u + g / 2
    };
  }
  _calculateBarIndexPixels(t, e) {
    const s = e.scale, n = this.options, o = n.skipNull, r = P(n.maxBarThickness, 1 / 0);
    let a, l;
    if (e.grouped) {
      const c = o ? this._getStackCount(t) : e.stackCount, h = n.barThickness === "flex" ? Gr(t, e, n, c) : qr(t, e, n, c), d = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0);
      a = h.start + h.chunk * d + h.chunk / 2, l = Math.min(r, h.chunk * h.ratio);
    } else
      a = s.getPixelForValue(this.getParsed(t)[s.axis], t), l = Math.min(r, e.min * e.ratio);
    return {
      base: a - l / 2,
      head: a + l / 2,
      center: a,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, e = t.vScale, s = t.data, n = s.length;
    let o = 0;
    for (; o < n; ++o)
      this.getParsed(o)[e.axis] !== null && s[o].draw(this._ctx);
  }
}
We.id = "bar";
We.defaults = {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: ["x", "y", "base", "width", "height"]
    }
  }
};
We.overrides = {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
};
class Ne extends st {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(t, e, s, n) {
    const o = super.parsePrimitiveData(t, e, s, n);
    for (let r = 0; r < o.length; r++)
      o[r]._custom = this.resolveDataElementOptions(r + s).radius;
    return o;
  }
  parseArrayData(t, e, s, n) {
    const o = super.parseArrayData(t, e, s, n);
    for (let r = 0; r < o.length; r++) {
      const a = e[s + r];
      o[r]._custom = P(a[2], this.resolveDataElementOptions(r + s).radius);
    }
    return o;
  }
  parseObjectData(t, e, s, n) {
    const o = super.parseObjectData(t, e, s, n);
    for (let r = 0; r < o.length; r++) {
      const a = e[s + r];
      o[r]._custom = P(a && a.r && +a.r, this.resolveDataElementOptions(r + s).radius);
    }
    return o;
  }
  getMaxOverflow() {
    const t = this._cachedMeta.data;
    let e = 0;
    for (let s = t.length - 1; s >= 0; --s)
      e = Math.max(e, t[s].size(this.resolveDataElementOptions(s)) / 2);
    return e > 0 && e;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, { xScale: s, yScale: n } = e, o = this.getParsed(t), r = s.getLabelForValue(o.x), a = n.getLabelForValue(o.y), l = o._custom;
    return {
      label: e.label,
      value: "(" + r + ", " + a + (l ? ", " + l : "") + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta.data;
    this.updateElements(e, 0, e.length, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a } = this._cachedMeta, l = this.resolveDataElementOptions(e, n), c = this.getSharedOptions(l), h = this.includeOptions(n, c), d = r.axis, f = a.axis;
    for (let u = e; u < e + s; u++) {
      const g = t[u], p = !o && this.getParsed(u), m = {}, b = m[d] = o ? r.getPixelForDecimal(0.5) : r.getPixelForValue(p[d]), x = m[f] = o ? a.getBasePixel() : a.getPixelForValue(p[f]);
      m.skip = isNaN(b) || isNaN(x), h && (m.options = this.resolveDataElementOptions(u, g.active ? "active" : n), o && (m.options.radius = 0)), this.updateElement(g, u, m, n);
    }
    this.updateSharedOptions(c, n, l);
  }
  resolveDataElementOptions(t, e) {
    const s = this.getParsed(t);
    let n = super.resolveDataElementOptions(t, e);
    n.$shared && (n = Object.assign({}, n, { $shared: !1 }));
    const o = n.radius;
    return e !== "active" && (n.radius = 0), n.radius += P(s && s._custom, o), n;
  }
}
Ne.id = "bubble";
Ne.defaults = {
  datasetElementType: !1,
  dataElementType: "point",
  animations: {
    numbers: {
      type: "number",
      properties: ["x", "y", "borderWidth", "radius"]
    }
  }
};
Ne.overrides = {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        title() {
          return "";
        }
      }
    }
  }
};
function sa(i, t, e) {
  let s = 1, n = 1, o = 0, r = 0;
  if (t < I) {
    const a = i, l = a + t, c = Math.cos(a), h = Math.sin(a), d = Math.cos(l), f = Math.sin(l), u = (v, y, _) => ee(v, a, l, !0) ? 1 : Math.max(y, y * e, _, _ * e), g = (v, y, _) => ee(v, a, l, !0) ? -1 : Math.min(y, y * e, _, _ * e), p = u(0, c, d), m = u(W, h, f), b = g(V, c, d), x = g(V + W, h, f);
    s = (p - b) / 2, n = (m - x) / 2, o = -(p + b) / 2, r = -(m + x) / 2;
  }
  return { ratioX: s, ratioY: n, offsetX: o, offsetY: r };
}
class Rt extends st {
  constructor(t, e) {
    super(t, e), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, e) {
    const s = this.getDataset().data, n = this._cachedMeta;
    if (this._parsing === !1)
      n._parsed = s;
    else {
      let o = (l) => +s[l];
      if (O(s[t])) {
        const { key: l = "value" } = this._parsing;
        o = (c) => +wt(s[c], l);
      }
      let r, a;
      for (r = t, a = t + e; r < a; ++r)
        n._parsed[r] = o(r);
    }
  }
  _getRotation() {
    return it(this.options.rotation - 90);
  }
  _getCircumference() {
    return it(this.options.circumference);
  }
  _getRotationExtents() {
    let t = I, e = -I;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (this.chart.isDatasetVisible(s)) {
        const n = this.chart.getDatasetMeta(s).controller, o = n._getRotation(), r = n._getCircumference();
        t = Math.min(t, o), e = Math.max(e, o + r);
      }
    return {
      rotation: t,
      circumference: e - t
    };
  }
  update(t) {
    const e = this.chart, { chartArea: s } = e, n = this._cachedMeta, o = n.data, r = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, a = Math.max((Math.min(s.width, s.height) - r) / 2, 0), l = Math.min(no(this.options.cutout, a), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: d } = this._getRotationExtents(), { ratioX: f, ratioY: u, offsetX: g, offsetY: p } = sa(d, h, l), m = (s.width - r) / f, b = (s.height - r) / u, x = Math.max(Math.min(m, b) / 2, 0), v = on(this.options.radius, x), y = Math.max(v * l, 0), _ = (v - y) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * v, this.offsetY = p * v, n.total = this.calculateTotal(), this.outerRadius = v - _ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - _ * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, e) {
    const s = this.options, n = this._cachedMeta, o = this._getCircumference();
    return e && s.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / I);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", r = this.chart, a = r.chartArea, c = r.options.animation, h = (a.left + a.right) / 2, d = (a.top + a.bottom) / 2, f = o && c.animateScale, u = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, p = this.resolveDataElementOptions(e, n), m = this.getSharedOptions(p), b = this.includeOptions(n, m);
    let x = this._getRotation(), v;
    for (v = 0; v < e; ++v)
      x += this._circumference(v, o);
    for (v = e; v < e + s; ++v) {
      const y = this._circumference(v, o), _ = t[v], w = {
        x: h + this.offsetX,
        y: d + this.offsetY,
        startAngle: x,
        endAngle: x + y,
        circumference: y,
        outerRadius: g,
        innerRadius: u
      };
      b && (w.options = m || this.resolveDataElementOptions(v, _.active ? "active" : n)), x += y, this.updateElement(_, v, w, n);
    }
    this.updateSharedOptions(m, n, p);
  }
  calculateTotal() {
    const t = this._cachedMeta, e = t.data;
    let s = 0, n;
    for (n = 0; n < e.length; n++) {
      const o = t._parsed[n];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(n) && !e[n].hidden && (s += Math.abs(o));
    }
    return s;
  }
  calculateCircumference(t) {
    const e = this._cachedMeta.total;
    return e > 0 && !isNaN(t) ? I * (Math.abs(t) / e) : 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = oe(e._parsed[t], s.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let e = 0;
    const s = this.chart;
    let n, o, r, a, l;
    if (!t) {
      for (n = 0, o = s.data.datasets.length; n < o; ++n)
        if (s.isDatasetVisible(n)) {
          r = s.getDatasetMeta(n), t = r.data, a = r.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, o = t.length; n < o; ++n)
      l = a.resolveDataElementOptions(n), l.borderAlign !== "inner" && (e = Math.max(e, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return e;
  }
  getMaxOffset(t) {
    let e = 0;
    for (let s = 0, n = t.length; s < n; ++s) {
      const o = this.resolveDataElementOptions(s);
      e = Math.max(e, o.offset || 0, o.hoverOffset || 0);
    }
    return e;
  }
  _getRingWeightOffset(t) {
    let e = 0;
    for (let s = 0; s < t; ++s)
      this.chart.isDatasetVisible(s) && (e += this._getRingWeight(s));
    return e;
  }
  _getRingWeight(t) {
    return Math.max(P(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
Rt.id = "doughnut";
Rt.defaults = {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing"]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
};
Rt.descriptors = {
  _scriptable: (i) => i !== "spacing",
  _indexable: (i) => i !== "spacing"
};
Rt.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(i) {
          const t = i.data;
          if (t.labels.length && t.datasets.length) {
            const { labels: { pointStyle: e } } = i.legend.options;
            return t.labels.map((s, n) => {
              const r = i.getDatasetMeta(0).controller.getStyle(n);
              return {
                text: s,
                fillStyle: r.backgroundColor,
                strokeStyle: r.borderColor,
                lineWidth: r.borderWidth,
                pointStyle: e,
                hidden: !i.getDataVisibility(n),
                index: n
              };
            });
          }
          return [];
        }
      },
      onClick(i, t, e) {
        e.chart.toggleDataVisibility(t.index), e.chart.update();
      }
    },
    tooltip: {
      callbacks: {
        title() {
          return "";
        },
        label(i) {
          let t = i.label;
          const e = ": " + i.formattedValue;
          return B(t) ? (t = t.slice(), t[0] += e) : t += e, t;
        }
      }
    }
  }
};
class re extends st {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  update(t) {
    const e = this._cachedMeta, { dataset: s, data: n = [], _dataset: o } = e, r = this.chart._animationsDisabled;
    let { start: a, count: l } = na(e, n, r);
    this._drawStart = a, this._drawCount = l, oa(e) && (a = 0, l = n.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = n;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !r,
      options: c
    }, t), this.updateElements(n, a, l, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(e, n), d = this.getSharedOptions(h), f = this.includeOptions(n, d), u = r.axis, g = a.axis, { spanGaps: p, segment: m } = this.options, b = te(p) ? p : Number.POSITIVE_INFINITY, x = this.chart._animationsDisabled || o || n === "none";
    let v = e > 0 && this.getParsed(e - 1);
    for (let y = e; y < e + s; ++y) {
      const _ = t[y], w = this.getParsed(y), M = x ? _ : {}, S = T(w[g]), k = M[u] = r.getPixelForValue(w[u], y), R = M[g] = o || S ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, w, l) : w[g], y);
      M.skip = isNaN(k) || isNaN(R) || S, M.stop = y > 0 && w[u] - v[u] > b, m && (M.parsed = w, M.raw = c.data[y]), f && (M.options = d || this.resolveDataElementOptions(y, _.active ? "active" : n)), x || this.updateElement(_, y, M, n), v = w;
    }
    this.updateSharedOptions(d, n, h);
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.dataset, s = e.options && e.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return s;
    const o = n[0].size(this.resolveDataElementOptions(0)), r = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(s, o, r) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
re.id = "line";
re.defaults = {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
};
re.overrides = {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
};
function na(i, t, e) {
  const s = t.length;
  let n = 0, o = s;
  if (i._sorted) {
    const { iScale: r, _parsed: a } = i, l = r.axis, { min: c, max: h, minDefined: d, maxDefined: f } = r.getUserBounds();
    d && (n = $(
      Math.min(
        dt(a, r.axis, c).lo,
        e ? s : dt(t, l, r.getPixelForValue(c)).lo
      ),
      0,
      s - 1
    )), f ? o = $(
      Math.max(
        dt(a, r.axis, h).hi + 1,
        e ? 0 : dt(t, l, r.getPixelForValue(h)).hi + 1
      ),
      n,
      s
    ) - n : o = s - n;
  }
  return { start: n, count: o };
}
function oa(i) {
  const { xScale: t, yScale: e, _scaleRanges: s } = i, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: e.min,
    ymax: e.max
  };
  if (!s)
    return i._scaleRanges = n, !0;
  const o = s.xmin !== t.min || s.xmax !== t.max || s.ymin !== e.min || s.ymax !== e.max;
  return Object.assign(s, n), o;
}
class He extends st {
  constructor(t, e) {
    super(t, e), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = oe(e._parsed[t].r, s.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  update(t) {
    const e = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(e, 0, e.length, t);
  }
  _updateRadius() {
    const t = this.chart, e = t.chartArea, s = t.options, n = Math.min(e.right - e.left, e.bottom - e.top), o = Math.max(n / 2, 0), r = Math.max(s.cutoutPercentage ? o / 100 * s.cutoutPercentage : 1, 0), a = (o - r) / t.getVisibleDatasetCount();
    this.outerRadius = o - a * this.index, this.innerRadius = this.outerRadius - a;
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", r = this.chart, a = this.getDataset(), c = r.options.animation, h = this._cachedMeta.rScale, d = h.xCenter, f = h.yCenter, u = h.getIndexAngle(0) - 0.5 * V;
    let g = u, p;
    const m = 360 / this.countVisibleElements();
    for (p = 0; p < e; ++p)
      g += this._computeAngle(p, n, m);
    for (p = e; p < e + s; p++) {
      const b = t[p];
      let x = g, v = g + this._computeAngle(p, n, m), y = r.getDataVisibility(p) ? h.getDistanceFromCenterForValue(a.data[p]) : 0;
      g = v, o && (c.animateScale && (y = 0), c.animateRotate && (x = v = u));
      const _ = {
        x: d,
        y: f,
        innerRadius: 0,
        outerRadius: y,
        startAngle: x,
        endAngle: v,
        options: this.resolveDataElementOptions(p, b.active ? "active" : n)
      };
      this.updateElement(b, p, _, n);
    }
  }
  countVisibleElements() {
    const t = this.getDataset(), e = this._cachedMeta;
    let s = 0;
    return e.data.forEach((n, o) => {
      !isNaN(t.data[o]) && this.chart.getDataVisibility(o) && s++;
    }), s;
  }
  _computeAngle(t, e, s) {
    return this.chart.getDataVisibility(t) ? it(this.resolveDataElementOptions(t, e).angle || s) : 0;
  }
}
He.id = "polarArea";
He.defaults = {
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !0
  },
  animations: {
    numbers: {
      type: "number",
      properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"]
    }
  },
  indexAxis: "r",
  startAngle: 0
};
He.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(i) {
          const t = i.data;
          if (t.labels.length && t.datasets.length) {
            const { labels: { pointStyle: e } } = i.legend.options;
            return t.labels.map((s, n) => {
              const r = i.getDatasetMeta(0).controller.getStyle(n);
              return {
                text: s,
                fillStyle: r.backgroundColor,
                strokeStyle: r.borderColor,
                lineWidth: r.borderWidth,
                pointStyle: e,
                hidden: !i.getDataVisibility(n),
                index: n
              };
            });
          }
          return [];
        }
      },
      onClick(i, t, e) {
        e.chart.toggleDataVisibility(t.index), e.chart.update();
      }
    },
    tooltip: {
      callbacks: {
        title() {
          return "";
        },
        label(i) {
          return i.chart.data.labels[i.dataIndex] + ": " + i.formattedValue;
        }
      }
    }
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: {
        display: !1
      },
      beginAtZero: !0,
      grid: {
        circular: !0
      },
      pointLabels: {
        display: !1
      },
      startAngle: 0
    }
  }
};
class Ei extends Rt {
}
Ei.id = "pie";
Ei.defaults = {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
};
class je extends st {
  getLabelAndValue(t) {
    const e = this._cachedMeta.vScale, s = this.getParsed(t);
    return {
      label: e.getLabels()[t],
      value: "" + e.getLabelForValue(s[e.axis])
    };
  }
  update(t) {
    const e = this._cachedMeta, s = e.dataset, n = e.data || [], o = e.iScale.getLabels();
    if (s.points = n, t !== "resize") {
      const r = this.resolveDatasetElementOptions(t);
      this.options.showLine || (r.borderWidth = 0);
      const a = {
        _loop: !0,
        _fullLoop: o.length === n.length,
        options: r
      };
      this.updateElement(s, void 0, a, t);
    }
    this.updateElements(n, 0, n.length, t);
  }
  updateElements(t, e, s, n) {
    const o = this.getDataset(), r = this._cachedMeta.rScale, a = n === "reset";
    for (let l = e; l < e + s; l++) {
      const c = t[l], h = this.resolveDataElementOptions(l, c.active ? "active" : n), d = r.getPointPositionForValue(l, o.data[l]), f = a ? r.xCenter : d.x, u = a ? r.yCenter : d.y, g = {
        x: f,
        y: u,
        angle: d.angle,
        skip: isNaN(f) || isNaN(u),
        options: h
      };
      this.updateElement(c, l, g, n);
    }
  }
}
je.id = "radar";
je.defaults = {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
};
je.overrides = {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
};
class $e extends re {
}
$e.id = "scatter";
$e.defaults = {
  showLine: !1,
  fill: !1
};
$e.overrides = {
  interaction: {
    mode: "point"
  },
  plugins: {
    tooltip: {
      callbacks: {
        title() {
          return "";
        },
        label(i) {
          return "(" + i.label + ", " + i.formattedValue + ")";
        }
      }
    }
  },
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
};
function yt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class fi {
  constructor(t) {
    this.options = t || {};
  }
  formats() {
    return yt();
  }
  parse(t, e) {
    return yt();
  }
  format(t, e) {
    return yt();
  }
  add(t, e, s) {
    return yt();
  }
  diff(t, e, s) {
    return yt();
  }
  startOf(t, e, s) {
    return yt();
  }
  endOf(t, e) {
    return yt();
  }
}
fi.override = function(i) {
  Object.assign(fi.prototype, i);
};
var Tn = {
  _date: fi
};
function Xt(i, t) {
  return "native" in i ? {
    x: i.x,
    y: i.y
  } : wn(i, t);
}
function ra(i, t) {
  const e = i.getSortedVisibleDatasetMetas();
  let s, n, o;
  for (let r = 0, a = e.length; r < a; ++r) {
    ({ index: s, data: n } = e[r]);
    for (let l = 0, c = n.length; l < c; ++l)
      o = n[l], o.skip || t(o, s, l);
  }
}
function aa(i, t, e, s) {
  const { controller: n, data: o, _sorted: r } = i, a = n._cachedMeta.iScale;
  if (a && t === a.axis && t !== "r" && r && o.length) {
    const l = a._reversePixels ? Ko : dt;
    if (s) {
      if (n._sharedOptions) {
        const c = o[0], h = typeof c.getRange == "function" && c.getRange(t);
        if (h) {
          const d = l(o, t, e - h), f = l(o, t, e + h);
          return { lo: d.lo, hi: f.hi };
        }
      }
    } else
      return l(o, t, e);
  }
  return { lo: 0, hi: o.length - 1 };
}
function Fi(i, t, e, s, n) {
  const o = i.getSortedVisibleDatasetMetas(), r = e[t];
  for (let a = 0, l = o.length; a < l; ++a) {
    const { index: c, data: h } = o[a], { lo: d, hi: f } = aa(o[a], t, r, n);
    for (let u = d; u <= f; ++u) {
      const g = h[u];
      g.skip || s(g, c, u);
    }
  }
}
function la(i) {
  const t = i.indexOf("x") !== -1, e = i.indexOf("y") !== -1;
  return function(s, n) {
    const o = t ? Math.abs(s.x - n.x) : 0, r = e ? Math.abs(s.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
  };
}
function si(i, t, e, s) {
  const n = [];
  return St(t, i.chartArea, i._minPadding) && Fi(i, e, t, function(r, a, l) {
    r.inRange(t.x, t.y, s) && n.push({ element: r, datasetIndex: a, index: l });
  }, !0), n;
}
function ca(i, t, e, s) {
  let n = [];
  function o(r, a, l) {
    const { startAngle: c, endAngle: h } = r.getProps(["startAngle", "endAngle"], s), { angle: d } = ln(r, { x: t.x, y: t.y });
    ee(d, c, h) && n.push({ element: r, datasetIndex: a, index: l });
  }
  return Fi(i, e, t, o), n;
}
function ha(i, t, e, s, n) {
  let o = [];
  const r = la(e);
  let a = Number.POSITIVE_INFINITY;
  function l(c, h, d) {
    const f = c.inRange(t.x, t.y, n);
    if (s && !f)
      return;
    const u = c.getCenterPoint(n);
    if (!St(u, i.chartArea, i._minPadding) && !f)
      return;
    const p = r(t, u);
    p < a ? (o = [{ element: c, datasetIndex: h, index: d }], a = p) : p === a && o.push({ element: c, datasetIndex: h, index: d });
  }
  return Fi(i, e, t, l), o;
}
function ni(i, t, e, s, n) {
  return St(t, i.chartArea, i._minPadding) ? e === "r" && !s ? ca(i, t, e, n) : ha(i, t, e, s, n) : [];
}
function vs(i, t, e, s) {
  const n = Xt(t, i), o = [], r = e.axis, a = r === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return ra(i, (c, h, d) => {
    c[a](n[r], s) && o.push({ element: c, datasetIndex: h, index: d }), c.inRange(n.x, n.y, s) && (l = !0);
  }), e.intersect && !l ? [] : o;
}
var Rn = {
  modes: {
    index(i, t, e, s) {
      const n = Xt(t, i), o = e.axis || "x", r = e.intersect ? si(i, n, o, s) : ni(i, n, o, !1, s), a = [];
      return r.length ? (i.getSortedVisibleDatasetMetas().forEach((l) => {
        const c = r[0].index, h = l.data[c];
        h && !h.skip && a.push({ element: h, datasetIndex: l.index, index: c });
      }), a) : [];
    },
    dataset(i, t, e, s) {
      const n = Xt(t, i), o = e.axis || "xy";
      let r = e.intersect ? si(i, n, o, s) : ni(i, n, o, !1, s);
      if (r.length > 0) {
        const a = r[0].datasetIndex, l = i.getDatasetMeta(a).data;
        r = [];
        for (let c = 0; c < l.length; ++c)
          r.push({ element: l[c], datasetIndex: a, index: c });
      }
      return r;
    },
    point(i, t, e, s) {
      const n = Xt(t, i), o = e.axis || "xy";
      return si(i, n, o, s);
    },
    nearest(i, t, e, s) {
      const n = Xt(t, i), o = e.axis || "xy";
      return ni(i, n, o, e.intersect, s);
    },
    x(i, t, e, s) {
      return vs(i, t, { axis: "x", intersect: e.intersect }, s);
    },
    y(i, t, e, s) {
      return vs(i, t, { axis: "y", intersect: e.intersect }, s);
    }
  }
};
const En = ["left", "top", "right", "bottom"];
function Wt(i, t) {
  return i.filter((e) => e.pos === t);
}
function Ms(i, t) {
  return i.filter((e) => En.indexOf(e.pos) === -1 && e.box.axis === t);
}
function Nt(i, t) {
  return i.sort((e, s) => {
    const n = t ? s : e, o = t ? e : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function da(i) {
  const t = [];
  let e, s, n, o, r, a;
  for (e = 0, s = (i || []).length; e < s; ++e)
    n = i[e], { position: o, options: { stack: r, stackWeight: a = 1 } } = n, t.push({
      index: e,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: r && o + r,
      stackWeight: a
    });
  return t;
}
function fa(i) {
  const t = {};
  for (const e of i) {
    const { stack: s, pos: n, stackWeight: o } = e;
    if (!s || !En.includes(n))
      continue;
    const r = t[s] || (t[s] = { count: 0, placed: 0, weight: 0, size: 0 });
    r.count++, r.weight += o;
  }
  return t;
}
function ua(i, t) {
  const e = fa(i), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, r, a;
  for (o = 0, r = i.length; o < r; ++o) {
    a = i[o];
    const { fullSize: l } = a.box, c = e[a.stack], h = c && a.stackWeight / c.weight;
    a.horizontal ? (a.width = h ? h * s : l && t.availableWidth, a.height = n) : (a.width = s, a.height = h ? h * n : l && t.availableHeight);
  }
  return e;
}
function ga(i) {
  const t = da(i), e = Nt(t.filter((c) => c.box.fullSize), !0), s = Nt(Wt(t, "left"), !0), n = Nt(Wt(t, "right")), o = Nt(Wt(t, "top"), !0), r = Nt(Wt(t, "bottom")), a = Ms(t, "x"), l = Ms(t, "y");
  return {
    fullSize: e,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(l).concat(r).concat(a),
    chartArea: Wt(t, "chartArea"),
    vertical: s.concat(n).concat(l),
    horizontal: o.concat(r).concat(a)
  };
}
function ws(i, t, e, s) {
  return Math.max(i[e], t[e]) + Math.max(i[s], t[s]);
}
function Fn(i, t) {
  i.top = Math.max(i.top, t.top), i.left = Math.max(i.left, t.left), i.bottom = Math.max(i.bottom, t.bottom), i.right = Math.max(i.right, t.right);
}
function pa(i, t, e, s) {
  const { pos: n, box: o } = e, r = i.maxPadding;
  if (!O(n)) {
    e.size && (i[n] -= e.size);
    const d = s[e.stack] || { size: 0, count: 1 };
    d.size = Math.max(d.size, e.horizontal ? o.height : o.width), e.size = d.size / d.count, i[n] += e.size;
  }
  o.getPadding && Fn(r, o.getPadding());
  const a = Math.max(0, t.outerWidth - ws(r, i, "left", "right")), l = Math.max(0, t.outerHeight - ws(r, i, "top", "bottom")), c = a !== i.w, h = l !== i.h;
  return i.w = a, i.h = l, e.horizontal ? { same: c, other: h } : { same: h, other: c };
}
function ma(i) {
  const t = i.maxPadding;
  function e(s) {
    const n = Math.max(t[s] - i[s], 0);
    return i[s] += n, n;
  }
  i.y += e("top"), i.x += e("left"), e("right"), e("bottom");
}
function ba(i, t) {
  const e = t.maxPadding;
  function s(n) {
    const o = { left: 0, top: 0, right: 0, bottom: 0 };
    return n.forEach((r) => {
      o[r] = Math.max(t[r], e[r]);
    }), o;
  }
  return s(i ? ["left", "right"] : ["top", "bottom"]);
}
function Ut(i, t, e, s) {
  const n = [];
  let o, r, a, l, c, h;
  for (o = 0, r = i.length, c = 0; o < r; ++o) {
    a = i[o], l = a.box, l.update(
      a.width || t.w,
      a.height || t.h,
      ba(a.horizontal, t)
    );
    const { same: d, other: f } = pa(t, e, a, s);
    c |= d && n.length, h = h || f, l.fullSize || n.push(a);
  }
  return c && Ut(n, t, e, s) || h;
}
function me(i, t, e, s, n) {
  i.top = e, i.left = t, i.right = t + s, i.bottom = e + n, i.width = s, i.height = n;
}
function ks(i, t, e, s) {
  const n = e.padding;
  let { x: o, y: r } = t;
  for (const a of i) {
    const l = a.box, c = s[a.stack] || { count: 1, placed: 0, weight: 1 }, h = a.stackWeight / c.weight || 1;
    if (a.horizontal) {
      const d = t.w * h, f = c.size || l.height;
      tt(c.start) && (r = c.start), l.fullSize ? me(l, n.left, r, e.outerWidth - n.right - n.left, f) : me(l, t.left + c.placed, r, d, f), c.start = r, c.placed += d, r = l.bottom;
    } else {
      const d = t.h * h, f = c.size || l.width;
      tt(c.start) && (o = c.start), l.fullSize ? me(l, o, n.top, f, e.outerHeight - n.bottom - n.top) : me(l, o, t.top + c.placed, f, d), c.start = o, c.placed += d, o = l.right;
    }
  }
  t.x = o, t.y = r;
}
D.set("layout", {
  autoPadding: !0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});
var Y = {
  addBox(i, t) {
    i.boxes || (i.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [{
        z: 0,
        draw(e) {
          t.draw(e);
        }
      }];
    }, i.boxes.push(t);
  },
  removeBox(i, t) {
    const e = i.boxes ? i.boxes.indexOf(t) : -1;
    e !== -1 && i.boxes.splice(e, 1);
  },
  configure(i, t, e) {
    t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
  },
  update(i, t, e, s) {
    if (!i)
      return;
    const n = U(i.options.layout.padding), o = Math.max(t - n.width, 0), r = Math.max(e - n.height, 0), a = ga(i.boxes), l = a.vertical, c = a.horizontal;
    E(i.boxes, (p) => {
      typeof p.beforeLayout == "function" && p.beforeLayout();
    });
    const h = l.reduce((p, m) => m.box.options && m.box.options.display === !1 ? p : p + 1, 0) || 1, d = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: n,
      availableWidth: o,
      availableHeight: r,
      vBoxMaxWidth: o / 2 / h,
      hBoxMaxHeight: r / 2
    }), f = Object.assign({}, n);
    Fn(f, U(s));
    const u = Object.assign({
      maxPadding: f,
      w: o,
      h: r,
      x: n.left,
      y: n.top
    }, n), g = ua(l.concat(c), d);
    Ut(a.fullSize, u, d, g), Ut(l, u, d, g), Ut(c, u, d, g) && Ut(l, u, d, g), ma(u), ks(a.leftAndTop, u, d, g), u.x += u.w, u.y += u.h, ks(a.rightAndBottom, u, d, g), i.chartArea = {
      left: u.left,
      top: u.top,
      right: u.left + u.w,
      bottom: u.top + u.h,
      height: u.h,
      width: u.w
    }, E(a.chartArea, (p) => {
      const m = p.box;
      Object.assign(m, i.chartArea), m.update(u.w, u.h, { left: 0, top: 0, right: 0, bottom: 0 });
    });
  }
};
class Ii {
  acquireContext(t, e) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, s) {
  }
  removeEventListener(t, e, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, s, n) {
    return e = Math.max(0, e || t.width), s = s || t.height, {
      width: e,
      height: Math.max(0, n ? Math.floor(e / n) : s)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class In extends Ii {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const we = "$chartjs", xa = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Ss = (i) => i === null || i === "";
function _a(i, t) {
  const e = i.style, s = i.getAttribute("height"), n = i.getAttribute("width");
  if (i[we] = {
    initial: {
      height: s,
      width: n,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", Ss(n)) {
    const o = rs(i, "width");
    o !== void 0 && (i.width = o);
  }
  if (Ss(s))
    if (i.style.height === "")
      i.height = i.width / (t || 2);
    else {
      const o = rs(i, "height");
      o !== void 0 && (i.height = o);
    }
  return i;
}
const zn = _r ? { passive: !0 } : !1;
function ya(i, t, e) {
  i.addEventListener(t, e, zn);
}
function va(i, t, e) {
  i.canvas.removeEventListener(t, e, zn);
}
function Ma(i, t) {
  const e = xa[i.type] || i.type, { x: s, y: n } = wn(i, t);
  return {
    type: e,
    chart: t,
    native: i,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null
  };
}
function Te(i, t) {
  for (const e of i)
    if (e === t || e.contains(t))
      return !0;
}
function wa(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || Te(a.addedNodes, s), r = r && !Te(a.removedNodes, s);
    r && e();
  });
  return n.observe(document, { childList: !0, subtree: !0 }), n;
}
function ka(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || Te(a.removedNodes, s), r = r && !Te(a.addedNodes, s);
    r && e();
  });
  return n.observe(document, { childList: !0, subtree: !0 }), n;
}
const se = /* @__PURE__ */ new Map();
let Ps = 0;
function Bn() {
  const i = window.devicePixelRatio;
  i !== Ps && (Ps = i, se.forEach((t, e) => {
    e.currentDevicePixelRatio !== i && t();
  }));
}
function Sa(i, t) {
  se.size || window.addEventListener("resize", Bn), se.set(i, t);
}
function Pa(i) {
  se.delete(i), se.size || window.removeEventListener("resize", Bn);
}
function Ca(i, t, e) {
  const s = i.canvas, n = s && Ti(s);
  if (!n)
    return;
  const o = nn((a, l) => {
    const c = n.clientWidth;
    e(a, l), c < n.clientWidth && e();
  }, window), r = new ResizeObserver((a) => {
    const l = a[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || o(c, h);
  });
  return r.observe(n), Sa(i, o), r;
}
function oi(i, t, e) {
  e && e.disconnect(), t === "resize" && Pa(i);
}
function Da(i, t, e) {
  const s = i.canvas, n = nn((o) => {
    i.ctx !== null && e(Ma(o, i));
  }, i, (o) => {
    const r = o[0];
    return [r, r.offsetX, r.offsetY];
  });
  return ya(s, t, n), n;
}
class Vn extends Ii {
  acquireContext(t, e) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (_a(t, e), s) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[we])
      return !1;
    const s = e[we].initial;
    ["height", "width"].forEach((o) => {
      const r = s[o];
      T(r) ? e.removeAttribute(o) : e.setAttribute(o, r);
    });
    const n = s.style || {};
    return Object.keys(n).forEach((o) => {
      e.style[o] = n[o];
    }), e.width = e.width, delete e[we], !0;
  }
  addEventListener(t, e, s) {
    this.removeEventListener(t, e);
    const n = t.$proxies || (t.$proxies = {}), r = {
      attach: wa,
      detach: ka,
      resize: Ca
    }[e] || Da;
    n[e] = r(t, e, s);
  }
  removeEventListener(t, e) {
    const s = t.$proxies || (t.$proxies = {}), n = s[e];
    if (!n)
      return;
    ({
      attach: oi,
      detach: oi,
      resize: oi
    }[e] || va)(t, e, n), s[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, s, n) {
    return xr(t, e, s, n);
  }
  isAttached(t) {
    const e = Ti(t);
    return !!(e && e.isConnected);
  }
}
function Wn(i) {
  return !Mn() || typeof OffscreenCanvas < "u" && i instanceof OffscreenCanvas ? In : Vn;
}
class et {
  constructor() {
    this.x = void 0, this.y = void 0, this.active = !1, this.options = void 0, this.$animations = void 0;
  }
  tooltipPosition(t) {
    const { x: e, y: s } = this.getProps(["x", "y"], t);
    return { x: e, y: s };
  }
  hasValue() {
    return te(this.x) && te(this.y);
  }
  getProps(t, e) {
    const s = this.$animations;
    if (!e || !s)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = s[o] && s[o].active() ? s[o]._to : this[o];
    }), n;
  }
}
et.defaults = {};
et.defaultRoutes = void 0;
const Nn = {
  values(i) {
    return B(i) ? i : "" + i;
  },
  numeric(i, t, e) {
    if (i === 0)
      return "0";
    const s = this.chart.options.locale;
    let n, o = i;
    if (e.length > 1) {
      const c = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (c < 1e-4 || c > 1e15) && (n = "scientific"), o = Oa(i, e);
    }
    const r = Q(Math.abs(o)), a = Math.max(Math.min(-1 * Math.floor(r), 20), 0), l = { notation: n, minimumFractionDigits: a, maximumFractionDigits: a };
    return Object.assign(l, this.options.ticks.format), oe(i, s, l);
  },
  logarithmic(i, t, e) {
    if (i === 0)
      return "0";
    const s = i / Math.pow(10, Math.floor(Q(i)));
    return s === 1 || s === 2 || s === 5 ? Nn.numeric.call(this, i, t, e) : "";
  }
};
function Oa(i, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e;
}
var ae = { formatters: Nn };
D.set("scale", {
  display: !0,
  offset: !1,
  reverse: !1,
  beginAtZero: !1,
  bounds: "ticks",
  grace: 0,
  grid: {
    display: !0,
    lineWidth: 1,
    drawBorder: !0,
    drawOnChartArea: !0,
    drawTicks: !0,
    tickLength: 8,
    tickWidth: (i, t) => t.lineWidth,
    tickColor: (i, t) => t.color,
    offset: !1,
    borderDash: [],
    borderDashOffset: 0,
    borderWidth: 1
  },
  title: {
    display: !1,
    text: "",
    padding: {
      top: 4,
      bottom: 4
    }
  },
  ticks: {
    minRotation: 0,
    maxRotation: 50,
    mirror: !1,
    textStrokeWidth: 0,
    textStrokeColor: "",
    padding: 3,
    display: !0,
    autoSkip: !0,
    autoSkipPadding: 3,
    labelOffset: 0,
    callback: ae.formatters.values,
    minor: {},
    major: {},
    align: "center",
    crossAlign: "near",
    showLabelBackdrop: !1,
    backdropColor: "rgba(255, 255, 255, 0.75)",
    backdropPadding: 2
  }
});
D.route("scale.ticks", "color", "", "color");
D.route("scale.grid", "color", "", "borderColor");
D.route("scale.grid", "borderColor", "", "borderColor");
D.route("scale.title", "color", "", "color");
D.describe("scale", {
  _fallback: !1,
  _scriptable: (i) => !i.startsWith("before") && !i.startsWith("after") && i !== "callback" && i !== "parser",
  _indexable: (i) => i !== "borderDash" && i !== "tickBorderDash"
});
D.describe("scales", {
  _fallback: "scale"
});
D.describe("scale.ticks", {
  _scriptable: (i) => i !== "backdropPadding" && i !== "callback",
  _indexable: (i) => i !== "backdropPadding"
});
function Aa(i, t) {
  const e = i.options.ticks, s = e.maxTicksLimit || La(i), n = e.major.enabled ? Ra(t) : [], o = n.length, r = n[0], a = n[o - 1], l = [];
  if (o > s)
    return Ea(t, l, n, o / s), l;
  const c = Ta(n, t, s);
  if (o > 0) {
    let h, d;
    const f = o > 1 ? Math.round((a - r) / (o - 1)) : null;
    for (be(t, l, c, T(f) ? 0 : r - f, r), h = 0, d = o - 1; h < d; h++)
      be(t, l, c, n[h], n[h + 1]);
    return be(t, l, c, a, T(f) ? t.length : a + f), l;
  }
  return be(t, l, c), l;
}
function La(i) {
  const t = i.options.offset, e = i._tickSize(), s = i._length / e + (t ? 0 : 1), n = i._maxLength / e;
  return Math.floor(Math.min(s, n));
}
function Ta(i, t, e) {
  const s = Fa(i), n = t.length / e;
  if (!s)
    return Math.max(n, 1);
  const o = uo(s);
  for (let r = 0, a = o.length - 1; r < a; r++) {
    const l = o[r];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function Ra(i) {
  const t = [];
  let e, s;
  for (e = 0, s = i.length; e < s; e++)
    i[e].major && t.push(e);
  return t;
}
function Ea(i, t, e, s) {
  let n = 0, o = e[0], r;
  for (s = Math.ceil(s), r = 0; r < i.length; r++)
    r === o && (t.push(i[r]), n++, o = e[n * s]);
}
function be(i, t, e, s, n) {
  const o = P(s, 0), r = Math.min(P(n, i.length), i.length);
  let a = 0, l, c, h;
  for (e = Math.ceil(e), n && (l = n - s, e = l / Math.floor(l / e)), h = o; h < 0; )
    a++, h = Math.round(o + a * e);
  for (c = Math.max(o, 0); c < r; c++)
    c === h && (t.push(i[c]), a++, h = Math.round(o + a * e));
}
function Fa(i) {
  const t = i.length;
  let e, s;
  if (t < 2)
    return !1;
  for (s = i[0], e = 1; e < t; ++e)
    if (i[e] - i[e - 1] !== s)
      return !1;
  return s;
}
const Ia = (i) => i === "left" ? "right" : i === "right" ? "left" : i, Cs = (i, t, e) => t === "top" || t === "left" ? i[t] + e : i[t] - e;
function Ds(i, t) {
  const e = [], s = i.length / t, n = i.length;
  let o = 0;
  for (; o < n; o += s)
    e.push(i[Math.floor(o)]);
  return e;
}
function za(i, t, e) {
  const s = i.ticks.length, n = Math.min(t, s - 1), o = i._startPixel, r = i._endPixel, a = 1e-6;
  let l = i.getPixelForTick(n), c;
  if (!(e && (s === 1 ? c = Math.max(l - o, r - l) : t === 0 ? c = (i.getPixelForTick(1) - l) / 2 : c = (l - i.getPixelForTick(n - 1)) / 2, l += n < t ? c : -c, l < o - a || l > r + a)))
    return l;
}
function Ba(i, t) {
  E(i, (e) => {
    const s = e.gc, n = s.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete e.data[s[o]];
      s.splice(0, n);
    }
  });
}
function Ht(i) {
  return i.drawTicks ? i.tickLength : 0;
}
function Os(i, t) {
  if (!i.display)
    return 0;
  const e = j(i.font, t), s = U(i.padding);
  return (B(i.text) ? i.text.length : 1) * e.lineHeight + s.height;
}
function Va(i, t) {
  return pt(i, {
    scale: t,
    type: "scale"
  });
}
function Wa(i, t, e) {
  return pt(i, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function Na(i, t, e) {
  let s = yi(i);
  return (e && t !== "right" || !e && t === "right") && (s = Ia(s)), s;
}
function Ha(i, t, e, s) {
  const { top: n, left: o, bottom: r, right: a, chart: l } = i, { chartArea: c, scales: h } = l;
  let d = 0, f, u, g;
  const p = r - n, m = a - o;
  if (i.isHorizontal()) {
    if (u = X(s, o, a), O(e)) {
      const b = Object.keys(e)[0], x = e[b];
      g = h[b].getPixelForValue(x) + p - t;
    } else
      e === "center" ? g = (c.bottom + c.top) / 2 + p - t : g = Cs(i, e, t);
    f = a - o;
  } else {
    if (O(e)) {
      const b = Object.keys(e)[0], x = e[b];
      u = h[b].getPixelForValue(x) - m + t;
    } else
      e === "center" ? u = (c.left + c.right) / 2 - m + t : u = Cs(i, e, t);
    g = X(s, r, n), d = e === "left" ? -W : W;
  }
  return { titleX: u, titleY: g, maxWidth: f, rotation: d };
}
class mt extends et {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: s, _suggestedMax: n } = this;
    return t = J(t, Number.POSITIVE_INFINITY), e = J(e, Number.NEGATIVE_INFINITY), s = J(s, Number.POSITIVE_INFINITY), n = J(n, Number.NEGATIVE_INFINITY), {
      min: J(t, s),
      max: J(e, n),
      minDefined: N(t),
      maxDefined: N(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: s, minDefined: n, maxDefined: o } = this.getUserBounds(), r;
    if (n && o)
      return { min: e, max: s };
    const a = this.getMatchingVisibleMetas();
    for (let l = 0, c = a.length; l < c; ++l)
      r = a[l].controller.getMinMax(this, t), n || (e = Math.min(e, r.min)), o || (s = Math.max(s, r.max));
    return e = o && e > s ? s : e, s = n && e > s ? e : s, {
      min: J(e, J(s, e)),
      max: J(s, J(e, s))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    z(this.options.beforeUpdate, [this]);
  }
  update(t, e, s) {
    const { beginAtZero: n, grace: o, ticks: r } = this.options, a = r.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Uo(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = a < this.ticks.length;
    this._convertTicksToLabels(l ? Ds(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === "auto") && (this.ticks = Aa(this, this.ticks), this._labelSizes = null), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, s;
    this.isHorizontal() ? (e = this.left, s = this.right) : (e = this.top, s = this.bottom, t = !t), this._startPixel = e, this._endPixel = s, this._reversePixels = t, this._length = s - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    z(this.options.afterUpdate, [this]);
  }
  beforeSetDimensions() {
    z(this.options.beforeSetDimensions, [this]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    z(this.options.afterSetDimensions, [this]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), z(this.options[t], [this]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    z(this.options.beforeTickToLabelConversion, [this]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      o = t[s], o.label = z(e.callback, [o.value, s, t], this);
  }
  afterTickToLabelConversion() {
    z(this.options.afterTickToLabelConversion, [this]);
  }
  beforeCalculateLabelRotation() {
    z(this.options.beforeCalculateLabelRotation, [this]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, s = this.ticks.length, n = e.minRotation || 0, o = e.maxRotation;
    let r = n, a, l, c;
    if (!this._isVisible() || !e.display || n >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const h = this._getLabelSizes(), d = h.widest.width, f = h.highest.height, u = $(this.chart.width - d, 0, this.maxWidth);
    a = t.offset ? this.maxWidth / s : u / (s - 1), d + 6 > a && (a = u / (s - (t.offset ? 0.5 : 1)), l = this.maxHeight - Ht(t.grid) - e.padding - Os(t.title, this.chart.options.font), c = Math.sqrt(d * d + f * f), r = Mi(Math.min(
      Math.asin($((h.highest.height + 6) / a, -1, 1)),
      Math.asin($(l / c, -1, 1)) - Math.asin($(f / c, -1, 1))
    )), r = Math.max(n, Math.min(o, r))), this.labelRotation = r;
  }
  afterCalculateLabelRotation() {
    z(this.options.afterCalculateLabelRotation, [this]);
  }
  beforeFit() {
    z(this.options.beforeFit, [this]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: s, title: n, grid: o } } = this, r = this._isVisible(), a = this.isHorizontal();
    if (r) {
      const l = Os(n, e.options.font);
      if (a ? (t.width = this.maxWidth, t.height = Ht(o) + l) : (t.height = this.maxHeight, t.width = Ht(o) + l), s.display && this.ticks.length) {
        const { first: c, last: h, widest: d, highest: f } = this._getLabelSizes(), u = s.padding * 2, g = it(this.labelRotation), p = Math.cos(g), m = Math.sin(g);
        if (a) {
          const b = s.mirror ? 0 : m * d.width + p * f.height;
          t.height = Math.min(this.maxHeight, t.height + b + u);
        } else {
          const b = s.mirror ? 0 : p * d.width + m * f.height;
          t.width = Math.min(this.maxWidth, t.width + b + u);
        }
        this._calculatePadding(c, h, m, p);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, s, n) {
    const { ticks: { align: o, padding: r }, position: a } = this.options, l = this.labelRotation !== 0, c = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, u = 0;
      l ? c ? (f = n * t.width, u = s * e.height) : (f = s * t.height, u = n * e.width) : o === "start" ? u = e.width : o === "end" ? f = t.width : (f = t.width / 2, u = e.width / 2), this.paddingLeft = Math.max((f - h + r) * this.width / (this.width - h), 0), this.paddingRight = Math.max((u - d + r) * this.width / (this.width - d), 0);
    } else {
      let h = e.height / 2, d = t.height / 2;
      o === "start" ? (h = 0, d = t.height) : o === "end" && (h = e.height, d = 0), this.paddingTop = h + r, this.paddingBottom = d + r;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    z(this.options.afterFit, [this]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === "top" || e === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let e, s;
    for (e = 0, s = t.length; e < s; e++)
      T(t[e].label) && (t.splice(e, 1), s--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let s = this.ticks;
      e < s.length && (s = Ds(s, e)), this._labelSizes = t = this._computeLabelSizes(s, s.length);
    }
    return t;
  }
  _computeLabelSizes(t, e) {
    const { ctx: s, _longestTextCache: n } = this, o = [], r = [];
    let a = 0, l = 0, c, h, d, f, u, g, p, m, b, x, v;
    for (c = 0; c < e; ++c) {
      if (f = t[c].label, u = this._resolveTickFontOptions(c), s.font = g = u.string, p = n[g] = n[g] || { data: {}, gc: [] }, m = u.lineHeight, b = x = 0, !T(f) && !B(f))
        b = De(s, p.data, p.gc, b, f), x = m;
      else if (B(f))
        for (h = 0, d = f.length; h < d; ++h)
          v = f[h], !T(v) && !B(v) && (b = De(s, p.data, p.gc, b, v), x += m);
      o.push(b), r.push(x), a = Math.max(b, a), l = Math.max(x, l);
    }
    Ba(n, e);
    const y = o.indexOf(a), _ = r.indexOf(l), w = (M) => ({ width: o[M] || 0, height: r[M] || 0 });
    return {
      first: w(0),
      last: w(e - 1),
      widest: w(y),
      highest: w(_),
      widths: o,
      heights: r
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return mo(this._alignToPixels ? _t(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return s.$context || (s.$context = Wa(this.getContext(), t, s));
    }
    return this.$context || (this.$context = Va(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = it(this.labelRotation), s = Math.abs(Math.cos(e)), n = Math.abs(Math.sin(e)), o = this._getLabelSizes(), r = t.autoSkipPadding || 0, a = o ? o.widest.width + r : 0, l = o ? o.highest.height + r : 0;
    return this.isHorizontal() ? l * s > a * n ? a / s : l / n : l * n < a * s ? l / s : a / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, s = this.chart, n = this.options, { grid: o, position: r } = n, a = o.offset, l = this.isHorizontal(), h = this.ticks.length + (a ? 1 : 0), d = Ht(o), f = [], u = o.setContext(this.getContext()), g = u.drawBorder ? u.borderWidth : 0, p = g / 2, m = function(C) {
      return _t(s, C, g);
    };
    let b, x, v, y, _, w, M, S, k, R, L, A;
    if (r === "top")
      b = m(this.bottom), w = this.bottom - d, S = b - p, R = m(t.top) + p, A = t.bottom;
    else if (r === "bottom")
      b = m(this.top), R = t.top, A = m(t.bottom) - p, w = b + p, S = this.top + d;
    else if (r === "left")
      b = m(this.right), _ = this.right - d, M = b - p, k = m(t.left) + p, L = t.right;
    else if (r === "right")
      b = m(this.left), k = t.left, L = m(t.right) - p, _ = b + p, M = this.left + d;
    else if (e === "x") {
      if (r === "center")
        b = m((t.top + t.bottom) / 2 + 0.5);
      else if (O(r)) {
        const C = Object.keys(r)[0], F = r[C];
        b = m(this.chart.scales[C].getPixelForValue(F));
      }
      R = t.top, A = t.bottom, w = b + p, S = w + d;
    } else if (e === "y") {
      if (r === "center")
        b = m((t.left + t.right) / 2);
      else if (O(r)) {
        const C = Object.keys(r)[0], F = r[C];
        b = m(this.chart.scales[C].getPixelForValue(F));
      }
      _ = b - p, M = _ - d, k = t.left, L = t.right;
    }
    const H = P(n.ticks.maxTicksLimit, h), K = Math.max(1, Math.ceil(h / H));
    for (x = 0; x < h; x += K) {
      const C = o.setContext(this.getContext(x)), F = C.lineWidth, Et = C.color, xt = o.borderDash || [], Ft = C.borderDashOffset, he = C.tickWidth, Ct = C.tickColor, It = C.tickBorderDash || [], zt = C.tickBorderDashOffset;
      v = za(this, x, a), v !== void 0 && (y = _t(s, v, F), l ? _ = M = k = L = y : w = S = R = A = y, f.push({
        tx1: _,
        ty1: w,
        tx2: M,
        ty2: S,
        x1: k,
        y1: R,
        x2: L,
        y2: A,
        width: F,
        color: Et,
        borderDash: xt,
        borderDashOffset: Ft,
        tickWidth: he,
        tickColor: Ct,
        tickBorderDash: It,
        tickBorderDashOffset: zt
      }));
    }
    return this._ticksLength = h, this._borderValue = b, f;
  }
  _computeLabelItems(t) {
    const e = this.axis, s = this.options, { position: n, ticks: o } = s, r = this.isHorizontal(), a = this.ticks, { align: l, crossAlign: c, padding: h, mirror: d } = o, f = Ht(s.grid), u = f + h, g = d ? -h : u, p = -it(this.labelRotation), m = [];
    let b, x, v, y, _, w, M, S, k, R, L, A, H = "middle";
    if (n === "top")
      w = this.bottom - g, M = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      w = this.top + g, M = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const C = this._getYAxisLabelAlignment(f);
      M = C.textAlign, _ = C.x;
    } else if (n === "right") {
      const C = this._getYAxisLabelAlignment(f);
      M = C.textAlign, _ = C.x;
    } else if (e === "x") {
      if (n === "center")
        w = (t.top + t.bottom) / 2 + u;
      else if (O(n)) {
        const C = Object.keys(n)[0], F = n[C];
        w = this.chart.scales[C].getPixelForValue(F) + u;
      }
      M = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (n === "center")
        _ = (t.left + t.right) / 2 - u;
      else if (O(n)) {
        const C = Object.keys(n)[0], F = n[C];
        _ = this.chart.scales[C].getPixelForValue(F);
      }
      M = this._getYAxisLabelAlignment(f).textAlign;
    }
    e === "y" && (l === "start" ? H = "top" : l === "end" && (H = "bottom"));
    const K = this._getLabelSizes();
    for (b = 0, x = a.length; b < x; ++b) {
      v = a[b], y = v.label;
      const C = o.setContext(this.getContext(b));
      S = this.getPixelForTick(b) + o.labelOffset, k = this._resolveTickFontOptions(b), R = k.lineHeight, L = B(y) ? y.length : 1;
      const F = L / 2, Et = C.color, xt = C.textStrokeColor, Ft = C.textStrokeWidth;
      r ? (_ = S, n === "top" ? c === "near" || p !== 0 ? A = -L * R + R / 2 : c === "center" ? A = -K.highest.height / 2 - F * R + R : A = -K.highest.height + R / 2 : c === "near" || p !== 0 ? A = R / 2 : c === "center" ? A = K.highest.height / 2 - F * R : A = K.highest.height - L * R, d && (A *= -1)) : (w = S, A = (1 - L) * R / 2);
      let he;
      if (C.showLabelBackdrop) {
        const Ct = U(C.backdropPadding), It = K.heights[b], zt = K.widths[b];
        let qe = w + A - Ct.top, Ge = _ - Ct.left;
        switch (H) {
          case "middle":
            qe -= It / 2;
            break;
          case "bottom":
            qe -= It;
            break;
        }
        switch (M) {
          case "center":
            Ge -= zt / 2;
            break;
          case "right":
            Ge -= zt;
            break;
        }
        he = {
          left: Ge,
          top: qe,
          width: zt + Ct.width,
          height: It + Ct.height,
          color: C.backdropColor
        };
      }
      m.push({
        rotation: p,
        label: y,
        font: k,
        color: Et,
        strokeColor: xt,
        strokeWidth: Ft,
        textOffset: A,
        textAlign: M,
        textBaseline: H,
        translation: [_, w],
        backdrop: he
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-it(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return e.align === "start" ? n = "left" : e.align === "end" && (n = "right"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: s, mirror: n, padding: o } } = this.options, r = this._getLabelSizes(), a = t + o, l = r.widest.width;
    let c, h;
    return e === "left" ? n ? (h = this.right + o, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - a, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : e === "right" ? n ? (h = this.left + o, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + a, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", { textAlign: c, x: h };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, e = this.options.position;
    if (e === "left" || e === "right")
      return { top: 0, left: this.left, bottom: t.height, right: this.right };
    if (e === "top" || e === "bottom")
      return { top: this.top, left: 0, bottom: this.bottom, right: t.width };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: e }, left: s, top: n, width: o, height: r } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(s, n, o, r), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? e.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid, s = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, r;
    const a = (l, c, h) => {
      !h.width || !h.color || (s.save(), s.lineWidth = h.width, s.strokeStyle = h.color, s.setLineDash(h.borderDash || []), s.lineDashOffset = h.borderDashOffset, s.beginPath(), s.moveTo(l.x, l.y), s.lineTo(c.x, c.y), s.stroke(), s.restore());
    };
    if (e.display)
      for (o = 0, r = n.length; o < r; ++o) {
        const l = n[o];
        e.drawOnChartArea && a(
          { x: l.x1, y: l.y1 },
          { x: l.x2, y: l.y2 },
          l
        ), e.drawTicks && a(
          { x: l.tx1, y: l.ty1 },
          { x: l.tx2, y: l.ty2 },
          {
            color: l.tickColor,
            width: l.tickWidth,
            borderDash: l.tickBorderDash,
            borderDashOffset: l.tickBorderDashOffset
          }
        );
      }
  }
  drawBorder() {
    const { chart: t, ctx: e, options: { grid: s } } = this, n = s.setContext(this.getContext()), o = s.drawBorder ? n.borderWidth : 0;
    if (!o)
      return;
    const r = s.setContext(this.getContext(0)).lineWidth, a = this._borderValue;
    let l, c, h, d;
    this.isHorizontal() ? (l = _t(t, this.left, o) - o / 2, c = _t(t, this.right, r) + r / 2, h = d = a) : (h = _t(t, this.top, o) - o / 2, d = _t(t, this.bottom, r) + r / 2, l = c = a), e.save(), e.lineWidth = n.borderWidth, e.strokeStyle = n.borderColor, e.beginPath(), e.moveTo(l, h), e.lineTo(c, d), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, n = this._computeLabelArea();
    n && ze(s, n);
    const o = this._labelItems || (this._labelItems = this._computeLabelItems(t));
    let r, a;
    for (r = 0, a = o.length; r < a; ++r) {
      const l = o[r], c = l.font, h = l.label;
      l.backdrop && (s.fillStyle = l.backdrop.color, s.fillRect(l.backdrop.left, l.backdrop.top, l.backdrop.width, l.backdrop.height));
      let d = l.textOffset;
      Pt(s, h, 0, d, c, l);
    }
    n && Be(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: s, reverse: n } } = this;
    if (!s.display)
      return;
    const o = j(s.font), r = U(s.padding), a = s.align;
    let l = o.lineHeight / 2;
    e === "bottom" || e === "center" || O(e) ? (l += r.bottom, B(s.text) && (l += o.lineHeight * (s.text.length - 1))) : l += r.top;
    const { titleX: c, titleY: h, maxWidth: d, rotation: f } = Ha(this, l, e, a);
    Pt(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: d,
      rotation: f,
      textAlign: Na(a, e, n),
      textBaseline: "middle",
      translation: [c, h]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, e = t.ticks && t.ticks.z || 0, s = P(t.grid && t.grid.z, -1);
    return !this._isVisible() || this.draw !== mt.prototype.draw ? [{
      z: e,
      draw: (n) => {
        this.draw(n);
      }
    }] : [{
      z: s,
      draw: (n) => {
        this.drawBackground(), this.drawGrid(n), this.drawTitle();
      }
    }, {
      z: s + 1,
      draw: () => {
        this.drawBorder();
      }
    }, {
      z: e,
      draw: (n) => {
        this.drawLabels(n);
      }
    }];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", n = [];
    let o, r;
    for (o = 0, r = e.length; o < r; ++o) {
      const a = e[o];
      a[s] === this.id && (!t || a.type === t) && n.push(a);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return j(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class xe {
  constructor(t, e, s) {
    this.type = t, this.scope = e, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let s;
    Ya(e) && (s = this.register(e));
    const n = this.items, o = t.id, r = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, ja(t, r, s), this.override && D.override(t.id, t.overrides)), r;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, s = t.id, n = this.scope;
    s in e && delete e[s], n && s in D[n] && (delete D[n][s], this.override && delete kt[s]);
  }
}
function ja(i, t, e) {
  const s = Qt(/* @__PURE__ */ Object.create(null), [
    e ? D.get(e) : {},
    D.get(t),
    i.defaults
  ]);
  D.set(t, s), i.defaultRoutes && $a(t, i.defaultRoutes), i.descriptors && D.describe(t, i.descriptors);
}
function $a(i, t) {
  Object.keys(t).forEach((e) => {
    const s = e.split("."), n = s.pop(), o = [i].concat(s).join("."), r = t[e].split("."), a = r.pop(), l = r.join(".");
    D.route(o, n, l, a);
  });
}
function Ya(i) {
  return "id" in i && "defaults" in i;
}
class Xa {
  constructor() {
    this.controllers = new xe(st, "datasets", !0), this.elements = new xe(et, "elements"), this.plugins = new xe(Object, "plugins"), this.scales = new xe(mt, "scales"), this._typedRegistries = [this.controllers, this.scales, this.elements];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, s) {
    [...e].forEach((n) => {
      const o = s || this._getRegistryForType(n);
      s || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : E(n, (r) => {
        const a = s || this._getRegistryForType(r);
        this._exec(t, a, r);
      });
    });
  }
  _exec(t, e, s) {
    const n = vi(t);
    z(s["before" + n], [], s), e[t](s), z(s["after" + n], [], s);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const s = this._typedRegistries[e];
      if (s.isForType(t))
        return s;
    }
    return this.plugins;
  }
  _get(t, e, s) {
    const n = e.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + ".");
    return n;
  }
}
var rt = new Xa();
class Ua {
  constructor() {
    this._init = [];
  }
  notify(t, e, s, n) {
    e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), r = this._notify(o, t, e, s);
    return e === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall")), r;
  }
  _notify(t, e, s, n) {
    n = n || {};
    for (const o of t) {
      const r = o.plugin, a = r[s], l = [e, n, o.options];
      if (z(a, l, r) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    T(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const s = t && t.config, n = P(s.options && s.options.plugins, {}), o = Ka(s);
    return n === !1 && !e ? [] : Ga(t, o, n, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], s = this._cache, n = (o, r) => o.filter((a) => !r.some((l) => a.plugin.id === l.plugin.id));
    this._notify(n(e, s), t, "stop"), this._notify(n(s, e), t, "start");
  }
}
function Ka(i) {
  const t = [], e = Object.keys(rt.plugins.items);
  for (let n = 0; n < e.length; n++)
    t.push(rt.getPlugin(e[n]));
  const s = i.plugins || [];
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    t.indexOf(o) === -1 && t.push(o);
  }
  return t;
}
function qa(i, t) {
  return !t && i === !1 ? null : i === !0 ? {} : i;
}
function Ga(i, t, e, s) {
  const n = [], o = i.getContext();
  for (let r = 0; r < t.length; r++) {
    const a = t[r], l = a.id, c = qa(e[l], s);
    c !== null && n.push({
      plugin: a,
      options: Za(i.config, a, c, o)
    });
  }
  return n;
}
function Za(i, t, e, s) {
  const n = i.pluginScopeKeys(t), o = i.getOptionScopes(e, n);
  return i.createResolver(o, s, [""], { scriptable: !1, indexable: !1, allKeys: !0 });
}
function ui(i, t) {
  const e = D.datasets[i] || {};
  return ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function Ja(i, t) {
  let e = i;
  return i === "_index_" ? e = t : i === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function Qa(i, t) {
  return i === t ? "_index_" : "_value_";
}
function tl(i) {
  if (i === "top" || i === "bottom")
    return "x";
  if (i === "left" || i === "right")
    return "y";
}
function gi(i, t) {
  return i === "x" || i === "y" ? i : t.axis || tl(t.position) || i.charAt(0).toLowerCase();
}
function el(i, t) {
  const e = kt[i.type] || { scales: {} }, s = t.scales || {}, n = ui(i.type, t), o = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((a) => {
    const l = s[a];
    if (!O(l))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const c = gi(a, l), h = Qa(c, n), d = e.scales || {};
    o[c] = o[c] || a, r[a] = Kt(/* @__PURE__ */ Object.create(null), [{ axis: c }, l, d[c], d[h]]);
  }), i.data.datasets.forEach((a) => {
    const l = a.type || i.type, c = a.indexAxis || ui(l, t), d = (kt[l] || {}).scales || {};
    Object.keys(d).forEach((f) => {
      const u = Ja(f, c), g = a[u + "AxisID"] || o[u] || u;
      r[g] = r[g] || /* @__PURE__ */ Object.create(null), Kt(r[g], [{ axis: u }, s[g], d[f]]);
    });
  }), Object.keys(r).forEach((a) => {
    const l = r[a];
    Kt(l, [D.scales[l.type], D.scale]);
  }), r;
}
function Hn(i) {
  const t = i.options || (i.options = {});
  t.plugins = P(t.plugins, {}), t.scales = el(i, t);
}
function jn(i) {
  return i = i || {}, i.datasets = i.datasets || [], i.labels = i.labels || [], i;
}
function il(i) {
  return i = i || {}, i.data = jn(i.data), Hn(i), i;
}
const As = /* @__PURE__ */ new Map(), $n = /* @__PURE__ */ new Set();
function _e(i, t) {
  let e = As.get(i);
  return e || (e = t(), As.set(i, e), $n.add(e)), e;
}
const jt = (i, t, e) => {
  const s = wt(t, e);
  s !== void 0 && i.add(s);
};
class sl {
  constructor(t) {
    this._config = il(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = jn(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), Hn(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return _e(
      t,
      () => [[
        `datasets.${t}`,
        ""
      ]]
    );
  }
  datasetAnimationScopeKeys(t, e) {
    return _e(
      `${t}.transition.${e}`,
      () => [
        [
          `datasets.${t}.transitions.${e}`,
          `transitions.${e}`
        ],
        [
          `datasets.${t}`,
          ""
        ]
      ]
    );
  }
  datasetElementScopeKeys(t, e) {
    return _e(
      `${t}-${e}`,
      () => [[
        `datasets.${t}.elements.${e}`,
        `datasets.${t}`,
        `elements.${e}`,
        ""
      ]]
    );
  }
  pluginScopeKeys(t) {
    const e = t.id, s = this.type;
    return _e(
      `${s}-plugin-${e}`,
      () => [[
        `plugins.${e}`,
        ...t.additionalOptionScopes || []
      ]]
    );
  }
  _cachedScopes(t, e) {
    const s = this._scopeCache;
    let n = s.get(t);
    return (!n || e) && (n = /* @__PURE__ */ new Map(), s.set(t, n)), n;
  }
  getOptionScopes(t, e, s) {
    const { options: n, type: o } = this, r = this._cachedScopes(t, s), a = r.get(e);
    if (a)
      return a;
    const l = /* @__PURE__ */ new Set();
    e.forEach((h) => {
      t && (l.add(t), h.forEach((d) => jt(l, t, d))), h.forEach((d) => jt(l, n, d)), h.forEach((d) => jt(l, kt[o] || {}, d)), h.forEach((d) => jt(l, D, d)), h.forEach((d) => jt(l, di, d));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), $n.has(e) && r.set(e, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      kt[e] || {},
      D.datasets[e] || {},
      { type: e },
      D,
      di
    ];
  }
  resolveNamedOptions(t, e, s, n = [""]) {
    const o = { $shared: !0 }, { resolver: r, subPrefixes: a } = Ls(this._resolverCache, t, n);
    let l = r;
    if (ol(r, e)) {
      o.$shared = !1, s = gt(s) ? s() : s;
      const c = this.createResolver(t, s, a);
      l = Lt(r, s, c);
    }
    for (const c of e)
      o[c] = l[c];
    return o;
  }
  createResolver(t, e, s = [""], n) {
    const { resolver: o } = Ls(this._resolverCache, t, s);
    return O(e) ? Lt(o, e, void 0, n) : o;
  }
}
function Ls(i, t, e) {
  let s = i.get(t);
  s || (s = /* @__PURE__ */ new Map(), i.set(t, s));
  const n = e.join();
  let o = s.get(n);
  return o || (o = {
    resolver: Oi(t, e),
    subPrefixes: e.filter((a) => !a.toLowerCase().includes("hover"))
  }, s.set(n, o)), o;
}
const nl = (i) => O(i) && Object.getOwnPropertyNames(i).reduce((t, e) => t || gt(i[e]), !1);
function ol(i, t) {
  const { isScriptable: e, isIndexable: s } = bn(i);
  for (const n of t) {
    const o = e(n), r = s(n), a = (r || o) && i[n];
    if (o && (gt(a) || nl(a)) || r && B(a))
      return !0;
  }
  return !1;
}
var rl = "3.7.1";
const al = ["top", "bottom", "left", "right", "chartArea"];
function Ts(i, t) {
  return i === "top" || i === "bottom" || al.indexOf(i) === -1 && t === "x";
}
function Rs(i, t) {
  return function(e, s) {
    return e[i] === s[i] ? e[t] - s[t] : e[i] - s[i];
  };
}
function Es(i) {
  const t = i.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), z(e && e.onComplete, [i], t);
}
function ll(i) {
  const t = i.chart, e = t.options.animation;
  z(e && e.onProgress, [i], t);
}
function Yn(i) {
  return Mn() && typeof i == "string" ? i = document.getElementById(i) : i && i.length && (i = i[0]), i && i.canvas && (i = i.canvas), i;
}
const Re = {}, Xn = (i) => {
  const t = Yn(i);
  return Object.values(Re).filter((e) => e.canvas === t).pop();
};
function cl(i, t, e) {
  const s = Object.keys(i);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const r = i[n];
      delete i[n], (e > 0 || o > t) && (i[o + e] = r);
    }
  }
}
function hl(i, t, e, s) {
  return !e || i.type === "mouseout" ? null : s ? t : i;
}
class zi {
  constructor(t, e) {
    const s = this.config = new sl(e), n = Yn(t), o = Xn(n);
    if (o)
      throw new Error(
        "Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas can be reused."
      );
    const r = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || Wn(n))(), this.platform.updateConfig(s);
    const a = this.platform.acquireContext(n, r.aspectRatio), l = a && a.canvas, c = l && l.height, h = l && l.width;
    if (this.id = so(), this.ctx = a, this.canvas = l, this.width = h, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Ua(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = eo((d) => this.update(d), r.resizeDelay || 0), this._dataChanges = [], Re[this.id] = this, !a || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    ot.listen(this, "complete", Es), ot.listen(this, "progress", ll), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: s, height: n, _aspectRatio: o } = this;
    return T(t) ? e && o ? o : n ? s / n : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : os(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return es(this.canvas, this.ctx), this;
  }
  stop() {
    return ot.stop(this), this;
  }
  resize(t, e) {
    ot.running(this) ? this._resizeBeforeDraw = { width: t, height: e } : this._resize(t, e);
  }
  _resize(t, e) {
    const s = this.options, n = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, r = this.platform.getMaximumSize(n, t, e, o), a = s.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, os(this, a, !0) && (this.notifyPlugins("resize", { size: r }), z(s.onResize, [this, r], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    E(e, (s, n) => {
      s.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, s = this.scales, n = Object.keys(s).reduce((r, a) => (r[a] = !1, r), {});
    let o = [];
    e && (o = o.concat(
      Object.keys(e).map((r) => {
        const a = e[r], l = gi(r, a), c = l === "r", h = l === "x";
        return {
          options: a,
          dposition: c ? "chartArea" : h ? "bottom" : "left",
          dtype: c ? "radialLinear" : h ? "category" : "linear"
        };
      })
    )), E(o, (r) => {
      const a = r.options, l = a.id, c = gi(l, a), h = P(a.type, r.dtype);
      (a.position === void 0 || Ts(a.position, c) !== Ts(r.dposition)) && (a.position = r.dposition), n[l] = !0;
      let d = null;
      if (l in s && s[l].type === h)
        d = s[l];
      else {
        const f = rt.getScale(h);
        d = new f({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), s[d.id] = d;
      }
      d.init(a, t);
    }), E(n, (r, a) => {
      r || delete s[a];
    }), E(s, (r) => {
      Y.configure(this, r, r.options), Y.addBox(this, r);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, s = t.length;
    if (t.sort((n, o) => n.index - o.index), s > e) {
      for (let n = e; n < s; ++n)
        this._destroyDatasetMeta(n);
      t.splice(e, s - e);
    }
    this._sortedMetasets = t.slice(0).sort(Rs("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: e } } = this;
    t.length > e.length && delete this._stacks, t.forEach((s, n) => {
      e.filter((o) => o === s._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], e = this.data.datasets;
    let s, n;
    for (this._removeUnreferencedMetasets(), s = 0, n = e.length; s < n; s++) {
      const o = e[s];
      let r = this.getDatasetMeta(s);
      const a = o.type || this.config.type;
      if (r.type && r.type !== a && (this._destroyDatasetMeta(s), r = this.getDatasetMeta(s)), r.type = a, r.indexAxis = o.indexAxis || ui(a, this.options), r.order = o.order || 0, r.index = s, r.label = "" + o.label, r.visible = this.isDatasetVisible(s), r.controller)
        r.controller.updateIndex(s), r.controller.linkScales();
      else {
        const l = rt.getController(a), { datasetElementType: c, dataElementType: h } = D.datasets[a];
        Object.assign(l.prototype, {
          dataElementType: rt.getElement(h),
          datasetElementType: c && rt.getElement(c)
        }), r.controller = new l(this, s), t.push(r.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    E(this.data.datasets, (t, e) => {
      this.getDatasetMeta(e).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const s = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", { mode: t, cancelable: !0 }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let r = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: d } = this.getDatasetMeta(c), f = !n && o.indexOf(d) === -1;
      d.buildOrUpdateElements(f), r = Math.max(+d.getMaxOverflow(), r);
    }
    r = this._minPadding = s.layout.autoPadding ? r : 0, this._updateLayout(r), n || E(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", { mode: t }), this._layers.sort(Rs("z", "_idx"));
    const { _active: a, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    E(this.scales, (t) => {
      Y.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!$i(e, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: s, start: n, count: o } of e) {
      const r = s === "_removeElements" ? -o : o;
      cl(t, n, r);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, s = (o) => new Set(
      t.filter((r) => r[0] === o).map((r, a) => a + "," + r.splice(1).join(","))
    ), n = s(0);
    for (let o = 1; o < e; o++)
      if (!$i(n, s(o)))
        return;
    return Array.from(n).map((o) => o.split(",")).map((o) => ({ method: o[1], start: +o[2], count: +o[3] }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", { cancelable: !0 }) === !1)
      return;
    Y.update(this, this.width, this.height, t);
    const e = this.chartArea, s = e.width <= 0 || e.height <= 0;
    this._layers = [], E(this.boxes, (n) => {
      s && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", { mode: t, cancelable: !0 }) !== !1) {
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this._updateDataset(e, gt(t) ? t({ datasetIndex: e }) : t);
      this.notifyPlugins("afterDatasetsUpdate", { mode: t });
    }
  }
  _updateDataset(t, e) {
    const s = this.getDatasetMeta(t), n = { meta: s, index: t, mode: e, cancelable: !0 };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (s.controller._update(e), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", { cancelable: !0 }) !== !1 && (ot.has(this) ? this.attached && !ot.running(this) && ot.start(this) : (this.draw(), Es({ chart: this })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: s, height: n } = this._resizeBeforeDraw;
      this._resize(s, n), this._resizeBeforeDraw = null;
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", { cancelable: !0 }) === !1)
      return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t)
      e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t)
      e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets, s = [];
    let n, o;
    for (n = 0, o = e.length; n < o; ++n) {
      const r = e[n];
      (!t || r.visible) && s.push(r);
    }
    return s;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e)
      this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx, s = t._clip, n = !s.disabled, o = this.chartArea, r = {
      meta: t,
      index: t.index,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetDraw", r) !== !1 && (n && ze(e, {
      left: s.left === !1 ? 0 : o.left - s.left,
      right: s.right === !1 ? this.width : o.right + s.right,
      top: s.top === !1 ? 0 : o.top - s.top,
      bottom: s.bottom === !1 ? this.height : o.bottom + s.bottom
    }), t.controller.draw(), n && Be(e), r.cancelable = !1, this.notifyPlugins("afterDatasetDraw", r));
  }
  getElementsAtEventForMode(t, e, s, n) {
    const o = Rn.modes[e];
    return typeof o == "function" ? o(this, t, s, n) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t], s = this._metasets;
    let n = s.filter((o) => o && o._dataset === e).pop();
    return n || (n = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: e && e.order || 0,
      index: t,
      _dataset: e,
      _parsed: [],
      _sorted: !1
    }, s.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = pt(null, { chart: this, type: "chart" }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e)
      return !1;
    const s = this.getDatasetMeta(t);
    return typeof s.hidden == "boolean" ? !s.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    const s = this.getDatasetMeta(t);
    s.hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, s) {
    const n = s ? "show" : "hide", o = this.getDatasetMeta(t), r = o.controller._resolveAnimations(void 0, n);
    tt(e) ? (o.data[e].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), r.update(o, { visible: s }), this.update((a) => a.datasetIndex === t ? n : void 0));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (this.stop(), ot.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), es(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), this.notifyPlugins("destroy"), delete Re[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, s = (o, r) => {
      e.addEventListener(this, o, r), t[o] = r;
    }, n = (o, r, a) => {
      o.offsetX = r, o.offsetY = a, this._eventHandler(o);
    };
    E(this.options.events, (o) => s(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, e = this.platform, s = (l, c) => {
      e.addEventListener(this, l, c), t[l] = c;
    }, n = (l, c) => {
      t[l] && (e.removeEventListener(this, l, c), delete t[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let r;
    const a = () => {
      n("attach", a), this.attached = !0, this.resize(), s("resize", o), s("detach", r);
    };
    r = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), s("attach", a);
    }, e.isAttached(this.canvas) ? a() : r();
  }
  unbindEvents() {
    E(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, E(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, s) {
    const n = s ? "set" : "remove";
    let o, r, a, l;
    for (e === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), a = 0, l = t.length; a < l; ++a) {
      r = t[a];
      const c = r && this.getDatasetMeta(r.datasetIndex).controller;
      c && c[n + "HoverStyle"](r.element, r.datasetIndex, r.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], s = t.map(({ datasetIndex: o, index: r }) => {
      const a = this.getDatasetMeta(o);
      if (!a)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: a.data[r],
        index: r
      };
    });
    !ke(s, e) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, e));
  }
  notifyPlugins(t, e, s) {
    return this._plugins.notify(this, t, e, s);
  }
  _updateHoverStyles(t, e, s) {
    const n = this.options.hover, o = (l, c) => l.filter((h) => !c.some((d) => h.datasetIndex === d.datasetIndex && h.index === d.index)), r = o(e, t), a = s ? t : o(t, e);
    r.length && this.updateHoverStyle(r, n.mode, !1), a.length && n.mode && this.updateHoverStyle(a, n.mode, !0);
  }
  _eventHandler(t, e) {
    const s = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: St(t, this.chartArea, this._minPadding)
    }, n = (r) => (r.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, n) === !1)
      return;
    const o = this._handleEvent(t, e, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, n), (o || s.changed) && this.render(), this;
  }
  _handleEvent(t, e, s) {
    const { _active: n = [], options: o } = this, r = e, a = this._getActiveElements(t, n, s, r), l = co(t), c = hl(t, this._lastEvent, s, l);
    s && (this._lastEvent = null, z(o.onHover, [t, a, this], this), l && z(o.onClick, [t, a, this], this));
    const h = !ke(a, n);
    return (h || e) && (this._active = a, this._updateHoverStyles(a, n, e)), this._lastEvent = c, h;
  }
  _getActiveElements(t, e, s, n) {
    if (t.type === "mouseout")
      return [];
    if (!s)
      return e;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
}
const Fs = () => E(zi.instances, (i) => i._plugins.invalidate()), ft = !0;
Object.defineProperties(zi, {
  defaults: {
    enumerable: ft,
    value: D
  },
  instances: {
    enumerable: ft,
    value: Re
  },
  overrides: {
    enumerable: ft,
    value: kt
  },
  registry: {
    enumerable: ft,
    value: rt
  },
  version: {
    enumerable: ft,
    value: rl
  },
  getChart: {
    enumerable: ft,
    value: Xn
  },
  register: {
    enumerable: ft,
    value: (...i) => {
      rt.add(...i), Fs();
    }
  },
  unregister: {
    enumerable: ft,
    value: (...i) => {
      rt.remove(...i), Fs();
    }
  }
});
function Un(i, t, e) {
  const { startAngle: s, pixelMargin: n, x: o, y: r, outerRadius: a, innerRadius: l } = t;
  let c = n / a;
  i.beginPath(), i.arc(o, r, a, s - c, e + c), l > n ? (c = n / l, i.arc(o, r, l, e + c, s - c, !0)) : i.arc(o, r, n, e + W, s - W), i.closePath(), i.clip();
}
function dl(i) {
  return Ci(i, ["outerStart", "outerEnd", "innerStart", "innerEnd"]);
}
function fl(i, t, e, s) {
  const n = dl(i.options.borderRadius), o = (e - t) / 2, r = Math.min(o, s * t / 2), a = (l) => {
    const c = (e - Math.min(o, l)) * s / 2;
    return $(l, 0, Math.min(o, c));
  };
  return {
    outerStart: a(n.outerStart),
    outerEnd: a(n.outerEnd),
    innerStart: $(n.innerStart, 0, r),
    innerEnd: $(n.innerEnd, 0, r)
  };
}
function Dt(i, t, e, s) {
  return {
    x: e + i * Math.cos(t),
    y: s + i * Math.sin(t)
  };
}
function pi(i, t, e, s, n) {
  const { x: o, y: r, startAngle: a, pixelMargin: l, innerRadius: c } = t, h = Math.max(t.outerRadius + s + e - l, 0), d = c > 0 ? c + s + e + l : 0;
  let f = 0;
  const u = n - a;
  if (s) {
    const F = c > 0 ? c - s : 0, Et = h > 0 ? h - s : 0, xt = (F + Et) / 2, Ft = xt !== 0 ? u * xt / (xt + s) : u;
    f = (u - Ft) / 2;
  }
  const g = Math.max(1e-3, u * h - e / V) / h, p = (u - g) / 2, m = a + p + f, b = n - p - f, { outerStart: x, outerEnd: v, innerStart: y, innerEnd: _ } = fl(t, d, h, b - m), w = h - x, M = h - v, S = m + x / w, k = b - v / M, R = d + y, L = d + _, A = m + y / R, H = b - _ / L;
  if (i.beginPath(), i.arc(o, r, h, S, k), v > 0) {
    const F = Dt(M, k, o, r);
    i.arc(F.x, F.y, v, k, b + W);
  }
  const K = Dt(L, b, o, r);
  if (i.lineTo(K.x, K.y), _ > 0) {
    const F = Dt(L, H, o, r);
    i.arc(F.x, F.y, _, b + W, H + Math.PI);
  }
  if (i.arc(o, r, d, b - _ / d, m + y / d, !0), y > 0) {
    const F = Dt(R, A, o, r);
    i.arc(F.x, F.y, y, A + Math.PI, m - W);
  }
  const C = Dt(w, m, o, r);
  if (i.lineTo(C.x, C.y), x > 0) {
    const F = Dt(w, S, o, r);
    i.arc(F.x, F.y, x, m - W, S);
  }
  i.closePath();
}
function ul(i, t, e, s) {
  const { fullCircles: n, startAngle: o, circumference: r } = t;
  let a = t.endAngle;
  if (n) {
    pi(i, t, e, s, o + I);
    for (let l = 0; l < n; ++l)
      i.fill();
    isNaN(r) || (a = o + r % I, r % I === 0 && (a += I));
  }
  return pi(i, t, e, s, a), i.fill(), a;
}
function gl(i, t, e) {
  const { x: s, y: n, startAngle: o, pixelMargin: r, fullCircles: a } = t, l = Math.max(t.outerRadius - r, 0), c = t.innerRadius + r;
  let h;
  for (e && Un(i, t, o + I), i.beginPath(), i.arc(s, n, c, o + I, o, !0), h = 0; h < a; ++h)
    i.stroke();
  for (i.beginPath(), i.arc(s, n, l, o, o + I), h = 0; h < a; ++h)
    i.stroke();
}
function pl(i, t, e, s, n) {
  const { options: o } = t, { borderWidth: r, borderJoinStyle: a } = o, l = o.borderAlign === "inner";
  r && (l ? (i.lineWidth = r * 2, i.lineJoin = a || "round") : (i.lineWidth = r, i.lineJoin = a || "bevel"), t.fullCircles && gl(i, t, l), l && Un(i, t, n), pi(i, t, e, s, n), i.stroke());
}
class Ye extends et {
  constructor(t) {
    super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, t && Object.assign(this, t);
  }
  inRange(t, e, s) {
    const n = this.getProps(["x", "y"], s), { angle: o, distance: r } = ln(n, { x: t, y: e }), { startAngle: a, endAngle: l, innerRadius: c, outerRadius: h, circumference: d } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), f = this.options.spacing / 2, g = P(d, l - a) >= I || ee(o, a, l), p = ht(r, c + f, h + f);
    return g && p;
  }
  getCenterPoint(t) {
    const { x: e, y: s, startAngle: n, endAngle: o, innerRadius: r, outerRadius: a } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], t), { offset: l, spacing: c } = this.options, h = (n + o) / 2, d = (r + a + c + l) / 2;
    return {
      x: e + Math.cos(h) * d,
      y: s + Math.sin(h) * d
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: e, circumference: s } = this, n = (e.offset || 0) / 2, o = (e.spacing || 0) / 2;
    if (this.pixelMargin = e.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > I ? Math.floor(s / I) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    let r = 0;
    if (n) {
      r = n / 2;
      const l = (this.startAngle + this.endAngle) / 2;
      t.translate(Math.cos(l) * r, Math.sin(l) * r), this.circumference >= V && (r = n);
    }
    t.fillStyle = e.backgroundColor, t.strokeStyle = e.borderColor;
    const a = ul(t, this, r, o);
    pl(t, this, r, o, a), t.restore();
  }
}
Ye.id = "arc";
Ye.defaults = {
  borderAlign: "center",
  borderColor: "#fff",
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0
};
Ye.defaultRoutes = {
  backgroundColor: "backgroundColor"
};
function Kn(i, t, e = t) {
  i.lineCap = P(e.borderCapStyle, t.borderCapStyle), i.setLineDash(P(e.borderDash, t.borderDash)), i.lineDashOffset = P(e.borderDashOffset, t.borderDashOffset), i.lineJoin = P(e.borderJoinStyle, t.borderJoinStyle), i.lineWidth = P(e.borderWidth, t.borderWidth), i.strokeStyle = P(e.borderColor, t.borderColor);
}
function ml(i, t, e) {
  i.lineTo(e.x, e.y);
}
function bl(i) {
  return i.stepped ? Vo : i.tension || i.cubicInterpolationMode === "monotone" ? Wo : ml;
}
function qn(i, t, e = {}) {
  const s = i.length, { start: n = 0, end: o = s - 1 } = e, { start: r, end: a } = t, l = Math.max(n, r), c = Math.min(o, a), h = n < r && o < r || n > a && o > a;
  return {
    count: s,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? s + c - l : c - l
  };
}
function xl(i, t, e, s) {
  const { points: n, options: o } = t, { count: r, start: a, loop: l, ilen: c } = qn(n, e, s), h = bl(o);
  let { move: d = !0, reverse: f } = s || {}, u, g, p;
  for (u = 0; u <= c; ++u)
    g = n[(a + (f ? c - u : u)) % r], !g.skip && (d ? (i.moveTo(g.x, g.y), d = !1) : h(i, p, g, f, o.stepped), p = g);
  return l && (g = n[(a + (f ? c : 0)) % r], h(i, p, g, f, o.stepped)), !!l;
}
function _l(i, t, e, s) {
  const n = t.points, { count: o, start: r, ilen: a } = qn(n, e, s), { move: l = !0, reverse: c } = s || {};
  let h = 0, d = 0, f, u, g, p, m, b;
  const x = (y) => (r + (c ? a - y : y)) % o, v = () => {
    p !== m && (i.lineTo(h, m), i.lineTo(h, p), i.lineTo(h, b));
  };
  for (l && (u = n[x(0)], i.moveTo(u.x, u.y)), f = 0; f <= a; ++f) {
    if (u = n[x(f)], u.skip)
      continue;
    const y = u.x, _ = u.y, w = y | 0;
    w === g ? (_ < p ? p = _ : _ > m && (m = _), h = (d * h + y) / ++d) : (v(), i.lineTo(y, _), g = w, d = 0, p = m = _), b = _;
  }
  v();
}
function mi(i) {
  const t = i.options, e = t.borderDash && t.borderDash.length;
  return !i._decimated && !i._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? _l : xl;
}
function yl(i) {
  return i.stepped ? yr : i.tension || i.cubicInterpolationMode === "monotone" ? vr : vt;
}
function vl(i, t, e, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, e, s) && n.closePath()), Kn(i, t.options), i.stroke(n);
}
function Ml(i, t, e, s) {
  const { segments: n, options: o } = t, r = mi(t);
  for (const a of n)
    Kn(i, o, a.style), i.beginPath(), r(i, t, a, { start: e, end: e + s - 1 }) && i.closePath(), i.stroke();
}
const wl = typeof Path2D == "function";
function kl(i, t, e, s) {
  wl && !t.options.segment ? vl(i, t, e, s) : Ml(i, t, e, s);
}
class bt extends et {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const n = s.spanGaps ? this._loop : this._fullLoop;
      fr(this._points, s, t, n, e), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Dr(this, this.options.segment));
  }
  first() {
    const t = this.segments, e = this.points;
    return t.length && e[t[0].start];
  }
  last() {
    const t = this.segments, e = this.points, s = t.length;
    return s && e[t[s - 1].end];
  }
  interpolate(t, e) {
    const s = this.options, n = t[e], o = this.points, r = Dn(this, { property: e, start: n, end: n });
    if (!r.length)
      return;
    const a = [], l = yl(s);
    let c, h;
    for (c = 0, h = r.length; c < h; ++c) {
      const { start: d, end: f } = r[c], u = o[d], g = o[f];
      if (u === g) {
        a.push(u);
        continue;
      }
      const p = Math.abs((n - u[e]) / (g[e] - u[e])), m = l(u, g, p, s.stepped);
      m[e] = t[e], a.push(m);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(t, e, s) {
    return mi(this)(t, this, e, s);
  }
  path(t, e, s) {
    const n = this.segments, o = mi(this);
    let r = this._loop;
    e = e || 0, s = s || this.points.length - e;
    for (const a of n)
      r &= o(t, this, a, { start: e, end: e + s - 1 });
    return !!r;
  }
  draw(t, e, s, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), kl(t, this, s, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
bt.id = "line";
bt.defaults = {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
};
bt.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
};
bt.descriptors = {
  _scriptable: !0,
  _indexable: (i) => i !== "borderDash" && i !== "fill"
};
function Is(i, t, e, s) {
  const n = i.options, { [e]: o } = i.getProps([e], s);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class Xe extends et {
  constructor(t) {
    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t);
  }
  inRange(t, e, s) {
    const n = this.options, { x: o, y: r } = this.getProps(["x", "y"], s);
    return Math.pow(t - o, 2) + Math.pow(e - r, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(t, e) {
    return Is(this, t, "x", e);
  }
  inYRange(t, e) {
    return Is(this, t, "y", e);
  }
  getCenterPoint(t) {
    const { x: e, y: s } = this.getProps(["x", "y"], t);
    return { x: e, y: s };
  }
  size(t) {
    t = t || this.options || {};
    let e = t.radius || 0;
    e = Math.max(e, e && t.hoverRadius || 0);
    const s = e && t.borderWidth || 0;
    return (e + s) * 2;
  }
  draw(t, e) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !St(this, e, this.size(s) / 2) || (t.strokeStyle = s.borderColor, t.lineWidth = s.borderWidth, t.fillStyle = s.backgroundColor, Oe(t, s, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
Xe.id = "point";
Xe.defaults = {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
};
Xe.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
};
function Gn(i, t) {
  const { x: e, y: s, base: n, width: o, height: r } = i.getProps(["x", "y", "base", "width", "height"], t);
  let a, l, c, h, d;
  return i.horizontal ? (d = r / 2, a = Math.min(e, n), l = Math.max(e, n), c = s - d, h = s + d) : (d = o / 2, a = e - d, l = e + d, c = Math.min(s, n), h = Math.max(s, n)), { left: a, top: c, right: l, bottom: h };
}
function ut(i, t, e, s) {
  return i ? 0 : $(t, e, s);
}
function Sl(i, t, e) {
  const s = i.options.borderWidth, n = i.borderSkipped, o = gn(s);
  return {
    t: ut(n.top, o.top, 0, e),
    r: ut(n.right, o.right, 0, t),
    b: ut(n.bottom, o.bottom, 0, e),
    l: ut(n.left, o.left, 0, t)
  };
}
function Pl(i, t, e) {
  const { enableBorderRadius: s } = i.getProps(["enableBorderRadius"]), n = i.options.borderRadius, o = Ot(n), r = Math.min(t, e), a = i.borderSkipped, l = s || O(n);
  return {
    topLeft: ut(!l || a.top || a.left, o.topLeft, 0, r),
    topRight: ut(!l || a.top || a.right, o.topRight, 0, r),
    bottomLeft: ut(!l || a.bottom || a.left, o.bottomLeft, 0, r),
    bottomRight: ut(!l || a.bottom || a.right, o.bottomRight, 0, r)
  };
}
function Cl(i) {
  const t = Gn(i), e = t.right - t.left, s = t.bottom - t.top, n = Sl(i, e / 2, s / 2), o = Pl(i, e / 2, s / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: e,
      h: s,
      radius: o
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: e - n.l - n.r,
      h: s - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function ri(i, t, e, s) {
  const n = t === null, o = e === null, a = i && !(n && o) && Gn(i, s);
  return a && (n || ht(t, a.left, a.right)) && (o || ht(e, a.top, a.bottom));
}
function Dl(i) {
  return i.topLeft || i.topRight || i.bottomLeft || i.bottomRight;
}
function Ol(i, t) {
  i.rect(t.x, t.y, t.w, t.h);
}
function ai(i, t, e = {}) {
  const s = i.x !== e.x ? -t : 0, n = i.y !== e.y ? -t : 0, o = (i.x + i.w !== e.x + e.w ? t : 0) - s, r = (i.y + i.h !== e.y + e.h ? t : 0) - n;
  return {
    x: i.x + s,
    y: i.y + n,
    w: i.w + o,
    h: i.h + r,
    radius: i.radius
  };
}
class Ue extends et {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: e, options: { borderColor: s, backgroundColor: n } } = this, { inner: o, outer: r } = Cl(this), a = Dl(r.radius) ? Ae : Ol;
    t.save(), (r.w !== o.w || r.h !== o.h) && (t.beginPath(), a(t, ai(r, e, o)), t.clip(), a(t, ai(o, -e, r)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), a(t, ai(o, e)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, e, s) {
    return ri(this, t, e, s);
  }
  inXRange(t, e) {
    return ri(this, t, null, e);
  }
  inYRange(t, e) {
    return ri(this, null, t, e);
  }
  getCenterPoint(t) {
    const { x: e, y: s, base: n, horizontal: o } = this.getProps(["x", "y", "base", "horizontal"], t);
    return {
      x: o ? (e + n) / 2 : e,
      y: o ? s : (s + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
Ue.id = "bar";
Ue.defaults = {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
};
Ue.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
};
function Al(i, t, e, s, n) {
  const o = n.samples || s;
  if (o >= e)
    return i.slice(t, t + e);
  const r = [], a = (e - 2) / (o - 2);
  let l = 0;
  const c = t + e - 1;
  let h = t, d, f, u, g, p;
  for (r[l++] = i[h], d = 0; d < o - 2; d++) {
    let m = 0, b = 0, x;
    const v = Math.floor((d + 1) * a) + 1 + t, y = Math.min(Math.floor((d + 2) * a) + 1, e) + t, _ = y - v;
    for (x = v; x < y; x++)
      m += i[x].x, b += i[x].y;
    m /= _, b /= _;
    const w = Math.floor(d * a) + 1 + t, M = Math.min(Math.floor((d + 1) * a) + 1, e) + t, { x: S, y: k } = i[h];
    for (u = g = -1, x = w; x < M; x++)
      g = 0.5 * Math.abs(
        (S - m) * (i[x].y - k) - (S - i[x].x) * (b - k)
      ), g > u && (u = g, f = i[x], p = x);
    r[l++] = f, h = p;
  }
  return r[l++] = i[c], r;
}
function Ll(i, t, e, s) {
  let n = 0, o = 0, r, a, l, c, h, d, f, u, g, p;
  const m = [], b = t + e - 1, x = i[t].x, y = i[b].x - x;
  for (r = t; r < t + e; ++r) {
    a = i[r], l = (a.x - x) / y * s, c = a.y;
    const _ = l | 0;
    if (_ === h)
      c < g ? (g = c, d = r) : c > p && (p = c, f = r), n = (o * n + a.x) / ++o;
    else {
      const w = r - 1;
      if (!T(d) && !T(f)) {
        const M = Math.min(d, f), S = Math.max(d, f);
        M !== u && M !== w && m.push({
          ...i[M],
          x: n
        }), S !== u && S !== w && m.push({
          ...i[S],
          x: n
        });
      }
      r > 0 && w !== u && m.push(i[w]), m.push(a), h = _, o = 0, g = p = c, d = f = u = r;
    }
  }
  return m;
}
function Zn(i) {
  if (i._decimated) {
    const t = i._data;
    delete i._decimated, delete i._data, Object.defineProperty(i, "data", { value: t });
  }
}
function zs(i) {
  i.data.datasets.forEach((t) => {
    Zn(t);
  });
}
function Tl(i, t) {
  const e = t.length;
  let s = 0, n;
  const { iScale: o } = i, { min: r, max: a, minDefined: l, maxDefined: c } = o.getUserBounds();
  return l && (s = $(dt(t, o.axis, r).lo, 0, e - 1)), c ? n = $(dt(t, o.axis, a).hi + 1, s, e) - s : n = e - s, { start: s, count: n };
}
var Rl = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (i, t, e) => {
    if (!e.enabled) {
      zs(i);
      return;
    }
    const s = i.width;
    i.data.datasets.forEach((n, o) => {
      const { _data: r, indexAxis: a } = n, l = i.getDatasetMeta(o), c = r || n.data;
      if (Yt([a, i.options.indexAxis]) === "y" || l.type !== "line")
        return;
      const h = i.scales[l.xAxisID];
      if (h.type !== "linear" && h.type !== "time" || i.options.parsing)
        return;
      let { start: d, count: f } = Tl(l, c);
      const u = e.threshold || 4 * s;
      if (f <= u) {
        Zn(n);
        return;
      }
      T(r) && (n._data = c, delete n.data, Object.defineProperty(n, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(p) {
          this._data = p;
        }
      }));
      let g;
      switch (e.algorithm) {
        case "lttb":
          g = Al(c, d, f, s, e);
          break;
        case "min-max":
          g = Ll(c, d, f, s);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`);
      }
      n._decimated = g;
    });
  },
  destroy(i) {
    zs(i);
  }
};
function El(i, t) {
  const e = i.getDatasetMeta(t);
  return e && i.isDatasetVisible(t) ? e.dataset : null;
}
function Fl(i) {
  const t = i.options, e = t.fill;
  let s = P(e && e.target, e);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function Il(i, t, e) {
  const s = Fl(i);
  if (O(s))
    return isNaN(s.value) ? !1 : s;
  let n = parseFloat(s);
  return N(n) && Math.floor(n) === n ? ((s[0] === "-" || s[0] === "+") && (n = t + n), n === t || n < 0 || n >= e ? !1 : n) : ["origin", "start", "end", "stack", "shape"].indexOf(s) >= 0 && s;
}
function zl(i) {
  const { scale: t = {}, fill: e } = i;
  let s = null, n;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : O(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), N(s) ? (n = t.isHorizontal(), {
    x: n ? s : null,
    y: n ? null : s
  }) : null;
}
class Jn {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, e, s) {
    const { x: n, y: o, radius: r } = this;
    return e = e || { start: 0, end: I }, t.arc(n, o, r, e.end, e.start, !0), !s.bounds;
  }
  interpolate(t) {
    const { x: e, y: s, radius: n } = this, o = t.angle;
    return {
      x: e + Math.cos(o) * n,
      y: s + Math.sin(o) * n,
      angle: o
    };
  }
}
function Bl(i) {
  const { scale: t, fill: e } = i, s = t.options, n = t.getLabels().length, o = [], r = s.reverse ? t.max : t.min, a = s.reverse ? t.min : t.max;
  let l, c, h;
  if (e === "start" ? h = r : e === "end" ? h = a : O(e) ? h = e.value : h = t.getBaseValue(), s.grid.circular)
    return c = t.getPointPositionForValue(0, r), new Jn({
      x: c.x,
      y: c.y,
      radius: t.getDistanceFromCenterForValue(h)
    });
  for (l = 0; l < n; ++l)
    o.push(t.getPointPositionForValue(l, h));
  return o;
}
function Vl(i) {
  return (i.scale || {}).getPointPositionForValue ? Bl(i) : zl(i);
}
function Bi(i, t, e) {
  for (; t > i; t--) {
    const s = e[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function Wl(i, t) {
  const { x: e = null, y: s = null } = i || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: r, end: a }) => {
    a = Bi(r, a, n);
    const l = n[r], c = n[a];
    s !== null ? (o.push({ x: l.x, y: s }), o.push({ x: c.x, y: s })) : e !== null && (o.push({ x: e, y: l.y }), o.push({ x: e, y: c.y }));
  }), o;
}
function Nl(i) {
  const { scale: t, index: e, line: s } = i, n = [], o = s.segments, r = s.points, a = Hl(t, e);
  a.push(Qn({ x: null, y: t.bottom }, s));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let h = c.start; h <= c.end; h++)
      jl(n, r[h], a);
  }
  return new bt({ points: n, options: {} });
}
function Hl(i, t) {
  const e = [], s = i.getMatchingVisibleMetas("line");
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    if (o.index === t)
      break;
    o.hidden || e.unshift(o.dataset);
  }
  return e;
}
function jl(i, t, e) {
  const s = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n], { first: r, last: a, point: l } = $l(o, t, "x");
    if (!(!l || r && a)) {
      if (r)
        s.unshift(l);
      else if (i.push(l), !a)
        break;
    }
  }
  i.push(...s);
}
function $l(i, t, e) {
  const s = i.interpolate(t, e);
  if (!s)
    return {};
  const n = s[e], o = i.segments, r = i.points;
  let a = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const h = o[c], d = r[h.start][e], f = r[h.end][e];
    if (ht(n, d, f)) {
      a = n === d, l = n === f;
      break;
    }
  }
  return { first: a, last: l, point: s };
}
function Yl(i) {
  const { chart: t, fill: e, line: s } = i;
  if (N(e))
    return El(t, e);
  if (e === "stack")
    return Nl(i);
  if (e === "shape")
    return !0;
  const n = Vl(i);
  return n instanceof Jn ? n : Qn(n, s);
}
function Qn(i, t) {
  let e = [], s = !1;
  return B(i) ? (s = !0, e = i) : e = Wl(i, t), e.length ? new bt({
    points: e,
    options: { tension: 0 },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function Xl(i, t, e) {
  let n = i[t].fill;
  const o = [t];
  let r;
  if (!e)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!N(n))
      return n;
    if (r = i[n], !r)
      return !1;
    if (r.visible)
      return n;
    o.push(n), n = r.fill;
  }
  return !1;
}
function Bs(i, t, e) {
  const { segments: s, points: n } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of s) {
    const { start: l, end: c } = a, h = n[l], d = n[Bi(l, c, n)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(h.x, e), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, { move: r }), r ? i.closePath() : i.lineTo(d.x, e);
  }
  i.lineTo(t.first().x, e), i.closePath(), i.clip();
}
function bi(i, t, e, s) {
  if (s)
    return;
  let n = t[i], o = e[i];
  return i === "angle" && (n = G(n), o = G(o)), { property: i, start: n, end: o };
}
function Vs(i, t, e, s) {
  return i && t ? s(i[e], t[e]) : i ? i[e] : t ? t[e] : 0;
}
function Ul(i, t, e) {
  const s = i.segments, n = i.points, o = t.points, r = [];
  for (const a of s) {
    let { start: l, end: c } = a;
    c = Bi(l, c, n);
    const h = bi(e, n[l], n[c], a.loop);
    if (!t.segments) {
      r.push({
        source: a,
        target: h,
        start: n[l],
        end: n[c]
      });
      continue;
    }
    const d = Dn(t, h);
    for (const f of d) {
      const u = bi(e, o[f.start], o[f.end], f.loop), g = Cn(a, n, u);
      for (const p of g)
        r.push({
          source: p,
          target: f,
          start: {
            [e]: Vs(h, u, "start", Math.max)
          },
          end: {
            [e]: Vs(h, u, "end", Math.min)
          }
        });
    }
  }
  return r;
}
function Kl(i, t, e) {
  const { top: s, bottom: n } = t.chart.chartArea, { property: o, start: r, end: a } = e || {};
  o === "x" && (i.beginPath(), i.rect(r, s, a - r, n - s), i.clip());
}
function Ws(i, t, e, s) {
  const n = t.interpolate(e, s);
  n && i.lineTo(n.x, n.y);
}
function Ns(i, t) {
  const { line: e, target: s, property: n, color: o, scale: r } = t, a = Ul(e, s, n);
  for (const { source: l, target: c, start: h, end: d } of a) {
    const { style: { backgroundColor: f = o } = {} } = l, u = s !== !0;
    i.save(), i.fillStyle = f, Kl(i, r, u && bi(n, h, d)), i.beginPath();
    const g = !!e.pathSegment(i, l);
    let p;
    if (u) {
      g ? i.closePath() : Ws(i, s, d, n);
      const m = !!s.pathSegment(i, c, { move: g, reverse: !0 });
      p = g && m, p || Ws(i, s, h, n);
    }
    i.closePath(), i.fill(p ? "evenodd" : "nonzero"), i.restore();
  }
}
function ql(i, t) {
  const { line: e, target: s, above: n, below: o, area: r, scale: a } = t, l = e._loop ? "angle" : t.axis;
  i.save(), l === "x" && o !== n && (Bs(i, s, r.top), Ns(i, { line: e, target: s, color: n, scale: a, property: l }), i.restore(), i.save(), Bs(i, s, r.bottom)), Ns(i, { line: e, target: s, color: o, scale: a, property: l }), i.restore();
}
function li(i, t, e) {
  const s = Yl(t), { line: n, scale: o, axis: r } = t, a = n.options, l = a.fill, c = a.backgroundColor, { above: h = c, below: d = c } = l || {};
  s && n.points.length && (ze(i, e), ql(i, { line: n, target: s, above: h, below: d, area: e, scale: o, axis: r }), Be(i));
}
var Gl = {
  id: "filler",
  afterDatasetsUpdate(i, t, e) {
    const s = (i.data.datasets || []).length, n = [];
    let o, r, a, l;
    for (r = 0; r < s; ++r)
      o = i.getDatasetMeta(r), a = o.dataset, l = null, a && a.options && a instanceof bt && (l = {
        visible: i.isDatasetVisible(r),
        index: r,
        fill: Il(a, r, s),
        chart: i,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: a
      }), o.$filler = l, n.push(l);
    for (r = 0; r < s; ++r)
      l = n[r], !(!l || l.fill === !1) && (l.fill = Xl(n, r, e.propagate));
  },
  beforeDraw(i, t, e) {
    const s = e.drawTime === "beforeDraw", n = i.getSortedVisibleDatasetMetas(), o = i.chartArea;
    for (let r = n.length - 1; r >= 0; --r) {
      const a = n[r].$filler;
      a && (a.line.updateControlPoints(o, a.axis), s && li(i.ctx, a, o));
    }
  },
  beforeDatasetsDraw(i, t, e) {
    if (e.drawTime !== "beforeDatasetsDraw")
      return;
    const s = i.getSortedVisibleDatasetMetas();
    for (let n = s.length - 1; n >= 0; --n) {
      const o = s[n].$filler;
      o && li(i.ctx, o, i.chartArea);
    }
  },
  beforeDatasetDraw(i, t, e) {
    const s = t.meta.$filler;
    !s || s.fill === !1 || e.drawTime !== "beforeDatasetDraw" || li(i.ctx, s, i.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Hs = (i, t) => {
  let { boxHeight: e = t, boxWidth: s = t } = i;
  return i.usePointStyle && (e = Math.min(e, t), s = Math.min(s, t)), {
    boxWidth: s,
    boxHeight: e,
    itemHeight: Math.max(t, e)
  };
}, Zl = (i, t) => i !== null && t !== null && i.datasetIndex === t.datasetIndex && i.index === t.index;
class js extends et {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e, s) {
    this.maxWidth = t, this.maxHeight = e, this._margins = s, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let e = z(t.generateLabels, [this.chart], this) || [];
    t.filter && (e = e.filter((s) => t.filter(s, this.chart.data))), t.sort && (e = e.sort((s, n) => t.sort(s, n, this.chart.data))), this.options.reverse && e.reverse(), this.legendItems = e;
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const s = t.labels, n = j(s.font), o = n.size, r = this._computeTitleHeight(), { boxWidth: a, itemHeight: l } = Hs(s, o);
    let c, h;
    e.font = n.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(r, o, a, l) + 10) : (h = this.maxHeight, c = this._fitCols(r, o, a, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, e, s, n) {
    const { ctx: o, maxWidth: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [0], h = n + a;
    let d = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let f = -1, u = -h;
    return this.legendItems.forEach((g, p) => {
      const m = s + e / 2 + o.measureText(g.text).width;
      (p === 0 || c[c.length - 1] + m + 2 * a > r) && (d += h, c[c.length - (p > 0 ? 0 : 1)] = 0, u += h, f++), l[p] = { left: 0, top: u, row: f, width: m, height: n }, c[c.length - 1] += m + a;
    }), d;
  }
  _fitCols(t, e, s, n) {
    const { ctx: o, maxHeight: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = r - t;
    let d = a, f = 0, u = 0, g = 0, p = 0;
    return this.legendItems.forEach((m, b) => {
      const x = s + e / 2 + o.measureText(m.text).width;
      b > 0 && u + n + 2 * a > h && (d += f + a, c.push({ width: f, height: u }), g += f + a, p++, f = u = 0), l[b] = { left: g, top: u, col: p, width: x, height: n }, f = Math.max(f, x), u += n + a;
    }), d += f, c.push({ width: f, height: u }), d;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: e, options: { align: s, labels: { padding: n }, rtl: o } } = this, r = At(o, this.left, this.width);
    if (this.isHorizontal()) {
      let a = 0, l = X(s, this.left + n, this.right - this.lineWidths[a]);
      for (const c of e)
        a !== c.row && (a = c.row, l = X(s, this.left + n, this.right - this.lineWidths[a])), c.top += this.top + t + n, c.left = r.leftForLtr(r.x(l), c.width), l += c.width + n;
    } else {
      let a = 0, l = X(s, this.top + t + n, this.bottom - this.columnSizes[a].height);
      for (const c of e)
        c.col !== a && (a = c.col, l = X(s, this.top + t + n, this.bottom - this.columnSizes[a].height)), c.top = l, c.left += this.left + n, c.left = r.leftForLtr(r.x(c.left), c.width), l += c.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      ze(t, this), this._draw(), Be(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: s, ctx: n } = this, { align: o, labels: r } = t, a = D.color, l = At(t.rtl, this.left, this.width), c = j(r.font), { color: h, padding: d } = r, f = c.size, u = f / 2;
    let g;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = c.string;
    const { boxWidth: p, boxHeight: m, itemHeight: b } = Hs(r, f), x = function(M, S, k) {
      if (isNaN(p) || p <= 0 || isNaN(m) || m < 0)
        return;
      n.save();
      const R = P(k.lineWidth, 1);
      if (n.fillStyle = P(k.fillStyle, a), n.lineCap = P(k.lineCap, "butt"), n.lineDashOffset = P(k.lineDashOffset, 0), n.lineJoin = P(k.lineJoin, "miter"), n.lineWidth = R, n.strokeStyle = P(k.strokeStyle, a), n.setLineDash(P(k.lineDash, [])), r.usePointStyle) {
        const L = {
          radius: p * Math.SQRT2 / 2,
          pointStyle: k.pointStyle,
          rotation: k.rotation,
          borderWidth: R
        }, A = l.xPlus(M, p / 2), H = S + u;
        Oe(n, L, A, H);
      } else {
        const L = S + Math.max((f - m) / 2, 0), A = l.leftForLtr(M, p), H = Ot(k.borderRadius);
        n.beginPath(), Object.values(H).some((K) => K !== 0) ? Ae(n, {
          x: A,
          y: L,
          w: p,
          h: m,
          radius: H
        }) : n.rect(A, L, p, m), n.fill(), R !== 0 && n.stroke();
      }
      n.restore();
    }, v = function(M, S, k) {
      Pt(n, k.text, M, S + b / 2, c, {
        strikethrough: k.hidden,
        textAlign: l.textAlign(k.textAlign)
      });
    }, y = this.isHorizontal(), _ = this._computeTitleHeight();
    y ? g = {
      x: X(o, this.left + d, this.right - s[0]),
      y: this.top + d + _,
      line: 0
    } : g = {
      x: this.left + d,
      y: X(o, this.top + _ + d, this.bottom - e[0].height),
      line: 0
    }, kn(this.ctx, t.textDirection);
    const w = b + d;
    this.legendItems.forEach((M, S) => {
      n.strokeStyle = M.fontColor || h, n.fillStyle = M.fontColor || h;
      const k = n.measureText(M.text).width, R = l.textAlign(M.textAlign || (M.textAlign = r.textAlign)), L = p + u + k;
      let A = g.x, H = g.y;
      l.setWidth(this.width), y ? S > 0 && A + L + d > this.right && (H = g.y += w, g.line++, A = g.x = X(o, this.left + d, this.right - s[g.line])) : S > 0 && H + w > this.bottom && (A = g.x = A + e[g.line].width + d, g.line++, H = g.y = X(o, this.top + _ + d, this.bottom - e[g.line].height));
      const K = l.x(A);
      x(K, H, M), A = io(R, A + p + u, y ? A + L : this.right, t.rtl), v(l.x(A), H, M), y ? g.x += L + d : g.y += w;
    }), Sn(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, e = t.title, s = j(e.font), n = U(e.padding);
    if (!e.display)
      return;
    const o = At(t.rtl, this.left, this.width), r = this.ctx, a = e.position, l = s.size / 2, c = n.top + l;
    let h, d = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), h = this.top + c, d = X(t.align, d, this.right - f);
    else {
      const g = this.columnSizes.reduce((p, m) => Math.max(p, m.height), 0);
      h = c + X(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const u = X(a, d, d + f);
    r.textAlign = o.textAlign(yi(a)), r.textBaseline = "middle", r.strokeStyle = e.color, r.fillStyle = e.color, r.font = s.string, Pt(r, e.text, u, h, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, e = j(t.font), s = U(t.padding);
    return t.display ? e.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, e) {
    let s, n, o;
    if (ht(t, this.left, this.right) && ht(e, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (n = o[s], ht(t, n.left, n.left + n.width) && ht(e, n.top, n.top + n.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!Jl(t.type, e))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove") {
      const n = this._hoveredItem, o = Zl(n, s);
      n && !o && z(e.onLeave, [t, n, this], this), this._hoveredItem = s, s && !o && z(e.onHover, [t, s, this], this);
    } else
      s && z(e.onClick, [t, s, this], this);
  }
}
function Jl(i, t) {
  return !!(i === "mousemove" && (t.onHover || t.onLeave) || t.onClick && (i === "click" || i === "mouseup"));
}
var Ql = {
  id: "legend",
  _element: js,
  start(i, t, e) {
    const s = i.legend = new js({ ctx: i.ctx, options: e, chart: i });
    Y.configure(i, s, e), Y.addBox(i, s);
  },
  stop(i) {
    Y.removeBox(i, i.legend), delete i.legend;
  },
  beforeUpdate(i, t, e) {
    const s = i.legend;
    Y.configure(i, s, e), s.options = e;
  },
  afterUpdate(i) {
    const t = i.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(i, t) {
    t.replay || i.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(i, t, e) {
      const s = t.datasetIndex, n = e.chart;
      n.isDatasetVisible(s) ? (n.hide(s), t.hidden = !0) : (n.show(s), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (i) => i.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(i) {
        const t = i.data.datasets, { labels: { usePointStyle: e, pointStyle: s, textAlign: n, color: o } } = i.legend.options;
        return i._getSortedDatasetMetas().map((r) => {
          const a = r.controller.getStyle(e ? 0 : void 0), l = U(a.borderWidth);
          return {
            text: t[r.index].label,
            fillStyle: a.backgroundColor,
            fontColor: o,
            hidden: !r.visible,
            lineCap: a.borderCapStyle,
            lineDash: a.borderDash,
            lineDashOffset: a.borderDashOffset,
            lineJoin: a.borderJoinStyle,
            lineWidth: (l.width + l.height) / 4,
            strokeStyle: a.borderColor,
            pointStyle: s || a.pointStyle,
            rotation: a.rotation,
            textAlign: n || a.textAlign,
            borderRadius: 0,
            datasetIndex: r.index
          };
        }, this);
      }
    },
    title: {
      color: (i) => i.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (i) => !i.startsWith("on"),
    labels: {
      _scriptable: (i) => !["generateLabels", "filter", "sort"].includes(i)
    }
  }
};
class Vi extends et {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e) {
    const s = this.options;
    if (this.left = 0, this.top = 0, !s.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = e;
    const n = B(s.text) ? s.text.length : 1;
    this._padding = U(s.padding);
    const o = n * j(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: e, left: s, bottom: n, right: o, options: r } = this, a = r.align;
    let l = 0, c, h, d;
    return this.isHorizontal() ? (h = X(a, s, o), d = e + t, c = o - s) : (r.position === "left" ? (h = s + t, d = X(a, n, e), l = V * -0.5) : (h = o - t, d = X(a, e, n), l = V * 0.5), c = n - e), { titleX: h, titleY: d, maxWidth: c, rotation: l };
  }
  draw() {
    const t = this.ctx, e = this.options;
    if (!e.display)
      return;
    const s = j(e.font), o = s.lineHeight / 2 + this._padding.top, { titleX: r, titleY: a, maxWidth: l, rotation: c } = this._drawArgs(o);
    Pt(t, e.text, 0, 0, s, {
      color: e.color,
      maxWidth: l,
      rotation: c,
      textAlign: yi(e.align),
      textBaseline: "middle",
      translation: [r, a]
    });
  }
}
function tc(i, t) {
  const e = new Vi({
    ctx: i.ctx,
    options: t,
    chart: i
  });
  Y.configure(i, e, t), Y.addBox(i, e), i.titleBlock = e;
}
var ec = {
  id: "title",
  _element: Vi,
  start(i, t, e) {
    tc(i, e);
  },
  stop(i) {
    const t = i.titleBlock;
    Y.removeBox(i, t), delete i.titleBlock;
  },
  beforeUpdate(i, t, e) {
    const s = i.titleBlock;
    Y.configure(i, s, e), s.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const ye = /* @__PURE__ */ new WeakMap();
var ic = {
  id: "subtitle",
  start(i, t, e) {
    const s = new Vi({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    Y.configure(i, s, e), Y.addBox(i, s), ye.set(i, s);
  },
  stop(i) {
    Y.removeBox(i, ye.get(i)), ye.delete(i);
  },
  beforeUpdate(i, t, e) {
    const s = ye.get(i);
    Y.configure(i, s, e), s.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const Jt = {
  average(i) {
    if (!i.length)
      return !1;
    let t, e, s = 0, n = 0, o = 0;
    for (t = 0, e = i.length; t < e; ++t) {
      const r = i[t].element;
      if (r && r.hasValue()) {
        const a = r.tooltipPosition();
        s += a.x, n += a.y, ++o;
      }
    }
    return {
      x: s / o,
      y: n / o
    };
  },
  nearest(i, t) {
    if (!i.length)
      return !1;
    let e = t.x, s = t.y, n = Number.POSITIVE_INFINITY, o, r, a;
    for (o = 0, r = i.length; o < r; ++o) {
      const l = i[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = ci(t, c);
        h < n && (n = h, a = l);
      }
    }
    if (a) {
      const l = a.tooltipPosition();
      e = l.x, s = l.y;
    }
    return {
      x: e,
      y: s
    };
  }
};
function nt(i, t) {
  return t && (B(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i;
}
function ct(i) {
  return (typeof i == "string" || i instanceof String) && i.indexOf(`
`) > -1 ? i.split(`
`) : i;
}
function sc(i, t) {
  const { element: e, datasetIndex: s, index: n } = t, o = i.getDatasetMeta(s).controller, { label: r, value: a } = o.getLabelAndValue(n);
  return {
    chart: i,
    label: r,
    parsed: o.getParsed(n),
    raw: i.data.datasets[s].data[n],
    formattedValue: a,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: s,
    element: e
  };
}
function $s(i, t) {
  const e = i.chart.ctx, { body: s, footer: n, title: o } = i, { boxWidth: r, boxHeight: a } = t, l = j(t.bodyFont), c = j(t.titleFont), h = j(t.footerFont), d = o.length, f = n.length, u = s.length, g = U(t.padding);
  let p = g.height, m = 0, b = s.reduce((y, _) => y + _.before.length + _.lines.length + _.after.length, 0);
  if (b += i.beforeBody.length + i.afterBody.length, d && (p += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const y = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight;
    p += u * y + (b - u) * l.lineHeight + (b - 1) * t.bodySpacing;
  }
  f && (p += t.footerMarginTop + f * h.lineHeight + (f - 1) * t.footerSpacing);
  let x = 0;
  const v = function(y) {
    m = Math.max(m, e.measureText(y).width + x);
  };
  return e.save(), e.font = c.string, E(i.title, v), e.font = l.string, E(i.beforeBody.concat(i.afterBody), v), x = t.displayColors ? r + 2 + t.boxPadding : 0, E(s, (y) => {
    E(y.before, v), E(y.lines, v), E(y.after, v);
  }), x = 0, e.font = h.string, E(i.footer, v), e.restore(), m += g.width, { width: m, height: p };
}
function nc(i, t) {
  const { y: e, height: s } = t;
  return e < s / 2 ? "top" : e > i.height - s / 2 ? "bottom" : "center";
}
function oc(i, t, e, s) {
  const { x: n, width: o } = s, r = e.caretSize + e.caretPadding;
  if (i === "left" && n + o + r > t.width || i === "right" && n - o - r < 0)
    return !0;
}
function rc(i, t, e, s) {
  const { x: n, width: o } = e, { width: r, chartArea: { left: a, right: l } } = i;
  let c = "center";
  return s === "center" ? c = n <= (a + l) / 2 ? "left" : "right" : n <= o / 2 ? c = "left" : n >= r - o / 2 && (c = "right"), oc(c, i, t, e) && (c = "center"), c;
}
function Ys(i, t, e) {
  const s = e.yAlign || t.yAlign || nc(i, e);
  return {
    xAlign: e.xAlign || t.xAlign || rc(i, t, e, s),
    yAlign: s
  };
}
function ac(i, t) {
  let { x: e, width: s } = i;
  return t === "right" ? e -= s : t === "center" && (e -= s / 2), e;
}
function lc(i, t, e) {
  let { y: s, height: n } = i;
  return t === "top" ? s += e : t === "bottom" ? s -= n + e : s -= n / 2, s;
}
function Xs(i, t, e, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: r } = i, { xAlign: a, yAlign: l } = e, c = n + o, { topLeft: h, topRight: d, bottomLeft: f, bottomRight: u } = Ot(r);
  let g = ac(t, a);
  const p = lc(t, l, c);
  return l === "center" ? a === "left" ? g += c : a === "right" && (g -= c) : a === "left" ? g -= Math.max(h, f) + n : a === "right" && (g += Math.max(d, u) + n), {
    x: $(g, 0, s.width - t.width),
    y: $(p, 0, s.height - t.height)
  };
}
function ve(i, t, e) {
  const s = U(e.padding);
  return t === "center" ? i.x + i.width / 2 : t === "right" ? i.x + i.width - s.right : i.x + s.left;
}
function Us(i) {
  return nt([], ct(i));
}
function cc(i, t, e) {
  return pt(i, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function Ks(i, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? i.override(e) : i;
}
class xi extends et {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart || t._chart, this._chart = this.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const e = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && e.options.animation && s.animations, o = new Ri(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = cc(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: s } = e, n = s.beforeTitle.apply(this, [t]), o = s.title.apply(this, [t]), r = s.afterTitle.apply(this, [t]);
    let a = [];
    return a = nt(a, ct(n)), a = nt(a, ct(o)), a = nt(a, ct(r)), a;
  }
  getBeforeBody(t, e) {
    return Us(e.callbacks.beforeBody.apply(this, [t]));
  }
  getBody(t, e) {
    const { callbacks: s } = e, n = [];
    return E(t, (o) => {
      const r = {
        before: [],
        lines: [],
        after: []
      }, a = Ks(s, o);
      nt(r.before, ct(a.beforeLabel.call(this, o))), nt(r.lines, a.label.call(this, o)), nt(r.after, ct(a.afterLabel.call(this, o))), n.push(r);
    }), n;
  }
  getAfterBody(t, e) {
    return Us(e.callbacks.afterBody.apply(this, [t]));
  }
  getFooter(t, e) {
    const { callbacks: s } = e, n = s.beforeFooter.apply(this, [t]), o = s.footer.apply(this, [t]), r = s.afterFooter.apply(this, [t]);
    let a = [];
    return a = nt(a, ct(n)), a = nt(a, ct(o)), a = nt(a, ct(r)), a;
  }
  _createItems(t) {
    const e = this._active, s = this.chart.data, n = [], o = [], r = [];
    let a = [], l, c;
    for (l = 0, c = e.length; l < c; ++l)
      a.push(sc(this.chart, e[l]));
    return t.filter && (a = a.filter((h, d, f) => t.filter(h, d, f, s))), t.itemSort && (a = a.sort((h, d) => t.itemSort(h, d, s))), E(a, (h) => {
      const d = Ks(t.callbacks, h);
      n.push(d.labelColor.call(this, h)), o.push(d.labelPointStyle.call(this, h)), r.push(d.labelTextColor.call(this, h));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = r, this.dataPoints = a, a;
  }
  update(t, e) {
    const s = this.options.setContext(this.getContext()), n = this._active;
    let o, r = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const a = Jt[s.position].call(this, n, this._eventPosition);
      r = this._createItems(s), this.title = this.getTitle(r, s), this.beforeBody = this.getBeforeBody(r, s), this.body = this.getBody(r, s), this.afterBody = this.getAfterBody(r, s), this.footer = this.getFooter(r, s);
      const l = this._size = $s(this, s), c = Object.assign({}, a, l), h = Ys(this.chart, s, c), d = Xs(s, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, o = {
        opacity: 1,
        x: d.x,
        y: d.y,
        width: l.width,
        height: l.height,
        caretX: a.x,
        caretY: a.y
      };
    }
    this._tooltipItems = r, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && s.external && s.external.call(this, { chart: this.chart, tooltip: this, replay: e });
  }
  drawCaret(t, e, s, n) {
    const o = this.getCaretPosition(t, s, n);
    e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, e, s) {
    const { xAlign: n, yAlign: o } = this, { caretSize: r, cornerRadius: a } = s, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: d } = Ot(a), { x: f, y: u } = t, { width: g, height: p } = e;
    let m, b, x, v, y, _;
    return o === "center" ? (y = u + p / 2, n === "left" ? (m = f, b = m - r, v = y + r, _ = y - r) : (m = f + g, b = m + r, v = y - r, _ = y + r), x = m) : (n === "left" ? b = f + Math.max(l, h) + r : n === "right" ? b = f + g - Math.max(c, d) - r : b = this.caretX, o === "top" ? (v = u, y = v - r, m = b - r, x = b + r) : (v = u + p, y = v + r, m = b + r, x = b - r), _ = v), { x1: m, x2: b, x3: x, y1: v, y2: y, y3: _ };
  }
  drawTitle(t, e, s) {
    const n = this.title, o = n.length;
    let r, a, l;
    if (o) {
      const c = At(s.rtl, this.x, this.width);
      for (t.x = ve(this, s.titleAlign, s), e.textAlign = c.textAlign(s.titleAlign), e.textBaseline = "middle", r = j(s.titleFont), a = s.titleSpacing, e.fillStyle = s.titleColor, e.font = r.string, l = 0; l < o; ++l)
        e.fillText(n[l], c.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + a, l + 1 === o && (t.y += s.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, e, s, n, o) {
    const r = this.labelColors[s], a = this.labelPointStyles[s], { boxHeight: l, boxWidth: c, boxPadding: h } = o, d = j(o.bodyFont), f = ve(this, "left", o), u = n.x(f), g = l < d.lineHeight ? (d.lineHeight - l) / 2 : 0, p = e.y + g;
    if (o.usePointStyle) {
      const m = {
        radius: Math.min(c, l) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }, b = n.leftForLtr(u, c) + c / 2, x = p + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Oe(t, m, b, x), t.strokeStyle = r.borderColor, t.fillStyle = r.backgroundColor, Oe(t, m, b, x);
    } else {
      t.lineWidth = r.borderWidth || 1, t.strokeStyle = r.borderColor, t.setLineDash(r.borderDash || []), t.lineDashOffset = r.borderDashOffset || 0;
      const m = n.leftForLtr(u, c - h), b = n.leftForLtr(n.xPlus(u, 1), c - h - 2), x = Ot(r.borderRadius);
      Object.values(x).some((v) => v !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Ae(t, {
        x: m,
        y: p,
        w: c,
        h: l,
        radius: x
      }), t.fill(), t.stroke(), t.fillStyle = r.backgroundColor, t.beginPath(), Ae(t, {
        x: b,
        y: p + 1,
        w: c - 2,
        h: l - 2,
        radius: x
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(m, p, c, l), t.strokeRect(m, p, c, l), t.fillStyle = r.backgroundColor, t.fillRect(b, p + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, e, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: r, displayColors: a, boxHeight: l, boxWidth: c, boxPadding: h } = s, d = j(s.bodyFont);
    let f = d.lineHeight, u = 0;
    const g = At(s.rtl, this.x, this.width), p = function(S) {
      e.fillText(S, g.x(t.x + u), t.y + f / 2), t.y += f + o;
    }, m = g.textAlign(r);
    let b, x, v, y, _, w, M;
    for (e.textAlign = r, e.textBaseline = "middle", e.font = d.string, t.x = ve(this, m, s), e.fillStyle = s.bodyColor, E(this.beforeBody, p), u = a && m !== "right" ? r === "center" ? c / 2 + h : c + 2 + h : 0, y = 0, w = n.length; y < w; ++y) {
      for (b = n[y], x = this.labelTextColors[y], e.fillStyle = x, E(b.before, p), v = b.lines, a && v.length && (this._drawColorBox(e, t, y, g, s), f = Math.max(d.lineHeight, l)), _ = 0, M = v.length; _ < M; ++_)
        p(v[_]), f = d.lineHeight;
      E(b.after, p);
    }
    u = 0, f = d.lineHeight, E(this.afterBody, p), t.y -= o;
  }
  drawFooter(t, e, s) {
    const n = this.footer, o = n.length;
    let r, a;
    if (o) {
      const l = At(s.rtl, this.x, this.width);
      for (t.x = ve(this, s.footerAlign, s), t.y += s.footerMarginTop, e.textAlign = l.textAlign(s.footerAlign), e.textBaseline = "middle", r = j(s.footerFont), e.fillStyle = s.footerColor, e.font = r.string, a = 0; a < o; ++a)
        e.fillText(n[a], l.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, e, s, n) {
    const { xAlign: o, yAlign: r } = this, { x: a, y: l } = t, { width: c, height: h } = s, { topLeft: d, topRight: f, bottomLeft: u, bottomRight: g } = Ot(n.cornerRadius);
    e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.beginPath(), e.moveTo(a + d, l), r === "top" && this.drawCaret(t, e, s, n), e.lineTo(a + c - f, l), e.quadraticCurveTo(a + c, l, a + c, l + f), r === "center" && o === "right" && this.drawCaret(t, e, s, n), e.lineTo(a + c, l + h - g), e.quadraticCurveTo(a + c, l + h, a + c - g, l + h), r === "bottom" && this.drawCaret(t, e, s, n), e.lineTo(a + u, l + h), e.quadraticCurveTo(a, l + h, a, l + h - u), r === "center" && o === "left" && this.drawCaret(t, e, s, n), e.lineTo(a, l + d), e.quadraticCurveTo(a, l, a + d, l), e.closePath(), e.fill(), n.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, s = this.$animations, n = s && s.x, o = s && s.y;
    if (n || o) {
      const r = Jt[t.position].call(this, this._active, this._eventPosition);
      if (!r)
        return;
      const a = this._size = $s(this, t), l = Object.assign({}, r, this._size), c = Ys(e, t, l), h = Xs(t, l, c, e);
      (n._to !== h.x || o._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = a.width, this.height = a.height, this.caretX = r.x, this.caretY = r.y, this._resolveAnimations().update(this, h));
    }
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(e);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const r = U(e.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && a && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, e), kn(t, e.textDirection), o.y += r.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), Sn(t, e.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const s = this._active, n = t.map(({ datasetIndex: a, index: l }) => {
      const c = this.chart.getDatasetMeta(a);
      if (!c)
        throw new Error("Cannot find a dataset at index " + a);
      return {
        datasetIndex: a,
        element: c.data[l],
        index: l
      };
    }), o = !ke(s, n), r = this._positionChanged(n, e);
    (o || r) && (this._active = n, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, s = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], r = this._getActiveElements(t, o, e, s), a = this._positionChanged(r, t), l = e || !ke(r, o) || a;
    return l && (this._active = r, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, e))), l;
  }
  _getActiveElements(t, e, s, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return e;
    const r = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return o.reverse && r.reverse(), r;
  }
  _positionChanged(t, e) {
    const { caretX: s, caretY: n, options: o } = this, r = Jt[o.position].call(this, t, e);
    return r !== !1 && (s !== r.x || n !== r.y);
  }
}
xi.positioners = Jt;
var hc = {
  id: "tooltip",
  _element: xi,
  positioners: Jt,
  afterInit(i, t, e) {
    e && (i.tooltip = new xi({ chart: i, options: e }));
  },
  beforeUpdate(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  reset(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  afterDraw(i) {
    const t = i.tooltip, e = {
      tooltip: t
    };
    i.notifyPlugins("beforeTooltipDraw", e) !== !1 && (t && t.draw(i.ctx), i.notifyPlugins("afterTooltipDraw", e));
  },
  afterEvent(i, t) {
    if (i.tooltip) {
      const e = t.replay;
      i.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (i, t) => t.bodyFont.size,
    boxWidth: (i, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: ["x", "y", "width", "height", "caretX", "caretY"]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: {
      beforeTitle: lt,
      title(i) {
        if (i.length > 0) {
          const t = i[0], e = t.chart.data.labels, s = e ? e.length : 0;
          if (this && this.options && this.options.mode === "dataset")
            return t.dataset.label || "";
          if (t.label)
            return t.label;
          if (s > 0 && t.dataIndex < s)
            return e[t.dataIndex];
        }
        return "";
      },
      afterTitle: lt,
      beforeBody: lt,
      beforeLabel: lt,
      label(i) {
        if (this && this.options && this.options.mode === "dataset")
          return i.label + ": " + i.formattedValue || i.formattedValue;
        let t = i.dataset.label || "";
        t && (t += ": ");
        const e = i.formattedValue;
        return T(e) || (t += e), t;
      },
      labelColor(i) {
        const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
        return {
          borderColor: e.borderColor,
          backgroundColor: e.backgroundColor,
          borderWidth: e.borderWidth,
          borderDash: e.borderDash,
          borderDashOffset: e.borderDashOffset,
          borderRadius: 0
        };
      },
      labelTextColor() {
        return this.options.bodyColor;
      },
      labelPointStyle(i) {
        const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
        return {
          pointStyle: e.pointStyle,
          rotation: e.rotation
        };
      },
      afterLabel: lt,
      afterBody: lt,
      beforeFooter: lt,
      footer: lt,
      afterFooter: lt
    }
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (i) => i !== "filter" && i !== "itemSort" && i !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: ["interaction"]
};
const dc = (i, t, e, s) => (typeof t == "string" ? (e = i.push(t) - 1, s.unshift({ index: e, label: t })) : isNaN(t) && (e = null), e);
function fc(i, t, e, s) {
  const n = i.indexOf(t);
  if (n === -1)
    return dc(i, t, e, s);
  const o = i.lastIndexOf(t);
  return n !== o ? e : n;
}
const uc = (i, t) => i === null ? null : $(Math.round(i), 0, t);
class Ee extends mt {
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const e = this._addedLabels;
    if (e.length) {
      const s = this.getLabels();
      for (const { index: n, label: o } of e)
        s[n] === o && s.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, e) {
    if (T(t))
      return null;
    const s = this.getLabels();
    return e = isFinite(e) && s[e] === t ? e : fc(s, t, P(e, t), this._addedLabels), uc(e, s.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let { min: s, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (s = 0), e || (n = this.getLabels().length - 1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.min, e = this.max, s = this.options.offset, n = [];
    let o = this.getLabels();
    o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1), this._valueRange = Math.max(o.length - (s ? 0 : 1), 1), this._startValue = this.min - (s ? 0.5 : 0);
    for (let r = t; r <= e; r++)
      n.push({ value: r });
    return n;
  }
  getLabelForValue(t) {
    const e = this.getLabels();
    return t >= 0 && t < e.length ? e[t] : t;
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
Ee.id = "category";
Ee.defaults = {
  ticks: {
    callback: Ee.prototype.getLabelForValue
  }
};
function gc(i, t) {
  const e = [], { bounds: n, step: o, min: r, max: a, precision: l, count: c, maxTicks: h, maxDigits: d, includeBounds: f } = i, u = o || 1, g = h - 1, { min: p, max: m } = t, b = !T(r), x = !T(a), v = !T(c), y = (m - p) / (d + 1);
  let _ = Xi((m - p) / g / u) * u, w, M, S, k;
  if (_ < 1e-14 && !b && !x)
    return [{ value: p }, { value: m }];
  k = Math.ceil(m / _) - Math.floor(p / _), k > g && (_ = Xi(k * _ / g / u) * u), T(l) || (w = Math.pow(10, l), _ = Math.ceil(_ * w) / w), n === "ticks" ? (M = Math.floor(p / _) * _, S = Math.ceil(m / _) * _) : (M = p, S = m), b && x && o && go((a - r) / o, _ / 1e3) ? (k = Math.round(Math.min((a - r) / _, h)), _ = (a - r) / k, M = r, S = a) : v ? (M = b ? r : M, S = x ? a : S, k = c - 1, _ = (S - M) / k) : (k = (S - M) / _, qt(k, Math.round(k), _ / 1e3) ? k = Math.round(k) : k = Math.ceil(k));
  const R = Math.max(
    Ui(_),
    Ui(M)
  );
  w = Math.pow(10, T(l) ? R : l), M = Math.round(M * w) / w, S = Math.round(S * w) / w;
  let L = 0;
  for (b && (f && M !== r ? (e.push({ value: r }), M < r && L++, qt(Math.round((M + L * _) * w) / w, r, qs(r, y, i)) && L++) : M < r && L++); L < k; ++L)
    e.push({ value: Math.round((M + L * _) * w) / w });
  return x && f && S !== a ? e.length && qt(e[e.length - 1].value, a, qs(a, y, i)) ? e[e.length - 1].value = a : e.push({ value: a }) : (!x || S === a) && e.push({ value: S }), e;
}
function qs(i, t, { horizontal: e, minRotation: s }) {
  const n = it(s), o = (e ? Math.sin(n) : Math.cos(n)) || 1e-3, r = 0.75 * t * ("" + i).length;
  return Math.min(t / o, r);
}
class Fe extends mt {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return T(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: n, max: o } = this;
    const r = (l) => n = e ? n : l, a = (l) => o = s ? o : l;
    if (t) {
      const l = at(n), c = at(o);
      l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0);
    }
    if (n === o) {
      let l = 1;
      (o >= Number.MAX_SAFE_INTEGER || n <= Number.MIN_SAFE_INTEGER) && (l = Math.abs(o * 0.05)), a(o + l), t || r(n - l);
    }
    this.min = n, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: s } = t, n;
    return s ? (n = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), e = e || 11), e && (n = Math.min(e, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, e = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const n = {
      maxTicks: s,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }, o = this._range || this, r = gc(n, o);
    return t.bounds === "ticks" && an(r, this, "value"), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
  }
  configure() {
    const t = this.ticks;
    let e = this.min, s = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (s - e) / Math.max(t.length - 1, 1) / 2;
      e -= n, s += n;
    }
    this._startValue = e, this._endValue = s, this._valueRange = s - e;
  }
  getLabelForValue(t) {
    return oe(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Wi extends Fe {
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = N(t) ? t : 0, this.max = N(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, s = it(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
Wi.id = "linear";
Wi.defaults = {
  ticks: {
    callback: ae.formatters.numeric
  }
};
function Gs(i) {
  return i / Math.pow(10, Math.floor(Q(i))) === 1;
}
function pc(i, t) {
  const e = Math.floor(Q(t.max)), s = Math.ceil(t.max / Math.pow(10, e)), n = [];
  let o = J(i.min, Math.pow(10, Math.floor(Q(t.min)))), r = Math.floor(Q(o)), a = Math.floor(o / Math.pow(10, r)), l = r < 0 ? Math.pow(10, Math.abs(r)) : 1;
  do
    n.push({ value: o, major: Gs(o) }), ++a, a === 10 && (a = 1, ++r, l = r >= 0 ? 1 : l), o = Math.round(a * Math.pow(10, r) * l) / l;
  while (r < e || r === e && a < s);
  const c = J(i.max, o);
  return n.push({ value: c, major: Gs(o) }), n;
}
class Ni extends mt {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    const s = Fe.prototype.parse.apply(this, [t, e]);
    if (s === 0) {
      this._zero = !0;
      return;
    }
    return N(s) && s > 0 ? s : null;
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = N(t) ? Math.max(0, t) : null, this.max = N(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let s = this.min, n = this.max;
    const o = (l) => s = t ? s : l, r = (l) => n = e ? n : l, a = (l, c) => Math.pow(10, Math.floor(Q(l)) + c);
    s === n && (s <= 0 ? (o(1), r(10)) : (o(a(s, -1)), r(a(n, 1)))), s <= 0 && o(a(n, -1)), n <= 0 && r(a(s, 1)), this._zero && this.min !== this._suggestedMin && s === a(this.min, 0) && o(a(s, -1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.options, e = {
      min: this._userMin,
      max: this._userMax
    }, s = pc(e, this);
    return t.bounds === "ticks" && an(s, this, "value"), t.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s;
  }
  getLabelForValue(t) {
    return t === void 0 ? "0" : oe(t, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const t = this.min;
    super.configure(), this._startValue = Q(t), this._valueRange = Q(this.max) - Q(t);
  }
  getPixelForValue(t) {
    return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (Q(t) - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    const e = this.getDecimalForPixel(t);
    return Math.pow(10, this._startValue + e * this._valueRange);
  }
}
Ni.id = "logarithmic";
Ni.defaults = {
  ticks: {
    callback: ae.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
};
function _i(i) {
  const t = i.ticks;
  if (t.display && i.display) {
    const e = U(t.backdropPadding);
    return P(t.font && t.font.size, D.font.size) + e.height;
  }
  return 0;
}
function mc(i, t, e) {
  return e = B(e) ? e : [e], {
    w: Bo(i, t.string, e),
    h: e.length * t.lineHeight
  };
}
function Zs(i, t, e, s, n) {
  return i === s || i === n ? {
    start: t - e / 2,
    end: t + e / 2
  } : i < s || i > n ? {
    start: t - e,
    end: t
  } : {
    start: t,
    end: t + e
  };
}
function bc(i) {
  const t = {
    l: i.left + i._padding.left,
    r: i.right - i._padding.right,
    t: i.top + i._padding.top,
    b: i.bottom - i._padding.bottom
  }, e = Object.assign({}, t), s = [], n = [], o = i._pointLabels.length, r = i.options.pointLabels, a = r.centerPointLabels ? V / o : 0;
  for (let l = 0; l < o; l++) {
    const c = r.setContext(i.getPointLabelContext(l));
    n[l] = c.padding;
    const h = i.getPointPosition(l, i.drawingArea + n[l], a), d = j(c.font), f = mc(i.ctx, d, i._pointLabels[l]);
    s[l] = f;
    const u = G(i.getIndexAngle(l) + a), g = Math.round(Mi(u)), p = Zs(g, h.x, f.w, 0, 180), m = Zs(g, h.y, f.h, 90, 270);
    xc(e, t, u, p, m);
  }
  i.setCenterPoint(
    t.l - e.l,
    e.r - t.r,
    t.t - e.t,
    e.b - t.b
  ), i._pointLabelItems = _c(i, s, n);
}
function xc(i, t, e, s, n) {
  const o = Math.abs(Math.sin(e)), r = Math.abs(Math.cos(e));
  let a = 0, l = 0;
  s.start < t.l ? (a = (t.l - s.start) / o, i.l = Math.min(i.l, t.l - a)) : s.end > t.r && (a = (s.end - t.r) / o, i.r = Math.max(i.r, t.r + a)), n.start < t.t ? (l = (t.t - n.start) / r, i.t = Math.min(i.t, t.t - l)) : n.end > t.b && (l = (n.end - t.b) / r, i.b = Math.max(i.b, t.b + l));
}
function _c(i, t, e) {
  const s = [], n = i._pointLabels.length, o = i.options, r = _i(o) / 2, a = i.drawingArea, l = o.pointLabels.centerPointLabels ? V / n : 0;
  for (let c = 0; c < n; c++) {
    const h = i.getPointPosition(c, a + r + e[c], l), d = Math.round(Mi(G(h.angle + W))), f = t[c], u = Mc(h.y, f.h, d), g = yc(d), p = vc(h.x, f.w, g);
    s.push({
      x: h.x,
      y: u,
      textAlign: g,
      left: p,
      top: u,
      right: p + f.w,
      bottom: u + f.h
    });
  }
  return s;
}
function yc(i) {
  return i === 0 || i === 180 ? "center" : i < 180 ? "left" : "right";
}
function vc(i, t, e) {
  return e === "right" ? i -= t : e === "center" && (i -= t / 2), i;
}
function Mc(i, t, e) {
  return e === 90 || e === 270 ? i -= t / 2 : (e > 270 || e < 90) && (i -= t), i;
}
function wc(i, t) {
  const { ctx: e, options: { pointLabels: s } } = i;
  for (let n = t - 1; n >= 0; n--) {
    const o = s.setContext(i.getPointLabelContext(n)), r = j(o.font), { x: a, y: l, textAlign: c, left: h, top: d, right: f, bottom: u } = i._pointLabelItems[n], { backdropColor: g } = o;
    if (!T(g)) {
      const p = U(o.backdropPadding);
      e.fillStyle = g, e.fillRect(h - p.left, d - p.top, f - h + p.width, u - d + p.height);
    }
    Pt(
      e,
      i._pointLabels[n],
      a,
      l + r.lineHeight / 2,
      r,
      {
        color: o.color,
        textAlign: c,
        textBaseline: "middle"
      }
    );
  }
}
function to(i, t, e, s) {
  const { ctx: n } = i;
  if (e)
    n.arc(i.xCenter, i.yCenter, t, 0, I);
  else {
    let o = i.getPointPosition(0, t);
    n.moveTo(o.x, o.y);
    for (let r = 1; r < s; r++)
      o = i.getPointPosition(r, t), n.lineTo(o.x, o.y);
  }
}
function kc(i, t, e, s) {
  const n = i.ctx, o = t.circular, { color: r, lineWidth: a } = t;
  !o && !s || !r || !a || e < 0 || (n.save(), n.strokeStyle = r, n.lineWidth = a, n.setLineDash(t.borderDash), n.lineDashOffset = t.borderDashOffset, n.beginPath(), to(i, e, o, s), n.closePath(), n.stroke(), n.restore());
}
function Sc(i, t, e) {
  return pt(i, {
    label: e,
    index: t,
    type: "pointLabel"
  });
}
class le extends Fe {
  constructor(t) {
    super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const t = this._padding = U(_i(this.options) / 2), e = this.width = this.maxWidth - t.width, s = this.height = this.maxHeight - t.height;
    this.xCenter = Math.floor(this.left + e / 2 + t.left), this.yCenter = Math.floor(this.top + s / 2 + t.top), this.drawingArea = Math.floor(Math.min(e, s) / 2);
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!1);
    this.min = N(t) && !isNaN(t) ? t : 0, this.max = N(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / _i(this.options));
  }
  generateTickLabels(t) {
    Fe.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((e, s) => {
      const n = z(this.options.pointLabels.callback, [e, s], this);
      return n || n === 0 ? n : "";
    }).filter((e, s) => this.chart.getDataVisibility(s));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display ? bc(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, e, s, n) {
    this.xCenter += Math.floor((t - e) / 2), this.yCenter += Math.floor((s - n) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, s, n));
  }
  getIndexAngle(t) {
    const e = I / (this._pointLabels.length || 1), s = this.options.startAngle || 0;
    return G(t * e + it(s));
  }
  getDistanceFromCenterForValue(t) {
    if (T(t))
      return NaN;
    const e = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
  }
  getValueForDistanceFromCenter(t) {
    if (T(t))
      return NaN;
    const e = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - e : this.min + e;
  }
  getPointLabelContext(t) {
    const e = this._pointLabels || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return Sc(this.getContext(), t, s);
    }
  }
  getPointPosition(t, e, s = 0) {
    const n = this.getIndexAngle(t) - W + s;
    return {
      x: Math.cos(n) * e + this.xCenter,
      y: Math.sin(n) * e + this.yCenter,
      angle: n
    };
  }
  getPointPositionForValue(t, e) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: e, top: s, right: n, bottom: o } = this._pointLabelItems[t];
    return {
      left: e,
      top: s,
      right: n,
      bottom: o
    };
  }
  drawBackground() {
    const { backgroundColor: t, grid: { circular: e } } = this.options;
    if (t) {
      const s = this.ctx;
      s.save(), s.beginPath(), to(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length), s.closePath(), s.fillStyle = t, s.fill(), s.restore();
    }
  }
  drawGrid() {
    const t = this.ctx, e = this.options, { angleLines: s, grid: n } = e, o = this._pointLabels.length;
    let r, a, l;
    if (e.pointLabels.display && wc(this, o), n.display && this.ticks.forEach((c, h) => {
      if (h !== 0) {
        a = this.getDistanceFromCenterForValue(c.value);
        const d = n.setContext(this.getContext(h - 1));
        kc(this, d, a, o);
      }
    }), s.display) {
      for (t.save(), r = o - 1; r >= 0; r--) {
        const c = s.setContext(this.getPointLabelContext(r)), { color: h, lineWidth: d } = c;
        !d || !h || (t.lineWidth = d, t.strokeStyle = h, t.setLineDash(c.borderDash), t.lineDashOffset = c.borderDashOffset, a = this.getDistanceFromCenterForValue(e.ticks.reverse ? this.min : this.max), l = this.getPointPosition(r, a), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(l.x, l.y), t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const t = this.ctx, e = this.options, s = e.ticks;
    if (!s.display)
      return;
    const n = this.getIndexAngle(0);
    let o, r;
    t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(n), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((a, l) => {
      if (l === 0 && !e.reverse)
        return;
      const c = s.setContext(this.getContext(l)), h = j(c.font);
      if (o = this.getDistanceFromCenterForValue(this.ticks[l].value), c.showLabelBackdrop) {
        t.font = h.string, r = t.measureText(a.label).width, t.fillStyle = c.backdropColor;
        const d = U(c.backdropPadding);
        t.fillRect(
          -r / 2 - d.left,
          -o - h.size / 2 - d.top,
          r + d.width,
          h.size + d.height
        );
      }
      Pt(t, a.label, 0, -o, h, {
        color: c.color
      });
    }), t.restore();
  }
  drawTitle() {
  }
}
le.id = "radialLinear";
le.defaults = {
  display: !0,
  animate: !0,
  position: "chartArea",
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: !1
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: !0,
    callback: ae.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: {
      size: 10
    },
    callback(i) {
      return i;
    },
    padding: 5,
    centerPointLabels: !1
  }
};
le.defaultRoutes = {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
};
le.descriptors = {
  angleLines: {
    _fallback: "grid"
  }
};
const Ke = {
  millisecond: { common: !0, size: 1, steps: 1e3 },
  second: { common: !0, size: 1e3, steps: 60 },
  minute: { common: !0, size: 6e4, steps: 60 },
  hour: { common: !0, size: 36e5, steps: 24 },
  day: { common: !0, size: 864e5, steps: 30 },
  week: { common: !1, size: 6048e5, steps: 4 },
  month: { common: !0, size: 2628e6, steps: 12 },
  quarter: { common: !1, size: 7884e6, steps: 4 },
  year: { common: !0, size: 3154e7 }
}, q = Object.keys(Ke);
function Pc(i, t) {
  return i - t;
}
function Js(i, t) {
  if (T(t))
    return null;
  const e = i._adapter, { parser: s, round: n, isoWeekday: o } = i._parseOpts;
  let r = t;
  return typeof s == "function" && (r = s(r)), N(r) || (r = typeof s == "string" ? e.parse(r, s) : e.parse(r)), r === null ? null : (n && (r = n === "week" && (te(o) || o === !0) ? e.startOf(r, "isoWeek", o) : e.startOf(r, n)), +r);
}
function Qs(i, t, e, s) {
  const n = q.length;
  for (let o = q.indexOf(i); o < n - 1; ++o) {
    const r = Ke[q[o]], a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
    if (r.common && Math.ceil((e - t) / (a * r.size)) <= s)
      return q[o];
  }
  return q[n - 1];
}
function Cc(i, t, e, s, n) {
  for (let o = q.length - 1; o >= q.indexOf(e); o--) {
    const r = q[o];
    if (Ke[r].common && i._adapter.diff(n, s, r) >= t - 1)
      return r;
  }
  return q[e ? q.indexOf(e) : 0];
}
function Dc(i) {
  for (let t = q.indexOf(i) + 1, e = q.length; t < e; ++t)
    if (Ke[q[t]].common)
      return q[t];
}
function tn(i, t, e) {
  if (!e)
    i[t] = !0;
  else if (e.length) {
    const { lo: s, hi: n } = Di(e, t), o = e[s] >= t ? e[s] : e[n];
    i[o] = !0;
  }
}
function Oc(i, t, e, s) {
  const n = i._adapter, o = +n.startOf(t[0].value, s), r = t[t.length - 1].value;
  let a, l;
  for (a = o; a <= r; a = +n.add(a, 1, s))
    l = e[a], l >= 0 && (t[l].major = !0);
  return t;
}
function en(i, t, e) {
  const s = [], n = {}, o = t.length;
  let r, a;
  for (r = 0; r < o; ++r)
    a = t[r], n[a] = r, s.push({
      value: a,
      major: !1
    });
  return o === 0 || !e ? s : Oc(i, s, n, e);
}
class ce extends mt {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e) {
    const s = t.time || (t.time = {}), n = this._adapter = new Tn._date(t.adapters.date);
    Kt(s.displayFormats, n.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : Js(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, e = this._adapter, s = t.time.unit || "day";
    let { min: n, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();
    function l(c) {
      !r && !isNaN(c.min) && (n = Math.min(n, c.min)), !a && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!r || !a) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = N(n) && !isNaN(n) ? n : +e.startOf(Date.now(), s), o = N(o) && !isNaN(o) ? o : +e.endOf(Date.now(), s) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return t.length && (e = t[0], s = t[t.length - 1]), { min: e, max: s };
  }
  buildTicks() {
    const t = this.options, e = t.time, s = t.ticks, n = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, r = this.max, a = qo(n, o, r);
    return this._unit = e.unit || (s.autoSkip ? Qs(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Cc(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Dc(this._unit), this.initOffsets(n), t.reverse && a.reverse(), en(this, a, this._majorUnit);
  }
  initOffsets(t) {
    let e = 0, s = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - n : e = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const r = t.length < 3 ? 0.5 : 0.25;
    e = $(e, 0, r), s = $(s, 0, r), this._offsets = { start: e, end: s, factor: 1 / (e + 1 + s) };
  }
  _generate() {
    const t = this._adapter, e = this.min, s = this.max, n = this.options, o = n.time, r = o.unit || Qs(o.minUnit, e, s, this._getLabelCapacity(e)), a = P(o.stepSize, 1), l = r === "week" ? o.isoWeekday : !1, c = te(l) || l === !0, h = {};
    let d = e, f, u;
    if (c && (d = +t.startOf(d, "isoWeek", l)), d = +t.startOf(d, c ? "day" : r), t.diff(s, e, r) > 1e5 * a)
      throw new Error(e + " and " + s + " are too far apart with stepSize of " + a + " " + r);
    const g = n.ticks.source === "data" && this.getDataTimestamps();
    for (f = d, u = 0; f < s; f = +t.add(f, a, r), u++)
      tn(h, f, g);
    return (f === s || n.bounds === "ticks" || u === 1) && tn(h, f, g), Object.keys(h).sort((p, m) => p - m).map((p) => +p);
  }
  getLabelForValue(t) {
    const e = this._adapter, s = this.options.time;
    return s.tooltipFormat ? e.format(t, s.tooltipFormat) : e.format(t, s.displayFormats.datetime);
  }
  _tickFormatFunction(t, e, s, n) {
    const o = this.options, r = o.time.displayFormats, a = this._unit, l = this._majorUnit, c = a && r[a], h = l && r[l], d = s[e], f = l && h && d && d.major, u = this._adapter.format(t, n || (f ? h : c)), g = o.ticks.callback;
    return g ? z(g, [u, e, s], this) : u;
  }
  generateTickLabels(t) {
    let e, s, n;
    for (e = 0, s = t.length; e < s; ++e)
      n = t[e], n.label = this._tickFormatFunction(n.value, e, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets, s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + s) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks, s = this.ctx.measureText(t).width, n = it(this.isHorizontal() ? e.maxRotation : e.minRotation), o = Math.cos(n), r = Math.sin(n), a = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + a * r,
      h: s * r + a * o
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, s = e.displayFormats, n = s[e.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, en(this, [t], this._majorUnit), n), r = this._getLabelSize(o), a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], e, s;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (e = 0, s = n.length; e < s; ++e)
      t = t.concat(n[e].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, s;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (e = 0, s = n.length; e < s; ++e)
      t.push(Js(this, n[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return mn(t.sort(Pc));
  }
}
ce.id = "time";
ce.defaults = {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    major: {
      enabled: !1
    }
  }
};
function Me(i, t, e) {
  let s = 0, n = i.length - 1, o, r, a, l;
  e ? (t >= i[s].pos && t <= i[n].pos && ({ lo: s, hi: n } = dt(i, "pos", t)), { pos: o, time: a } = i[s], { pos: r, time: l } = i[n]) : (t >= i[s].time && t <= i[n].time && ({ lo: s, hi: n } = dt(i, "time", t)), { time: o, pos: a } = i[s], { time: r, pos: l } = i[n]);
  const c = r - o;
  return c ? a + (l - a) * (t - o) / c : a;
}
class Hi extends ce {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = Me(e, this.min), this._tableRange = Me(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: s } = this, n = [], o = [];
    let r, a, l, c, h;
    for (r = 0, a = t.length; r < a; ++r)
      c = t[r], c >= e && c <= s && n.push(c);
    if (n.length < 2)
      return [
        { time: e, pos: 0 },
        { time: s, pos: 1 }
      ];
    for (r = 0, a = n.length; r < a; ++r)
      h = n[r + 1], l = n[r - 1], c = n[r], Math.round((h + l) / 2) !== c && o.push({ time: c, pos: r / (a - 1) });
    return o;
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const e = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return e.length && s.length ? t = this.normalize(e.concat(s)) : t = e.length ? e : s, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (Me(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return Me(this._table, s * this._tableRange + this._minPos, !0);
  }
}
Hi.id = "timeseries";
Hi.defaults = ce.defaults;
const Ac = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Animation: On,
  Animations: Ri,
  ArcElement: Ye,
  BarController: We,
  BarElement: Ue,
  BasePlatform: Ii,
  BasicPlatform: In,
  BubbleController: Ne,
  CategoryScale: Ee,
  Chart: zi,
  DatasetController: st,
  Decimation: Rl,
  DomPlatform: Vn,
  DoughnutController: Rt,
  Element: et,
  Filler: Gl,
  Interaction: Rn,
  Legend: Ql,
  LineController: re,
  LineElement: bt,
  LinearScale: Wi,
  LogarithmicScale: Ni,
  PieController: Ei,
  PointElement: Xe,
  PolarAreaController: He,
  RadarController: je,
  RadialLinearScale: le,
  Scale: mt,
  ScatterController: $e,
  SubTitle: ic,
  Ticks: ae,
  TimeScale: ce,
  TimeSeriesScale: Hi,
  Title: ec,
  Tooltip: hc,
  _adapters: Tn,
  _detectPlatform: Wn,
  animator: ot,
  defaults: D,
  layouts: Y,
  registry: rt
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ye as A,
  Ue as B,
  Xe as P,
  U as a,
  Ac as b,
  z as c,
  D as d,
  T as i,
  Qt as m,
  Yt as r,
  j as t,
  P as v
};
//# sourceMappingURL=chart.es.js.map
