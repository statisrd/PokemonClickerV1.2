<template>
  <div class="dropdown-list">
    <div 
      v-for="item in DropDownList" 
      :key="item.id" 
      class="dropdown-list__block"
      @click="toggleComponent(item.id)">
      <div class="dropdown-list__block-info">
        <div class="dropdown-list__block-info__name">
          {{ item.name }}
        </div>
        <img src="@/assets/Arrow.svg" alt="">
      </div>
      <component 
        v-if="activeComponent === item.id" 
        :is="item.elementName"
        >
      </component>
    </div>
  </div>
</template>

<script>
import PokemonBlock from '@/components/element/PokemonsBlock.vue';
import GardenBlock from '@/components/element/GardenBlock.vue';
import HuntBlock from '@/components/element/HuntBlock.vue';

export default {
  components: {
    PokemonBlock,
    GardenBlock,
    HuntBlock
  },
  data() {
    return {
      activeComponent: null,
      DropDownList: [
        { id: 0, name: 'My pokemon', elementName: 'PokemonBlock' },
        { id: 1, name: 'Garden', elementName: 'GardenBlock' },
        { id: 2, name: 'Hunt', elementName: 'HuntBlock' }
      ]
    };
  },
  methods: {
    toggleComponent(id) {
      if (this.activeComponent !== id) {
        this.activeComponent = id;
      }
    }
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
.dropdown-list{

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
