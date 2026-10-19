/* ==========================================================================
   Recipe Secrets — shared script
   Handles: mobile nav toggle, scroll fade-in, reservation + contact form
   validation and Formspree submission.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initFadeIn();
  initReservationForm();
  initContactForm();
});

/* ---------------------------------------------------------------------- */
/* Mobile navigation                                                       */
/* ---------------------------------------------------------------------- */
function initNav() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/* ---------------------------------------------------------------------- */
/* Fade-in on scroll                                                       */
/* ---------------------------------------------------------------------- */
function initFadeIn() {
  var targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(function (el) { observer.observe(el); });

  /* Safety net: if an element is never scrolled into view (e.g. a very
     short page, a jump-to-bottom, or an edge case the observer misses),
     reveal everything after a few seconds so content is never stuck
     invisible. */
  window.setTimeout(function () {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
  }, 4000);
}

/* ---------------------------------------------------------------------- */
/* Shared validation helpers                                               */
/* ---------------------------------------------------------------------- */
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var PHONE_RE = /^[+]?[0-9\s()-]{7,20}$/;

function setFieldError(field, message) {
  var wrapper = field.closest('.form-field');
  if (!wrapper) return;
  var errorEl = wrapper.querySelector('.error-message');
  if (message) {
    wrapper.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    if (errorEl) errorEl.textContent = message;
  } else {
    wrapper.classList.remove('error');
    field.removeAttribute('aria-invalid');
    if (errorEl) errorEl.textContent = '';
  }
}

/* ---------------------------------------------------------------------- */
/* Reservation form                                                        */
/* ---------------------------------------------------------------------- */
function initReservationForm() {
  var form = document.getElementById('reservation-form');
  if (!form) return;

  var dateField = form.querySelector('#res-date');
  if (dateField) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var iso = today.toISOString().split('T')[0];
    dateField.setAttribute('min', iso);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var isValid = validateReservationForm(form);
    if (isValid) submitForm(form);
  });

  form.querySelectorAll('input, select, textarea').forEach(function (field) {
    field.addEventListener('blur', function () { validateReservationForm(form); });
  });
}

function validateReservationForm(form) {
  var valid = true;

  var name = form.querySelector('#res-name');
  if (!name.value.trim()) {
    setFieldError(name, 'Please enter your name.');
    valid = false;
  } else {
    setFieldError(name, '');
  }

  var phone = form.querySelector('#res-phone');
  if (!PHONE_RE.test(phone.value.trim())) {
    setFieldError(phone, 'Please enter a valid phone number.');
    valid = false;
  } else {
    setFieldError(phone, '');
  }

  var email = form.querySelector('#res-email');
  if (!EMAIL_RE.test(email.value.trim())) {
    setFieldError(email, 'Please enter a valid email address.');
    valid = false;
  } else {
    setFieldError(email, '');
  }

  var date = form.querySelector('#res-date');
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var chosenDate = date.value ? new Date(date.value + 'T00:00:00') : null;
  if (!date.value || chosenDate < today) {
    setFieldError(date, 'Please choose today or a future date.');
    valid = false;
  } else {
    setFieldError(date, '');
  }

  var time = form.querySelector('#res-time');
  if (!time.value) {
    setFieldError(time, 'Please choose a time.');
    valid = false;
  } else {
    setFieldError(time, '');
  }

  var guests = form.querySelector('#res-guests');
  var guestCount = Number(guests.value);
  if (!guests.value || guestCount < 1 || guestCount > 20 || !Number.isInteger(guestCount)) {
    setFieldError(guests, 'Guests must be a whole number between 1 and 20.');
    valid = false;
  } else {
    setFieldError(guests, '');
  }

  var occasion = form.querySelector('#res-occasion');
  if (!occasion.value) {
    setFieldError(occasion, 'Please select an occasion.');
    valid = false;
  } else {
    setFieldError(occasion, '');
  }

  return valid;
}

/* ---------------------------------------------------------------------- */
/* Contact form                                                            */
/* ---------------------------------------------------------------------- */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var isValid = validateContactForm(form);
    if (isValid) submitForm(form);
  });

  form.querySelectorAll('input, textarea').forEach(function (field) {
    field.addEventListener('blur', function () { validateContactForm(form); });
  });
}

function validateContactForm(form) {
  var valid = true;

  var name = form.querySelector('#contact-name');
  if (!name.value.trim()) {
    setFieldError(name, 'Please enter your name.');
    valid = false;
  } else {
    setFieldError(name, '');
  }

  var email = form.querySelector('#contact-email');
  if (!EMAIL_RE.test(email.value.trim())) {
    setFieldError(email, 'Please enter a valid email address.');
    valid = false;
  } else {
    setFieldError(email, '');
  }

  var message = form.querySelector('#contact-message');
  if (!message.value.trim()) {
    setFieldError(message, 'Please enter a message.');
    valid = false;
  } else {
    setFieldError(message, '');
  }

  return valid;
}

/* ---------------------------------------------------------------------- */
/* Formspree submission (shared)                                           */
/* ---------------------------------------------------------------------- */
function submitForm(form) {
  var submitBtn = form.querySelector('button[type="submit"]');
  var successBox = form.parentElement.querySelector('.form-success');
  var formData = new FormData(form);

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
  }

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' }
  })
    .then(function (response) {
      if (response.ok) {
        form.hidden = true;
        if (successBox) successBox.classList.add('show');
      } else {
        response.json().then(function (data) {
          handleSubmitError(form, submitBtn, data);
        }).catch(function () {
          handleSubmitError(form, submitBtn, null);
        });
      }
    })
    .catch(function () {
      handleSubmitError(form, submitBtn, null);
    });
}

function handleSubmitError(form, submitBtn, data) {
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = submitBtn.dataset.label || 'Submit';
  }
  var message = (data && data.errors && data.errors.length)
    ? data.errors.map(function (e) { return e.message; }).join(', ')
    : 'Something went wrong. Please try again, or call us directly.';
  var banner = form.querySelector('.form-submit-error');
  if (banner) banner.textContent = message;
  else window.alert(message);
}
