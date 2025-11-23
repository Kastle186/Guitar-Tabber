/**
 * termui.mjs
 * Interface functionality for the terminal version of the guitar tabber app.
 */

import { BaseUI } from "./baseui.mjs";
import { MAIN_MENU } from "../core/constants.mjs";
import { TerminalMenuInputHandler } from '../core/inputhandlers/menu-inputhandler.mjs';

export class TerminalUI extends BaseUI {
    async run() {
        const funcs = [this.newTab, this.loadTab];
        const menuOptions = {};

        MAIN_MENU.forEach((label, index) => {
            menuOptions[label] = funcs[index];
        });

        const mainMenuHandler = new TerminalMenuInputHandler(MAIN_MENU, 'Main Menu!');
        await mainMenuHandler.listen();

        const selectedOpt = MAIN_MENU[mainMenuHandler.selectedIndex];
        menuOptions[selectedOpt]();
    }

    newTab() {
        console.log('New Tab Selected!');
    }

    loadTab() {
        console.log('Load Tab Selected!');
    }
}