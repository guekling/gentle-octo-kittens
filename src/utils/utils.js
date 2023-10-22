import Big from 'big.js';

/**
 * Checks if string matches any of the words in the array
 * @param {string[]} arr 
 * @param {string} str 
 * @returns {boolean}
 */
export function matchString(arr, str) {
  return arr.some(e => str.toLowerCase().includes(e));
}

/**
 * 
 * @param {string} str 
 * @returns {string}
 */
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