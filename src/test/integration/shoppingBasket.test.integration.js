import { expect } from 'chai';
import ShoppingBasket from '../../services/ShoppingBasket.services.js';
import Item from '../../services/Item.services.js';

describe("ShoppingBasket.processShoppingBasket()", function () {
  it("quantity = 1", function () {
    const shoppingBasket = new ShoppingBasket();
    const item = new Item();
    shoppingBasket.processShoppingBasket('1 book at 12.49');

    expect(shoppingBasket.getShoppingBasket()).to.deep.equal({
      book: {
        price: '12.49',
        quantity: 1,
        isImported: false,
        category: item.CATEGORY.BOOK,
      }
    });
  });

  it("quantity > 1", function () {
    const shoppingBasket = new ShoppingBasket();
    const item = new Item();
    shoppingBasket.processShoppingBasket('1 book at 12.49');
    shoppingBasket.processShoppingBasket('1 book at 12.49');

    expect(shoppingBasket.getShoppingBasket()).to.deep.equal({
      book: {
        price: '12.49',
        quantity: 2,
        isImported: false,
        category: item.CATEGORY.BOOK,
      }
    });
  });

  it("quantity > 1__same item, 1 lowercaps, 1 uppercaps", function () {
    const shoppingBasket = new ShoppingBasket();
    const item = new Item();
    shoppingBasket.processShoppingBasket('1 book at 12.49');
    shoppingBasket.processShoppingBasket('1 BOOK at 12.49');

    expect(shoppingBasket.getShoppingBasket()).to.deep.equal({
      book: {
        price: '12.49',
        quantity: 2,
        isImported: false,
        category: item.CATEGORY.BOOK,
      }
    });
  });

  it("imported item", function () {
    const shoppingBasket = new ShoppingBasket();
    const item = new Item();
    shoppingBasket.processShoppingBasket('1 imported bottle of perfume at 47.50');

    expect(shoppingBasket.getShoppingBasket()).to.deep.equal({
      ['imported bottle of perfume']: {
        price: '47.50',
        quantity: 1,
        isImported: true,
        category: item.CATEGORY.OTHERS,
      }
    });
  });

  it("many items", function () {
    const shoppingBasket = new ShoppingBasket();
    const item = new Item();
    shoppingBasket.processShoppingBasket('1 book at 12.49');
    shoppingBasket.processShoppingBasket('1 imported bottle of perfume at 47.50');
    shoppingBasket.processShoppingBasket('1 book at 12.49');
    shoppingBasket.processShoppingBasket('1 chocolate bar at 0.85');

    expect(shoppingBasket.getShoppingBasket()).to.deep.equal({
      book: {
        price: '12.49',
        quantity: 2,
        isImported: false,
        category: item.CATEGORY.BOOK,
      },
      ['imported bottle of perfume']: {
        price: '47.50',
        quantity: 1,
        isImported: true,
        category: item.CATEGORY.OTHERS,
      },
      ['chocolate bar']: {
        price: '0.85',
        quantity: 1,
        isImported: false,
        category: item.CATEGORY.FOOD,
      }
    });
  });
});