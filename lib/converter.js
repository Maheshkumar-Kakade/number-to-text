var converter = module.exports = function () {}

converter.prototype.convertToText = function (options) {
  throw new Error('convertToText is not implemented by ' + this.constructor.name + ' .')
}
