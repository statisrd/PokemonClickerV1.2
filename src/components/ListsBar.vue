
<template>
  <div class="dropdown-list">
    <div 
      v-for="block in DropDownList" 
      :key="block.id" 
      class="dropdown-list__block"
      @click="toggleComponent(block.id)">
      <div class="dropdown-list__block-info">
        <div class="dropdown-list__block-info__name">
          {{ block.name }}
        </div>
        <img src="Arrow.svg" alt="">
      </div>
      <component 
        v-if="activeComponent === block.id" 
        :is="block.elementName">
      </component>
    </div>
  </div>
</template>

<script>
import { ref,  onMounted } from 'vue';
import { usePlayerPokemonsModule } from '@/store/playerPokemonsModule';
import PokemonBlock from '@/components/element/PokemonsBlock.vue';
import GardenBlock from '@/components/element/GardenBlock.vue';
import HuntBlock from '@/components/element/HuntBlock.vue';

export default {
  components: {
    PokemonBlock,
    GardenBlock,
    HuntBlock
  },
  setup() {
    const playerPokemonsModule = usePlayerPokemonsModule();

    const activeComponent = ref(null);
    const DropDownList = ref([
      { id: 0, name: 'My pokemon', elementName: 'PokemonBlock' },
      { id: 1, name: 'Garden', elementName: 'GardenBlock' },
      { id: 2, name: 'Hunt', elementName: 'HuntBlock' }
    ]);

    const toggleComponent = (id) => {
      console.log("zakriv")
      if (activeComponent.value !== id) {
        activeComponent.value = id;
      } else {
        activeComponent.value = null;
      }
    };

    onMounted(async () => {
      const pokemons = playerPokemonsModule.getPlayerPokemon || [];

      if (pokemons.length === 0) {
        await playerPokemonsModule.addNewPokemon(84);
        await playerPokemonsModule.addNewPokemon(34);
        await playerPokemonsModule.addNewPokemon(63);
      }
    });

    return {
      activeComponent,
      DropDownList,  // Возвращаем DropDownList здесь
      toggleComponent,
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

.container {
  padding: 10px;
  border-radius: 5px;
  margin: 20px;
}

.button {
  background-color: #f0f0f0;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-list {
  margin: 20px;
  width: 100%;
}

.dropdown-list__block {
  margin-bottom: 16px;
  width: 100%;
  min-height: 5vh;
  box-shadow: 0px 0px 16px 0px #3a3a3a1a;
  border-radius: 12px;
}

.dropdown-list__block-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 5vh;
  padding: 16px;
}

.dropdown-list__block-info__name {
  @include yellow-blue-style;
}
</style>
