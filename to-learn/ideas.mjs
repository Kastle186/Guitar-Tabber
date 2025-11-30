// InputHandler.js
class InputHandler {
    constructor(options, renderMenuCallback) {
        this.options = options;
        this.selectedOption = 0;
        this.renderMenu = renderMenuCallback;
    }

    // Handle keypress or button events for 'up', 'down', 'select'
    up() {
        this.selectedOption = Math.max(0, this.selectedOption - 1);
        this.renderMenu();
    }

    down() {
        this.selectedOption = Math.min(this.options.length - 1, this.selectedOption + 1);
        this.renderMenu();
    }

    select() {
        console.log(`You selected: ${this.options[this.selectedOption]}`);
    }

    // Platform-specific event listeners should be provided by subclasses or external setup
    listen() {
        throw new Error('listen() must be implemented in subclass');
    }
}

// Terminal-specific input handler
class TerminalInputHandler extends InputHandler {
    constructor(options, renderMenuCallback) {
        super(options, renderMenuCallback);

        // Setup stdin for terminal
        process.stdin.setRawMode(true);
        process.stdin.resume();
        this.listen(); // Start listening for keypresses
    }

    listen() {
        process.stdin.on('keypress', (_, key) => {
            if (key.name === 'up' || key.name === 'k') {
                this.up();
            } else if (key.name === 'down' || key.name === 'j') {
                this.down();
            } else if (key.name === 'enter' || key.name === 'n') {
                this.select();
            }
        });

        process.on('exit', () => {
            process.stdin.setRawMode(false); // Turn off raw mode on exit
        });
    }
}

// Web-specific input handler
class WebInputHandler extends InputHandler {
    constructor(options, renderMenuCallback) {
        super(options, renderMenuCallback);
        this.listen(); // Start listening for button clicks or key events
    }

    listen() {
        // Listen for key events (e.g., ArrowUp, ArrowDown, Enter)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp' || event.key === 'k') {
                this.up();
            } else if (event.key === 'ArrowDown' || event.key === 'j') {
                this.down();
            } else if (event.key === 'Enter' || event.key === 'n') {
                this.select();
            }
        });

        // Listen for button clicks (e.g., next/prev buttons)
        const upButton = document.querySelector('.up-btn');
        const downButton = document.querySelector('.down-btn');
        const selectButton = document.querySelector('.select-btn');

        upButton.addEventListener('click', () => this.up());
        downButton.addEventListener('click', () => this.down());
        selectButton.addEventListener('click', () => this.select());
    }
}

// Example usage:

// In Terminal, you'd use:
const options = ['Option 1', 'Option 2', 'Option 3'];
const renderMenu = () => console.log(`Current selection: ${options[selectedOption]}`);
const terminalHandler = new TerminalInputHandler(options, renderMenu);

// In Web, you'd use:
const webHandler = new WebInputHandler(options, renderMenu);