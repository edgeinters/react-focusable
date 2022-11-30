import React, { useEffect } from "react"

import { FocusableContext } from "../context"
import { useFocusableContainer } from "../hooks/useFocusableContainer"
import { FocusableBaseTypes } from "../store"

export interface FocusableContainerProps {
    children?: React.ReactNode
    disabled?: boolean
    focusableKey: string
    getFocusable?: FocusableBaseTypes.FocusableCallback
    getFocusableOffset?: FocusableBaseTypes.FocusableOffsetCallback
}

export const FocusableContainer = ({ children, disabled, focusableKey, getFocusable, getFocusableOffset }: FocusableContainerProps) => {
    const focusableContainer = useFocusableContainer(focusableKey)
    focusableContainer.getFocusableCallback = getFocusable
    focusableContainer.getFocusableOffsetCallback = getFocusableOffset

    useEffect(() => {
        focusableContainer.setEnabled(!disabled)
    }, [disabled])

    return (
        <FocusableContext.Provider value={focusableContainer}>
            {children}
        </FocusableContext.Provider>
    )
}