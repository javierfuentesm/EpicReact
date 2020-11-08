// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useState, useEffect} from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
// import {ErrorBoundary} from './Error'
import {ErrorBoundary} from 'react-error-boundary'

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })

  useEffect(() => {
    if (pokemonName !== '') {
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

  const Pokemon = () => {
    if (state.status === 'rejected') {
      throw state.error
    } else if (state.status === 'idle') {
      return 'Submit a Pokemon'
    } else if (state.status === 'pending') {
      return <PokemonInfoFallback name={pokemonName} />
    } else if (state.status === 'resolved') {
      return <PokemonDataView pokemon={state.pokemon} />
    }
  }

  return <Pokemon />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }
  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }
  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          onReset={() => setPokemonName('')}
          FallbackComponent={ErrorFallback}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
