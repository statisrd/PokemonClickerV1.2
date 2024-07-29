// store/moneyModule.js
export default {
    state: {
      money: parseInt(localStorage.getItem('money')) || 100000
    },
    mutations: {
      addMoney(state, amount) {
        if (amount > 0) {
          state.money += amount;
          localStorage.setItem('money', state.money);
        }
      },
      subtractMoney(state, amount) {
        if (amount > 0 && state.money >= amount) {
          state.money -= amount;
          localStorage.setItem('money', state.money);
        }
      }
    },
    actions: {
      async subtractMoney({ commit }, amount) {
        if (amount <= 0) {
          throw new Error('Amount must be positive');
        }
        commit('subtractMoney', amount);
      }
    },
    getters: {
      getMoney(state) {
        return state.money;
      }
    }
  }
  