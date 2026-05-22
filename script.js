/* ═══════════════════════════════════════════════════
   CHARCOAL CREATIVES — script.js
═══════════════════════════════════════════════════ */

/* ─── BRAND + REVIEW CAROUSEL ───────────────────── */
let currentBrand = 0;

const brandItems  = document.querySelectorAll('.brand-item');
const reviewItems = document.querySelectorAll('.review-item');

function changeBrand(direction) {
  brandItems[currentBrand].classList.remove('active');
  reviewItems[currentBrand]?.classList.remove('active');

  currentBrand = (currentBrand + direction + brandItems.length) % brandItems.length;

  brandItems[currentBrand].classList.add('active');
  reviewItems[currentBrand]?.classList.add('active');
}

/* ─── FORM SUBMISSION via Google Apps Script ─────── */

/*
  CUSTOMISE: Replace this URL with your deployed
  Google Apps Script Web App URL.
  See SETUP-GUIDE.md for full instructions.
*/
const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

async function handleSubmit(e) {
  e.preventDefault();

  const btn     = document.getElementById('submit-btn');
  const msgEl   = document.getElementById('form-message');
  const form    = document.getElementById('contact-form');

  // reCAPTCHA check
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    msgEl.textContent = 'Please complete the reCAPTCHA verification.';
    msgEl.className = 'form-message error';
    return;
  }

  // Gather form data
  const data = {
    name:             document.getElementById('name').value.trim(),
    email:            document.getElementById('email').value.trim(),
    phone:            document.getElementById('phone').value.trim(),
    package:          document.getElementById('package').value,
    message:          document.getElementById('message').value.trim(),
    recaptchaToken:   recaptchaResponse,
  };

  // Loading state
  btn.textContent  = 'SENDING...';
  btn.disabled     = true;
  msgEl.textContent = '';
  msgEl.className  = 'form-message';

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode:   'no-cors',         // Apps Script requires no-cors
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    // no-cors means we can't read the response status,
    // so we optimistically show success.
    msgEl.textContent = '✓ Message sent! We\'ll be in touch soon.';
    msgEl.className   = 'form-message success';
    form.reset();
    grecaptcha.reset();

  } catch (err) {
    console.error('Form error:', err);
    msgEl.textContent = 'Something went wrong. Please email us directly.';
    msgEl.className   = 'form-message error';
  } finally {
    btn.textContent = 'SUBMIT';
    btn.disabled    = false;
  }
}
