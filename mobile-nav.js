/* ============================================================
   mobile-nav.js — Mobile sidebar overlay handler
   Adds a backdrop overlay when the sidebar is open on mobile,
   and closes the sidebar when the overlay is tapped.
   Works with all training pages that have #sidebar and #mobileMenuBtn.
   
   This script does NOT toggle the sidebar — the page-specific JS
   already does that. This script only:
   1. Creates an overlay backdrop element
   2. Watches the sidebar for class changes (MutationObserver)
   3. Shows/hides the overlay in sync with the sidebar
   4. Closes the sidebar when the overlay is tapped
   5. For pages where the page JS doesn't handle the menu button,
      provides a fallback toggle
   ============================================================ */
(function () {
  "use strict";

  function initMobileNav() {
    var sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    var menuBtn = document.getElementById("mobileMenuBtn");

    // Create overlay element if it doesn't exist
    var overlay = document.querySelector(".sidebar-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "sidebar-overlay";
      document.body.appendChild(overlay);
    }

    // Sync overlay with sidebar open state via MutationObserver
    var observer = new MutationObserver(function () {
      if (sidebar.classList.contains("open")) {
        overlay.classList.add("show");
      } else {
        overlay.classList.remove("show");
      }
    });
    observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });

    // Close sidebar when overlay is clicked
    overlay.addEventListener("click", function () {
      sidebar.classList.remove("open");
      overlay.classList.remove("show");
    });

    // Close sidebar when a nav button inside it is clicked (on mobile)
    var navBtns = sidebar.querySelectorAll(".nav-btn");
    navBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (window.innerWidth <= 860) {
          setTimeout(function () {
            sidebar.classList.remove("open");
            overlay.classList.remove("show");
          }, 200);
        }
      });
    });

    // Close sidebar on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
      }
    });

    // Close sidebar when resizing to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
      }
    });

    // Fallback: if the menu button has no click handler from page JS,
    // add one. We use a flag to avoid double-binding.
    if (menuBtn && !menuBtn.__mobileNavBound) {
      menuBtn.__mobileNavBound = true;
      // Use a capturing listener that checks if the sidebar state changed
      // after the event. If it didn't (meaning page JS didn't handle it),
      // we toggle it ourselves.
      menuBtn.addEventListener("click", function () {
        var wasOpen = sidebar.classList.contains("open");
        // Wait for bubble phase to complete (page JS runs in bubble phase)
        setTimeout(function () {
          if (wasOpen === sidebar.classList.contains("open")) {
            // Page JS didn't toggle it, so we do
            sidebar.classList.toggle("open");
          }
        }, 0);
      });
    }

    // Initial sync
    if (sidebar.classList.contains("open")) {
      overlay.classList.add("show");
    }
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNav);
  } else {
    initMobileNav();
  }
})();
