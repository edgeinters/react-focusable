import { observer } from 'mobx-react-lite'
import React, { useEffect } from "react"

import { useFocusable } from "../hooks/useFocusable"
import { Focusable as FocusableStore } from '../store/focusable'
import { FocusableBounds } from '../store/focusableBase'

export interface FocusableProps {
    children?: React.ReactNode | ((focusable: FocusableStore) => React.ReactNode)
    defaultFocus?: boolean
    disabled?: boolean
    focusableBounds: FocusableBounds | null
    focusableKey: string
}

export const Focusable = observer(({ children, defaultFocus, disabled, focusableBounds, focusableKey }: FocusableProps) => {
    const focusable = useFocusable(focusableKey, focusableBounds)

    useEffect(() => {
        if (focusable && defaultFocus) {
            focusable.focus()
        }
    }, [focusable, defaultFocus])

    useEffect(() => {
        focusable?.setEnabled(!disabled)
    }, [focusable, disabled])

    useEffect(() => {
        focusable?.setBounds(focusableBounds)
    }, [focusableBounds])

    if (!focusable) return

    return typeof children === 'function' ?
        children(focusable) :
        children
})