import React, { useEffect, useLayoutEffect, useState } from 'react'

export const FocusableDebugger = ({ }) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null)

    useEffect(() => {
        if (!canvasContext) return

        canvasContext.beginPath();
        canvasContext.moveTo(10, 10)
        canvasContext.lineTo(100, 100)
        canvasContext.lineWidth = 3
        canvasContext.strokeStyle = 'red'
        canvasContext.stroke()

        console.log('drawn');

    }, [canvasContext])

    useLayoutEffect(() => {
        const onResize = () => {
            if (!canvas) return

            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', onResize)
        onResize()

        return () => window.removeEventListener('resize', onResize)
    }, [canvas])

    return (
        <canvas
            ref={(canvas) => {
                setCanvas(canvas)
                setCanvasContext(canvas?.getContext('2d') || null)
            }}
            style={{ position: 'absolute', zIndex: 9999 }}
        />
    )

}