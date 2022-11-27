import { Focusable, isFocusable } from "./focusable"
import { FocusableBase, FocusableBounds, FocusableDirection, FocusablePosition } from "./focusableBase"
import focusablePath from "./focusablePath"

export type NextFocusableCallback = (focusable: Focusable, direction: FocusableDirection) => Focusable | null
export type FocusableOffsetCallback = () => FocusablePosition

export class FocusableContainer extends FocusableBase {

    private _focusables: { [key: string]: FocusableBase } = {}

    getNextFocusableCallback?: NextFocusableCallback
    getFocusableOffsetCallback?: FocusableOffsetCallback

    get focusables() {
        return this._focusables
    }

    constructor(parent: FocusableContainer | null, key: string, bounds: FocusableBounds | null = null) {
        super(parent, key, bounds)
    }

    getNextFocusable(focusable: Focusable, direction: FocusableDirection): Focusable | null {
        const nextFocusable = this.getNextFocusableCallback && this.getNextFocusableCallback(focusable, direction)
        if (nextFocusable) return nextFocusable

        return this.parent?.getNextFocusable(focusable, direction) || null
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