
const heroSliderEl = document.querySelector(".hero-slider");

if (heroSliderEl) {
  // All slides inside the slider box
  const slides = heroSliderEl.querySelectorAll(".slide");

  // Random order [0,1,2] so each visit can start on a different slide (fair shuffle)
  const slideOrder = shuffleThree([0, 1, 2]);

  let currentPosition = 0; // which slot in slideOrder we are showing (0, 1, or 2)

  function showSlideAtOrderIndex(orderIndex) {
    const slideIndexToShow = slideOrder[orderIndex];
    slides.forEach((slide, i) => {
      const isActive = i === slideIndexToShow;
      slide.classList.toggle("active-slide", isActive);
    });
  }

  function goToNextSlide() {
    currentPosition = currentPosition + 1;
    if (currentPosition >= slideOrder.length) {
      currentPosition = 0;
    }
    showSlideAtOrderIndex(currentPosition);
  }

  // Change slide every 5 seconds (5000 ms)
  setInterval(goToNextSlide, 5000);

  // Show the first slide immediately when the page loads
  showSlideAtOrderIndex(0);
}

/**
 * Shuffles a copy of [0,1,2] — classic “swap with random earlier index” idea.
 * Beginners: we only need this so slide A, B, C can appear in random order.
 */
function shuffleThree(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

// =============================================================================
// 2) MOBILE NAV — hamburger menu + drawer (only if those IDs exist on the page)
// =============================================================================
// Wrapped in a function that runs immediately: (function () { ... })();
// That keeps our “nav” variables inside this block so they don’t clash with other code.

(function setupMobileNav() {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-menu-toggle");
  const drawer = document.getElementById("nav-mobile-drawer");
  const backdrop = document.getElementById("nav-backdrop");

  // If any piece is missing, this page has no mobile menu — stop here.
  if (!nav || !toggle || !drawer || !backdrop) {
    return;
  }

  function setMenuOpen(shouldOpen) {
    nav.classList.toggle("site-nav--open", shouldOpen);
    drawer.classList.toggle("nav-mobile-drawer--open", shouldOpen);
    drawer.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
    backdrop.hidden = !shouldOpen;
    toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    document.body.classList.toggle("nav-open", shouldOpen);

    if (shouldOpen) {
      const firstLink = drawer.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    } else {
      toggle.focus();
    }
  }

  function isMenuOpen() {
    return nav.classList.contains("site-nav--open");
  }

  // Tap the hamburger: flip open / closed
  toggle.addEventListener("click", function () {
    setMenuOpen(!isMenuOpen());
  });

  // Tap the dark overlay behind the menu: close
  backdrop.addEventListener("click", function () {
    setMenuOpen(false);
  });

  // Tap any link in the drawer: close menu (user is navigating away)
  drawer.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  // Press Escape on the keyboard: close menu
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isMenuOpen()) {
      setMenuOpen(false);
    }
  });

  // Tell CSS how tall the nav bar is (px). Used for padding / drawer position when the bar wraps on small screens.
  function syncNavHeightToCssVariable() {
    const heightPx = Math.round(nav.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--site-nav-height", heightPx + "px");
  }

  syncNavHeightToCssVariable();
  window.addEventListener("resize", syncNavHeightToCssVariable);
  window.addEventListener("orientationchange", syncNavHeightToCssVariable);
})();

// =============================================================================
// 3) CROWDFEED TABS — “Trending” vs “Most funded” on the home page
// =============================================================================
// If there are no tabs (another page), querySelectorAll returns an empty list — we do nothing.

const crowdTabs = document.querySelectorAll(".crowdfeed__tab");
const crowdPanels = document.querySelectorAll(".crowdfeed__panel");

if (crowdTabs.length > 0) {
  crowdTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const panelId = tab.getAttribute("data-panel");
      const panel = panelId ? document.getElementById(panelId) : null;

      if (!panel) {
        return;
      }

      // Remove “active” styling from all tabs and all panels
      crowdTabs.forEach(function (t) {
        t.classList.remove("crowdfeed__tab--active");
      });
      crowdPanels.forEach(function (p) {
        p.classList.remove("active");
      });

      // Turn on the clicked tab and its matching panel
      tab.classList.add("crowdfeed__tab--active");
      panel.classList.add("active");
    });
  });
}
