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

  // 3. Shared device family default
  const getDefaultDeviceFamily = () => (
    window.matchMedia('(max-width: 767px)').matches ? 'iphone' : 'ipad'
  );

  // 4. Sticky horizontal power-features logic
  const powerFeaturesSpacer = document.querySelector('#power-features-height');
  const powerFeaturesViewport = document.querySelector('#power-features-viewport');
  const powerFeatureSlides = Array.from(document.querySelectorAll('[data-power-slide]'));
  const isMobilePowerFeatures = () => window.matchMedia('(max-width: 767px)').matches;
  const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
  let targetPowerProgress = 0;
  let renderedPowerProgress = 0;
  let powerAnimationFrame = null;
  let powerScrollIdleTimeout = null;
  const hidePowerSlide = (slide, index) => {
    slide.style.setProperty('--power-opacity', '0');
    slide.style.setProperty('--power-blur', '10px');
    slide.style.setProperty('--power-translate-y', '12px');
    slide.style.setProperty('--power-copy-y', '10px');
    slide.style.setProperty('--power-media-y', '6px');
    slide.style.setProperty('--power-scale', '0.992');
    slide.style.zIndex = '0';
  };
  const showPowerSlide = (slide, index, strength) => {
    const clamped = Math.max(0, Math.min(1, strength));
    const opacity = clamped;
    const blur = (1 - clamped) * 8;
    const translateY = (1 - clamped) * 10;
    const copyY = (1 - clamped) * 8;
    const mediaY = (1 - clamped) * 4;
    const scale = 1 - ((1 - clamped) * 0.012);

    slide.style.setProperty('--power-opacity', opacity.toFixed(4));
    slide.style.setProperty('--power-blur', `${blur.toFixed(2)}px`);
    slide.style.setProperty('--power-translate-y', `${translateY.toFixed(2)}px`);
    slide.style.setProperty('--power-copy-y', `${copyY.toFixed(2)}px`);
    slide.style.setProperty('--power-media-y', `${mediaY.toFixed(2)}px`);
    slide.style.setProperty('--power-scale', scale.toFixed(4));
    slide.style.zIndex = String(100 + Math.round(clamped * 10) - index);
  };
  const resetPowerFeaturesStage = () => {
    if (powerAnimationFrame) {
      window.cancelAnimationFrame(powerAnimationFrame);
      powerAnimationFrame = null;
    }

    powerFeatureSlides.forEach((slide, index) => {
      slide.style.removeProperty('--power-opacity');
      slide.style.removeProperty('--power-blur');
      slide.style.removeProperty('--power-translate-y');
      slide.style.removeProperty('--power-copy-y');
      slide.style.removeProperty('--power-media-y');
      slide.style.removeProperty('--power-scale');
      slide.style.zIndex = String(powerFeatureSlides.length - index);
    });
  };

  const renderPowerFeaturesStage = () => {
    powerAnimationFrame = null;
    renderedPowerProgress += (targetPowerProgress - renderedPowerProgress) * 0.14;

    if (Math.abs(targetPowerProgress - renderedPowerProgress) < 0.0008) {
      renderedPowerProgress = targetPowerProgress;
    }

    setPowerFeaturesStage(renderedPowerProgress);

    if (Math.abs(targetPowerProgress - renderedPowerProgress) >= 0.0008) {
      powerAnimationFrame = window.requestAnimationFrame(renderPowerFeaturesStage);
    }
  };

  const schedulePowerFeaturesRender = () => {
    if (powerAnimationFrame) return;
    powerAnimationFrame = window.requestAnimationFrame(renderPowerFeaturesStage);
  };

  const snapPowerFeaturesToNearestSlide = () => {
    if (!powerFeatureSlides.length) return;

    const lastIndex = Math.max(0, powerFeatureSlides.length - 1);
    if (lastIndex === 0) {
      targetPowerProgress = 0;
      renderedPowerProgress = 0;
      setPowerFeaturesStage(0);
      return;
    }

    const snappedIndex = Math.round(targetPowerProgress * lastIndex);
    targetPowerProgress = snappedIndex / lastIndex;
    schedulePowerFeaturesRender();
  };

  const setPowerFeaturesStage = (progress) => {
    if (!powerFeatureSlides.length) return;

    const lastIndex = Math.max(0, powerFeatureSlides.length - 1);
    if (lastIndex === 0) {
      showPowerSlide(powerFeatureSlides[0], 0, 1);
      return;
    }

    const stageProgress = progress * lastIndex;
    const baseIndex = Math.min(lastIndex, Math.floor(stageProgress));
    const nextIndex = Math.min(lastIndex, baseIndex + 1);
    const localProgress = stageProgress - baseIndex;
    const transitionStart = 0.18;
    const transitionEnd = 0.9;

    powerFeatureSlides.forEach(hidePowerSlide);

    if (baseIndex === nextIndex) {
      showPowerSlide(powerFeatureSlides[baseIndex], baseIndex, 1);
      return;
    }

    if (localProgress <= transitionStart) {
      showPowerSlide(powerFeatureSlides[baseIndex], baseIndex, 1);
      return;
    }

    if (localProgress >= transitionEnd) {
      showPowerSlide(powerFeatureSlides[nextIndex], nextIndex, 1);
      return;
    }

    const transitionProgress = easeOutCubic(
      (localProgress - transitionStart) / (transitionEnd - transitionStart)
    );

    showPowerSlide(powerFeatureSlides[baseIndex], baseIndex, 1 - transitionProgress);
    showPowerSlide(powerFeatureSlides[nextIndex], nextIndex, transitionProgress);
  };

  const updatePowerFeaturesSpacerHeight = () => {
    if (!powerFeaturesSpacer || !powerFeaturesViewport || !powerFeatureSlides.length) return;

    if (isMobilePowerFeatures()) {
      powerFeaturesSpacer.style.height = 'auto';
      resetPowerFeaturesStage();
      return;
    }

    const slideScreens = Math.max(3.6, powerFeatureSlides.length * 0.62);
    const targetHeight = window.innerHeight * slideScreens;

    powerFeaturesSpacer.style.height = `${Math.ceil(targetHeight)}px`;
  };

  const updatePowerFeaturesTargetProgress = () => {
    if (!powerFeaturesSpacer || !powerFeaturesViewport) return;

    if (isMobilePowerFeatures()) {
      targetPowerProgress = 0;
      resetPowerFeaturesStage();
      return;
    }

    const spacerRect = powerFeaturesSpacer.getBoundingClientRect();
    const start = spacerRect.top + window.scrollY;
    const end = spacerRect.bottom + window.scrollY - window.innerHeight;
    const current = window.scrollY;
    const range = Math.max(1, end - start);
    let progress = (current - start) / range;
    progress = Math.max(0, Math.min(1, progress));
    targetPowerProgress = progress;
    schedulePowerFeaturesRender();
  };

  const syncPowerFeaturesScroll = () => {
    if (!powerFeaturesSpacer || !powerFeaturesViewport) return;

    if (isMobilePowerFeatures()) {
      if (powerScrollIdleTimeout) {
        window.clearTimeout(powerScrollIdleTimeout);
        powerScrollIdleTimeout = null;
      }
      targetPowerProgress = 0;
      renderedPowerProgress = 0;
      resetPowerFeaturesStage();
      return;
    }

    updatePowerFeaturesTargetProgress();

    if (powerScrollIdleTimeout) {
      window.clearTimeout(powerScrollIdleTimeout);
    }

    powerScrollIdleTimeout = window.setTimeout(() => {
      powerScrollIdleTimeout = null;
      snapPowerFeaturesToNearestSlide();
    }, 120);
  };

  if (powerFeaturesSpacer && powerFeaturesViewport && powerFeatureSlides.length) {
    updatePowerFeaturesSpacerHeight();
    renderedPowerProgress = targetPowerProgress = 0;
    syncPowerFeaturesScroll();

    window.addEventListener('scroll', syncPowerFeaturesScroll, { passive: true });
    window.addEventListener('resize', () => {
      updatePowerFeaturesSpacerHeight();
      syncPowerFeaturesScroll();
    });
    window.addEventListener('load', () => {
      updatePowerFeaturesSpacerHeight();
      syncPowerFeaturesScroll();
    });
  }

  // 5. Power feature device toggle
  const powerToggle = document.querySelector('[data-power-toggle]');
  const powerToggleButtons = Array.from(document.querySelectorAll('[data-power-device-trigger]'));
  const powerImages = Array.from(document.querySelectorAll('[data-power-image]'));
  const powerMediaFrames = Array.from(document.querySelectorAll('[data-power-media]'));

  const setActivePowerDevice = (device) => {
    if (!powerToggle) return;

    powerToggle.dataset.activeDevice = device;
    powerToggle.style.setProperty('--toggle-index', device === 'ipad' ? '1' : '0');
    powerFeaturesViewport?.classList.toggle('is-ipad', device === 'ipad');
    powerFeaturesViewport?.classList.toggle('is-iphone', device !== 'ipad');

    powerToggleButtons.forEach((button) => {
      const isActive = button.dataset.powerDeviceTrigger === device;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    powerImages.forEach((image) => {
      const nextSrc = image.dataset[device === 'ipad' ? 'ipadSrc' : 'iphoneSrc'];
      if (nextSrc && image.getAttribute('src') !== nextSrc) {
        image.setAttribute('src', nextSrc);
      }
    });

    powerMediaFrames.forEach((frame) => {
      frame.classList.toggle('is-ipad', device === 'ipad');
    });

    updatePowerFeaturesSpacerHeight();
    syncPowerFeaturesScroll();
  };

  if (powerToggle && powerToggleButtons.length) {
    setActivePowerDevice(getDefaultDeviceFamily());

    powerToggleButtons.forEach((button) => {
      button.addEventListener('click', () => {
        setActivePowerDevice(button.dataset.powerDeviceTrigger);
        button.focus();
      });
    });

    powerToggle.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      event.preventDefault();
      const currentIndex = powerToggleButtons.findIndex((button) => button.classList.contains('is-active'));
      const nextIndex = event.key === 'ArrowRight'
        ? (currentIndex + 1) % powerToggleButtons.length
        : (currentIndex - 1 + powerToggleButtons.length) % powerToggleButtons.length;

      const nextButton = powerToggleButtons[nextIndex];
      setActivePowerDevice(nextButton.dataset.powerDeviceTrigger);
      nextButton.focus();
    });
  }

  // 6. Bezel intro transition
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

  // 7. Sticky horizontal showcase logic
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
  const isMobileShowcase = () => window.matchMedia('(max-width: 767px)').matches;

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

    if (isMobileShowcase()) {
      showcaseSpacer.style.height = 'auto';
      return;
    }

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

    if (isMobileShowcase()) {
      Object.keys(showcaseConfigs).forEach((device) => {
        setShowcasePosition(device, 0);
      });
      return;
    }

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

  // 8. Device segmented toggle for the showcase gallery
  const toggle = document.querySelector('[data-showcase-toggle]');
  const toggleButtons = Array.from(document.querySelectorAll('[data-device-trigger]'));
  const showcasePanels = Array.from(document.querySelectorAll('[data-showcase-panel]'));
  const showcaseCopies = Array.from(document.querySelectorAll('[data-showcase-copy]'));
  const getDefaultShowcaseDevice = () => getDefaultDeviceFamily();

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
