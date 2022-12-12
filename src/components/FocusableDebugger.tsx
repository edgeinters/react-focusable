import { observer } from 'mobx-react-lite'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import focusableDebugger from '../store/focusableDebugger'
import { clearContext, drawFocusableMove } from '../utils/draw'

interface FocusableDebuggerProps {
    enabled?: boolean
    interactive?: boolean
}

export const FocusableDebugger = observer(({ enabled = true, interactive = false }: FocusableDebuggerProps) => {
    const [debugCanvas, setDebugCanvas] = useState<{ canvas: HTMLCanvasElement, context: CanvasRenderingContext2D }>()

    useEffect(() => {
        focusableDebugger.setEnabled(enabled)

        return () => focusableDebugger.setEnabled(false)
    }, [enabled])

    useEffect(() => {
        focusableDebugger.setInteractive(interactive)

        return () => focusableDebugger.setInteractive(false)
    }, [interactive])

    useEffect(() => {
        if (!debugCanvas) return

        if (focusableDebugger.currentMove) {
            drawFocusableMove(focusableDebugger.currentMove, debugCanvas.context)
        } else {
            clearContext(debugCanvas.context)
        }
    }, [focusableDebugger.currentMove, focusableDebugger.currentMove?.stepIndex])

    useLayoutEffect(() => {
        const onResize = () => {
            if (!debugCanvas) return

            debugCanvas.canvas.width = window.innerWidth
            debugCanvas.canvas.height = window.innerHeight

            if (focusableDebugger.currentMove) {
                drawFocusableMove(focusableDebugger.currentMove, debugCanvas.context)
            }
        }

        window.addEventListener('resize', onResize)
        onResize()

        return () => window.removeEventListener('resize', onResize)
    }, [debugCanvas])

    return (
        <canvas
            ref={(canvasRef) => {
                if (canvasRef && !debugCanvas)
                    setDebugCanvas({ canvas: canvasRef, context: canvasRef.getContext('2d')! })
            }}
            style={{ position: 'absolute', zIndex: 9999 }}
        />
    )

})