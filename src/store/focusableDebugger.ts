import { action, computed, makeObservable, observable, reaction } from "mobx";
import { Focusable } from "./focusable";
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
    private _interval: number

    moves: FocusableMove[] = []

    get currentMove() {
        return (this.moves.length && this.moves[0]) || null
    }

    get lastMove() {
        return (this.moves.length && this.moves[this.moves.length - 1]) || null
    }

    constructor() {
        makeObservable<FocusableDebugger, '_enabled' | '_nextStep'>(this, {
            _enabled: observable,
            _nextStep: action,
            currentMove: computed,
            lastMove: computed,
            moves: observable,
            setEnabled: action,
            stepFrom: action,
            stepOver: action,
        })

        reaction(() => this.moves.length > 0 && this._enabled,
            (shouldStart) => {
                clearInterval(this._interval)

                if (shouldStart) {
                    this._interval = window.setInterval(this._nextStep, 300)
                }
            })
    }

    setEnabled(enabled: boolean) {
        this._enabled = enabled
    }

    stepFrom(focusable: Focusable, frustum: FocusableFrustum, focusedDistancePoint: FocusablePosition) {
        this.moves = [{
            focusedDistancePoint,
            stepIndex: 0,
            steps: [{
                focusable,
                frustum,
                options: []
            }],
        }]
    }

    stepOver(focusable: FocusableBase, frustum: FocusableFrustum, options: FocusableBase[]) {
        this.lastMove?.steps.push({
            focusable,
            frustum,
            options
        })
    }

    private _nextStep = () => {
        if (!this.currentMove) return

        if (this.currentMove.stepIndex < this.currentMove.steps.length - 1) {
            this.currentMove.stepIndex++
        } else {
            this.moves.splice(0, 1)
        }
    }
}

export default new FocusableDebugger()