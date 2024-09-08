import axios from 'axios';

export default {
  state: {
    gds: JSON.parse(localStorage.getItem('gds')) || [], // Данные для ягод и покеболов
  },
  mutations: {
    addGDS(state, { id, price, gdsData, name, info, type }) {
      state.gds.push({ id, price, gdsData, name, info, type });
      localStorage.setItem('gds', JSON.stringify(state.gds)); // Сохранение в localStorage
    },
  },
  actions: {
    async addAGDS({ commit }, { id, price, name, info, type }) {
      try {
        let gdsDataResponse;

        if (type === 'berry') {
          // Запрос для ягод
          const berryResponse = await axios.get(`https://pokeapi.co/api/v2/berry/${id}`);
          const itemResponse = await axios.get(berryResponse.data.item.url);
          gdsDataResponse = itemResponse.data;
        } else if (type === 'pokeball') {
          // Запрос для покеболов (замените URL на нужный вам API)
          const itemResponse = await axios.get(`https://pokeapi.co/api/v2/item/${id}`);
          gdsDataResponse = itemResponse.data;
        }

        console.log(type, gdsDataResponse);

        // Используем UUID для генерации уникального ID
        const uniqueId = gdsDataResponse.id + Date.now();

        commit('addGDS', { 
          id: uniqueId,
          gdsData: gdsDataResponse, // Сохранение данных, а не ответа
          price,
          name,
          info,
          type
        });
      } catch (error) {
        console.error('Error adding new product data:', error);
      }
    },
    async buyAGDS({ state, dispatch }, id) {
      try {
        // Находим элемент по ID
        const gdsItem = state.gds.find(item => item.id === id);

        if (!gdsItem) {
          throw new Error(`Item with ID ${id} not found`);
        }

        // Извлекаем данные элемента и передаем их в addPokemonToGrid
        const pokemonData = gdsItem.gdsData;
        const arrayName = 'inventory'; // Можно заменить на другое значение, если нужно

        await dispatch('addPokemonToGrid', { pokemonData, arrayName, name: gdsItem.name, info: gdsItem.info, type: gdsItem.type }, { root: true });
      } catch (error) { 
        console.error('Error buying GDS:', error);
      }
    },
  },
  getters: {
    getShop(state) {
      return state.gds; 
    },
    getItemsByType: (state) => (type) => {
      return state.gds.filter(item => item.type === type);
    },
  }
};
