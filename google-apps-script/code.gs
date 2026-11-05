/**
 * Aashiq & Azka – Waleema invitation
 * Receives RSVP and Wishes submissions from the website and stores them in
 * separate sheets. Sheets and header rows are created automatically.
 */

const SPREADSHEET_ID = '1e9pqhtfguteez_xZNLnjGDsSMmyGj8HeaCHXYS2bruk';

const SHEETS = {
  RSVP: {
    name: 'RSVP',
    headers: ['Timestamp', 'Invited As', 'Full Name', 'Attendance', 'Number of Guests', 'Phone', 'Notes'],
    row: (p) => [new Date(), p.invitedAs, p.fullName, p.attendance, p.guests, p.phone, p.notes],
  },
  WISH: {
    name: 'Wishes',
    headers: ['Timestamp', 'Invited As', 'Name', 'Message'],
    row: (p) => [new Date(), p.invitedAs, p.name, p.message],
  },
};

const HEADER_BG = '#8a6620';   // gold
const HEADER_FG = '#ffffff';

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const payload = parsePayload_(e);
    const config = SHEETS[String(payload.sheet || '').toUpperCase()];
    if (!config) {
      return json_({ ok: false, error: 'Invalid sheet. Use RSVP or WISH.' });
    }

    const sheet = getSheet_(config);
    const row = config.row(payload).map((v) => (v === undefined || v === null ? '' : clean_(v)));
    sheet.appendRow(row);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  } finally {
    try { lock.releaseLock(); } catch (_e) {}
  }
}

function doGet() {
  return json_({ ok: true, message: 'Aashiq & Azka invitation endpoint is running.' });
}

/** Run once from the editor (optional) to create both sheets up front. */
function setup() {
  Object.keys(SHEETS).forEach((k) => getSheet_(SHEETS[k]));
}

/* ---------------- helpers ---------------- */

function getSheet_(config) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(config.name);
  if (!sheet) sheet = ss.insertSheet(config.name);

  // Add a formatted header row to a new/empty sheet
  const width = config.headers.length;
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, width)
      .setValues([config.headers])
      .setFontWeight('bold')
      .setBackground(HEADER_BG)
      .setFontColor(HEADER_FG)
      .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.autoResizeColumns(1, width);
  }
  return sheet;
}

/**
 * Keeps values as plain text: blocks formula injection (= + - @) and keeps
 * the leading zero of phone numbers like 0771234567.
 */
function clean_(value) {
  if (value instanceof Date) return value;
  const s = String(value).trim();
  return /^[=+\-@]/.test(s) || /^0\d/.test(s) ? "'" + s : s;
}

function parsePayload_(e) {
  if (e && e.parameter && Object.keys(e.parameter).length) return e.parameter;
  const body = e && e.postData && e.postData.contents;
  if (!body) return {};
  try { return JSON.parse(body); } catch (_err) { return {}; }
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
