import React, { useCallback, useRef } from 'react'
import { FocusableContainer } from 'react-focusable'
import AutoSizer from 'react-virtualized-auto-sizer'
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
        <AutoSizer disableHeight>
            {({ width }) => {
                return (
                    <FocusableContainer
                        focusableBounds={{ x: 0, y: 300, width, height: 200 }}
                        focusableKey={focusableKey}
                    >
                        <StyledList
                            height={200}
                            itemCount={100}
                            itemSize={200}
                            ref={listRef}
                            width={width}
                            layout="horizontal"
                            // onScroll={(props) => console.log(props)}
                            {...props}
                        >
                            {(props) => {
                                return <FocusableItem
                                    focusableBounds={{ x: props.index * 200, y: 300, width: 200, height: 200 }}
                                    onFocus={onFocus}
                                    {...props}
                                />
                            }}
                        </StyledList>
                    </FocusableContainer>
                )
            }}
        </AutoSizer>
    )

}