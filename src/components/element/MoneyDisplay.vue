<template>
    <div>
      <div class="money-display" v-if="money !== null">
        <img class="money-display__coin" src="@/assets/Coin.svg" alt="coin">
        <h2 class="money-display__quantity">{{ money }}</h2>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
        money() {
        return this.$store.getters.getMoney;
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
  