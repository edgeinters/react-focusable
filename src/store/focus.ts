import { Focusable } from "./focusable"
import { FocusableDimension, FocusableDirection, FocusableFrustum } from "./focusableBase"
import { FocusableContainer } from "./focusableContainer"
import FocusablePath from "./focusablePath"

class Focus extends FocusableContainer {

    constructor() {
        super(null, 'root')
    }

    down(distance: number = 1) {
        FocusablePath.move(distance, FocusableDimension.VERTICAL)
    }

    getFocusable(frustum: FocusableFrustum, direction: FocusableDirection): Focusable | null {
        console.log('getFocusable: ', frustum, direction);
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