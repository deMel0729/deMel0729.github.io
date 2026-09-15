/* ============================================================================
   Shared behaviour: theme, navigation, scroll reveal, and the project card
   template used by both the home page and the projects page.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme ---------- */

  var themeToggle = document.getElementById('themeToggle');

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- Header shadow on scroll ---------- */

  var header = document.getElementById('siteHeader');

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */

  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav-link')) closeMenu();
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 720) closeMenu();
    });
  }

  /* ---------- Scroll reveal ---------- */

  var revealables = document.querySelectorAll('.reveal');

  // Opt in to the hidden-until-scrolled state only now that we know this
  // script is running, so a failed script can never leave the page blank.
  root.classList.add('js-reveal');

  // Belt and braces: if anything goes wrong, show everything anyway.
  window.setTimeout(function () {
    document.querySelectorAll('.reveal:not(.is-in)').forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight) el.classList.add('is-in');
    });
  }, 2500);

  if (!('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
      // threshold 0 rather than a percentage: project cards are tall, and a
      // percentage means a half-visible card sits blank until you scroll.
    }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el) { observer.observe(el); });
  }

  /* Register elements added to the page after this script ran. */
  function observeReveal(el) {
    if (observer) observer.observe(el);
    else el.classList.add('is-in');
  }

  /* ---------- Footer year ---------- */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Shared helpers, exposed for projects.js ---------- */

  var PLACEHOLDER = 'assets/img/placeholder.svg';

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  var ICONS = {
    github:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h5"/></svg>',
    play:     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5l12 7.5-12 7.5z"/></svg>',
    video:    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5l12 7.5-12 7.5z"/></svg>'
  };

  /* Build one project card. `interactive` cards open the modal on the
     projects page; on the home page they navigate to the projects page
     with the project id in the hash, which opens the same popup. */
  function createCard(project, interactive) {
    var tag = interactive ? 'button' : 'a';
    var attrs = interactive
      ? 'type="button" data-project="' + escapeHtml(project.id) + '"'
      : 'href="projects.html#' + escapeHtml(project.id) + '"';

    var hasVideo = (project.media || []).some(function (m) {
      return m.type === 'video' || m.type === 'youtube';
    });

    var badge = hasVideo
      ? '<span class="card-badge">' + ICONS.video + ' Demo video</span>'
      : '';

    var stack = (project.tech || []).slice(0, 4).map(function (t) {
      return '<li class="tag">' + escapeHtml(t) + '</li>';
    }).join('');

    var extra = (project.tech || []).length > 4
      ? '<li class="tag">+' + ((project.tech || []).length - 4) + '</li>'
      : '';

    return '' +
      '<' + tag + ' class="card reveal" ' + attrs + '>' +
        '<div class="card-thumb">' +
          '<img src="' + escapeHtml(project.thumb || PLACEHOLDER) + '" alt="" loading="lazy" ' +
               'onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';">' +
          badge +
        '</div>' +
        '<div class="card-body">' +
          '<p class="card-meta mono">' +
            escapeHtml(project.year || '') +
            '<span class="dot" aria-hidden="true">/</span>' +
            escapeHtml(project.role || '') +
          '</p>' +
          '<h3 class="card-title">' + escapeHtml(project.title) + '</h3>' +
          '<p class="card-summary">' + escapeHtml(project.summary) + '</p>' +
          '<div class="card-foot">' +
            '<ul class="card-stack">' + stack + extra + '</ul>' +
            '<span class="card-open">View &rarr;</span>' +
          '</div>' +
        '</div>' +
      '</' + tag + '>';
  }

  window.Portfolio = {
    escapeHtml: escapeHtml,
    createCard: createCard,
    observeReveal: observeReveal,
    icons: ICONS,
    placeholder: PLACEHOLDER
  };

  /* ---------- Home page: featured projects ---------- */

  var featuredGrid = document.getElementById('featuredGrid');

  if (featuredGrid && typeof PROJECTS !== 'undefined') {
    var featured = PROJECTS.filter(function (p) { return p.featured; });
    if (!featured.length) featured = PROJECTS.slice(0, 2);

    featuredGrid.innerHTML = featured.map(function (p) {
      return createCard(p, false);
    }).join('');

    // Cards are injected after the observer ran, so register them now.
    featuredGrid.querySelectorAll('.reveal').forEach(observeReveal);
  }

}());
