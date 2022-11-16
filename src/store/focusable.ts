import { action, computed, makeObservable } from 'mobx'

interface Bounds {
    height: number
    x: number,
    y: number,
    width: number,
}

class Focusable {

    readonly id: string

    private _bounds: Bounds | null = null
    private _focusables: { [id: string]: Focusable } = {}

    get bounds() {
        return this._bounds
    }

    constructor(id: string) {
        this.id = id

        makeObservable(this, {
            bounds: computed,
            setBounds: action,
        })
    }

    registerFocusable(focusable: Focusable) {
        this._focusables[focusable.id] = focusable
    }

    setBounds(bounds: Bounds) {
        this._bounds = bounds
    }

}