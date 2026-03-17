const header = document.querySelector('.site-header');
const revealTargets = document.querySelectorAll('[data-reveal]');

const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 8);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealTargets.forEach((el) => observer.observe(el));
window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// Promo Timer Logic
function updatePromoTimer() {
  const timerElements = document.querySelectorAll('#promo-timer, #promo-timer-mobile');
  if (!timerElements.length) return;

  const now = new Date();

  // Calculate next 2 AM
  const target = new Date(now);
  target.setHours(2, 0, 0, 0);

  // If 2 AM has already passed today, set it for tomorrow
  if (now > target) {
    target.setDate(target.getDate() + 1);
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


// Update timer immediately and then every second
document.addEventListener('DOMContentLoaded', () => {
  updatePromoTimer();
  setInterval(updatePromoTimer, 1000);
});
