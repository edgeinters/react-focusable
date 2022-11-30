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
    const minAngle = minPosition ? Math.tan((minPosition.y - boundsPivot.y) / (minPosition.x - boundsPivot.x)) : -Math.PI / 2
    const maxAngle = maxPosition ? Math.tan((maxPosition.y - boundsPivot.y) / (maxPosition.x - boundsPivot.x)) : Math.PI / 2

    return {
        minAngle,
        maxAngle,
        x: boundsPivot.x,
        y: boundsPivot.y,
    }

}