<template>
    <div>
      <div class="grid">
          <div v-for="(block, rowIndex) in grid" :key="rowIndex" 
          :style="{ display: 'grid', gridTemplateColumns: `repeat(${Cols}, 48px)`}" class="row">
              <div v-for="(cell, colIndex) in block" :key="colIndex"  
              :class="LockRowOrCol(rowIndex, colIndex) ? 'lock' : 'block'"
              @drop="onDrop($event, rowIndex, colIndex)"
              @dragover="onDragOver"  >
                  <div v-if="fetchItem(rowIndex,colIndex)"
                @dragstart="onDragStart($event, fetchItem(rowIndex,colIndex))">
                <!-- клёвый костыль -->
                  <img :src="fetchItem(rowIndex,colIndex).pokemon.sprites.default || fetchItem(rowIndex,colIndex).pokemon.sprites.front_default" 
                  alt="Pokemon" class="pokemon-image" />
                  </div>
              </div>
          </div>
      </div>
    </div>  
      
      </template>
      
      <script>
      
      import { mapActions } from 'vuex';
      
      
      export default {
        components: {
      
        },
        props: {
          Rows: Number,
          Cols: Number,
          unlockedColsCells: Number,
          unlockedRowsCells: Number,
          items: Array,
          arrayName: String,
        },
        data() {
          return {
            grid: [],
            draggedBlock: null,
            draggedItem: null,
          };
        },
        methods: {
          ...mapActions(['updatePosition']),
      
          getPutRules(rowIndex, colIndex) {
            if (rowIndex >= this.unlockedRowsCells || colIndex >= this.unlockedColsCells) {
              return false;
            }
            if (this.grid[rowIndex][colIndex].length > 0) {
              return false;
            }
            return 'shared';
          },
          LockRowOrCol(rowIndex, colIndex) {
            return rowIndex >= this.unlockedRowsCells || colIndex >= this.unlockedColsCells;
          },
      
          onDragStart(event, item) {
            this.draggedBlock = event.target;
            this.draggedItem = item.id;
 
            event.dataTransfer.effectAllowed = 'move';
          },
          onDrop(event, rowIndex, colIndex) {
            event.preventDefault();
            if (this.draggedBlock) {
              if(rowIndex>=0 && colIndex>=0){
              this.updatePosition({id: this.draggedItem , x: rowIndex, y: colIndex, arrayName: this.arrayName});
              }
            }
          },
          onDragOver(event) {
            if(event.target.classList.contains('block')){
    
              event.preventDefault(); // Разрешаем сброс элемента
              event.dataTransfer.dropEffect = 'move';
            }
          },
      
          fetchItem(rowIndex,colIndex ) {
            for (const item of this.items){

              console.log(item, "это итемы"); 
              if(item.x === rowIndex && item.y === colIndex){
                     
                return item;    
              }
              }
              return null;
          },
      
        },
        created() {
          this.grid = Array.from({ length: this.Rows }, () => Array.from({ length: this.Cols }, () => []));

            

        },
        mounted(){


        }
      
      
      }
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
      