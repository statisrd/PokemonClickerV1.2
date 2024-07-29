<template>
    <div class="money-display">
      <img class="money-display__coin" src="@/assets/Coin.svg" alt="coin">
      <h2 class="money-display__quantity">{{ amount }}</h2>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      amount: {
        type: Number,
        required: true
      }
    },
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
  