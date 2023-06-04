import { m as g, t as T, r as u, d as A, a as E, v as B, c as z, i as P, A as W, P as N, B as O } from "./chart.es.js";
/*!
 * chartjs-plugin-datalabels v2.0.0
 * https://chartjs-plugin-datalabels.netlify.app
 * (c) 2017-2021 chartjs-plugin-datalabels contributors
 * Released under the MIT license
 */
var M = function() {
  if (typeof window < "u") {
    if (window.devicePixelRatio)
      return window.devicePixelRatio;
    var r = window.screen;
    if (r)
      return (r.deviceXDPI || 1) / (r.logicalXDPI || 1);
  }
  return 1;
}(), c = {
  // @todo move this in Chart.helpers.toTextLines
  toTextLines: function(r) {
    var t = [], a;
    for (r = [].concat(r); r.length; )
      a = r.pop(), typeof a == "string" ? t.unshift.apply(t, a.split(`
`)) : Array.isArray(a) ? r.push.apply(r, a) : P(r) || t.unshift("" + a);
    return t;
  },
  // @todo move this in Chart.helpers.canvas.textSize
  // @todo cache calls of measureText if font doesn't change?!
  textSize: function(r, t, a) {
    var e = [].concat(t), i = e.length, n = r.font, o = 0, s;
    for (r.font = a.string, s = 0; s < i; ++s)
      o = Math.max(r.measureText(e[s]).width, o);
    return r.font = n, {
      height: i * a.lineHeight,
      width: o
    };
  },
  /**
   * Returns value bounded by min and max. This is equivalent to max(min, min(value, max)).
   * @todo move this method in Chart.helpers.bound
   * https://doc.qt.io/qt-5/qtglobal.html#qBound
   */
  bound: function(r, t, a) {
    return Math.max(r, Math.min(t, a));
  },
  /**
   * Returns an array of pair [value, state] where state is:
   * * -1: value is only in a0 (removed)
   * *  1: value is only in a1 (added)
   */
  arrayDiff: function(r, t) {
    var a = r.slice(), e = [], i, n, o, s;
    for (i = 0, o = t.length; i < o; ++i)
      s = t[i], n = a.indexOf(s), n === -1 ? e.push([s, 1]) : a.splice(n, 1);
    for (i = 0, o = a.length; i < o; ++i)
      e.push([a[i], -1]);
    return e;
  },
  /**
   * https://github.com/chartjs/chartjs-plugin-datalabels/issues/70
   */
  rasterize: function(r) {
    return Math.round(r * M) / M;
  }
};
function p(r, t) {
  var a = t.x, e = t.y;
  if (a === null)
    return { x: 0, y: -1 };
  if (e === null)
    return { x: 1, y: 0 };
  var i = r.x - a, n = r.y - e, o = Math.sqrt(i * i + n * n);
  return {
    x: o ? i / o : 0,
    y: o ? n / o : -1
  };
}
function D(r, t, a, e, i) {
  switch (i) {
    case "center":
      a = e = 0;
      break;
    case "bottom":
      a = 0, e = 1;
      break;
    case "right":
      a = 1, e = 0;
      break;
    case "left":
      a = -1, e = 0;
      break;
    case "top":
      a = 0, e = -1;
      break;
    case "start":
      a = -a, e = -e;
      break;
    case "end":
      break;
    default:
      i *= Math.PI / 180, a = Math.cos(i), e = Math.sin(i);
      break;
  }
  return {
    x: r,
    y: t,
    vx: a,
    vy: e
  };
}
var F = 0, I = 1, S = 2, R = 4, C = 8;
function _(r, t, a) {
  var e = F;
  return r < a.left ? e |= I : r > a.right && (e |= S), t < a.top ? e |= C : t > a.bottom && (e |= R), e;
}
function G(r, t) {
  for (var a = r.x0, e = r.y0, i = r.x1, n = r.y1, o = _(a, e, t), s = _(i, n, t), v, l, h; !(!(o | s) || o & s); )
    v = o || s, v & C ? (l = a + (i - a) * (t.top - e) / (n - e), h = t.top) : v & R ? (l = a + (i - a) * (t.bottom - e) / (n - e), h = t.bottom) : v & S ? (h = e + (n - e) * (t.right - a) / (i - a), l = t.right) : v & I && (h = e + (n - e) * (t.left - a) / (i - a), l = t.left), v === o ? (a = l, e = h, o = _(a, e, t)) : (i = l, n = h, s = _(i, n, t));
  return {
    x0: a,
    x1: i,
    y0: e,
    y1: n
  };
}
function b(r, t) {
  var a = t.anchor, e = r, i, n;
  return t.clamp && (e = G(e, t.area)), a === "start" ? (i = e.x0, n = e.y0) : a === "end" ? (i = e.x1, n = e.y1) : (i = (e.x0 + e.x1) / 2, n = (e.y0 + e.y1) / 2), D(i, n, r.vx, r.vy, t.align);
}
var m = {
  arc: function(r, t) {
    var a = (r.startAngle + r.endAngle) / 2, e = Math.cos(a), i = Math.sin(a), n = r.innerRadius, o = r.outerRadius;
    return b({
      x0: r.x + e * n,
      y0: r.y + i * n,
      x1: r.x + e * o,
      y1: r.y + i * o,
      vx: e,
      vy: i
    }, t);
  },
  point: function(r, t) {
    var a = p(r, t.origin), e = a.x * r.options.radius, i = a.y * r.options.radius;
    return b({
      x0: r.x - e,
      y0: r.y - i,
      x1: r.x + e,
      y1: r.y + i,
      vx: a.x,
      vy: a.y
    }, t);
  },
  bar: function(r, t) {
    var a = p(r, t.origin), e = r.x, i = r.y, n = 0, o = 0;
    return r.horizontal ? (e = Math.min(r.x, r.base), n = Math.abs(r.base - r.x)) : (i = Math.min(r.y, r.base), o = Math.abs(r.base - r.y)), b({
      x0: e,
      y0: i + o,
      x1: e + n,
      y1: i,
      vx: a.x,
      vy: a.y
    }, t);
  },
  fallback: function(r, t) {
    var a = p(r, t.origin);
    return b({
      x0: r.x,
      y0: r.y,
      x1: r.x,
      y1: r.y,
      vx: a.x,
      vy: a.y
    }, t);
  }
}, f = c.rasterize;
function L(r) {
  var t = r.borderWidth || 0, a = r.padding, e = r.size.height, i = r.size.width, n = -i / 2, o = -e / 2;
  return {
    frame: {
      x: n - a.left - t,
      y: o - a.top - t,
      w: i + a.width + t * 2,
      h: e + a.height + t * 2
    },
    text: {
      x: n,
      y: o,
      w: i,
      h: e
    }
  };
}
function H(r, t) {
  var a = t.chart.getDatasetMeta(t.datasetIndex).vScale;
  if (!a)
    return null;
  if (a.xCenter !== void 0 && a.yCenter !== void 0)
    return { x: a.xCenter, y: a.yCenter };
  var e = a.getBasePixel();
  return r.horizontal ? { x: e, y: null } : { x: null, y: e };
}
function X(r) {
  return r instanceof W ? m.arc : r instanceof N ? m.point : r instanceof O ? m.bar : m.fallback;
}
function j(r, t, a, e, i, n) {
  var o = Math.PI / 2;
  if (n) {
    var s = Math.min(n, i / 2, e / 2), v = t + s, l = a + s, h = t + e - s, d = a + i - s;
    r.moveTo(t, l), v < h && l < d ? (r.arc(v, l, s, -Math.PI, -o), r.arc(h, l, s, -o, 0), r.arc(h, d, s, 0, o), r.arc(v, d, s, o, Math.PI)) : v < h ? (r.moveTo(v, a), r.arc(h, l, s, -o, o), r.arc(v, l, s, o, Math.PI + o)) : l < d ? (r.arc(v, l, s, -Math.PI, 0), r.arc(v, d, s, 0, Math.PI)) : r.arc(v, l, s, -Math.PI, Math.PI), r.closePath(), r.moveTo(t, a);
  } else
    r.rect(t, a, e, i);
}
function q(r, t, a) {
  var e = a.backgroundColor, i = a.borderColor, n = a.borderWidth;
  !e && (!i || !n) || (r.beginPath(), j(
    r,
    f(t.x) + n / 2,
    f(t.y) + n / 2,
    f(t.w) - n,
    f(t.h) - n,
    a.borderRadius
  ), r.closePath(), e && (r.fillStyle = e, r.fill()), i && n && (r.strokeStyle = i, r.lineWidth = n, r.lineJoin = "miter", r.stroke()));
}
function J(r, t, a) {
  var e = a.lineHeight, i = r.w, n = r.x, o = r.y + e / 2;
  return t === "center" ? n += i / 2 : (t === "end" || t === "right") && (n += i), {
    h: e,
    w: i,
    x: n,
    y: o
  };
}
function U(r, t, a) {
  var e = r.shadowBlur, i = a.stroked, n = f(a.x), o = f(a.y), s = f(a.w);
  i && r.strokeText(t, n, o, s), a.filled && (e && i && (r.shadowBlur = 0), r.fillText(t, n, o, s), e && i && (r.shadowBlur = e));
}
function $(r, t, a, e) {
  var i = e.textAlign, n = e.color, o = !!n, s = e.font, v = t.length, l = e.textStrokeColor, h = e.textStrokeWidth, d = l && h, y;
  if (!(!v || !o && !d))
    for (a = J(a, i, s), r.font = s.string, r.textAlign = i, r.textBaseline = "middle", r.shadowBlur = e.textShadowBlur, r.shadowColor = e.textShadowColor, o && (r.fillStyle = n), d && (r.lineJoin = "round", r.lineWidth = h, r.strokeStyle = l), y = 0, v = t.length; y < v; ++y)
      U(r, t[y], {
        stroked: d,
        filled: o,
        w: a.w,
        x: a.x,
        y: a.y + a.h * y
      });
}
var K = function(r, t, a, e) {
  var i = this;
  i._config = r, i._index = e, i._model = null, i._rects = null, i._ctx = t, i._el = a;
};
g(K.prototype, {
  /**
   * @private
   */
  _modelize: function(r, t, a, e) {
    var i = this, n = i._index, o = T(u([a.font, {}], e, n)), s = u([a.color, A.color], e, n);
    return {
      align: u([a.align, "center"], e, n),
      anchor: u([a.anchor, "center"], e, n),
      area: e.chart.chartArea,
      backgroundColor: u([a.backgroundColor, null], e, n),
      borderColor: u([a.borderColor, null], e, n),
      borderRadius: u([a.borderRadius, 0], e, n),
      borderWidth: u([a.borderWidth, 0], e, n),
      clamp: u([a.clamp, !1], e, n),
      clip: u([a.clip, !1], e, n),
      color: s,
      display: r,
      font: o,
      lines: t,
      offset: u([a.offset, 0], e, n),
      opacity: u([a.opacity, 1], e, n),
      origin: H(i._el, e),
      padding: E(u([a.padding, 0], e, n)),
      positioner: X(i._el),
      rotation: u([a.rotation, 0], e, n) * (Math.PI / 180),
      size: c.textSize(i._ctx, t, o),
      textAlign: u([a.textAlign, "start"], e, n),
      textShadowBlur: u([a.textShadowBlur, 0], e, n),
      textShadowColor: u([a.textShadowColor, s], e, n),
      textStrokeColor: u([a.textStrokeColor, s], e, n),
      textStrokeWidth: u([a.textStrokeWidth, 0], e, n)
    };
  },
  update: function(r) {
    var t = this, a = null, e = null, i = t._index, n = t._config, o, s, v, l = u([n.display, !0], r, i);
    l && (o = r.dataset.data[i], s = B(z(n.formatter, [o, r]), o), v = P(s) ? [] : c.toTextLines(s), v.length && (a = t._modelize(l, v, n, r), e = L(a))), t._model = a, t._rects = e;
  },
  geometry: function() {
    return this._rects ? this._rects.frame : {};
  },
  rotation: function() {
    return this._model ? this._model.rotation : 0;
  },
  visible: function() {
    return this._model && this._model.opacity;
  },
  model: function() {
    return this._model;
  },
  draw: function(r, t) {
    var a = this, e = r.ctx, i = a._model, n = a._rects, o;
    this.visible() && (e.save(), i.clip && (o = i.area, e.beginPath(), e.rect(
      o.left,
      o.top,
      o.right - o.left,
      o.bottom - o.top
    ), e.clip()), e.globalAlpha = c.bound(0, i.opacity, 1), e.translate(f(t.x), f(t.y)), e.rotate(i.rotation), q(e, n.frame, i), $(e, i.lines, n.text, i), e.restore());
  }
});
var Q = Number.MIN_SAFE_INTEGER || -9007199254740991, V = Number.MAX_SAFE_INTEGER || 9007199254740991;
function x(r, t, a) {
  var e = Math.cos(a), i = Math.sin(a), n = t.x, o = t.y;
  return {
    x: n + e * (r.x - n) - i * (r.y - o),
    y: o + i * (r.x - n) + e * (r.y - o)
  };
}
function k(r, t) {
  var a = V, e = Q, i = t.origin, n, o, s, v, l;
  for (n = 0; n < r.length; ++n)
    o = r[n], s = o.x - i.x, v = o.y - i.y, l = t.vx * s + t.vy * v, a = Math.min(a, l), e = Math.max(e, l);
  return {
    min: a,
    max: e
  };
}
function w(r, t) {
  var a = t.x - r.x, e = t.y - r.y, i = Math.sqrt(a * a + e * e);
  return {
    vx: (t.x - r.x) / i,
    vy: (t.y - r.y) / i,
    origin: r,
    ln: i
  };
}
var Y = function() {
  this._rotation = 0, this._rect = {
    x: 0,
    y: 0,
    w: 0,
    h: 0
  };
};
g(Y.prototype, {
  center: function() {
    var r = this._rect;
    return {
      x: r.x + r.w / 2,
      y: r.y + r.h / 2
    };
  },
  update: function(r, t, a) {
    this._rotation = a, this._rect = {
      x: t.x + r.x,
      y: t.y + r.y,
      w: t.w,
      h: t.h
    };
  },
  contains: function(r) {
    var t = this, a = 1, e = t._rect;
    return r = x(r, t.center(), -t._rotation), !(r.x < e.x - a || r.y < e.y - a || r.x > e.x + e.w + a * 2 || r.y > e.y + e.h + a * 2);
  },
  // Separating Axis Theorem
  // https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
  intersects: function(r) {
    var t = this._points(), a = r._points(), e = [
      w(t[0], t[1]),
      w(t[0], t[3])
    ], i, n, o;
    for (this._rotation !== r._rotation && e.push(
      w(a[0], a[1]),
      w(a[0], a[3])
    ), i = 0; i < e.length; ++i)
      if (n = k(t, e[i]), o = k(a, e[i]), n.max < o.min || o.max < n.min)
        return !1;
    return !0;
  },
  /**
   * @private
   */
  _points: function() {
    var r = this, t = r._rect, a = r._rotation, e = r.center();
    return [
      x({ x: t.x, y: t.y }, e, a),
      x({ x: t.x + t.w, y: t.y }, e, a),
      x({ x: t.x + t.w, y: t.y + t.h }, e, a),
      x({ x: t.x, y: t.y + t.h }, e, a)
    ];
  }
});
//# sourceMappingURL=chartjs-plugin-datalabels.es.js.map
