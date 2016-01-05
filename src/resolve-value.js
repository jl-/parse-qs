export default function resolveValue(res, path, value) {
  const fields = path.split('.');
  let holder = res;
  let holderField, targetField = fields.shift();
  while (fields.length > 0) {
    holderField = isNaN(targetField) ? targetField : targetField ? +targetField : holder.length;
    targetField = fields.shift();
    holder = holder[holderField] || (holder[holderField] = isNaN(targetField) ? {} : []);
  }
  if (!isNaN(targetField) && holder.length >= 0) targetField = targetField ? +targetField : holder.length;
  holder[targetField] = value;
  return res;
}
