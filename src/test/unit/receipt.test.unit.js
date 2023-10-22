import Big from 'big.js';
import { expect } from 'chai';
import Receipt from '../../services/Receipt.services.js';

describe("Receipt.formatReceiptPerItem()", function () {
  it("with ending zero", function () {
    const receipt = new Receipt();
    expect(receipt.formatReceiptPerItem('chocolate bar', 1, Big(0.80))).to.equal('Chocolate bar: 0.80 \n');
  });

  it("quantity > 1", function () {
    const receipt = new Receipt();
    expect(receipt.formatReceiptPerItem('book', 3, Big(12.49))).to.equal('Book: 37.47 (3 @ 12.49)\n');
  });

  it("quantity = 1", function () {
    const receipt = new Receipt();
    expect(receipt.formatReceiptPerItem('packet of headache pills', 1, Big(9.75))).to.equal('Packet of headache pills: 9.75 \n');
  });
});