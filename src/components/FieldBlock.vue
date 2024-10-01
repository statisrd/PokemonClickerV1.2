<template>
  <div>
    <div class="grid">
      <div
        v-for="(block, rowIndex) in grid"
        :key="rowIndex"
        :style="{ display: 'grid', gridTemplateColumns: `repeat(${Cols}, 48px)` }"
        class="row"
      >
        <div
          v-for="(cell, colIndex) in block"
          :key="colIndex"
          :class="LockRowOrCol(rowIndex, colIndex) ? 'lock' : 'block'"
          @drop="onDrop($event, rowIndex, colIndex)"
          @dragover="onDragOver"
        >
          <div
            v-if="fetchItem(rowIndex, colIndex)"
            @dragstart="onDragStart($event, fetchItem(rowIndex, colIndex))"
          >
            <img
              :src="fetchItem(rowIndex, colIndex).pokemon.sprites.default || fetchItem(rowIndex, colIndex).pokemon.sprites.front_default"
              alt="Pokemon"
              class="pokemon-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

import { usePokemonStore } from '@/store/pokemonModule'; // Импортируем Pinia store

const props = defineProps({
  Rows: Number,
  Cols: Number,
  unlockedColsCells: Number,
  unlockedRowsCells: Number,
  items: Array,
  arrayName: String,
});

const store = usePokemonStore(); // Используем Pinia store
const grid = ref([]);
const draggedBlock = ref(null);
const draggedItem = ref(null);

onMounted(() => {
  grid.value = Array.from({ length: props.Rows }, () => Array.from({ length: props.Cols }, () => []));
});

// const getPutRules = (rowIndex, colIndex) => {
//   if (rowIndex >= props.unlockedRowsCells || colIndex >= props.unlockedColsCells) {
//     return false;
//   }
//   if (grid.value[rowIndex][colIndex].length > 0) {
//     return false;
//   }
//   return 'shared';
// };

const LockRowOrCol = (rowIndex, colIndex) => {
  return rowIndex >= props.unlockedRowsCells || colIndex >= props.unlockedColsCells;
};

const onDragStart = (event, item) => {
  draggedBlock.value = event.target;
  draggedItem.value = item.id;

  event.dataTransfer.effectAllowed = 'move';
};

const onDrop = (event, rowIndex, colIndex) => {
  event.preventDefault();
  if (draggedBlock.value) {
    if (rowIndex >= 0 && colIndex >= 0) {
      store.setPosition({ id: draggedItem.value, x: rowIndex, y: colIndex, arrayName: props.arrayName });
    }
  }
};

const onDragOver = (event) => {
  if (event.target.classList.contains('block')) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
};

const fetchItem = (rowIndex, colIndex) => {
  return props.items.find(item => item.x === rowIndex && item.y === colIndex) || null;
};
</script>

<style>
.grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.row {
  gap: 14px;
}

.block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--Gray-100, #EFEFEF);
  border-radius: 4px;
}

.list {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
}

.lock { 
  width: 48px;
  height: 48px;
  background: var(--Gray-100, #EFEFEF);
  border-radius: 4px;
  opacity: 30%;
  cursor: default;
}
</style>
