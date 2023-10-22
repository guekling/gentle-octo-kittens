import { expect } from 'chai';
import ShoppingBasket from '../../services/ShoppingBasket.services.js';
import Receipt from '../../services/Receipt.services.js';

describe("Receipt.printReceipt()", function () {
  it("no sales taxes", function () {
    const shoppingBasket = new ShoppingBasket();
    shoppingBasket.processShoppingBasket('1 book at 12.49');
    shoppingBasket.processShoppingBasket('1 book at 12.49');
    const sb = shoppingBasket.getShoppingBasket();
    const receipt = new Receipt(sb);

    expect(receipt.printReceipt()).to.equal(`Book: 24.98 (2 @ 12.49)\nTotal: 24.98`);
  });

  it("with sales taxes", function () {
    const shoppingBasket = new ShoppingBasket();
    shoppingBasket.processShoppingBasket('1 music CD at 14.99');
    const sb = shoppingBasket.getShoppingBasket();
    const receipt = new Receipt(sb);

    expect(receipt.printReceipt()).to.equal(`Music cd: 16.49 \nSales Taxes: 1.50\nTotal: 16.49`);
  });

  it("many items", function () {
    const shoppingBasket = new ShoppingBasket();
    shoppingBasket.processShoppingBasket('1 imported bottle of perfume at 27.99');
    shoppingBasket.processShoppingBasket('1 bottle of perfume at 18.99');
    shoppingBasket.processShoppingBasket('1 packet of headache pills at 9.75');
    shoppingBasket.processShoppingBasket('1 box of imported chocolates at 11.25');
    shoppingBasket.processShoppingBasket('1 box of imported chocolates at 11.25');
    const sb = shoppingBasket.getShoppingBasket();
    const receipt = new Receipt(sb);

    expect(receipt.printReceipt()).to.equal(`Imported bottle of perfume: 32.19 \nBottle of perfume: 20.89 \nPacket of headache pills: 9.75 \nBox of imported chocolates: 23.70 (2 @ 11.85)\nSales Taxes: 7.30\nTotal: 86.53`);
  });
});