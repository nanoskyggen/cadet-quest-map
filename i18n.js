/* ============================================================
   i18n.js — Internationalization Engine
   Adds English / Canadian French (Québécois) language support
   to the Cadet Quest Map platform.
   ============================================================ */
(function (global) {
  "use strict";

  var STORAGE_KEY = "cadetLanguage";
  var SUPPORTED = ["en", "fr"];
  var DEFAULT_LANG = "en";

  // ── Current language (read from storage or default) ──
  var currentLang = (function () {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  })();

  // ── The translation dictionary.
  //    Populated by translations_en.js and translations_fr.js
  //    Structure: I18N_DICT[lang] = { "English text": "Translated text" }
  global.I18N_DICT = global.I18N_DICT || {};
  global.I18N_DICT.en = global.I18N_DICT.en || {};
  global.I18N_DICT.fr = global.I18N_DICT.fr || {};

  /* ── tr(text): translate a string. Falls back to English ── */
  function tr(text, fallback) {
    if (text == null || typeof text !== "string") return text;
    var dict = global.I18N_DICT[currentLang];
    if (dict && Object.prototype.hasOwnProperty.call(dict, text)) {
      var translated = dict[text];
      if (translated && translated.length > 0) return translated;
    }
    // If a fallback was provided, use it; otherwise return the key text
    if (typeof fallback === "string") return fallback;
    return text; // fallback to original English
  }
  global.tr = tr;

  /* ── trArr(arr): translate an array of strings ── */
  function trArr(arr) {
    if (!Array.isArray(arr)) return arr;
    return arr.map(function (item) {
      return trDeep(item);
    });
  }
  global.trArr = trArr;

  /* ── trDeep(obj): recursively translate all string values in an
         object or array. Returns a NEW object (does not mutate). ── */
  function trDeep(obj) {
    if (obj == null) return obj;
    if (typeof obj === "string") return tr(obj);
    if (Array.isArray(obj)) return obj.map(trDeep);
    if (typeof obj === "object") {
      var out = {};
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          out[key] = trDeep(obj[key]);
        }
      }
      return out;
    }
    return obj;
  }
  global.trDeep = trDeep;

  /* ── trList(list, fields): translate specific string fields in a
         list of objects (e.g. lessons, MISSIONS). Returns new array. ── */
  function trList(list, fields) {
    if (!Array.isArray(list)) return list;
    return list.map(function (item) {
      return trDeep(item);
    });
  }
  global.trList = trList;

  /* ── trMutate(obj [, fieldName, dictKey]): translate string values IN-PLACE.
         Form 1 — trMutate(obj): recursively translate ALL string values in
           obj/array using tr(englishString). Mutates original (no copy).
         Form 2 — trMutate(obj, fieldName, dictKey): set obj[fieldName] = tr(dictKey).
           Use this when a specific dictionary key should override the English text. ── */
  function trMutate(obj, fieldName, dictKey) {
    if (obj == null) return obj;
    /* Form 2: targeted field+key translation.
       If tr(dictKey) finds a translation, use it; otherwise keep the
       original obj[fieldName] value (so English mode shows English text,
       not the raw dictionary key). */
    if (typeof fieldName === "string" && typeof dictKey === "string") {
      var translated = tr(dictKey);
      if (translated !== dictKey) {
        obj[fieldName] = translated;
      }
      return obj;
    }
    if (typeof obj === "string") return tr(obj);
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        if (typeof obj[i] === "string") {
          obj[i] = tr(obj[i]);
        } else if (typeof obj[i] === "object" && obj[i] !== null) {
          trMutate(obj[i]);
        }
      }
      return obj;
    }
    if (typeof obj === "object") {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (typeof obj[key] === "string") {
            obj[key] = tr(obj[key]);
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            trMutate(obj[key]);
          }
        }
      }
      return obj;
    }
    return obj;
  }
  global.trMutate = trMutate;

  /* ── getLang(): return current language code ── */
  function getLang() {
    return currentLang;
  }
  global.getLang = getLang;

  /* ── setLang(lang): set language, save to storage, reload page ── */
  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    if (lang === currentLang) return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    // Reload the page so all JS data arrays re-render in the new language
    window.location.reload();
  }
  global.setLang = setLang;

  /* ── isFrench(): convenience check ── */
  function isFrench() {
    return currentLang === "fr";
  }
  global.isFrench = isFrench;

  /* ── applyDOMTranslations(): walk the DOM and replace text in
         elements that have data-i18n attributes, plus data-i18n-html
         for elements with HTML content. Also patches elements that
         have data-i18n-placeholder. ── */
  function applyDOMTranslations() {
    // data-i18n — textContent replacement
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute("data-i18n");
      var translated = tr(key);
      if (translated !== key) {
        els[i].textContent = translated;
      }
    }
    // data-i18n-html — innerHTML replacement (for content with markup)
    var htmlEls = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < htmlEls.length; j++) {
      var hKey = htmlEls[j].getAttribute("data-i18n-html");
      var hTranslated = tr(hKey);
      if (hTranslated !== hKey) {
        htmlEls[j].innerHTML = hTranslated;
      }
    }
    // data-i18n-placeholder — placeholder attribute
    var phEls = document.querySelectorAll("[data-i18n-placeholder]");
    for (var k = 0; k < phEls.length; k++) {
      var pKey = phEls[k].getAttribute("data-i18n-placeholder");
      var pTranslated = tr(pKey);
      if (pTranslated !== pKey) {
        phEls[k].setAttribute("placeholder", pTranslated);
      }
    }
    // data-i18n-title — title attribute
    var tEls = document.querySelectorAll("[data-i18n-title]");
    for (var t = 0; t < tEls.length; t++) {
      var tKey = tEls[t].getAttribute("data-i18n-title");
      var tTrans = tr(tKey);
      if (tTrans !== tKey) {
        tEls[t].setAttribute("title", tTrans);
      }
    }
    // Update <html lang="...">
    document.documentElement.setAttribute("lang", currentLang);
  }
  global.applyDOMTranslations = applyDOMTranslations;

  /* ── createLangSwitcher(): injects a language toggle button.
         Call after DOM is ready. Inserts into a container with id
         "langSwitcher" if it exists, otherwise floats top-right. ── */
  function createLangSwitcher() {
    var existing = document.getElementById("langSwitcher");
    if (existing) {
      renderSwitcher(existing, true);
      return;
    }
    // Create a floating switcher (fallback)
    var div = document.createElement("div");
    div.id = "langSwitcher";
    div.className = "lang-switcher";
    document.body.appendChild(div);
    renderSwitcher(div, false);
  }

  function renderSwitcher(container, isInline) {
    container.className = "lang-switcher" + (isInline ? " lang-switcher-inline" : "");
    container.innerHTML = "";
    var btnEn = document.createElement("button");
    btnEn.type = "button";
    btnEn.className = "lang-btn" + (currentLang === "en" ? " active" : "");
    btnEn.textContent = "EN";
    btnEn.setAttribute("aria-label", "English");
    btnEn.setAttribute("data-lang", "en");
    btnEn.addEventListener("click", function () { setLang("en"); });

    var btnFr = document.createElement("button");
    btnFr.type = "button";
    btnFr.className = "lang-btn" + (currentLang === "fr" ? " active" : "");
    btnFr.textContent = "FR";
    btnFr.setAttribute("aria-label", "Français");
    btnFr.setAttribute("data-lang", "fr");
    btnFr.addEventListener("click", function () { setLang("fr"); });

    container.appendChild(btnEn);
    container.appendChild(btnFr);
  }
  global.createLangSwitcher = createLangSwitcher;

  /* ── init(): call on DOMContentLoaded to set up switcher + apply
         DOM translations. JS data translations happen via tr()/trDeep()
         at render time in each page's script. ── */
  function init() {
    document.documentElement.setAttribute("lang", currentLang);
    createLangSwitcher();
    applyDOMTranslations();
  }
  global.i18nInit = init;

  // Auto-init on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
