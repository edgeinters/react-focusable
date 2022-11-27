import { observer } from 'mobx-react-lite'
import React, { useEffect } from "react"

import { useFocusable } from "../hooks/useFocusable"
import { Focusable as FocusableStore } from '../store/focusable'

export interface FocusableProps {
    children?: React.ReactNode | ((focusable: FocusableStore) => React.ReactNode)
    defaultFocus?: boolean
    disabled?: boolean
    focusableKey: string
}

export const Focusable = observer(({ children, defaultFocus, disabled, focusableKey }: FocusableProps) => {
    const focusable = useFocusable(focusableKey)

    useEffect(() => {
        if (focusable && defaultFocus) {
            focusable.focus()
        }
    }, [focusable, defaultFocus])

    useEffect(() => {
        focusable?.setEnabled(!disabled)
    }, [focusable, disabled])

    if (!focusable) return

    return typeof children === 'function' ?
        children(focusable) :
        children
})