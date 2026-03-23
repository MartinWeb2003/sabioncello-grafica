/* ============================================================
   SABIONCELLO GRAFICA — MAIN JS
   Multi-page: active nav, scroll effects, counters, form
   ============================================================ */
(function () {
  'use strict';

  /* ── ACTIVE NAV LINK (multi-page) ──────────────────────── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── NAVBAR SCROLL ──────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── MOBILE MENU ────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click or outside click
    navLinks.querySelectorAll('.nav-link').forEach(l =>
      l.addEventListener('click', closeMenu)
    );
    document.addEventListener('click', e => {
      if (navbar && !navbar.contains(e.target)) closeMenu();
    });
  }

  function closeMenu() {
    if (!navLinks || !hamburger) return;
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ── SMOOTH SCROLL ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 74;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
    });
  });

  /* ── SCROLL-TRIGGERED AOS ───────────────────────────────── */
  const aosEls = document.querySelectorAll('[data-aos]');
  if (aosEls.length) {
    const aosObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(
          (entry.target.parentElement || document).querySelectorAll('[data-aos]')
        );
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        aosObs.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    aosEls.forEach(el => aosObs.observe(el));
  }

  /* ── COUNTER ANIMATION ──────────────────────────────────── */
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (counters.length) {
    const cntObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.target.dataset.done) return;
        entry.target.dataset.done = '1';
        cntObs.unobserve(entry.target);
        const target = parseInt(entry.target.dataset.count, 10);
        const dur    = 1800;
        const t0     = performance.now();
        (function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          entry.target.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target)
            .toLocaleString('hr-HR');
          if (p < 1) requestAnimationFrame(tick);
        })(performance.now());
      });
    }, { threshold: 0.5 });

    counters.forEach(el => cntObs.observe(el));
  }

  /* ── HERO SLIDER ────────────────────────────────────────── */
  const slides      = document.querySelectorAll('.slide');
  const dots        = document.querySelectorAll('.slider-dot');
  const prevBtn     = document.getElementById('sliderPrev');
  const nextBtn     = document.getElementById('sliderNext');
  const progressBar = document.getElementById('sliderProgressBar');
  const SLIDE_DUR   = 3000; // ms per slide

  if (slides.length) {
    let current = 0;
    let timer   = null;

    function goTo(idx) {
      const prev = current;
      current = (idx + slides.length) % slides.length;

      slides[prev].classList.remove('slide-active');
      if (dots[prev]) {
        dots[prev].classList.remove('dot-active');
        dots[prev].setAttribute('aria-selected', 'false');
      }
      slides[current].classList.add('slide-active');
      if (dots[current]) {
        dots[current].classList.add('dot-active');
        dots[current].setAttribute('aria-selected', 'true');
      }

      // Reset + animate progress bar
      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          progressBar.style.transition = 'width ' + SLIDE_DUR + 'ms linear';
          progressBar.style.width = '100%';
        }));
      }
    }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), SLIDE_DUR);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startTimer(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startTimer(); }));

    // Keyboard arrow navigation
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); startTimer(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); startTimer(); }
    });

    // Touch / swipe support
    let touchStartX = 0;
    const sliderEl  = document.querySelector('.hero-slider');
    if (sliderEl) {
      sliderEl.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });
      sliderEl.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 48) { goTo(current + (dx < 0 ? 1 : -1)); startTimer(); }
      }, { passive: true });
    }

    // Pause on hover
    if (sliderEl) {
      sliderEl.addEventListener('mouseenter', () => clearInterval(timer));
      sliderEl.addEventListener('mouseleave', () => startTimer());
    }

    goTo(0);
    startTimer();
  }

  /* ── CONTACT FORM ───────────────────────────────────────── */
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const sbBtn   = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const n  = document.getElementById('name');
      const em = document.getElementById('email');
      const ms = document.getElementById('message');
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let ok = true;

      [[n, v => v.trim().length >= 2],
       [em, v => emailRe.test(v.trim())],
       [ms, v => v.trim().length >= 5]
      ].forEach(([el, check]) => {
        if (!check(el.value)) {
          ok = false;
          el.classList.add('error');
          el.addEventListener('input', () => el.classList.remove('error'), { once: true });
        }
      });

      if (!ok) return;

      sbBtn.disabled = true;
      sbBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Šalje se…';

      setTimeout(() => {
        form.reset();
        sbBtn.disabled = false;
        sbBtn.innerHTML = 'Pošaljite upit <i class="fas fa-paper-plane"></i>';
        if (success) {
          success.classList.add('show');
          setTimeout(() => success.classList.remove('show'), 6000);
        }
      }, 1600);
    });
  }

})();
