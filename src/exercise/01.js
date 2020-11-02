// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React, {useState} from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = useState(initialName)

  function handleChange({target: {value}}) {
    setName(value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName={'Javier'} />
}

export default App
