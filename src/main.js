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
  const getDefaultDeviceFamily = () => {
    if (window.matchMedia('(max-width: 767px)').matches) return 'iphone';
    if (window.matchMedia('(max-width: 1279px)').matches) return 'ipad';
    return 'mac';
  };

  const getSupportedDeviceFamily = (image, buttons = [], preferred = getDefaultDeviceFamily()) => {
    const supportedByButtons = buttons
      .map((button) => button.dataset.powerMediaDevice || button.dataset.showcaseCardDevice || button.dataset.powerDeviceTrigger)
      .filter(Boolean);
    const fallbackOrder = {
      iphone: ['iphone', 'ipad', 'mac'],
      ipad: ['ipad', 'iphone', 'mac'],
      mac: ['mac', 'ipad', 'iphone'],
    };

    return (fallbackOrder[preferred] || fallbackOrder.iphone).find((device) => {
      const hasButton = !supportedByButtons.length || supportedByButtons.includes(device);
      const hasImage = !image || Boolean(image.dataset[`${device}Src`]);
      return hasButton && hasImage;
    }) || 'iphone';
  };

  const swapDeviceImage = (image, nextSrc, animated = true) => {
    if (!image || !nextSrc || image.getAttribute('src') === nextSrc) return;

    if (!animated || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      image.setAttribute('src', nextSrc);
      return;
    }

    window.clearTimeout(Number(image.dataset.swapTimer || 0));
    image.classList.add('is-switching');

    const timer = window.setTimeout(() => {
      image.setAttribute('src', nextSrc);
      image.addEventListener('load', () => image.classList.remove('is-switching'), { once: true });

      window.setTimeout(() => {
        image.classList.remove('is-switching');
      }, 180);
    }, 150);

    image.dataset.swapTimer = String(timer);
  };

  // 4. Mobile feature-card carousel
  const featuresViewport = document.querySelector('#features-viewport');
  const featureCards = Array.from(document.querySelectorAll('#features-track > .feature-card'));
  const featurePrevButton = document.querySelector('[data-feature-nav="prev"]');
  const featureNextButton = document.querySelector('[data-feature-nav="next"]');
  const featureDotButtons = Array.from(document.querySelectorAll('[data-feature-dot]'));
  const isMobileFeatureCarousel = () => window.matchMedia('(max-width: 767px)').matches;
  let featureVisibleIndex = 0;
  let featureScrollFrame = null;

  const clampFeatureIndex = (index) => (
    Math.max(0, Math.min(featureCards.length - 1, index))
  );

  const syncFeatureControls = (index) => {
    const clampedIndex = clampFeatureIndex(index);
    featureVisibleIndex = clampedIndex;

    featureDotButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === clampedIndex;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    if (featurePrevButton) {
      featurePrevButton.disabled = clampedIndex === 0;
    }

    if (featureNextButton) {
      featureNextButton.disabled = clampedIndex === featureCards.length - 1;
    }
  };

  const getClosestFeatureIndex = () => {
    if (!featuresViewport || !featureCards.length) return 0;

    const viewportRect = featuresViewport.getBoundingClientRect();
    const viewportCenter = viewportRect.left + (viewportRect.width / 2);
    return featureCards.reduce((closestIndex, card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + (cardRect.width / 2);
      const closestCardRect = featureCards[closestIndex].getBoundingClientRect();
      const closestCenter = closestCardRect.left + (closestCardRect.width / 2);
      return Math.abs(cardCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter)
        ? index
        : closestIndex;
    }, 0);
  };

  const queueFeatureControlSync = () => {
    if (featureScrollFrame) return;
    featureScrollFrame = window.requestAnimationFrame(() => {
      featureScrollFrame = null;
      if (!isMobileFeatureCarousel()) return;
      syncFeatureControls(getClosestFeatureIndex());
    });
  };

  const scrollFeatureCardIntoView = (index) => {
    if (!featuresViewport || !featureCards.length) return;

    const clampedIndex = clampFeatureIndex(index);
    const targetCard = featureCards[clampedIndex];
    const targetLeft = targetCard.offsetLeft - ((featuresViewport.clientWidth - targetCard.offsetWidth) / 2);

    featuresViewport.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
    syncFeatureControls(clampedIndex);
  };

  if (featuresViewport && featureCards.length) {
    syncFeatureControls(0);
    featuresViewport.addEventListener('scroll', queueFeatureControlSync, { passive: true });
    window.addEventListener('resize', queueFeatureControlSync);
    window.addEventListener('load', queueFeatureControlSync);
  }

  if (featurePrevButton) {
    featurePrevButton.addEventListener('click', () => {
      scrollFeatureCardIntoView(featureVisibleIndex - 1);
    });
  }

  if (featureNextButton) {
    featureNextButton.addEventListener('click', () => {
      scrollFeatureCardIntoView(featureVisibleIndex + 1);
    });
  }

  if (featureDotButtons.length) {
    featureDotButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        scrollFeatureCardIntoView(index);
        button.focus();
      });
    });
  }

  // 5. Swipeable power-features logic
  const powerFeaturesViewport = document.querySelector('#power-features-viewport');
  const getPowerFeatureSlides = () => (
    isMobilePowerFeatures()
      ? [
        ...document.querySelectorAll('[data-power-slide]:not(.power-feature--text-grid)'),
        ...document.querySelectorAll('[data-power-mobile-slide]'),
      ]
      : Array.from(document.querySelectorAll('[data-power-slide]'))
  );
  const powerPrevButton = document.querySelector('[data-power-nav="prev"]');
  const powerNextButton = document.querySelector('[data-power-nav="next"]');
  const allPowerDotButtons = Array.from(document.querySelectorAll('[data-power-dot]'));
  const isMobilePowerFeatures = () => window.matchMedia('(max-width: 767px)').matches;
  const getPowerDotButtons = () => (
    isMobilePowerFeatures()
      ? allPowerDotButtons
      : allPowerDotButtons.filter((button) => !button.hasAttribute('data-power-mobile-only'))
  );
  const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
  let powerFeatureSlides = [];
  let powerDotButtons = [];
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

  const refreshPowerCollections = () => {
    powerFeatureSlides = getPowerFeatureSlides();
    powerDotButtons = getPowerDotButtons();
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

    refreshPowerCollections();
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
    refreshPowerCollections();
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
    refreshPowerCollections();
    const clampedIndex = clampPowerSlideIndex(index);

    if (isMobilePowerFeatures()) {
      scrollPowerSlideIntoView(clampedIndex);
      return;
    }

    animatePowerSlideTo(clampedIndex);
  };

  refreshPowerCollections();

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

  if (allPowerDotButtons.length) {
    allPowerDotButtons.forEach((button, index) => {
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
      const nextSrc = image.dataset[`${device}Src`] || image.dataset.ipadSrc || image.dataset.iphoneSrc;
      swapDeviceImage(image, nextSrc);
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

  const setPowerMediaDevice = (slide, device) => {
    const image = slide.querySelector('[data-power-image]');
    const media = slide.querySelector('[data-power-media]');
    const buttons = Array.from(slide.querySelectorAll('[data-power-media-device]'));
    const nextSrc = image?.dataset[`${device}Src`];

    if (!image || !nextSrc) return;

    swapDeviceImage(image, nextSrc);

    media.classList.toggle('is-ipad', device !== 'iphone');

    buttons.forEach((button) => {
      const isActive = button.dataset.powerMediaDevice === device;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  document.querySelectorAll('[data-power-slide]').forEach((slide) => {
    const buttons = Array.from(slide.querySelectorAll('[data-power-media-device]'));
    if (!buttons.length) return;

    setPowerMediaDevice(slide, getSupportedDeviceFamily(slide.querySelector('[data-power-image]'), buttons));

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        setPowerMediaDevice(slide, button.dataset.powerMediaDevice);
        button.focus();
      });
    });
  });

  // 6. Per-card showcase device switching
  const showcaseCards = Array.from(document.querySelectorAll('[data-showcase-card]'));

  const setShowcaseCardDevice = (card, device) => {
    const image = card.querySelector('[data-showcase-image]');
    const media = card.querySelector('.showcase-card__media');
    const buttons = Array.from(card.querySelectorAll('[data-showcase-card-device]'));
    const nextSrc = image?.dataset[`${device}Src`];

    if (!image || !nextSrc) return;

    swapDeviceImage(image, nextSrc);
    media?.classList.toggle('is-ipad', device === 'ipad');

    buttons.forEach((button) => {
      const isActive = button.dataset.showcaseCardDevice === device;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  showcaseCards.forEach((card) => {
    const initialDevice = getSupportedDeviceFamily(card.querySelector('[data-showcase-image]'), Array.from(card.querySelectorAll('[data-showcase-card-device]')));
    setShowcaseCardDevice(card, initialDevice);

    card.querySelectorAll('[data-showcase-card-device]').forEach((button) => {
      button.addEventListener('click', () => {
        setShowcaseCardDevice(card, button.dataset.showcaseCardDevice);
        button.focus();
      });
    });
  });

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

  const getTrackingLabel = (link, fallback) => (
    normalizeLabel(
      link.dataset.trackLabel ||
      link.getAttribute('aria-label') ||
      link.textContent ||
      fallback
    ) || fallback
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

  const getPageSlug = (pathname) => (
    pathname.split('/').pop()?.replace(/\.html$/, '') || 'home'
  );

  const buildAppStoreEventBatch = (link) => {
    const pathname = window.location.pathname;
    const pageType = getPageType(pathname);
    const section = getAppStoreSection(link);
    const text = getTrackingLabel(link, 'app store');
    const pageSlug = getPageSlug(pathname);
    const events = [];

    events.push({
      name: 'app_store_click',
      params: {
        page_type: pageType,
        page_path: pathname,
        page_slug: pageSlug,
        link_text: text,
        section,
        destination_host: 'apps.apple.com',
        transport_type: 'beacon',
      },
    });

    if (pageType === 'home') {
      events.push({
        name: 'home_download_click',
        params: {
          page_path: pathname,
          link_text: text,
          section,
          transport_type: 'beacon',
        },
      });
    }

    if (pageType === 'feature') {
      events.push({
        name: 'feature_download_click',
        params: {
          feature_slug: pageSlug,
          link_text: text,
          section,
          transport_type: 'beacon',
        },
      });
      events.push({
        name: 'feature_cta_click',
        params: {
          feature_slug: pageSlug,
          link_text: text,
          section,
          transport_type: 'beacon',
        },
      });
    }

    if (pageType === 'guide') {
      events.push({
        name: 'guide_download_click',
        params: {
          guide_slug: pageSlug,
          link_text: text,
          section,
          transport_type: 'beacon',
        },
      });
    }

    if (pageType === 'privacy') {
      events.push({
        name: 'privacy_download_click',
        params: {
          page_path: pathname,
          link_text: text,
          section,
          transport_type: 'beacon',
        },
      });
    }

    return events;
  };

  const appStoreLinks = Array.from(document.querySelectorAll('a[href*="apps.apple.com"]'));
  appStoreLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const events = buildAppStoreEventBatch(link);

      if (shouldTrackWithoutDelay(event, link)) {
        events.forEach(({ name, params }) => trackEvent(name, params));
        return;
      }

      event.preventDefault();
      let hasNavigated = false;
      const navigateToStore = () => {
        if (hasNavigated) return;
        hasNavigated = true;
        window.location.assign(link.href);
      };

      const appStoreEvent = events.find(({ name }) => name === 'app_store_click');
      const followUpEvents = events.filter(({ name }) => name !== 'app_store_click');

      followUpEvents.forEach(({ name, params }) => trackEvent(name, params));

      if (appStoreEvent) {
        trackEvent(appStoreEvent.name, {
          ...appStoreEvent.params,
          event_callback: navigateToStore,
          event_timeout: 1200,
        });
      }

      // Fall back to timed navigation in case GA is blocked or callback does not fire.
      window.setTimeout(navigateToStore, 320);
    });
  });

  const trackedInternalLinks = Array.from(document.querySelectorAll('a[href]'));

  // 10. GA4 tracking for internal feature page clicks
  trackedInternalLinks.forEach((link) => {
    link.addEventListener('click', () => {
      let targetUrl;
      try {
        targetUrl = new URL(link.getAttribute('href') || link.href, window.location.href);
      } catch {
        return;
      }

      const pathname = window.location.pathname;
      const destinationPath = targetUrl.pathname;
      if (!destinationPath.includes('/features/')) return;
      if (destinationPath === pathname) return;

      const text = getTrackingLabel(link, 'feature');
      trackEvent('feature_page_click', {
        page_type: getPageType(pathname),
        page_path: pathname,
        feature_path: destinationPath,
        link_text: text,
        section: getAppStoreSection(link),
      });
    });
  });

  // 11. GA4 tracking for internal guide CTA clicks
  trackedInternalLinks.forEach((link) => {
    link.addEventListener('click', () => {
      let targetUrl;
      try {
        targetUrl = new URL(link.getAttribute('href') || link.href, window.location.href);
      } catch {
        return;
      }

      const pathname = window.location.pathname;
      const destinationPath = targetUrl.pathname;
      if (!destinationPath.includes('/guides/')) return;
      if (destinationPath === pathname) return;

      const text = getTrackingLabel(link, 'guide');
      trackEvent('guide_cta_click', {
        page_type: getPageType(pathname),
        page_path: pathname,
        guide_path: destinationPath,
        link_text: text,
        section: getAppStoreSection(link),
      });
    });
  });

});
