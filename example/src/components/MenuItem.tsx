import React from 'react'
import Styled from 'styled-components'

import { Focusable } from 'react-focusable'

interface MenuItemProps {
    title: string
    style?: React.CSSProperties
}

const StyledContainer = Styled.span<{ isFocused: boolean }>`
    border: 1px solid rgba(0, 147, 255, ${props => props.isFocused ? 1 : 0.4});
    border-radius: 10px;
    height: auto;
    padding: 10px 20px;
    margin: 0px 10px;
    font-size: 20pt;
`

export const MenuItem = ({ title, ...props }: MenuItemProps) => {
    return (
        <Focusable
            focusableKey={title.toLowerCase()}
        >
            {(focusable) => {
                return <StyledContainer isFocused={focusable.isFocused} {...props}>{title}</StyledContainer>
            }}
        </Focusable>
    )

}