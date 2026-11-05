/** Google Apps Script Web App URL for the RSVP / Wishes sheet. */
export const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx0mhmjuJVGHwCkErsJJ2EmxRkCD3ZnPpPy6Rq_YNA187n5emSQQ8X4lugxpyME_Ya_tw/exec';

/**
 * Sends a row to the sheet. Uses a form-encoded "simple" request with no-cors,
 * which Apps Script accepts without a CORS preflight. The response is opaque,
 * so a network failure is the only error we can detect.
 */
export async function submitToSheet(sheet: 'RSVP' | 'WISH', data: Record<string, string>) {
  const body = new URLSearchParams({ sheet, ...data });
  await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body });
}
