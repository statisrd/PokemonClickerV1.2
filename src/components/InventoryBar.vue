<template>
    <div class="inventory-list">
        <p class="inventory-list__name yellow-blue-style">Inventory</p>
        <div class="inventory-list__slots">
          <div v-for="(row, rowIndex) in matrix" :key="rowIndex" class="rowsInventory">
            <draggable v-model="matrix[rowIndex]" :key="`row-${rowIndex}`" class="rowsInventory" v-bind="dragOptions">
            <div v-for="(pokemon, cellIndex) in row" :key="cellIndex" class="colsInventory">
            <img class="cell" v-if="pokemon" :src="pokemon.sprites.front_default" :alt="pokemon.name" />
          </div>
        </draggable>
        </div>
      </div>
          <div class="inventory-list__add">
            <button v-if="lockMatrix.length > 0" class="inventory-list__add-button" @click="inventoryPurchase(price)">
              <MoneySubstract :amount="price"/>
            </button>
            <div v-for="(row, rowIndex) in lockMatrix" :key="rowIndex" class="rowsInventory">
            <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="colsInventory__hidden">
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
        matrixSize: 3, // Начальный размер матрицы
        price: 1000,
        matrix: [],
        lockMatrix: [],    
        dragOptions: {
          group: 'pokemon',
          draggable: '.colsInventory'
        }
      };
    },
    methods: {
      addInventory() {
        // Устанавливаем начальные размеры матрицы
        const numRows = this.matrixSize;
        const numCols = 5; // Число колонок фиксировано в 5
  
        // Создаем матрицу размером numRows на numCols и заполняем пустыми значениями
        this.matrix = Array(numRows).fill(null).map(() => Array(numCols).fill(null));
  
        // Создаем скрытую матрицу с 8 строками и numCols колонками
        this.lockMatrix = Array(8).fill(null).map(() => Array(numCols).fill(null));
      },
      async fetchPokemon() {
        const pokemonIds = [1, 2]; // Два ID покемонов
        const requests = pokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => response.json()));
        const pokemons = await Promise.all(requests);
  
        pokemons.forEach((pokemon, index) => {
          const numRows = Math.floor(index / 5); // Используем 5 как количество колонок
          const numCols = index % 5;
          if (this.matrix[numRows]) {
            this.$set(this.matrix[numRows], numCols, pokemon);
          }
        });
      },
      addRow() {
        // Проверяем, есть ли ещё строки в lockMatrix
        if (this.lockMatrix.length > 0) {
          const numColumns = this.matrix[0] ? this.matrix[0].length : 5; // Параметр по умолчанию 5, если matrix пуст
          const newRow = Array(numColumns).fill(null); // Используем null для нового ряда
          this.matrix.push(newRow);
  
          // Удаляем строку из lockMatrix
          this.lockMatrix.shift();
        } else {
          console.warn('No more rows available in lockMatrix.');
        }
      },

////////хз нужно как-то оптимизировать
      subtractMoney(price) {
        
        this.$store.dispatch('subtractMoney', price);
      },
      async inventoryPurchase(price) { 
      const currentMoney = this.$store.getters.getMoney;
      if (currentMoney >= price) {

        this.subtractMoney(price)

        this.addRow();
      } else {
        alert('У тебя недостаточно денег. НИЩЕБРОД!!!!');
      }
    },
/////////////
    },
    created() {
      this.addInventory();
    },
    mounted() {
      this.fetchPokemon();
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
  margin: 20px;
  box-shadow: 0px 0px 16px 0px #3A3A3A1A;
  border-radius: 12px;
}

.inventory-list__name{
    @include yellow-blue-style;
    margin: 16px 16px 0 16px ;
}

.inventory-list__slots{
display: grid;
grid-template-columns: repeat(5, 1fr);

}

.colsInventory{
  display: flex;
  align-items: center;
    justify-content: center;
  margin: 6px;
  width: 48px;
  height: 48px;
  background: var(--Gray-100, #EFEFEF);
  border-radius: 4px;

}

.colsInventory__hidden{

  margin: 6px;
  width: 48px;
  height: 48px;
  background: var(--Gray-100, #EFEFEF);
  border-radius: 4px;
  opacity: 30%;

  cursor: default;
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


