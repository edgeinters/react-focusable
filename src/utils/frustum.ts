import { FocusableBounds, FocusableDirection, FocusableFrustum, FocusablePosition } from "../store/focusableBase";
import { getBoundsBottomLeft, getBoundsBottomRight, getBoundsPivot, getBoundsTopLeft, getBoundsTopRight } from "./bounds";
import { areVectorsClockwise } from "./vector";

export enum TransformationDirection {
    'TO_PARENT' = 1,
    'TO_CHILD' = -1,
}

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
    const maxAngle = maxPosition && Math.atan2(maxPosition.y - boundsPivot.y, maxPosition.x - boundsPivot.x)
    const maxVector = maxPosition && {
        x: maxPosition.x - boundsPivot.x,
        y: maxPosition.y - boundsPivot.y
    }
    const minAngle = minPosition && Math.atan2(minPosition.y - boundsPivot.y, minPosition.x - boundsPivot.x)
    const minVector = minPosition && {
        x: minPosition.x - boundsPivot.x,
        y: minPosition.y - boundsPivot.y
    }

    return {
        maxAngle,
        maxVector,
        minAngle,
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

export const transformFrustumTo = (frustum: FocusableFrustum, bounds: FocusableBounds | null, direction: TransformationDirection): FocusableFrustum => {
    if (!bounds) return frustum

    return {
        ...frustum,
        x: frustum.x + bounds.x * direction,
        y: frustum.y + bounds.y * direction
    }
}