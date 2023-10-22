import Big from 'big.js';
import Item from './Item.services.js';
import { capitalizeFirstLetter } from '../utils/utils.js';

export class Receipt {
  constructor(shoppingBasket) {
    this.shoppingBasket = shoppingBasket;
    this.receipt = '';
  }

  /**
   * 
   * @param {string} name item name
   * @param {number} quantity 
   * @param {Big} pricePerItem price inclusive of sales taxes
   * @returns {string}
   */
  formatReceiptPerItem(name, quantity, pricePerItem) {
    let totalItemPrice = pricePerItem;
    let formatQuantity = '';
    if (quantity > 1) {
      formatQuantity += `(${quantity} @ ${pricePerItem.toFixed(2)})`;
      totalItemPrice = totalItemPrice.times(quantity);
    }

    const itemName = capitalizeFirstLetter(name);
    return `${itemName}: ${totalItemPrice} ${formatQuantity ? formatQuantity : ''}\n`;
  }

  printReceipt() {
    let totalReceiptTaxes = Big(0);
    let totalSalesPrice = Big(0);

    for (const [key, value] of Object.entries(this.shoppingBasket)) {
      const { price, quantity, isImported, category } = value;

      const item = new Item();
      const { pricePerItem, totalTaxes, totalPrice } = item.calculateItem(price, category, isImported, quantity);

      this.receipt += this.formatReceiptPerItem(key, quantity, pricePerItem);

      totalReceiptTaxes = totalReceiptTaxes.add(totalTaxes);
      totalSalesPrice = totalSalesPrice.add(Big(totalPrice));
    }

    if (!totalReceiptTaxes.eq(0)) {
      this.receipt += `Sales Taxes: ${totalReceiptTaxes.toFixed(2)}\n`;
    }

    this.receipt += `Total: ${totalSalesPrice.toFixed(2)}`;

    return this.receipt;
  }
}

export default Receipt;