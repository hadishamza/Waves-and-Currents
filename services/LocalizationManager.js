/**
 * Created by Jinghan on 9/2/16.
 */
var currentLocaleJSON;
var defaultLocale = "english";

// register default
setLocale("swedish", function(success){
    if (success) {
        console.log("Default locale registration succeeded");
    } else {
        console.log("Default locale registration failed");
    }
});


// locale is the file name in localizations folder
// completion is a function with one boolean parameter
// to indicate whether the operation is succeeded
function setLocale(locale, completion) {
    $.ajax({
        url: "../localizations/" + locale +".json",
        dataType: 'json',
        async: false,
        success: function(data) {
            currentLocaleJSON = data;
            completion(true);
        }, error: function(message) {
            completion(false);
        }
    });
}

// this function returns the localized content of the key
function localizedString(key) {
    return currentLocaleJSON[key];
}

// this function should be used in HTML pages to have localized contents
function writeLocalizedString(key) {
    document.write(localizedString(key));
}