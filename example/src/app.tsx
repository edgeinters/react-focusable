import React from 'react'
import { Focusable, FocusableContainer, FocusableDebugger } from 'react-focusable'

import { FixedList } from './components/FixedList'
import { Menu } from './components/Menu'

const App = () => {
    return (
        <>
            <FocusableDebugger interactive={true} />
            <Menu />
            <FocusableContainer
                focusableBounds={{
                    x: 0, y: 70, width: 300, height: 100
                }}
                focusableKey='container'
            >
                <Focusable
                    focusableBounds={{ x: 0, y: 0, width: 300, height: 50 }}
                    focusableKey="button"
                >
                    {(focusable) => {

                        return <p style={{ color: focusable.isFocused ? 'red' : 'black' }}>ahoj</p>
                    }}

                </Focusable>
            </FocusableContainer>
            <FixedList focusableKey='first' />
            {/*<FixedList focusableKey='second' />
            <FixedList focusableKey='third' /> */}
        </>
    )
}

export default App