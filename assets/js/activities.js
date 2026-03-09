// ── SCROLL REVEAL ──
// Cards already animate via CSS animation-delay,
// but we re-trigger for cards that load below fold

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.activity-card').forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});

// ── FLOATING DOTS PARALLAX in hero ──
document.addEventListener('mousemove', (e) => {
    const dots = document.querySelectorAll('.floating-dot');
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    dots.forEach((dot, i) => {
        const depth = (i + 1) * 8;
        dot.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    });
});

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1200) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target + (el.dataset.suffix || '');
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start) + (el.dataset.suffix || '');
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('[data-count]');
            nums.forEach(num => {
                animateCounter(num, parseInt(num.dataset.count), 1000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) statsObserver.observe(statsStrip);