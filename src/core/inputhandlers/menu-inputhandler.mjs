/**
 * menu-inputhandler.mjs
 * Module containing the functionality to process user inputs on menu interfaces.
 */

import { styleText } from 'node:util';

/**
 * Abstract interface for the input handlers for menus. The guitar tabber app's
 * menus are vertical, so this interface handles up/down/select events.
 */
class MenuInputhandler {
    /** @type {string[]} */
    options;

    /** @type {number} */
    selectedIndex;

    /** @type {string} */
    title;

    constructor(options, title) {
        this.options = options;
        this.selectedIndex = 0;
        this.title = title;

        this.firstRender();
        this.listen();
    }

    up() {
        this.selectedIndex =
            (this.selectedIndex - 1 + this.options.length) % this.options.length;
        this.update();
    }

    down() {
        this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
        this.update();
    }

    select() {
        return this.selectedIndex;
    }

    firstRender() {
        if (this.constructor === MenuInputhandler) {
            throw new Error('Should not call abstract method firstRender().');
        }

        const titleLen = this.title.length;

        // Need two extra *'s at the beginning and at the end to fully frame the
        // menu's title :)
        const bannerBorder = '*'.repeat(titleLen + 4);

        console.log(styleText(['blueBright'], bannerBorder));
        console.log(styleText(['blueBright'], `* ${this.title} *`));
        console.log(styleText(['blueBright'], bannerBorder));
        console.log('\n');
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
    constructor(options) {
        super(options);
    }

    firstRender() {
        super.firstRender();
        console.log(styleText(['greenBright'], `- ${this.options[0]}`));

        for (let i = 1; i < this.options.length; i++) {
            console.log(`- ${this.options[i]}`);
        }
    }

    listen() {
        process.stdin.on('keypress', (_, key) => {
            switch (key.name) {
                case 'up': case 'k': case 'p':
                    this.up();
                    break;

                case 'down': case 'j': case 'n':
                    this.down();
                    break;

                case 'enter':
                    this.select();
                    break;
            }
        });
    }

    update() {
    }
}