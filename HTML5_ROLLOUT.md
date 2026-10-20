# Cadet Quest Map — HTML5 Modernization & Rollout Guide

This document describes the shared **HTML5 shell** introduced for the Phase 2
Sailing program and explains how to roll it out across the rest of the Cadet
Quest Map training modules. It is written so an instructor-developer can take an
existing module page and modernize it in a single sitting without breaking the
existing design language, progress storage, or the HQ Mail pipeline.

---

## 1. Why "HTML5" means more than `<!doctype html>`

Every page in the project already declared `<!doctype html>`, so the browser was
already in standards mode. The real modernization is about **semantics and native
platform APIs** replacing older div-soup + jQuery-style patterns:

| Concern | Legacy pattern in the program | HTML5 shell approach |
| --- | --- | --- |
| Page structure | nested `<div class="header">`, `<div class="content">` | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` landmarks |
| Modals | absolutely-positioned `<div>` toggled by class, manual focus juggling | native `<dialog>` + `showModal()`, built-in focus trap & `Esc` |
| Graphics | static images or SVG for interactive diagrams | `<canvas>` with a DPR-aware render loop |
| Sound | none / external audio files | Web Audio API (`AudioContext`) synthesized cues |
| Reusable markup | string concatenation of HTML | `<template>` + `cloneNode(true)` |
| Accessibility | ad-hoc `aria-*` | landmarks + `aria-live` region + skip link + reduced-motion support |
| Storage | scattered `localStorage` keys | namespaced `CadetHTML5.store(ns)` wrapper |

The shell is **additive**. A page that adopts it keeps its existing CSS theme
(e.g. `sea_training.css`) and simply gains the shared shell classes and runtime.

---

## 2. The two shell files

### `cadet-html5.css` — design tokens + semantic shell styles
Provides:

* **Design tokens** on `:root` — `--c-abyss`, `--c-sea`, `--c-sea-bright`,
  `--c-gold`, `--c-green`, `--c-red`, `--c-ink`, `--c-muted`, plus spacing and
  radius scales. New pages should reference these tokens rather than hard-coding
  hex values.
* **Landmark layout** — `.cadet-appbar`, `.cadet-layout`, `.cadet-layout--split`,
  `.cadet-rail`, `.cadet-main`, `.cadet-footer`, `.cadet-skip`.
* **Components** — `.cadet-card`, buttons (`.cadet-btn`, `.cadet-btn--ghost`),
  `.cadet-chip`, `.cadet-progress`, `.cadet-eyebrow`, `.cadet-h1/.cadet-h2`,
  `.cadet-lead`, `.cadet-muted`.
* **Native dialog** — `dialog.cadet-dialog` (and `--paper` variant), backdrop,
  entrance animation.
* **Canvas stage** — `.cadet-canvas-stage`, `.cadet-canvas` (responsive, keeps
  aspect ratio, high-DPI friendly).
* **Feedback** — `.cadet-toast-wrap`, `.cadet-toast` (kinds: default/good/gold).
* **Media queries** — `prefers-reduced-motion` and `@media print`.

### `cadet-html5.js` — shared runtime (`window.CadetHTML5`)
A single global object. Everything is optional — use only what a page needs.

```
CadetHTML5.esc(str)                 // HTML-escape untrusted text
CadetHTML5.on(el, evt, fn, opts)    // null-safe addEventListener
CadetHTML5.reducedMotion            // boolean, live value

CadetHTML5.dialog.open(el, opts)    // native <dialog>.showModal() + focus mgmt
CadetHTML5.dialog.close(el)         // .close()
CadetHTML5.dialog.autoWire(root)    // wires [data-close-dialog] buttons

CadetHTML5.canvas(el, { draw })     // DPR-aware render loop
   -> { ctx, width, height, dpr, start(), stop(), resize(w,h), running }
   // draw(ctx, w, h, dt) is called every animation frame

CadetHTML5.audio.click()            // Web Audio synthesized cues
CadetHTML5.audio.correct()
CadetHTML5.audio.wrong()
CadetHTML5.audio.win()
CadetHTML5.audio.setMuted(bool) / isMuted()

CadetHTML5.store(ns)                // namespaced localStorage: cadet:<ns>:<key>
   -> { get(k,dflt), set(k,v), remove(k), keys(), clear() }

CadetHTML5.template(id)             // clone a <template> by id
CadetHTML5.toast(msg, kind, ico)    // transient toast (kind: ''|'good'|'gold')
CadetHTML5.announce(msg)            // push to the aria-live region
CadetHTML5.clamp(v,a,b) / lerp(a,b,t)
CadetHTML5.ready(fn)                // run after DOMContentLoaded
```

---

## 3. The canonical page skeleton

Copy this structure when converting a module. Replace the `MODULE` placeholders.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MODULE TITLE — Phase 2 Sea Cadet</title>
  <link rel="stylesheet" href="sea_training.css">
  <link rel="stylesheet" href="cadet-html5.css?v=1">
</head>
<body>
  <a class="cadet-skip" href="#main">Skip to content</a>

  <header class="cadet-appbar">
    <div class="cadet-appbar__brand">⛵ <span data-i18n="MODULE TITLE">MODULE TITLE</span></div>
    <div class="cadet-appbar__tools">
      <span id="topXP">⚡ XP 0</span>
      <span id="topBadges">🎖️ 0</span>
      <div id="langSwitcher"></div>
    </div>
  </header>

  <div class="cadet-layout cadet-layout--split">
    <aside class="cadet-rail" aria-label="Progress">
      <!-- progress %, chapter/strand list, reset button -->
    </aside>

    <main class="cadet-main" id="main">
      <section class="cadet-card">…hero…</section>
      <section class="cadet-card"><canvas class="cadet-canvas" id="simCanvas"></canvas></section>
      <article class="cadet-card" id="readerBody"></article>
    </main>
  </div>

  <footer class="cadet-footer">…</footer>

  <dialog class="cadet-dialog" id="infoDialog" aria-labelledby="infoTitle">…</dialog>
  <template id="chapterTpl">…</template>

  <script src="translations_en.js"></script>
  <script src="translations_fr.js?v=8"></script>
  <script src="i18n.js"></script>
  <script src="cadet-html5.js?v=1"></script>
  <script src="cadet_hq.js?v=2"></script>
  <script src="mobile-nav.js"></script>
  <script src="MODULE.js?v=1"></script>
</body>
</html>
```

