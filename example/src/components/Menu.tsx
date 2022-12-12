import React, { useCallback, useState } from 'react'
import { FocusableContainer, FocusableBaseTypes } from 'react-focusable'
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
    const [bounds, setBounds] = useState<FocusableBaseTypes.FocusableBounds | null>(null)

    const onRef = useCallback((ref: HTMLDivElement) => {
        setBounds(ref.getBoundingClientRect() || null)
    }, [])

    return (
        <FocusableContainer
            focusableBounds={bounds}
            focusableKey="menu"
        >
            <StyledContainer
                ref={onRef}
            >
                <MenuItem title='Home' />
                <MenuItem title='Movies' />
                <MenuItem title='Series' />
            </StyledContainer>
        </FocusableContainer>
    )

}