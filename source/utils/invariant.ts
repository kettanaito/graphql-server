import * as util from 'util';

/**
 * Throws when the predicate has a falsy value.
 */
export default function invariant(predicate: any, message: string, ...args) {
  if (predicate) return;
  throw new Error(util.format(message, ...args));
}
