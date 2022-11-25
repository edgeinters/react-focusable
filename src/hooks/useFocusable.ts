import { useContext, useEffect, useState } from "react"

import { FocusableContext } from "../context"
import { Focusable } from "../store/focusable";

export const useFocusable = (focusableKey: string) => {
    const parentFocusable = useContext(FocusableContext)
    const [focusable] = useState<Focusable>(new Focusable(focusableKey, parentFocusable))

    useEffect(() => {
        return () => parentFocusable.unregisterFocusable(focusable)
    }, [])

    return focusable
}