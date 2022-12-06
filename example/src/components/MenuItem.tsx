import React, { useState } from 'react'
import Styled from 'styled-components'

import { Focusable, useBounds } from 'react-focusable'

interface MenuItemProps {
    defaultFocus?: boolean
    style?: React.CSSProperties
    title: string
}

const StyledButton = Styled.span<{ isFocused: boolean }>`
    border: 1px solid rgba(0, 147, 255, ${props => props.isFocused ? 1 : 0.4});
    border-radius: 10px;
    height: auto;
    padding: 10px 20px;
    margin: 0px 10px;
    font-size: 20pt;
`

export const MenuItem = ({ defaultFocus, title, ...props }: MenuItemProps) => {
    const [boundsElement, setBoundsElement] = useState<HTMLElement | null>(null)
    const bounds = useBounds(boundsElement)
    console.log('MenuItem bounds: ', bounds);

    return (
        <Focusable
            defaultFocus={defaultFocus}
            focusableBounds={bounds}
            focusableKey={title.toLowerCase()}
        >
            {(focusable) => {
                return <StyledButton
                    {...props}
                    isFocused={focusable.isFocused}
                    ref={setBoundsElement}
                >
                    {title}
                </StyledButton>
            }}
        </Focusable >
    )

}