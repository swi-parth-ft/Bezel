// Main JavaScript for interactions
document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll logic
  const header = document.querySelector('.site-header');
  
  const onScroll = () => {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);

  // 2. Intersection Observer for Reveal Animations
  const revealTargets = document.querySelectorAll('.reveal');
  revealTargets.forEach((el) => {
    const delay = el.dataset.revealDelay || el.style.animationDelay;
    if (delay) {
      el.style.setProperty('--reveal-delay', delay);
    }
  });
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));

  // 3. Bezel intro transition
  const root = document.documentElement;
  const bezelAuras = Array.from(document.querySelectorAll('.bezel-aura'));
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const runBezelIntro = () => {
    if (!bezelAuras.length) return;

    if (reducedMotionQuery.matches) {
      root.classList.remove('bezel-intro-pending', 'bezel-intro-active');
      root.classList.add('bezel-intro-complete');
      return;
    }

    const entryDurationMs = 980;
    const lineupY = window.innerHeight * 0.42;
    const gap = Math.min(26, Math.max(10, window.innerWidth * 0.012));
    const metrics = bezelAuras.map((bezel) => {
      const rect = bezel.getBoundingClientRect();
      const scale = Number.parseFloat(getComputedStyle(bezel).getPropertyValue('--bezel-lineup-scale')) || 1;
      return { bezel, rect, scale, scaledWidth: rect.width * scale };
    });
    const totalWidth = metrics.reduce((sum, item) => sum + item.scaledWidth, 0) + gap * Math.max(0, metrics.length - 1);
    let currentX = (window.innerWidth - totalWidth) / 2;

    metrics.forEach(({ bezel, rect, scaledWidth }) => {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const lineupCenterX = currentX + scaledWidth / 2;
      const lineupTranslateX = lineupCenterX - centerX;
      const lineupTranslateY = lineupY - centerY;
      const startTranslateX = -centerX - scaledWidth / 2 - 60;
      const startTranslateY = lineupTranslateY;

      bezel.style.setProperty('--bezel-lineup-x', `${Math.round(lineupTranslateX)}px`);
      bezel.style.setProperty('--bezel-lineup-y', `${Math.round(lineupTranslateY)}px`);
      bezel.style.setProperty('--bezel-start-x', `${Math.round(startTranslateX)}px`);
      bezel.style.setProperty('--bezel-start-y', `${Math.round(startTranslateY)}px`);

      currentX += scaledWidth + gap;
    });

    requestAnimationFrame(() => {
      root.classList.remove('bezel-intro-pending');
      root.classList.add('bezel-intro-lineup');
    });

    const maxDelay = metrics.reduce((max, { bezel }) => {
      const delay = Number.parseFloat(getComputedStyle(bezel).getPropertyValue('--bezel-delay')) || 0;
      return Math.max(max, delay);
    }, 0);

    window.setTimeout(() => {
      requestAnimationFrame(() => {
        root.classList.remove('bezel-intro-lineup');
        root.classList.add('bezel-intro-complete');
      });
    }, maxDelay + entryDurationMs);
  };

  if (bezelAuras.length) {
    const bezelImages = bezelAuras
      .map((bezel) => bezel.querySelector('img'))
      .filter(Boolean);
    const introReady = bezelImages.every((img) => img.complete);

    if (introReady) {
      runBezelIntro();
    } else {
      window.addEventListener('load', runBezelIntro, { once: true });
    }
  }

  // 4. Sticky horizontal showcase logic
  const showcaseSpacer = document.querySelector('#showcase-height');
  const showcaseConfigs = {
    iphone: {
      container: document.querySelector('#showcase-carousel'),
      reverse: false,
    },
    ipad: {
      container: document.querySelector('#showcase-ipad-carousel'),
      reverse: true,
    },
  };
  let activeShowcaseDevice = 'iphone';

  const setShowcasePosition = (device, progress) => {
    const config = showcaseConfigs[device];
    if (!config?.container) return;

    const maxScroll = Math.max(0, config.container.scrollWidth - config.container.clientWidth);
    config.container.scrollLeft = config.reverse
      ? (1 - progress) * maxScroll
      : progress * maxScroll;
  };

  const updateShowcaseSpacerHeight = () => {
    if (!showcaseSpacer) return;

    const activeConfig = showcaseConfigs[activeShowcaseDevice];
    if (!activeConfig?.container) return;

    const maxScroll = Math.max(0, activeConfig.container.scrollWidth - activeConfig.container.clientWidth);
    const minimumScreens = 3.5;
    const targetHeight = Math.max(
      window.innerHeight * minimumScreens,
      maxScroll + window.innerHeight
    );

    showcaseSpacer.style.height = `${Math.ceil(targetHeight)}px`;
  };

  const syncActiveShowcaseScroll = () => {
    if (!showcaseSpacer) return;

    const spacerRect = showcaseSpacer.getBoundingClientRect();
    const start = spacerRect.top + window.scrollY;
    const end = spacerRect.bottom + window.scrollY - window.innerHeight;
    const current = window.scrollY;
    const range = Math.max(1, end - start);
    let progress = (current - start) / range;
    progress = Math.max(0, Math.min(1, progress));

    Object.keys(showcaseConfigs).forEach((device) => {
      if (device === activeShowcaseDevice) {
        setShowcasePosition(device, progress);
        return;
      }

      setShowcasePosition(device, 0);
    });
  };

  window.addEventListener('scroll', syncActiveShowcaseScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateShowcaseSpacerHeight();
    syncActiveShowcaseScroll();
  });

  // 5. Device segmented toggle for the showcase gallery
  const toggle = document.querySelector('[data-showcase-toggle]');
  const toggleButtons = Array.from(document.querySelectorAll('[data-device-trigger]'));
  const showcasePanels = Array.from(document.querySelectorAll('[data-showcase-panel]'));
  const showcaseCopies = Array.from(document.querySelectorAll('[data-showcase-copy]'));
  const getDefaultShowcaseDevice = () => (
    window.matchMedia('(max-width: 767px)').matches ? 'iphone' : 'ipad'
  );

  const setActiveShowcase = (device) => {
    if (!toggle) return;

    activeShowcaseDevice = device;
    toggle.dataset.activeDevice = device;
    toggle.style.setProperty('--toggle-index', device === 'ipad' ? '1' : '0');

    toggleButtons.forEach((button) => {
      const isActive = button.dataset.deviceTrigger === device;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    showcasePanels.forEach((panel) => {
      const isActive = panel.dataset.showcasePanel === device;
      panel.classList.toggle('is-active', isActive);
      panel.setAttribute('aria-hidden', String(!isActive));
    });

    showcaseCopies.forEach((copy) => {
      copy.classList.toggle('is-active', copy.dataset.showcaseCopy === device);
    });

    updateShowcaseSpacerHeight();
    syncActiveShowcaseScroll();
  };

  if (toggle && toggleButtons.length) {
    setActiveShowcase(getDefaultShowcaseDevice());

    toggleButtons.forEach((button) => {
      button.addEventListener('click', () => {
        setActiveShowcase(button.dataset.deviceTrigger);
        button.focus();
      });
    });

    toggle.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      event.preventDefault();
      const currentIndex = toggleButtons.findIndex((button) => button.classList.contains('is-active'));
      const nextIndex = event.key === 'ArrowRight'
        ? (currentIndex + 1) % toggleButtons.length
        : (currentIndex - 1 + toggleButtons.length) % toggleButtons.length;

      const nextButton = toggleButtons[nextIndex];
      setActiveShowcase(nextButton.dataset.deviceTrigger);
      nextButton.focus();
    });
  }
});
