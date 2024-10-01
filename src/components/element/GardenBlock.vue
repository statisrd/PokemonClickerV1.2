<template>
  <div class="container">
    <div class="garden-wrapper">
      <FieldBlock
        :Rows="Rows"
        :Cols="Cols"
        :unlockedColsCells="unlockedColsCells"
        :unlockedRowsCells="unlockedRowsCells"
        :items="items"
        :arrayName="arrayName"
      />
      <div class="garden-options">
        <div class="garden-options__store">
          <div v-for="(item, index) in storeItems" :key="index" class="garden-options__store-block">
            <div class="garden-options__store-info">{{ item.description }}</div>
            <div class="garden-options__store-buy">
              <button @click.stop="handlePurchase(item)" class="increase-button">Купить</button>
              <MoneySubstract :amount="item.price" />
            </div>
          </div>
        </div>
        <div class="garden-options__info">
          <p class="garden-options__info-text">Скорость роста</p>
          <p class="garden-options__info-growth">{{ growthRate }}%/час</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { usePokemonStore } from '@/store/pokemonModule';
import { useMoneyStore } from '@/store/moneyModule';
import FieldBlock from '@/components/FieldBlock.vue';
import MoneySubstract from '@/components/element/MoneySubstract.vue';

export default {
  components: {
    MoneySubstract,
    FieldBlock,
  },
  setup() {
    const pokemonStore = usePokemonStore();
    const moneyStore = useMoneyStore();

    const growthRate = ref(15);
    const Rows = ref(7);
    const Cols = ref(7);
    const unlockedColsCells = ref(0);
    const unlockedRowsCells = ref(0);
    const items = ref(pokemonStore.getGarden);
    const arrayName = 'garden';

    const storeItems = [
      {
        description: 'Увеличить площадь грядки',
        price: 1000,
        action: (params) => inventoryPurchase(params),
        params: 1000,
      },
      {
        description: 'Ускорить рост на 2%/час на 2 часа',
        price: 3000,
        action: (params) => growthPurchase(params),
        params: { percentage: 2, price: 3000 },
      },
      {
        description: 'Ускорить рост на 5%/час на 2 часа',
        price: 5000,
        action: (params) => growthPurchase(params),
        params: { percentage: 5, price: 5000 },
      },
    ];

    const increaseGrowthRate = (percentage) => {
      growthRate.value += percentage;
      setTimeout(() => {
        growthRate.value -= percentage;
      }, 2 * 60 * 60 * 1000); // 2 часа в миллисекундах
    };

    const growthPurchase = async ({ percentage, price }) => {
      const currentMoney = moneyStore.getMoney;
      if (currentMoney >= price) {
        moneyStore.subtractMoney(price);
        increaseGrowthRate(percentage);
      } else {
        alert('У тебя недостаточно денег.');
      }
    };

    const inventoryPurchase = async (price) => {
      if (Rows.value > unlockedRowsCells.value && Cols.value > unlockedColsCells.value) {
        const currentMoney = moneyStore.getMoney;
        if (currentMoney >= price) {
          moneyStore.subtractMoney(price);
          unlockedRowsCells.value += 1;
          unlockedColsCells.value += 1;
          pokemonStore.setGridSize({ arrayName, cols: unlockedColsCells.value, rows: unlockedRowsCells.value });
        } else {
          alert('У тебя недостаточно денег.');
        }
      } else {
        alert('Вы уже достигли максимального размера грядки.');
      }
    };

    const handlePurchase = (item) => {
      item.action(item.params);
    };

    onMounted(async () => {
      console.log(pokemonStore.getGarden);
      if (items.value.length === 0) {
        await Promise.all([
          pokemonStore.fetchPokemon({ id: 52, arrayName }),
          pokemonStore.fetchPokemon({ id: 89, arrayName }),
        ]);
      }
      unlockedColsCells.value = pokemonStore.getCellsGarden.cols;
      unlockedRowsCells.value = pokemonStore.getCellsGarden.rows;
    });

    return {
      growthRate,
      Rows,
      Cols,
      unlockedColsCells,
      unlockedRowsCells,
      items,
      arrayName,
      storeItems,
      handlePurchase, // Возвращаем функцию handlePurchase
    };
  },
};
</script>

<style scoped>
.garden-wrapper {
  display: flex;
  justify-content: space-between;
  height: 430px;
}
.garden-options {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
}
.garden-options__store {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.garden-options__store-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.garden-options__store-info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.garden-options__store-buy {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.garden-options__info {
  display: flex;
  justify-content: space-between;
}
button {
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  background: var(--Secondary, #365FAC);
  padding: 4px 15px;
  border-radius: 2px 0 0 0;
  border: 1px 0 0 0;
}
</style>
