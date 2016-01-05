'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _dotifyPath = require('./dotify-path');

var _dotifyPath2 = _interopRequireDefault(_dotifyPath);

var _resolveValue = require('./resolve-value');

var _resolveValue2 = _interopRequireDefault(_resolveValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(qs) {
  var pairs = qs.split('&');
  return pairs.reduce(function (res, pair) {
    var parts = pair.split('=');
    if (parts.length !== 2 || !parts[0]) return res;
    return (0, _resolveValue2.default)(res, (0, _dotifyPath2.default)(decodeURIComponent(parts[0])), decodeURIComponent(parts[1]));
  }, {});
}