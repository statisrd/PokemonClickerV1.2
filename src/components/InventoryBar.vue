<template>
  <div class="inventory-list">
    <p class="inventory-list__name yellow-blue-style">Inventory</p>
    <FieldBlock
      :Rows="Rows"
      :Cols="Cols"
      :unlockedColsCells="unlockedColsCells"
      :unlockedRowsCells="unlockedRowsCells"
      :items="items"
      :arrayName="arrayName"
    />
    <div class="inventory-list__add" :style="{ 
      marginBottom: `${682 -unlockedRowsCells * 62}px`, 
      marginTop: `${-682 + unlockedRowsCells * 62}px` 
    }">
      <button v-if="Rows > unlockedRowsCells" class="inventory-list__add-button" @click="inventoryPurchase(price)">
        <MoneySubstract :amount="price" />
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import FieldBlock from '@/components/FieldBlock.vue';
import MoneySubstract from '@/components/element/MoneySubstract.vue';
import { usePokemonStore } from '@/store/pokemonModule';
import { useMoneyStore } from '@/store/moneyModule'; // Импортируем Pinia store

export default {
  components: {
    MoneySubstract,
    FieldBlock,
  },
  setup() {
    const pokemonStore = usePokemonStore();
    const moneyStore = useMoneyStore();

    const price = ref(1000);
    const Rows = ref(11);
    const Cols = ref(5);
    const unlockedColsCells = ref(0);
    const unlockedRowsCells = ref(0);
    const items = ref([]);
    const arrayName = 'inventory';

    const inventoryPurchase = async (price) => {
      const currentMoney = moneyStore.getMoney; // Используем Pinia store
      if (currentMoney >= price) {
        moneyStore.subtractMoney(price); // Используем Pinia store
        unlockedRowsCells.value += 1;
        pokemonStore.setGridSize({
          arrayName,
          cols: unlockedColsCells.value,
          rows: unlockedRowsCells.value,
        });
      } else {
        alert('У тебя недостаточно денег.');
      }
    };

    onMounted(() => {
      items.value = pokemonStore.getPokemon; // Используем Pinia store
      unlockedColsCells.value = pokemonStore.getCellsInventory.cols; // Используем Pinia store
      unlockedRowsCells.value = pokemonStore.getCellsInventory.rows; // Используем Pinia store
    });

    return {
      price,
      Rows,
      Cols,
      unlockedColsCells,
      unlockedRowsCells,
      items,
      arrayName,
      inventoryPurchase,
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

.inventory-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 320px;
  height: 100%;
  padding: 20px;
  box-shadow: 0px 0px 16px 0px #3A3A3A1A;
  border-radius: 12px;
  }
  
  .inventory-list__name{
    @include yellow-blue-style;
    margin: 16px 16px 0 16px ;
  }
  
  
  
  .inventory-list__add{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  }
  
  .inventory-list__add-button{
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 288px;
  gap: 6px;
  margin: 3px 16px;
  padding: 8px;
  border: 3px solid var(--Secondary, #365FAC);
  border-radius: 8px;
  }
  
  .add-button__money-quantity{
  @include yellow-blue-style;
  }
  
  .rowsInventory{
  display: contents;
  
  
  }
  
</style>
