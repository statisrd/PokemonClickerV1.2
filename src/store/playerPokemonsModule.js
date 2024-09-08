import axios from 'axios';

export default {
  state: {
    playerPokemons: JSON.parse(localStorage.getItem('playerPokemons')) || [],
  },
  mutations: {
    addPlayerPokemons(state, { id, playerPokemon, name, mps, age }) {
      state.playerPokemons.push({ id, playerPokemon, name, mps, age });
      localStorage.setItem('playerPokemons', JSON.stringify(state.playerPokemons)); // Сохраняем в localStorage
    },
    setName(state, { id, newName }) {
      const index = state.playerPokemons.findIndex(playerPokemon => playerPokemon.id === id);
      if (index !== -1) {
        state.playerPokemons[index].name = newName.trim() !== '' ? newName : state.playerPokemons[index].playerPokemon.name;
        localStorage.setItem('playerPokemons', JSON.stringify(state.playerPokemons));
      } else {
        console.log("Покемон с таким ID не найден.");
      }
    },
  },
  actions: {
    async addNewPokemon({ commit }, { id }) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = response.data;
        const uniqueId = id + Date.now(); // Создание уникального идентификатора
        const pokemonMPS = Math.random() * (2 - 0.5) + 0.5;
        const currentTime = Date.now();

        commit('addPlayerPokemons', {
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

    renamePokemon({ commit }, { id, newName }) {
      commit('setName', { id, newName });
    },
  },
  getters: {
    getPlayerPokemon(state) {
      return state.playerPokemons;
    },
    totalMps(state) {
      return state.playerPokemons.reduce((total, pokemon) => total + parseFloat(pokemon.mps), 0);
    },
  },
};
