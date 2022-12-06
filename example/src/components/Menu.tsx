import React, { useState } from 'react'
import { FocusableContainer, useBounds } from 'react-focusable'
import Styled from 'styled-components'

import { MenuItem } from "./MenuItem"

const StyledContainer = Styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
`

export const Menu = () => {
    const [boundsElement, setBoundsElement] = useState<HTMLElement | null>(null)
    const bounds = useBounds(boundsElement)
    console.log('menu bounds: ', bounds);

    return (
        <FocusableContainer
            focusableBounds={bounds}
            focusableKey="menu"
        >
            <StyledContainer ref={setBoundsElement}>
                <MenuItem title='Home' />
                <MenuItem title='Movies' />
                <MenuItem title='Series' />
            </StyledContainer>
        </FocusableContainer>
    )

}