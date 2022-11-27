import { computed, makeObservable } from 'mobx'

import { FocusableBase, FocusableBounds } from './focusableBase'
import { FocusableContainer } from './focusableContainer'
import FocusablePath from './focusablePath'

export class Focusable extends FocusableBase {

    readonly parent: FocusableContainer

    get isFocused() {
        return FocusablePath.focused === this
    }

    constructor(parent: FocusableContainer, key: string, bounds: FocusableBounds | null = null) {
        super(parent, key, bounds)

        makeObservable(this, {
            isFocused: computed,
        })
    }

    focus() {
        FocusablePath.focus(this)
    }

}

export const isFocusable = (focusable: FocusableBase): focusable is Focusable => {
    return (focusable as Focusable).focus !== undefined
}