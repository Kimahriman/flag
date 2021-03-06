export function isObject(obj: any): obj is Object {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
