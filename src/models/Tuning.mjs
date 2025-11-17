/**
 * Tuning.mjs
 * Class for the general functionality regarding guitar tunings information.
 */

/**
 * Represents a musical tuning for a stringed instrument.
 * Each tuning has a name and an array of string keys (notes).
 */
class Tuning {
    /** @type {string} */
    name;

    /** @type {string[]} */
    stringKeys;

    /**
     * Creates a new Tuning instance.
     * @param {string} name
     * @param {string[] | string} stringKeys
     */
    constructor(name, stringKeys) {
        this.name = name;

        if (Array.isArray(stringKeys))
            this.stringKeys = stringKeys;
        else if (typeof stringKeys == 'string')
            this.stringKeys = stringKeys.split('-');
        else
            throw new TypeError(
                "Tuning string keys have to be an array or a dash '-' delimited string."
            );
    }

    /**
     * Override the default toString() method with a descriptive representation
     * of the tuning.
     * @returns {string}
     */
    toString() {
        return `${this.name}: ${this.stringKeys.join('-')}`;
    }
}

// /**
//  * Helper class to make it easier to use the list of tunings.
//  */
// class TuningsMenuList {
//     /** @type {number} */
//     static #selectionIndex = 0;
//
//     /** @type {[Tuning, boolean][]} */
//     static #tunings = [
//         // Select the first one by default.
//         { 'tuning': new Tuning('Standard', 'E-A-D-G-B-E'), 'selected': true },
//         { 'tuning': new Tuning('Half-Step Down', 'D#-G#-C#-F#-A#-D#'), 'selected': false },
//         { 'tuning': new Tuning('One Step Down', 'D-G-C-F-A-D'), 'selected': false },
//         { 'tuning': new Tuning('Drop D', 'D-A-D-G-B-E'), 'selected': false },
//         { 'tuning': new Tuning('Open D', 'D-A-D-F#-A-D'), 'selected': false },
//         { 'tuning': new Tuning('Drop C', 'C-G-C-F-A-D'), 'selected': false },
//         { 'tuning': new Tuning('Open G', 'D-G-D-G-B-D'), 'selected': false },
//         { 'tuning': new Tuning('Open C', 'C-G-C-G-C-E'), 'selected': false },
//         { 'tuning': new Tuning('Drop B', 'B-Gb-B-E-Ab-Db'), 'selected': false },
//         { 'tuning': new Tuning('Open E', 'E-B-E-G#-B-E'), 'selected': false },
//         { 'tuning': new Tuning('Drop A', 'A-E-A-D-F#-B'), 'selected': false },
//     ];
//
//     /** @type {number} */
//     static #numTunings = this.#tunings.length;
//
//     static get tunings() {
//         return this.#tunings;
//     }
//
//     static selectUp() {
//
//     }
//
//     static selectDown() {
//
//     }
//
//     /**
//      * Update the state of the menu list according to the received input from
//      * the user interface.
//      * @param {number} cursorMovement
//      */
//     static #select(cursorMovement) {
//     }
// }