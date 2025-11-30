/* InputManager.mjs */

import { EventEmitter } from "events";

export class InputManager extends EventEmitter {
    constructor(stdin = process.stdin) {
        super();

        this.stdin = stdin;
        this.rawMode = false;
        this.ignoreNext = false;

        this.stdin.setEncoding("utf8");
        this.stdin.resume();

        this.stdin.on("data", (data) => this._handleData(data));
    }

    // --- PUBLIC API ----------------------------------------------------------

    enableRaw() {
        if (this.rawMode) return;
        this.rawMode = true;

        this.stdin.setRawMode(true);
        this.emit("modeChange", "raw");
    }

    disableRaw() {
        if (!this.rawMode) return;
        this.rawMode = false;

        this.stdin.setRawMode(false);

        // Ignore any leftover buffered input
        this.ignoreNext = true;

        this.emit("modeChange", "line");
    }

    toggleRaw() {
        this.rawMode ? this.disableRaw() : this.enableRaw();
    }

    close() {
        this.stdin.setRawMode(false);
        this.stdin.pause();
    }

    // --- INTERNAL ------------------------------------------------------------

    _handleData(data) {
        // Buffer flush protection
        if (this.ignoreNext) {
            this.ignoreNext = false;
            return;
        }

        if (this.rawMode) {
            this.emit("key", data);
        } else {
            this.emit("line", data);
        }
    }
}

/* Main.js */

import { InputManager } from "./InputManager.js";

const input = new InputManager();

// Listen to line input
input.on("line", (line) => {
    console.log("LINE:", line.trim());

    if (line.trim() === "raw") {
        console.log("👉 Switching to raw mode");
        input.enableRaw();
    }
});

// Listen to keypresses
input.on("key", (key) => {
    console.log("KEY:", JSON.stringify(key));

    if (key === "l") {
        console.log("👉 Switching to line mode");
        input.disableRaw();
    }

    if (key === "\u0003") {
        console.log("Exiting…");
        input.close();
        process.exit();
    }
});

input.on("modeChange", (mode) => {
    console.log(`Mode changed → ${mode}`);
});