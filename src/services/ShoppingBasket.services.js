import Item from './Item.services.js';

export class ShoppingBasket {
  constructor() {
    this.shoppingBasket = {};
  }

  getShoppingBasket() {
    return this.shoppingBasket;
  }

  processShoppingBasket(shoppingBasketItem) {
    const itemName = shoppingBasketItem.split(' at ')[0].split(' ').slice(1).join(' ').toLowerCase();
    const itemPrice = shoppingBasketItem.split(' at ')[1];

    if (this.shoppingBasket[itemName]) {
      this.shoppingBasket[itemName].quantity = this.shoppingBasket[itemName].quantity + 1;
    } else {
      const item = new Item();

      this.shoppingBasket[itemName] = {
        price: itemPrice,
        quantity: 1,
        isImported: item.isImported(itemName),
        category: item.checkCategory(itemName),
      }
    }
  }
}

export default ShoppingBasket;