(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.numberToText = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** 
 * Convert the number to text
*/
var numberToText = require('../index');
var util = require('util');

var thousands = ["", "tausend", "Million", "Milliarde", "Billion", "Billiarde", "Trillion"];
var thousandsPural = ["", "tausend", "Millionen", "Milliarden", "Billionen", "Billiarden", "Trillionen"];
var ones = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
var tens = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];
var cases = ["titleCase", "lowerCase", "upperCase", "toString"]
var caseFunctions = [String.prototype.toString, String.prototype.toLowerCase, String.prototype.toUpperCase, String.prototype.toString];

/**
 *  convert number to text
 *  @param num string or number
 *  @param options { language : "de" ,separator :"" ,case : "titleCase" } current support language is en-us and cases are "titleCase" , "lowerCase" , "upperCase". default is { language : "en-us" ,separator :"," ,case : "titleCase" }
 */
function deConverter() {
    numberToText.addConverter("de", this);
}

util.inherits(deConverter, numberToText.Converter);


deConverter.prototype.convertToText = function(num, options) {
    var options = options || {};
    if (options.separator !== '')
        options.separator = options.separator || "";
    if (cases.indexOf(options.case) === -1) {
        options.case = cases[3];
    }
    var caseFunction = caseFunctions[cases.indexOf(options.case)];

    var valueArray = [];
    if (typeof num === "number" || num instanceof Number) {
        num = num.toString();
    }
    if (num === "0") {
        return caseFunction.call("null");
    }
    var hasThousand = false;
    var splittedNumbers = num.match(/.{1,}(?=(...){5}(...)$)|.{1,3}(?=(...){0,5}$)|.{1,3}$/g);
    for (var index = 0; index < splittedNumbers.length; ++index) {
        var splitValues = [];
        var splitNum = splittedNumbers[index];
        if (splitNum.length > 3) {
            splitValues.push(module.exports.convertToText(splitNum));
        } else {
            var hnum = "";
            if (splitNum.length === 3 && ones[splitNum.charAt(0)]) {
                hnum += ones[splitNum.charAt(0)] + 'hundert';
            } if (splitNum.length >= 2) {
                if (splitNum.substr(-2, 1) === '1') {
                    hnum += ones[splitNum.substr(-2, 2)];
                } else {
                    if (ones[splitNum.substr(-1, 1)]) {
                        hnum += ones[splitNum.substr(-1, 1)];
                    }
                    if (tens[splitNum.substr(-2, 1)]) {
                        hnum += ones[splitNum.substr(-1, 1)] ? "und" : "";
                        hnum += tens[splitNum.substr(-2, 1)];
                    } /*else {
                        hnum += ones[splitNum.substr(-1, 1)] == ones[1] ? "s" : "";
                    }*/
                }
            } else {
                hnum += ones[splitNum.charAt(0)] /*== ones[1] ? ones[1] + "s" : ones[splitNum.charAt(0)]*/;
            }
            if (hnum) {
                if (new RegExp(ones[1] + "$").test(hnum))
                    hnum += "s";
                splitValues.push(hnum);
            }
        }
        if (thousands[splittedNumbers.length - 1 - index] && splitValues.length > 0) {
            if ((splittedNumbers.length - 1 - index) == 1) {
                var val = splitValues.pop();
                if (val === (ones[1] + "s"))
                    val = ones[1];
                val += thousands[splittedNumbers.length - 1 - index];
                splitValues.push(val);
                hasThousand = true;
            } else {
                var val = splitValues.pop();
                if (val === (ones[1] + "s"))
                    val = ones[1] + "e";
                splitValues.push(val);
                if (val === ones[1] + "e")
                    splitValues.push(thousands[splittedNumbers.length - 1 - index]);
                else
                    splitValues.push(thousandsPural[splittedNumbers.length - 1 - index]);
            }
        }
        if (splitValues.length > 0) {
            if (hasThousand && valueArray.length > 0 && (splittedNumbers.length - 1 - index) != 1) {
                valueArray.push(valueArray.pop() + splitValues.join(' '));
            } else {
                valueArray.push(splitValues.join(' '));
            }
        }
    }
    return caseFunction.call((valueArray.join(options.separator + ' ')));
}

module.exports = new deConverter()
},{"../index":4,"util":9}],2:[function(require,module,exports){
/** 
 * Convert the number to text
*/
var numberToText = require('../index');
var util = require('util');

//var thousands = ["", "Thousand"]
var hundreds = ["", "Thousand", "Lakh", "Crore"];
var ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eightteen", "Nineteen"];
var tens = ["", "", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
var cases = ["titleCase", "lowerCase", "upperCase"]
var caseFunctions = [String.prototype.toString, String.prototype.toLowerCase, String.prototype.toUpperCase];

/**
 *  convert number to text
 *  @param num string or number
 *  @param options { language : "en-us" ,separator :"," ,case : "titleCase" } current support language is en-us and cases are "titleCase" , "lowerCase" , "upperCase". default is { language : "en-us" ,separator :"," ,case : "titleCase" }
 */
function en_inConverter() {
    numberToText.addConverter("en-in", this);
}

util.inherits(en_inConverter, numberToText.Converter);


en_inConverter.prototype.convertToText = function (num, options) {
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
    var splittedNumbers = num.match(/.{1,}(?=(..){2}(...)$)|.{1,2}(?=(..){0,1}(...)$)|.{1,3}$/g);
    for (var index = 0; index < splittedNumbers.length; ++index) {
        var splitValues = [];
        var splitNum = splittedNumbers[index];
        if (splittedNumbers.length == 4 && index == 0 && splitNum.length > 2) {
            splitValues.push(this.convertToText(splitNum, options));
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
        if (hundreds[splittedNumbers.length - 1 - index] && splitValues.length > 0)
            splitValues.push(hundreds[splittedNumbers.length - 1 - index]);
        if (splitValues.length > 0)
            valueArray.push(splitValues.join(' '));
    }
    return caseFunction.call((valueArray.join(options.separator + ' ')));
}

module.exports = new en_inConverter()
},{"../index":4,"util":9}],3:[function(require,module,exports){
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
    var options = options || {};
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
    var splittedNumbers = num.match(/.{1,}(?=(...){5}(...)$)|.{1,3}(?=(...){0,5}$)|.{1,3}$/g);
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
},{"../index":4,"util":9}],4:[function(require,module,exports){
var converter = require('./lib/converter');
var container = {};
module.exports = {
    /**
    *  convert number to text
    *  @param {string or number} num
    *  @param {object } options { language : "en-us" ,separator :"," ,case : "titleCase" } current support language is en-us and cases are "titleCase" , "lowerCase" , "upperCase". default is { language : "en-us" ,separator :"," ,case : "titleCase" }
    */
    convertToText: function(num, options) {
        options = options || {};
        var language = (options.language || "en-us").toLowerCase();
        if (container.hasOwnProperty(language)) {
            return container[language].convertToText(num, options);
        } else {
            throw new Error('converter for language "' + language + '" not found.')
        }
    },

    addConverter: function(language, langConverter) {
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

},{"./lib/converter":5}],5:[function(require,module,exports){
var converter =  module.exports = function () {
    
}

converter.prototype.convertToText = function (options) {
        new Error("convertToText is not implemented by " + this.constructor.name  + " ." );
}
},{}],6:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],7:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],8:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],9:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":8,"_process":7,"inherits":6}]},{},[4,3,2,1])(4)
});