// @flow
export default function isset(variable: mixed) {
  return typeof variable !== 'undefined' && variable !== null
}
