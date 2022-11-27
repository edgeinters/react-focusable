import { FocusableDimension } from "../store/focusableBase"

export const isOppositeDimensions = (dimensionA: FocusableDimension, dimensionB: FocusableDimension): boolean => {
    return dimensionA !== dimensionB && dimensionA !== FocusableDimension.UNKNOWN && dimensionB !== FocusableDimension.UNKNOWN
}

export const isOppositeDirection = (directionA: number, directionB: number): boolean => {
    return directionA * directionB < 0
}