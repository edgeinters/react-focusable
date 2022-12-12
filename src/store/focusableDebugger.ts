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
    private _interactive: boolean = false
    private _interval: number

    moves: FocusableMove[] = []

    get currentMove() {
        return (this.moves.length && this.moves[0]) || null
    }

    get lastMove() {
        return (this.moves.length && this.moves[this.moves.length - 1]) || null
    }

    constructor() {
        makeObservable<FocusableDebugger, '_enabled' | '_interactive' | '_nextStep'>(this, {
            _enabled: observable,
            _interactive: observable,
            _nextStep: action,
            currentMove: computed,
            lastMove: computed,
            moves: observable,
            setEnabled: action,
            setInteractive: action,
            stepFrom: action,
            stepOver: action,
        })

        reaction(() => this.moves.length > 0 && this._enabled && !this._interactive,
            (shouldStart) => {
                clearInterval(this._interval)

                if (shouldStart) {
                    this._interval = window.setInterval(this._nextStep, 300)
                }
            })
    }

    log(message: any, ...optionalParams: any[]) {
        if (!this._enabled) return

        console.log('[FocusableDebugger]', message, ...optionalParams)
    }

    setEnabled(enabled: boolean) {
        this._enabled = enabled
    }

    setInteractive(interactive: boolean) {
        this._interactive = interactive
    }

    stepBackward() {
        if (!this._interactive) {
            this.log('Interaction is not enabled. Set interactive prop on <FocusableDebugger/>')
            return
        }

        this._previousStep()
    }

    stepForward() {
        if (!this._interactive) {
            this.log('Interaction is not enabled. Set interactive prop on <FocusableDebugger/>')
            return
        }

        this._nextStep()
    }

    stepFrom(focusable: Focusable, frustum: FocusableFrustum, focusedDistancePoint: FocusablePosition) {
        if (!this._enabled) return

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
        if (!this._enabled) return

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

    private _previousStep = () => {
        if (!this.currentMove) return

        if (this.currentMove.stepIndex > 0) {
            this.currentMove.stepIndex--
        } else {
            this.log('It is not possible to go to the previous move. Interaction works only within current move')
        }
    }
}

export default new FocusableDebugger()