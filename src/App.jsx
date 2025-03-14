import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // Utilizar estados para manejar 
  //        - el término de búsqueda, 
  //        - los resultados de la búsqueda, 
  //        - el estado de carga y 
  //        - los errores.
  // *** PISTA: *** useState para guardar los cambios de cada uno de los estados.
  const [searchInput, setsearchInput] = useState(''); 
  const [pokemon, setPokemon] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  const fetchPokemon = async (pokemonName) => {
    setLoading(true);
    setError(''); 
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      } 
      const data = await response.json();
      setPokemon(data); // la respuesta del fetch actualiza el valor del pokemon
    } catch (err) { 
      setError(err.message); 
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  // useEffect: se lanza automáticamente al renderizar el componente para escuchar cambios 
    // (no estamos llamando a la función, se ejecuta según el array de dependencia)
    // últimos minutos de clase S19-U1
  useEffect(() => {
    if (searchInput) {
      fetchPokemon(searchInput);
    } else {
      setPokemon(null);
    }
  }, [searchInput]); // array de dependencia: hace que la función se ejecute cuando lo que hay dentro tiene un cambio

  
  // guardar en el estado el valor intruducido en el campo de entrada
  const handleSearchChange = (input) => {
    setsearchInput(input);
  };

  
  return (
    <div>
        <h1>Buscador de Pokémon</h1>

        <input
        type="text"
        placeholder="Escribe el nombre del Pokémon..."
        value={searchInput}  // Vincula el valor del input con el estado searchInput
        onChange={(e) => handleSearchChange(e.target.value)}   
        />
        
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}

        {pokemon && (
        <div className="pokemon">
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        )}
        
        {!pokemon && !loading && !error && searchInput && (
            <p>No se encontró el Pokémon</p>
        )}
    </div>
  );
};

export default App;