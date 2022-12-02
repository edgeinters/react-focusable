import { toJS } from "mobx";
import { FocusableBounds, FocusableDirection, FocusableFrustum, FocusablePosition } from "../store/focusableBase";
import { FocusableContainer } from "../store/focusableContainer";
import { getBoundsBottomLeft, getBoundsBottomRight, getBoundsPivot, getBoundsTopLeft, getBoundsTopRight } from "./bounds";
import { areVectorsClockwise } from "./vector";

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

export const transformFrustumToChild = (child: FocusableContainer, frustum: FocusableFrustum): FocusableFrustum => {
    console.log('transformFrustumToChild: ', child.key, toJS(child.bounds), frustum);
    let transformedFrustum = { ...frustum }

    if(!child.bounds) return transformedFrustum
    
    if (frustum.maxVector) {
        transformedFrustum.maxVector = {
            x: frustum.maxVector.x - child.bounds.x,
            y: frustum.maxVector.y - child.bounds.y
        }
    }

    if (frustum.minVector) {
        transformedFrustum.minVector = {
            x: frustum.minVector.x - child.bounds.x,
            y: frustum.minVector.y - child.bounds.y
        }
    }
    
    transformedFrustum.x -= child.bounds.x
    transformedFrustum.y -= child.bounds.y
    
    return transformedFrustum
}

// export const transformFrustumToParent = (parent: FocusableContainer, frustum: FocusableFrustum): FocusableFrustum => {
    
// }