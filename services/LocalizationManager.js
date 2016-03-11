/**
 * Created by Jinghan on 9/2/16.
 */
var currentLocaleJSON;
var defaultLocale = "english";

// If user has not set a prefered locale then set to defualt
// else set to users prefered locale
if(sessionStorage.getItem('localeData') === null){
    setLocale(defaultLocale, function(success){
        if (success) {
            console.log("Default local registration succeeded");
        } else {
            console.log("Default local registration failed");
        }
    });    
} else {
    currentLocaleJSON = JSON.parse(sessionStorage.getItem('localeData'));
alert("");}

// Help function for when setting the locale (e.g. button press)
function setLocaleAux(locale){
    setLocale(locale, function(success, data){
        if (success){
            alert("Setting local Aux function");
            sessionStorage.setItem('localeData', JSON.stringify(data));
            location.reload();
        }
        else{
            console.log("Setting local failed");
        }
    })
}


// locale is the file name in localizations folder
// completion is a function with one boolean parameter
// to indicate whether the operation is succeeded
function setLocale(locale, completion) {
    $.ajax({
        url: "../../localizations/" + locale +".json",
        dataType: 'json',
        cache: false,
        async: false,
        success: function(data) {
            currentLocaleJSON = data;
            completion(true, data);
        }, error: function(message) {
            completion(false, null);
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