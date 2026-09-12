/* Optioneel voorbeeldbericht bij een opdracht.
   - Toggle-knop toont/verbergt het kader (via het [hidden]-attribuut).
   - Kopieerknop zet de berichttekst op het klembord met een korte
     bevestiging op de knop zelf.
   Zelfde opzet als optin.js / copy.js: kleine IIFE, geen libraries. */

(function () {
  var toggle = document.getElementById('voorbeeld-toggle');
  var box = document.getElementById('voorbeeld-bericht');

  if (toggle && box) {
    var LABEL_SHOW = 'Toon voorbeeldbericht';
    var LABEL_HIDE = 'Verberg voorbeeldbericht';

    toggle.addEventListener('click', function () {
      var opening = box.hidden;
      box.hidden = !opening;
      toggle.textContent = opening ? LABEL_HIDE : LABEL_SHOW;
      toggle.setAttribute('aria-expanded', String(opening));
    });
  }

  var copyBtn = box ? box.querySelector('.copy-btn') : null;
  var target = document.getElementById('voorbeeld-tekst');

  if (copyBtn && target) {
    var label = copyBtn.querySelector('.copy-btn__label');
    var original = label ? label.textContent : '';
    var timer;

    function feedback(message) {
      if (label) label.textContent = message;
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (label) label.textContent = original;
      }, 2000);
    }

    copyBtn.addEventListener('click', function () {
      var text = target.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { feedback('Gekopieerd!'); },
          function () { feedback('Kopiëren mislukt'); }
        );
        return;
      }

      // Fallback voor oudere browsers
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
      feedback(ok ? 'Gekopieerd!' : 'Kopiëren mislukt');
    });
  }
})();
