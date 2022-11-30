import React from 'react'
import { FocusableContainer } from 'react-focusable'
import Styled from 'styled-components'

import { MenuItem } from "./MenuItem"

const StyledContainer = Styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
`

export const Menu = () => {

    return (
        <FocusableContainer
            focusableKey="menu"
        >
            <StyledContainer>
                <MenuItem title='Home' />
                <MenuItem title='Movies' />
                <MenuItem title='Series' />
            </StyledContainer>
        </FocusableContainer>
    )

}