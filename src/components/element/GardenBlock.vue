<template>
  <div class="container">
    <div class="garden-wrapper">
      <!-- Вторая таблица 7x7 -->
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
              <button @click="item.action(item.params)" class="increase-button">Купить</button>
              <MoneySubstract :amount="item.price"/>
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
import FieldBlock from '@/components/FieldBlock.vue';
import MoneySubstract from '@/components/element/MoneySubstract.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MoneySubstract,
    FieldBlock
  },
  data() {
    return {
      growthRate: 15,
      Rows: 7,
      Cols: 7,
      unlockedColsCells: 0,
      unlockedRowsCells: 0,
      items: [],
      arrayName: 'garden',
      storeItems: [
        {
          description: 'Увеличить площадь грядки',
          price: 1000,
          action: (params) => this.inventoryPurchase(params),
          params: 1000
        },
        {
          description: 'Ускорить рост на 2%/час на 2 часа',
          price: 3000,
          action: (params) => this.growthPurchase(params),
          params: { percentage: 2, price: 3000 }
        },
        {
          description: 'Ускорить рост на 5%/час на 2 часа',
          price: 5000,
          action: (params) => this.growthPurchase(params),
          params: { percentage: 5, price: 5000 }
        },
      ]
    };
  },
  methods: {
    ...mapActions(['fetchPokemon', 'subtractMoney', 'updateGridSize']),
    increaseGrowthRate(percentage) {
      this.growthRate += percentage;
      setTimeout(() => {
        this.growthRate -= percentage;
      }, 5 * 1000);
    },
    async growthPurchase({ percentage, price }) {
      const currentMoney = this.$store.getters.getMoney;
      if (currentMoney >= price) {
        await this.subtractMoney(price);
        this.increaseGrowthRate(percentage);
      } else {
        alert('У тебя недостаточно денег. НИЩЕБРОД!!!!');
      }
    },
    async inventoryPurchase(price) { 
      if(this.Rows>this.unlockedRowsCells && this.Cols> this.unlockedRowsCells){

        const currentMoney = this.$store.getters.getMoney;
        if (currentMoney >= price) {
          await this.subtractMoney(price);
          this.unlockedRowsCells += 1;
          this.unlockedColsCells += 1;
          this.updateGridSize({ arrayName: this.arrayName, cols: this.unlockedColsCells, rows: this.unlockedRowsCells });
        } else {
          alert('У тебя недостаточно денег.');
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getGarden', 'getCellsGarden']),
  },
  async mounted() {



    this.items = this.getGarden;
    if (this.items.length === 0) {
      await Promise.all([
        this.fetchPokemon({ id: 52, arrayName: this.arrayName }),
        this.fetchPokemon({ id: 89, arrayName: this.arrayName }),
      ]);
    }
    this.unlockedColsCells = this.getCellsGarden.cols;
    this.unlockedRowsCells = this.getCellsGarden.rows;

  }
};
</script>

<style scoped>
.garden-wrapper {
  display: flex;
  justify-content: space-between;
  height: 430px;
}
.garden-matrix {
  position: relative;
  height: 430px;
  width: 430px;
}
.matrix {
  position: absolute;
  display: grid;
}
.matrix-5x5 {
  grid-template-columns: repeat(5, 1fr);
  z-index: 2;
}
.matrix-6x6 {
  grid-template-columns: repeat(6, 1fr);
  z-index: 2;
}
.matrix-7x7 {
  grid-template-columns: repeat(7, 1fr);
  z-index: 2;
}
.lock-matrix {
  grid-template-columns: repeat(7, 1fr);
  opacity: 0.3;
  z-index: 1;
}
.row {
  display: contents;
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px;
  width: 48px;
  height: 48px;
  background: var(--Gray-100, #EFEFEF);
  border-radius: 4px;
}
button {
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  background: var(--Secondary, #365FAC);
  padding: 4px 15px;
  border-radius: 2px 0px 0px 0px;
  border: 1px 0px 0px 0px;
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
</style>
