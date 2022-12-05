import React from 'react'
import { Focusable, FocusableContainer } from 'react-focusable'

import { FixedList } from './components/FixedList'
import { Menu } from './components/Menu'

const App = () => {
    return (
        <>
            {/* <FocusableDebugger /> */}
            <Menu />
            <FocusableContainer
                focusableBounds={{
                    x: 0, y: 100, width: 300, height: 100
                }}
                focusableKey='container'
            >
                <Focusable
                    focusableBounds={{ x: 0, y: 0, width: 300, height: 100 }}
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