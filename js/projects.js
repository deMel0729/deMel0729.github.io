/* ============================================================================
   Projects page: grid, technology filter, and the detail popup with its
   image / video gallery. Everything is driven by PROJECTS in projects-data.js.
   ========================================================================== */

(function () {
  'use strict';

  if (typeof PROJECTS === 'undefined') return;

  var esc     = window.Portfolio.escapeHtml;
  var icons   = window.Portfolio.icons;
  var PLACEHOLDER = window.Portfolio.placeholder;

  var grid       = document.getElementById('projectsGrid');
  var emptyState = document.getElementById('emptyState');
  var filterBar  = document.getElementById('filterBar');

  var modal       = document.getElementById('projectModal');
  var modalPanel  = modal.querySelector('.modal-panel');
  var modalScroll = document.getElementById('modalScroll');
  var mediaStage  = document.getElementById('mediaStage');
  var mediaThumbs = document.getElementById('mediaThumbs');

  var activeFilter = 'All';
  var isOpen = false;
  var lastFocused = null;

  /* ------------------------------------------------------------------ grid */

  function renderGrid() {
    var list = activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter(function (p) {
          return (p.tech || []).indexOf(activeFilter) !== -1;
        });

    grid.innerHTML = list.map(function (p) {
      return window.Portfolio.createCard(p, true);
    }).join('');

    emptyState.hidden = list.length > 0;

    // Reveal freshly injected cards.
    grid.querySelectorAll('.reveal').forEach(window.Portfolio.observeReveal);
  }

  function renderFilters() {
    var seen = {};
    var techs = [];

    PROJECTS.forEach(function (p) {
      (p.tech || []).forEach(function (t) {
        if (!seen[t]) { seen[t] = true; techs.push(t); }
      });
    });

    techs.sort();
    techs.unshift('All');

    filterBar.innerHTML = techs.map(function (t) {
      return '<button type="button" class="chip' + (t === activeFilter ? ' is-active' : '') +
             '" data-filter="' + esc(t) + '" aria-pressed="' + (t === activeFilter) + '">' +
             esc(t) + '</button>';
    }).join('');
  }

  filterBar.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    activeFilter = chip.dataset.filter;
    renderFilters();
    renderGrid();
  });

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('[data-project]');
    if (card) openProject(card.dataset.project, true);
  });

  /* ----------------------------------------------------------------- media */

  function thumbSrc(item) {
    if (item.type === 'youtube') return 'https://img.youtube.com/vi/' + item.id + '/mqdefault.jpg';
    if (item.type === 'video')   return item.poster || PLACEHOLDER;
    return item.src || PLACEHOLDER;
  }

  function renderStage(item) {
    if (!item) {
      mediaStage.innerHTML =
        '<img src="' + PLACEHOLDER + '" alt="No media added for this project yet">';
      return;
    }

    if (item.type === 'youtube') {
      mediaStage.innerHTML =
        '<iframe src="https://www.youtube.com/embed/' + esc(item.id) + '?rel=0" ' +
        'title="' + esc(item.title || 'Project video') + '" loading="lazy" ' +
        'allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" ' +
        'allowfullscreen></iframe>';
      return;
    }

    if (item.type === 'video') {
      mediaStage.innerHTML =
        '<video controls playsinline preload="metadata" ' +
        (item.poster ? 'poster="' + esc(item.poster) + '" ' : '') +
        'src="' + esc(item.src) + '"></video>';
      return;
    }

    mediaStage.innerHTML =
      '<img src="' + esc(item.src) + '" alt="' + esc(item.alt || '') + '" ' +
      'onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';">';
  }

  function renderMedia(project) {
    var media = project.media || [];

    renderStage(media[0]);

    if (media.length < 2) {
      mediaThumbs.innerHTML = '';
      return;
    }

    mediaThumbs.innerHTML = media.map(function (item, i) {
      var overlay = (item.type === 'video' || item.type === 'youtube')
        ? '<span class="thumb-play">' + icons.play + '</span>'
        : '';
      return '<button type="button" class="thumb' + (i === 0 ? ' is-active' : '') +
             '" data-index="' + i + '" aria-label="Show item ' + (i + 1) + '">' +
             '<img src="' + esc(thumbSrc(item)) + '" alt="" loading="lazy" ' +
             'onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\';">' +
             overlay + '</button>';
    }).join('');

    mediaThumbs.onclick = function (e) {
      var btn = e.target.closest('.thumb');
      if (!btn) return;
      mediaThumbs.querySelectorAll('.thumb').forEach(function (t) {
        t.classList.toggle('is-active', t === btn);
      });
      renderStage(media[Number(btn.dataset.index)]);
    };
  }

  /* ----------------------------------------------------------------- modal */

  function fillModal(project) {
    document.getElementById('modalMeta').textContent =
      [project.year, project.role].filter(Boolean).join('  /  ');

    document.getElementById('modalTitle').textContent = project.title;

    document.getElementById('modalDesc').innerHTML =
      (project.description || [project.summary]).map(function (p) {
        return '<p>' + esc(p) + '</p>';
      }).join('');

    var highlights = project.highlights || [];
    document.getElementById('modalHighlightsBlock').hidden = highlights.length === 0;
    document.getElementById('modalHighlights').innerHTML =
      highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('');

    document.getElementById('modalTags').innerHTML =
      (project.tech || []).map(function (t) { return '<li class="tag">' + esc(t) + '</li>'; }).join('');

    document.getElementById('modalActions').innerHTML =
      (project.links || []).map(function (link, i) {
        var cls = i === 0 ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm';
        return '<a class="' + cls + '" href="' + esc(link.url) + '" target="_blank" rel="noopener">' +
               (icons[link.icon] || icons.external) + esc(link.label) + '</a>';
      }).join('');

    renderMedia(project);
  }

  function openProject(id, push) {
    var project = PROJECTS.filter(function (p) { return p.id === id; })[0];
    if (!project) return;

    lastFocused = document.activeElement;

    fillModal(project);
    modal.hidden = false;
    document.body.classList.add('is-locked');
    modalScroll.scrollTop = 0;
    isOpen = true;

    modal.querySelector('.modal-close').focus();

    if (push !== false) {
      history.pushState({ project: id }, '', '#' + id);
    }
  }

  function closeProject(pop) {
    if (!isOpen) return;
    isOpen = false;

    modal.hidden = true;
    document.body.classList.remove('is-locked');
    mediaStage.innerHTML = '';   // stops any playing video or embed
    mediaThumbs.innerHTML = '';

    if (lastFocused && lastFocused.focus) lastFocused.focus();

    if (pop !== false && history.state && history.state.project) {
      history.back();
    } else if (pop !== false && location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-modal]')) closeProject(true);
  });

  document.addEventListener('keydown', function (e) {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      closeProject(true);
      return;
    }

    // Keep tabbing inside the dialog while it is open.
    if (e.key !== 'Tab') return;

    var focusables = modalPanel.querySelectorAll(
      'a[href], button:not([disabled]), video[controls], iframe, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;

    var first = focusables[0];
    var last  = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('popstate', function (e) {
    var id = e.state && e.state.project;
    if (id) openProject(id, false);
    else closeProject(false);
  });

  /* ------------------------------------------------------------------ init */

  renderFilters();
  renderGrid();

  // Deep link: /projects.html#altrium opens that project straight away.
  var initial = location.hash.replace('#', '');
  if (initial) openProject(initial, false);

}());