**Script order matters.** `translations_*` → `i18n.js` → `cadet-html5.js` →
`cadet_hq.js` → `mobile-nav.js` → the module script. The module script should
read `window.tr` and `window.CadetHTML5` defensively:

```js
var tr = window.tr || function (s) { return s; };
var CH = window.CadetHTML5;
var store = CH.store("myModule");
```

---

## 4. Internationalization rules (do not skip)

The i18n engine exposes `tr(text, fallback)` and `trMutate(obj)`.

* **Static DOM** — add `data-i18n="English string"`; the engine translates
  `textContent` (and `<title>`) on language change.
* **Dynamic strings assigned in JS** — every `textContent` / `innerHTML`
  assignment must be wrapped: `el.title.textContent = tr("Next waypoint ▶");`
* **Data objects** — call `trMutate(DATA)` once after load so nested
  `title`/`prompt`/`label` fields resolve.
* **New keys** — add the English→French pair to `translations_fr.js`. Run
  `node -c translations_fr.js` and the `verify_fr.js` helper to confirm 0
  missing / 0 mismatched keys before shipping.

> Pitfall: writing literal `\u00b7` / `\u2014` inside HTML text nodes renders the
> escape sequence verbatim. Use the real `·` and `—` characters in markup; keep
> `\uXXXX` escapes only inside JavaScript string literals.

---

## 5. Progress, badges, and HQ Mail

The shell does **not** own progress — each module keeps writing its own map key so
existing maps keep working:

* Phase 1 map key: `cadetMapDemoCompleted`
* Phase 2 Sea map key: `cadetMapDemoSeaYear2Completed`

`cadet_hq.js` watches those keys and mirrors completions into HQ Mail. To emit a
badge confirmation or a training report from a *new* module, call the additive
public API (non-breaking, works offline via the local outbox):

```js
window.CadetHQ.notifyBadge({
  id: 308, title: "Sailing Fundamentals",
  file: "badge_15_sea_program.png",
  total: 12, earnedCount: 1,
  namespace: "Phase 2 · Sea Cadet"
});

window.CadetHQ.notifyReport({
  key: "sailing-diagnostic",
  title: "Chart Your Course — Sailing Diagnostic",
  overall: 82, rating: "Helm Hand",
  strands: [ { label: "Points of Sail", pct: 90 }, … ],
  path:    [ { label: "Sail Trim", pct: 55, target: "Chapter 3" }, … ],
  namespace: "Phase 2 · Sea Cadet"
});
```

Both queue into `cadetHQLocalOutbox` and enqueue a sync job, so the HQ Mail
inbox shows the message even when the backend is unreachable.

---

## 6. Cache-busting convention

Assets are versioned with a query string and **must be bumped together** whenever
their contents change, or returning cadets keep stale files:

* `translations_fr.js?v=N` — bump on every translation edit.
* `cadet_hq.js?v=N` — bump on every HQ change.
* `cadet-html5.js?v=N` / `cadet-html5.css?v=N` — bump on every shell change.
* `MODULE.js?v=N` — bump on every module edit.

A single `grep -rl` + `sed` pass across the HTML pages keeps every reference in
sync.

---

## 7. Migration checklist for each remaining module

1. [ ] Wrap the page body in the semantic skeleton (`header` / `nav` / `main` /
       `section` / `article` / `aside` / `footer`) and add the skip link.
2. [ ] Add `<link rel="stylesheet" href="cadet-html5.css?v=1">` and move colours
       onto the shared tokens.
3. [ ] Replace any div-based modal with `<dialog class="cadet-dialog">`; wire
       close buttons with `data-close-dialog`.
4. [ ] Convert interactive diagrams to `<canvas>` driven by `CadetHTML5.canvas`.
5. [ ] Add Web Audio feedback on correct / incorrect / completion events.
6. [ ] Move ad-hoc `localStorage` calls onto `CadetHTML5.store("<module>")`.
7. [ ] Wrap every dynamic JS string in `tr()`; add new keys to
       `translations_fr.js` and verify.
8. [ ] Keep the existing map key writes; add `notifyBadge` / `notifyReport`
       calls where the module awards a badge or produces an assessment.
9. [ ] Bump all `?v=` query strings.
10. [ ] QA: `node -c` every changed JS file; load the page, complete one item,
        switch to French, and reset — confirm progress, badge, and HQ Mail.

---

## 8. Reference implementations

Two complete, production examples ship with this guide:

* **`sailing_training.html` / `.js` / `.css`** — a full instructional module:
  7 chapters in a native `<dialog>`, a Canvas "Points of Sail" simulator with a
  live wind/heading/trim HUD, 6 assessment tasks, XP + badge award, and HQ Mail
  badge confirmation.
* **`sailing_diagnostic.html` / `.js` / `.css`** — an assessment game: a Canvas
  harbour course of 12 waypoints, 6 competency strands, a results screen with a
  radar chart, per-strand bars, an ordered "Recommended Training Path" (what to
  teach next), and an HQ Mail training report.

Use these as the template for converting the remaining Phase 1 and Phase 2
modules.
