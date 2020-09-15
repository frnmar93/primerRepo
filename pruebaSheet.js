const {google} = require('googleapis');
const sheets = google.sheets('v4');

async function main () {
  const authClient = await authorize();
  const request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM',  // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: 'A592:C594',  // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    // valueRenderOption: '',  // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    // dateTimeRenderOption: '',  // TODO: Update placeholder value.

    auth: authClient,
  };

  try {
    const response = (await sheets.spreadsheets.values.get(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}
main();

async function authorize() {
  // TODO: Change placeholder below to generate authentication credentials. See
  // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
  //
//   Authorize using one of the following scopes:
    'https://www.googleapis.com/auth/drive'
    'https://www.googleapis.com/auth/drive.file'
    'https://www.googleapis.com/auth/drive.readonly'
    'https://www.googleapis.com/auth/spreadsheets'
    'https://www.googleapis.com/auth/spreadsheets.readonly'
 
    let authClient = null;

  if (authClient == null) {
    throw Error('authentication failed');
  }

  return authClient;
}