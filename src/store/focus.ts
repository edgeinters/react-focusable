import { Focusable } from "./focusable"
import { FocusableDimension, FocusableDirection } from "./focusableBase"
import { FocusableContainer } from "./focusableContainer"
import FocusablePath from "./focusablePath"

class Focus extends FocusableContainer {

    constructor() {
        super(null, 'root')
    }

    down(distance: number = 1) {
        FocusablePath.move(distance, FocusableDimension.VERTICAL)
    }

    getNextFocusable(focusable: Focusable, direction: FocusableDirection): Focusable | null {
        console.log('getNextFocusable: ', focusable, direction);
        return null
    }

    left(distance: number = 1) {
        FocusablePath.move(distance * -1, FocusableDimension.HORIZONTAL)
    }

    right(distance: number = 1) {
        FocusablePath.move(distance, FocusableDimension.HORIZONTAL)
    }

    up(distance: number = 1) {
        FocusablePath.move(distance * -1, FocusableDimension.VERTICAL)
    }

}

export default new Focus()