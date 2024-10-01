<template>
  <div class="container">
    <div class="matrix">
      <div v-for="(row, rowIndex) in matrix" :key="rowIndex" class="row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell">
          <img v-if="cell" :src="cell.sprites.front_default" :alt="cell.name" class="pokemon-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const matrix = ref([]);

    const fetchItem = async () => {
      const pokemonIds = [1, 2, 3, 4, 5, 6, 7]; // Можно указать больше ID покемонов
      const requests = pokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => response.json()));
      const pokemons = await Promise.all(requests);

      // Создаем матрицу 7x7 и заполняем покемонами
      const matrixSize = 7;
      let matrix = new Array(matrixSize).fill(null).map(() => new Array(matrixSize).fill(null));
      pokemons.forEach((pokemon, index) => {
        const row = Math.floor(index / matrixSize);
        const col = index % matrixSize;
        matrix[row][col] = pokemon;
      });

      matrix.value = matrix;
    };

    const onDragEnd = () => {
      // Обработка окончания перетаскивания (если нужно)
    };

    onMounted(() => {
      fetchItem();
    });

    return {
      matrix,
      onDragEnd,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.matrix {
  display: grid;
  grid-template-columns: repeat(7, 80px);
  gap: 10px;
}

.row {
  display: contents;
}

.cell {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.pokemon-image {
  width: 100%;
  height: auto;
}
</style>
