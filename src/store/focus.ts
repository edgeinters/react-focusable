import { toJS } from "mobx"
import { Focusable } from "./focusable"
import { FocusableDimension, FocusableDirection, FocusableFrustum } from "./focusableBase"
import { FocusableContainer } from "./focusableContainer"
import FocusablePath from "./focusablePath"

class Focus extends FocusableContainer {

    constructor() {
        super(null, 'root')

        this.setBounds({
            height: 0,
            width: 0,
            x: 0,
            y: 0
        })
    }

    getFocusable(frustum: FocusableFrustum, direction: FocusableDirection): Focusable | null {
        Object.values(this.focusables).map(focusable => {
            console.log(focusable.key, toJS(focusable.bounds));
        })

        return super.getFocusable(frustum, direction)
    }

    down(distance: number = 1) {
        FocusablePath.move(distance, FocusableDimension.VERTICAL)
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