
/** 
 * Convert the number to text
*/
/**
 *  convert number to text
 *  @param num string or number
 *  @param options { language : "en-us" ,separator :"," ,case : "titleCase" } current support language is en-us and cases are "titleCase" , "lowerCase" , "upperCase". default is { language : "en-us" ,separator :"," ,case : "titleCase" }
 */
var converter = require('./lib/converter');
var container = {};
module.exports = {
    convertToText: function (num, options) {
        options = options || {};
        var language = (options.language || "en-us").toLowerCase();
        if (container.hasOwnProperty(language)) {
            return container[language].convertToText(num,options);
        }else {
           throw new Error('converter for language "' + language + '" not found.')
        }
    },

    addConverter: function (language, langConverter) {
        if (!container.hasOwnProperty(language)) {
            if (langConverter instanceof converter) {
                container[language] = langConverter;
            } else {
                new Error("language converter is not instance of converter");
            }
        } else {
            return false;
        }
    },
    Converter: converter
}
