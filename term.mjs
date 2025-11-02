/**
 * term.mjs
 * Main functionality for the terminal version of the guitar tabber app.
 */

'use strict';

import readline from 'readline';
import { TUNINGS } from './models/Tuning.mjs';

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

process.stdin.resume();
console.log(TUNINGS[0].toString());

const NUM_TUNINGS = TUNINGS.length;
let index = 0;

process.stdin.on('keypress', (_, key) => {
    switch (key.name) {
        case 'up':
            index = (index - 1 + NUM_TUNINGS) % NUM_TUNINGS;
            break;

        case 'down':
            index = (index + 1) % NUM_TUNINGS;
            break;

        case 'return':
            console.log(`\nYou selected: ${TUNINGS[index].toString()}`);
            process.exit(0);
    }

    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0)
    console.log(TUNINGS[index].toString());
});
