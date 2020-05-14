import React, { useState } from 'react'
import useKey from 'react-use-key'
import './index.css'

function App() {
  const changeDocument = (e) => {
    let newText = `You pressed '${e.key}' `
    if (e.ctrlKey) newText += 'with CTRL, '
    if (e.altKey) newText += 'with ALT, '
    if (e.shiftKey) newText += 'with SHIFT, '
    if (e.metaKey) newText += 'with Meta, '
    setText(newText)
  }

  //Simple use
  useKey('a', changeDocument, null)

  //More than 1 match expression:
  useKey('a|1|4|j|g', changeDocument, null)

  //Combinations
  useKey('ctrl+shift+1', changeDocument, null)

  //Complex combinations
  useKey('ctrl+shift+f | p', changeDocument, null)
  useKey('alt+KeyG', changeDocument, { matchStrategy: 'code' })
  useKey('meta+d', changeDocument, { preventDefault: true })

  const [text, setText] = useState('')

  return (
    <div className='App'>
      <header className='App-header'>
        <span className='App-link'>{text}</span>
      </header>
    </div>
  )
}

export default App
