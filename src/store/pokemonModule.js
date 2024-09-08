import axios from 'axios';

export default {
  state: {
    inventory: JSON.parse(localStorage.getItem('inventory')) || [],
    garden: JSON.parse(localStorage.getItem('garden')) || [],

    cols_inventory: parseInt(localStorage.getItem('cols_inventory')) || 5,
    rows_inventory: parseInt(localStorage.getItem('rows_inventory')) || 3,
    cols_garden: parseInt(localStorage.getItem('cols_garden')) || 5,
    rows_garden: parseInt(localStorage.getItem('rows_garden')) || 5,
  },
  mutations: {
    addPokemon(state, { id, pokemon, x, y, width, height, arrayName, name, info, type }) {
      state[arrayName].push({ id, pokemon, x, y, width, height, name, info, type });
      localStorage.setItem(arrayName, JSON.stringify(state[arrayName]));
    },
    setPosition(state, { id, x, y, arrayName }) {
      const index = state[arrayName].findIndex(pokemon => pokemon.id === id);
      if (index !== -1) {
        state[arrayName][index].x = x;
        state[arrayName][index].y = y;
        localStorage.setItem(arrayName, JSON.stringify(state[arrayName]));
      } else {
        console.error('Pokémon with id', id, 'not found');
      }
    },
    setSize(state, { index, width, height, arrayName }) {
      state[arrayName][index].width = width;
      state[arrayName][index].height = height;
      localStorage.setItem(arrayName, JSON.stringify(state[arrayName]));
    },
    setGridSize(state, { arrayName, cols, rows }) {
      state[`cols_${arrayName}`] = cols;
      state[`rows_${arrayName}`] = rows;
      localStorage.setItem(`cols_${arrayName}`, state[`cols_${arrayName}`]);
      localStorage.setItem(`rows_${arrayName}`, state[`rows_${arrayName}`]);
    },
    fulldropLocal() {
      console.log('Clearing localStorage');
      localStorage.removeItem('cols_inventory');
      localStorage.removeItem('rows_inventory');
      localStorage.removeItem('cols_garden');
      localStorage.removeItem('rows_garden');
    },
    removePokemon(state, { id, arrayName }) {
      const index = state[arrayName].findIndex(pokemon => pokemon.id === id);
      if (index !== -1) {
        state[arrayName].splice(index, 1);
        localStorage.setItem(arrayName, JSON.stringify(state[arrayName]));
        console.log('Pokemon removed from', arrayName);
      } else {
        console.error('Pokémon with id', id, 'not found');
      }
    },
  },
  actions: {
    async fetchPokemon({ dispatch }, { id, arrayName }) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = response.data;
        const name = pokemonData.name;
        const info = pokemonData; // или другой источник информации
        const type = pokemonData.types.map(t => t.type.name).join(', ');

        await dispatch('addPokemonToGrid', { pokemonData, arrayName, name, info, type });

      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        throw error;
      }
    },

    async addPokemonToGrid({ state, commit }, { pokemonData, arrayName, name, info, type }) {
      const gridSizeX = state[`cols_${arrayName}`];
      const gridSizeY = state[`rows_${arrayName}`];
      const grid = Array(gridSizeX).fill().map(() => Array(gridSizeY).fill(false));

      state[arrayName].forEach(item => {
        if (item.x < gridSizeX && item.y < gridSizeY) {
          grid[item.x][item.y] = true;
        }
      });

      let x = -1;
      let y = -1;
      outerLoop:
      for (let i = 0; i < gridSizeX; i++) {
        for (let j = 0; j < gridSizeY; j++) {
          if (!grid[i][j]) {
            x = i;
            y = j;
            break outerLoop;
          }
        }
      }

      if (x === -1 || y === -1) {
        console.error('No free space available on the grid');
        return;
      }

      const uniqueId = pokemonData.id + Date.now();
      commit('addPokemon', {
        id: uniqueId,
        pokemon: pokemonData,
        x,
        y,
        width: 1,
        height: 1,
        arrayName,
        name,
        info,
        type
      });
    },

    async updateGridSize({ commit }, { arrayName, cols, rows }) {
      commit('setGridSize', { arrayName, cols, rows });
    },
    async updatePosition({ commit }, { id, x, y, arrayName }) {
      await commit('setPosition', { id, x, y, arrayName });
    },
    updateSize({ commit }, { index, width, height, arrayName }) {
      commit('setSize', { index, width, height, arrayName });
    },

    dropLocal({ commit }) {
      commit('fulldropLocal');
    },

    async removePokemonFromGrid({ commit }, { id, arrayName }) {
      commit('removePokemon', { id, arrayName });
    },
  },
  getters: {
    getPokemon(state) {
      return state.inventory;
    },
    getGarden(state) {
      return state.garden;
    },
    getCellsInventory(state) {
      return {
        cols: state.cols_inventory,
        rows: state.rows_inventory
      };
    },
    getCellsGarden(state) {
      return {
        cols: state.cols_garden,
        rows: state.rows_garden
      };
    }
  },
};
