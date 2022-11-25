import React from 'react'
import { FixedList } from './components/FixedList'

const App = () => {
    return (
        <>
            <FixedList defaultFocus focusableKey='first' />
            <FixedList focusableKey='second' />
            <FixedList focusableKey='third' />
        </>
    )
}

export default App
