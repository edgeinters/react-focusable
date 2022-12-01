import { isBoundsInFrustum, sortBoundsByPivotDistance } from "../utils/bounds"
import { Focusable } from "./focusable"
import { FocusableDimension, FocusableFrustum } from "./focusableBase"
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

    down(distance: number = 1) {
        FocusablePath.move(distance, FocusableDimension.VERTICAL)
    }

    getFocusable(frustum: FocusableFrustum): Focusable | null {
        const focusables = this.getAllFocusables()
            .filter((focusable) => {
                if (focusable === FocusablePath.focused) return false

                return focusable.bounds && isBoundsInFrustum(focusable.bounds, frustum)
            })
            .sort((focusableA, focusableB) => sortBoundsByPivotDistance(focusableA.bounds!, focusableB.bounds!, frustum))

        return focusables[0] || null
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