// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useState, useEffect} from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })

  useEffect(() => {
    if (pokemonName) {
      setState({...state, status: 'pending'})
      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setState({...state, status: 'resolved', pokemon: pokemonData})
        })
        .catch(error => {
          setState({...state, status: 'rejected', error})
        })
    }
  }, [pokemonName])
  if (state.status === 'rejected')
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  if (state.status === 'idle') return 'Submit a Pokemon'
  if (state.status === 'pending')
    return <PokemonInfoFallback name={pokemonName} />
  if (state.status === 'resolved')
    return <PokemonDataView pokemon={state.pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
