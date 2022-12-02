import { FocusablePosition } from "../store/focusableBase"

export const areVectorsClockwise = (vector1: FocusablePosition, vector2: FocusablePosition) => {
    return -vector1.x * vector2.y + vector1.y * vector2.x > 0
}