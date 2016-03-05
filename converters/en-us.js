/** 
 * Convert the number to text
*/
var numberToText = require('../index');
var util = require('util');

var thousands = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion "];
var ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eightteen", "Nineteen"];
var tens = ["", "", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
var cases = ["titleCase", "lowerCase", "upperCase"]
var caseFunctions = [String.prototype.toString, String.prototype.toLowerCase, String.prototype.toUpperCase];

/**
 *  convert number to text
 *  @param num string or number
 *  @param options { language : "en-us" ,separator :"," ,case : "titleCase" } current support language is en-us and cases are "titleCase" , "lowerCase" , "upperCase". default is { language : "en-us" ,separator :"," ,case : "titleCase" }
 */
function en_usConverter() {
    numberToText.addConverter("en-us", this);
}

util.inherits(en_usConverter, numberToText.Converter);


en_usConverter.prototype.convertToText = function (num, options) {
    if (options.separator !== '')
        options.separator = options.separator || ",";
    if (cases.indexOf(options.case) === -1) {
        options.case = cases[0];
    }
    var caseFunction = caseFunctions[cases.indexOf(options.case)];

    var valueArray = [];
    if (typeof num === "number" || num instanceof Number) {
        num = num.toString();
    }
    if (num === "0") {
        return "Zero";
    }
    var splittedNumbers = num.match(/.{1,3}(?=(...)+$)|.{1,3}$/g);
    for (var index = 0; index < splittedNumbers.length; ++index) {
        var splitValues = [];
        var splitNum = splittedNumbers[index];
        if (splitNum.length > 3) {
            splitValues.push(module.exports.convertToText(splitNum));
        } else {
            if (splitNum.length === 3 && ones[splitNum.charAt(0)]) {
                splitValues.push(ones[splitNum.charAt(0)])
                splitValues.push('Hundred');
            } if (splitNum.length >= 2) {
                if (splitNum.substr(-2, 1) === '1') {
                    splitValues.push(ones[splitNum.substr(-2, 2)]);
                } else {
                    if (tens[splitNum.substr(-2, 1)])
                        splitValues.push(tens[splitNum.substr(-2, 1)]);
                    if (ones[splitNum.substr(-1, 1)])
                        splitValues.push(ones[splitNum.substr(-1, 1)]);
                }
            } else {
                splitValues.push(ones[splitNum.charAt(0)]);
            }
        }
        if (thousands[splittedNumbers.length - 1 - index] && splitValues.length > 0)
            splitValues.push(thousands[splittedNumbers.length - 1 - index]);
        if (splitValues.length > 0)
            valueArray.push(splitValues.join(' '));
    }
    return caseFunction.call((valueArray.join(options.separator + ' ')));
}

module.exports = new en_usConverter()