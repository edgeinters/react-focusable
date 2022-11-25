import React from 'react'
import { Focusable } from 'react-focusable'
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
    return (
        <Focusable
            focusableKey={focusableKey}
        >
            <StyledList
                height={200}
                itemCount={100}
                itemSize={200}
                width={1000}
                layout="horizontal"
                {...props}
            >
                {(props) => {
                    console.log('props: ', props);
                    return <FocusableItem defaultFocus={defaultFocus && !props.index} {...props} />
                }}
            </StyledList>
        </Focusable>
    )

}