import React, { useEffect } from "react"

import { FocusableContext } from "../context"
import { useFocusableContainer } from "../hooks/useFocusableContainer"
import { Focusable } from "../store/focusable"
import { FocusableDirection, FocusablePosition } from "../store/focusableBase"

export interface FocusableContainerProps {
    children?: React.ReactNode
    disabled?: boolean
    focusableKey: string
    getFocusableOffset?: () => FocusablePosition
    getNextFocusable?: (focusable: Focusable, direction: FocusableDirection) => Focusable | null
}

export const FocusableContainer = ({ children, disabled, focusableKey, getFocusableOffset, getNextFocusable }: FocusableContainerProps) => {
    const focusableContainer = useFocusableContainer(focusableKey)
    focusableContainer.getFocusableOffsetCallback = getFocusableOffset
    focusableContainer.getNextFocusableCallback = getNextFocusable

    useEffect(() => {
        focusableContainer.setEnabled(!disabled)
    }, [disabled])

    return (
        <FocusableContext.Provider value={focusableContainer}>
            {children}
        </FocusableContext.Provider>
    )
}