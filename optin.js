/* Opt-in formulier — placeholder-gedrag.
   Nu: valideert de velden en toont een bevestiging.
   Later: hier de inzending naar Systeme.io koppelen (fetch naar de
   form-endpoint, of het <form> een echte action/method geven en dit
   script verwijderen). */

(function () {
  var form = document.getElementById('optin-form');
  var success = document.getElementById('optin-success');
  if (!form || !success) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Browser-validatie handmatig aanroepen (form heeft novalidate).
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var naam = form.elements['naam'].value.trim();

    form.hidden = true;
    success.hidden = false;

    if (naam) {
      var title = success.querySelector('.form-success__title');
      if (title) title.textContent = 'Je bent aangemeld, ' + naam;
    }

    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
