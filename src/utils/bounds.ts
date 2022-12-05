import { toJS } from "mobx";
import { FocusableBounds, FocusableFrustum, FocusablePosition } from "../store/focusableBase";
import { isPivotInFrustum } from "./frustum";

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

    return Math.sqrt(Math.pow(boundsPivot.x - pivot.x, 2) + Math.pow(boundsPivot.y - pivot.y, 2))
}

export const sortBoundsByPivotDistance = (boundsA: FocusableBounds, boundsB: FocusableBounds, pivot: FocusablePosition): number => {
    const distanceA = getBoundsPivotDistance(boundsA, pivot)
    const distanceB = getBoundsPivotDistance(boundsB, pivot)

    if (distanceA <= distanceB) return -1
    return 1
}