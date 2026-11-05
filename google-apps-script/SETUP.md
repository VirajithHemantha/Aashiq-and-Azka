# Google Sheet setup (RSVP + Wishes)

Sheet: https://docs.google.com/spreadsheets/d/1e9pqhtfguteez_xZNLnjGDsSMmyGj8HeaCHXYS2bruk

1. Open the sheet → **Extensions → Apps Script**.
2. Delete everything in `Code.gs` and paste the contents of `google-apps-script/code.gs`. Save.
3. (Optional) Choose `setup` in the function dropdown and click **Run** to create the
   `RSVP` and `Wishes` tabs now. Approve the permission prompt. Otherwise they are
   created automatically on the first submission.
4. **Deploy → New deployment** → type **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** and copy the **Web app URL** (ends with `/exec`).
6. The Web app URL is hardcoded in `src/sheets.ts` (`SCRIPT_URL`). If you create a NEW deployment, update it there and push.

Columns created automatically:

- **RSVP**: Timestamp · Invited As · Full Name · Attendance · Number of Guests · Phone · Notes
- **Wishes**: Timestamp · Invited As · Name · Message

"Invited As" is filled from the personalised link (e.g. `Mr. Sanjaya`), blank for the plain link.

If you change the script later: **Deploy → Manage deployments → Edit → Version: New version → Deploy**
(the URL stays the same).
