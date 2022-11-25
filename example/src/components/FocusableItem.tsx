import React from 'react'
import { Focusable } from 'react-focusable'
import Styled from 'styled-components'

interface FocusableItemProps {
    defaultFocus?: boolean
    index: number
    style?: React.CSSProperties
}

const FocusableContainer = Styled.div`
    box-sizing: border-box;
    padding-right: 20px;
`

const FocusableContent = Styled.div<{ isFocused?: boolean }>`
    background-color: rgba(0, 147, 255, ${props => props.isFocused ? 1 : 0.4});
    border-radius: 10px;
    height: 100%;
    width: 100%;
`

export const FocusableItem = ({ defaultFocus, index, ...props }: FocusableItemProps) => {

    return (
        <Focusable
            defaultFocus={defaultFocus}
            focusableKey={`item-${index}`}
        >
            {(focusable) => {
                return (
                    <FocusableContainer {...props} >
                        <FocusableContent isFocused={focusable.isFocused} />
                    </FocusableContainer>
                )
            }}
        </Focusable >
    )

}