import { isBoundsInFrustum, sortBoundsByPivotDistance } from "../utils/bounds"
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

    down(distance: number = 1) {
        FocusablePath.move(distance, FocusableDimension.VERTICAL)
    }

    getFocusable(frustum: FocusableFrustum, direction: FocusableDirection): Focusable | null {
        console.log('getFocusable: ', frustum, direction, FocusablePath.focused?.bounds);
        const focusables = this.getAllFocusables()
            .filter((focusable) => {
                return focusable.bounds && isBoundsInFrustum(focusable.bounds, frustum)
            })
            .sort((focusableA, focusableB) => sortBoundsByPivotDistance(focusableA.bounds!, focusableB.bounds!, frustum))
            .map(focusable => focusable.key)

        console.log('focusables: ', focusables);
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