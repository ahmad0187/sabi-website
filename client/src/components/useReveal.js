import { useEffect } from 'react';

// Fades [data-reveal] sections in as they scroll into view. Runs after every render so
// elements added later (filters, route changes) are picked up too.
let io = null;
const seen = new WeakSet();

export default function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('s-in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
    }
    document.documentElement.classList.add('s-reveal-on');
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (!seen.has(el)) { seen.add(el); io.observe(el); }
    });
  });
}
