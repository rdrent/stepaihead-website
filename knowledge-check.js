/* Kennisvraag: meerkeuze met directe feedback.
   Werkt op elk ".knowledge-check"-blok:
   - data-correct  = letter (data-key) van het juiste antwoord
   - data-explain  = korte uitleg, getoond in de feedback
   Zelfde opzet als optin.js / copy.js: kleine IIFE, geen libraries. */

(function () {
  var blocks = document.querySelectorAll('.knowledge-check');
  if (!blocks.length) return;

  blocks.forEach(function (block) {
    var correct = block.getAttribute('data-correct');
    var explain = block.getAttribute('data-explain') || '';
    var options = block.querySelectorAll('.knowledge-check__option');
    var feedback = block.querySelector('.knowledge-check__feedback');
    var answered = false;

    function textOf(key) {
      var el = block.querySelector('.knowledge-check__option[data-key="' + key + '"]');
      return el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
    }

    options.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (answered) return;
        answered = true;

        var isRight = btn.getAttribute('data-key') === correct;

        btn.classList.add(isRight ? 'is-correct' : 'is-wrong');
        if (!isRight) {
          var right = block.querySelector('.knowledge-check__option[data-key="' + correct + '"]');
          if (right) right.classList.add('is-correct');
        }

        options.forEach(function (b) { b.disabled = true; });

        feedback.textContent = isRight
          ? 'Goed! ' + explain
          : 'Niet helemaal — ' + explain + ' Het juiste antwoord is: ' + textOf(correct);
        feedback.classList.add(isRight ? 'is-correct' : 'is-wrong');
        feedback.hidden = false;
      });
    });
  });
})();
