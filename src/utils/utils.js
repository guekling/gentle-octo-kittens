import Big from 'big.js';

export function matchString(arr, str) {
  return arr.some(e => str.includes(e));
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Custom rounding to the nearest 0.05
 * @param {Big} number 
 * @returns {Big} number rounded to the nearest 0.05
 */
export function customRound(number) {
  return Big(number).times(20).round(0, Big.roundUp).div(20);
}