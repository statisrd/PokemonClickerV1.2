<template>
  <div>
    <div class="money-display" v-if="money !== null">
      <img class="money-display__coin" src="@/assets/Coin.svg" alt="coin">
      <h2 class="money-display__quantity">{{ Math.round(money) }}</h2>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useMoneyStore } from '@/store/moneyModule'; // Pinia store
import { usePlayerPokemonsModule } from '@/store/playerPokemonsModule'; // Для получения Pokemon

export default {
  setup() {
    const moneyModule = useMoneyStore();
    const playerPokemonsModule = usePlayerPokemonsModule();

    // Переменные для управления прибылью и интервалом
    const profit = ref(0);
    let intervalId = null;

    // Вычисляемое значение денег из Pinia
    const money = computed(() => moneyModule.getMoney);


    // Функция для запуска цикла добавления денег
    const startAddingMoney = () => {
      intervalId = setInterval(() => {
        if (profit.value > 0) {
          moneyModule.addMoney(profit.value);
        }
      }, 1000);
    };

    // Монтируем цикл
    onMounted(async () => {
      profit.value = await playerPokemonsModule.totalMps;
      startAddingMoney();
    });

    // Очищаем интервал перед уничтожением компонента
    onBeforeUnmount(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    });

    return {
      money,
    };
  },
};
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
