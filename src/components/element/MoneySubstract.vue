<template>
  <div class="money-display" @click="handleClick">
    <img class="money-display__coin" src="@/assets/Coin.svg" alt="coin">
    <h2 class="money-display__quantity">{{ amount }}</h2>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  props: {
    amount: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    // Получаем значения из props
    const { amount } = toRefs(props); // Делаем amount реактивным

    // Обработчик клика
    const handleClick = () => {
      if (amount.value > 0) {
        emit('clicked', amount.value);
      } else {
        console.warn('Amount should be greater than 0');
      }
    };

    return {
      handleClick // Убираем amount, чтобы избежать дублирования
    };
  }
});
</script>

<style scoped>
.money-display {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer; /* Визуальная подсказка клика */
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
