/* ============================================================
   CADET HTML5 SHELL — cadet-html5.js
   Shared modern HTML5 runtime for the Cadet Quest Map program.

   Exposes window.CadetHTML5 with small, dependency-free helpers:
     • dialog(id|el)      — open/close native <dialog> + focus mgmt
     • canvas(el, opts)   — DPR-aware canvas + requestAnimationFrame loop
     • audio              — Web Audio UI feedback (click/correct/wrong/win)
     • store(ns)          — namespaced localStorage progress store
     • template(id)       — clone a <template> element
     • toast(msg, kind)   — non-blocking notification
     • announce(msg)      — screen-reader live region
     • esc(str)           — HTML escape
     • reducedMotion      — boolean (prefers-reduced-motion)

   This file is intentionally framework-free so it can be dropped
   into any module (Phase 1, Phase 2, games) to modernise it.
   ============================================================ */
(function (global) {
  "use strict";

  var CadetHTML5 = {};

  /* ---------------- utilities ---------------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  CadetHTML5.esc = esc;

  function on(el, evt, fn, opts) { if (el) el.addEventListener(evt, fn, opts); return el; }
  CadetHTML5.on = on;

  var mq = global.matchMedia ? global.matchMedia("(prefers-reduced-motion: reduce)") : null;
  CadetHTML5.reducedMotion = !!(mq && mq.matches);

  /* ---------------- <dialog> manager ---------------- */
  var lastFocus = null;
  function resolve(el) { return typeof el === "string" ? document.getElementById(el) : el; }

  var dialog = {
    open: function (el, opts) {
      el = resolve(el);
      if (!el) return null;
      opts = opts || {};
      lastFocus = document.activeElement;
      try {
        if (typeof el.showModal === "function") el.showModal();
        else el.setAttribute("open", "");
      } catch (e) { el.setAttribute("open", ""); }
      /* focus first focusable (or autofocus target) */
      var target = el.querySelector("[data-autofocus]") ||
        el.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      if (target) setTimeout(function () { try { target.focus(); } catch (e) {} }, 30);
      if (opts.onClose) {
        var handler = function () { el.removeEventListener("close", handler); if (lastFocus && lastFocus.focus) lastFocus.focus(); opts.onClose(); };
        el.addEventListener("close", handler);
      }
      return el;
    },
    close: function (el) {
      el = resolve(el);
      if (!el) return;
      try { if (typeof el.close === "function") el.close(); else el.removeAttribute("open"); }
      catch (e) { el.removeAttribute("open"); }
      if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    },
    /* wire every [data-close-dialog] inside a dialog to close it */
    autoWire: function (root) {
      (root || document).querySelectorAll("[data-close-dialog]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var d = btn.closest("dialog"); if (d) dialog.close(d);
        });
      });
      /* click on backdrop closes */
      (root || document).querySelectorAll("dialog.cadet-dialog").forEach(function (d) {
        d.addEventListener("click", function (ev) {
          if (ev.target === d) {
            var r = d.getBoundingClientRect();
            var inside = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
            if (!inside) dialog.close(d);
          }
        });
      });
    }
  };
  CadetHTML5.dialog = dialog;

  /* ---------------- canvas helper ---------------- */
  function canvas(el, opts) {
    el = resolve(el);
    if (!el) return null;
    opts = opts || {};
    var ctx = el.getContext("2d");
    var dpr = Math.min(global.devicePixelRatio || 1, 2);
    var cssW = opts.width || el.clientWidth || 640;
    var cssH = opts.height || el.clientHeight || 360;
    el.width = Math.round(cssW * dpr);
    el.height = Math.round(cssH * dpr);
    el.style.width = cssW + "px";
    el.style.height = cssH + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var raf = null, running = false, last = 0;
    function frame(t) {
      if (!running) return;
      var dt = last ? (t - last) / 1000 : 0; last = t;
      if (opts.draw) opts.draw(ctx, cssW, cssH, dt);
      raf = global.requestAnimationFrame(frame);
    }
    return {
      ctx: ctx, width: cssW, height: cssH, dpr: dpr,
      start: function () { if (running) return; running = true; last = 0; raf = global.requestAnimationFrame(frame); },
      stop: function () { running = false; if (raf) global.cancelAnimationFrame(raf); },
      resize: function (w, h) {
        cssW = w || el.clientWidth; cssH = h || el.clientHeight;
        el.width = Math.round(cssW * dpr); el.height = Math.round(cssH * dpr);
        el.style.width = cssW + "px"; el.style.height = cssH + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (opts.draw) opts.draw(ctx, cssW, cssH, 0);
      },
      get running() { return running; }
    };
  }
  CadetHTML5.canvas = canvas;

  /* ---------------- Web Audio feedback ---------------- */
  var audio = (function () {
    var ctxA = null, muted = false;
    function ac() {
      if (muted) return null;
      if (!ctxA) {
        var AC = global.AudioContext || global.webkitAudioContext;
        if (!AC) return null;
        try { ctxA = new AC(); } catch (e) { return null; }
      }
      if (ctxA.state === "suspended" && ctxA.resume) { try { ctxA.resume(); } catch (e) {} }
      return ctxA;
    }
    function tone(freq, dur, type, gain) {
      var a = ac(); if (!a) return;
      var o = a.createOscillator(), g = a.createGain();
      o.type = type || "sine"; o.frequency.value = freq;
      g.gain.value = 0; o.connect(g); g.connect(a.destination);
      var t = a.currentTime;
      g.gain.linearRampToValueAtTime(gain == null ? 0.08 : gain, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.start(t); o.stop(t + dur + 0.02);
    }
    return {
      click: function () { tone(520, 0.08, "triangle", 0.05); },
      correct: function () { tone(660, 0.10, "sine", 0.07); setTimeout(function () { tone(990, 0.16, "sine", 0.07); }, 90); },
      wrong: function () { tone(200, 0.22, "sawtooth", 0.05); },
      win: function () { [523, 659, 784, 1046].forEach(function (f, i) { setTimeout(function () { tone(f, 0.22, "sine", 0.07); }, i * 110); }); },
      setMuted: function (m) { muted = !!m; },
      isMuted: function () { return muted; }
    };
  })();
  CadetHTML5.audio = audio;

  /* ---------------- namespaced progress store ---------------- */
  function store(ns) {
    var prefix = "cadet:" + ns + ":";
    function key(k) { return prefix + k; }
    return {
      get: function (k, dflt) {
        try { var v = localStorage.getItem(key(k)); return v == null ? (dflt === undefined ? null : dflt) : JSON.parse(v); }
        catch (e) { return dflt === undefined ? null : dflt; }
      },
      set: function (k, v) { try { localStorage.setItem(key(k), JSON.stringify(v)); } catch (e) {} return v; },
      remove: function (k) { try { localStorage.removeItem(key(k)); } catch (e) {} },
      keys: function () {
        var out = []; try {
          for (var i = 0; i < localStorage.length; i++) { var kk = localStorage.key(i); if (kk && kk.indexOf(prefix) === 0) out.push(kk.slice(prefix.length)); }
        } catch (e) {}
        return out;
      },
      clear: function () { this.keys().forEach(function (k) { try { localStorage.removeItem(prefix + k); } catch (e) {} }); }
    };
  }
  CadetHTML5.store = store;

  /* ---------------- <template> cloning ---------------- */
  function template(id) {
    var t = document.getElementById(id);
    if (!t || !t.content) return null;
    return t.content.cloneNode(true);
  }
  CadetHTML5.template = template;

  /* ---------------- toast ---------------- */
  function toastWrap() {
    var w = document.querySelector(".cadet-toast-wrap");
    if (!w) { w = document.createElement("div"); w.className = "cadet-toast-wrap"; document.body.appendChild(w); }
    return w;
  }
  function toast(msg, kind, ico) {
    var w = toastWrap();
    var el = document.createElement("div");
    el.className = "cadet-toast" + (kind ? " cadet-toast--" + kind : "");
    el.setAttribute("role", "status");
    el.innerHTML = '<span class="cadet-toast__ico">' + (ico || (kind === "good" ? "✅" : kind === "bad" ? "⚠️" : kind === "gold" ? "🏅" : "ℹ️")) +
      '</span><span class="cadet-toast__txt">' + esc(msg) + "</span>";
    w.appendChild(el);
    setTimeout(function () { el.style.transition = "opacity .3s ease, transform .3s ease"; el.style.opacity = "0"; el.style.transform = "translateY(10px)"; setTimeout(function () { el.remove(); }, 320); }, 3600);
    return el;
  }
  CadetHTML5.toast = toast;

  /* ---------------- aria-live announce ---------------- */
  function announce(msg) {
    var r = document.getElementById("cadetLive");
    if (!r) { r = document.createElement("div"); r.id = "cadetLive"; r.className = "cadet-visually-hidden"; r.setAttribute("aria-live", "polite"); document.body.appendChild(r); }
    r.textContent = "";
    setTimeout(function () { r.textContent = msg; }, 40);
  }
  CadetHTML5.announce = announce;

  /* ---------------- misc ---------------- */
  CadetHTML5.clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  CadetHTML5.lerp = function (a, b, t) { return a + (b - a) * t; };
  CadetHTML5.ready = function (fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  };

  global.CadetHTML5 = CadetHTML5;
  CadetHTML5.ready(function () { dialog.autoWire(document); });
})(window);
