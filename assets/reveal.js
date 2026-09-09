(() => {
  const markVisible = (el) => el.classList.add('is-visible');

  const boot = () => {
    const els = document.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger, .cat-cascade');
    if (!els.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(markVisible);
      return;
    }
    if (!('IntersectionObserver' in window)) {
      els.forEach(markVisible);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          markVisible(target);
          io.unobserve(target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => {
      io.observe(el);
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 40 && r.bottom > 40) markVisible(el);
    });
  };

  const start = () => requestAnimationFrame(boot);
  document.addEventListener('alpine:initialized', start, { once: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
