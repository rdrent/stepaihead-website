/* Kopieerknoppen.
   Elke knop met class "copy-btn" en data-copy-target="#id" kopieert de
   tekst van dat element naar het klembord en toont kort een bevestiging. */

(function () {
  var buttons = document.querySelectorAll('.copy-btn[data-copy-target]');
  if (!buttons.length) return;

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback voor oudere browsers
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }

  buttons.forEach(function (btn) {
    var label = btn.querySelector('.copy-btn__label');
    var original = label ? label.textContent : '';
    var timer;

    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-copy-target'));
      if (!target) return;

      var text = target.textContent.replace(/\s+/g, ' ').trim();

      copyText(text).then(function () {
        btn.classList.add('is-copied');
        if (label) label.textContent = 'Gekopieerd!';
      }).catch(function () {
        if (label) label.textContent = 'Kopiëren mislukt';
      }).then(function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          btn.classList.remove('is-copied');
          if (label) label.textContent = original;
        }, 2000);
      });
    });
  });
})();
