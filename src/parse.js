import dotifyPath from './dotify-path';
import resolveValue from './resolve-value';

export default function parse(qs) {
  const pairs = qs.split('&');
  return pairs.reduce((res, pair) => {
    const parts = pair.split('=');
    if (parts.length !== 2 || !parts[0]) return res;
    return resolveValue(res, dotifyPath(decodeURIComponent(parts[0])), decodeURIComponent(parts[1]));
  }, {});
}
