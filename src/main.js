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
  
    // 4. Unified Sticky Horizontal Scroll Logic
    const setupStickyScroll = (containerId, spacerId, reverse = false) => {
      const container = document.querySelector(containerId);
      const spacer = document.querySelector(spacerId);
      
      if (container && spacer) {
        const onScroll = () => {
          const spacerRect = spacer.getBoundingClientRect();
          
          // Calculate progress (0 to 1) based on vertical scroll depth through the spacer
          const start = spacerRect.top + window.scrollY;
          const end = spacerRect.bottom + window.scrollY - window.innerHeight;
          const current = window.scrollY;
          
          let progress = (current - start) / (end - start);
          progress = Math.max(0, Math.min(1, progress));
          
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          if (reverse) {
            // Right-to-Left: Start at maxScroll, end at 0
            container.scrollLeft = (1 - progress) * maxScroll;
          } else {
            // Left-to-Right: Start at 0, end at maxScroll
            container.scrollLeft = progress * maxScroll;
          }
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        onScroll();
      }
    };

    setupStickyScroll('#showcase-carousel', '#showcase-height', false);
    setupStickyScroll('#showcase-ipad-carousel', '#showcase-ipad-height', true);
  });
