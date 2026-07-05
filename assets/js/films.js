// Films table: sort, filter, paginate. Vanilla, no deps.
// FILMS is inlined by films.html (site.data.films). Fields are all strings.
(function () {
  var PAGE_SIZE = 50;
  var rows = Array.isArray(window.FILMS) ? window.FILMS.slice() : [];

  var body = document.getElementById('films-body');
  var stat = document.getElementById('films-stat');
  var filterEl = document.getElementById('films-filter');
  var pageLabel = document.getElementById('films-page');
  var prevBtn = document.getElementById('films-prev');
  var nextBtn = document.getElementById('films-next');
  var heads = Array.prototype.slice.call(document.querySelectorAll('table.films thead th'));

  var sortKey = 'DATE SEEN', sortType = 'date', sortDir = -1; // newest first
  var query = '';
  var page = 0;

  function parseDate(s) {
    // "M/D/YYYY" -> comparable number; blanks sort last.
    var p = (s || '').split('/');
    if (p.length !== 3) return NaN;
    return new Date(+p[2], +p[0] - 1, +p[1]).getTime();
  }

  function keyVal(row, key, type) {
    var v = row[key] == null ? '' : row[key];
    if (type === 'num') { var n = parseFloat(v); return isNaN(n) ? -Infinity : n; }
    if (type === 'date') { var d = parseDate(v); return isNaN(d) ? -Infinity : d; }
    return String(v).toLowerCase();
  }

  function filtered() {
    if (!query) return rows;
    var q = query.toLowerCase();
    return rows.filter(function (r) {
      return (String(r.TITLE || '').toLowerCase().indexOf(q) !== -1) ||
             (String(r.DIRECTOR || '').toLowerCase().indexOf(q) !== -1);
    });
  }

  function sorted(list) {
    var out = list.slice();
    out.sort(function (a, b) {
      var av = keyVal(a, sortKey, sortType), bv = keyVal(b, sortKey, sortType);
      if (av < bv) return -1 * sortDir;
      if (av > bv) return 1 * sortDir;
      return 0;
    });
    return out;
  }

  function render() {
    var list = sorted(filtered());
    var pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if (page >= pages) page = pages - 1;
    if (page < 0) page = 0;
    var slice = list.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

    var html = '';
    for (var i = 0; i < slice.length; i++) {
      var r = slice[i];
      var score = parseInt(r.RATING, 10);
      var cls = (score >= 1 && score <= 5) ? 'score score' + score : 'score';
      var repeat = r.REPEAT === 'TRUE' ? '&#8635;' : '';
      html += '<tr>' +
        '<td class="' + cls + '">' + esc(r.RATING) + '</td>' +
        '<td class="f-title">' + esc(r.TITLE) + '</td>' +
        '<td>' + esc(r.YEAR) + '</td>' +
        '<td>' + esc(r.DIRECTOR) + '</td>' +
        '<td>' + esc(r['DATE SEEN']) + '</td>' +
        '<td>' + repeat + '</td>' +
      '</tr>';
    }
    body.innerHTML = html;

    stat.textContent = list.length === rows.length
      ? rows.length + ' films'
      : list.length + ' of ' + rows.length + ' films';
    pageLabel.textContent = 'Page ' + (page + 1) + ' of ' + pages;
    prevBtn.disabled = page <= 0;
    nextBtn.disabled = page >= pages - 1;

    heads.forEach(function (th) {
      var a = th.querySelector('.arrow');
      if (!a) return;
      a.textContent = th.getAttribute('data-key') === sortKey ? (sortDir === 1 ? '▲' : '▼') : '';
    });
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  heads.forEach(function (th) {
    th.addEventListener('click', function () {
      var key = th.getAttribute('data-key');
      if (key === sortKey) { sortDir = -sortDir; }
      // Rating sorts best-first on the first click; others ascending-first.
      else { sortKey = key; sortType = th.getAttribute('data-type') || 'str'; sortDir = key === 'RATING' ? -1 : 1; }
      page = 0;
      render();
    });
  });

  filterEl.addEventListener('input', function () { query = filterEl.value.trim(); page = 0; render(); });
  prevBtn.addEventListener('click', function () { page--; render(); });
  nextBtn.addEventListener('click', function () { page++; render(); });

  render();
})();

// All-Time Favorites carousel: close (persisted) + arrow scrolling.
(function () {
  var favs = document.getElementById('favs');
  if (!favs) return;
  var track = document.getElementById('favs-track');
  var prev = document.getElementById('favs-prev');
  var next = document.getElementById('favs-next');
  var closeBtn = document.getElementById('favs-close');

  // Dismiss for this view only; a refresh brings it back (no persistence).
  closeBtn.addEventListener('click', function () { favs.hidden = true; });

  function step() { return Math.round(track.clientWidth * 0.8); }
  prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });

  function updateArrows() {
    var max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= max;
  }
  track.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  updateArrows();
})();
