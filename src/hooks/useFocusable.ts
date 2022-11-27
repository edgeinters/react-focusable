import { useContext, useEffect, useState } from "react"

import { FocusableContext } from "../context"
import { Focusable } from "../store/focusable";
import { FocusableBounds } from "../store/focusableBase";

export const useFocusable = (focusableKey: string, focusableBounds: FocusableBounds | null = null) => {
    const parentFocusableContainer = useContext(FocusableContext)
    const [focusable, setFocusable] = useState<Focusable>()

    useEffect(() => {
        const focusable = new Focusable(parentFocusableContainer, focusableKey, focusableBounds)
        setFocusable(focusable)

        return () => parentFocusableContainer.unregisterFocusable(focusable)
    }, [])

    return focusable
}