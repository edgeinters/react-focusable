import { action, computed, makeObservable, observable } from "mobx";
import { FocusableBase, FocusableFrustum, FocusablePosition } from "./focusableBase";

export interface FocusableMove {
    focusedDistancePoint: FocusablePosition
    stepIndex: number
    steps: {
        focusable: FocusableBase
        frustum: FocusableFrustum
        options: FocusableBase[]
    }[]
}

class FocusableDebugger {

    private _enabled: boolean = false
    private _focusable: FocusableBase
    private _focusableFrustum: FocusableFrustum
    private _focusableOptions: FocusableBase[] = []

    get focusable() {
        return this._focusable
    }

    get focusableFrustum() {
        return this._focusableFrustum
    }

    get focusableOptions() {
        return this._focusableOptions
    }

    constructor() {
        makeObservable<FocusableDebugger, '_enabled' | '_focusable' | '_focusableFrustum' | '_focusableOptions'>(this, {
            _enabled: observable,
            _focusable: observable,
            _focusableFrustum: observable,
            _focusableOptions: observable,
            focusable: computed,
            focusableFrustum: computed,
            focusableOptions: computed,
            step: action,
            setEnabled: action,
        })
    }

    log(message: any, ...optionalParams: any[]) {
        if (!this._enabled) return

        console.log('[FocusableDebugger]', message, optionalParams);
    }

    setEnabled(enabled: boolean) {
        this._enabled = enabled
    }

    *step(focusable: FocusableBase, frustum: FocusableFrustum, options: FocusableBase[] = []) {
        this._focusable = focusable
        this._focusableFrustum = frustum
        this._focusableOptions = options

        yield
    }
}

export default new FocusableDebugger()