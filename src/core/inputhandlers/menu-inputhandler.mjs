/**
 * menu-inputhandler.mjs
 * Module containing the functionality to process user inputs on menu interfaces.
 */

import {styleText} from 'node:util';
import readline from 'readline';

/**
 * Abstract interface for the input handlers for menus. The guitar tabber app's
 * menus are vertical, so this interface handles up/down/select events.
 */
class MenuInputhandler {
    /** @type {string[]} */
    options;

    /** @type {number} */
    selectedIndex;

    /** @type {number} */
    previousIndex;

    constructor(options, title) {
        this.options = options;
        this.selectedIndex = 0;
        this.previousIndex = -1;
        this.firstRender(title);
    }

    up() {
        this.previousIndex = this.selectedIndex;

        this.selectedIndex =
            (this.selectedIndex - 1 + this.options.length) % this.options.length;

        this.update();
    }

    down() {
        this.previousIndex = this.selectedIndex;
        this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
        this.update();
    }

    firstRender(title) {
        throw new Error('Should not call abstract method firstRender().');
    }

    listen() {
        throw new Error('Should not call abstract method listen().');
    }

    update() {
        throw new Error('Should not call abstract method render().');
    }
}

/**
 * Implementation of the menu input handler interface for the terminal version
 * of the app.
 */
class TerminalMenuInputHandler extends MenuInputhandler {
    constructor(options, title) {
        super(options, title);
    }

    /**
     * @param {string} title
     *
     * Prints the menu. First, it prints the title wrapped in banner form, and then
     * the list of options. The first option is selected by default, and the cursor
     * is set accordingly.
     */
    firstRender(title) {
        const titleLen = title.length;

        // Need two extra *'s at the beginning and at the end to fully frame the
        // menu's title :)
        const bannerBorder = '*'.repeat(titleLen + 4);

        // Print the title in banner-style.
        console.log(styleText(['blueBright'], bannerBorder));
        console.log(styleText(['blueBright'], `* ${title} *`));
        console.log(styleText(['blueBright'], bannerBorder));
        console.log('\n');

        // Print the menu's options, first one selected, and set the cursor to it.
        console.log(styleText(['greenBright'], `- ${this.options[0]}`));

        for (let i = 1; i < this.options.length; i++) {
            console.log(`- ${this.options[i]}`);
        }

        readline.moveCursor(process.stdout, 0, -this.options.length)
    }

    /**
     * @returns {Promise}
     */
    async listen() {
        return await new Promise(resolve => {
            readline.emitKeypressEvents(process.stdin);
            process.stdin.setRawMode(true);

            const keyHandler = (_, key) => {
                switch (key.name) {
                    case 'c':
                        if (key.ctrlKey) {
                            cleanup();
                            process.exit(0);
                        }
                        break;

                    case 'up':
                    case 'k':
                    case 'p':
                        this.up();
                        break;

                    case 'down':
                    case 'j':
                    case 'n':
                        this.down();
                        break;

                    case 'return':
                        cleanup();
                        resolve();
                        break;
                }
            };

            const cleanup = () => {
                readline.moveCursor(
                    process.stdout,
                    0,
                    this.options.length - this.selectedIndex
                );

                process.stdin.setRawMode(false);
                process.stdin.removeListener('keypress', keyHandler)
            };

            process.stdin.on('keypress', keyHandler);
        });
    }

    /**
     *
     */
    update() {
        readline.clearLine(process.stdout, 0);
        process.stdout.write(`- ${this.options[this.previousIndex]}\r`);

        const lineDelta = this.selectedIndex - this.previousIndex;
        readline.moveCursor(process.stdout, 0, lineDelta);
        readline.clearLine(process.stdout, 0);

        process.stdout.write(
            styleText(['greenBright'], `- ${this.options[this.previousIndex]}\r`)
        );
    }
}