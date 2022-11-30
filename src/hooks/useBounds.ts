import React, { useEffect, useState } from "react";
import { FocusableBounds } from "../store/focusableBase";

export const useBounds = (target: React.RefObject<HTMLElement> | HTMLElement | null) => {
    // const parentFocusableContainer = useContext(FocusableContext)
    const [bounds, setBounds] = useState<FocusableBounds | null>(null)

    useEffect(() => {
        if (!target || (isReactRef(target) && !target.current)) return

        const { height, width, x, y } = isReactRef(target) ? target.current!.getBoundingClientRect() : target.getBoundingClientRect()

        setBounds({ height, width, x, y })
    }, [target])

    return bounds
}

const isReactRef = (ref: any): ref is React.RefObject<any> => {
    return (ref as React.RefObject<any>).current !== undefined
}  