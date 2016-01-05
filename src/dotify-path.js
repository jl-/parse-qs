export default function dotifyPath(path) {
  const reg = /\[([^\[\]]*)\]/g;
  return path.replace(reg, (m, p) => '.' + p);
}
