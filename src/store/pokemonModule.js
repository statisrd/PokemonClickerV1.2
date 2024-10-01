// stores/pokemonModule.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    inventory: [],
    garden:[],
    cols_inventory:5,
    rows_inventory: 3,
    cols_garden:5,
    rows_garden: 5,
  }),
  actions: {
    async fetchPokemon({ id, arrayName }) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = response.data;
        const name = pokemonData.name;
        const info = pokemonData; // или другой источник информации
        const type = pokemonData.types.map(t => t.type.name).join(', ');

        await this.addPokemonToGrid({ pokemonData, arrayName, name, info, type });
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        throw error;
      }
    },
    async addPokemonToGrid({ pokemonData, arrayName, name, info, type }) {
      const gridSizeX = this[`rows_${arrayName}`];
      const gridSizeY = this[`cols_${arrayName}`];
      const grid = Array(gridSizeX).fill().map(() => Array(gridSizeY).fill(false));

      this[arrayName].forEach(item => {
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
        return 1;
      }

      const uniqueId = pokemonData.id + Date.now();
      this.addPokemon({
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
    addPokemon({ id, pokemon, x, y, width, height, arrayName, name, info, type }) {
      this[arrayName].push({ id, pokemon, x, y, width, height, name, info, type });
      localStorage.setItem(arrayName, JSON.stringify(this[arrayName]));
    },
    setPosition({ id, x, y, arrayName }) {
      const index = this[arrayName].findIndex(pokemon => pokemon.id === id);
      if (index !== -1) {
        this[arrayName][index].x = x;
        this[arrayName][index].y = y;
        localStorage.setItem(arrayName, JSON.stringify(this[arrayName]));
      } else {
        console.error('Pokémon with id', id, 'not found');
      }
    },
    setSize({ index, width, height, arrayName }) {
      this[arrayName][index].width = width;
      this[arrayName][index].height = height;
      localStorage.setItem(arrayName, JSON.stringify(this[arrayName]));
    },
    setGridSize({ arrayName, cols, rows }) {
      this[`cols_${arrayName}`] = cols;
      this[`rows_${arrayName}`] = rows;
      localStorage.setItem(`cols_${arrayName}`, cols);
      localStorage.setItem(`rows_${arrayName}`, rows);
    },
    fulldropLocal() {
      console.log('Clearing localStorage');
      localStorage.removeItem('cols_inventory');
      localStorage.removeItem('rows_inventory');
      localStorage.removeItem('cols_garden');
      localStorage.removeItem('rows_garden');
    },
    removePokemon({ id, arrayName }) {
      const index = this[arrayName].findIndex(pokemon => pokemon.id === id);
      if (index !== -1) {
        this[arrayName].splice(index, 1);
        localStorage.setItem(arrayName, JSON.stringify(this[arrayName]));
        console.log('Pokemon removed from', arrayName);
      } else {
        console.error('Pokémon with id', id, 'not found');
      }
    },
  },
  getters: {
    getPokemon: (state) => state.inventory,
    getGarden: (state) => {
      console.log('getGarden:', state.garden);
      return state.garden;
    },
    getCellsInventory: (state) => ({
      cols: state.cols_inventory,
      rows: state.rows_inventory
    }),
    getCellsGarden: (state) => ({
      cols: state.cols_garden,
      rows: state.rows_garden
    }),
  },
});
