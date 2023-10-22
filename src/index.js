import { createInterface } from 'node:readline/promises';
import ShoppingBasket from './services/ShoppingBasket.services.js';
import Receipt from './services/Receipt.services.js';

async function prompt() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const shoppingBasketPrompt = 'Enter shopping basket: \n';
  const shoppingReceiptPrompt = 'Receipt is as follows: \n\n';

  rl.setPrompt(shoppingBasketPrompt);
  rl.prompt();

  const shoppingBasket = new ShoppingBasket();

  // read shopping basket inputs
  for await (const line of rl) {
    if (line === '') {
      break;
    }

    shoppingBasket.processShoppingBasket(line);
  }

  const sb = shoppingBasket.getShoppingBasket();
  const receipt = new Receipt(sb);

  // print receipt
  rl.setPrompt(shoppingReceiptPrompt);
  rl.prompt();
  console.log(receipt.printReceipt());

  rl.close();
}

async function main() {
  await prompt();
}

main();