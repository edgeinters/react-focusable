import { toJS } from "mobx";
import { FocusableBase, FocusableBounds, FocusableFrustum, FocusablePosition } from "../store/focusableBase";
import { isPivotInFrustum, TransformationDirection } from "./frustum";

export const getBoundsTopLeft = (bounds: FocusableBounds): FocusablePosition => {
    return {
        x: bounds.x,
        y: bounds.y,
    }
}

export const getBoundsTopRight = (bounds: FocusableBounds): FocusablePosition => {
    return {
        x: bounds.x + bounds.width,
        y: bounds.y,
    }
}

export const getBoundsBottomLeft = (bounds: FocusableBounds): FocusablePosition => {
    return {
        x: bounds.x,
        y: bounds.y + bounds.height,
    }
}

export const getBoundsBottomRight = (bounds: FocusableBounds): FocusablePosition => {
    return {
        x: bounds.x + bounds.width,
        y: bounds.y + bounds.height,
    }
}

export const getBoundsPivot = (bounds: FocusableBounds): FocusablePosition => {
    return {
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2
    }
}

export const isBoundsInFrustum = (bounds: FocusableBounds, frustum: FocusableFrustum): boolean => {
    const boundsPivot = getBoundsPivot(bounds)
    console.log('isBoundsInFrustum: ', isPivotInFrustum(boundsPivot, frustum), toJS(bounds), frustum, boundsPivot, Math.atan2(boundsPivot.y - frustum.y, boundsPivot.x - frustum.x));

    return isPivotInFrustum(boundsPivot, frustum)
}

export const getBoundsPivotDistance = (bounds: FocusableBounds, pivot: FocusablePosition): number => {
    const boundsPivot = getBoundsPivot(bounds)

    return getPositionsDistance(boundsPivot, pivot)
}

export const getPositionsDistance = (positionA: FocusablePosition, positionB: FocusablePosition): number => {
    return Math.sqrt(Math.pow(positionA.x - positionB.x, 2) + Math.pow(positionA.y - positionB.y, 2))
}

export const sortBoundsByPivotDistance = (boundsA: FocusableBounds, boundsB: FocusableBounds, pivot: FocusablePosition): number => {
    const distanceA = getBoundsPivotDistance(boundsA, pivot)
    const distanceB = getBoundsPivotDistance(boundsB, pivot)

    if (distanceA <= distanceB) return -1
    return 1
}

export const sortFocusablesByPivotDistance = (focusableA: FocusableBase, focusableB: FocusableBase, globalPivot: FocusablePosition): number => {
    const positionA = transformPivotPosition(focusableA, TransformationDirection.TO_PARENT)
    const positionB = transformPivotPosition(focusableB, TransformationDirection.TO_PARENT)

    if (getPositionsDistance(positionA, globalPivot) <= getPositionsDistance(positionB, globalPivot)) return -1
    return 1
}

export const transformPivotPosition = (focusable: FocusableBase, direction: TransformationDirection): FocusablePosition => {
    if (!focusable.bounds) return { x: 0, y: 0 }

    const boundsPosition = transformPosition(focusable, direction)

    return getBoundsPivot({
        ...focusable.bounds,
        ...boundsPosition
    })
}

export const transformPosition = (focusable: FocusableBase, direction: TransformationDirection): FocusablePosition => {
    let position = focusable.bounds ? { ...focusable.bounds } : { x: 0, y: 0 }
    let container = focusable.parent

    while (container) {
        if (container.bounds) {
            position.x += container.bounds.x * direction
            position.y += container.bounds.y * direction
        }

        container = container.parent
    }

    return position
}