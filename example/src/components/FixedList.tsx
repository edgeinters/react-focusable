import React, { useCallback, useRef } from 'react'
import { FocusableContainer } from 'react-focusable'
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
    // const getFocusableCallback = useCallback((frustum: FocusableBaseTypes.FocusableFrustum, direction: FocusableBaseTypes.FocusableDirection) => {
    //     return null
    // }, [])

    const onFocus = useCallback((index: number) => {
        listRef.current?.scrollToItem(index, 'auto')
    }, [listRef])

    return (
        <FocusableContainer
            focusableKey={focusableKey}
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