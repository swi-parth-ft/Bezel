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

  // 3. Promo Timer Logic
  function updatePromoTimer() {
    const timerElements = document.querySelectorAll('.promo-timer');
    if (!timerElements.length) return;

    const now = new Date();
    const target = new Date(now);
    target.setHours(2, 0, 0, 0); // 2 AM today

    if (now > target) {
      target.setDate(target.getDate() + 1); // 2 AM tomorrow
    }

    const diff = target - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');

    timerElements.forEach((timerElement) => {
      timerElement.textContent = `Ends in ${h}:${m}:${s}`;
    });
  }

    updatePromoTimer();
    setInterval(updatePromoTimer, 1000);
  
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
