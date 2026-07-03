var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/dayjs@1.11.18/node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "node_modules/.pnpm/dayjs@1.11.18/node_modules/dayjs/dayjs.min.js"(exports, module) {
    !function(t2, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t2 = "undefined" != typeof globalThis ? globalThis : t2 || self).dayjs = e();
    }(exports, function() {
      "use strict";
      var t2 = 1e3, e = 6e4, n2 = 36e5, r = "millisecond", i2 = "second", s = "minute", u3 = "hour", a = "day", o2 = "week", c = "month", f3 = "quarter", h = "year", d2 = "date", l2 = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M3 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
        var e2 = ["th", "st", "nd", "rd"], n3 = t3 % 100;
        return "[" + t3 + (e2[(n3 - 20) % 10] || e2[n3] || e2[0]) + "]";
      } }, m3 = function(t3, e2, n3) {
        var r2 = String(t3);
        return !r2 || r2.length >= e2 ? t3 : "" + Array(e2 + 1 - r2.length).join(n3) + t3;
      }, v = { s: m3, z: function(t3) {
        var e2 = -t3.utcOffset(), n3 = Math.abs(e2), r2 = Math.floor(n3 / 60), i3 = n3 % 60;
        return (e2 <= 0 ? "+" : "-") + m3(r2, 2, "0") + ":" + m3(i3, 2, "0");
      }, m: function t3(e2, n3) {
        if (e2.date() < n3.date()) return -t3(n3, e2);
        var r2 = 12 * (n3.year() - e2.year()) + (n3.month() - e2.month()), i3 = e2.clone().add(r2, c), s2 = n3 - i3 < 0, u4 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n3 - i3) / (s2 ? i3 - u4 : u4 - i3)) || 0);
      }, a: function(t3) {
        return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
      }, p: function(t3) {
        return { M: c, y: h, w: o2, d: a, D: d2, h: u3, m: s, s: i2, ms: r, Q: f3 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t3) {
        return void 0 === t3;
      } }, g3 = "en", D2 = {};
      D2[g3] = M3;
      var p3 = "$isDayjsObject", S3 = function(t3) {
        return t3 instanceof _3 || !(!t3 || !t3[p3]);
      }, w2 = function t3(e2, n3, r2) {
        var i3;
        if (!e2) return g3;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D2[s2] && (i3 = s2), n3 && (D2[s2] = n3, i3 = s2);
          var u4 = e2.split("-");
          if (!i3 && u4.length > 1) return t3(u4[0]);
        } else {
          var a2 = e2.name;
          D2[a2] = e2, i3 = a2;
        }
        return !r2 && i3 && (g3 = i3), i3 || !r2 && g3;
      }, O3 = function(t3, e2) {
        if (S3(t3)) return t3.clone();
        var n3 = "object" == typeof e2 ? e2 : {};
        return n3.date = t3, n3.args = arguments, new _3(n3);
      }, b2 = v;
      b2.l = w2, b2.i = S3, b2.w = function(t3, e2) {
        return O3(t3, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _3 = function() {
        function M4(t3) {
          this.$L = w2(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p3] = true;
        }
        var m4 = M4.prototype;
        return m4.parse = function(t3) {
          this.$d = function(t4) {
            var e2 = t4.date, n3 = t4.utc;
            if (null === e2) return /* @__PURE__ */ new Date(NaN);
            if (b2.u(e2)) return /* @__PURE__ */ new Date();
            if (e2 instanceof Date) return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i3 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n3 ? new Date(Date.UTC(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t3), this.init();
        }, m4.init = function() {
          var t3 = this.$d;
          this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
        }, m4.$utils = function() {
          return b2;
        }, m4.isValid = function() {
          return !(this.$d.toString() === l2);
        }, m4.isSame = function(t3, e2) {
          var n3 = O3(t3);
          return this.startOf(e2) <= n3 && n3 <= this.endOf(e2);
        }, m4.isAfter = function(t3, e2) {
          return O3(t3) < this.startOf(e2);
        }, m4.isBefore = function(t3, e2) {
          return this.endOf(e2) < O3(t3);
        }, m4.$g = function(t3, e2, n3) {
          return b2.u(t3) ? this[e2] : this.set(n3, t3);
        }, m4.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m4.valueOf = function() {
          return this.$d.getTime();
        }, m4.startOf = function(t3, e2) {
          var n3 = this, r2 = !!b2.u(e2) || e2, f4 = b2.p(t3), l3 = function(t4, e3) {
            var i3 = b2.w(n3.$u ? Date.UTC(n3.$y, e3, t4) : new Date(n3.$y, e3, t4), n3);
            return r2 ? i3 : i3.endOf(a);
          }, $2 = function(t4, e3) {
            return b2.w(n3.toDate()[t4].apply(n3.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n3);
          }, y2 = this.$W, M5 = this.$M, m5 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f4) {
            case h:
              return r2 ? l3(1, 0) : l3(31, 11);
            case c:
              return r2 ? l3(1, M5) : l3(0, M5 + 1);
            case o2:
              var g4 = this.$locale().weekStart || 0, D3 = (y2 < g4 ? y2 + 7 : y2) - g4;
              return l3(r2 ? m5 - D3 : m5 + (6 - D3), M5);
            case a:
            case d2:
              return $2(v2 + "Hours", 0);
            case u3:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i2:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m4.endOf = function(t3) {
          return this.startOf(t3, false);
        }, m4.$set = function(t3, e2) {
          var n3, o3 = b2.p(t3), f4 = "set" + (this.$u ? "UTC" : ""), l3 = (n3 = {}, n3[a] = f4 + "Date", n3[d2] = f4 + "Date", n3[c] = f4 + "Month", n3[h] = f4 + "FullYear", n3[u3] = f4 + "Hours", n3[s] = f4 + "Minutes", n3[i2] = f4 + "Seconds", n3[r] = f4 + "Milliseconds", n3)[o3], $2 = o3 === a ? this.$D + (e2 - this.$W) : e2;
          if (o3 === c || o3 === h) {
            var y2 = this.clone().set(d2, 1);
            y2.$d[l3]($2), y2.init(), this.$d = y2.set(d2, Math.min(this.$D, y2.daysInMonth())).$d;
          } else l3 && this.$d[l3]($2);
          return this.init(), this;
        }, m4.set = function(t3, e2) {
          return this.clone().$set(t3, e2);
        }, m4.get = function(t3) {
          return this[b2.p(t3)]();
        }, m4.add = function(r2, f4) {
          var d3, l3 = this;
          r2 = Number(r2);
          var $2 = b2.p(f4), y2 = function(t3) {
            var e2 = O3(l3);
            return b2.w(e2.date(e2.date() + Math.round(t3 * r2)), l3);
          };
          if ($2 === c) return this.set(c, this.$M + r2);
          if ($2 === h) return this.set(h, this.$y + r2);
          if ($2 === a) return y2(1);
          if ($2 === o2) return y2(7);
          var M5 = (d3 = {}, d3[s] = e, d3[u3] = n2, d3[i2] = t2, d3)[$2] || 1, m5 = this.$d.getTime() + r2 * M5;
          return b2.w(m5, this);
        }, m4.subtract = function(t3, e2) {
          return this.add(-1 * t3, e2);
        }, m4.format = function(t3) {
          var e2 = this, n3 = this.$locale();
          if (!this.isValid()) return n3.invalidDate || l2;
          var r2 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i3 = b2.z(this), s2 = this.$H, u4 = this.$m, a2 = this.$M, o3 = n3.weekdays, c2 = n3.months, f4 = n3.meridiem, h2 = function(t4, n4, i4, s3) {
            return t4 && (t4[n4] || t4(e2, r2)) || i4[n4].slice(0, s3);
          }, d3 = function(t4) {
            return b2.s(s2 % 12 || 12, t4, "0");
          }, $2 = f4 || function(t4, e3, n4) {
            var r3 = t4 < 12 ? "AM" : "PM";
            return n4 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, function(t4, r3) {
            return r3 || function(t5) {
              switch (t5) {
                case "YY":
                  return String(e2.$y).slice(-2);
                case "YYYY":
                  return b2.s(e2.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return b2.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n3.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e2.$D;
                case "DD":
                  return b2.s(e2.$D, 2, "0");
                case "d":
                  return String(e2.$W);
                case "dd":
                  return h2(n3.weekdaysMin, e2.$W, o3, 2);
                case "ddd":
                  return h2(n3.weekdaysShort, e2.$W, o3, 3);
                case "dddd":
                  return o3[e2.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return b2.s(s2, 2, "0");
                case "h":
                  return d3(1);
                case "hh":
                  return d3(2);
                case "a":
                  return $2(s2, u4, true);
                case "A":
                  return $2(s2, u4, false);
                case "m":
                  return String(u4);
                case "mm":
                  return b2.s(u4, 2, "0");
                case "s":
                  return String(e2.$s);
                case "ss":
                  return b2.s(e2.$s, 2, "0");
                case "SSS":
                  return b2.s(e2.$ms, 3, "0");
                case "Z":
                  return i3;
              }
              return null;
            }(t4) || i3.replace(":", "");
          });
        }, m4.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m4.diff = function(r2, d3, l3) {
          var $2, y2 = this, M5 = b2.p(d3), m5 = O3(r2), v2 = (m5.utcOffset() - this.utcOffset()) * e, g4 = this - m5, D3 = function() {
            return b2.m(y2, m5);
          };
          switch (M5) {
            case h:
              $2 = D3() / 12;
              break;
            case c:
              $2 = D3();
              break;
            case f3:
              $2 = D3() / 3;
              break;
            case o2:
              $2 = (g4 - v2) / 6048e5;
              break;
            case a:
              $2 = (g4 - v2) / 864e5;
              break;
            case u3:
              $2 = g4 / n2;
              break;
            case s:
              $2 = g4 / e;
              break;
            case i2:
              $2 = g4 / t2;
              break;
            default:
              $2 = g4;
          }
          return l3 ? $2 : b2.a($2);
        }, m4.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m4.$locale = function() {
          return D2[this.$L];
        }, m4.locale = function(t3, e2) {
          if (!t3) return this.$L;
          var n3 = this.clone(), r2 = w2(t3, e2, true);
          return r2 && (n3.$L = r2), n3;
        }, m4.clone = function() {
          return b2.w(this.$d, this);
        }, m4.toDate = function() {
          return new Date(this.valueOf());
        }, m4.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m4.toISOString = function() {
          return this.$d.toISOString();
        }, m4.toString = function() {
          return this.$d.toUTCString();
        }, M4;
      }(), k = _3.prototype;
      return O3.prototype = k, [["$ms", r], ["$s", i2], ["$m", s], ["$H", u3], ["$W", a], ["$M", c], ["$y", h], ["$D", d2]].forEach(function(t3) {
        k[t3[1]] = function(e2) {
          return this.$g(e2, t3[0], t3[1]);
        };
      }), O3.extend = function(t3, e2) {
        return t3.$i || (t3(e2, _3, O3), t3.$i = true), O3;
      }, O3.locale = w2, O3.isDayjs = S3, O3.unix = function(t3) {
        return O3(1e3 * t3);
      }, O3.en = D2[g3], O3.Ls = D2, O3.p = {}, O3;
    });
  }
});

// node_modules/.pnpm/dayjs@1.11.18/node_modules/dayjs/plugin/utc.js
var require_utc = __commonJS({
  "node_modules/.pnpm/dayjs@1.11.18/node_modules/dayjs/plugin/utc.js"(exports, module) {
    !function(t2, i2) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = i2() : "function" == typeof define && define.amd ? define(i2) : (t2 = "undefined" != typeof globalThis ? globalThis : t2 || self).dayjs_plugin_utc = i2();
    }(exports, function() {
      "use strict";
      var t2 = "minute", i2 = /[+-]\d\d(?::?\d\d)?/g, e = /([+-]|\d\d)/g;
      return function(s, f3, n2) {
        var u3 = f3.prototype;
        n2.utc = function(t3) {
          var i3 = { date: t3, utc: true, args: arguments };
          return new f3(i3);
        }, u3.utc = function(i3) {
          var e2 = n2(this.toDate(), { locale: this.$L, utc: true });
          return i3 ? e2.add(this.utcOffset(), t2) : e2;
        }, u3.local = function() {
          return n2(this.toDate(), { locale: this.$L, utc: false });
        };
        var r = u3.parse;
        u3.parse = function(t3) {
          t3.utc && (this.$u = true), this.$utils().u(t3.$offset) || (this.$offset = t3.$offset), r.call(this, t3);
        };
        var o2 = u3.init;
        u3.init = function() {
          if (this.$u) {
            var t3 = this.$d;
            this.$y = t3.getUTCFullYear(), this.$M = t3.getUTCMonth(), this.$D = t3.getUTCDate(), this.$W = t3.getUTCDay(), this.$H = t3.getUTCHours(), this.$m = t3.getUTCMinutes(), this.$s = t3.getUTCSeconds(), this.$ms = t3.getUTCMilliseconds();
          } else o2.call(this);
        };
        var a = u3.utcOffset;
        u3.utcOffset = function(s2, f4) {
          var n3 = this.$utils().u;
          if (n3(s2)) return this.$u ? 0 : n3(this.$offset) ? a.call(this) : this.$offset;
          if ("string" == typeof s2 && (s2 = function(t3) {
            void 0 === t3 && (t3 = "");
            var s3 = t3.match(i2);
            if (!s3) return null;
            var f5 = ("" + s3[0]).match(e) || ["-", 0, 0], n4 = f5[0], u5 = 60 * +f5[1] + +f5[2];
            return 0 === u5 ? 0 : "+" === n4 ? u5 : -u5;
          }(s2), null === s2)) return this;
          var u4 = Math.abs(s2) <= 16 ? 60 * s2 : s2;
          if (0 === u4) return this.utc(f4);
          var r2 = this.clone();
          if (f4) return r2.$offset = u4, r2.$u = false, r2;
          var o3 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          return (r2 = this.local().add(u4 + o3, t2)).$offset = u4, r2.$x.$localOffset = o3, r2;
        };
        var h = u3.format;
        u3.format = function(t3) {
          var i3 = t3 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return h.call(this, i3);
        }, u3.valueOf = function() {
          var t3 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * t3;
        }, u3.isUTC = function() {
          return !!this.$u;
        }, u3.toISOString = function() {
          return this.toDate().toISOString();
        }, u3.toString = function() {
          return this.toDate().toUTCString();
        };
        var l2 = u3.toDate;
        u3.toDate = function(t3) {
          return "s" === t3 && this.$offset ? n2(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l2.call(this);
        };
        var c = u3.diff;
        u3.diff = function(t3, i3, e2) {
          if (t3 && this.$u === t3.$u) return c.call(this, t3, i3, e2);
          var s2 = this.local(), f4 = n2(t3).local();
          return c.call(s2, f4, i3, e2);
        };
      };
    });
  }
});

// node_modules/.pnpm/dayjs@1.11.18/node_modules/dayjs/plugin/timezone.js
var require_timezone = __commonJS({
  "node_modules/.pnpm/dayjs@1.11.18/node_modules/dayjs/plugin/timezone.js"(exports, module) {
    !function(t2, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t2 = "undefined" != typeof globalThis ? globalThis : t2 || self).dayjs_plugin_timezone = e();
    }(exports, function() {
      "use strict";
      var t2 = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, e = {};
      return function(n2, i2, o2) {
        var r, a = function(t3, n3, i3) {
          void 0 === i3 && (i3 = {});
          var o3 = new Date(t3), r2 = function(t4, n4) {
            void 0 === n4 && (n4 = {});
            var i4 = n4.timeZoneName || "short", o4 = t4 + "|" + i4, r3 = e[o4];
            return r3 || (r3 = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: t4, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: i4 }), e[o4] = r3), r3;
          }(n3, i3);
          return r2.formatToParts(o3);
        }, u3 = function(e2, n3) {
          for (var i3 = a(e2, n3), r2 = [], u4 = 0; u4 < i3.length; u4 += 1) {
            var f4 = i3[u4], s2 = f4.type, m3 = f4.value, c = t2[s2];
            c >= 0 && (r2[c] = parseInt(m3, 10));
          }
          var d2 = r2[3], l2 = 24 === d2 ? 0 : d2, h = r2[0] + "-" + r2[1] + "-" + r2[2] + " " + l2 + ":" + r2[4] + ":" + r2[5] + ":000", v = +e2;
          return (o2.utc(h).valueOf() - (v -= v % 1e3)) / 6e4;
        }, f3 = i2.prototype;
        f3.tz = function(t3, e2) {
          void 0 === t3 && (t3 = r);
          var n3, i3 = this.utcOffset(), a2 = this.toDate(), u4 = a2.toLocaleString("en-US", { timeZone: t3 }), f4 = Math.round((a2 - new Date(u4)) / 1e3 / 60), s2 = 15 * -Math.round(a2.getTimezoneOffset() / 15) - f4;
          if (!Number(s2)) n3 = this.utcOffset(0, e2);
          else if (n3 = o2(u4, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(s2, true), e2) {
            var m3 = n3.utcOffset();
            n3 = n3.add(i3 - m3, "minute");
          }
          return n3.$x.$timezone = t3, n3;
        }, f3.offsetName = function(t3) {
          var e2 = this.$x.$timezone || o2.tz.guess(), n3 = a(this.valueOf(), e2, { timeZoneName: t3 }).find(function(t4) {
            return "timezonename" === t4.type.toLowerCase();
          });
          return n3 && n3.value;
        };
        var s = f3.startOf;
        f3.startOf = function(t3, e2) {
          if (!this.$x || !this.$x.$timezone) return s.call(this, t3, e2);
          var n3 = o2(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return s.call(n3, t3, e2).tz(this.$x.$timezone, true);
        }, o2.tz = function(t3, e2, n3) {
          var i3 = n3 && e2, a2 = n3 || e2 || r, f4 = u3(+o2(), a2);
          if ("string" != typeof t3) return o2(t3).tz(a2);
          var s2 = function(t4, e3, n4) {
            var i4 = t4 - 60 * e3 * 1e3, o3 = u3(i4, n4);
            if (e3 === o3) return [i4, e3];
            var r2 = u3(i4 -= 60 * (o3 - e3) * 1e3, n4);
            return o3 === r2 ? [i4, o3] : [t4 - 60 * Math.min(o3, r2) * 1e3, Math.max(o3, r2)];
          }(o2.utc(t3, i3).valueOf(), f4, a2), m3 = s2[0], c = s2[1], d2 = o2(m3).utcOffset(c);
          return d2.$x.$timezone = a2, d2;
        }, o2.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, o2.tz.setDefault = function(t3) {
          r = t3;
        };
      };
    });
  }
});

// node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js
var $PROXY = Symbol("solid-proxy");
var $TRACK = Symbol("solid-track");
var $DEVCOMP = Symbol("solid-dev-component");
var ERROR = Symbol("error");
function castError(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "Unknown error", {
    cause: err
  });
}
function handleError(err, owner = Owner) {
  const fns = owner && owner.context && owner.context[ERROR];
  const error = castError(err);
  if (!fns) throw error;
  try {
    for (const f3 of fns) f3(error);
  } catch (e) {
    handleError(e, owner && owner.owner || null);
  }
}
var UNOWNED = {
  context: null,
  owner: null,
  owned: null,
  cleanups: null
};
var Owner = null;
function createOwner() {
  const o2 = {
    owner: Owner,
    context: Owner ? Owner.context : null,
    owned: null,
    cleanups: null
  };
  if (Owner) {
    if (!Owner.owned) Owner.owned = [o2];
    else Owner.owned.push(o2);
  }
  return o2;
}
function createRoot(fn, detachedOwner) {
  const owner = Owner, current = detachedOwner === void 0 ? owner : detachedOwner, root = fn.length === 0 ? UNOWNED : {
    context: current ? current.context : null,
    owner: current,
    owned: null,
    cleanups: null
  };
  Owner = root;
  let result;
  try {
    result = fn(fn.length === 0 ? () => {
    } : () => cleanNode(root));
  } catch (err) {
    handleError(err);
  } finally {
    Owner = owner;
  }
  return result;
}
function createMemo(fn, value) {
  Owner = createOwner();
  let v;
  try {
    v = fn(value);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
  return () => v;
}
function cleanNode(node) {
  if (node.owned) {
    for (let i2 = 0; i2 < node.owned.length; i2++) cleanNode(node.owned[i2]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (let i2 = 0; i2 < node.cleanups.length; i2++) node.cleanups[i2]();
    node.cleanups = null;
  }
}
function createContext(defaultValue) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function children(fn) {
  const memo = createMemo(() => resolveChildren(fn()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
function resolveChildren(children2) {
  if (typeof children2 === "function" && !children2.length) return resolveChildren(children2());
  if (Array.isArray(children2)) {
    const results = [];
    for (let i2 = 0; i2 < children2.length; i2++) {
      const result = resolveChildren(children2[i2]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children2;
}
function createProvider(id) {
  return function provider(props) {
    return createMemo(() => {
      Owner.context = {
        ...Owner.context,
        [id]: props.value
      };
      return children(() => props.children);
    });
  };
}
var sharedConfig = {
  context: void 0,
  getContextId() {
    if (!this.context) throw new Error(`getContextId cannot be used under non-hydrating context`);
    return getContextId(this.context.count);
  },
  getNextContextId() {
    if (!this.context)
      throw new Error(`getNextContextId cannot be used under non-hydrating context`);
    return getContextId(this.context.count++);
  }
};
function getContextId(count) {
  const num = String(count), len = num.length - 1;
  return sharedConfig.context.id + (len ? String.fromCharCode(96 + len) : "") + num;
}
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? {
    ...sharedConfig.context,
    id: sharedConfig.getNextContextId(),
    count: 0
  } : void 0;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
function mergeProps(...sources) {
  const target = {};
  for (let i2 = 0; i2 < sources.length; i2++) {
    let source = sources[i2];
    if (typeof source === "function") source = source();
    if (source) {
      const descriptors = Object.getOwnPropertyDescriptors(source);
      for (const key in descriptors) {
        if (key in target) continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i3 = sources.length - 1; i3 >= 0; i3--) {
              let v, s = sources[i3];
              if (typeof s === "function") s = s();
              v = (s || {})[key];
              if (v !== void 0) return v;
            }
          }
        });
      }
    }
  }
  return target;
}
function splitProps(props, ...keys) {
  const descriptors = Object.getOwnPropertyDescriptors(props), split = (k) => {
    const clone = {};
    for (let i2 = 0; i2 < k.length; i2++) {
      const key = k[i2];
      if (descriptors[key]) {
        Object.defineProperty(clone, key, descriptors[key]);
        delete descriptors[key];
      }
    }
    return clone;
  };
  return keys.map(split).concat(split(Object.keys(descriptors)));
}
function simpleMap(props, wrap) {
  const list = props.each || [], len = list.length, fn = props.children;
  if (len) {
    let mapped = Array(len);
    for (let i2 = 0; i2 < len; i2++) mapped[i2] = wrap(fn, list[i2], i2);
    return mapped;
  }
  return props.fallback;
}
function For(props) {
  return simpleMap(props, (fn, item, i2) => fn(item, () => i2));
}
function Show(props) {
  let c;
  return props.when ? typeof (c = props.children) === "function" ? c(props.keyed ? props.when : () => props.when) : c : props.fallback || "";
}
var SuspenseContext = createContext();

// node_modules/.pnpm/seroval@1.2.1/node_modules/seroval/dist/esm/production/index.mjs
var F = ((i2) => (i2[i2.AggregateError = 1] = "AggregateError", i2[i2.ArrowFunction = 2] = "ArrowFunction", i2[i2.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", i2[i2.ObjectAssign = 8] = "ObjectAssign", i2[i2.BigIntTypedArray = 16] = "BigIntTypedArray", i2[i2.AbortSignal = 32] = "AbortSignal", i2))(F || {});
function yr(o2) {
  switch (o2) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case `
`:
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return;
  }
}
function p(o2) {
  let e = "", r = 0, s;
  for (let n2 = 0, a = o2.length; n2 < a; n2++) s = yr(o2[n2]), s && (e += o2.slice(r, n2) + s, r = n2 + 1);
  return r === 0 ? e = o2 : e += o2.slice(r), e;
}
var E = "__SEROVAL_REFS__";
var Z = "$R";
var oe = `self.${Z}`;
function br(o2) {
  return o2 == null ? `${oe}=${oe}||[]` : `(${oe}=${oe}||{})["${p(o2)}"]=[]`;
}
function m(o2, e) {
  if (!o2) throw e;
}
var De = /* @__PURE__ */ new Map();
var R = /* @__PURE__ */ new Map();
function Be(o2) {
  return De.has(o2);
}
function Le(o2) {
  return m(Be(o2), new ne(o2)), De.get(o2);
}
typeof globalThis != "undefined" ? Object.defineProperty(globalThis, E, { value: R, configurable: true, writable: false, enumerable: false }) : typeof window != "undefined" ? Object.defineProperty(window, E, { value: R, configurable: true, writable: false, enumerable: false }) : typeof self != "undefined" ? Object.defineProperty(self, E, { value: R, configurable: true, writable: false, enumerable: false }) : typeof globalThis != "undefined" && Object.defineProperty(globalThis, E, { value: R, configurable: true, writable: false, enumerable: false });
function Yr(o2) {
  return o2;
}
function Ke(o2, e) {
  for (let r = 0, s = e.length; r < s; r++) {
    let n2 = e[r];
    o2.has(n2) || (o2.add(n2), n2.extends && Ke(o2, n2.extends));
  }
}
function f(o2) {
  if (o2) {
    let e = /* @__PURE__ */ new Set();
    return Ke(e, o2), [...e];
  }
}
var Ye = { 0: "Symbol.asyncIterator", 1: "Symbol.hasInstance", 2: "Symbol.isConcatSpreadable", 3: "Symbol.iterator", 4: "Symbol.match", 5: "Symbol.matchAll", 6: "Symbol.replace", 7: "Symbol.search", 8: "Symbol.species", 9: "Symbol.split", 10: "Symbol.toPrimitive", 11: "Symbol.toStringTag", 12: "Symbol.unscopables" };
var ie = { [Symbol.asyncIterator]: 0, [Symbol.hasInstance]: 1, [Symbol.isConcatSpreadable]: 2, [Symbol.iterator]: 3, [Symbol.match]: 4, [Symbol.matchAll]: 5, [Symbol.replace]: 6, [Symbol.search]: 7, [Symbol.species]: 8, [Symbol.split]: 9, [Symbol.toPrimitive]: 10, [Symbol.toStringTag]: 11, [Symbol.unscopables]: 12 };
var Ge = { 2: "!0", 3: "!1", 1: "void 0", 0: "null", 4: "-0", 5: "1/0", 6: "-1/0", 7: "0/0" };
var qe = { 2: true, 3: false, 1: void 0, 0: null, 4: -0, 5: Number.POSITIVE_INFINITY, 6: Number.NEGATIVE_INFINITY, 7: Number.NaN };
var le = { 0: "Error", 1: "EvalError", 2: "RangeError", 3: "ReferenceError", 4: "SyntaxError", 5: "TypeError", 6: "URIError" };
var t = void 0;
function u(o2, e, r, s, n2, a, i2, l2, c, d2, h, H2) {
  return { t: o2, i: e, s: r, l: s, c: n2, m: a, p: i2, e: l2, a: c, f: d2, b: h, o: H2 };
}
function A(o2) {
  return u(2, t, o2, t, t, t, t, t, t, t, t, t);
}
var x = A(2);
var I = A(3);
var ce = A(1);
var ue = A(0);
var Ze = A(4);
var Xe = A(5);
var Qe = A(6);
var er = A(7);
function de(o2) {
  return o2 instanceof EvalError ? 1 : o2 instanceof RangeError ? 2 : o2 instanceof ReferenceError ? 3 : o2 instanceof SyntaxError ? 4 : o2 instanceof TypeError ? 5 : o2 instanceof URIError ? 6 : 0;
}
function wr(o2) {
  let e = le[de(o2)];
  return o2.name !== e ? { name: o2.name } : o2.constructor.name !== e ? { name: o2.constructor.name } : {};
}
function V(o2, e) {
  let r = wr(o2), s = Object.getOwnPropertyNames(o2);
  for (let n2 = 0, a = s.length, i2; n2 < a; n2++) i2 = s[n2], i2 !== "name" && i2 !== "message" && (i2 === "stack" ? e & 4 && (r = r || {}, r[i2] = o2[i2]) : (r = r || {}, r[i2] = o2[i2]));
  return r;
}
function pe(o2) {
  return Object.isFrozen(o2) ? 3 : Object.isSealed(o2) ? 2 : Object.isExtensible(o2) ? 0 : 1;
}
function fe(o2) {
  switch (o2) {
    case Number.POSITIVE_INFINITY:
      return Xe;
    case Number.NEGATIVE_INFINITY:
      return Qe;
  }
  return o2 !== o2 ? er : Object.is(o2, -0) ? Ze : u(0, t, o2, t, t, t, t, t, t, t, t, t);
}
function w(o2) {
  return u(1, t, p(o2), t, t, t, t, t, t, t, t, t);
}
function me(o2) {
  return u(3, t, "" + o2, t, t, t, t, t, t, t, t, t);
}
function tr(o2) {
  return u(4, o2, t, t, t, t, t, t, t, t, t, t);
}
function Se(o2, e) {
  return u(5, o2, e.toISOString(), t, t, t, t, t, t, t, t, t);
}
function ge(o2, e) {
  return u(6, o2, t, t, p(e.source), e.flags, t, t, t, t, t, t);
}
function he(o2, e) {
  let r = new Uint8Array(e), s = r.length, n2 = new Array(s);
  for (let a = 0; a < s; a++) n2[a] = r[a];
  return u(19, o2, n2, t, t, t, t, t, t, t, t, t);
}
function sr(o2, e) {
  return u(17, o2, ie[e], t, t, t, t, t, t, t, t, t);
}
function or(o2, e) {
  return u(18, o2, p(Le(e)), t, t, t, t, t, t, t, t, t);
}
function D(o2, e, r) {
  return u(25, o2, r, t, p(e), t, t, t, t, t, t, t);
}
function ye(o2, e, r) {
  return u(9, o2, t, e.length, t, t, t, t, r, t, t, pe(e));
}
function ve(o2, e) {
  return u(21, o2, t, t, t, t, t, t, t, e, t, t);
}
function be(o2, e, r) {
  return u(15, o2, t, e.length, e.constructor.name, t, t, t, t, r, e.byteOffset, t);
}
function Ne(o2, e, r) {
  return u(16, o2, t, e.length, e.constructor.name, t, t, t, t, r, e.byteOffset, t);
}
function Ae(o2, e, r) {
  return u(20, o2, t, e.byteLength, t, t, t, t, t, r, e.byteOffset, t);
}
function xe(o2, e, r) {
  return u(13, o2, de(e), t, t, p(e.message), r, t, t, t, t, t);
}
function Ie(o2, e, r) {
  return u(14, o2, de(e), t, t, p(e.message), r, t, t, t, t, t);
}
function we(o2, e, r) {
  return u(7, o2, t, e, t, t, t, t, r, t, t, t);
}
function B(o2, e) {
  return u(28, t, t, t, t, t, t, t, [o2, e], t, t, t);
}
function j(o2, e) {
  return u(30, t, t, t, t, t, t, t, [o2, e], t, t, t);
}
function _(o2, e, r) {
  return u(31, o2, t, t, t, t, t, t, r, e, t, t);
}
function Ee(o2, e) {
  return u(32, o2, t, t, t, t, t, t, t, e, t, t);
}
function Re(o2, e) {
  return u(33, o2, t, t, t, t, t, t, t, e, t, t);
}
function Pe(o2, e) {
  return u(34, o2, t, t, t, t, t, t, t, e, t, t);
}
var { toString: je } = Object.prototype;
function Er(o2, e) {
  return e instanceof Error ? `Seroval caught an error during the ${o2} process.
  
${e.name}
${e.message}

- For more information, please check the "cause" property of this error.
- If you believe this is an error in Seroval, please submit an issue at https://github.com/lxsmnsyc/seroval/issues/new` : `Seroval caught an error during the ${o2} process.

"${je.call(e)}"

For more information, please check the "cause" property of this error.`;
}
var X = class extends Error {
  constructor(r, s) {
    super(Er(r, s));
    this.cause = s;
  }
};
var M = class extends X {
  constructor(e) {
    super("parsing", e);
  }
};
var Ce = class extends X {
  constructor(e) {
    super("serialization", e);
  }
};
var S = class extends Error {
  constructor(r) {
    super(`The value ${je.call(r)} of type "${typeof r}" cannot be parsed/serialized.
      
There are few workarounds for this problem:
- Transform the value in a way that it can be serialized.
- If the reference is present on multiple runtimes (isomorphic), you can use the Reference API to map the references.`);
    this.value = r;
  }
};
var g = class extends Error {
  constructor(e) {
    super('Unsupported node type "' + e.t + '".');
  }
};
var U = class extends Error {
  constructor(e) {
    super('Missing plugin for tag "' + e + '".');
  }
};
var ne = class extends Error {
  constructor(r) {
    super('Missing reference for the value "' + je.call(r) + '" of type "' + typeof r + '"');
    this.value = r;
  }
};
var P = class {
  constructor(e, r) {
    this.value = e;
    this.replacement = r;
  }
};
var nr = {};
var ar = {};
var ir = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} };
function Te(o2) {
  return "__SEROVAL_STREAM__" in o2;
}
function L() {
  let o2 = /* @__PURE__ */ new Set(), e = [], r = true, s = true;
  function n2(l2) {
    for (let c of o2.keys()) c.next(l2);
  }
  function a(l2) {
    for (let c of o2.keys()) c.throw(l2);
  }
  function i2(l2) {
    for (let c of o2.keys()) c.return(l2);
  }
  return { __SEROVAL_STREAM__: true, on(l2) {
    r && o2.add(l2);
    for (let c = 0, d2 = e.length; c < d2; c++) {
      let h = e[c];
      c === d2 - 1 && !r ? s ? l2.return(h) : l2.throw(h) : l2.next(h);
    }
    return () => {
      r && o2.delete(l2);
    };
  }, next(l2) {
    r && (e.push(l2), n2(l2));
  }, throw(l2) {
    r && (e.push(l2), a(l2), r = false, s = false, o2.clear());
  }, return(l2) {
    r && (e.push(l2), i2(l2), r = false, s = true, o2.clear());
  } };
}
function ke(o2) {
  let e = L(), r = o2[Symbol.asyncIterator]();
  async function s() {
    try {
      let n2 = await r.next();
      n2.done ? e.return(n2.value) : (e.next(n2.value), await s());
    } catch (n2) {
      e.throw(n2);
    }
  }
  return s().catch(() => {
  }), e;
}
function W(o2) {
  let e = [], r = -1, s = -1, n2 = o2[Symbol.iterator]();
  for (; ; ) try {
    let a = n2.next();
    if (e.push(a.value), a.done) {
      s = e.length - 1;
      break;
    }
  } catch (a) {
    r = e.length, e.push(a);
  }
  return { v: e, t: r, d: s };
}
var K = class {
  constructor(e) {
    this.marked = /* @__PURE__ */ new Set();
    this.plugins = e.plugins, this.features = 47 ^ (e.disabledFeatures || 0), this.refs = e.refs || /* @__PURE__ */ new Map();
  }
  markRef(e) {
    this.marked.add(e);
  }
  isMarked(e) {
    return this.marked.has(e);
  }
  getIndexedValue(e) {
    let r = this.refs.get(e);
    if (r != null) return this.markRef(r), { type: 1, value: tr(r) };
    let s = this.refs.size;
    return this.refs.set(e, s), { type: 0, value: s };
  }
  getReference(e) {
    let r = this.getIndexedValue(e);
    return r.type === 1 ? r : Be(e) ? { type: 2, value: or(r.value, e) } : r;
  }
  parseWellKnownSymbol(e) {
    let r = this.getReference(e);
    return r.type !== 0 ? r.value : (m(e in ie, new S(e)), sr(r.value, e));
  }
  parseSpecialReference(e) {
    let r = this.getIndexedValue(ir[e]);
    return r.type === 1 ? r.value : u(26, r.value, e, t, t, t, t, t, t, t, t, t);
  }
  parseIteratorFactory() {
    let e = this.getIndexedValue(nr);
    return e.type === 1 ? e.value : u(27, e.value, t, t, t, t, t, t, t, this.parseWellKnownSymbol(Symbol.iterator), t, t);
  }
  parseAsyncIteratorFactory() {
    let e = this.getIndexedValue(ar);
    return e.type === 1 ? e.value : u(29, e.value, t, t, t, t, t, t, [this.parseSpecialReference(1), this.parseWellKnownSymbol(Symbol.asyncIterator)], t, t, t);
  }
  createObjectNode(e, r, s, n2) {
    return u(s ? 11 : 10, e, t, t, t, t, n2, t, t, t, t, pe(r));
  }
  createMapNode(e, r, s, n2) {
    return u(8, e, t, t, t, t, t, { k: r, v: s, s: n2 }, t, this.parseSpecialReference(0), t, t);
  }
  createPromiseConstructorNode(e) {
    return u(22, e, t, t, t, t, t, t, t, this.parseSpecialReference(1), t, t);
  }
  createAbortSignalConstructorNode(e) {
    return u(35, e, t, t, t, t, t, t, t, this.parseSpecialReference(5), t, t);
  }
};
var Cr = /^[$A-Z_][0-9A-Z_$]*$/i;
function Me(o2) {
  let e = o2[0];
  return (e === "$" || e === "_" || e >= "A" && e <= "Z" || e >= "a" && e <= "z") && Cr.test(o2);
}
function re(o2) {
  switch (o2.t) {
    case 0:
      return o2.s + "=" + o2.v;
    case 2:
      return o2.s + ".set(" + o2.k + "," + o2.v + ")";
    case 1:
      return o2.s + ".add(" + o2.v + ")";
    case 3:
      return o2.s + ".delete(" + o2.k + ")";
  }
}
function zr(o2) {
  let e = [], r = o2[0];
  for (let s = 1, n2 = o2.length, a, i2 = r; s < n2; s++) a = o2[s], a.t === 0 && a.v === i2.v ? r = { t: 0, s: a.s, k: t, v: re(r) } : a.t === 2 && a.s === i2.s ? r = { t: 2, s: re(r), k: a.k, v: a.v } : a.t === 1 && a.s === i2.s ? r = { t: 1, s: re(r), k: t, v: a.v } : a.t === 3 && a.s === i2.s ? r = { t: 3, s: re(r), k: a.k, v: t } : (e.push(r), r = a), i2 = a;
  return e.push(r), e;
}
function pr(o2) {
  if (o2.length) {
    let e = "", r = zr(o2);
    for (let s = 0, n2 = r.length; s < n2; s++) e += re(r[s]) + ",";
    return e;
  }
  return t;
}
var Or = "Object.create(null)";
var Tr = "new Set";
var kr = "new Map";
var Fr = "Promise.resolve";
var Vr = "Promise.reject";
var Dr = { 3: "Object.freeze", 2: "Object.seal", 1: "Object.preventExtensions", 0: t };
var O = class {
  constructor(e) {
    this.stack = [];
    this.flags = [];
    this.assignments = [];
    this.plugins = e.plugins, this.features = e.features, this.marked = new Set(e.markedRefs);
  }
  createFunction(e, r) {
    return this.features & 2 ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>" + (r.startsWith("{") ? "(" + r + ")" : r) : "function(" + e.join(",") + "){return " + r + "}";
  }
  createEffectfulFunction(e, r) {
    return this.features & 2 ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>{" + r + "}" : "function(" + e.join(",") + "){" + r + "}";
  }
  markRef(e) {
    this.marked.add(e);
  }
  isMarked(e) {
    return this.marked.has(e);
  }
  pushObjectFlag(e, r) {
    e !== 0 && (this.markRef(r), this.flags.push({ type: e, value: this.getRefParam(r) }));
  }
  resolveFlags() {
    let e = "";
    for (let r = 0, s = this.flags, n2 = s.length; r < n2; r++) {
      let a = s[r];
      e += Dr[a.type] + "(" + a.value + "),";
    }
    return e;
  }
  resolvePatches() {
    let e = pr(this.assignments), r = this.resolveFlags();
    return e ? r ? e + r : e : r;
  }
  createAssignment(e, r) {
    this.assignments.push({ t: 0, s: e, k: t, v: r });
  }
  createAddAssignment(e, r) {
    this.assignments.push({ t: 1, s: this.getRefParam(e), k: t, v: r });
  }
  createSetAssignment(e, r, s) {
    this.assignments.push({ t: 2, s: this.getRefParam(e), k: r, v: s });
  }
  createDeleteAssignment(e, r) {
    this.assignments.push({ t: 3, s: this.getRefParam(e), k: r, v: t });
  }
  createArrayAssign(e, r, s) {
    this.createAssignment(this.getRefParam(e) + "[" + r + "]", s);
  }
  createObjectAssign(e, r, s) {
    this.createAssignment(this.getRefParam(e) + "." + r, s);
  }
  isIndexedValueInStack(e) {
    return e.t === 4 && this.stack.includes(e.i);
  }
  serializeReference(e) {
    return this.assignIndexedValue(e.i, E + '.get("' + e.s + '")');
  }
  serializeArrayItem(e, r, s) {
    return r ? this.isIndexedValueInStack(r) ? (this.markRef(e), this.createArrayAssign(e, s, this.getRefParam(r.i)), "") : this.serialize(r) : "";
  }
  serializeArray(e) {
    let r = e.i;
    if (e.l) {
      this.stack.push(r);
      let s = e.a, n2 = this.serializeArrayItem(r, s[0], 0), a = n2 === "";
      for (let i2 = 1, l2 = e.l, c; i2 < l2; i2++) c = this.serializeArrayItem(r, s[i2], i2), n2 += "," + c, a = c === "";
      return this.stack.pop(), this.pushObjectFlag(e.o, e.i), this.assignIndexedValue(r, "[" + n2 + (a ? ",]" : "]"));
    }
    return this.assignIndexedValue(r, "[]");
  }
  serializeProperty(e, r, s) {
    if (typeof r == "string") {
      let n2 = Number(r), a = n2 >= 0 && n2.toString() === r || Me(r);
      if (this.isIndexedValueInStack(s)) {
        let i2 = this.getRefParam(s.i);
        return this.markRef(e.i), a && n2 !== n2 ? this.createObjectAssign(e.i, r, i2) : this.createArrayAssign(e.i, a ? r : '"' + r + '"', i2), "";
      }
      return (a ? r : '"' + r + '"') + ":" + this.serialize(s);
    }
    return "[" + this.serialize(r) + "]:" + this.serialize(s);
  }
  serializeProperties(e, r) {
    let s = r.s;
    if (s) {
      let n2 = r.k, a = r.v;
      this.stack.push(e.i);
      let i2 = this.serializeProperty(e, n2[0], a[0]);
      for (let l2 = 1, c = i2; l2 < s; l2++) c = this.serializeProperty(e, n2[l2], a[l2]), i2 += (c && i2 && ",") + c;
      return this.stack.pop(), "{" + i2 + "}";
    }
    return "{}";
  }
  serializeObject(e) {
    return this.pushObjectFlag(e.o, e.i), this.assignIndexedValue(e.i, this.serializeProperties(e, e.p));
  }
  serializeWithObjectAssign(e, r, s) {
    let n2 = this.serializeProperties(e, r);
    return n2 !== "{}" ? "Object.assign(" + s + "," + n2 + ")" : s;
  }
  serializeStringKeyAssignment(e, r, s, n2) {
    let a = this.serialize(n2), i2 = Number(s), l2 = i2 >= 0 && i2.toString() === s || Me(s);
    if (this.isIndexedValueInStack(n2)) l2 && i2 !== i2 ? this.createObjectAssign(e.i, s, a) : this.createArrayAssign(e.i, l2 ? s : '"' + s + '"', a);
    else {
      let c = this.assignments;
      this.assignments = r, l2 && i2 !== i2 ? this.createObjectAssign(e.i, s, a) : this.createArrayAssign(e.i, l2 ? s : '"' + s + '"', a), this.assignments = c;
    }
  }
  serializeAssignment(e, r, s, n2) {
    if (typeof s == "string") this.serializeStringKeyAssignment(e, r, s, n2);
    else {
      let a = this.stack;
      this.stack = [];
      let i2 = this.serialize(n2);
      this.stack = a;
      let l2 = this.assignments;
      this.assignments = r, this.createArrayAssign(e.i, this.serialize(s), i2), this.assignments = l2;
    }
  }
  serializeAssignments(e, r) {
    let s = r.s;
    if (s) {
      let n2 = [], a = r.k, i2 = r.v;
      this.stack.push(e.i);
      for (let l2 = 0; l2 < s; l2++) this.serializeAssignment(e, n2, a[l2], i2[l2]);
      return this.stack.pop(), pr(n2);
    }
    return t;
  }
  serializeDictionary(e, r) {
    if (e.p) if (this.features & 8) r = this.serializeWithObjectAssign(e, e.p, r);
    else {
      this.markRef(e.i);
      let s = this.serializeAssignments(e, e.p);
      if (s) return "(" + this.assignIndexedValue(e.i, r) + "," + s + this.getRefParam(e.i) + ")";
    }
    return this.assignIndexedValue(e.i, r);
  }
  serializeNullConstructor(e) {
    return this.pushObjectFlag(e.o, e.i), this.serializeDictionary(e, Or);
  }
  serializeDate(e) {
    return this.assignIndexedValue(e.i, 'new Date("' + e.s + '")');
  }
  serializeRegExp(e) {
    return this.assignIndexedValue(e.i, "/" + e.c + "/" + e.m);
  }
  serializeSetItem(e, r) {
    return this.isIndexedValueInStack(r) ? (this.markRef(e), this.createAddAssignment(e, this.getRefParam(r.i)), "") : this.serialize(r);
  }
  serializeSet(e) {
    let r = Tr, s = e.l, n2 = e.i;
    if (s) {
      let a = e.a;
      this.stack.push(n2);
      let i2 = this.serializeSetItem(n2, a[0]);
      for (let l2 = 1, c = i2; l2 < s; l2++) c = this.serializeSetItem(n2, a[l2]), i2 += (c && i2 && ",") + c;
      this.stack.pop(), i2 && (r += "([" + i2 + "])");
    }
    return this.assignIndexedValue(n2, r);
  }
  serializeMapEntry(e, r, s, n2) {
    if (this.isIndexedValueInStack(r)) {
      let a = this.getRefParam(r.i);
      if (this.markRef(e), this.isIndexedValueInStack(s)) {
        let l2 = this.getRefParam(s.i);
        return this.createSetAssignment(e, a, l2), "";
      }
      if (s.t !== 4 && s.i != null && this.isMarked(s.i)) {
        let l2 = "(" + this.serialize(s) + ",[" + n2 + "," + n2 + "])";
        return this.createSetAssignment(e, a, this.getRefParam(s.i)), this.createDeleteAssignment(e, n2), l2;
      }
      let i2 = this.stack;
      return this.stack = [], this.createSetAssignment(e, a, this.serialize(s)), this.stack = i2, "";
    }
    if (this.isIndexedValueInStack(s)) {
      let a = this.getRefParam(s.i);
      if (this.markRef(e), r.t !== 4 && r.i != null && this.isMarked(r.i)) {
        let l2 = "(" + this.serialize(r) + ",[" + n2 + "," + n2 + "])";
        return this.createSetAssignment(e, this.getRefParam(r.i), a), this.createDeleteAssignment(e, n2), l2;
      }
      let i2 = this.stack;
      return this.stack = [], this.createSetAssignment(e, this.serialize(r), a), this.stack = i2, "";
    }
    return "[" + this.serialize(r) + "," + this.serialize(s) + "]";
  }
  serializeMap(e) {
    let r = kr, s = e.e.s, n2 = e.i, a = e.f, i2 = this.getRefParam(a.i);
    if (s) {
      let l2 = e.e.k, c = e.e.v;
      this.stack.push(n2);
      let d2 = this.serializeMapEntry(n2, l2[0], c[0], i2);
      for (let h = 1, H2 = d2; h < s; h++) H2 = this.serializeMapEntry(n2, l2[h], c[h], i2), d2 += (H2 && d2 && ",") + H2;
      this.stack.pop(), d2 && (r += "([" + d2 + "])");
    }
    return a.t === 26 && (this.markRef(a.i), r = "(" + this.serialize(a) + "," + r + ")"), this.assignIndexedValue(n2, r);
  }
  serializeArrayBuffer(e) {
    let r = "new Uint8Array(", s = e.s, n2 = s.length;
    if (n2) {
      r += "[" + s[0];
      for (let a = 1; a < n2; a++) r += "," + s[a];
      r += "]";
    }
    return this.assignIndexedValue(e.i, r + ").buffer");
  }
  serializeTypedArray(e) {
    return this.assignIndexedValue(e.i, "new " + e.c + "(" + this.serialize(e.f) + "," + e.b + "," + e.l + ")");
  }
  serializeDataView(e) {
    return this.assignIndexedValue(e.i, "new DataView(" + this.serialize(e.f) + "," + e.b + "," + e.l + ")");
  }
  serializeAggregateError(e) {
    let r = e.i;
    this.stack.push(r);
    let s = this.serializeDictionary(e, 'new AggregateError([],"' + e.m + '")');
    return this.stack.pop(), s;
  }
  serializeError(e) {
    return this.serializeDictionary(e, "new " + le[e.s] + '("' + e.m + '")');
  }
  serializePromise(e) {
    let r, s = e.f, n2 = e.i, a = e.s ? Fr : Vr;
    if (this.isIndexedValueInStack(s)) {
      let i2 = this.getRefParam(s.i);
      r = a + (e.s ? "().then(" + this.createFunction([], i2) + ")" : "().catch(" + this.createEffectfulFunction([], "throw " + i2) + ")");
    } else {
      this.stack.push(n2);
      let i2 = this.serialize(s);
      this.stack.pop(), r = a + "(" + i2 + ")";
    }
    return this.assignIndexedValue(n2, r);
  }
  serializeWellKnownSymbol(e) {
    return this.assignIndexedValue(e.i, Ye[e.s]);
  }
  serializeBoxed(e) {
    return this.assignIndexedValue(e.i, "Object(" + this.serialize(e.f) + ")");
  }
  serializePlugin(e) {
    let r = this.plugins;
    if (r) for (let s = 0, n2 = r.length; s < n2; s++) {
      let a = r[s];
      if (a.tag === e.c) return this.assignIndexedValue(e.i, a.serialize(e.s, this, { id: e.i }));
    }
    throw new U(e.c);
  }
  getConstructor(e) {
    let r = this.serialize(e);
    return r === this.getRefParam(e.i) ? r : "(" + r + ")";
  }
  serializePromiseConstructor(e) {
    return this.assignIndexedValue(e.i, this.getConstructor(e.f) + "()");
  }
  serializePromiseResolve(e) {
    return this.getConstructor(e.a[0]) + "(" + this.getRefParam(e.i) + "," + this.serialize(e.a[1]) + ")";
  }
  serializePromiseReject(e) {
    return this.getConstructor(e.a[0]) + "(" + this.getRefParam(e.i) + "," + this.serialize(e.a[1]) + ")";
  }
  serializeSpecialReferenceValue(e) {
    switch (e) {
      case 0:
        return "[]";
      case 1:
        return this.createFunction(["s", "f", "p"], "((p=new Promise(" + this.createEffectfulFunction(["a", "b"], "s=a,f=b") + ")).s=s,p.f=f,p)");
      case 2:
        return this.createEffectfulFunction(["p", "d"], 'p.s(d),p.status="success",p.value=d;delete p.s;delete p.f');
      case 3:
        return this.createEffectfulFunction(["p", "d"], 'p.f(d),p.status="failure",p.value=d;delete p.s;delete p.f');
      case 4:
        return this.createFunction(["b", "a", "s", "l", "p", "f", "e", "n"], "(b=[],a=!0,s=!1,l=[],p=0,f=" + this.createEffectfulFunction(["v", "m", "x"], "for(x=0;x<p;x++)l[x]&&l[x][m](v)") + ",n=" + this.createEffectfulFunction(["o", "x", "z", "c"], 'for(x=0,z=b.length;x<z;x++)(c=b[x],(!a&&x===z-1)?o[s?"return":"throw"](c):o.next(c))') + ",e=" + this.createFunction(["o", "t"], "(a&&(l[t=p++]=o),n(o)," + this.createEffectfulFunction([], "a&&(l[t]=void 0)") + ")") + ",{__SEROVAL_STREAM__:!0,on:" + this.createFunction(["o"], "e(o)") + ",next:" + this.createEffectfulFunction(["v"], 'a&&(b.push(v),f(v,"next"))') + ",throw:" + this.createEffectfulFunction(["v"], 'a&&(b.push(v),f(v,"throw"),a=s=!1,l.length=0)') + ",return:" + this.createEffectfulFunction(["v"], 'a&&(b.push(v),f(v,"return"),a=!1,s=!0,l.length=0)') + "})");
      case 5:
        return this.createFunction(["a", "s"], "((s=(a=new AbortController).signal).a=a,s)");
      case 6:
        return this.createEffectfulFunction(["s", "r"], "s.a.abort(r);delete s.a");
      default:
        return "";
    }
  }
  serializeSpecialReference(e) {
    return this.assignIndexedValue(e.i, this.serializeSpecialReferenceValue(e.s));
  }
  serializeIteratorFactory(e) {
    let r = "", s = false;
    return e.f.t !== 4 && (this.markRef(e.f.i), r = "(" + this.serialize(e.f) + ",", s = true), r += this.assignIndexedValue(e.i, this.createFunction(["s"], this.createFunction(["i", "c", "d", "t"], "(i=0,t={[" + this.getRefParam(e.f.i) + "]:" + this.createFunction([], "t") + ",next:" + this.createEffectfulFunction([], "if(i>s.d)return{done:!0,value:void 0};if(d=s.v[c=i++],c===s.t)throw d;return{done:c===s.d,value:d}") + "})"))), s && (r += ")"), r;
  }
  serializeIteratorFactoryInstance(e) {
    return this.getConstructor(e.a[0]) + "(" + this.serialize(e.a[1]) + ")";
  }
  serializeAsyncIteratorFactory(e) {
    let r = e.a[0], s = e.a[1], n2 = "";
    r.t !== 4 && (this.markRef(r.i), n2 += "(" + this.serialize(r)), s.t !== 4 && (this.markRef(s.i), n2 += (n2 ? "," : "(") + this.serialize(s)), n2 && (n2 += ",");
    let a = this.assignIndexedValue(e.i, this.createFunction(["s"], this.createFunction(["b", "c", "p", "d", "e", "t", "f"], "(b=[],c=0,p=[],d=-1,e=!1,f=" + this.createEffectfulFunction(["i", "l"], "for(i=0,l=p.length;i<l;i++)p[i].s({done:!0,value:void 0})") + ",s.on({next:" + this.createEffectfulFunction(["v", "t"], "if(t=p.shift())t.s({done:!1,value:v});b.push(v)") + ",throw:" + this.createEffectfulFunction(["v", "t"], "if(t=p.shift())t.f(v);f(),d=b.length,e=!0,b.push(v)") + ",return:" + this.createEffectfulFunction(["v", "t"], "if(t=p.shift())t.s({done:!0,value:v});f(),d=b.length,b.push(v)") + "}),t={[" + this.getRefParam(s.i) + "]:" + this.createFunction([], "t") + ",next:" + this.createEffectfulFunction(["i", "t", "v"], "if(d===-1){return((i=c++)>=b.length)?(p.push(t=" + this.getRefParam(r.i) + "()),t):{done:!1,value:b[i]}}if(c>d)return{done:!0,value:void 0};if(v=b[i=c++],i!==d)return{done:!1,value:v};if(e)throw v;return{done:!0,value:v}") + "})")));
    return n2 ? n2 + a + ")" : a;
  }
  serializeAsyncIteratorFactoryInstance(e) {
    return this.getConstructor(e.a[0]) + "(" + this.serialize(e.a[1]) + ")";
  }
  serializeStreamConstructor(e) {
    let r = this.assignIndexedValue(e.i, this.getConstructor(e.f) + "()"), s = e.a.length;
    if (s) {
      let n2 = this.serialize(e.a[0]);
      for (let a = 1; a < s; a++) n2 += "," + this.serialize(e.a[a]);
      return "(" + r + "," + n2 + "," + this.getRefParam(e.i) + ")";
    }
    return r;
  }
  serializeStreamNext(e) {
    return this.getRefParam(e.i) + ".next(" + this.serialize(e.f) + ")";
  }
  serializeStreamThrow(e) {
    return this.getRefParam(e.i) + ".throw(" + this.serialize(e.f) + ")";
  }
  serializeStreamReturn(e) {
    return this.getRefParam(e.i) + ".return(" + this.serialize(e.f) + ")";
  }
  serializeAbortSignalSync(e) {
    return this.assignIndexedValue(e.i, "AbortSignal.abort(" + this.serialize(e.f) + ")");
  }
  serializeAbortSignalConstructor(e) {
    return this.assignIndexedValue(e.i, this.getConstructor(e.f) + "()");
  }
  serializeAbortSignalAbort(e) {
    return this.getConstructor(e.a[0]) + "(" + this.getRefParam(e.i) + "," + this.serialize(e.a[1]) + ")";
  }
  serialize(e) {
    try {
      switch (e.t) {
        case 2:
          return Ge[e.s];
        case 0:
          return "" + e.s;
        case 1:
          return '"' + e.s + '"';
        case 3:
          return e.s + "n";
        case 4:
          return this.getRefParam(e.i);
        case 18:
          return this.serializeReference(e);
        case 9:
          return this.serializeArray(e);
        case 10:
          return this.serializeObject(e);
        case 11:
          return this.serializeNullConstructor(e);
        case 5:
          return this.serializeDate(e);
        case 6:
          return this.serializeRegExp(e);
        case 7:
          return this.serializeSet(e);
        case 8:
          return this.serializeMap(e);
        case 19:
          return this.serializeArrayBuffer(e);
        case 16:
        case 15:
          return this.serializeTypedArray(e);
        case 20:
          return this.serializeDataView(e);
        case 14:
          return this.serializeAggregateError(e);
        case 13:
          return this.serializeError(e);
        case 12:
          return this.serializePromise(e);
        case 17:
          return this.serializeWellKnownSymbol(e);
        case 21:
          return this.serializeBoxed(e);
        case 22:
          return this.serializePromiseConstructor(e);
        case 23:
          return this.serializePromiseResolve(e);
        case 24:
          return this.serializePromiseReject(e);
        case 25:
          return this.serializePlugin(e);
        case 26:
          return this.serializeSpecialReference(e);
        case 27:
          return this.serializeIteratorFactory(e);
        case 28:
          return this.serializeIteratorFactoryInstance(e);
        case 29:
          return this.serializeAsyncIteratorFactory(e);
        case 30:
          return this.serializeAsyncIteratorFactoryInstance(e);
        case 31:
          return this.serializeStreamConstructor(e);
        case 32:
          return this.serializeStreamNext(e);
        case 33:
          return this.serializeStreamThrow(e);
        case 34:
          return this.serializeStreamReturn(e);
        case 36:
          return this.serializeAbortSignalAbort(e);
        case 35:
          return this.serializeAbortSignalConstructor(e);
        case 37:
          return this.serializeAbortSignalSync(e);
        default:
          throw new g(e);
      }
    } catch (r) {
      throw new Ce(r);
    }
  }
};
var T = class extends O {
  constructor(r) {
    super(r);
    this.mode = "cross";
    this.scopeId = r.scopeId;
  }
  getRefParam(r) {
    return Z + "[" + r + "]";
  }
  assignIndexedValue(r, s) {
    return this.getRefParam(r) + "=" + s;
  }
  serializeTop(r) {
    let s = this.serialize(r), n2 = r.i;
    if (n2 == null) return s;
    let a = this.resolvePatches(), i2 = this.getRefParam(n2), l2 = this.scopeId == null ? "" : Z, c = a ? "(" + s + "," + a + i2 + ")" : s;
    if (l2 === "") return r.t === 10 && !a ? "(" + c + ")" : c;
    let d2 = this.scopeId == null ? "()" : "(" + Z + '["' + p(this.scopeId) + '"])';
    return "(" + this.createFunction([l2], c) + ")" + d2;
  }
};
var b = class extends K {
  parseItems(e) {
    let r = [];
    for (let s = 0, n2 = e.length; s < n2; s++) s in e && (r[s] = this.parse(e[s]));
    return r;
  }
  parseArray(e, r) {
    return ye(e, r, this.parseItems(r));
  }
  parseProperties(e) {
    let r = Object.entries(e), s = [], n2 = [];
    for (let i2 = 0, l2 = r.length; i2 < l2; i2++) s.push(p(r[i2][0])), n2.push(this.parse(r[i2][1]));
    let a = Symbol.iterator;
    return a in e && (s.push(this.parseWellKnownSymbol(a)), n2.push(B(this.parseIteratorFactory(), this.parse(W(e))))), a = Symbol.asyncIterator, a in e && (s.push(this.parseWellKnownSymbol(a)), n2.push(j(this.parseAsyncIteratorFactory(), this.parse(L())))), a = Symbol.toStringTag, a in e && (s.push(this.parseWellKnownSymbol(a)), n2.push(w(e[a]))), a = Symbol.isConcatSpreadable, a in e && (s.push(this.parseWellKnownSymbol(a)), n2.push(e[a] ? x : I)), { k: s, v: n2, s: s.length };
  }
  parsePlainObject(e, r, s) {
    return this.createObjectNode(e, r, s, this.parseProperties(r));
  }
  parseBoxed(e, r) {
    return ve(e, this.parse(r.valueOf()));
  }
  parseTypedArray(e, r) {
    return be(e, r, this.parse(r.buffer));
  }
  parseBigIntTypedArray(e, r) {
    return Ne(e, r, this.parse(r.buffer));
  }
  parseDataView(e, r) {
    return Ae(e, r, this.parse(r.buffer));
  }
  parseError(e, r) {
    let s = V(r, this.features);
    return xe(e, r, s ? this.parseProperties(s) : t);
  }
  parseAggregateError(e, r) {
    let s = V(r, this.features);
    return Ie(e, r, s ? this.parseProperties(s) : t);
  }
  parseMap(e, r) {
    let s = [], n2 = [];
    for (let [a, i2] of r.entries()) s.push(this.parse(a)), n2.push(this.parse(i2));
    return this.createMapNode(e, s, n2, r.size);
  }
  parseSet(e, r) {
    let s = [];
    for (let n2 of r.keys()) s.push(this.parse(n2));
    return we(e, r.size, s);
  }
  parsePlugin(e, r) {
    let s = this.plugins;
    if (s) for (let n2 = 0, a = s.length; n2 < a; n2++) {
      let i2 = s[n2];
      if (i2.parse.sync && i2.test(r)) return D(e, i2.tag, i2.parse.sync(r, this, { id: e }));
    }
  }
  parseStream(e, r) {
    return _(e, this.parseSpecialReference(4), []);
  }
  parsePromise(e, r) {
    return this.createPromiseConstructorNode(e);
  }
  parseAbortSignalSync(e, r) {
    return u(37, e, t, t, t, t, t, t, t, this.parse(r.reason), t, t);
  }
  parseAbortSignal(e, r) {
    return r.aborted ? this.parseAbortSignalSync(e, r) : this.createAbortSignalConstructorNode(e);
  }
  parseObject(e, r) {
    if (Array.isArray(r)) return this.parseArray(e, r);
    if (Te(r)) return this.parseStream(e, r);
    let s = r.constructor;
    if (s === P) return this.parse(r.replacement);
    let n2 = this.parsePlugin(e, r);
    if (n2) return n2;
    switch (s) {
      case Object:
        return this.parsePlainObject(e, r, false);
      case void 0:
        return this.parsePlainObject(e, r, true);
      case Date:
        return Se(e, r);
      case RegExp:
        return ge(e, r);
      case Error:
      case EvalError:
      case RangeError:
      case ReferenceError:
      case SyntaxError:
      case TypeError:
      case URIError:
        return this.parseError(e, r);
      case Number:
      case Boolean:
      case String:
      case BigInt:
        return this.parseBoxed(e, r);
      case ArrayBuffer:
        return he(e, r);
      case Int8Array:
      case Int16Array:
      case Int32Array:
      case Uint8Array:
      case Uint16Array:
      case Uint32Array:
      case Uint8ClampedArray:
      case Float32Array:
      case Float64Array:
        return this.parseTypedArray(e, r);
      case DataView:
        return this.parseDataView(e, r);
      case Map:
        return this.parseMap(e, r);
      case Set:
        return this.parseSet(e, r);
      default:
        break;
    }
    if (s === Promise || r instanceof Promise) return this.parsePromise(e, r);
    let a = this.features;
    if (a & 32 && typeof AbortSignal != "undefined" && s === AbortSignal) return this.parseAbortSignal(e, r);
    if (a & 16) switch (s) {
      case BigInt64Array:
      case BigUint64Array:
        return this.parseBigIntTypedArray(e, r);
      default:
        break;
    }
    if (a & 1 && typeof AggregateError != "undefined" && (s === AggregateError || r instanceof AggregateError)) return this.parseAggregateError(e, r);
    if (r instanceof Error) return this.parseError(e, r);
    if (Symbol.iterator in r || Symbol.asyncIterator in r) return this.parsePlainObject(e, r, !!s);
    throw new S(r);
  }
  parseFunction(e) {
    let r = this.getReference(e);
    if (r.type !== 0) return r.value;
    let s = this.parsePlugin(r.value, e);
    if (s) return s;
    throw new S(e);
  }
  parse(e) {
    try {
      switch (typeof e) {
        case "boolean":
          return e ? x : I;
        case "undefined":
          return ce;
        case "string":
          return w(e);
        case "number":
          return fe(e);
        case "bigint":
          return me(e);
        case "object": {
          if (e) {
            let r = this.getReference(e);
            return r.type === 0 ? this.parseObject(r.value, e) : r.value;
          }
          return ue;
        }
        case "symbol":
          return this.parseWellKnownSymbol(e);
        case "function":
          return this.parseFunction(e);
        default:
          throw new S(e);
      }
    } catch (r) {
      throw new M(r);
    }
  }
};
var te = class extends b {
  constructor(r) {
    super(r);
    this.alive = true;
    this.pending = 0;
    this.initial = true;
    this.buffer = [];
    this.onParseCallback = r.onParse, this.onErrorCallback = r.onError, this.onDoneCallback = r.onDone;
  }
  onParseInternal(r, s) {
    try {
      this.onParseCallback(r, s);
    } catch (n2) {
      this.onError(n2);
    }
  }
  flush() {
    for (let r = 0, s = this.buffer.length; r < s; r++) this.onParseInternal(this.buffer[r], false);
  }
  onParse(r) {
    this.initial ? this.buffer.push(r) : this.onParseInternal(r, false);
  }
  onError(r) {
    if (this.onErrorCallback) this.onErrorCallback(r);
    else throw r;
  }
  onDone() {
    this.onDoneCallback && this.onDoneCallback();
  }
  pushPendingState() {
    this.pending++;
  }
  popPendingState() {
    --this.pending <= 0 && this.onDone();
  }
  parseProperties(r) {
    let s = Object.entries(r), n2 = [], a = [];
    for (let l2 = 0, c = s.length; l2 < c; l2++) n2.push(p(s[l2][0])), a.push(this.parse(s[l2][1]));
    let i2 = Symbol.iterator;
    return i2 in r && (n2.push(this.parseWellKnownSymbol(i2)), a.push(B(this.parseIteratorFactory(), this.parse(W(r))))), i2 = Symbol.asyncIterator, i2 in r && (n2.push(this.parseWellKnownSymbol(i2)), a.push(j(this.parseAsyncIteratorFactory(), this.parse(ke(r))))), i2 = Symbol.toStringTag, i2 in r && (n2.push(this.parseWellKnownSymbol(i2)), a.push(w(r[i2]))), i2 = Symbol.isConcatSpreadable, i2 in r && (n2.push(this.parseWellKnownSymbol(i2)), a.push(r[i2] ? x : I)), { k: n2, v: a, s: n2.length };
  }
  parsePromise(r, s) {
    return s.then((n2) => {
      let a = this.parseWithError(n2);
      a && this.onParse(u(23, r, t, t, t, t, t, t, [this.parseSpecialReference(2), a], t, t, t)), this.popPendingState();
    }, (n2) => {
      if (this.alive) {
        let a = this.parseWithError(n2);
        a && this.onParse(u(24, r, t, t, t, t, t, t, [this.parseSpecialReference(3), a], t, t, t));
      }
      this.popPendingState();
    }), this.pushPendingState(), this.createPromiseConstructorNode(r);
  }
  parsePlugin(r, s) {
    let n2 = this.plugins;
    if (n2) for (let a = 0, i2 = n2.length; a < i2; a++) {
      let l2 = n2[a];
      if (l2.parse.stream && l2.test(s)) return D(r, l2.tag, l2.parse.stream(s, this, { id: r }));
    }
    return t;
  }
  parseStream(r, s) {
    let n2 = _(r, this.parseSpecialReference(4), []);
    return this.pushPendingState(), s.on({ next: (a) => {
      if (this.alive) {
        let i2 = this.parseWithError(a);
        i2 && this.onParse(Ee(r, i2));
      }
    }, throw: (a) => {
      if (this.alive) {
        let i2 = this.parseWithError(a);
        i2 && this.onParse(Re(r, i2));
      }
      this.popPendingState();
    }, return: (a) => {
      if (this.alive) {
        let i2 = this.parseWithError(a);
        i2 && this.onParse(Pe(r, i2));
      }
      this.popPendingState();
    } }), n2;
  }
  handleAbortSignal(r, s) {
    if (this.alive) {
      let n2 = this.parseWithError(s.reason);
      n2 && this.onParse(u(36, r, t, t, t, t, t, t, [this.parseSpecialReference(6), n2], t, t, t));
    }
    this.popPendingState();
  }
  parseAbortSignal(r, s) {
    return s.aborted ? this.parseAbortSignalSync(r, s) : (this.pushPendingState(), s.addEventListener("abort", this.handleAbortSignal.bind(this, r, s), { once: true }), this.createAbortSignalConstructorNode(r));
  }
  parseWithError(r) {
    try {
      return this.parse(r);
    } catch (s) {
      return this.onError(s), t;
    }
  }
  start(r) {
    let s = this.parseWithError(r);
    s && (this.onParseInternal(s, true), this.initial = false, this.flush(), this.pending <= 0 && this.destroy());
  }
  destroy() {
    this.alive && (this.onDone(), this.alive = false);
  }
  isAlive() {
    return this.alive;
  }
};
var Y = class extends te {
  constructor() {
    super(...arguments);
    this.mode = "cross";
  }
};
function fr(o2, e) {
  let r = f(e.plugins), s = new Y({ plugins: r, refs: e.refs, disabledFeatures: e.disabledFeatures, onParse(n2, a) {
    let i2 = new T({ plugins: r, features: s.features, scopeId: e.scopeId, markedRefs: s.marked }), l2;
    try {
      l2 = i2.serializeTop(n2);
    } catch (c) {
      e.onError && e.onError(c);
      return;
    }
    e.onSerialize(l2, a);
  }, onError: e.onError, onDone: e.onDone });
  return s.start(o2), s.destroy.bind(s);
}
var gr = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
var mr = gr.length;
var hr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
var Sr = hr.length;
var Ve = class {
  constructor(e) {
    this.options = e;
    this.alive = true;
    this.flushed = false;
    this.done = false;
    this.pending = 0;
    this.cleanups = [];
    this.refs = /* @__PURE__ */ new Map();
    this.keys = /* @__PURE__ */ new Set();
    this.ids = 0;
    this.plugins = f(e.plugins);
  }
  write(e, r) {
    this.alive && !this.flushed && (this.pending++, this.keys.add(e), this.cleanups.push(fr(r, { plugins: this.plugins, scopeId: this.options.scopeId, refs: this.refs, disabledFeatures: this.options.disabledFeatures, onError: this.options.onError, onSerialize: (s, n2) => {
      this.alive && this.options.onData(n2 ? this.options.globalIdentifier + '["' + p(e) + '"]=' + s : s);
    }, onDone: () => {
      this.alive && (this.pending--, this.pending <= 0 && this.flushed && !this.done && this.options.onDone && (this.options.onDone(), this.done = true));
    } })));
  }
  getNextID() {
    for (; this.keys.has("" + this.ids); ) this.ids++;
    return "" + this.ids;
  }
  push(e) {
    let r = this.getNextID();
    return this.write(r, e), r;
  }
  flush() {
    this.alive && (this.flushed = true, this.pending <= 0 && !this.done && this.options.onDone && (this.options.onDone(), this.done = true));
  }
  close() {
    if (this.alive) {
      for (let e = 0, r = this.cleanups.length; e < r; e++) this.cleanups[e]();
      !this.done && this.options.onDone && (this.options.onDone(), this.done = true), this.alive = false;
    }
  }
};

// node_modules/.pnpm/seroval-plugins@1.2.1_seroval@1.2.1/node_modules/seroval-plugins/dist/esm/production/web.mjs
var P2 = Yr({ tag: "seroval-plugins/web/Blob", test(e) {
  return typeof Blob == "undefined" ? false : e instanceof Blob;
}, parse: { async async(e, r) {
  return { type: await r.parse(e.type), buffer: await r.parse(await e.arrayBuffer()) };
} }, serialize(e, r) {
  return "new Blob([" + r.serialize(e.buffer) + "],{type:" + r.serialize(e.type) + "})";
}, deserialize(e, r) {
  return new Blob([r.deserialize(e.buffer)], { type: r.deserialize(e.type) });
} });
function p2(e) {
  return { detail: e.detail, bubbles: e.bubbles, cancelable: e.cancelable, composed: e.composed };
}
var E2 = Yr({ tag: "seroval-plugins/web/CustomEvent", test(e) {
  return typeof CustomEvent == "undefined" ? false : e instanceof CustomEvent;
}, parse: { sync(e, r) {
  return { type: r.parse(e.type), options: r.parse(p2(e)) };
}, async async(e, r) {
  return { type: await r.parse(e.type), options: await r.parse(p2(e)) };
}, stream(e, r) {
  return { type: r.parse(e.type), options: r.parse(p2(e)) };
} }, serialize(e, r) {
  return "new CustomEvent(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new CustomEvent(r.deserialize(e.type), r.deserialize(e.options));
} });
var F2 = E2;
var I2 = Yr({ tag: "seroval-plugins/web/DOMException", test(e) {
  return typeof DOMException == "undefined" ? false : e instanceof DOMException;
}, parse: { sync(e, r) {
  return { name: r.parse(e.name), message: r.parse(e.message) };
}, async async(e, r) {
  return { name: await r.parse(e.name), message: await r.parse(e.message) };
}, stream(e, r) {
  return { name: r.parse(e.name), message: r.parse(e.message) };
} }, serialize(e, r) {
  return "new DOMException(" + r.serialize(e.message) + "," + r.serialize(e.name) + ")";
}, deserialize(e, r) {
  return new DOMException(r.deserialize(e.message), r.deserialize(e.name));
} });
var B2 = I2;
function u2(e) {
  return { bubbles: e.bubbles, cancelable: e.cancelable, composed: e.composed };
}
var L2 = Yr({ tag: "seroval-plugins/web/Event", test(e) {
  return typeof Event == "undefined" ? false : e instanceof Event;
}, parse: { sync(e, r) {
  return { type: r.parse(e.type), options: r.parse(u2(e)) };
}, async async(e, r) {
  return { type: await r.parse(e.type), options: await r.parse(u2(e)) };
}, stream(e, r) {
  return { type: r.parse(e.type), options: r.parse(u2(e)) };
} }, serialize(e, r) {
  return "new Event(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new Event(r.deserialize(e.type), r.deserialize(e.options));
} });
var O2 = L2;
var q = Yr({ tag: "seroval-plugins/web/File", test(e) {
  return typeof File == "undefined" ? false : e instanceof File;
}, parse: { async async(e, r) {
  return { name: await r.parse(e.name), options: await r.parse({ type: e.type, lastModified: e.lastModified }), buffer: await r.parse(await e.arrayBuffer()) };
} }, serialize(e, r) {
  return "new File([" + r.serialize(e.buffer) + "]," + r.serialize(e.name) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new File([r.deserialize(e.buffer)], r.deserialize(e.name), r.deserialize(e.options));
} });
var d = q;
function f2(e) {
  let r = [];
  return e.forEach((s, a) => {
    r.push([a, s]);
  }), r;
}
var n = {};
var H = Yr({ tag: "seroval-plugins/web/FormDataFactory", test(e) {
  return e === n;
}, parse: { sync() {
}, async async() {
  return await Promise.resolve(void 0);
}, stream() {
} }, serialize(e, r) {
  return r.createEffectfulFunction(["e", "f", "i", "s", "t"], "f=new FormData;for(i=0,s=e.length;i<s;i++)f.append((t=e[i])[0],t[1]);return f");
}, deserialize() {
  return n;
} });
var M2 = Yr({ tag: "seroval-plugins/web/FormData", extends: [d, H], test(e) {
  return typeof FormData == "undefined" ? false : e instanceof FormData;
}, parse: { sync(e, r) {
  return { factory: r.parse(n), entries: r.parse(f2(e)) };
}, async async(e, r) {
  return { factory: await r.parse(n), entries: await r.parse(f2(e)) };
}, stream(e, r) {
  return { factory: r.parse(n), entries: r.parse(f2(e)) };
} }, serialize(e, r) {
  return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.entries) + ")";
}, deserialize(e, r) {
  let s = new FormData(), a = r.deserialize(e.entries);
  for (let t2 = 0, b2 = a.length; t2 < b2; t2++) {
    let c = a[t2];
    s.append(c[0], c[1]);
  }
  return s;
} });
var A2 = M2;
function m2(e) {
  let r = [];
  return e.forEach((s, a) => {
    r.push([a, s]);
  }), r;
}
var _2 = Yr({ tag: "seroval-plugins/web/Headers", test(e) {
  return typeof Headers == "undefined" ? false : e instanceof Headers;
}, parse: { sync(e, r) {
  return r.parse(m2(e));
}, async async(e, r) {
  return await r.parse(m2(e));
}, stream(e, r) {
  return r.parse(m2(e));
} }, serialize(e, r) {
  return "new Headers(" + r.serialize(e) + ")";
}, deserialize(e, r) {
  return new Headers(r.deserialize(e));
} });
var i = _2;
var j2 = Yr({ tag: "seroval-plugins/web/ImageData", test(e) {
  return typeof ImageData == "undefined" ? false : e instanceof ImageData;
}, parse: { sync(e, r) {
  return { data: r.parse(e.data), width: r.parse(e.width), height: r.parse(e.height), options: r.parse({ colorSpace: e.colorSpace }) };
}, async async(e, r) {
  return { data: await r.parse(e.data), width: await r.parse(e.width), height: await r.parse(e.height), options: await r.parse({ colorSpace: e.colorSpace }) };
}, stream(e, r) {
  return { data: r.parse(e.data), width: r.parse(e.width), height: r.parse(e.height), options: r.parse({ colorSpace: e.colorSpace }) };
} }, serialize(e, r) {
  return "new ImageData(" + r.serialize(e.data) + "," + r.serialize(e.width) + "," + r.serialize(e.height) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new ImageData(r.deserialize(e.data), r.deserialize(e.width), r.deserialize(e.height), r.deserialize(e.options));
} });
var o = {};
var V2 = Yr({ tag: "seroval-plugins/web/ReadableStreamFactory", test(e) {
  return e === o;
}, parse: { sync() {
}, async async() {
  return await Promise.resolve(void 0);
}, stream() {
} }, serialize(e, r) {
  return r.createFunction(["d"], "new ReadableStream({start:" + r.createEffectfulFunction(["c"], "d.on({next:" + r.createEffectfulFunction(["v"], "c.enqueue(v)") + ",throw:" + r.createEffectfulFunction(["v"], "c.error(v)") + ",return:" + r.createEffectfulFunction([], "c.close()") + "})") + "})");
}, deserialize() {
  return o;
} });
function g2(e) {
  let r = L(), s = e.getReader();
  async function a() {
    try {
      let t2 = await s.read();
      t2.done ? r.return(t2.value) : (r.next(t2.value), await a());
    } catch (t2) {
      r.throw(t2);
    }
  }
  return a().catch(() => {
  }), r;
}
var G = Yr({ tag: "seroval/plugins/web/ReadableStream", extends: [V2], test(e) {
  return typeof ReadableStream == "undefined" ? false : e instanceof ReadableStream;
}, parse: { sync(e, r) {
  return { factory: r.parse(o), stream: r.parse(L()) };
}, async async(e, r) {
  return { factory: await r.parse(o), stream: await r.parse(g2(e)) };
}, stream(e, r) {
  return { factory: r.parse(o), stream: r.parse(g2(e)) };
} }, serialize(e, r) {
  return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.stream) + ")";
}, deserialize(e, r) {
  let s = r.deserialize(e.stream);
  return new ReadableStream({ start(a) {
    s.on({ next(t2) {
      a.enqueue(t2);
    }, throw(t2) {
      a.error(t2);
    }, return() {
      a.close();
    } });
  } });
} });
var l = G;
function z(e, r) {
  return { body: r, cache: e.cache, credentials: e.credentials, headers: e.headers, integrity: e.integrity, keepalive: e.keepalive, method: e.method, mode: e.mode, redirect: e.redirect, referrer: e.referrer, referrerPolicy: e.referrerPolicy };
}
var K2 = Yr({ tag: "seroval-plugins/web/Request", extends: [l, i], test(e) {
  return typeof Request == "undefined" ? false : e instanceof Request;
}, parse: { async async(e, r) {
  return { url: await r.parse(e.url), options: await r.parse(z(e, e.body ? await e.clone().arrayBuffer() : null)) };
}, stream(e, r) {
  return { url: r.parse(e.url), options: r.parse(z(e, e.clone().body)) };
} }, serialize(e, r) {
  return "new Request(" + r.serialize(e.url) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new Request(r.deserialize(e.url), r.deserialize(e.options));
} });
var Q = K2;
function S2(e) {
  return { headers: e.headers, status: e.status, statusText: e.statusText };
}
var X2 = Yr({ tag: "seroval-plugins/web/Response", extends: [l, i], test(e) {
  return typeof Response == "undefined" ? false : e instanceof Response;
}, parse: { async async(e, r) {
  return { body: await r.parse(e.body ? await e.clone().arrayBuffer() : null), options: await r.parse(S2(e)) };
}, stream(e, r) {
  return { body: r.parse(e.clone().body), options: r.parse(S2(e)) };
} }, serialize(e, r) {
  return "new Response(" + r.serialize(e.body) + "," + r.serialize(e.options) + ")";
}, deserialize(e, r) {
  return new Response(r.deserialize(e.body), r.deserialize(e.options));
} });
var Z2 = X2;
var x2 = Yr({ tag: "seroval-plugins/web/URLSearchParams", test(e) {
  return typeof URLSearchParams == "undefined" ? false : e instanceof URLSearchParams;
}, parse: { sync(e, r) {
  return r.parse(e.toString());
}, async async(e, r) {
  return await r.parse(e.toString());
}, stream(e, r) {
  return r.parse(e.toString());
} }, serialize(e, r) {
  return "new URLSearchParams(" + r.serialize(e) + ")";
}, deserialize(e, r) {
  return new URLSearchParams(r.deserialize(e));
} });
var ee = x2;
var ae = Yr({ tag: "seroval-plugins/web/URL", test(e) {
  return typeof URL == "undefined" ? false : e instanceof URL;
}, parse: { sync(e, r) {
  return r.parse(e.href);
}, async async(e, r) {
  return await r.parse(e.href);
}, stream(e, r) {
  return r.parse(e.href);
} }, serialize(e, r) {
  return "new URL(" + r.serialize(e) + ")";
}, deserialize(e, r) {
  return new URL(r.deserialize(e));
} });
var te2 = ae;

// node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js
var booleans = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected"
];
var BooleanAttributes = /* @__PURE__ */ new Set(booleans);
var Properties = /* @__PURE__ */ new Set([
  "className",
  "value",
  "readOnly",
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  ...booleans
]);
var ChildProperties = /* @__PURE__ */ new Set([
  "innerHTML",
  "textContent",
  "innerText",
  "children"
]);
var Aliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
});
var ES2017FLAG = F.AggregateError | F.BigIntTypedArray;
var GLOBAL_IDENTIFIER = "_$HY.r";
function createSerializer({ onData, onDone, scopeId, onError }) {
  return new Ve({
    scopeId,
    plugins: [
      F2,
      B2,
      O2,
      A2,
      i,
      l,
      Q,
      Z2,
      ee,
      te2
    ],
    globalIdentifier: GLOBAL_IDENTIFIER,
    disabledFeatures: ES2017FLAG,
    onData,
    onDone,
    onError
  });
}
function getLocalHeaderScript(id) {
  return br(id) + ";";
}
var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
var REPLACE_SCRIPT = `function $df(e,n,o,t){if(n=document.getElementById(e),o=document.getElementById("pl-"+e)){for(;o&&8!==o.nodeType&&o.nodeValue!=="pl-"+e;)t=o.nextSibling,o.remove(),o=t;_$HY.done?o.remove():o.replaceWith(n.content)}n.remove(),_$HY.fe(e)}`;
function renderToStringAsync(code, options = {}) {
  const { timeoutMs = 3e4 } = options;
  let timeoutHandle;
  const timeout = new Promise((_3, reject) => {
    timeoutHandle = setTimeout(() => reject("renderToString timed out"), timeoutMs);
  });
  return Promise.race([renderToStream(code, options), timeout]).then((html) => {
    clearTimeout(timeoutHandle);
    return html;
  });
}
function renderToStream(code, options = {}) {
  let { nonce, onCompleteShell, onCompleteAll, renderId, noScripts } = options;
  let dispose;
  const blockingPromises = [];
  const pushTask = (task) => {
    if (noScripts) return;
    if (!tasks && !firstFlushed) {
      tasks = getLocalHeaderScript(renderId);
    }
    tasks += task + ";";
    if (!timer && firstFlushed) {
      timer = setTimeout(writeTasks);
    }
  };
  const onDone = () => {
    writeTasks();
    doShell();
    onCompleteAll && onCompleteAll({
      write(v) {
        !completed && buffer.write(v);
      }
    });
    writable && writable.end();
    completed = true;
    if (firstFlushed) dispose();
  };
  const serializer = createSerializer({
    scopeId: options.renderId,
    onData: pushTask,
    onDone,
    onError: options.onError
  });
  const flushEnd = () => {
    if (!registry.size) {
      queue(() => queue(() => serializer.flush()));
    }
  };
  const registry = /* @__PURE__ */ new Map();
  const writeTasks = () => {
    if (tasks.length && !completed && firstFlushed) {
      buffer.write(`<script${nonce ? ` nonce="${nonce}"` : ""}>${tasks}</script>`);
      tasks = "";
    }
    timer && clearTimeout(timer);
    timer = null;
  };
  let context;
  let writable;
  let tmp = "";
  let tasks = "";
  let firstFlushed = false;
  let completed = false;
  let shellCompleted = false;
  let scriptFlushed = false;
  let timer = null;
  let buffer = {
    write(payload) {
      tmp += payload;
    }
  };
  sharedConfig.context = context = {
    id: renderId || "",
    count: 0,
    async: true,
    resources: {},
    lazy: {},
    suspense: {},
    assets: [],
    nonce,
    block(p3) {
      if (!firstFlushed) blockingPromises.push(p3);
    },
    replace(id, payloadFn) {
      if (firstFlushed) return;
      const placeholder = `<!--!$${id}-->`;
      const first = html.indexOf(placeholder);
      if (first === -1) return;
      const last = html.indexOf(`<!--!$/${id}-->`, first + placeholder.length);
      html = html.slice(0, first) + resolveSSRNode(escape(payloadFn())) + html.slice(last + placeholder.length + 1);
    },
    serialize(id, p3, wait) {
      const serverOnly = sharedConfig.context.noHydrate;
      if (!firstFlushed && wait && typeof p3 === "object" && "then" in p3) {
        blockingPromises.push(p3);
        !serverOnly && p3.then((d2) => {
          serializer.write(id, d2);
        }).catch((e) => {
          serializer.write(id, e);
        });
      } else if (!serverOnly) serializer.write(id, p3);
    },
    roots: 0,
    nextRoot() {
      return this.renderId + "i-" + this.roots++;
    },
    registerFragment(key) {
      if (!registry.has(key)) {
        let resolve, reject;
        const p3 = new Promise((r, rej) => (resolve = r, reject = rej));
        registry.set(
          key,
          (err) => queue(
            () => queue(() => {
              err ? reject(err) : resolve(true);
              queue(flushEnd);
            })
          )
        );
        serializer.write(key, p3);
      }
      return (value, error) => {
        if (registry.has(key)) {
          const resolve = registry.get(key);
          registry.delete(key);
          if (waitForFragments(registry, key)) {
            resolve();
            return;
          }
          if (!completed) {
            if (!firstFlushed) {
              queue(() => html = replacePlaceholder(html, key, value !== void 0 ? value : ""));
              resolve(error);
            } else {
              buffer.write(`<template id="${key}">${value !== void 0 ? value : " "}</template>`);
              pushTask(`$df("${key}")${!scriptFlushed ? ";" + REPLACE_SCRIPT : ""}`);
              resolve(error);
              scriptFlushed = true;
            }
          }
        }
        return firstFlushed;
      };
    }
  };
  let html = createRoot((d2) => {
    dispose = d2;
    return resolveSSRNode(escape(code()));
  });
  function doShell() {
    if (shellCompleted) return;
    sharedConfig.context = context;
    context.noHydrate = true;
    html = injectAssets(context.assets, html);
    if (tasks.length) html = injectScripts(html, tasks, nonce);
    buffer.write(html);
    tasks = "";
    onCompleteShell && onCompleteShell({
      write(v) {
        !completed && buffer.write(v);
      }
    });
    shellCompleted = true;
  }
  return {
    then(fn) {
      function complete() {
        dispose();
        fn(tmp);
      }
      if (onCompleteAll) {
        let ogComplete = onCompleteAll;
        onCompleteAll = (options2) => {
          ogComplete(options2);
          complete();
        };
      } else onCompleteAll = complete;
      queue(flushEnd);
    },
    pipe(w2) {
      allSettled(blockingPromises).then(() => {
        setTimeout(() => {
          doShell();
          buffer = writable = w2;
          buffer.write(tmp);
          firstFlushed = true;
          if (completed) {
            dispose();
            writable.end();
          } else flushEnd();
        });
      });
    },
    pipeTo(w2) {
      return allSettled(blockingPromises).then(() => {
        let resolve;
        const p3 = new Promise((r) => resolve = r);
        setTimeout(() => {
          doShell();
          const encoder = new TextEncoder();
          const writer = w2.getWriter();
          writable = {
            end() {
              writer.releaseLock();
              w2.close();
              resolve();
            }
          };
          buffer = {
            write(payload) {
              writer.write(encoder.encode(payload));
            }
          };
          buffer.write(tmp);
          firstFlushed = true;
          if (completed) {
            dispose();
            writable.end();
          } else flushEnd();
        });
        return p3;
      });
    }
  };
}
function ssr(t2, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i2 = 0; i2 < nodes.length; i2++) {
      result += t2[i2];
      const node = nodes[i2];
      if (node !== void 0) result += resolveSSRNode(node);
    }
    t2 = result + t2[nodes.length];
  }
  return {
    t: t2
  };
}
function ssrClassList(value) {
  if (!value) return "";
  let classKeys = Object.keys(value), result = "";
  for (let i2 = 0, len = classKeys.length; i2 < len; i2++) {
    const key = classKeys[i2], classValue = !!value[key];
    if (!key || key === "undefined" || !classValue) continue;
    i2 && (result += " ");
    result += escape(key);
  }
  return result;
}
function ssrStyle(value) {
  if (!value) return "";
  if (typeof value === "string") return escape(value, true);
  let result = "";
  const k = Object.keys(value);
  for (let i2 = 0; i2 < k.length; i2++) {
    const s = k[i2];
    const v = value[s];
    if (v != void 0) {
      if (i2) result += ";";
      result += `${s}:${escape(v, true)}`;
    }
  }
  return result;
}
function ssrElement(tag, props, children2, needsId) {
  if (props == null) props = {};
  else if (typeof props === "function") props = props();
  const skipChildren = VOID_ELEMENTS.test(tag);
  const keys = Object.keys(props);
  let result = `<${tag}${needsId ? ssrHydrationKey() : ""} `;
  let classResolved;
  for (let i2 = 0; i2 < keys.length; i2++) {
    const prop = keys[i2];
    if (ChildProperties.has(prop)) {
      if (children2 === void 0 && !skipChildren)
        children2 = tag === "script" || tag === "style" || prop === "innerHTML" ? props[prop] : escape(props[prop]);
      continue;
    }
    const value = props[prop];
    if (prop === "style") {
      result += `style="${ssrStyle(value)}"`;
    } else if (prop === "class" || prop === "className" || prop === "classList") {
      if (classResolved) continue;
      let n2;
      result += `class="${escape(((n2 = props.class) ? n2 + " " : "") + ((n2 = props.className) ? n2 + " " : ""), true) + ssrClassList(props.classList)}"`;
      classResolved = true;
    } else if (BooleanAttributes.has(prop)) {
      if (value) result += prop;
      else continue;
    } else if (value == void 0 || prop === "ref" || prop.slice(0, 2) === "on" || prop.slice(0, 5) === "prop:") {
      continue;
    } else if (prop.slice(0, 5) === "bool:") {
      if (!value) continue;
      result += escape(prop.slice(5));
    } else if (prop.slice(0, 5) === "attr:") {
      result += `${escape(prop.slice(5))}="${escape(value, true)}"`;
    } else {
      result += `${Aliases[prop] || escape(prop)}="${escape(value, true)}"`;
    }
    if (i2 !== keys.length - 1) result += " ";
  }
  if (skipChildren)
    return {
      t: result + "/>"
    };
  if (typeof children2 === "function") children2 = children2();
  return {
    t: result + `>${resolveSSRNode(children2, true)}</${tag}>`
  };
}
function ssrAttribute(key, value, isBoolean) {
  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk=${hk}` : "";
}
function escape(s, attr) {
  const t2 = typeof s;
  if (t2 !== "string") {
    if (!attr && t2 === "function") return escape(s());
    if (!attr && Array.isArray(s)) {
      for (let i2 = 0; i2 < s.length; i2++) s[i2] = escape(s[i2]);
      return s;
    }
    if (attr && t2 === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0, out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else
    while (iAmp >= 0) {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node, top) {
  const t2 = typeof node;
  if (t2 === "string") return node;
  if (node == null || t2 === "boolean") return "";
  if (Array.isArray(node)) {
    let prev = {};
    let mapped = "";
    for (let i2 = 0, len = node.length; i2 < len; i2++) {
      if (!top && typeof prev !== "object" && typeof node[i2] !== "object") mapped += `<!--!$-->`;
      mapped += resolveSSRNode(prev = node[i2]);
    }
    return mapped;
  }
  if (t2 === "object") return node.t;
  if (t2 === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && sharedConfig.getNextContextId();
}
function NoHydration(props) {
  if (sharedConfig.context) sharedConfig.context.noHydrate = true;
  return props.children;
}
function queue(fn) {
  return Promise.resolve().then(fn);
}
function allSettled(promises) {
  let length = promises.length;
  return Promise.allSettled(promises).then(() => {
    if (promises.length !== length) return allSettled(promises);
    return;
  });
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i2 = 0, len = assets.length; i2 < len; i2++) out += assets[i2]();
  const index = html.indexOf("</head>");
  if (index === -1) return html;
  return html.slice(0, index) + out + html.slice(index);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function waitForFragments(registry, key) {
  for (const k of [...registry.keys()].reverse()) {
    if (key.startsWith(k)) return true;
  }
  return false;
}
function replacePlaceholder(html, key, value) {
  const marker = `<template id="pl-${key}">`;
  const close = `<!--pl-${key}-->`;
  const first = html.indexOf(marker);
  if (first === -1) return html;
  const last = html.indexOf(close, first + marker.length);
  return html.slice(0, first) + value + html.slice(last + close.length);
}
var RequestContext = Symbol();

// src/lib/config.ts
var DEFAULTS = {
  site: {
    name: "Story",
    description: "",
    lang: "zh",
    timezone: "Asia/Shanghai",
    dir: "ltr"
  },
  home: "/_home.md",
  about: "/_about.md",
  links: "/_links.md",
  masonry: "/_masonry.md",
  posts: {
    per_page: 10,
    per_index: 10,
    featured_tag: "featured"
  },
  features: {
    light_and_dark_mode: true,
    show_archives: true,
    show_back_button: true,
    view_transitions: true,
    preloader: false,
    particles: false,
    home_banner: true,
    home_sidebar: true,
    edit_post: { enabled: false }
  },
  story: {
    colors: { primary: "#A31F34", default_mode: "light" },
    global: {
      scroll_progress: { bar: false, percentage: true },
      scroll_tools: { enable: true }
    },
    home_banner: {
      enable: true,
      style: "fixed",
      image: {
        light: "/assets/images/main_bg_ligth.jpg",
        dark: "/assets/images/main_bg.jpg"
      }
    },
    home_sidebar: { enable: true, position: "left" }
  },
  socials: [],
  share_links: []
};
function resolveInnerLinkPath(link) {
  if (!link) return "";
  const m3 = link.match(/^\[\[([^\]]+)\]\]$/);
  if (m3) {
    const name = m3[1];
    if (name.startsWith("/")) return name;
    return name.endsWith(".md") ? `/${name}` : `/${name}.md`;
  }
  return link.startsWith("/") ? link : `/${link}`;
}
function getStoryConfig(ctx) {
  const raw = ctx.config || {};
  return {
    ...DEFAULTS,
    ...raw,
    site: { ...DEFAULTS.site, ...raw.site },
    posts: { ...DEFAULTS.posts, ...raw.posts },
    features: { ...DEFAULTS.features, ...raw.features },
    story: {
      ...DEFAULTS.story,
      ...raw.story,
      home_banner: { ...DEFAULTS.story?.home_banner, ...raw.story?.home_banner },
      home_sidebar: { ...DEFAULTS.story?.home_sidebar, ...raw.story?.home_sidebar },
      navbar: { ...DEFAULTS.story?.navbar, ...raw.story?.navbar },
      global: { ...DEFAULTS.story?.global, ...raw.story?.global }
    },
    socials: raw.socials ?? DEFAULTS.socials,
    share_links: raw.share_links ?? DEFAULTS.share_links
  };
}

// src/lib/i18n/lang/en.ts
var en = {
  nav: {
    home: "Home",
    posts: "Posts",
    tags: "Tags",
    about: "About",
    archives: "Archives",
    search: "Search"
  },
  post: {
    publishedAt: "Published at",
    updatedAt: "Updated",
    sharePostIntro: "Share this post:",
    tagLabel: "Tags",
    backToTop: "Back to top",
    goBack: "Go back",
    editPage: "Edit page",
    previousPost: "Previous Post",
    nextPost: "Next Post",
    neighborNav: "Post navigation",
    copyrightTitle: "Article title",
    copyrightAuthor: "Author",
    copyrightCreated: "Created",
    copyrightUpdated: "Updated",
    copyrightLink: "Permalink",
    copyrightLicense: "License"
  },
  pagination: {
    prev: "Prev",
    next: "Next",
    page: "Page"
  },
  home: {
    socialLinks: "Social Links",
    featured: "Featured",
    recentPosts: "Recent Posts",
    allPosts: "All Posts",
    readMore: "Read more",
    postsCount: "Posts"
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "All rights reserved."
  },
  pages: {
    tagTitle: "Tag",
    tagDesc: "All the articles with the tag",
    tagsTitle: "Tags",
    tagsDesc: "All the tags used in posts.",
    postsTitle: "Posts",
    postsDesc: "All the articles I've posted.",
    archivesTitle: "Archives",
    archivesDesc: "All the articles I've archived.",
    searchTitle: "Search",
    searchDesc: "Search any article ...",
    aboutEmpty: "No content yet.",
    linksTitle: "Friend Links",
    linksEmpty: "No friend links configured yet.",
    masonryTitle: "Album",
    masonryEmpty: "No album items configured yet.",
    notFoundTitle: "Page Not Found",
    notFoundDesc: "The page you are looking for doesn't exist or has been moved.",
    notFoundBackHome: "Back to Home"
  },
  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle theme",
    goToPreviousPage: "Go to previous page",
    goToNextPage: "Go to next page"
  }
};

// src/lib/i18n/lang/zh.ts
var zh = {
  nav: {
    home: "\u9996\u9875",
    posts: "\u6587\u7AE0",
    tags: "\u6807\u7B7E",
    about: "\u5173\u4E8E",
    archives: "\u5F52\u6863",
    search: "\u641C\u7D22"
  },
  post: {
    publishedAt: "\u53D1\u5E03\u4E8E",
    updatedAt: "\u66F4\u65B0\u4E8E",
    sharePostIntro: "\u5206\u4EAB\uFF1A",
    tagLabel: "\u6807\u7B7E",
    backToTop: "\u56DE\u5230\u9876\u90E8",
    goBack: "\u8FD4\u56DE",
    editPage: "\u7F16\u8F91",
    previousPost: "\u4E0A\u4E00\u7BC7",
    nextPost: "\u4E0B\u4E00\u7BC7",
    neighborNav: "\u6587\u7AE0\u5BFC\u822A",
    copyrightTitle: "\u6587\u7AE0\u6807\u9898",
    copyrightAuthor: "\u4F5C\u8005",
    copyrightCreated: "\u521B\u5EFA\u65F6\u95F4",
    copyrightUpdated: "\u66F4\u65B0\u65F6\u95F4",
    copyrightLink: "\u6C38\u4E45\u94FE\u63A5",
    copyrightLicense: "\u8BB8\u53EF\u534F\u8BAE"
  },
  pagination: {
    prev: "\u4E0A\u4E00\u9875",
    next: "\u4E0B\u4E00\u9875",
    page: "\u7B2C"
  },
  home: {
    socialLinks: "\u793E\u4EA4\u94FE\u63A5",
    featured: "\u7CBE\u9009",
    recentPosts: "\u6700\u65B0\u6587\u7AE0",
    allPosts: "\u5168\u90E8\u6587\u7AE0",
    readMore: "\u9605\u8BFB\u66F4\u591A",
    postsCount: "\u6587\u7AE0"
  },
  footer: {
    copyright: "\u7248\u6743",
    allRightsReserved: "\u4FDD\u7559\u6240\u6709\u6743\u5229\u3002"
  },
  pages: {
    tagTitle: "\u6807\u7B7E",
    tagDesc: "\u8BE5\u6807\u7B7E\u4E0B\u7684\u6587\u7AE0",
    tagsTitle: "\u6807\u7B7E",
    tagsDesc: "\u7AD9\u70B9\u5168\u90E8\u6807\u7B7E",
    postsTitle: "\u6587\u7AE0",
    postsDesc: "\u5168\u90E8\u6587\u7AE0\u5217\u8868",
    archivesTitle: "\u5F52\u6863",
    archivesDesc: "\u6309\u65F6\u95F4\u5F52\u6863",
    searchTitle: "\u641C\u7D22",
    searchDesc: "\u641C\u7D22\u6587\u7AE0\u2026",
    aboutEmpty: "\u6682\u65E0\u5185\u5BB9",
    linksTitle: "\u53CB\u60C5\u94FE\u63A5",
    linksEmpty: "\u5C1A\u672A\u914D\u7F6E\u53CB\u94FE\u3002",
    masonryTitle: "\u76F8\u518C",
    masonryEmpty: "\u5C1A\u672A\u914D\u7F6E\u76F8\u518C\u5185\u5BB9\u3002",
    notFoundTitle: "\u9875\u9762\u672A\u627E\u5230",
    notFoundDesc: "\u60A8\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u79FB\u52A8\u3002",
    notFoundBackHome: "\u8FD4\u56DE\u9996\u9875"
  },
  a11y: {
    skipToContent: "\u8DF3\u5230\u6B63\u6587",
    openMenu: "\u6253\u5F00\u83DC\u5355",
    closeMenu: "\u5173\u95ED\u83DC\u5355",
    toggleTheme: "\u5207\u6362\u4E3B\u9898",
    goToPreviousPage: "\u4E0A\u4E00\u9875",
    goToNextPage: "\u4E0B\u4E00\u9875"
  }
};

// src/lib/i18n/index.ts
var catalogs = { en, zh };
function useTranslations(lang) {
  return catalogs[lang || "en"] ?? en;
}

// src/lib/normalizeTplPath.ts
function normalizeTplPath(tplPath) {
  return tplPath.replace(/\.p\d+(?=\.html$)/i, "").replace(/^\/+/, "").replace(/\/index\.html$/i, "").replace(/index\.html$/i, "").replace(/\.html$/i, "").replace(/\/+$/, "");
}
function resolvePageKey(compName, tplPath, post) {
  const raw = tplPath ?? compName;
  const key = normalizeTplPath(raw);
  if (key === "" || key === "home") return "home";
  if (key === "about") return "about";
  if (key === "posts") return "posts-list";
  if (key === "tags") return "tags-index";
  if (key === "archives") return "archives";
  if (key === "links") return "links";
  if (key === "album" || key === "masonry") return "album";
  if (key === "404" || key === "not-found") return "not-found";
  if (key.startsWith("tags/")) return "tag-posts";
  if (post) return "post";
  if (compName === "post") return "post";
  if (key) return "not-found";
  return "post";
}
function extractTagSlug(tplKey) {
  const match = tplKey.match(/^tags\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

// src/lib/url.ts
function normalizeNavPath(rawPath, lang) {
  let path = rawPath.replace(/\/index(?:\.p\d+)?\.html$/i, "").replace(/\.html$/i, "").replace(/\/+$/, "") || "/";
  if (lang) {
    const prefix = `/${lang}`;
    if (path === prefix) return "/";
    if (path.startsWith(`${prefix}/`)) {
      path = path.slice(prefix.length) || "/";
    }
  }
  return path;
}
function currentPagePath(ctx) {
  const base = ctx.page_path_base || "";
  let raw = ctx.page_path || "";
  if (base && raw.startsWith(base)) {
    raw = raw.slice(base.length) || "/";
  }
  let normalized = normalizeNavPath(raw || "/", ctx.lang);
  if (normalized === "/" || normalized === "") {
    const tplKey = normalizeTplPath(ctx.tpl_path ?? "");
    if (tplKey && tplKey !== "home") {
      normalized = normalizeNavPath(`/${tplKey}`, ctx.lang);
    }
  }
  return normalized;
}
function isActivePath(currentPath, target) {
  const current = normalizeNavPath(currentPath);
  const t2 = normalizeNavPath(target);
  if (current === t2) return true;
  const currentParts = current.split("/").filter(Boolean);
  const targetParts = t2.split("/").filter(Boolean);
  if (targetParts.length === 0) return currentParts.length === 0;
  return currentParts[0] === targetParts[0];
}
function pageUrl(requestId, path) {
  const base = everkm.base_url(requestId).replace(/\/+$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
function assetUrl(requestId, path) {
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/assets/")) {
    return pageUrl(requestId, path);
  }
  try {
    const resolved = everkm.media(requestId, { file: path });
    if (typeof resolved === "string" && resolved.length > 0) {
      return resolved;
    }
  } catch {
  }
  return everkm.asset_base_url(requestId, { url: path });
}

// src/components/ScrollTools.tsx
var _tmpl$ = '<div class="progress-bar-container" data-vt-persist><div class="scroll-progress-bar"></div></div>';
var _tmpl$2 = '<li class="right-bottom-tools tool-dark-light-toggle" title="Toggle theme"><span aria-hidden="true">\u25D0</span></li>';
var _tmpl$3 = '<li class="right-bottom-tools tool-scroll-to-top" title="Scroll to top"><span class="arrow-up" aria-hidden="true">\u2191</span><span class="percent">0</span></li>';
var _tmpl$4 = ['<div class="right-side-tools-container" data-vt-persist><div class="side-tools-container"><ul class="hidden-tools-list">', '<li class="right-bottom-tools tool-scroll-to-bottom" title="Scroll to bottom"><span aria-hidden="true">\u2193</span></li></ul><ul class="visible-tools-list"><li class="right-bottom-tools toggle-tools-list" title="Tools"><span aria-hidden="true">\u2699</span></li>', "</ul></div></div>"];
var ScrollTools = (props) => {
  const cfg = () => getStoryConfig(props.ctx);
  const enabled = () => cfg().story?.global?.scroll_tools?.enable !== false;
  const showBar = () => cfg().story?.global?.scroll_progress?.bar === true;
  const showPercent = () => cfg().story?.global?.scroll_progress?.percentage !== false;
  const showThemeToggle = () => cfg().features?.light_and_dark_mode !== false;
  return createComponent(Show, {
    get when() {
      return enabled();
    },
    get children() {
      return [createComponent(Show, {
        get when() {
          return showBar();
        },
        get children() {
          return ssr(_tmpl$);
        }
      }), ssr(_tmpl$4, escape(createComponent(Show, {
        get when() {
          return showThemeToggle();
        },
        get children() {
          return ssr(_tmpl$2);
        }
      })), escape(createComponent(Show, {
        get when() {
          return showPercent();
        },
        get children() {
          return ssr(_tmpl$3);
        }
      })))];
    }
  });
};

// src/components/Preloader.tsx
var _tmpl$5 = ['<div class="story-preloader"', ' role="status" aria-live="polite" aria-busy="true"><h2 class="story-preloader__title">', "</h2></div>"];
var Preloader = (props) => {
  const cfg = () => getStoryConfig(props.ctx);
  const enabled = () => cfg().features?.preloader === true;
  const message = () => cfg().story?.global?.preloader?.message?.trim() || cfg().site.name || "Story";
  const maxDuration = () => cfg().story?.global?.preloader?.max_duration_ms ?? 5e3;
  return createComponent(Show, {
    get when() {
      return enabled();
    },
    get children() {
      return ssr(_tmpl$5, ssrAttribute("data-max-duration", escape(String(maxDuration()), true), false), escape(message()));
    }
  });
};

// src/layout/RootLayout.tsx
var _tmpl$6 = ['<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>', '</title><meta name="title"', '><meta name="description"', '><meta name="generator" content="', '"><meta name="theme" content="', '"><link rel="icon" type="image/svg+xml"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&amp;display=swap" rel="stylesheet"><meta name="theme-color" content><script>(function () {\n  const stored = localStorage.getItem("theme");\n  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;\n  const theme = stored ?? (prefersDark ? "dark" : "light");\n  const root = document.documentElement;\n  const isDark = theme === "dark";\n  root.setAttribute("data-theme", theme);\n  root.classList.toggle("dark", isDark);\n  root.classList.toggle("light", !isDark);\n  root.style.colorScheme = theme;\n  document.addEventListener("DOMContentLoaded", function () {\n    document.body.classList.toggle("dark-mode", isDark);\n    document.body.classList.toggle("light-mode", !isDark);\n  });\n  window.__theme = { value: theme };\n})();</script><script>', "</script></head>"];
var _tmpl$22 = '<div id="particles-js" class="story-particles" data-vt-persist aria-hidden="true"></div>';
var _tmpl$32 = ["<script", "></script>"];
var _tmpl$42 = ["<div>", "</div>"];
var _tmpl$52 = ["<html", ' class="overflow-y-scroll scroll-smooth">', '<body class="bg-background font-app text-foreground selection:bg-accent/75 selection:text-accent-foreground flex min-h-svh flex-col"', ">", '<a id="skip-to-content" href="#main-content" class="bg-background text-accent absolute inset-s-16 -top-full z-50 px-3 py-2 backdrop-blur-lg transition-all focus:top-4">', "</a>", "", "", "", "", "</body></html>"];
var RootLayout = (props) => {
  const ctx = () => props.context;
  const cfg = () => getStoryConfig(ctx());
  const siteName = () => cfg().site.name;
  const postMeta = () => ctx().post;
  const postTitle = () => postMeta()?.title ?? "";
  const pageTitle = () => props.title ?? (postTitle() ? `${postTitle()} | ${siteName()}` : siteName());
  const metaDesc = () => props.description ?? postMeta()?.summary ?? cfg().site.description ?? "";
  const baseUrl = () => everkm.base_url(ctx().request_id);
  const lang = () => ctx().lang || cfg().site.lang || "en";
  const dir = () => cfg().site.dir ?? "ltr";
  const customBodyEndHtml = () => ctx().config?.body_end_html || "";
  const navbarAutoHide = () => cfg().story?.navbar?.auto_hide !== false ? "true" : "false";
  const scrollProgressBar = () => cfg().story?.global?.scroll_progress?.bar === true ? "true" : "false";
  const scrollProgressPercent = () => cfg().story?.global?.scroll_progress?.percentage !== false ? "true" : "false";
  const particlesEnabled = () => cfg().features?.particles === true;
  const t2 = () => useTranslations(lang());
  return ssr(_tmpl$52, ssrAttribute("lang", escape(lang(), true), false) + ssrAttribute("dir", escape(dir(), true), false), createComponent(NoHydration, {
    get children() {
      return ssr(_tmpl$6, escape(pageTitle()), ssrAttribute("content", escape(pageTitle(), true), false), ssrAttribute("content", escape(metaDesc(), true), false), `everkm-publish@v${escape(ctx().everkm_publish_version, true)}`, `${escape(ctx().theme_name, true)}@${escape(ctx().theme_version, true)}`, ssrAttribute("href", escape(pageUrl(ctx().request_id, "/assets/favicon.svg"), true), false), `
          window.__everkm_lang = ${JSON.stringify(lang())};
          window.__everkm_base_url = ${JSON.stringify(baseUrl() + "/")};
          window.__everkm_features_view_transitions = ${JSON.stringify(cfg().features?.view_transitions !== false)};
          window.__everkm_env_is_preview = ${JSON.stringify(!!ctx().env_is_preview)};
          `);
    }
  }), ssrAttribute("data-navbar-auto-hide", escape(navbarAutoHide(), true), false) + ssrAttribute("data-scroll-progress-bar", escape(scrollProgressBar(), true), false) + ssrAttribute("data-scroll-progress-percentage", escape(scrollProgressPercent(), true), false) + ssrAttribute("data-particles", particlesEnabled() ? "true" : "false", false), escape(createComponent(Preloader, {
    get ctx() {
      return ctx();
    }
  })), escape(t2().a11y.skipToContent), escape(props.children), escape(createComponent(Show, {
    get when() {
      return particlesEnabled();
    },
    get children() {
      return ssr(_tmpl$22);
    }
  })), escape(createComponent(ScrollTools, {
    get ctx() {
      return ctx();
    }
  })), escape(createComponent(Show, {
    get when() {
      return particlesEnabled();
    },
    get children() {
      return ssr(_tmpl$32, ssrAttribute("src", escape(pageUrl(ctx().request_id, "/assets/vendor/particles.min.js"), true), false));
    }
  })), escape(createComponent(Show, {
    get when() {
      return !!customBodyEndHtml();
    },
    get children() {
      return ssr(_tmpl$42, customBodyEndHtml());
    }
  })));
};

// src/lib/configValue.ts
function configValue(config, path, defaultValue) {
  if (!config) return defaultValue;
  const keys = path.split("/").filter(Boolean);
  let val = config;
  for (const key of keys) {
    if (val == null || typeof val !== "object") return defaultValue;
    val = val[key];
  }
  return val ?? defaultValue;
}

// src/lib/postsPath.ts
var POSTS_CONTENT_DIR = "/";
var HOME_PATH = "";
var POSTS_PATH = "/posts";
var POSTS_INDEX_URL = `${POSTS_PATH}/index.html`;

// src/lib/postsQuery.ts
function isUnderscoreDataSource(path) {
  const base = path.replace(/^\/+/, "").split("/").pop() ?? "";
  return base.startsWith("_");
}
function filterPublicPosts(items) {
  return items.filter((post) => {
    if (post.draft) return false;
    const path = post.path ?? post.url_path ?? "";
    return !isUnderscoreDataSource(path);
  });
}
function queryPublicPosts(requestId, options = {}) {
  const raw = everkm.posts(requestId, {
    dir: POSTS_CONTENT_DIR,
    recursive: false,
    order_by: "date",
    order_direction: "desc",
    draft: false,
    limit: 1e4,
    tags: options.tags,
    exclude_tags: options.exclude_tags
  });
  const filtered = filterPublicPosts(raw.items);
  const offset = options.offset ?? 0;
  const limit = options.limit ?? filtered.length;
  return {
    items: filtered.slice(offset, offset + limit),
    total: filtered.length
  };
}

// src/lib/pagination.ts
function readPagination(qs, config, total) {
  const pageNo = Math.max(1, parseInt(String(qs?.page ?? "1"), 10) || 1);
  const pageSize = Number(
    config?.posts?.per_page ?? 4
  );
  const offset = (pageNo - 1) * pageSize;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  return { pageNo, pageSize, offset, pageCount };
}
function paginationHref(base, targetPage) {
  const normalized = base.replace(/\/+$/, "");
  if (targetPage <= 1) return `${normalized}/index.html`;
  return `${normalized}/index.p${targetPage}.html`;
}

// src/components/Icon.tsx
var Icon = (props) => {
  const [local, rest] = splitProps(props, ["svg", "class", "id"]);
  const withAttrs = () => {
    let svg = local.svg;
    if (local.id) {
      svg = svg.replace("<svg", `<svg id="${local.id}"`);
    }
    const cls = local.class ?? "";
    if (cls) {
      if (svg.includes('class="')) {
        svg = svg.replace(/class="([^"]*)"/, `class="$1 ${cls}"`);
      } else {
        svg = svg.replace("<svg", `<svg class="${cls}"`);
      }
    }
    return svg;
  };
  return ssrElement("span", mergeProps({
    get innerHTML() {
      return withAttrs();
    },
    "aria-hidden": "true"
  }, rest), void 0, false);
};

// src/assets/icons/IconMenuDeep.svg
var IconMenuDeep_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-menu-deep"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6h16" /><path d="M7 12h13" /><path d="M10 18h10" /></svg>';

// src/assets/icons/IconX.svg
var IconX_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>';

// src/assets/icons/IconArchive.svg
var IconArchive_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-archive"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" /><path d="M10 12l4 0" /></svg>';

// src/assets/icons/IconSunHigh.svg
var IconSunHigh_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sun-high"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" /><path d="M6.343 17.657l-1.414 1.414" /><path d="M6.343 6.343l-1.414 -1.414" /><path d="M17.657 6.343l1.414 -1.414" /><path d="M17.657 17.657l1.414 1.414" /><path d="M4 12h-2" /><path d="M12 4v-2" /><path d="M20 12h2" /><path d="M12 20v2" /></svg>';

// src/assets/icons/IconMoon.svg
var IconMoon_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" /></svg>';

// src/assets/icons/IconHome.svg
var IconHome_default = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>\n';

// src/assets/icons/IconInfoCircle.svg
var IconInfoCircle_default = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-info-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>\n';

// src/assets/icons/IconLink.svg
var IconLink_default = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-link"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a5 5 0 0 0 7.54.54l3 -3a5 5 0 0 0 -7.07 -7.07l-3 3" /><path d="M14 11a5 5 0 0 0 -7.54 -.54l-3 3a5 5 0 0 0 7.07 7.07l3 -3" /></svg>\n';

// src/assets/icons/IconPhoto.svg
var IconPhoto_default = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-photo"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01" /><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12" /><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" /><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" /></svg>\n';

// src/assets/icons/socials/github.svg
var github_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>';

// src/lib/navIcons.ts
var NAV_ICONS = {
  home: IconHome_default,
  archive: IconArchive_default,
  archives: IconArchive_default,
  github: github_default,
  photo: IconPhoto_default,
  album: IconPhoto_default,
  image: IconPhoto_default,
  masonry: IconPhoto_default,
  link: IconLink_default,
  links: IconLink_default,
  info: IconInfoCircle_default,
  about: IconInfoCircle_default
};
function inferIconKey(link) {
  const path = link.path.toLowerCase();
  if (/github\.com/i.test(path)) return "github";
  if (path.includes("archives")) return "archives";
  if (path.includes("/album") || path.includes("masonry")) return "album";
  if (path.includes("/links")) return "links";
  if (path.includes("/about")) return "about";
  if (path === "/" || path === "/index.html") return "home";
  return null;
}
function resolveNavIcon(link) {
  const key = link.icon?.trim().toLowerCase();
  if (key && NAV_ICONS[key]) return NAV_ICONS[key];
  const inferred = inferIconKey(link);
  return inferred ? NAV_ICONS[inferred] : null;
}

// src/layout/Header.tsx
var _tmpl$7 = ['<li class="navbar-item"><div id="header-in-search"><x-in-search', ' only-button="false"></x-in-search></div></li>'];
var _tmpl$23 = ['<li class="navbar-item"><button id="theme-btn" class="navbar-icon-btn focus-outline"', ' aria-label="auto" aria-live="polite" type="button">', "", "</button></li>"];
var _tmpl$33 = ['<span class="navbar-link__label">', "</span>"];
var _tmpl$43 = ['<li class="navbar-item"><a', ' data-nav-path="/"', ">", "</a></li>"];
var _tmpl$53 = ['<li class="navbar-item"><a', ' data-nav-path="/tags"', ">", "</a></li>"];
var _tmpl$62 = ['<li class="navbar-item"><a', ' data-nav-path="/about"', ">", "</a></li>"];
var _tmpl$72 = ['<li class="navbar-item"><a', ' data-nav-path="/archives"', ">", "</a></li>"];
var _tmpl$8 = ['<li class="navbar-item"><a', ">", "</a></li>"];
var _tmpl$9 = ['<header class="', '" data-vt-swap="header" style="', '"><div class="', '"><div class="navbar-content__left"><a', ' class="logo-title" data-nav-path="/"><h1>', '</h1></a></div><nav id="nav-menu" class="navbar-content__right"><button id="menu-btn" class="navbar-menu-btn focus-outline"', ' aria-expanded="false" aria-controls="menu-items"', ' type="button">', "", '</button><ul id="menu-items" class="navbar-list navbar-list--desktop">', "", "", "</ul></nav></div></header>"];
function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return `rgba(0,0,0,${alpha})`;
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g3 = Number.parseInt(h.slice(2, 4), 16);
  const b2 = Number.parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g3},${b2},${alpha})`;
}
function resolveNavHref(ctx, link) {
  if (link.external || /^https?:\/\//i.test(link.path)) {
    return link.path;
  }
  return pageUrl(ctx.request_id, link.path);
}
function resolveNavActivePath(link) {
  if (link.external || /^https?:\/\//i.test(link.path)) {
    return "";
  }
  return link.path;
}
var Header = (props) => {
  const cfg = () => getStoryConfig(props.ctx);
  const t2 = () => useTranslations(props.ctx.lang);
  const path = () => currentPagePath(props.ctx);
  const isActive = (target) => isActivePath(path(), target);
  const isHome = () => props.mode === "home";
  const navLinks = () => cfg().story?.navbar?.links ?? [];
  const useConfigNav = () => navLinks().length > 0;
  const navBackground = () => {
    const left = cfg().story?.navbar?.color?.left ?? "#f78736";
    const right = cfg().story?.navbar?.color?.right ?? "#367df7";
    return `linear-gradient(120deg, ${hexToRgba(left, 0.314)} 0%, ${hexToRgba(right, 0.314)} 100%)`;
  };
  const searchItem = () => createComponent(Show, {
    get when() {
      return configValue(props.ctx.config, "algolia_search");
    },
    get children() {
      return ssr(_tmpl$7, ssrAttribute("app-id", escape(String(configValue(props.ctx.config, "algolia_search/app_id", "")), true), false) + ssrAttribute("api-key", escape(String(configValue(props.ctx.config, "algolia_search/api_key", "")), true), false) + ssrAttribute("index", escape(String(configValue(props.ctx.config, "algolia_search/index_name", "")), true), false) + ssrAttribute("site", escape(String(configValue(props.ctx.config, "algolia_search/site", "")), true), false));
    }
  });
  const themeToggleItem = () => createComponent(Show, {
    get when() {
      return cfg().features?.light_and_dark_mode !== false;
    },
    get children() {
      return ssr(_tmpl$23, ssrAttribute("title", escape(t2().a11y.toggleTheme, true), false), escape(createComponent(Icon, {
        svg: IconMoon_default,
        "class": "absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      })), escape(createComponent(Icon, {
        svg: IconSunHigh_default,
        "class": "absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      })));
    }
  });
  const navLinkLabel = (label) => label.toUpperCase();
  const navLinkContent = (iconSvg, label) => [createComponent(Show, {
    when: iconSvg,
    get children() {
      return createComponent(Icon, {
        svg: iconSvg,
        "class": "navbar-link__icon"
      });
    }
  }), ssr(_tmpl$33, escape(navLinkLabel(label)))];
  const defaultNavItems = () => [ssr(_tmpl$43, ssrAttribute("href", escape(pageUrl(props.ctx.request_id, "/index.html"), true), false), ssrAttribute("class", isActive("/") ? "active" : escape(void 0, true), false), escape(navLinkContent(IconHome_default, t2().nav.home))), ssr(_tmpl$53, ssrAttribute("href", escape(pageUrl(props.ctx.request_id, "/tags/index.html"), true), false), ssrAttribute("class", isActive("/tags") ? "active" : escape(void 0, true), false), escape(navLinkContent(IconLink_default, t2().nav.tags))), ssr(_tmpl$62, ssrAttribute("href", escape(pageUrl(props.ctx.request_id, "/about/"), true), false), ssrAttribute("class", isActive("/about") ? "active" : escape(void 0, true), false), escape(navLinkContent(IconInfoCircle_default, t2().nav.about))), createComponent(Show, {
    get when() {
      return cfg().features?.show_archives !== false;
    },
    get children() {
      return ssr(_tmpl$72, ssrAttribute("href", escape(pageUrl(props.ctx.request_id, "/archives/index.html"), true), false), ssrAttribute("class", isActive("/archives") ? "active" : escape(void 0, true), false), escape(navLinkContent(IconArchive_default, t2().nav.archives)));
    }
  })];
  const configNavItems = () => createComponent(For, {
    get each() {
      return navLinks();
    },
    children: (link) => {
      const href = () => resolveNavHref(props.ctx, link);
      const activePath = () => resolveNavActivePath(link);
      const external = () => link.external || /^https?:\/\//i.test(link.path);
      const iconSvg = () => resolveNavIcon(link);
      return ssr(_tmpl$8, ssrAttribute("href", escape(href(), true), false) + ssrAttribute("data-nav-path", escape(activePath(), true) || escape(void 0, true), false) + ssrAttribute("class", activePath() && isActive(activePath()) ? "active" : escape(void 0, true), false) + ssrAttribute("target", external() ? "_blank" : escape(void 0, true), false) + ssrAttribute("rel", external() ? "noopener noreferrer" : escape(void 0, true), false), escape(navLinkContent(iconSvg(), link.label)));
    }
  });
  return ssr(_tmpl$9, `navbar-container ${!isHome() ? "navbar-container--page" : ""}`, "background:" + escape(navBackground(), true), `navbar-content transition-navbar ${isHome() ? "has-home-banner" : ""}`, ssrAttribute("href", escape(pageUrl(props.ctx.request_id, "/index.html"), true), false), escape(cfg().site.name), ssrAttribute("aria-label", escape(t2().a11y.openMenu, true), false), ssrAttribute("data-label-open", escape(t2().a11y.openMenu, true), false) + ssrAttribute("data-label-close", escape(t2().a11y.closeMenu, true), false), escape(createComponent(Icon, {
    svg: IconX_default,
    "class": "navbar-menu-btn__icon navbar-menu-btn__icon--close",
    id: "close-icon"
  })), escape(createComponent(Icon, {
    svg: IconMenuDeep_default,
    "class": "navbar-menu-btn__icon navbar-menu-btn__icon--open",
    id: "menu-icon"
  })), escape(createComponent(Show, {
    get when() {
      return useConfigNav();
    },
    get fallback() {
      return defaultNavItems();
    },
    get children() {
      return configNavItems();
    }
  })), escape(searchItem()), escape(themeToggleItem()));
};

// src/assets/icons/socials/facebook.svg
var facebook_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>';

// src/assets/icons/socials/linkedin.svg
var linkedin_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" /></svg>';

// src/assets/icons/socials/mail.svg
var mail_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>';

// src/assets/icons/socials/pinterest.svg
var pinterest_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-pinterest"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 20l4 -9" /><path d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>';

// src/assets/icons/socials/telegram.svg
var telegram_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>';

// src/assets/icons/socials/whatsapp.svg
var whatsapp_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>';

// src/assets/icons/socials/x.svg
var x_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>';

// src/lib/socialIcons.ts
var SOCIAL_ICON_MAP = {
  facebook: facebook_default,
  github: github_default,
  linkedin: linkedin_default,
  mail: mail_default,
  email: mail_default,
  pinterest: pinterest_default,
  telegram: telegram_default,
  whatsapp: whatsapp_default,
  x: x_default,
  twitter: x_default
};
function getSocialIcon(name) {
  return SOCIAL_ICON_MAP[name.toLowerCase().trim()];
}

// src/components/Socials.tsx
var _tmpl$10 = ['<div class="flex flex-wrap items-center gap-4">', "</div>"];
var _tmpl$24 = ["<a", ' target="_blank" rel="noopener noreferrer"', ">", "</a>"];
var Socials = (props) => {
  return createComponent(Show, {
    get when() {
      return props.socials.length > 0;
    },
    get children() {
      return ssr(_tmpl$10, escape(createComponent(For, {
        get each() {
          return props.socials;
        },
        children: (item) => {
          const svg = getSocialIcon(item.name);
          return ssr(_tmpl$24, ssrAttribute("href", escape(item.url, true), false), ssrAttribute("class", svg ? "inline-flex items-center text-accent hover:opacity-80 transition-opacity" : "inline-flex items-center text-accent hover:underline decoration-dashed underline-offset-4", false) + ssrAttribute("title", escape(item.name, true), false) + ssrAttribute("aria-label", svg ? escape(item.name, true) : escape(void 0, true), false), svg ? escape(createComponent(Icon, {
            svg,
            "class": "size-5 block shrink-0"
          })) : escape(item.name));
        }
      })));
    }
  });
};

// src/components/Footer.tsx
var _tmpl$11 = ['<span class="story-footer__socials">', "</span>"];
var _tmpl$25 = ['<div class="story-footer__line story-footer__line--secondary">', "</div>"];
var _tmpl$34 = ['<div class="', '" data-vt-swap="footer"><footer class="story-footer"><div class="story-footer__info"><div class="story-footer__line story-footer__line--primary"><span class="story-footer__copyright">&#169; ', " <a", ' class="mr-2">', "</a>", "</span>", "</div>", "</div></footer></div>"];
var _tmpl$44 = ["<span>", "</span>"];
var _tmpl$54 = ["<a", ' target="_blank" rel="noopener noreferrer">', "</a>"];
var Footer = (props) => {
  const t2 = () => useTranslations(props.ctx.lang);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const siteName = () => props.config.site.name;
  const homeHref = () => pageUrl(props.ctx.request_id, "/index.html");
  const socials = () => props.config.socials ?? [];
  const poweredBy = () => props.config.copyright?.text?.trim();
  const poweredByLink = () => props.config.copyright?.link?.trim();
  return ssr(_tmpl$34, `main-content-footer ${!props.noMarginTop ? "mt-auto" : ""}`, escape(year), ssrAttribute("href", escape(homeHref(), true), false), escape(siteName()), escape(t2().footer.allRightsReserved), escape(createComponent(Show, {
    get when() {
      return socials().length > 0;
    },
    get children() {
      return ssr(_tmpl$11, escape(createComponent(Socials, {
        get ctx() {
          return props.ctx;
        },
        get socials() {
          return socials();
        }
      })));
    }
  })), escape(createComponent(Show, {
    get when() {
      return !!poweredBy();
    },
    get children() {
      return ssr(_tmpl$25, escape(createComponent(Show, {
        get when() {
          return poweredByLink();
        },
        get fallback() {
          return ssr(_tmpl$44, escape(poweredBy()));
        },
        children: (href) => ["Powered by", " ", ssr(_tmpl$54, ssrAttribute("href", escape(href(), true), false), escape(poweredBy()))]
      })));
    }
  })));
};

// src/components/HomeArticleCard.tsx
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_utc = __toESM(require_utc(), 1);
var import_timezone = __toESM(require_timezone(), 1);

// src/lib/postCover.ts
function resolvePostCover(ctx, post) {
  const cover = post.meta?.cover;
  if (typeof cover !== "string" || !cover.trim()) return null;
  const value = cover.trim();
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/assets/")) return assetUrl(ctx.request_id, value);
  if (value.startsWith("/")) {
    try {
      const resolved = everkm.media(ctx.request_id, {
        file: value,
        __origin_path: post.path
      });
      if (typeof resolved === "string" && resolved.length > 0) {
        return resolved;
      }
    } catch {
    }
  }
  return assetUrl(ctx.request_id, value);
}
function resolvePostCanonicalUrl(ctx, post) {
  return pageUrl(ctx.request_id, post.url_path);
}

// src/lib/toTransitionName.ts
function toTransitionName(title) {
  if (!title) return "";
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// src/components/HomeArticleCard.tsx
var _tmpl$12 = ['<div class="home-article-thumbnail"><a', ' tabindex="-1" aria-hidden="true"><img', ' alt loading="lazy" class="dark:brightness-75"></a></div>'];
var _tmpl$26 = ['<div class="home-article-content">', "</div>"];
var _tmpl$35 = ['<span class="home-article-date"><time', ">", "</time></span>"];
var _tmpl$45 = ['<span class="home-article-tag">', "</span>"];
var _tmpl$55 = ['<li class="home-article-item">', '<div class="home-article-body"><h3 class="home-article-title"><a', ' style="', '">', "</a></h3>", '<div class="home-article-meta-info-container"><div class="home-article-meta-info">', "", '</div><a class="home-article-read-more"', ">", '<span aria-hidden="true"> \u2192</span></a></div></div></li>'];
var _tmpl$63 = ["<a", ">", "</a>"];
import_dayjs.default.extend(import_utc.default);
import_dayjs.default.extend(import_timezone.default);
var HomeArticleCard = (props) => {
  const t2 = () => useTranslations(props.ctx.lang);
  const href = () => pageUrl(props.ctx.request_id, props.post.url_path);
  const cover = () => resolvePostCover(props.ctx, props.post);
  const cfg = () => getStoryConfig(props.ctx);
  const dateLabel = () => {
    const ts = props.post.date ?? 0;
    if (!ts) return "";
    return import_dayjs.default.unix(ts).tz(cfg().site.timezone ?? "UTC").format("YYYY-MM-DD");
  };
  const tags = () => props.post.tags?.filter(Boolean) ?? [];
  return ssr(_tmpl$55, escape(createComponent(Show, {
    get when() {
      return cover();
    },
    get children() {
      return ssr(_tmpl$12, ssrAttribute("href", escape(href(), true), false), ssrAttribute("src", escape(cover(), true), false));
    }
  })), ssrAttribute("href", escape(href(), true), false), "view-transition-name:" + escape(toTransitionName(props.post.title), true), escape(props.post.title), escape(createComponent(Show, {
    get when() {
      return !!props.post.summary;
    },
    get children() {
      return ssr(_tmpl$26, escape(props.post.summary));
    }
  })), escape(createComponent(Show, {
    get when() {
      return !!dateLabel();
    },
    get children() {
      return ssr(_tmpl$35, ssrAttribute("datetime", escape(dateLabel(), true), false), escape(dateLabel()));
    }
  })), escape(createComponent(Show, {
    get when() {
      return tags().length > 0;
    },
    get children() {
      return ssr(_tmpl$45, escape(createComponent(For, {
        get each() {
          return tags();
        },
        children: (tag) => ssr(_tmpl$63, ssrAttribute("href", escape(pageUrl(props.ctx.request_id, `/tags/${encodeURIComponent(tag)}/index.html`), true), false), escape(tag))
      })));
    }
  })), ssrAttribute("href", escape(href(), true), false), escape(t2().home.readMore));
};

// src/components/LinkButton.tsx
var _tmpl$13 = ["<span", ">", "</span>"];
var LinkButton = (props) => {
  const [local, rest] = splitProps(props, ["href", "disabled", "title", "aria-label", "class", "accentHover", "children"]);
  const accentHover = () => local.accentHover !== false && !local.disabled;
  const linkClass = () => ["group inline-flex items-center gap-1", accentHover() ? "hover:text-accent" : "", local.class ?? ""].filter(Boolean).join(" ");
  return createComponent(Show, {
    get when() {
      return !local.disabled && local.href;
    },
    get fallback() {
      return ssr(_tmpl$13, ssrAttribute("class", escape(linkClass(), true), false) + ssrAttribute("title", escape(local.title, true), false) + ssrAttribute("aria-label", escape(local["aria-label"], true), false), escape(local.children));
    },
    get children() {
      return ssrElement("a", mergeProps({
        get href() {
          return local.href;
        },
        get ["class"]() {
          return linkClass();
        },
        get title() {
          return local.title;
        },
        get ["aria-label"]() {
          return local["aria-label"];
        }
      }, rest), escape(local.children), false);
    }
  });
};

// src/assets/icons/IconArrowLeft.svg
var IconArrowLeft_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>';

// src/assets/icons/IconArrowRight.svg
var IconArrowRight_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>';

// src/components/Pagination.tsx
var _tmpl$14 = ['<nav class="mt-auto mb-8 flex justify-center gap-4" role="navigation" aria-label="Pagination Navigation">', "", " / ", "", "</nav>"];
var _tmpl$27 = ['<div data-vt-swap="pagination">', "</div>"];
var Pagination = (props) => {
  const t2 = () => useTranslations(props.ctx.lang);
  const prevHref = () => props.pageNo > 1 ? paginationHref(props.basePath, props.pageNo - 1) : void 0;
  const nextHref = () => props.pageNo < props.pageCount ? paginationHref(props.basePath, props.pageNo + 1) : void 0;
  return ssr(_tmpl$27, escape(createComponent(Show, {
    get when() {
      return props.pageCount > 1;
    },
    get children() {
      return ssr(_tmpl$14, escape(createComponent(LinkButton, {
        get href() {
          return prevHref();
        },
        get disabled() {
          return !prevHref();
        },
        get ["class"]() {
          return `select-none ${!prevHref() ? "opacity-50" : ""}`;
        },
        get ["aria-label"]() {
          return t2().a11y.goToPreviousPage;
        },
        get children() {
          return [createComponent(Icon, {
            svg: IconArrowLeft_default,
            "class": "inline-block rtl:rotate-180"
          }), t2().pagination.prev];
        }
      })), escape(props.pageNo), escape(props.pageCount), escape(createComponent(LinkButton, {
        get href() {
          return nextHref();
        },
        get disabled() {
          return !nextHref();
        },
        get ["class"]() {
          return `select-none ${!nextHref() ? "opacity-50" : ""}`;
        },
        get ["aria-label"]() {
          return t2().a11y.goToNextPage;
        },
        get children() {
          return [t2().pagination.next, createComponent(Icon, {
            svg: IconArrowRight_default,
            "class": "inline-block rtl:rotate-180"
          })];
        }
      })));
    }
  })));
};

// src/lib/bannerSubtitle.ts
function resolveBannerSubtitleStrings(cfg) {
  const sub = cfg.story?.home_banner?.subtitle;
  if (!sub) {
    return cfg.site.description ? [cfg.site.description] : [];
  }
  if (typeof sub === "string") {
    return sub.trim() ? [sub.trim()] : [];
  }
  const texts = sub.text?.filter(Boolean) ?? [];
  if (texts.length > 0) return texts;
  return cfg.site.description ? [cfg.site.description] : [];
}
function resolveBannerSubtitleConfig(cfg) {
  const sub = cfg.story?.home_banner?.subtitle;
  if (!sub || typeof sub === "string") return null;
  return sub;
}
function shouldUseBannerTyping(cfg) {
  const sub = cfg.story?.home_banner?.subtitle;
  if (!sub) return false;
  if (typeof sub === "string") return false;
  if (sub.hitokoto?.enable) return true;
  return (sub.text?.length ?? 0) > 0;
}
function resolveBannerSubtitleStatic(cfg) {
  if (shouldUseBannerTyping(cfg)) return null;
  const strings = resolveBannerSubtitleStrings(cfg);
  return strings[0] ?? null;
}

// src/components/HomeBanner.tsx
var _tmpl$15 = ['<div class="home-banner-background" aria-hidden="true"><img', ' alt class="home-banner-background__img--light"><img', ' alt class="home-banner-background__img--dark"></div>'];
var _tmpl$28 = ['<div class="home-banner-container__inline-bg" aria-hidden="true"><img', ' alt class="home-banner-background__img--light"><img', ' alt class="home-banner-background__img--dark"></div>'];
var _tmpl$36 = ['<p class="home-banner-container__subtitle"><span id="home-banner-subtitle"', "></span></p>"];
var _tmpl$46 = ['<p class="home-banner-container__subtitle">', "</p>"];
var _tmpl$56 = ['<div class="home-banner-container__socials">', "</div>"];
var _tmpl$64 = ['<section class="', '">', '<div class="home-banner-container__content"><div class="home-banner-container__description"><span>', "</span>", "", '</div><div class="home-banner-container__actions"><button type="button" class="home-banner-container__scroll-btn" aria-label="Scroll to content">\u2193</button>', "</div></div></section>"];
var HomeBanner = (props) => {
  const banner = () => props.cfg.story?.home_banner;
  const enabled = () => props.cfg.features?.home_banner !== false && banner()?.enable !== false;
  const title = () => banner()?.title || props.cfg.site.name || "Story";
  const staticSubtitle = () => resolveBannerSubtitleStatic(props.cfg);
  const typingEnabled = () => shouldUseBannerTyping(props.cfg);
  const typedStrings = () => JSON.stringify(resolveBannerSubtitleStrings(props.cfg));
  const typedConfig = () => JSON.stringify(resolveBannerSubtitleConfig(props.cfg) ?? {});
  const imageLight = () => banner()?.image?.light || "/assets/images/main_bg_ligth.jpg";
  const imageDark = () => banner()?.image?.dark || "/assets/images/main_bg.jpg";
  const isFixed = () => banner()?.style === "fixed";
  const socials = () => props.cfg.socials ?? [];
  return createComponent(Show, {
    get when() {
      return enabled();
    },
    get children() {
      return [createComponent(Show, {
        get when() {
          return isFixed();
        },
        get children() {
          return ssr(_tmpl$15, ssrAttribute("src", escape(assetUrl(props.ctx.request_id, imageLight()), true), false), ssrAttribute("src", escape(assetUrl(props.ctx.request_id, imageDark()), true), false));
        }
      }), ssr(_tmpl$64, `home-banner-container ${!isFixed() ? "home-banner-container--static" : ""}`, escape(createComponent(Show, {
        get when() {
          return !isFixed();
        },
        get children() {
          return ssr(_tmpl$28, ssrAttribute("src", escape(assetUrl(props.ctx.request_id, imageLight()), true), false), ssrAttribute("src", escape(assetUrl(props.ctx.request_id, imageDark()), true), false));
        }
      })), escape(title()), escape(createComponent(Show, {
        get when() {
          return typingEnabled();
        },
        get children() {
          return ssr(_tmpl$36, ssrAttribute("data-typed-config", escape(typedConfig(), true), false) + ssrAttribute("data-typed-strings", escape(typedStrings(), true), false));
        }
      })), escape(createComponent(Show, {
        get when() {
          return !typingEnabled() && !!staticSubtitle();
        },
        get children() {
          return ssr(_tmpl$46, escape(staticSubtitle()));
        }
      })), escape(createComponent(Show, {
        get when() {
          return socials().length > 0;
        },
        get children() {
          return ssr(_tmpl$56, escape(createComponent(Socials, {
            get ctx() {
              return props.ctx;
            },
            get socials() {
              return socials();
            }
          })));
        }
      })))];
    }
  });
};

// src/components/HomeSidebar.tsx
var _tmpl$16 = ['<div class="announcement">', "</div>"];
var _tmpl$29 = ['<div class="label">', "</div>"];
var _tmpl$37 = ['<div class="author"><div class="name">', "</div>", "</div>"];
var _tmpl$47 = ['<div class="home-sidebar-container"><div class="home-sidebar-container__sticky"><div class="sidebar-links"><div class="site-info"><div class="site-name">', "</div>", '</div><a class="links"', '><span class="link-name">', '</span></a></div><div class="sidebar-content"><div class="avatar"><img', "></div>", '<div class="statistics"><a class="tag-count-item"', '><div class="number">', '</div><div class="label">', "</div></a></div></div></div></div>"];
var HomeSidebar = (props) => {
  const t2 = () => useTranslations(props.ctx.lang);
  const sidebar = () => props.cfg.story?.home_sidebar;
  const enabled = () => props.cfg.features?.home_sidebar !== false && sidebar()?.enable !== false;
  const avatar = () => props.cfg.site.profile || "/assets/images/avatar-0.jpg";
  return createComponent(Show, {
    get when() {
      return enabled();
    },
    get children() {
      return ssr(_tmpl$47, escape(props.cfg.site.name), escape(createComponent(Show, {
        get when() {
          return !!sidebar()?.announcement;
        },
        get children() {
          return ssr(_tmpl$16, escape(sidebar()?.announcement));
        }
      })), ssrAttribute("href", escape(pageUrl(props.ctx.request_id, "/archives/index.html"), true), false), escape(t2().nav.archives), ssrAttribute("src", escape(assetUrl(props.ctx.request_id, avatar()), true), false) + ssrAttribute("alt", escape(props.cfg.site.author, true) ?? escape(props.cfg.site.name, true), false), escape(createComponent(Show, {
        get when() {
          return !!props.cfg.site.author;
        },
        get children() {
          return ssr(_tmpl$37, escape(props.cfg.site.author), escape(createComponent(Show, {
            get when() {
              return !!props.cfg.site.description;
            },
            get children() {
              return ssr(_tmpl$29, escape(props.cfg.site.description));
            }
          })));
        }
      })), ssrAttribute("href", escape(pageUrl(props.ctx.request_id, "/archives/index.html"), true), false), escape(props.postCount) ?? 0, escape(t2().home.postsCount));
    }
  });
};

// src/pages/home.tsx
var _tmpl$17 = ['<main class="', '" id="main-content" data-layout="home"', ">", '<div class="main-content-container"><div class="main-content-header">', '</div><div class="main-content-body">', '<div class="main-content"><div class="home-content-container"><ul class="home-article-list">', "</ul>", "</div></div>", "</div>", "</div></main>"];
var HomePage = (p3) => {
  const ctx = () => p3.props;
  const cfg = () => getStoryConfig(ctx());
  const allPosts = () => queryPublicPosts(ctx().request_id);
  const pagination = () => readPagination(ctx().qs ?? {}, ctx().config ?? {}, allPosts().total);
  const items = () => queryPublicPosts(ctx().request_id, {
    offset: pagination().offset,
    limit: pagination().pageSize
  }).items;
  const sidebarPosition = () => cfg().story?.home_sidebar?.position ?? "left";
  const bannerFixed = () => cfg().features?.home_banner !== false && cfg().story?.home_banner?.enable !== false && cfg().story?.home_banner?.style === "fixed";
  return ssr(_tmpl$17, `page-container story-page-home ${bannerFixed() ? "story-page-home--fixed-banner" : ""}`, ssrAttribute("data-home-path", escape(pageUrl(ctx().request_id, "/index.html"), true), false), escape(createComponent(HomeBanner, {
    get ctx() {
      return ctx();
    },
    get cfg() {
      return cfg();
    }
  })), escape(createComponent(Header, {
    get ctx() {
      return ctx();
    },
    mode: "home"
  })), escape(createComponent(Show, {
    get when() {
      return sidebarPosition() === "left";
    },
    get children() {
      return createComponent(HomeSidebar, {
        get ctx() {
          return ctx();
        },
        get cfg() {
          return cfg();
        },
        get postCount() {
          return allPosts().total;
        }
      });
    }
  })), escape(createComponent(For, {
    get each() {
      return items();
    },
    children: (post) => createComponent(HomeArticleCard, {
      get ctx() {
        return ctx();
      },
      post
    })
  })), escape(createComponent(Pagination, {
    get ctx() {
      return ctx();
    },
    get pageNo() {
      return pagination().pageNo;
    },
    get pageCount() {
      return pagination().pageCount;
    },
    basePath: HOME_PATH
  })), escape(createComponent(Show, {
    get when() {
      return sidebarPosition() === "right";
    },
    get children() {
      return createComponent(HomeSidebar, {
        get ctx() {
          return ctx();
        },
        get cfg() {
          return cfg();
        },
        get postCount() {
          return allPosts().total;
        }
      });
    }
  })), escape(createComponent(Footer, {
    get ctx() {
      return ctx();
    },
    get config() {
      return cfg();
    },
    get noMarginTop() {
      return pagination().pageCount > 1;
    }
  })));
};

// src/lib/breadcrumb.ts
function decodeSegment(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
function pageNoFromCtx(ctx) {
  const fromTpl = (ctx.tpl_path ?? "").match(/\.p(\d+)\.html$/i);
  if (fromTpl) return parseInt(fromTpl[1], 10) || 1;
  const fromQs = parseInt(String(ctx.qs?.page ?? "1"), 10);
  return Number.isFinite(fromQs) && fromQs > 0 ? fromQs : 1;
}
function pageKeySegment(pageKey) {
  const map = {
    "posts-list": "posts",
    "tags-index": "tags",
    archives: "archives",
    about: "about"
  };
  return pageKey ? map[pageKey] ?? "" : "";
}
function logicalPathKey(ctx, pageKey) {
  const base = ctx.page_path_base || "";
  let raw = ctx.tpl_path ?? ctx.page_path ?? "";
  if (base && raw.startsWith(base)) {
    raw = raw.slice(base.length) || "/";
  }
  if (raw && !raw.startsWith("/")) raw = `/${raw}`;
  const normalized = normalizeNavPath(raw || "/", ctx.lang);
  if (normalized === "/" || normalized === "") {
    return pageKeySegment(pageKey);
  }
  return normalized.replace(/^\/+/, "");
}
function logicalSegments(ctx, pageKey) {
  const key = logicalPathKey(ctx, pageKey);
  if (!key || key === "home") return [];
  const parts = key.split("/").filter(Boolean);
  const pageNo = pageNoFromCtx(ctx);
  if (parts[0] === "posts") {
    return ["posts", String(pageNo)];
  }
  if (parts[0] === "tags" && parts.length >= 2) {
    if (pageNo > 1) return ["tags", parts[1], String(pageNo)];
    return ["tags", parts[1]];
  }
  return parts;
}
function shouldShowBreadcrumb(_ctx, _pageKey) {
  return false;
}
function buildBreadcrumbSegments(ctx, t2, pageKey) {
  const raw = [...logicalSegments(ctx, pageKey)];
  if (raw.length === 0) return [];
  const navLabels = {
    posts: t2.nav.posts,
    tags: t2.nav.tags,
    about: t2.nav.about,
    archives: t2.nav.archives
  };
  const labels = [];
  if (raw[0] === "posts") {
    const page = raw[1] || "1";
    labels.push(
      `${t2.nav.posts} (${t2.pagination.page.toLowerCase()} ${page})`
    );
  } else if (raw[0] === "tags" && raw.length >= 2 && !Number.isNaN(Number(raw[2]))) {
    const tag = decodeSegment(raw[1]);
    const page = Number(raw[2]);
    labels.push(
      t2.nav.tags,
      `${tag}${page === 1 ? "" : ` (${t2.pagination.page.toLowerCase()} ${page})`}`
    );
  } else if (raw[0] === "tags" && raw.length >= 2) {
    labels.push(t2.nav.tags, decodeSegment(raw[1]));
  } else {
    for (const segment of raw) {
      labels.push(navLabels[segment] ?? decodeSegment(segment));
    }
  }
  const hrefs = labels.map((_3, index) => {
    if (index === labels.length - 1) return void 0;
    if (raw[0] === "posts") {
      return pageUrl(ctx.request_id, POSTS_INDEX_URL);
    }
    if (raw[0] === "tags") {
      if (index === 0) return pageUrl(ctx.request_id, "/tags/index.html");
      if (raw.length >= 2) {
        const tag = encodeURIComponent(decodeSegment(raw[1]));
        return pageUrl(ctx.request_id, `/tags/${tag}/index.html`);
      }
    }
    if (raw[0] === "about") {
      return pageUrl(ctx.request_id, "/about/");
    }
    const pathSegments = raw.slice(0, index + 1);
    const last = pathSegments[pathSegments.length - 1];
    if (/^\d+$/.test(last)) {
      const page = parseInt(last, 10);
      const base = "/" + pathSegments.slice(0, -1).join("/");
      if (page <= 1) return pageUrl(ctx.request_id, `${base}/index.html`);
      return pageUrl(
        ctx.request_id,
        `${base}/index.p${page}.html`
      );
    }
    if (pathSegments.length === 1 && pathSegments[0] === "about") {
      return pageUrl(ctx.request_id, "/about/");
    }
    return pageUrl(ctx.request_id, `/${pathSegments.join("/")}/index.html`);
  });
  return labels.map((label, index) => ({
    label,
    href: hrefs[index],
    lowercase: raw[0] === "tags" && index > 0
  }));
}

// src/assets/icons/IconChevronLeft.svg
var IconChevronLeft_default = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>\n';

// src/components/BackButton.tsx
var _tmpl$18 = ['<span aria-hidden="true">', "</span>"];
var _tmpl$210 = ["<span>", "</span>"];
var _tmpl$38 = ['<div class="app-layout flex items-center justify-start">', "</div>"];
function chevronMarkup() {
  if (IconChevronLeft_default.includes('class="')) {
    return IconChevronLeft_default.replace(/class="([^"]*)"/, 'class="$1 inline-block size-6 rtl:rotate-180"');
  }
  return IconChevronLeft_default.replace("<svg", '<svg class="inline-block size-6 rtl:rotate-180"');
}
var BackButton = (props) => {
  const t2 = () => useTranslations(props.ctx.lang);
  const linkClass = () => ["focus-outline hover:text-foreground/75 -ms-2 mb-2", props.omitTopMargin ? "" : "mt-8"].filter(Boolean).join(" ");
  return ssr(_tmpl$38, escape(createComponent(LinkButton, {
    id: "back-button",
    accentHover: false,
    get href() {
      return pageUrl(props.ctx.request_id, "/index.html");
    },
    get ["class"]() {
      return linkClass();
    },
    get children() {
      return [ssr(_tmpl$18, chevronMarkup()), ssr(_tmpl$210, escape(t2().post.goBack))];
    }
  })));
};

// src/components/Breadcrumb.tsx
var _tmpl$19 = ['<nav class="app-layout mt-8 mb-4" aria-label="breadcrumb"><ul class="font-light flex flex-wrap items-center gap-x-1 [&amp;>li:not(:last-child)>a]:hover:opacity-100"><li class="inline-flex items-center gap-x-1"><a', ' class="opacity-80">', '</a><span aria-hidden="true" class="opacity-80">&raquo;</span></li>', "</ul></nav>"];
var _tmpl$211 = ["<a", ' class="capitalize opacity-70">', "</a>"];
var _tmpl$39 = '<span aria-hidden="true" class="opacity-70">&raquo;</span>';
var _tmpl$48 = ['<li class="inline-flex items-center gap-x-1">', "</li>"];
var _tmpl$57 = ['<span class="', '" aria-current="page">', "</span>"];
var Breadcrumb = (props) => {
  const t2 = () => useTranslations(props.ctx.lang);
  const pageKey = () => props.pageKey ?? "";
  const show = () => shouldShowBreadcrumb(props.ctx, pageKey());
  const segments = () => buildBreadcrumbSegments(props.ctx, t2(), pageKey());
  return createComponent(Show, {
    get when() {
      return show();
    },
    get children() {
      return ssr(_tmpl$19, ssrAttribute("href", escape(pageUrl(props.ctx.request_id, "/index.html"), true), false), escape(t2().nav.home), escape(createComponent(For, {
        get each() {
          return segments();
        },
        children: (item) => ssr(_tmpl$48, escape(createComponent(Show, {
          get when() {
            return item.href;
          },
          get fallback() {
            return ssr(_tmpl$57, `capitalize opacity-75 ${item.lowercase ? "lowercase" : ""}`, escape(item.label));
          },
          get children() {
            return [ssr(_tmpl$211, ssrAttribute("href", escape(item.href, true), false), escape(item.label)), ssr(_tmpl$39)];
          }
        })))
      })));
    }
  });
};

// src/components/PageChrome.tsx
var _tmpl$20 = ['<div data-vt-swap="page-chrome">', "", "</div>"];
var PageChrome = (props) => {
  const hasBreadcrumb = () => shouldShowBreadcrumb(props.ctx, props.pageKey);
  const hasBack = () => !!props.showBack;
  return ssr(_tmpl$20, escape(createComponent(Show, {
    get when() {
      return hasBreadcrumb();
    },
    get children() {
      return createComponent(Breadcrumb, {
        get ctx() {
          return props.ctx;
        },
        get pageKey() {
          return props.pageKey;
        }
      });
    }
  })), escape(createComponent(Show, {
    get when() {
      return hasBack();
    },
    get children() {
      return createComponent(BackButton, {
        get ctx() {
          return props.ctx;
        },
        get omitTopMargin() {
          return hasBreadcrumb();
        }
      });
    }
  })));
};

// src/components/Main.tsx
var _tmpl$21 = ['<h1 class="text-2xl font-semibold sm:text-3xl">', "</h1>"];
var _tmpl$212 = ['<p class="text-muted-foreground mt-2 mb-6 italic">', "</p>"];
var _tmpl$310 = ['<main id="main-content"', ">", "", "</main>"];
var Main = (props) => {
  const [local] = splitProps(props, ["pageTitle", "pageDesc", "layout", "ctx", "pageKey", "hidePageHeader", "class", "children"]);
  const hasBreadcrumb = () => local.ctx && local.pageKey ? shouldShowBreadcrumb(local.ctx, local.pageKey) : false;
  const backUrl = () => {
    if (!local.ctx) return void 0;
    const cfg = getStoryConfig(local.ctx);
    if (cfg.features?.show_back_button === false) return void 0;
    return pageUrl(local.ctx.request_id, local.ctx.page_path);
  };
  const mainClass = () => ["app-layout pb-4", hasBreadcrumb() ? "" : "mt-8", local.class ?? ""].filter(Boolean).join(" ");
  return ssr(_tmpl$310, ssrAttribute("data-layout", escape(local.layout, true) ?? "page", false) + ssrAttribute("data-backurl", escape(backUrl(), true), false) + ssrAttribute("class", escape(mainClass(), true), false), escape(createComponent(Show, {
    get when() {
      return !local.hidePageHeader;
    },
    get children() {
      return [ssr(_tmpl$21, escape(local.pageTitle)), createComponent(Show, {
        get when() {
          return local.pageDesc;
        },
        get children() {
          return ssr(_tmpl$212, escape(local.pageDesc));
        }
      })];
    }
  })), escape(local.children));
};

// src/lib/proseClasses.ts
var APP_PROSE = "app-prose max-w-app w-full prose-pre:bg-(--shiki-light-bg) dark:prose-pre:bg-(--shiki-dark-bg)";
var APP_PROSE_POST = `${APP_PROSE} mt-8`;

// src/pages/about.tsx
var _tmpl$30 = ["<div>", "</div>"];
var _tmpl$213 = ['<div class="page-template-container"><h1 class="page-title-header">', '</h1><div class="', '">', "</div></div>"];
var _tmpl$311 = ['<p class="text-muted-foreground italic">', "</p>"];
var AboutPage = (p3) => {
  const ctx = () => p3.props;
  const cfg = () => getStoryConfig(ctx());
  const t2 = () => useTranslations(ctx().lang);
  const aboutPath = () => resolveInnerLinkPath(cfg().about) || "/_about.md";
  const aboutDoc = () => everkm.post_detail(p3.props.request_id, {
    path: aboutPath(),
    allow_missing: true
  });
  const pageTitle = () => aboutDoc()?.title ?? t2().nav.about;
  return [createComponent(Header, {
    get ctx() {
      return ctx();
    }
  }), createComponent(PageChrome, {
    get ctx() {
      return ctx();
    },
    pageKey: "about"
  }), createComponent(Main, {
    get ctx() {
      return ctx();
    },
    pageKey: "about",
    get pageTitle() {
      return pageTitle();
    },
    layout: "about",
    hidePageHeader: true,
    get children() {
      return ssr(_tmpl$213, escape(pageTitle()), `page-template-content ${escape(APP_PROSE, true)}`, escape(createComponent(Show, {
        get when() {
          return aboutDoc()?.content_html;
        },
        get fallback() {
          return ssr(_tmpl$311, escape(t2().pages.aboutEmpty));
        },
        get children() {
          return ssr(_tmpl$30, aboutDoc().content_html);
        }
      })));
    }
  }), createComponent(Footer, {
    get ctx() {
      return ctx();
    },
    get config() {
      return cfg();
    }
  })];
};

// src/pages/post.tsx
var import_dayjs3 = __toESM(require_dayjs_min(), 1);
var import_utc3 = __toESM(require_utc(), 1);
var import_timezone3 = __toESM(require_timezone(), 1);

// src/lib/dataSource.ts
function loadDataSourceDoc(ctx, innerLink, fallbackPath) {
  const path = resolveInnerLinkPath(innerLink) || fallbackPath;
  return everkm.post_detail(ctx.request_id, {
    path,
    allow_missing: true
  }) ?? null;
}
function parseFriendLinkCategories(meta) {
  const raw = meta?.links;
  if (!Array.isArray(raw)) return [];
  return raw;
}
function parseMasonryItems(meta) {
  const raw = meta?.items;
  if (!Array.isArray(raw)) return [];
  return raw;
}
function categoryLabel(category) {
  return category.category ?? category.links_category ?? "";
}
function resolveStoryMediaUrl(ctx, path, originPath) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/assets/")) return assetUrl(ctx.request_id, path);
  if (path.startsWith("/")) {
    try {
      const resolved = everkm.media(ctx.request_id, {
        file: path,
        __origin_path: originPath
      });
      if (typeof resolved === "string" && resolved.length > 0) {
        return resolved;
      }
    } catch {
    }
  }
  return assetUrl(ctx.request_id, path);
}
function dataSourceTitle(ctx, innerLink, fallbackPath, fallbackTitle) {
  const doc = loadDataSourceDoc(ctx, innerLink, fallbackPath);
  return doc?.title ?? fallbackTitle;
}

// src/components/Tag.tsx
var _tmpl$31 = ["<li><a", ' class="text-accent decoration-dashed underline-offset-4 hover:underline">#', "", "</a></li>"];
var _tmpl$214 = ['<sup class="text-muted-foreground ms-1 text-xs">', "</sup>"];
var Tag = (props) => {
  const slug = () => encodeURIComponent(props.tag);
  const href = () => pageUrl(props.ctx.request_id, `/tags/${slug()}/index.html`);
  return ssr(_tmpl$31, ssrAttribute("href", escape(href(), true), false), escape(props.tag), props.count != null && ssr(_tmpl$214, escape(props.count)));
};

// src/components/PostCopyright.tsx
var import_dayjs2 = __toESM(require_dayjs_min(), 1);
var import_utc2 = __toESM(require_utc(), 1);
var import_timezone2 = __toESM(require_timezone(), 1);

// src/lib/copyright.ts
var LICENSES = {
  cc_by_nc_sa: {
    label: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0"
  },
  cc_by: {
    label: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0"
  },
  cc_by_nc: {
    label: "CC BY-NC 4.0",
    url: "https://creativecommons.org/licenses/by-nc/4.0"
  },
  cc_by_nd: {
    label: "CC BY-ND 4.0",
    url: "https://creativecommons.org/licenses/by-nd/4.0"
  },
  cc_by_sa: {
    label: "CC BY-SA 4.0",
    url: "https://creativecommons.org/licenses/by-sa/4.0"
  },
  cc0: {
    label: "CC0 1.0",
    url: "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  all_rights_reserved: {
    label: "All Rights Reserved"
  }
};
function resolveCopyrightLicense(raw) {
  if (!raw) return null;
  const key = raw;
  return LICENSES[key] ?? null;
}

// src/components/PostCopyright.tsx
var _tmpl$40 = ["<li><strong>", ":</strong> ", "</li>"];
var _tmpl$215 = ['<div class="post-copyright"><div class="article-copyright-info-container"><ul><li><strong>', ":</strong> ", "</li>", "", "", "<li><strong>", ":</strong> ", "</li><li><strong>", ":</strong> ", "</li></ul></div></div>"];
var _tmpl$312 = ["<span>", "</span>"];
var _tmpl$49 = ["<a", ' target="_blank" rel="noopener noreferrer">', "</a>"];
import_dayjs2.default.extend(import_utc2.default);
import_dayjs2.default.extend(import_timezone2.default);
function formatTs(ts, timezoneName) {
  if (!ts) return null;
  return import_dayjs2.default.unix(ts).tz(timezoneName).format("YYYY-MM-DD HH:mm:ss");
}
function publishedTs(post) {
  return post.date || post.updated_at || null;
}
function updatedTs(post) {
  const published = publishedTs(post);
  if (!post.updated_at || post.updated_at === published) return null;
  return post.updated_at;
}
var PostCopyright = (props) => {
  const cfg = () => getStoryConfig(props.ctx);
  const t2 = () => useTranslations(props.ctx.lang);
  const copyrightCfg = () => cfg().story?.articles?.copyright;
  const enabled = () => copyrightCfg()?.enable !== false;
  const licenseKey = () => {
    const fromMeta = props.post.meta?.copyright;
    if (typeof fromMeta === "string" && fromMeta.trim()) {
      return fromMeta.trim();
    }
    return copyrightCfg()?.default ?? "cc_by_nc_sa";
  };
  const license = () => resolveCopyrightLicense(licenseKey());
  const tz = () => cfg().site.timezone ?? "UTC";
  const canonical = () => resolvePostCanonicalUrl(props.ctx, props.post);
  return createComponent(Show, {
    get when() {
      return enabled() && license();
    },
    get children() {
      return ssr(_tmpl$215, escape(t2().post.copyrightTitle), escape(props.post.title) || escape(props.post.slug), escape(createComponent(Show, {
        get when() {
          return !!cfg().site.author;
        },
        get children() {
          return ssr(_tmpl$40, escape(t2().post.copyrightAuthor), escape(cfg().site.author));
        }
      })), escape(createComponent(Show, {
        get when() {
          return formatTs(publishedTs(props.post) ?? void 0, tz());
        },
        children: (created) => ssr(_tmpl$40, escape(t2().post.copyrightCreated), escape(created()))
      })), escape(createComponent(Show, {
        get when() {
          return formatTs(updatedTs(props.post) ?? void 0, tz());
        },
        children: (updated) => ssr(_tmpl$40, escape(t2().post.copyrightUpdated), escape(updated()))
      })), escape(t2().post.copyrightLink), escape(canonical()), escape(t2().post.copyrightLicense), escape(createComponent(Show, {
        get when() {
          return license()?.url;
        },
        get fallback() {
          return ssr(_tmpl$312, escape(license()?.label));
        },
        children: (url) => ssr(_tmpl$49, ssrAttribute("href", escape(url(), true), false), escape(license()?.label))
      })));
    }
  });
};

// src/components/PostNeighbors.tsx
var _tmpl$41 = ['<nav class="article-nav"', ">", "", "</nav>"];
var _tmpl$216 = ['<div class="article-nav__item"><a class="article-nav__link"', '><span class="article-nav__arrow" aria-hidden="true">\u2190</span><span class="min-w-0"><span class="article-nav__title">', '</span><span class="article-nav__label">', "</span></span></a></div>"];
var _tmpl$313 = ['<div class="article-nav__item article-nav__item--next"><a class="article-nav__link article-nav__link--next"', '><span class="article-nav__arrow" aria-hidden="true">\u2192</span><span class="min-w-0"><span class="article-nav__title">', '</span><span class="article-nav__label">', "</span></span></a></div>"];
var PostNeighbors = (props) => {
  const t2 = () => useTranslations(props.ctx.lang);
  return createComponent(Show, {
    get when() {
      return props.prevPost || props.nextPost;
    },
    get children() {
      return ssr(_tmpl$41, ssrAttribute("aria-label", escape(t2().post.neighborNav, true), false), escape(createComponent(Show, {
        get when() {
          return props.prevPost;
        },
        children: (prev) => ssr(_tmpl$216, ssrAttribute("href", escape(pageUrl(props.ctx.request_id, prev().url_path), true), false), escape(prev().title), escape(t2().post.previousPost))
      })), escape(createComponent(Show, {
        get when() {
          return props.nextPost;
        },
        children: (next) => ssr(_tmpl$313, ssrAttribute("href", escape(pageUrl(props.ctx.request_id, next().url_path), true), false), escape(next().title), escape(t2().post.nextPost))
      })));
    }
  });
};

// src/pages/post.tsx
var _tmpl$50 = ['<main id="main-content" data-layout="post" class="app-layout mt-8">', "", "</main>"];
var _tmpl$217 = ['<div class="article-hero"><img', ' class="article-hero__cover" loading="eager"><div class="article-hero__title-wrap"><h1 class="article-hero__title" style="', '">', "</h1></div></div>"];
var _tmpl$314 = ['<div class="px-4 pt-6 sm:px-6 md:px-8"><h1 class="text-accent text-2xl font-bold sm:text-3xl" style="', '">', "</h1></div>"];
var _tmpl$410 = ['<div class="article-header__name">', "</div>"];
var _tmpl$58 = ['<div class="flex flex-wrap gap-2 px-4 pb-2 sm:px-6 md:px-8"><span class="text-muted-foreground italic">', ':</span><ul class="flex flex-wrap gap-2">', "</ul></div>"];
var _tmpl$65 = ['<div class="post-page-container"><article class="article-content-container" id="article">', "", '<div class="article-header"><div class="article-header__avatar"><img', "></div><div>", '<div class="article-header__meta">', "", "</div></div></div>", '<div class="', '">', "</div>", "", "</article></div>"];
var _tmpl$73 = ['<span class="article-header__meta-item">', ": ", "</span>"];
import_dayjs3.default.extend(import_utc3.default);
import_dayjs3.default.extend(import_timezone3.default);
function formatMetaTime(ts, timezoneName) {
  if (!ts) return "";
  return import_dayjs3.default.unix(ts).tz(timezoneName).format("YYYY-MM-DD HH:mm:ss");
}
function publishedTs2(post) {
  return post.date || post.updated_at || null;
}
function updatedTs2(post) {
  const published = publishedTs2(post);
  if (!post.updated_at || post.updated_at === published) return null;
  return post.updated_at;
}
var PostPage = (p3) => {
  const ctx = () => p3.props;
  const cfg = () => getStoryConfig(ctx());
  const t2 = () => useTranslations(ctx().lang);
  const post = () => resolvePostDetail(p3.props);
  const showBack = () => cfg().features?.show_back_button !== false;
  const cover = () => post() ? resolvePostCover(ctx(), post()) : null;
  const avatar = () => resolveStoryMediaUrl(ctx(), cfg().site.profile || "/assets/images/avatar-0.jpg");
  const neighbors = () => {
    const item = post();
    if (!item?.id) return null;
    return everkm.post_neighbors(ctx().request_id, {
      id: item.id,
      dir: POSTS_CONTENT_DIR,
      recursive: false,
      draft: false,
      order_by: "date",
      order_direction: "desc"
    });
  };
  const prevPost = () => {
    const prevId = neighbors()?.prev_id;
    return prevId ? everkm.post_meta(ctx().request_id, {
      id: prevId
    }) : null;
  };
  const nextPost = () => {
    const nextId = neighbors()?.next_id;
    return nextId ? everkm.post_meta(ctx().request_id, {
      id: nextId
    }) : null;
  };
  return [createComponent(Header, {
    get ctx() {
      return ctx();
    }
  }), ssr(_tmpl$50, escape(createComponent(Show, {
    get when() {
      return showBack();
    },
    get children() {
      return createComponent(BackButton, {
        get ctx() {
          return ctx();
        },
        omitTopMargin: true
      });
    }
  })), escape(createComponent(Show, {
    get when() {
      return post();
    },
    children: (item) => ssr(_tmpl$65, escape(createComponent(Show, {
      get when() {
        return cover();
      },
      get children() {
        return ssr(_tmpl$217, ssrAttribute("src", escape(cover(), true), false) + ssrAttribute("alt", escape(item().title, true) || escape(item().slug, true), false), "view-transition-name:" + escape(toTransitionName(item().title || item().slug), true), escape(item().title) || escape(item().slug));
      }
    })), escape(createComponent(Show, {
      get when() {
        return !cover();
      },
      get children() {
        return ssr(_tmpl$314, "view-transition-name:" + escape(toTransitionName(item().title || item().slug), true), escape(item().title) || escape(item().slug));
      }
    })), ssrAttribute("src", escape(avatar(), true), false) + ssrAttribute("alt", escape(cfg().site.author, true) ?? "", false), escape(createComponent(Show, {
      get when() {
        return !!cfg().site.author;
      },
      get children() {
        return ssr(_tmpl$410, escape(cfg().site.author));
      }
    })), escape(createComponent(Show, {
      get when() {
        return publishedTs2(item());
      },
      children: (published) => ssr(_tmpl$73, escape(t2().post.publishedAt), escape(formatMetaTime(published(), cfg().site.timezone ?? "UTC")))
    })), escape(createComponent(Show, {
      get when() {
        return updatedTs2(item());
      },
      children: (updated) => ssr(_tmpl$73, escape(t2().post.updatedAt), escape(formatMetaTime(updated(), cfg().site.timezone ?? "UTC")))
    })), escape(createComponent(Show, {
      get when() {
        return (item().tags?.length ?? 0) > 0;
      },
      get children() {
        return ssr(_tmpl$58, escape(t2().post.tagLabel), escape(createComponent(For, {
          get each() {
            return item().tags ?? [];
          },
          children: (tag) => createComponent(Tag, {
            get ctx() {
              return ctx();
            },
            tag
          })
        })));
      }
    })), `article-content ${escape(APP_PROSE, true)}`, item().content_html ?? "", escape(createComponent(PostCopyright, {
      get ctx() {
        return ctx();
      },
      get post() {
        return item();
      }
    })), escape(createComponent(PostNeighbors, {
      get ctx() {
        return ctx();
      },
      get prevPost() {
        return prevPost();
      },
      get nextPost() {
        return nextPost();
      }
    })))
  }))), createComponent(Footer, {
    get ctx() {
      return ctx();
    },
    get config() {
      return cfg();
    }
  })];
};
function resolvePostDetail(ctx) {
  const meta = ctx.post;
  if (meta?.path) {
    return everkm.post_detail(ctx.request_id, {
      path: meta.path
    }) ?? meta;
  }
  const pagePath = ctx.page_path;
  if (pagePath?.endsWith(".html")) {
    return everkm.post_detail(ctx.request_id, {
      path: pagePath.replace(/\.html$/, ".md")
    });
  }
  return meta;
}

// src/pages/posts-list.tsx
var _tmpl$51 = ['<ul class="home-article-list">', "</ul>"];
var PostsListPage = (p3) => {
  const ctx = () => p3.props;
  const cfg = () => getStoryConfig(ctx());
  const t2 = () => useTranslations(ctx().lang);
  const all = () => queryPublicPosts(ctx().request_id);
  const pagination = () => readPagination(ctx().qs ?? {}, ctx().config ?? {}, all().total);
  const items = () => queryPublicPosts(ctx().request_id, {
    offset: pagination().offset,
    limit: pagination().pageSize
  }).items;
  return [createComponent(Header, {
    get ctx() {
      return ctx();
    }
  }), createComponent(PageChrome, {
    get ctx() {
      return ctx();
    },
    pageKey: "posts-list"
  }), createComponent(Main, {
    get ctx() {
      return ctx();
    },
    pageKey: "posts-list",
    get pageTitle() {
      return t2().pages.postsTitle;
    },
    get pageDesc() {
      return t2().pages.postsDesc;
    },
    layout: "posts-list",
    get children() {
      return ssr(_tmpl$51, escape(createComponent(For, {
        get each() {
          return items();
        },
        children: (post) => createComponent(HomeArticleCard, {
          get ctx() {
            return ctx();
          },
          post
        })
      })));
    }
  }), createComponent(Pagination, {
    get ctx() {
      return ctx();
    },
    get pageNo() {
      return pagination().pageNo;
    },
    get pageCount() {
      return pagination().pageCount;
    },
    basePath: POSTS_PATH
  }), createComponent(Footer, {
    get ctx() {
      return ctx();
    },
    get config() {
      return cfg();
    },
    get noMarginTop() {
      return pagination().pageCount > 1;
    }
  })];
};

// src/components/TagCloudItem.tsx
var _tmpl$59 = ["<li><a", '><span class="tag-cloud-item__hash" aria-hidden="true">#</span>', "</a></li>"];
var TagCloudItem = (props) => {
  const href = () => pageUrl(props.ctx.request_id, `/tags/${encodeURIComponent(props.tag)}/index.html`);
  return ssr(_tmpl$59, ssrAttribute("href", escape(href(), true), false) + ssrAttribute("data-weight", escape(String(props.count), true), false), escape(props.tag));
};

// src/pages/tags-index.tsx
var _tmpl$60 = ['<div class="tagcloud-content"><ul class="tag-list" data-show-value="true">', "</ul></div>"];
var TagsIndexPage = (p3) => {
  const ctx = () => p3.props;
  const cfg = () => getStoryConfig(ctx());
  const t2 = () => useTranslations(ctx().lang);
  const tags = () => everkm.posts_tag_list(ctx().request_id, {
    dir: POSTS_CONTENT_DIR,
    recursive: true,
    draft: false
  });
  const tagEntries = () => Object.entries(tags()).sort(([, aCount], [, bCount]) => bCount - aCount);
  return [createComponent(Header, {
    get ctx() {
      return ctx();
    }
  }), createComponent(PageChrome, {
    get ctx() {
      return ctx();
    },
    pageKey: "tags-index"
  }), createComponent(Main, {
    get ctx() {
      return ctx();
    },
    pageKey: "tags-index",
    get pageTitle() {
      return t2().pages.tagsTitle;
    },
    get pageDesc() {
      return t2().pages.tagsDesc;
    },
    layout: "tags-index",
    get children() {
      return ssr(_tmpl$60, escape(createComponent(For, {
        get each() {
          return tagEntries();
        },
        children: ([tag, count]) => createComponent(TagCloudItem, {
          get ctx() {
            return ctx();
          },
          tag,
          count
        })
      })));
    }
  }), createComponent(Footer, {
    get ctx() {
      return ctx();
    },
    get config() {
      return cfg();
    }
  })];
};

// src/pages/tag-posts.tsx
var _tmpl$61 = ['<ul class="home-article-list">', "</ul>"];
var TagPostsPage = (p3) => {
  const ctx = () => p3.props;
  const cfg = () => getStoryConfig(ctx());
  const t2 = () => useTranslations(ctx().lang);
  const tagSlug = () => {
    const key = normalizeTplPath(ctx().tpl_path ?? "");
    return extractTagSlug(key) ?? "";
  };
  const tagName = () => decodeURIComponent(tagSlug());
  const all = () => queryPublicPosts(ctx().request_id, {
    tags: [tagName()]
  });
  const pagination = () => readPagination(ctx().qs ?? {}, ctx().config ?? {}, all().total);
  const items = () => queryPublicPosts(ctx().request_id, {
    tags: [tagName()],
    offset: pagination().offset,
    limit: pagination().pageSize
  }).items;
  const basePath = () => `/tags/${encodeURIComponent(tagName())}`;
  return [createComponent(Header, {
    get ctx() {
      return ctx();
    }
  }), createComponent(PageChrome, {
    get ctx() {
      return ctx();
    },
    pageKey: "tag-posts"
  }), createComponent(Main, {
    get ctx() {
      return ctx();
    },
    pageKey: "tag-posts",
    get pageTitle() {
      return `${t2().pages.tagTitle}: ${tagName()}`;
    },
    get pageDesc() {
      return t2().pages.tagDesc;
    },
    layout: "tag-posts",
    get children() {
      return ssr(_tmpl$61, escape(createComponent(For, {
        get each() {
          return items();
        },
        children: (post) => createComponent(HomeArticleCard, {
          get ctx() {
            return ctx();
          },
          post
        })
      })));
    }
  }), createComponent(Pagination, {
    get ctx() {
      return ctx();
    },
    get pageNo() {
      return pagination().pageNo;
    },
    get pageCount() {
      return pagination().pageCount;
    },
    get basePath() {
      return basePath();
    }
  }), createComponent(Footer, {
    get ctx() {
      return ctx();
    },
    get config() {
      return cfg();
    },
    get noMarginTop() {
      return pagination().pageCount > 1;
    }
  })];
};

// src/lib/postDate.ts
var import_dayjs4 = __toESM(require_dayjs_min(), 1);
function postTimestampSeconds(post) {
  const raw = post.date || post.updated_at;
  if (!raw) return 0;
  return raw > 1e12 ? Math.floor(raw / 1e3) : raw;
}
function postDate(post) {
  return import_dayjs4.default.unix(postTimestampSeconds(post));
}

// src/lib/archives.ts
function groupArchiveByYear(posts) {
  const byYear = /* @__PURE__ */ new Map();
  for (const post of posts) {
    if (!postTimestampSeconds(post)) continue;
    const year = postDate(post).format("YYYY");
    const bucket = byYear.get(year);
    if (bucket) bucket.push(post);
    else byYear.set(year, [post]);
  }
  return [...byYear.entries()].sort(([a], [b2]) => Number(b2) - Number(a)).map(([year, yearPosts]) => ({
    year,
    posts: [...yearPosts].sort(
      (a, b2) => postTimestampSeconds(b2) - postTimestampSeconds(a)
    )
  }));
}
function groupArchiveByDateLabel(posts) {
  const groups = [];
  let current = null;
  for (const post of posts) {
    const dateLabel = postDate(post).format("MM-DD");
    if (!current || current.dateLabel !== dateLabel) {
      current = { dateLabel, posts: [post] };
      groups.push(current);
    } else {
      current.posts.push(post);
    }
  }
  return groups;
}

// src/pages/archives.tsx
var _tmpl$66 = ['<div class="archive-container"><div class="archive-list-container">', "</div></div>"];
var _tmpl$218 = ['<section class="archive-item"><div class="archive-item__header"><span class="archive-year">', '</span><span class="archive-year-post-count">', '</span></div><ul class="archive-article-list">', "</ul></section>"];
var _tmpl$315 = ['<li class="archive-article-item"', ">", "</li>"];
var _tmpl$411 = ['<a class="archive-article-link"', '><span class="archive-article-title">', "</span></a>"];
var ArchivesPage = (p3) => {
  const ctx = () => p3.props;
  const cfg = () => getStoryConfig(ctx());
  const t2 = () => useTranslations(ctx().lang);
  const years = () => groupArchiveByYear(queryPublicPosts(ctx().request_id).items);
  return [createComponent(Header, {
    get ctx() {
      return ctx();
    }
  }), createComponent(PageChrome, {
    get ctx() {
      return ctx();
    },
    pageKey: "archives"
  }), createComponent(Main, {
    get ctx() {
      return ctx();
    },
    pageKey: "archives",
    get pageTitle() {
      return t2().pages.archivesTitle;
    },
    get pageDesc() {
      return t2().pages.archivesDesc;
    },
    layout: "archives",
    hidePageHeader: true,
    get children() {
      return ssr(_tmpl$66, escape(createComponent(For, {
        get each() {
          return years();
        },
        children: (yearGroup) => ssr(_tmpl$218, escape(yearGroup.year), escape(yearGroup.posts.length), escape(createComponent(For, {
          get each() {
            return groupArchiveByDateLabel(yearGroup.posts);
          },
          children: (dateGroup) => ssr(_tmpl$315, ssrAttribute("data-date-label", escape(dateGroup.dateLabel, true), false), escape(createComponent(For, {
            get each() {
              return dateGroup.posts;
            },
            children: (post) => ssr(_tmpl$411, ssrAttribute("href", escape(pageUrl(ctx().request_id, post.url_path), true), false), escape(post.title) || escape(post.slug))
          })))
        })))
      })));
    }
  }), createComponent(Footer, {
    get ctx() {
      return ctx();
    },
    get config() {
      return cfg();
    }
  })];
};

// src/pages/links.tsx
var _tmpl$67 = ['<div class="app-prose mt-8">', "</div>"];
var _tmpl$219 = ['<div class="page-template-container"><h1 class="page-title-header">', '</h1><div class="friends-link-container">', "", "</div></div>"];
var _tmpl$316 = ['<p class="text-muted-foreground italic">', "</p>"];
var _tmpl$412 = ['<h2 class="friends-link-category__title">', "</h2>"];
var _tmpl$510 = ["<section>", '<ul class="', '">', "</ul></section>"];
var _tmpl$68 = ['<div class="friends-link-card__thumbnail"><img', ' alt loading="lazy"></div>'];
var _tmpl$74 = ['<div class="friends-link-avatar"><img', ' alt loading="lazy"></div>'];
var _tmpl$82 = ['<div class="friends-link-desc">', "</div>"];
var _tmpl$92 = ['<div class="friends-link-card">', '<div class="friends-link-card__body">', '<div class="friends-link-meta"><div class="friends-link-name">', "</div>", "</div></div></div>"];
var _tmpl$102 = ['<li class="friends-link-item"><a', ' target="_blank" rel="noopener noreferrer">', "</a></li>"];
var _tmpl$112 = ['<div class="friends-link-row">', '<div class="friends-link-meta"><div class="friends-link-name">', "</div>", "</div></div>"];
var LinksPage = (p3) => {
  const ctx = () => p3.props;
  const cfg = () => getStoryConfig(ctx());
  const t2 = () => useTranslations(ctx().lang);
  const doc = () => loadDataSourceDoc(ctx(), cfg().links, "/_links.md");
  const categories = () => parseFriendLinkCategories(doc()?.meta);
  const originPath = () => doc()?.path ?? "/_links.md";
  return [createComponent(Header, {
    get ctx() {
      return ctx();
    }
  }), createComponent(PageChrome, {
    get ctx() {
      return ctx();
    },
    pageKey: "links"
  }), createComponent(Main, {
    get ctx() {
      return ctx();
    },
    pageKey: "links",
    get pageTitle() {
      return doc()?.title ?? t2().pages.linksTitle;
    },
    layout: "links",
    hidePageHeader: true,
    get children() {
      return ssr(_tmpl$219, escape(doc()?.title) ?? escape(t2().pages.linksTitle), escape(createComponent(Show, {
        get when() {
          return categories().length > 0;
        },
        get fallback() {
          return ssr(_tmpl$316, escape(t2().pages.linksEmpty));
        },
        get children() {
          return createComponent(For, {
            get each() {
              return categories();
            },
            children: (category) => ssr(_tmpl$510, escape(createComponent(Show, {
              get when() {
                return !!categoryLabel(category);
              },
              get children() {
                return ssr(_tmpl$412, escape(categoryLabel(category)));
              }
            })), `friends-link-grid ${category.has_thumbnail ? "friends-link-grid--cards" : ""} ${!category.has_thumbnail ? "friends-link-grid--list" : ""}`, escape(createComponent(For, {
              get each() {
                return category.list ?? [];
              },
              children: (item) => ssr(_tmpl$102, ssrAttribute("href", escape(item.link, true), false), escape(createComponent(Show, {
                get when() {
                  return category.has_thumbnail;
                },
                get fallback() {
                  return ssr(_tmpl$112, escape(createComponent(Show, {
                    get when() {
                      return !!item.avatar;
                    },
                    get children() {
                      return ssr(_tmpl$74, ssrAttribute("src", escape(resolveStoryMediaUrl(ctx(), item.avatar, originPath()), true), false));
                    }
                  })), escape(item.name), escape(createComponent(Show, {
                    get when() {
                      return !!item.description;
                    },
                    get children() {
                      return ssr(_tmpl$82, escape(item.description));
                    }
                  })));
                },
                get children() {
                  return ssr(_tmpl$92, escape(createComponent(Show, {
                    get when() {
                      return !!item.thumbnail;
                    },
                    get children() {
                      return ssr(_tmpl$68, ssrAttribute("src", escape(resolveStoryMediaUrl(ctx(), item.thumbnail, originPath()), true), false));
                    }
                  })), escape(createComponent(Show, {
                    get when() {
                      return !!item.avatar;
                    },
                    get children() {
                      return ssr(_tmpl$74, ssrAttribute("src", escape(resolveStoryMediaUrl(ctx(), item.avatar, originPath()), true), false));
                    }
                  })), escape(item.name), escape(createComponent(Show, {
                    get when() {
                      return !!item.description;
                    },
                    get children() {
                      return ssr(_tmpl$82, escape(item.description));
                    }
                  })));
                }
              })))
            })))
          });
        }
      })), escape(createComponent(Show, {
        get when() {
          return !!doc()?.content_html;
        },
        get children() {
          return ssr(_tmpl$67, doc().content_html);
        }
      })));
    }
  }), createComponent(Footer, {
    get ctx() {
      return ctx();
    },
    get config() {
      return cfg();
    }
  })];
};

// src/pages/masonry.tsx
var _tmpl$69 = '<div class="loading-placeholder"><div class="flex-grid generic-card"><div class="card loading"></div><div class="card loading"></div><div class="card loading"></div></div></div>';
var _tmpl$220 = ['<div id="masonry-container"', ">", "</div>"];
var _tmpl$317 = ['<div class="page-template-content app-prose mt-8">', "</div>"];
var _tmpl$413 = ['<div class="page-template-container"><h1 class="page-title-header">', "</h1>", "", "</div>"];
var _tmpl$511 = ['<p class="text-muted-foreground italic">', "</p>"];
var _tmpl$610 = ['<div class="image-title">', "</div>"];
var _tmpl$75 = ['<div class="image-description">', "</div>"];
var _tmpl$83 = ["<strong>", "</strong>"];
var _tmpl$93 = ['<span class="hidden-caption-content">', "", "</span>"];
var _tmpl$103 = ['<div class="masonry-item"><a class="story-album-link"', '><div class="image-container"><img', ">", "", "", "</div></a></div>"];
var MasonryPage = (p3) => {
  const ctx = () => p3.props;
  const cfg = () => getStoryConfig(ctx());
  const t2 = () => useTranslations(ctx().lang);
  const doc = () => loadDataSourceDoc(ctx(), cfg().masonry, "/_masonry.md");
  const items = () => parseMasonryItems(doc()?.meta);
  const originPath = () => doc()?.path ?? "/_masonry.md";
  const pageTitle = () => doc()?.title ?? t2().pages.masonryTitle;
  return [createComponent(Header, {
    get ctx() {
      return ctx();
    }
  }), createComponent(PageChrome, {
    get ctx() {
      return ctx();
    },
    pageKey: "album"
  }), createComponent(Main, {
    get ctx() {
      return ctx();
    },
    pageKey: "album",
    get pageTitle() {
      return pageTitle();
    },
    layout: "album",
    hidePageHeader: true,
    get children() {
      return ssr(_tmpl$413, escape(pageTitle()), escape(createComponent(Show, {
        get when() {
          return items().length > 0;
        },
        get fallback() {
          return ssr(_tmpl$511, escape(t2().pages.masonryEmpty));
        },
        get children() {
          return [ssr(_tmpl$69), ssr(_tmpl$220, ssrAttribute("data-vendor-script", escape(pageUrl(ctx().request_id, "/assets/vendor/minimasonry.min.js"), true), false), escape(createComponent(For, {
            get each() {
              return items();
            },
            children: (item) => {
              const imageUrl = resolveStoryMediaUrl(ctx(), item.image, originPath());
              return ssr(_tmpl$103, ssrAttribute("href", escape(imageUrl, true), false) + ssrAttribute("aria-label", escape(item.title, true) ?? escape(item.description, true) ?? escape(imageUrl, true), false), ssrAttribute("src", escape(imageUrl, true), false) + ssrAttribute("alt", escape(item.title, true) ?? "", false), escape(createComponent(Show, {
                get when() {
                  return !!item.title;
                },
                get children() {
                  return ssr(_tmpl$610, escape(item.title));
                }
              })), escape(createComponent(Show, {
                get when() {
                  return !!item.description;
                },
                get children() {
                  return ssr(_tmpl$75, escape(item.description));
                }
              })), escape(createComponent(Show, {
                get when() {
                  return !!item.title || !!item.description;
                },
                get children() {
                  return ssr(_tmpl$93, escape(createComponent(Show, {
                    get when() {
                      return !!item.title;
                    },
                    get children() {
                      return ssr(_tmpl$83, escape(item.title));
                    }
                  })), escape(createComponent(Show, {
                    get when() {
                      return !!item.description;
                    },
                    get children() {
                      return item.description;
                    }
                  })));
                }
              })));
            }
          })))];
        }
      })), escape(createComponent(Show, {
        get when() {
          return !!doc()?.content_html;
        },
        get children() {
          return ssr(_tmpl$317, doc().content_html);
        }
      })));
    }
  }), createComponent(Footer, {
    get ctx() {
      return ctx();
    },
    get config() {
      return cfg();
    }
  })];
};

// src/pages/not-found.tsx
var _tmpl$70 = ['<main id="main-content" data-layout="not-found" class="app-layout flex min-h-[50vh] flex-col items-center justify-center py-16 text-center"><p class="text-accent text-7xl font-bold sm:text-8xl">404</p><h1 class="mt-4 text-2xl font-semibold sm:text-3xl">', '</h1><p class="text-muted-foreground mt-3 max-w-md">', "</p>", "</main>"];
var NotFoundPage = (p3) => {
  const ctx = () => p3.props;
  const cfg = () => getStoryConfig(ctx());
  const t2 = () => useTranslations(ctx().lang);
  return [createComponent(Header, {
    get ctx() {
      return ctx();
    }
  }), ssr(_tmpl$70, escape(t2().pages.notFoundTitle), escape(t2().pages.notFoundDesc), escape(createComponent(LinkButton, {
    get href() {
      return pageUrl(ctx().request_id, "/index.html");
    },
    "class": "bg-accent text-accent-foreground mt-8 inline-flex rounded-lg px-6 py-2.5 no-underline hover:opacity-90",
    get children() {
      return t2().pages.notFoundBackHome;
    }
  }))), createComponent(Footer, {
    get ctx() {
      return ctx();
    },
    get config() {
      return cfg();
    }
  })];
};

// src/pages/index.tsx
function renderPageBody(pageKey, props) {
  switch (pageKey) {
    case "home":
      return createComponent(HomePage, {
        props
      });
    case "about":
      return createComponent(AboutPage, {
        props
      });
    case "post":
      return createComponent(PostPage, {
        props
      });
    case "posts-list":
      return createComponent(PostsListPage, {
        props
      });
    case "tags-index":
      return createComponent(TagsIndexPage, {
        props
      });
    case "tag-posts":
      return createComponent(TagPostsPage, {
        props
      });
    case "archives":
      return createComponent(ArchivesPage, {
        props
      });
    case "links":
      return createComponent(LinksPage, {
        props
      });
    case "album":
      return createComponent(MasonryPage, {
        props
      });
    case "not-found":
      return createComponent(NotFoundPage, {
        props
      });
    default:
      return createComponent(NotFoundPage, {
        props
      });
  }
}
function resolveLayoutTitle(pageKey, props, cfg) {
  const siteName = cfg.site.name;
  if (pageKey === "home") {
    const desc = cfg.site.description;
    return desc ? `${siteName} - ${desc}` : siteName;
  }
  if (pageKey === "about") {
    const aboutPath = resolveInnerLinkPath(cfg.about) || "/_about.md";
    const aboutMeta = everkm.post_detail(props.request_id, {
      path: aboutPath,
      allow_missing: true
    });
    const aboutTitle = aboutMeta?.title;
    return aboutTitle ? `${aboutTitle} | ${siteName}` : void 0;
  }
  if (pageKey === "links") {
    const title = dataSourceTitle(props, cfg.links, "/_links.md", "Links");
    return `${title} | ${siteName}`;
  }
  if (pageKey === "album") {
    const title = dataSourceTitle(props, cfg.masonry, "/_masonry.md", "Album");
    return `${title} | ${siteName}`;
  }
  if (pageKey === "not-found") {
    return `404 | ${siteName}`;
  }
  return void 0;
}
async function renderPage(compName, props) {
  const pageKey = resolvePageKey(compName, props.tpl_path, props.post);
  const cfg = getStoryConfig(props);
  const title = resolveLayoutTitle(pageKey, props, cfg);
  const html = await renderToStringAsync(() => createComponent(RootLayout, {
    context: props,
    title,
    get children() {
      return renderPageBody(pageKey, props);
    }
  }));
  const cssStory = everkm.assets(props.request_id, {
    type: "css",
    section: "story"
  }) || "";
  const cssSearch = configValue(props.config, "algolia_search") ? everkm.assets(props.request_id, {
    type: "css",
    section: "plugin-in-search"
  }) || "" : "";
  const jsStory = everkm.assets(props.request_id, {
    type: "js",
    section: "story"
  }) || "";
  const jsSearch = configValue(props.config, "algolia_search") ? everkm.assets(props.request_id, {
    type: "js",
    section: "plugin-in-search"
  }) || "" : "";
  const withCss = html.replace(/<\/head>/i, `${cssStory}${cssSearch}</head>`);
  const withJs = withCss.replace(/<\/body>/i, `${jsStory}${jsSearch}</body>`);
  return `<!DOCTYPE html>${withJs}`;
}

// src/entries/jsrender.ts
function ping() {
  return "pong";
}
function renderDcard() {
  return "";
}
export {
  ping,
  renderDcard,
  renderPage
};
