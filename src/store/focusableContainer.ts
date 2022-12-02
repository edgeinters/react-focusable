import { toJS } from "mobx"
import { isBoundsInFrustum, sortBoundsByPivotDistance } from "../utils/bounds"
import { getFrustum, transformFrustumToChild, transformFrustumToParent } from "../utils/frustum"
import { Focusable, isFocusable } from "./focusable"
import { FocusableBase, FocusableBounds, FocusableCallback, FocusableDirection, FocusableFrustum, FocusableOffsetCallback } from "./focusableBase"
import focusablePath from "./focusablePath"

export class FocusableContainer extends FocusableBase {

    private _focusables: { [key: string]: FocusableBase } = {}

    getFocusableCallback?: FocusableCallback
    getFocusableOffsetCallback?: FocusableOffsetCallback

    get focusables() {
        return this._focusables
    }

    get hasFocus(): boolean {
        return Object.values(this._focusables).some(focusable => {
            if (isFocusableContainer(focusable)) return focusable.hasFocus
            if (isFocusable(focusable)) return focusable.isFocused
            return false
        })
    }

    constructor(parent: FocusableContainer | null, key: string, bounds: FocusableBounds | null = null) {
        super(parent, key, bounds)
    }

    getFocusable(frustum: FocusableFrustum, direction: FocusableDirection): Focusable | null {
        console.log('getFocusable:', this.key, frustum);
        const focusable = this.getFocusableCallback && this.getFocusableCallback(frustum, direction)
        if (focusable) return focusable

        const focusables = Object.values(this.focusables)
            .filter((focusable) => {
                if (focusable === focusablePath.focused || (focusable as FocusableContainer).hasFocus) return false

                console.log('filtering focusable: ', focusable.key, focusablePath.focused?.key);

                return focusable.bounds && isBoundsInFrustum(focusable.bounds, frustum)
            })
            .sort((focusableA, focusableB) => sortBoundsByPivotDistance(focusableA.bounds!, focusableB.bounds!, frustum))

        const nearestFocusable = focusables[0]
        console.log('nearestFocusable: ', this.key, focusables, frustum, toJS(this.bounds));

        // no focusable on the same level, we have to try upper
        if (!nearestFocusable) return this.parent?.getFocusable(transformFrustumToParent(this.parent, getFrustum(this.bounds!, direction)), direction) || null

        // we found focusable to which to five focus
        if (isFocusable(nearestFocusable)) return nearestFocusable

        // we found focusableContainer on the same level, lets get focusable from him
        return (nearestFocusable as FocusableContainer).getFocusable(transformFrustumToChild(nearestFocusable as FocusableContainer, frustum), direction)
    }

    registerFocusable(focusable: FocusableBase) {
        this._focusables[focusable.key] = focusable

        // If no another focusable is focused, focus it
        if (!focusablePath.hasFocus && isFocusable(focusable) && focusable.enabled) {
            focusablePath.focus(focusable)
        }
    }

    unregisterFocusable(focusable: FocusableBase) {
        delete this._focusables[focusable.key]

        // Notify path, that focused item is destroying and loosing focus
        if (isFocusable(focusable) && focusable.isFocused) {
            focusablePath.blur()
        }
    }

    unregisterFocusableWithKey(key: string) {
        if (this._focusables[key]) {
            this.unregisterFocusable(this._focusables[key])
        }
    }

}

export const isFocusableContainer = (focusable: FocusableBase): focusable is FocusableContainer => {
    return (focusable as FocusableContainer).focusables !== undefined
}