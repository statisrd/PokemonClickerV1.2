// store/moneyModule.js
import { defineStore } from 'pinia';

export const useMoneyStore = defineStore('money', {
  state: () => ({
    money: parseInt(localStorage.getItem('money')) || 0,
  }),
  actions: {
    addMoney(amount) {
      if (amount > 0) {
        this.money += amount;
        localStorage.setItem('money', this.money);
      }
    },
    subtractMoney(amount) {
      if (amount > 0 && this.money >= amount) {
        this.money -= amount;
        localStorage.setItem('money', this.money);
      } else {
        console.error('Insufficient funds or invalid amount');
      }
    }
  },
  getters: {
    getMoney: (state) => state.money,
  }
});


