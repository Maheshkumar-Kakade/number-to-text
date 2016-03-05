# number-to-text

> `number-to-text` is a regular expression driven number to text converter (no mathematical opteration used).   

[![Build Status][travis-ci-img]][travis-ci-url] 
[![npm version][npm-version-img]][npm-version-url] 

[![NPM](https://nodei.co/npm/number-to-text.png?downloadRank=true&downloads=true)](https://nodei.co/npm/number-to-text/)
## Index
* [Install](#install)
* [Usage](#usage)
* [License](#license)

## Install

### npm package
```bash
npm install number-to-text --save
```
### bower package

```bash
bower install number-to-text --save
```

## Usage

### node

```js
var numberToText = require('number-to-text')

numberToText.convertToText(12346)

numberToText.convertToText("12346")
```

### bower
```html
<script src="bower_components/dist/number-to-text.js"></script>
<!-- creates numberToText object on window -->
<script>
    console.log(numberToText.convertToText(123456));
</script>
```

### convertToText(num, options)

**Arguments**

* `num` - a string or number.
* `options` 
  - `language` - Default: `en-us` - possibleValues : `en-us`, 'en-in'
  - `separator` - Default: `,`
  - `case` - Default: `titleCase` - possibleValues : `"titleCase" , "lowerCase" , "upperCase"`

**Examples**

```js
var numberToText = require('number-to-text');

numberToText.convertToText('123456')  
//One Hundred Twenty Three Thousand, Four Hundred Fifty Six

numberToText.convertToText(123456) 
//One Hundred Twenty Three Thousand, Four Hundred Fifty Six

numberToText.convertToText(123456,{case:"lowerCase"}) 
//one hundred twenty three thousand, four hundred fifty six

numberToText.convertToText(123456,{case:"upperCase"}) 
//ONE HUNDRED TWENTY THREE THOUSAND, FOUR HUNDRED FIFTY SIX

numberToText.convertToText('123456',{separator : '', case:"upperCase"}) 
//ONE HUNDRED TWENTY THREE THOUSAND FOUR HUNDRED FIFTY SIX

```
### addConverter(language, langConverter)
function is used to implement your own language converter.

**Arguments**

* `language` - a language code.
* `langConverter` - an object inehrited from  numberToText.Converter

**writing own language converter**
```js
var numberToText = require('numberToText');
var util = require('util');

function en_customConverter() { // use language code as converter prefix
    numberToText.addConverter(""/*enter language name here*/, this);
}

util.inherits(en_customConverter, numberToText.Converter);


en_customConverter.prototype.convertToText = function (num, options) {
    /* Implement number to text conversion logic */
}

module.exports = new en_customConverter()
```   
## Tests

```js
npm test
```

## License
[MIT][license-url]

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[travis-ci-img]: https://travis-ci.org/Maheshkumar-Kakade/number-to-text.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Maheshkumar-Kakade/number-to-text 
[npm-version-img]: https://badge.fury.io/js/number-to-text.svg
[npm-version-url]: http://badge.fury.io/js/number-to-text
