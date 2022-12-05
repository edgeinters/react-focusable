import { useContext, useEffect, useState } from "react"

import { FocusableContext } from "../context"
import { FocusableBounds } from "../store/focusableBase";
import { FocusableContainer } from "../store/focusableContainer";

export const useFocusableContainer = (focusableKey: string, focusableBounds: FocusableBounds | null = null) => {
    const parentFocusableContainer = useContext(FocusableContext)
    const [focusableContainer, setFocusableContainer] = useState<FocusableContainer>()

    useEffect(() => {
        const focusableContainer = new FocusableContainer(parentFocusableContainer, focusableKey, focusableBounds)
        setFocusableContainer(focusableContainer)

        return () => focusableContainer.unregisterFocusable(focusableContainer)
    }, [])

    return focusableContainer
}