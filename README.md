# gentle-octo-kittens

A tool for calculating the sales tax of a shopping basket.

Click [here](./task.md) for the original README.

# Contents

## Installation

1. Install dependencies
    ```bash
    npm i
    ```

2. Run the project
    ```bash
    node src/index.js
    ```

> Note: This project is developed on Node.js v20.8.1 and npm v10.1.0. This project is not production-ready.

## Usage

This tool is a command-line interface (CLI) which takes in a shopping basket as input and returns the receipt as output.

#### Input

The input accepts a multiline shopping basket, with each line describing an item in the shopping basket. The item is to be entered in the format as shown below:
```
1 {item_name} at {price}
```

For example:
```
1 book at 12.49
1 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85
```

Note that the following assumptions are made for the input:

1. Each line is of quantity = 1; and
2. Multiple lines with the same `item_name` would increase the quantity of the item in the shopping basket. The `item_name` is case-insensitive.

#### Output

The output returns the receipt of the shopping basket, with each item displayed in the format as shown below:

* If item is of 1 quantity:
    ```
    {item_name}: {price_with_sales_tax}
    ```
* If item is of > 1 quantity:
    ```
    {item_name}: {total_price_with_sales_tax} ({quantity} @ {price_of_one_with_sales_tax})
    ```

For example:
```
Book: 24.98 (2 @ 12.49) 
Music cd: 16.49 
Chocolate bar: 0.85
Sales Taxes: 1.50
Total: 42.32
```

#### Sales Tax Calculation

The calculation of the sales tax is as follows:

1. Basic tax is applicable at a rate of 10% on all goods, except books, food and medical products. Items are categorised by keywords in the `item_name`. The keywords are case-insensitive, and can be updated in `/src/services/Item.services.js`.
    ```javascript
    CATEGORY_KEYWORDS = {
      [this.CATEGORY.BOOK]: ['book'],
      [this.CATEGORY.FOOD]: ['chocolate'],
      [this.CATEGORY.MEDICAL]: ['pill']
    }
    ```

    a. For example: "packet of headache pills" will be categorised as a medical good.

2. Import duty is applicable at a rate of 5% on all imported goods. Imported goods are determined by the keyword "imported" (case-insensitive) in the `item_name`.

    a. For example: "imported box of chocolates".

## Testing

To run all tests:
```bash
npm run test
```

## Libraries

On top of **chai** and **mocha** for testing, the following library was downloaded:
* **big.js** for working with numbers
