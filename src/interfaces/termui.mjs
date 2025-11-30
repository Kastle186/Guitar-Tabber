/**
 * termui.mjs
 * Interface functionality for the terminal version of the guitar tabber app.
 */

import { MAIN_MENU } from "../core/constants.mjs";
import { ALL_TUNINGS } from '../models/Tuning.mjs';

import { BaseUI } from "./baseui.mjs";
import { TerminalMenuInputHandler } from '../core/inputhandlers/menu-inputhandler.mjs';

export class TerminalUI extends BaseUI {
    async run() {
        const funcs = [this.newTab, this.loadTab];
        const menuOptions = {};

        // Map each option label to the corresponding function in this class. This, so
        // we can call it dynamically after the user selects it from the menu.

        MAIN_MENU.forEach((label, index) => {
            menuOptions[label] = funcs[index];
        });

        const mainMenuHandler = new TerminalMenuInputHandler(MAIN_MENU, 'Main Menu!');
        await mainMenuHandler.listen();

        const selectedOpt = MAIN_MENU[mainMenuHandler.selectedIndex];
        await menuOptions[selectedOpt]();
    }

    async newTab() {
        console.log('\nAwesome! Now, select the tuning you want to use.\n');

        const tuningsHandler = new TerminalMenuInputHandler(
            ALL_TUNINGS.map(t => t.toString()),
            'Tunings!');

        await tuningsHandler.listen();
        console.log(`\nYou selected ${ALL_TUNINGS[tuningsHandler.selectedIndex]}!\n`);
    }

    async loadTab() {
        console.log('Load Tab Selected!');
    }
}