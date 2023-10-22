import Big from 'big.js';
import { matchString, customRound } from '../utils/utils.js';

export class Item {
  CATEGORY = {
    BOOK: 'book',
    FOOD: 'food',
    MEDICAL: 'medical',
    OTHERS: 'others',
  }
  CATEGORY_KEYWORDS = {
    [this.CATEGORY.BOOK]: ['book'],
    [this.CATEGORY.FOOD]: ['chocolate'],
    [this.CATEGORY.MEDICAL]: ['pill']
  }

  IMPORT_DUTY_TAX = 5;
  BASIC_SALES_TAX = 10;

  constructor() { }

  /**
   * 
   * @param {string} item shopping basket item, e.g. 'imported box of chocolates'
   * @returns {boolean}
   */
  isImported(item) {
    return item.toLowerCase().includes('imported');
  }

  /**
   * 
   * @param {string} item shopping basket item, e.g. 'imported box of chocolates'
   * @returns {CATEGORY}
   */
  checkCategory(item) {
    for (const [key, value] of Object.entries(this.CATEGORY_KEYWORDS)) {
      const isMatched = matchString(value, item);

      if (isMatched) {
        return key;
      }
    }

    return this.CATEGORY.OTHERS;
  }

  /**
   * 
   * @param {string} price 
   * @param {CATEGORY} category 
   * @param {boolean} isImported 
   * @returns {Big} sales tax for item (per quantity)
   */
  calculateTaxesPerItem(price, category, isImported) {
    let importTaxes;
    if (isImported) {
      importTaxes = customRound(Big(price).times(this.IMPORT_DUTY_TAX).div(100));
    }

    let basicTaxes;
    if (category === this.CATEGORY.OTHERS) {
      basicTaxes = customRound(Big(price).times(this.BASIC_SALES_TAX).div(100));
    }

    return Big(importTaxes ?? 0).add(basicTaxes ?? 0);
  }

  /**
   * 
   * @param {string} price 
   * @param {CATEGORY} category 
   * @param {boolean} isImported 
   * @param {number} quantity 
   * @returns {Object}
   */
  calculateItem(price, category, isImported, quantity) {
    const taxesPerItem = this.calculateTaxesPerItem(price, category, isImported);
    const pricePerItem = Big(price).add(taxesPerItem);

    return {
      pricePerItem,
      totalTaxes: Big(taxesPerItem).times(quantity),
      totalPrice: Big(pricePerItem).times(quantity),
    }
  }
}

export default Item;