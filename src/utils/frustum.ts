import { FocusableBounds, FocusableDirection, FocusableFrustum, FocusablePosition } from "../store/focusableBase";
import { getBoundsBottomLeft, getBoundsBottomRight, getBoundsPivot, getBoundsTopLeft, getBoundsTopRight } from "./bounds";

export const getFrustum = (bounds: FocusableBounds, direction: FocusableDirection): FocusableFrustum => {
    let minPosition: FocusablePosition | null = null
    let maxPosition: FocusablePosition | null = null

    switch (direction) {
        case FocusableDirection.DOWN:
            minPosition = getBoundsBottomRight(bounds)
            maxPosition = getBoundsBottomLeft(bounds)
            break
        case FocusableDirection.LEFT:
            minPosition = getBoundsBottomLeft(bounds)
            maxPosition = getBoundsTopLeft(bounds)
            break
        case FocusableDirection.RIGHT:
            minPosition = getBoundsTopRight(bounds)
            maxPosition = getBoundsBottomRight(bounds)
            break
        case FocusableDirection.UP:
            minPosition = getBoundsTopLeft(bounds)
            maxPosition = getBoundsTopRight(bounds)
            break
    }

    const boundsPivot = getBoundsPivot(bounds)
    const maxVector = maxPosition && {
        x: maxPosition.x - boundsPivot.x,
        y: maxPosition.y - boundsPivot.y
    }
    const minVector = minPosition && {
        x: minPosition.x - boundsPivot.x,
        y: minPosition.y - boundsPivot.y
    }

    return {
        maxVector,
        minVector,
        x: boundsPivot.x,
        y: boundsPivot.y,
    }

}

export const isPivotInFrustum = (pivot: FocusablePosition, frustum: FocusableFrustum): boolean => {
    const pivotVector: FocusablePosition = {
        x: pivot.x - frustum.x,
        y: pivot.y - frustum.y,
    }

    if (!frustum.maxVector || !frustum.minVector) return true

    return !areVectorsClockwise(frustum.minVector, pivotVector) &&
        areVectorsClockwise(frustum.maxVector, pivotVector)
}

export const areVectorsClockwise = (vector1: FocusablePosition, vector2: FocusablePosition) => {
    return -vector1.x * vector2.y + vector1.y * vector2.x > 0
}