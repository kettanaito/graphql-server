// @flow
export default function isset(variable: any) {
  return typeof variable !== 'undefined' && variable !== null
}
