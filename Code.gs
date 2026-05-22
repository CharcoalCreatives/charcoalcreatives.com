/**
 * CHARCOAL CREATIVES — Google Apps Script
 * File: Code.gs
 *
 * SETUP INSTRUCTIONS:
 *  1. Go to script.google.com
 *  2. Create a new project, name it "CC Contact Form"
 *  3. Paste this entire file into the editor
 *  4. Replace RECIPIENT_EMAIL below with admin@charcoalcreatives.com
 *  5. Click Deploy > New Deployment > Web App
 *  6. Set "Execute as" = Me, "Who has access" = Anyone
 *  7. Copy the Web App URL into script.js (APPS_SCRIPT_URL)
 */

// CUSTOMISE: Your receiving email address
const RECIPIENT_EMAIL = 'admin@charcoalcreatives.com';

// CUSTOMISE: reCAPTCHA Secret Key (from Google reCAPTCHA admin console)
const RECAPTCHA_SECRET = 'YOUR_RECAPTCHA_SECRET_KEY';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // ── Verify reCAPTCHA ───────────────────────────
    const verifyUrl =
      'https://www.google.com/recaptcha/api/siteverify' +
      '?secret=' + RECAPTCHA_SECRET +
      '&response=' + data.recaptchaToken;

    const verifyResponse = UrlFetchApp.fetch(verifyUrl, { method: 'post' });
    const verifyResult   = JSON.parse(verifyResponse.getContentText());

    if (!verifyResult.success) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'reCAPTCHA failed' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── Build email ────────────────────────────────
    const subject = `New Enquiry from ${data.name} — Charcoal Creatives`;

    const body = `
New contact form submission from charcoalcreatives.com

─────────────────────────────
NAME:             ${data.name}
EMAIL:            ${data.email}
PHONE:            ${data.phone || 'Not provided'}
PACKAGE:          ${data.package || 'Not specified'}
─────────────────────────────

ABOUT THEIR BUSINESS:
${data.message}

─────────────────────────────
Submitted at: ${new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' })}
    `.trim();

    // ── Send email ─────────────────────────────────
    GmailApp.sendEmail(RECIPIENT_EMAIL, subject, body, {
      replyTo: data.email,
      name:    'Charcoal Creatives Website',
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check (GET request)
function doGet() {
  return ContentService
    .createTextOutput('Charcoal Creatives contact endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
