import React, { useCallback, useRef } from 'react'
import { FocusableBaseTypes, FocusableContainer, FocusableTypes } from 'react-focusable'
import { FixedSizeList as List } from 'react-window'
import Styled from 'styled-components'

import { FocusableItem } from './FocusableItem'

interface FixedListProps {
    defaultFocus?: boolean
    focusableKey: string
    style?: React.CSSProperties
}

const StyledList = Styled(List)`
    margin: 10px;
`

export const FixedList = ({ defaultFocus, focusableKey, ...props }: FixedListProps) => {
    const listRef = useRef<List>(null)
    const getNextFocusableCallback = useCallback((focusable: FocusableTypes.Focusable, direction: FocusableBaseTypes.FocusableDirection) => {
        const currentFocusIndex = parseInt(focusable.key.split('-')[1])

        if (direction === 'LEFT') {
            return focusable.parent.focusables[`item-${currentFocusIndex - 1}`] as FocusableTypes.Focusable
        } else if (direction === 'RIGHT') {
            return focusable.parent.focusables[`item-${currentFocusIndex + 1}`] as FocusableTypes.Focusable
        }

        return null
    }, [])

    const onFocus = useCallback((index: number) => {
        listRef.current?.scrollToItem(index, 'auto')
    }, [listRef])

    return (
        <FocusableContainer
            focusableKey={focusableKey}
            getNextFocusable={getNextFocusableCallback}
        >
            <StyledList
                height={200}
                itemCount={100}
                itemSize={200}
                ref={listRef}
                width={1000}
                layout="horizontal"
                {...props}
            >
                {(props) => {
                    return <FocusableItem
                        onFocus={onFocus}
                        {...props}
                    />
                }}
            </StyledList>
        </FocusableContainer>
    )

}