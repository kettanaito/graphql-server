import util from 'util';

export default function invariant(predicate, message, ...args) {
  if (predicate) return;

  const error = new Error(util.format(message, ...args));
  error.name = 'Invariant violation';
  error.framesToPop = 1;

  throw error;
}
