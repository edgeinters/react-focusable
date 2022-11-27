import { action, computed, makeObservable, observable } from "mobx";

import { isOppositeDimensions, isOppositeDirection } from "../utils/direction";
import { Focusable } from "./focusable";
import { FocusableDimension, FocusableDirection } from "./focusableBase";

class FocusablePath {

    private _currentFocusableIndex: number
    private _dimension: FocusableDimension
    private _distance: number
    private _focusables: Focusable[]
    private _timeout: number

    get dimension() {
        return this._dimension
    }

    get direction() {
        if (this._dimension === FocusableDimension.VERTICAL) {
            return this._distance < 0 ? FocusableDirection.UP : FocusableDirection.DOWN
        } else {
            return this._distance < 0 ? FocusableDirection.LEFT : FocusableDirection.RIGHT
        }
    }

    get distanceSign() {
        if (this._distance < 0) return -1
        return 1
    }

    get focused(): Focusable | null {
        return this._focusables[this._currentFocusableIndex] || null
    }

    get hasFocus() {
        return this.focused !== null
    }

    get stepTime() {
        return 300
    }

    constructor() {
        this.focus(null)

        makeObservable<FocusablePath,
            '_currentFocusableIndex' |
            '_focusables'
        >(this, {
            _currentFocusableIndex: observable,
            _focusables: observable,
            focus: action,
            focused: computed,
            move: action,
            step: action
        })
    }

    blur() {
        this.stop()

        console.log('blur!');
    }

    focus(focusable: Focusable | null) {
        this.stop()

        this._dimension = FocusableDimension.UNKNOWN
        this._focusables = focusable ? [focusable] : []
        this._currentFocusableIndex = 0
    }

    move(distance: number, dimension: FocusableDimension) {
        if (!this.hasFocus) {
            return
        }

        if (isOppositeDimensions(this._dimension, dimension)) {
            this.focus(this.focused)
        }

        if (isOppositeDirection(distance, this._distance)) {
            this.stop()
        }

        this._dimension = dimension
        this._distance += distance

        if (!this._timeout) {
            this.step()
        }
    }

    step() {
        if (Math.abs(this._distance) < 1) {
            return this.stop()
        }

        const nextFocus = this.focused?.parent.getNextFocusable(this.focused!, this.direction)

        if (!nextFocus) {
            return this.stop()
        }

        this._focusables.push(nextFocus)
        this._currentFocusableIndex = this._focusables.length - 1

        this._distance = Math.max(Math.abs(this._distance) - 1, 0) * this.distanceSign
        this._timeout = window.setTimeout(() => this.step(), this.stepTime)
    }

    stop() {
        clearTimeout(this._timeout)

        this._distance = 0
        this._timeout = 0
    }

}

export default new FocusablePath()