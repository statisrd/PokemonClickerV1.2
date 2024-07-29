<template>
  <div class="container">
    <div class="garden-wrapper">
      <!-- Вторая таблица 7x7 -->
      <div class="garden-matrix">
        <div class="matrix lock-matrix">
          <div v-for="(row, rowIndex) in matrix7x7" :key="rowIndex" class="row">
            <div v-for="(pokemon, colIndex) in row" :key="colIndex" class="cell"></div>
          </div>
        </div>

        <!-- Первая таблица с перетаскиванием -->
        <div :class="['matrix', `matrix-${matrixSize}x${matrixSize}`]">
          <div v-for="(row, rowIndex) in matrix5x5" :key="rowIndex" class="row">
            <draggable v-model="matrix5x5[rowIndex]" :key="`row-${rowIndex}`" class="row" v-bind="gardenOptions">
              <div v-for="(pokemon, colIndex) in row" :key="colIndex" class="cell">
                <img v-if="pokemon" :src="pokemon.sprites.front_default" :alt="pokemon.name" />
              </div>
            </draggable>
          </div>
        </div>
      </div>

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
<!-- Cпасибо GPT за создание такого замечательного цикла (Разобрать как это работает) -->
        
        <div class="garden-options__info">
          <p class="garden-options__info-text">Скорость роста</p>
          <p class="garden-options__info-growth">{{ growthRate }}%/час</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import draggable from 'vuedraggable';
import MoneySubstract from '@/components/element/MoneySubstract.vue';

export default {
  components: {
    draggable,
    MoneySubstract,
  },
  data() {
    return {
      matrix5x5: [],
      matrix7x7: [],
      matrixSize: 5,
      growthRate: 15,
      gardenOptions: {
          group: 'pokemon',
          draggable: '.colsInventory'
        },
        storeItems: [
        {
          description: 'Увеличить площадь грядки',
          price: 1000,
          action: this.inventoryPurchase,
          params: 1000
        },
        {
          description: 'Ускорить рост на 2%/час на 2 часа',
          price: 3000,
          action: this.growthPurchase,
          params: { percentage: 2, price: 3000 }
        },
        {
          description: 'Ускорить рост на 5%/час на 2 часа',
          price: 5000,
          action: this.growthPurchase,
          params: { percentage: 5, price: 5000 }
        }
      ]
    };
  },
  methods: {
    async fetchPokemon() {
      const pokemonIds = [138, 113,246];
      const requests = pokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => response.json()));
      const pokemons = await Promise.all(requests);

      const matrix5x5Size = 5;
      const matrix5x5 = new Array(matrix5x5Size).fill(null).map(() => new Array(matrix5x5Size).fill(null));

      const matrix7x7Size = 7;
      const matrix7x7 = new Array(matrix7x7Size).fill(null).map(() => new Array(matrix7x7Size).fill(null));

      pokemons.forEach((pokemon, index) => {
        const row5x5 = Math.floor(index / matrix5x5Size);
        const col5x5 = index % matrix5x5Size;
        matrix5x5[row5x5][col5x5] = pokemon;

        const row7x7 = Math.floor(index / matrix7x7Size);
        const col7x7 = index % matrix7x7Size;
        matrix7x7[row7x7][col7x7] = pokemon;
      });

      this.matrix5x5 = matrix5x5;
      this.matrix7x7 = matrix7x7;
    },
    increaseMatrixSize() {
      if (this.matrixSize < 7) {
        this.matrixSize++;
        const newRow = new Array(this.matrixSize).fill(null);
        this.matrix5x5.forEach(row => row.push(null));
        this.matrix5x5.push(newRow);
      }
    },
    increaseGrowthRate(percentage) {
      this.growthRate += percentage;
      setTimeout(() => {
        this.growthRate -= percentage;
      }, 5 * 1000);
    },



////////хз нужно как-то оптимизировать

    subtractMoney(price) {
        this.$store.dispatch('subtractMoney', price);
      },
///////////////////////////////////////////////v//// эти кавычки тоже важны!!!
      async growthPurchase({ percentage, price }) {
      const currentMoney = this.$store.getters.getMoney;
      if (currentMoney >= price) {
        this.subtractMoney(price);
        this.increaseGrowthRate(percentage);
      } else {
        alert('У тебя недостаточно денег. НИЩЕБРОД!!!!');
      }
    },

    async inventoryPurchase(price) { 
      const currentMoney = this.$store.getters.getMoney;
      if (currentMoney >= price) {

        this.subtractMoney(price)

        this.increaseMatrixSize();
      } else {
        alert('У тебя недостаточно денег. НИЩЕБРОД!!!!');
      }
    },
    //////////
  },

  
  mounted() {
    this.fetchPokemon();
  }
};
</script>


<style scoped>
.container {

}
.garden-wrapper{
  display: flex;
 justify-content: space-between;
 height: 430px;
}
.garden-matrix{
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

.lock-matrix{


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

.garden-options{
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 300px;

}
.garden-options__store{
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.garden-options__store-block{
  display: flex;
  flex-direction: column;
  gap: 12px;
  
}
.garden-options__store-info{
  display: flex;
  justify-content: center;
  align-items: center;
}
.garden-options__store-buy{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.garden-options__info{
  display: flex;
  justify-content: space-between;
}
</style>
