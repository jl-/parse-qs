'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveValue;
function resolveValue(res, path, value) {
  var fields = path.split('.');
  var holder = res;
  var holderField = undefined,
      targetField = fields.shift();
  while (fields.length > 0) {
    holderField = isNaN(targetField) ? targetField : targetField ? +targetField : holder.length;
    targetField = fields.shift();
    holder = holder[holderField] || (holder[holderField] = isNaN(targetField) ? {} : []);
  }
  if (!isNaN(targetField) && holder.length >= 0) targetField = targetField ? +targetField : holder.length;
  holder[targetField] = value;
  return res;
}