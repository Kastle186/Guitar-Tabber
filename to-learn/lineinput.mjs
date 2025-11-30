// LineInput.js
export default class LineInput {
    constructor() {
        this.buffer = [];           // array of characters
        this.cursor = 0;            // cursor position within buffer
    }

    async read(prompt = "") {
        return new Promise((resolve) => {
            this.buffer = [];
            this.cursor = 0;

            process.stdout.write(prompt);

            process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdin.setEncoding("utf8");

            const onData = (key) => {
                // ENTER (carriage return)
                if (key === "\r") {
                    cleanup();
                    process.stdout.write("\n");
                    return resolve(this.buffer.join(""));
                }

                // CTRL+C
                if (key === "\u0003") {
                    cleanup();
                    process.exit();
                }

                // ESCAPE SEQUENCES (arrows)
                if (key === "\u001b[D") {              // Left arrow
                    if (this.cursor > 0) {
                        this.cursor--;
                        process.stdout.write("\u001b[D");
                    }
                    return;
                }

                if (key === "\u001b[C") {              // Right arrow
                    if (this.cursor < this.buffer.length) {
                        this.cursor++;
                        process.stdout.write("\u001b[C");
                    }
                    return;
                }

                // BACKSPACE or DELETE
                if (key === "\u0008" || key === "\u007F") {
                    if (this.cursor > 0) {
                        this.buffer.splice(this.cursor - 1, 1);
                        this.cursor--;

                        // Move cursor left, clear to end, reprint
                        process.stdout.write("\u001b[D");      // move left
                        process.stdout.write("\u001b[K");      // clear to end
                        process.stdout.write(this.buffer.slice(this.cursor).join(""));

                        // Move cursor back to correct position
                        const stepsBack = this.buffer.length - this.cursor;
                        if (stepsBack > 0) {
                            process.stdout.write(`\u001b[${stepsBack}D`);
                        }
                    }
                    return;
                }

                // NORMAL printable character
                if (key >= " " && key <= "~") {
                    this.buffer.splice(this.cursor, 0, key);
                    this.cursor++;

                    // Insert mode: print the updated tail
                    process.stdout.write(key);
                    process.stdout.write(this.buffer.slice(this.cursor).join(""));

                    // Move cursor back if needed
                    const stepsBack = this.buffer.length - this.cursor;
                    if (stepsBack > 0) {
                        process.stdout.write(`\u001b[${stepsBack}D`);
                    }
                }
            };

            const cleanup = () => {
                process.stdin.setRawMode(false);
                process.stdin.pause();
                process.stdin.removeListener("data", onData);
            };

            process.stdin.on("data", onData);
        });
    }
}

import LineInput from "./LineInput.js";

const input = new LineInput();

const name = await input.read("Enter your name: ");
console.log("You typed:", name);

const food = await input.read("Favorite food: ");
console.log("Food:", food);