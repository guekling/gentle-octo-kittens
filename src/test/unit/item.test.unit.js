import { expect } from 'chai';
import Item from '../../services/Item.services.js'

describe("Item.isImported()", function () {
  it("all lowercaps__true", function () {
    const item = new Item();
    expect(item.isImported('imported box of chocolates')).to.equal(true);
  });

  it("with uppercaps__true", function () {
    const item = new Item();
    expect(item.isImported('Imported box of chocolates')).to.equal(true);
  });

  it("false", function () {
    const item = new Item();
    expect(item.isImported('chocolate bar')).to.equal(false);
  });
});

describe("Item.checkCategory()", function () {
  it("category__book", function () {
    const item = new Item();
    expect(item.checkCategory('book')).to.equal(item.CATEGORY.BOOK);
  });

  it("category__all lowercase__with s__food", function () {
    const item = new Item();
    expect(item.checkCategory('imported box of chocolates')).to.equal(item.CATEGORY.FOOD);
  });

  it("category__all lowercase__without s__food", function () {
    const item = new Item();
    expect(item.checkCategory('imported box of chocolate')).to.equal(item.CATEGORY.FOOD);
  });

  it("category__with uppercase__food", function () {
    const item = new Item();
    expect(item.checkCategory('imported box of Chocolates')).to.equal(item.CATEGORY.FOOD);
  });

  it("category__medical", function () {
    const item = new Item();
    expect(item.checkCategory('packet of headache pills')).to.equal(item.CATEGORY.MEDICAL);
  });

  it("category__others", function () {
    const item = new Item();
    expect(item.checkCategory('imported bottle of perfume')).to.equal(item.CATEGORY.OTHERS);
  });
});

describe("Item.calculateTaxesPerItem()", function () {
  it("sales and import taxes__rounded to nearest 0.05", function () {
    const item = new Item();
    const calculatedTaxes = item.calculateTaxesPerItem('47.50', item.CATEGORY.OTHERS, true).toFixed(2);
    expect(calculatedTaxes).to.equal('7.15');
  });

  it("import taxes__with ending zero", function () {
    const item = new Item();
    const calculatedTaxes = item.calculateTaxesPerItem('10.00', item.CATEGORY.FOOD, true).toFixed(2);
    expect(calculatedTaxes).to.equal('0.50');
  });

  it("sales taxes__with ending zero", function () {
    const item = new Item();
    const calculatedTaxes = item.calculateTaxesPerItem('14.99', item.CATEGORY.OTHERS, false).toFixed(2);
    expect(calculatedTaxes).to.equal('1.50');
  });
});