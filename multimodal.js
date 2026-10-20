/* ============================================================
   MULTIMODAL LEARNING ENHANCEMENT — Shared JavaScript Layer
   Based on VARK multimodal learning research + dyslexic reader
   support strategies (Trent University, Prodigy, iSpring).

   Features:
   1. Text-to-Speech (Auditory mode) — read any text aloud
   2. Accessibility toolbar — dyslexia font, high contrast,
      reduced motion, text size, read-aloud toggle
   3. Multimodal visual feedback — confetti + colour flash
      on correct answers (visual feedback per Prodigy guide #5)
   4. Break reminders — reduce cognitive overload (Prodigy #2)
   5. Article modal enhancement — callouts, tips, steps, icon grids
   6. Read-aloud highlighting — visual + auditory sync
   ============================================================ */

(function () {
  "use strict";

  // Don't double-init
  if (window.__multimodalInit) return;
  window.__multimodalInit = true;

  // ========================================================
  // SETTINGS (persisted to localStorage)
  // ========================================================
  const MM_KEY = "mmSettings";
  const settings = loadSettings();

  function loadSettings() {
    try {
      const raw = localStorage.getItem(MM_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      dyslexia: false,
      highContrast: false,
      reduceMotion: false,
      textSize: "normal", // normal | lg | xl
      readAloud: false,
      breakReminders: true,
      lastBreak: Date.now()
    };
  }

  function saveSettings() {
    try { localStorage.setItem(MM_KEY, JSON.stringify(settings)); } catch (e) {}
  }

  // ========================================================
  // APPLY BODY CLASSES based on settings
  // ========================================================
  function applyBodyClasses() {
    const body = document.body;
    body.classList.toggle("mm-dyslexia", settings.dyslexia);
    body.classList.toggle("mm-high-contrast", settings.highContrast);
    body.classList.toggle("mm-reduce-motion", settings.reduceMotion);
    body.classList.toggle("mm-text-lg", settings.textSize === "lg");
    body.classList.toggle("mm-text-xl", settings.textSize === "xl");
  }

  // ========================================================
  // TEXT-TO-SPEECH ENGINE
  // Uses Web Speech API (speechSynthesis) for read-aloud.
  // Highlights text as it's being read (visual + auditory).
  // ========================================================
  const TTS = {
    speaking: false,
    utterance: null,
    currentEl: null,
    queue: [],

    stop() {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      this.speaking = false;
      if (this.currentEl) {
        this.currentEl.classList.remove("mm-reading");
        this.currentEl = null;
      }
      this.queue = [];
      updateReadAloudButtons(false);
    },

    speakText(text, el) {
      if (!window.speechSynthesis) {
        console.warn("[Multimodal] Speech synthesis not supported");
        return;
      }
      this.stop();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.92;
      u.pitch = 1.0;
      u.volume = 1.0;
      // Try to pick an English voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        const enVoice = voices.find(v => v.lang && v.lang.startsWith("en"));
        if (enVoice) u.voice = enVoice;
      }
      u.onstart = () => {
        this.speaking = true;
        if (el) {
          el.classList.add("mm-reading");
          this.currentEl = el;
        }
      };
      u.onend = () => {
        this.speaking = false;
        if (this.currentEl) {
          this.currentEl.classList.remove("mm-reading");
          this.currentEl = null;
        }
        updateReadAloudButtons(false);
      };
      u.onerror = () => {
        this.speaking = false;
        if (this.currentEl) {
          this.currentEl.classList.remove("mm-reading");
          this.currentEl = null;
        }
        updateReadAloudButtons(false);
      };
      this.utterance = u;
      window.speechSynthesis.speak(u);
      updateReadAloudButtons(true);
    },

    speakElement(el) {
      if (this.speaking) {
        this.stop();
        return;
      }
      // Gather text from the element and its children
      let text = "";
      el.querySelectorAll("h2, h3, p, li, td, th, .mm-callout-text, .mm-tip-text, .mm-warning-text, .mm-ic-label, .mm-ic-desc").forEach(child => {
        text += child.textContent + ". ";
      });
      if (!text.trim()) text = el.textContent;
      this.speakText(text, el);
    }
  };

  function updateReadAloudButtons(reading) {
    document.querySelectorAll(".mm-article-read").forEach(btn => {
      btn.classList.toggle("reading", reading);
      const ico = btn.querySelector(".mm-ar-ico");
      const label = btn.querySelector(".mm-ar-label");
      if (ico) ico.textContent = reading ? "⏹" : "🔊";
      if (label) label.textContent = reading ? "Stop Reading" : "Read Aloud";
    });
  }

  // ========================================================
  // READ-ALOUD: make elements readable on click
  // ========================================================
  function makeReadable() {
    // Add read-aloud capability to article modal bodies and task prompts
    const selectors = [
      ".article-modal-body",
      ".task-prompt",
      ".mission-brief",
      ".mission-banner .mission-sub"
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains("mm-readable")) {
          el.classList.add("mm-readable");
          el.addEventListener("click", function (e) {
            // Only trigger on direct click (not on child buttons/links)
            if (e.target === el || e.target.tagName === "P" || e.target.tagName === "H3" || e.target.tagName === "LI") {
              TTS.speakElement(el);
            }
          });
        }
      });
    });
  }

  // ========================================================
  // MULTIMODAL VISUAL FEEDBACK
  // Confetti burst + colour flash on correct answers.
  // Called by training modules via window.mmFeedback(type)
  // ========================================================
  function spawnConfetti(type) {
    const overlay = document.getElementById("mm-feedback-overlay");
    if (!overlay) return;
    const colors = type === "error"
      ? ["#ef4444", "#f87171", "#fca5a5", "#fecaca"]
      : ["#22c55e", "#4ade80", "#86efac", "#fbbf24", "#63b3ed", "#a78bfa"];
    const count = type === "error" ? 12 : 30;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 3;
    for (let i = 0; i < count; i++) {
      const c = document.createElement("div");
      c.className = "mm-confetti";
      c.style.left = (cx + (Math.random() - 0.5) * 200) + "px";
      c.style.top = cy + "px";
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDelay = (Math.random() * 0.3) + "s";
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      overlay.appendChild(c);
      setTimeout(() => c.remove(), 1600);
    }
  }

  function flashScreen(type) {
    if (settings.reduceMotion) return;
    const flash = document.createElement("div");
    flash.className = "mm-flash" + (type === "error" ? " mm-flash-error" : "");
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 700);
  }

  // Public API for training modules to call
  window.mmFeedback = function (type) {
    type = type || "success";
    if (type === "success" || type === "correct") {
      spawnConfetti("success");
      flashScreen("success");
      // Optional auditory feedback (short ascending tone via Web Audio)
      playTone("success");
    } else if (type === "error" || type === "wrong") {
      spawnConfetti("error");
      flashScreen("error");
      playTone("error");
    } else if (type === "info") {
      playTone("info");
    }
  };

  // ========================================================
  // AUDIO FEEDBACK (Web Audio API)
  // Short tones for correct/wrong/info — auditory feedback
  // that complements the visual feedback.
  // ========================================================
  let audioCtx = null;
  function playTone(type) {
    if (settings.reduceMotion) return; // Respect motion setting for audio too
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") audioCtx.resume();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "success") {
        // Ascending major arpeggio: C5, E5, G5
        osc.frequency.setValueAtTime(523, now);
        osc.frequency.setValueAtTime(659, now + 0.08);
        osc.frequency.setValueAtTime(784, now + 0.16);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "error") {
        // Descending buzz: low buzz
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else {
        // Info: single soft tone
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      // Audio not available — silently ignore
    }
  }

  // ========================================================
  // BREAK REMINDER (Cognitive Overload Reduction)
  // Every 20 minutes of activity, suggest a short break.
  // Based on Prodigy guideline: "take breaks every 20 min"
  // ========================================================
  let breakTimer = null;
  let activityTimer = null;

  function startBreakTimer() {
    if (!settings.breakReminders) return;
    if (breakTimer) clearTimeout(breakTimer);
    // 20 minutes = 1,200,000 ms
    breakTimer = setTimeout(showBreakReminder, 20 * 60 * 1000);
  }

  function resetActivityTimer() {
    settings.lastBreak = Date.now();
    saveSettings();
    startBreakTimer();
  }

  function showBreakReminder() {
    // Don't show if one is already visible
    if (document.querySelector(".mm-break-reminder")) return;
    const reminder = document.createElement("div");
    reminder.className = "mm-break-reminder";
    reminder.innerHTML = `
      <div class="mm-br-icon">☕</div>
      <div class="mm-br-title">Time for a Short Break</div>
      <div class="mm-br-text">You've been training for 20 minutes. Step away, stretch, and rest your eyes for a minute. Short breaks improve retention and focus.</div>
      <div class="mm-br-actions">
        <button class="mm-br-btn primary" id="mmBrOk" type="button">Got It</button>
        <button class="mm-br-btn" id="mmBrLater" type="button">Later</button>
      </div>
    `;
    document.body.appendChild(reminder);
    document.getElementById("mmBrOk").addEventListener("click", function () {
      reminder.remove();
      resetActivityTimer();
    });
    document.getElementById("mmBrLater").addEventListener("click", function () {
      reminder.remove();
      // Remind again in 10 minutes
      if (breakTimer) clearTimeout(breakTimer);
      breakTimer = setTimeout(showBreakReminder, 10 * 60 * 1000);
    });
  }

  // Track user activity to reset break timer
  function trackActivity() {
    let lastReset = 0;
    ["click", "keydown", "touchstart"].forEach(evt => {
      document.addEventListener(evt, function () {
        const now = Date.now();
        if (now - lastReset > 60000) { // Only reset once per minute
          lastReset = now;
          settings.lastBreak = now;
        }
      }, { passive: true });
    });
  }

  // ========================================================
  // ACCESSIBILITY TOOLBAR
  // Floating toolbar with toggle buttons for each
  // accessibility feature.
  // ========================================================
  function buildToolbar() {
    if (document.getElementById("mm-toolbar")) return;
    const toolbar = document.createElement("div");
    toolbar.id = "mm-toolbar";
    toolbar.innerHTML = `
      <span class="mm-label">Access</span>
      <button class="mm-btn ${settings.dyslexia ? "active" : ""}" id="mmBtnDyslexia" type="button" title="Dyslexia-friendly font mode">
        <span class="mm-ico">🔤</span><span class="mm-text">Dyslexia</span>
      </button>
      <button class="mm-btn ${settings.highContrast ? "active" : ""}" id="mmBtnContrast" type="button" title="High contrast mode">
        <span class="mm-ico">🌗</span><span class="mm-text">Contrast</span>
      </button>
      <button class="mm-btn ${settings.textSize !== "normal" ? "active" : ""}" id="mmBtnTextSize" type="button" title="Text size: ${settings.textSize}">
        <span class="mm-ico">🔍</span><span class="mm-text">${settings.textSize === "xl" ? "A+" : settings.textSize === "lg" ? "A" : "A-"}</span>
      </button>
      <div class="mm-divider"></div>
      <button class="mm-btn ${settings.reduceMotion ? "active" : ""}" id="mmBtnMotion" type="button" title="Reduce motion">
        <span class="mm-ico">🚫</span><span class="mm-text">Motion</span>
      </button>
      <button class="mm-btn" id="mmBtnRead" type="button" title="Read this page aloud">
        <span class="mm-ico">🔊</span><span class="mm-text">Read</span>
      </button>
    `;
    document.body.appendChild(toolbar);

    // Dyslexia font toggle
    document.getElementById("mmBtnDyslexia").addEventListener("click", function () {
      settings.dyslexia = !settings.dyslexia;
      saveSettings();
      applyBodyClasses();
      this.classList.toggle("active", settings.dyslexia);
    });

    // High contrast toggle
    document.getElementById("mmBtnContrast").addEventListener("click", function () {
      settings.highContrast = !settings.highContrast;
      saveSettings();
      applyBodyClasses();
      this.classList.toggle("active", settings.highContrast);
    });

    // Text size cycle: normal → lg → xl → normal
    document.getElementById("mmBtnTextSize").addEventListener("click", function () {
      const sizes = ["normal", "lg", "xl"];
      const idx = sizes.indexOf(settings.textSize);
      settings.textSize = sizes[(idx + 1) % sizes.length];
      saveSettings();
      applyBodyClasses();
      this.classList.toggle("active", settings.textSize !== "normal");
      const txt = this.querySelector(".mm-text");
      txt.textContent = settings.textSize === "xl" ? "A+" : settings.textSize === "lg" ? "A" : "A-";
    });

    // Reduce motion toggle
    document.getElementById("mmBtnMotion").addEventListener("click", function () {
      settings.reduceMotion = !settings.reduceMotion;
      saveSettings();
      applyBodyClasses();
      this.classList.toggle("active", settings.reduceMotion);
    });

    // Read page aloud
    document.getElementById("mmBtnRead").addEventListener("click", function () {
      if (TTS.speaking) {
        TTS.stop();
        return;
      }
      // Read the main content area
      const main = document.querySelector(".mission-active, .section.active, .task-card, .article-modal-body, main, #content, .content");
      if (main) {
        TTS.speakElement(main);
      } else {
        // Fallback: read the whole body minus the toolbar
        const clone = document.body.cloneNode(true);
        clone.querySelectorAll("#mm-toolbar, .mm-break-reminder, #mm-feedback-overlay, script, style").forEach(el => el.remove());
        TTS.speakText(clone.textContent, null);
      }
    });
  }

  // ========================================================
  // FEEDBACK OVERLAY (container for confetti)
  // ========================================================
  function buildFeedbackOverlay() {
    if (document.getElementById("mm-feedback-overlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "mm-feedback-overlay";
    document.body.appendChild(overlay);
  }

  // ========================================================
  // ARTICLE MODAL ENHANCEMENT
  // Enhances the article modal with read-aloud button and
  // makes content readable. Also provides helper functions
  // for modules that want to render rich article content.
  // ========================================================

  // Helper: render callout box
  window.mmCallout = function (label, text) {
    return `<div class="mm-article-callout"><div class="mm-callout-label">${label}</div><div class="mm-callout-text">${text}</div></div>`;
  };

  // Helper: render tip box
  window.mmTip = function (label, text) {
    return `<div class="mm-article-tip"><div class="mm-tip-label">${label}</div><div class="mm-tip-text">${text}</div></div>`;
  };

  // Helper: render warning box
  window.mmWarning = function (label, text) {
    return `<div class="mm-article-warning"><div class="mm-warning-label">${label}</div><div class="mm-warning-text">${text}</div></div>`;
  };

  // Helper: render numbered steps
  window.mmSteps = function (steps) {
    return `<ol class="mm-article-steps">${steps.map(s => `<li>${s}</li>`).join("")}</ol>`;
  };

  // Helper: render icon grid (visual element for key concepts)
  window.mmIconGrid = function (items) {
    return `<div class="mm-article-icon-grid">${items.map(i =>
      `<div class="mm-article-icon-card"><span class="mm-ic">${i.icon}</span><div class="mm-ic-label">${i.label}</div><div class="mm-ic-desc">${i.desc}</div></div>`
    ).join("")}</div>`;
  };

  // Enhance article modals after they're created
  // This is called via MutationObserver to catch dynamically created modals
  function enhanceArticleModals() {
    document.querySelectorAll(".article-modal").forEach(modal => {
      if (modal.dataset.mmEnhanced) return;
      modal.dataset.mmEnhanced = "true";

      // Add read-aloud button to the header
      const head = modal.querySelector(".article-modal-head");
      if (head && !head.querySelector(".mm-article-read")) {
        const readBtn = document.createElement("button");
        readBtn.className = "mm-article-read";
        readBtn.type = "button";
        readBtn.innerHTML = `<span class="mm-ar-ico">🔊</span><span class="mm-ar-label">Read Aloud</span>`;
        readBtn.addEventListener("click", function () {
          const body = modal.querySelector(".article-modal-body");
          if (body) TTS.speakElement(body);
        });
        head.appendChild(readBtn);
      }

      // Make the body readable
      const body = modal.querySelector(".article-modal-body");
      if (body) {
        body.classList.add("mm-readable");
        body.addEventListener("click", function (e) {
          if (e.target === body || e.target.tagName === "P" || e.target.tagName === "H3" || e.target.tagName === "LI") {
            TTS.speakElement(body);
          }
        });
      }
    });
  }

  // ========================================================
  // HOOK INTO TRAINING MODULES' TOAST/FEEDBACK
  // Listen for toast events to trigger visual feedback
  // ========================================================
  function hookToasts() {
    // Many modules use a toast() function that creates .toast elements
    // We observe for new toasts and trigger feedback
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Check for toast elements
            if (node.classList && (node.classList.contains("toast") || node.querySelector?.(".toast"))) {
              const toast = node.classList.contains("toast") ? node : node.querySelector(".toast");
              if (toast) {
                const text = toast.textContent.toLowerCase();
                if (text.includes("correct") || text.includes("✓") || text.includes("complete") || text.includes("pass") || text.includes("earned") || text.includes("xp")) {
                  if (!text.includes("wrong") && !text.includes("incorrect") && !text.includes("fail")) {
                    window.mmFeedback("success");
                  }
                } else if (text.includes("wrong") || text.includes("incorrect") || text.includes("fail") || text.includes("try again") || text.includes("✗")) {
                  window.mmFeedback("error");
                }
              }
            }
            // Also check for task result messages
            if (node.classList && (node.classList.contains("task-result") || node.classList.contains("result-msg"))) {
              const text = node.textContent.toLowerCase();
              if (text.includes("correct") || text.includes("✓") || text.includes("right") || text.includes("pass")) {
                window.mmFeedback("success");
              } else if (text.includes("wrong") || text.includes("incorrect") || text.includes("✗") || text.includes("try again")) {
                window.mmFeedback("error");
              }
            }
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ========================================================
  // OBSERVE FOR DYNAMICALLY ADDED ARTICLE MODALS
  // ========================================================
  function observeModals() {
    const observer = new MutationObserver(function () {
      enhanceArticleModals();
      makeReadable();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ========================================================
  // INITIALIZE
  // ========================================================
  function init() {
    applyBodyClasses();
    buildFeedbackOverlay();
    buildToolbar();
    enhanceArticleModals();
    makeReadable();
    hookToasts();
    observeModals();
    trackActivity();
    startBreakTimer();

    // Preload speech synthesis voices
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = function () {
        window.speechSynthesis.getVoices();
      };
    }

    // Stop speech when page is unloaded
    window.addEventListener("beforeunload", function () {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    });
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ========================================================
  // PUBLIC API
  // ========================================================
  window.MultimodalLearning = {
    settings: settings,
    tts: TTS,
    feedback: window.mmFeedback,
    callout: window.mmCallout,
    tip: window.mmTip,
    warning: window.mmWarning,
    steps: window.mmSteps,
    iconGrid: window.mmIconGrid,
    enhanceArticleModals: enhanceArticleModals,
    makeReadable: makeReadable,
    playTone: playTone,
    refresh: function () {
      applyBodyClasses();
      enhanceArticleModals();
      makeReadable();
    }
  };

})();
