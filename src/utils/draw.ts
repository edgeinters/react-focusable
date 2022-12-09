import { FocusableBounds, FocusableFrustum, FocusablePosition } from "../store/focusableBase"
import { FocusableMove } from "../store/focusableDebugger"
import { TransformationDirection, transformPosition } from "./bounds"

export const clearContext = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
}

export const drawBounds = (bounds: FocusableBounds, context: CanvasRenderingContext2D, style: string) => {
    context.lineWidth = 2
    context.strokeStyle = style
    context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height)
}

export const drawFrustum = (frustum: FocusableFrustum, context: CanvasRenderingContext2D) => {
    drawPoint(frustum, context)
}

export const drawPoint = (point: FocusablePosition, context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.stroke();
}

export const drawFocusableMove = (move: FocusableMove, context: CanvasRenderingContext2D) => {
    clearContext(context)

    drawPoint(move.focusedDistancePoint, context)

    for (let i = 0; i <= move.stepIndex; ++i) {
        const step = move.steps[i]

        const globalBounds = transformPosition(step.focusable, TransformationDirection.TO_PARENT)
        // const globalFrustum = {
        //     ...step.frustum,
        //     x: step.frustum.x + (globalBounds.x - step.focusable.bounds!.x),
        //     y: step.frustum.y + (globalBounds.y - step.focusable.bounds!.y)
        // }

        // drawFrustum(globalFrustum, context)
        step.options?.forEach(option => {
            drawBounds(transformPosition(option, TransformationDirection.TO_PARENT) as FocusableBounds, context, 'green')
        })
        drawBounds(globalBounds as FocusableBounds, context, 'red')
    }
}