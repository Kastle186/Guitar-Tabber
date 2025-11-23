/**
 * run-term.mjs
 * Script to execute to run the terminal version of the guitar tabber app.
 */
import { TerminalUI } from "./src/interfaces/termui.mjs";

const terminalApp = new TerminalUI();
await terminalApp.run();

console.log('');
process.exit(0);