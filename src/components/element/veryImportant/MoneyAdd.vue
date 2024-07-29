<template>
  <div class="money-display" @click="addMoney">
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
  methods: {
    addMoney() {
      // Метод добавления денег
      this.$store.commit('addMoney', this.amount);
    }
  }
}
</script>

<style scoped>
/* Стили для MoneyAdd */
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
