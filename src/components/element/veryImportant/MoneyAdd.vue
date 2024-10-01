<template>
  <div class="money-display" @click="handleClick">
    <img class="money-display__coin" src="Coin.svg" alt="coin">
    <h2 class="money-display__quantity">{{ amount }}</h2>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useMoneyStore } from '@/store/moneyModule'; // Подключаем Pinia store

export default defineComponent({
  props: {
    amount: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const moneyStore = useMoneyStore(); // Используем Pinia store

    const handleClick = () => {
      if (props.amount > 0) {
        moneyStore.addMoney(props.amount); // Вызов метода Pinia store для добавления денег
      } else {
        console.warn('Amount should be greater than 0');
      }
    };

    return {
      amountValue: props.amount, // Переименовали amount в amountValue
      handleClick
    };
  }
});
</script>



<style scoped>
.money-display {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer; /* Добавлено для визуальной подсказки, что элемент кликабельный */
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
