(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.numberToText = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** 
 * Convert the number to text
*/
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
module.exports = {
    convertToText: function (num, options) {
        options = options || {};
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
}

},{}]},{},[1])(1)
});