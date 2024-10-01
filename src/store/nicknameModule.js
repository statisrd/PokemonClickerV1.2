// /src/store/nicknameStore.js
import { defineStore } from 'pinia';

export const useNicknameStore = defineStore('nickname', {
  state: () => ({
    nicknames: JSON.parse(localStorage.getItem('pokemonNicknames')) || {},  // Данные для никнеймов покемонов
  }),
  actions: {
    setNickname(pokemonId, nickname) {
      this.nicknames = { ...this.nicknames, [pokemonId]: nickname };  // Обновляем состояние
      localStorage.setItem('pokemonNicknames', JSON.stringify(this.nicknames));  // Сохраняем в localStorage
    },
    removeNickname(pokemonId) {
      delete this.nicknames[pokemonId];  // Удаляем никнейм
      localStorage.setItem('pokemonNicknames', JSON.stringify(this.nicknames));  // Сохраняем в localStorage
    }
  },
  getters: {
    getNickname: (state) => (pokemonId) => state.nicknames[pokemonId] || ''  // Получаем никнейм по ID покемона
  }
});
