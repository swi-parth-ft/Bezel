// Main JavaScript for interactions
document.documentElement.dataset.runtime = import.meta.env.DEV ? 'local' : 'live';

const pathname = window.location.pathname;
const forceLightContentPage = pathname.startsWith('/features/') || pathname.startsWith('/guides/');

if (forceLightContentPage) {
  document.documentElement.classList.remove('dark');
  document.documentElement.dataset.theme = 'light';
  document.documentElement.style.colorScheme = 'light';
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll logic
  const headerChrome = document.querySelector('.site-chrome');
  const header = document.querySelector('.site-header');
  const headerMenuToggle = document.querySelector('[data-header-menu-toggle]');
  const headerMenuPanel = document.querySelector('[data-header-menu-panel]');
  const isDesktopHeader = () => window.matchMedia('(min-width: 768px)').matches;

  const setHeaderMenuOpen = (open) => {
    if (!headerChrome || !headerMenuToggle || !headerMenuPanel) return;

    headerChrome.classList.toggle('is-menu-open', open);
    headerMenuToggle.setAttribute('aria-expanded', String(open));
    headerMenuPanel.setAttribute('aria-hidden', String(!open));
  };
  
  const onScroll = () => {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }

    if (headerChrome) {
      const shouldCollapse = isDesktopHeader() && window.scrollY > 8;
      headerChrome.classList.toggle('is-collapsed', shouldCollapse);

      if (!shouldCollapse) {
        setHeaderMenuOpen(false);
      }
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);

  if (headerMenuToggle && headerChrome) {
    headerMenuToggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isDesktopHeader() && !headerChrome.classList.contains('is-collapsed')) return;

      const isOpen = headerChrome.classList.contains('is-menu-open');
      setHeaderMenuOpen(!isOpen);
    });
  }

  document.addEventListener('click', (event) => {
    if (!headerChrome || !headerChrome.classList.contains('is-menu-open')) return;
    if (headerChrome.contains(event.target)) return;
    setHeaderMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    setHeaderMenuOpen(false);
  });

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

  // 4. Swipeable power-features logic
  const powerFeaturesViewport = document.querySelector('#power-features-viewport');
  const powerFeatureSlides = Array.from(document.querySelectorAll('[data-power-slide]'));
  const powerPrevButton = document.querySelector('[data-power-nav="prev"]');
  const powerNextButton = document.querySelector('[data-power-nav="next"]');
  const powerDotButtons = Array.from(document.querySelectorAll('[data-power-dot]'));
  const isMobilePowerFeatures = () => window.matchMedia('(max-width: 767px)').matches;
  const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
  let powerAnimationFrame = null;
  let powerSwipeDragState = null;
  let powerSuppressClick = false;
  let powerActiveSlideIndex = 0;
  let powerVisibleSlideIndex = 0;
  let powerDesktopTransition = null;
  let powerWheelGesture = {
    deltaX: 0,
    deltaY: 0,
    lastEventTime: 0,
    isLocked: false,
    resetTimer: null,
  };

  const resetPowerWheelGesture = () => {
    if (powerWheelGesture.resetTimer) {
      window.clearTimeout(powerWheelGesture.resetTimer);
    }

    powerWheelGesture.deltaX = 0;
    powerWheelGesture.deltaY = 0;
    powerWheelGesture.lastEventTime = 0;
    powerWheelGesture.isLocked = false;
    powerWheelGesture.resetTimer = null;
  };

  const schedulePowerWheelGestureReset = () => {
    if (powerWheelGesture.resetTimer) {
      window.clearTimeout(powerWheelGesture.resetTimer);
    }

    powerWheelGesture.resetTimer = window.setTimeout(() => {
      resetPowerWheelGesture();
    }, 180);
  };

  const clampPowerSlideIndex = (index) => (
    Math.max(0, Math.min(powerFeatureSlides.length - 1, index))
  );

  const syncPowerControls = (index) => {
    const clampedIndex = clampPowerSlideIndex(index);
    powerVisibleSlideIndex = clampedIndex;

    powerDotButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === clampedIndex;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    if (powerPrevButton) {
      powerPrevButton.disabled = clampedIndex === 0;
    }

    if (powerNextButton) {
      powerNextButton.disabled = clampedIndex === powerFeatureSlides.length - 1;
    }
  };

  const scrollPowerSlideIntoView = (index) => {
    if (!powerFeaturesViewport || !powerFeatureSlides.length) return;

    const clampedIndex = clampPowerSlideIndex(index);
    const targetSlide = powerFeatureSlides[clampedIndex];
    if (!targetSlide) return;

    const targetLeft = targetSlide.offsetLeft - ((powerFeaturesViewport.clientWidth - targetSlide.offsetWidth) / 2);
    powerFeaturesViewport.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
    syncPowerControls(clampedIndex);
  };

  const hidePowerSlide = (slide) => {
    slide.style.setProperty('--power-opacity', '0');
    slide.style.setProperty('--power-blur', '10px');
    slide.style.setProperty('--power-translate-y', '12px');
    slide.style.setProperty('--power-swipe-x', '0px');
    slide.style.setProperty('--power-copy-y', '10px');
    slide.style.setProperty('--power-media-y', '6px');
    slide.style.setProperty('--power-scale', '0.992');
    slide.style.zIndex = '0';
    slide.classList.remove('is-active');
  };

  const showPowerSlide = (slide, index, strength, swipeX = 0) => {
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
    slide.style.setProperty('--power-swipe-x', `${swipeX.toFixed(2)}px`);
    slide.style.setProperty('--power-copy-y', `${copyY.toFixed(2)}px`);
    slide.style.setProperty('--power-media-y', `${mediaY.toFixed(2)}px`);
    slide.style.setProperty('--power-scale', scale.toFixed(4));
    slide.style.zIndex = String(100 + Math.round(clamped * 10) - index);
    slide.classList.toggle('is-active', clamped > 0.92);
  };

  const renderDesktopPowerState = (fromIndex, toIndex, progress = 1, direction = 1) => {
    if (!powerFeatureSlides.length) return;

    powerFeatureSlides.forEach(hidePowerSlide);

    if (fromIndex === toIndex) {
      showPowerSlide(powerFeatureSlides[toIndex], toIndex, 1, 0);
      return;
    }

    const clampedProgress = Math.max(0, Math.min(1, progress));

    if (clampedProgress <= 0.001) {
      showPowerSlide(powerFeatureSlides[fromIndex], fromIndex, 1, 0);
      syncPowerControls(fromIndex);
      return;
    }

    if (clampedProgress >= 0.999) {
      showPowerSlide(powerFeatureSlides[toIndex], toIndex, 1, 0);
      syncPowerControls(toIndex);
      return;
    }

    const eased = easeOutCubic(clampedProgress);
    const viewportWidth = powerFeaturesViewport?.clientWidth || window.innerWidth;
    const travel = Math.min(180, Math.max(96, viewportWidth * 0.12));
    const outgoingX = -direction * travel * eased;
    const incomingX = direction * travel * (1 - eased);
    const outgoingStrength = 1 - eased;
    const incomingStrength = eased;

    showPowerSlide(powerFeatureSlides[fromIndex], fromIndex, outgoingStrength, outgoingX);
    showPowerSlide(powerFeatureSlides[toIndex], toIndex, incomingStrength, incomingX);
    syncPowerControls(clampedProgress >= 0.5 ? toIndex : fromIndex);
  };

  const renderMobilePowerState = () => {
    if (!powerFeaturesViewport || !powerFeatureSlides.length) return;

    if (powerFeatureSlides.length === 1) {
      showPowerSlide(powerFeatureSlides[0], 0, 1);
      syncPowerControls(0);
      return;
    }

    const viewportRect = powerFeaturesViewport.getBoundingClientRect();
    const viewportCenter = viewportRect.left + (viewportRect.width / 2);
    let strongestIndex = 0;
    let strongestStrength = -1;

    powerFeatureSlides.forEach((slide, index) => {
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + (slideRect.width / 2);
      const distanceRatio = Math.abs(slideCenter - viewportCenter) / Math.max(1, viewportRect.width);
      const localStrength = Math.max(0, 1 - Math.min(distanceRatio, 1));
      showPowerSlide(slide, index, easeOutCubic(localStrength));

      if (localStrength > strongestStrength) {
        strongestStrength = localStrength;
        strongestIndex = index;
      }
    });

    syncPowerControls(strongestIndex);
  };

  const renderPowerFeatures = () => {
    powerAnimationFrame = null;

    if (!powerFeaturesViewport || !powerFeatureSlides.length) return;

    if (isMobilePowerFeatures()) {
      powerDesktopTransition = null;
      renderMobilePowerState();
      return;
    }

    if (powerDesktopTransition) return;
    renderDesktopPowerState(powerActiveSlideIndex, powerActiveSlideIndex, 1);
    syncPowerControls(powerActiveSlideIndex);
  };

  const queuePowerFeaturesSwipeRender = () => {
    if (powerAnimationFrame) return;
    powerAnimationFrame = window.requestAnimationFrame(renderPowerFeatures);
  };

  const animatePowerSlideTo = (nextIndex) => {
    if (!powerFeatureSlides.length) return;

    const clampedIndex = clampPowerSlideIndex(nextIndex);

    if (powerDesktopTransition) {
      window.cancelAnimationFrame(powerAnimationFrame);
      powerAnimationFrame = null;
      powerActiveSlideIndex = powerDesktopTransition.toIndex;
      powerDesktopTransition = null;
    }

    if (clampedIndex === powerActiveSlideIndex) {
      queuePowerFeaturesSwipeRender();
      return;
    }

    const fromIndex = powerActiveSlideIndex;
    powerActiveSlideIndex = clampedIndex;
    syncPowerControls(clampedIndex);
    powerDesktopTransition = {
      fromIndex,
      toIndex: clampedIndex,
      direction: clampedIndex > fromIndex ? 1 : -1,
      startTime: performance.now(),
      duration: 420,
    };

    const stepTransition = (now) => {
      if (!powerDesktopTransition) {
        powerAnimationFrame = null;
        return;
      }

      const progress = Math.min(1, (now - powerDesktopTransition.startTime) / powerDesktopTransition.duration);
      renderDesktopPowerState(
        powerDesktopTransition.fromIndex,
        powerDesktopTransition.toIndex,
        progress,
        powerDesktopTransition.direction
      );

      if (progress < 1) {
        powerAnimationFrame = window.requestAnimationFrame(stepTransition);
        return;
      }

      powerDesktopTransition = null;
      powerAnimationFrame = null;
      queuePowerFeaturesSwipeRender();
    };

    if (powerAnimationFrame) {
      window.cancelAnimationFrame(powerAnimationFrame);
    }

    powerAnimationFrame = window.requestAnimationFrame(stepTransition);
  };

  const goToPowerSlide = (index) => {
    const clampedIndex = clampPowerSlideIndex(index);

    if (isMobilePowerFeatures()) {
      scrollPowerSlideIntoView(clampedIndex);
      return;
    }

    animatePowerSlideTo(clampedIndex);
  };

  if (powerFeaturesViewport && powerFeatureSlides.length) {
    queuePowerFeaturesSwipeRender();
    powerFeaturesViewport.addEventListener('scroll', () => {
      if (!isMobilePowerFeatures()) return;
      queuePowerFeaturesSwipeRender();
    }, { passive: true });
    window.addEventListener('resize', queuePowerFeaturesSwipeRender);
    window.addEventListener('load', queuePowerFeaturesSwipeRender);

    powerFeaturesViewport.addEventListener('pointerdown', (event) => {
      if (isMobilePowerFeatures()) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest('a, button')) return;

      powerSwipeDragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        deltaX: 0,
        deltaY: 0,
        dragged: false,
      };

      powerFeaturesViewport.classList.add('is-dragging');
      powerFeaturesViewport.setPointerCapture(event.pointerId);
    });

    powerFeaturesViewport.addEventListener('pointermove', (event) => {
      if (!powerSwipeDragState || event.pointerId !== powerSwipeDragState.pointerId) return;

      powerSwipeDragState.deltaX = event.clientX - powerSwipeDragState.startX;
      powerSwipeDragState.deltaY = event.clientY - powerSwipeDragState.startY;

      if (Math.abs(powerSwipeDragState.deltaX) > 6) {
        powerSwipeDragState.dragged = true;
      }
    });

    const finishPowerSwipeDrag = (event) => {
      if (!powerSwipeDragState || event.pointerId !== powerSwipeDragState.pointerId) return;

      const { deltaX, deltaY, dragged } = powerSwipeDragState;
      const passedThreshold = Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY);

      powerSuppressClick = dragged;
      powerSwipeDragState = null;
      powerFeaturesViewport.classList.remove('is-dragging');

      if (!isMobilePowerFeatures() && passedThreshold) {
        animatePowerSlideTo(deltaX < 0 ? powerActiveSlideIndex + 1 : powerActiveSlideIndex - 1);
        return;
      }

      queuePowerFeaturesSwipeRender();
    };

    powerFeaturesViewport.addEventListener('pointerup', finishPowerSwipeDrag);
    powerFeaturesViewport.addEventListener('pointercancel', finishPowerSwipeDrag);
    powerFeaturesViewport.addEventListener('lostpointercapture', () => {
      powerSwipeDragState = null;
      powerFeaturesViewport.classList.remove('is-dragging');
      powerSuppressClick = false;
    });

    powerFeaturesViewport.addEventListener('keydown', (event) => {
      if (isMobilePowerFeatures()) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      event.preventDefault();
      animatePowerSlideTo(
        event.key === 'ArrowRight' ? powerActiveSlideIndex + 1 : powerActiveSlideIndex - 1
      );
    });

    powerFeaturesViewport.addEventListener('wheel', (event) => {
      if (isMobilePowerFeatures()) return;

      const now = performance.now();
      const deltaX = event.deltaX;
      const deltaY = event.deltaY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const horizontalIntent = absX > 4 && absX > absY * 1.15;

      if (!horizontalIntent) return;

      event.preventDefault();

      if (now - powerWheelGesture.lastEventTime > 180) {
        powerWheelGesture.deltaX = 0;
        powerWheelGesture.deltaY = 0;
        powerWheelGesture.isLocked = false;
      }

      powerWheelGesture.deltaX += deltaX;
      powerWheelGesture.deltaY += deltaY;
      powerWheelGesture.lastEventTime = now;
      schedulePowerWheelGestureReset();

      if (powerWheelGesture.isLocked) return;

      if (Math.abs(powerWheelGesture.deltaX) < 48) return;

      powerWheelGesture.isLocked = true;
      animatePowerSlideTo(
        powerWheelGesture.deltaX > 0 ? powerActiveSlideIndex + 1 : powerActiveSlideIndex - 1
      );
    }, { passive: false });

    powerFeaturesViewport.addEventListener('click', (event) => {
      if (!powerSuppressClick) return;

      if (event.target instanceof Element && event.target.closest('a, button')) {
        powerSuppressClick = false;
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      powerSuppressClick = false;
    }, true);
  }

  if (powerPrevButton) {
    powerPrevButton.addEventListener('click', () => {
      goToPowerSlide(powerVisibleSlideIndex - 1);
    });
  }

  if (powerNextButton) {
    powerNextButton.addEventListener('click', () => {
      goToPowerSlide(powerVisibleSlideIndex + 1);
    });
  }

  if (powerDotButtons.length) {
    powerDotButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        goToPowerSlide(index);
        button.focus();
      });
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

    if (!isMobilePowerFeatures()) {
      powerActiveSlideIndex = 0;
      powerDesktopTransition = null;
      resetPowerWheelGesture();
      syncPowerControls(0);
    }

    queuePowerFeaturesSwipeRender();
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

  // 6. Sticky horizontal showcase logic
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

  // 9. GA4 tracking for App Store CTA clicks
  const trackEvent = (name, params = {}) => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params);
  };

  const normalizeLabel = (value) => (
    (value || '')
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase()
  );

  const shouldTrackWithoutDelay = (event, link) => (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    link.target === '_blank' ||
    link.hasAttribute('download')
  );

  const getAppStoreSection = (link) => {
    const sectionRoot = link.closest('[data-power-slide], section[id], header, footer, nav, main');
    if (!sectionRoot) return 'page';
    if (sectionRoot.matches('header')) return 'header';
    if (sectionRoot.matches('footer')) return 'footer';
    if (sectionRoot.matches('nav')) return 'nav';
    if (sectionRoot.matches('main')) return 'main';
    if (sectionRoot.hasAttribute('data-power-slide')) {
      return `power-${sectionRoot.getAttribute('data-power-slide')}`;
    }
    return sectionRoot.id || 'section';
  };

  const getPageType = (pathname) => {
    if (pathname === '/' || pathname === '/index.html') return 'home';
    if (pathname.includes('/features/')) return 'feature';
    if (pathname.includes('/guides/')) return 'guide';
    if (pathname === '/privacy.html') return 'privacy';
    return 'site';
  };

  const appStoreLinks = Array.from(document.querySelectorAll('a[href*="apps.apple.com"]'));
  appStoreLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const text = normalizeLabel(link.textContent);
      const pathname = window.location.pathname;
      const pageType = getPageType(pathname);
      const section = getAppStoreSection(link);
      const appStorePayload = {
        page_type: pageType,
        page_path: pathname,
        link_text: text || 'app store',
        section,
        destination_host: 'apps.apple.com',
        transport_type: 'beacon',
      };
      const featurePayload = {
        feature_slug: pathname.split('/').pop()?.replace(/\.html$/, '') || 'feature',
        link_text: text || 'app store',
        section,
        transport_type: 'beacon',
      };

      if (shouldTrackWithoutDelay(event, link)) {
        trackEvent('app_store_click', appStorePayload);

        if (pageType === 'feature') {
          trackEvent('feature_cta_click', featurePayload);
        }
        return;
      }

      event.preventDefault();
      trackEvent('app_store_click', appStorePayload);

      if (pageType === 'feature') {
        trackEvent('feature_cta_click', featurePayload);
      }

      // Give GA4 time to flush outbound-click beacons before navigating away.
      window.setTimeout(() => {
        window.location.assign(link.href);
      }, 180);
    });
  });

  // 10. GA4 tracking for internal feature page clicks
  const featureLinks = Array.from(document.querySelectorAll('a[href*="/features/"]'));
  featureLinks.forEach((link) => {
    link.addEventListener('click', () => {
      let targetUrl;
      try {
        targetUrl = new URL(link.href, window.location.origin);
      } catch {
        return;
      }

      if (!targetUrl.pathname.includes('/features/')) return;

      const pathname = window.location.pathname;
      const destinationPath = targetUrl.pathname;
      if (destinationPath === pathname) return;

      const text = normalizeLabel(link.textContent);
      trackEvent('feature_page_click', {
        page_type: getPageType(pathname),
        page_path: pathname,
        feature_path: destinationPath,
        link_text: text || 'feature',
        section: getAppStoreSection(link),
      });
    });
  });

  // 11. GA4 tracking for internal guide CTA clicks
  const guideLinks = Array.from(document.querySelectorAll('a[href*="/guides/"]'));
  guideLinks.forEach((link) => {
    link.addEventListener('click', () => {
      let targetUrl;
      try {
        targetUrl = new URL(link.href, window.location.origin);
      } catch {
        return;
      }

      if (!targetUrl.pathname.includes('/guides/')) return;

      const pathname = window.location.pathname;
      const destinationPath = targetUrl.pathname;
      if (destinationPath === pathname) return;

      const text = normalizeLabel(link.textContent);
      trackEvent('guide_cta_click', {
        page_type: getPageType(pathname),
        page_path: pathname,
        guide_path: destinationPath,
        link_text: text || 'guide',
        section: getAppStoreSection(link),
      });
    });
  });

});
