/**
 * Mui Wong website — contact form backend.
 *
 * Paste this whole file into the Apps Script editor attached to your
 * Google Sheet (Extensions → Apps Script), then deploy it as a Web App.
 * See the setup guide for the full click-by-click instructions.
 *
 * What it does on every form submission:
 *  1. Adds a row to this spreadsheet (date, name, phone, goal).
 *  2. Emails a notification to NOTIFY_EMAIL.
 */

// Change this if you ever want the notification sent somewhere else.
const NOTIFY_EMAIL = "jekadi851525@gmail.com";

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // First submission ever: add column headers.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "Name", "Phone", "Goal"]);
  }

  // Phone numbers start with "+", which Sheets (like Excel) tries to read
  // as a formula and shows as #ERROR!. Forcing column C to plain text
  // keeps it showing exactly what was typed, every time.
  sheet.getRange("C:C").setNumberFormat("@");

  const data = JSON.parse(e.postData.contents);
  const name = data.name || "(not given)";
  const phone = data.phone || "(not given)";
  const goal = data.goal || "(not given)";
  const timestamp = new Date();

  sheet.appendRow([timestamp, name, phone, goal]);

  const subject = "New website request — " + name;
  const body =
    "New booking request from the website:\n\n" +
    "Name: " + name + "\n" +
    "Phone: " + phone + "\n" +
    "Goal: " + goal + "\n" +
    "Time: " + timestamp;

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
