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
        <div class="inventory-list__add">
          <button v-if="Rows > unlockedRowsCells" class="inventory-list__add-button" @click="inventoryPurchase(price)">
            <MoneySubstract :amount="price"/>
          </button>

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
    FieldBlock,
  },
  data() {
  return {
    price: 1000,
    Rows: 11,
    Cols: 5,
    unlockedColsCells: 0,
    unlockedRowsCells: 0,
    items: [],
    arrayName: 'inventory',
  };
},

  methods: {
    ...mapActions(['fetchPokemon','subtractMoney', 'updateGridSize']),
    // ...mapGetters(['getPokemon']),
    
    
////////хз нужно как-то оптимизировать

async inventoryPurchase(price) { 
  const currentMoney = this.$store.getters.getMoney;
  if (currentMoney >= price) {
    await this.subtractMoney(price);
    this.unlockedRowsCells += 1;
    this.updateGridSize({ arrayName: this.arrayName, cols: this.unlockedColsCells, rows: this.unlockedRowsCells });
  } else {
    alert('У тебя недостаточно денег.');
  }
}

/////////////
  },
  computed:{
    ...mapGetters(['getPokemon', 'getCellsInventory']),
  },

  async mounted() {

  this.items = this.getPokemon;
  // if (this.items.length === 0) {
  //   await this.fetchPokemon({ id: 11, arrayName: this.arrayName });
  //   await this.fetchPokemon({ id: 12, arrayName: this.arrayName });
  // }
  this.unlockedColsCells = this.getCellsInventory.cols;
  this.unlockedRowsCells = this.getCellsInventory.rows;
},


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


