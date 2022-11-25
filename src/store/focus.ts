import { Focusable } from "./focusable";

class Focus extends Focusable {

    constructor() {
        super('root')
    }

    down(force: number = 1) {
        console.log('force: ', force);

    }

    left(force: number = 1) {
        console.log('force: ', force);

    }

    right(force: number = 1) {
        console.log('force: ', force);

    }

    up(force: number = 1) {
        console.log('force: ', force);

    }

}

export default new Focus()