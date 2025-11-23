/**
 * baseui.mjs
 * Base interface model that the terminal and web derived interfaces will implement.
 */

export class BaseUI {
    run() {
        throw new Error('Should not call abstract method mainMenu().');
    }

    newTab() {
        throw new Error('Should not call abstract method newTab().');
    }

    loadTab() {
        throw new Error('Should not call abstract method loadTab().');
    }
}