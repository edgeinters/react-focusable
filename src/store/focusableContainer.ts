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

    getAllFocusables(): Focusable[] {
        return Object.values(this._focusables).reduce((focusables, focusable) => {
            if (isFocusable(focusable)) return [...focusables, focusable]

            return [...focusables, ...(focusable as FocusableContainer).getAllFocusables()]
        }, [])
    }

    getFocusable(frustum: FocusableFrustum, direction: FocusableDirection): Focusable | null {
        const focusable = this.getFocusableCallback && this.getFocusableCallback(frustum, direction)

        return focusable || this.parent?.getFocusable(frustum, direction) || null
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