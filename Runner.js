// function doGet(e) {
//   return HtmlService.createTemplateFromFile('WEB').evaluate();
// }

// function include(filename) {
//   return HtmlService.createHtmlOutputFromFile(filename)
//       .getContent();
// }



/**
 * Get the URL for the Google Apps Script running as a WebApp.
 */
function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
 }
 
 /**
  * Get "home page", or a requested page.
  * Expects a 'page' parameter in querystring.
  *
  * @param {event} e Event passed to doGet, with querystring
  * @returns {String/html} Html to be served
  */

  
 function doGet(e) {
   Logger.log( Utilities.jsonStringify(e) );
   if (!e.parameter.page) {
     // When no specific page requested, return "home page"
     return HtmlService.createTemplateFromFile('index.html').evaluate();
   }
   // else, use page parameter to pick an html file from the script
   return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
 }

 function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}