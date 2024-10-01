// /src/store/gdsStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { usePokemonStore } from './pokemonModule'; // Убедитесь, что путь правильный


export const useGdsStore = defineStore('gds', {
  state: () => ({
    gds: JSON.parse(localStorage.getItem('gds')) || [], // Данные для ягод и покеболов
  }),
  actions: {
    async addAGDS({ id, price, name, info, type }) {
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

        this.gds.push({ 
          id: uniqueId,
          gdsData: gdsDataResponse, // Сохранение данных, а не ответа
          price,
          name,
          info,
          type
        });

        localStorage.setItem('gds', JSON.stringify(this.gds)); // Сохранение в localStorage
      } catch (error) {
        console.error('Error adding new product data:', error);
      }
    },
    async buyAGDS(id) {
      let resultAdding; // Объявляем переменную заранее
      try {
        // Находим элемент по ID
        const gdsItem = this.gds.find(item => item.id === id);
    
        if (!gdsItem) {
          throw new Error(`Item with ID ${id} not found`);
        }
    
        // Извлекаем данные элемента и передаем их в addPokemonToGrid
        const pokemonData = gdsItem.gdsData;
        const arrayName = 'inventory'; // Можно заменить на другое значение, если нужно
    
        // Предположим, что addPokemonToGrid доступен в другом store, можно импортировать и использовать его
        const pokemonModule = usePokemonStore();
    
        resultAdding = await pokemonModule.addPokemonToGrid({
          pokemonData,
          arrayName,
          name: gdsItem.name,
          info: gdsItem.info,
          type: gdsItem.type
        });
      } catch (error) {
        console.error('Error buying GDS:', error);
      }
      
      return resultAdding; // Возвращаем результат вне блока try-catch
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
});
