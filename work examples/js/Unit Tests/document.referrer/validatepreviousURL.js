var validatePreviousURL = function (url) {
//document.referrer
const urlBefore = url.indexOf('codepen') > -1;

return urlBefore
}

validatePreviousURL(document.referrer);