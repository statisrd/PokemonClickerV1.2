<template>
  <div class="container">
    У тебя нет лицензии
  </div>
</template>

<script>


export default {

  data() {
    return {
      matrix: []
    };
  },
  methods: {
    async fetchItem() {
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

      this.matrix = matrix;
    },
    onDragEnd() {
      // Обработка окончания перетаскивания (если нужно)
    }
  },
  mounted() {
    this.fetchItem();
  }
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
  grid-template-columns: repeat(7, 1fr);
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
</style>
