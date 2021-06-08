# number-to-text

> `number-to-text` is a regular expression driven number to text converter (no mathematical operation used). supported languages `en-us` (US English), `en-in` (Indian English), `de` (German), `tr` (Turkish), `id` (Indonesian)

[![Build Status][travis-ci-img]][travis-ci-url] 
[![npm version][npm-version-img]][npm-version-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![js-standard-style][js-standard-style-img]][js-standard-style-url] 
 
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
const numberToText = require('number-to-text')
require('number-to-text/converters/en-us');

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
  - `language` - Default: `en-us` - possible Values : `en-us`, 'en-in', 'de', 'tr'
  - `separator` - Default: `,` for (en-us and en-in)
  - `case` - Default: `titleCase` - possible Values : `"titleCase" , "lowerCase" , "upperCase"` for (en-us and en-in)

**Examples**

```js
const numberToText = require('number-to-text')
require('number-to-text/converters/en-us'); // load converter

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
const numberToText = require('numberToText')

class EnCustomConverter extends numberToText.Converter { // use language code as converter prefix
    constructor () {
        super()
        numberToText.addConverter(""/*enter language name here*/, this);
    }

    convertToText (num, options) {
        /* Implement number to text conversion logic */
    }
}

module.exports = new EnCustomConverter()
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
[coveralls-image]: https://coveralls.io/repos/github/Maheshkumar-Kakade/number-to-text/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/Maheshkumar-Kakade/number-to-text?branch=master
[js-standard-style-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[js-standard-style-url]: http://standardjs.com/
