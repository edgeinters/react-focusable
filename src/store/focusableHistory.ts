export enum FocusableHistoryDirection {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
}

export class FocusableHistory {

    readonly direction: FocusableHistoryDirection

    constructor(direction: FocusableHistoryDirection) {
        this.direction = direction
    }

}