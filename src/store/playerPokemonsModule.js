// store/playerPokemonsModule.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const usePlayerPokemonsModule = defineStore('playerPokemon', {
  state: () => ({
    playerPokemons: JSON.parse(localStorage.getItem('playerPokemons')) || [],
  }),

  actions: {
    async addNewPokemon(id) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = response.data;
        if (!pokemonData || !pokemonData.name) {
          throw new Error('Invalid Pokémon data');
        }
        const uniqueId = id + Date.now(); // Создание уникального идентификатора
        const pokemonMPS = pokemonData.weight * 0.01;
        const currentTime = Date.now();

        this.addPlayerPokemons({
          id: uniqueId,
          playerPokemon: pokemonData,
          name: pokemonData.name,
          mps: pokemonMPS.toFixed(1),
          age: currentTime,
        });
      } catch (error) {
        console.error('Error adding new Pokémon data:', error);
      }
    },

    renamePokemon({ id, newName }) {
      const index = this.playerPokemons.findIndex(pokemon => pokemon.id === id);
      if (index !== -1) {
        const pokemon = this.playerPokemons[index];
        pokemon.name = newName.trim() !== '' ? newName : pokemon.playerPokemon.name;
        this.playerPokemons[index] = { ...pokemon, name: pokemon.name };
        localStorage.setItem('playerPokemons', JSON.stringify(this.playerPokemons));
      } else {
        console.log("Покемон с таким ID не найден.");
      }
    },

    addPlayerPokemons({ id, playerPokemon, name, mps, age }) {
      this.playerPokemons.push({ id, playerPokemon, name, mps, age });
      localStorage.setItem('playerPokemons', JSON.stringify(this.playerPokemons)); // Сохраняем в localStorage
    }
  },

  getters: {
    // getPlayerPokemon: (state) => state.playerPokemons,
    getPlayerPokemon: (state) => {
      console.log('playerPokemons:', state.playerPokemons);
      return state.playerPokemons;
    },
    totalMps: (state) => {
      if (!Array.isArray(state.playerPokemons)) {
        console.error('playerPokemons is not an array');
        return 0;
      }
      return state.playerPokemons.reduce((total, pokemon) => total + parseFloat(pokemon.mps) || 0, 0);
    },
  }
});
