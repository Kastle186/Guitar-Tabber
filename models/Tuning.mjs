/**
 * Tuning.mjs
 * Class for the general functionality regarding guitar tunings information.
 */

'use strict';

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

/** @type {Tuning[]} */
const TUNINGS = [
    new Tuning('Standard', 'E-A-D-G-B-E'),
    new Tuning('Half-Step Down', 'D#-G#-C#-F#-A#-D#'),
    new Tuning('One Step Down', 'D-G-C-F-A-D'),
    new Tuning('Drop D', 'D-A-D-G-B-E'),
    new Tuning('Open D', 'D-A-D-F#-A-D'),
    new Tuning('Drop C', 'C-G-C-F-A-D'),
    new Tuning('Open G', 'D-G-D-G-B-D'),
    new Tuning('Open C', 'C-G-C-G-C-E'),
    new Tuning('Drop B', 'B-Gb-B-E-Ab-Db'),
    new Tuning('Open E', 'E-B-E-G#-B-E'),
    new Tuning('Drop A', 'A-E-A-D-F#-B')
];

export { TUNINGS }
