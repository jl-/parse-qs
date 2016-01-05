'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dotifyPath;
function dotifyPath(path) {
  var reg = /\[([^\[\]]*)\]/g;
  return path.replace(reg, function (m, p) {
    return '.' + p;
  });
}