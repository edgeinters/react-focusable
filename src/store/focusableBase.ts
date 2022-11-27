import { action, computed, makeObservable, observable } from "mobx"
import { FocusableContainer } from "./focusableContainer"

export interface FocusableBounds extends FocusablePosition {
    height: number
    width: number,
}

export enum FocusableDimension {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
    UNKNOWN = 'UNKNOWN'
}

export enum FocusableDirection {
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    UP = 'UP',
}

export interface FocusablePosition {
    x: number
    y: number
}

export interface FocusableInterface {
    readonly bounds: FocusableBounds
    readonly isEnabled: boolean
    readonly key: string
}

export class FocusableBase {

    readonly key: string
    readonly parent: FocusableContainer | null

    private _bounds: FocusableBounds | null = null
    private _enabled: boolean = true

    get bounds() {
        return this._bounds
    }

    get enabled() {
        return this._enabled
    }

    constructor(parent: FocusableContainer | null, key: string, bounds: FocusableBounds | null = null) {
        this.key = key
        this.parent = parent

        this._bounds = bounds

        makeObservable<FocusableBase,
            '_bounds' |
            '_enabled'
        >(this, {
            _bounds: observable,
            _enabled: observable,
            bounds: computed,
            enabled: computed,
            setBounds: action,
            setEnabled: action,
        })

        if (this.parent) {
            this.parent.registerFocusable(this)
        }
    }

    setBounds(bounds: FocusableBounds) {
        this._bounds = bounds
    }

    setEnabled(enabled: boolean) {
        this._enabled = enabled
    }

}