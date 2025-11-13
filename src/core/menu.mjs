/**
 * menu.mjs
 * Module with the functionality to bring menus to life.
 */

class Menu {
    /** @type {Object<string, any>[]} */
    #items;

    /** @type {number} */
    #selectionIndex;

    /**
     * Creates a new Menu instance.
     * @param {any[]} itemsList
     */
    constructor(itemsList) {
        this.#items = itemsList.map((it) => (
            { 'label': it.toString(), 'selected': false })
        );

        this.#selectionIndex = 0;
        this.#items[this.#selectionIndex].selected = true;
    }

    get items() {
        return this.#items;
    }

    /**
     * Returns the object corresponding to the current selection.
     * @returns {Record<string, any>}
     */
    getSelectedOption() {
        return this.#items[this.#selectionIndex];
    }

    selectUp() {
        this.#select(-1);
    }

    selectDown() {
        this.#select(1);
    }

    /**
     * Updates the #selectionIndex value, as well as the status of the menu options
     * as needed.
     * @param {number} direction - Specified as -1 for up, and 1 for down.
     */
    #select(direction) {
        const numItems = this.#items.length;

        // Deselect the current item.
        this.#items[this.#selectionIndex].selected = false;

        // Calculate the next index via modulo arithmetic, and select the new item.
        this.#selectionIndex = (this.#selectionIndex + direction + numItems) % numItems;
        this.#items[this.#selectionIndex].selected = true;
    }
}
