import React from 'react'
import ReactDOM from 'react-dom'
import { focus, focusableDebugger } from 'react-focusable'

import App from './app'

ReactDOM.render(<App />, document.getElementById('root'))

document.onkeyup = ({ key }) => {
    switch (key) {
        case 'ArrowDown':
            focus.down()
            break;
        case 'ArrowLeft':
            focus.left()
            break;
        case 'ArrowRight':
            focus.right()
            break;
        case 'ArrowUp':
            focus.up()
            break;
        case 'f':
            focusableDebugger.stepForward()
            break;
        case 'b':
            focusableDebugger.stepBackward()
            break
    }
}