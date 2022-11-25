import { action, computed, makeObservable, observable } from 'mobx'

export interface FocusableBounds {
    height: number
    x: number,
    y: number,
    width: number,
}

export class Focusable {

    readonly key: string
    readonly parent: Focusable | null

    private _bounds: FocusableBounds | null = null
    private _enabled: boolean = true
    private _focusables: { [key: string]: Focusable } = {}
    private _focused: boolean = false

    get bounds() {
        return this._bounds
    }

    get isEnabled() {
        return this._enabled
    }

    get isFocused() {
        return this._focused
    }

    constructor(key: string, parent: Focusable | null = null) {
        this.key = key
        this.parent = parent

        makeObservable<Focusable, '_bounds' | '_enabled' | '_focused'>(this, {
            _bounds: observable,
            _enabled: observable,
            _focused: observable,
            bounds: computed,
            isEnabled: computed,
            isFocused: computed,
            focus: action,
            setBounds: action,
            setEnabled: action,
        })
    }

    focus() {
        console.log('focus:', this.key);
        if (this.isEnabled) {
            this._focused = true
        }
    }

    registerFocusable(focusable: Focusable) {
        this._focusables[focusable.key] = focusable
    }

    unregisterFocusable(focusable: Focusable) {
        if (focusable.isFocused) {

        }

        delete this._focusables[focusable.key]
    }

    unregisterFocusableWithKey(key: string) {
        if (this._focusables[key]) {
            this.unregisterFocusable(this._focusables[key])
        }
    }

    setBounds(bounds: FocusableBounds) {
        this._bounds = bounds
    }

    setEnabled(enabled: boolean) {
        this._enabled = enabled

        if (!enabled && this.isFocused) {
            this._focused = false
        }
    }

}