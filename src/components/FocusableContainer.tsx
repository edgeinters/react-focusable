import React, { useEffect } from "react"

import { FocusableContext } from "../context"
import { useFocusableContainer } from "../hooks/useFocusableContainer"
import { FocusableBaseTypes } from "../store"
import { FocusableBounds } from "../store/focusableBase"

export interface FocusableContainerProps {
    children?: React.ReactNode
    disabled?: boolean
    focusableBounds: FocusableBounds | null
    focusableKey: string
    getFocusable?: FocusableBaseTypes.FocusableCallback
    getFocusableOffset?: FocusableBaseTypes.FocusableOffsetCallback
}

export const FocusableContainer = ({ children, disabled, focusableBounds, focusableKey, getFocusable, getFocusableOffset }: FocusableContainerProps) => {
    const focusableContainer = useFocusableContainer(focusableKey, focusableBounds)
    focusableContainer.getFocusableCallback = getFocusable
    focusableContainer.getFocusableOffsetCallback = getFocusableOffset

    useEffect(() => {
        focusableContainer.setEnabled(!disabled)
    }, [disabled])

    useEffect(() => {
        focusableContainer?.setBounds(focusableBounds)
    }, [focusableBounds])

    return (
        <FocusableContext.Provider value={focusableContainer}>
            {children}
        </FocusableContext.Provider>
    )
}