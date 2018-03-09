import * as util from 'util';

/**
 * Throws when the predicate has a falsy value.
 */
export default function invariant(predicate: any, message: string, ...args) {
  if (predicate) return;
  const error: any = new Error(util.format(message, ...args));
  error.name = 'Invariant violation';
  error.framesToPop = 1;

  throw error;
}
