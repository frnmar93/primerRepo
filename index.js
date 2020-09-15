const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM');

async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  console.log(sheet.title);
  console.log(sheet.rowCount);
  await sheet.loadCells('A1:B2');
  console.log(sheet.getCell(0,0));

  console.log(tabla.getCell(2, 2))
}

accessSpreadsheet();



// const {google} = require('googleapis');


// const oauth2Client = new google.auth.OAuth2(
//   '1011808138473-e8tc1dic82lvhaluduc5ha8622j7123d.apps.googleusercontent.com',
//   't_5Ng1gtR9G86z_0EhJq1tfl'
// );

// // generate a url that asks permissions for Blogger and Google Calendar scopes
// const scopes = [
//   'https://www.googleapis.com/auth/spreadsheets.readonly',
//   'https://www.googleapis.com/auth/spreadsheets',
//   'https://www.googleapis.com/auth/drive.readonly',
//   'https://www.googleapis.com/auth/drive.file',
//   'https://www.googleapis.com/auth/drive'
// ];

// const url = oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',

//   // If you only need one scope you can pass it as a string
//   scope: scopes
// });


