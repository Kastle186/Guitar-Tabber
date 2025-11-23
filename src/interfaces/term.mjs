/**
 * term.mjs
 * Interface functionality for the terminal version of the guitar tabber app.
 */

import { TerminalMenuInputHandler } from "../core/inputhandlers/menu-inputhandler.mjs";

const options = ['Option 1', 'Option 2', 'Option 3'];
const menu = new TerminalMenuInputHandler(options, 'Test Menu!');

await menu.listen();

console.log(`\nSelected Index: ${menu.selectedIndex}`);
console.log(`Option: ${options[menu.selectedIndex]}`);

process.exit(0);