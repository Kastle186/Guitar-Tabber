class Base {
    constructor() {
    }

    test() {
        console.log(this.constructor);
        console.log(this.constructor.name);
        console.log(this.constructor === Base);
        console.log(this.constructor === Derived);
    }
}

class Derived extends Base {
    constructor() {
        super();
    }

    test() {
        super.test();
        console.log(this.constructor === Base);
        console.log(this.constructor === Derived);
    }
}

let test1 = new Base();
let test2 = new Derived();

test1.test();
test2.test();