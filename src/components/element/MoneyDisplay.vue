<template>
    <div>
      <div class="money-display" v-if="money !== null">
        <img class="money-display__coin" src="@/assets/Coin.svg" alt="coin">
        <h2 class="money-display__quantity">{{ money.toFixed(0) }}</h2>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        profit: null,
        intervalId: null,
      };
    },
    methods: {
      ...mapActions(['addMoney']),
  
      async fetchProfit(){
    const profitCrutch = await this.getPlayerPokemon;
    for(this.crutch in profitCrutch){
      console.log("profet",profitCrutch);
      this.profit += this.crutch.mps;
    }
  },



    },
    computed: {
      ...mapGetters(['totalMps']),
  
      money() {
        return this.$store.getters.getMoney;
      }
    },
    async created() {
      console.log("Total MPS:", this.totalMps);

      this.profit = this.totalMps;
      console.log("prods", this.profit);

    // GPT сделал  рабочий цикл (хз как работает нужно разобраться)
    this.intervalId = setInterval(() => {
      if (this.profit > 0) {
        this.addMoney(this.profit);
      }
    }, 1000);
  },
  beforeDestroy() {
    // Очищаем интервал, когда компонент уничтожается
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  }
  </script>
  
  
  <style scoped>
  .money-display {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .money-display__coin {
    width: 32px;
    height: 32px;
  }
  
  .money-display__quantity {
    font-family: Inter;
    font-size: 24px;
    font-weight: 700;
    line-height: 29.05px;
    text-align: left;
    color: var(--Primary, #FFCC01);
  }
  </style>
  