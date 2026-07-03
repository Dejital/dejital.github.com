// Lightbox for gallery pages. Generic: driven by .gallery-grid a.lightbox-link,
// zero per-page code. Native <dialog>; no-JS users get the plain image link.
// Deep link: #lightbox-N (1-based) opens at that image.
(function () {
  'use strict';

  var links = Array.prototype.slice.call(
    document.querySelectorAll('.gallery-grid a.lightbox-link')
  );
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;

  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">×</button>' +
    '<button type="button" class="lightbox-prev" aria-label="Previous image">←</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button type="button" class="lightbox-next" aria-label="Next image">→</button>';
  document.body.appendChild(dialog);

  var img = dialog.querySelector('img');
  var caption = dialog.querySelector('figcaption');
  var current = -1;
  var opener = null; // the clicked link, to restore focus on close

  function show(i) {
    current = (i + links.length) % links.length; // wrap
    var link = links[current];
    var thumb = link.querySelector('img');
    var fig = link.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    img.src = link.href;
    img.alt = thumb ? thumb.alt : '';
    caption.textContent = cap ? cap.textContent : '';
    history.replaceState(null, '', '#lightbox-' + (current + 1));
    if (!dialog.open) dialog.showModal();
  }

  links.forEach(function (link, i) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      opener = link;
      show(i);
    });
  });

  dialog.querySelector('.lightbox-close').addEventListener('click', function () {
    dialog.close();
  });
  dialog.querySelector('.lightbox-prev').addEventListener('click', function () {
    show(current - 1);
  });
  dialog.querySelector('.lightbox-next').addEventListener('click', function () {
    show(current + 1);
  });

  // Clicks on ::backdrop (and the dialog's own empty area) target the dialog itself.
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });

  // Esc is native; on any close, clean the hash and restore focus.
  dialog.addEventListener('close', function () {
    if (/^#lightbox-\d+$/.test(location.hash)) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    if (opener) opener.focus();
    opener = null;
  });

  // Deep link (script is deferred, so the grid is parsed by now).
  var m = /^#lightbox-(\d+)$/.exec(location.hash);
  if (m) {
    var n = parseInt(m[1], 10);
    if (n >= 1 && n <= links.length) show(n - 1);
  }
})();
