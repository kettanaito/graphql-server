// @flow
/**
 * Returns the first number of entries in the array.
 * @param {any[]} array
 * @param {number} first
 * @returns {any[]}
 */
export default function takeFirst(array: any[], first: number) {
  return array.slice(0, first)
}
