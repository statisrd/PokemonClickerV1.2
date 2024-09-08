<template>
  <div class="shop-item">
    <p class="shop-item__name yellow-blue-style">Shop</p>

    <ShopBlock/>

    <div>
      <button @click="openPasEgg">.</button>
      <PasEgg :isVisible="isPasEggVisible" @close="closePasEgg">
        <div>
          <input type="number" v-model.number="amount" />
          <MoneyAdd :amount="amount" />
        </div>
      </PasEgg>
    </div>
  </div>
</template>

<script>
import ShopBlock from './ShopBlock.vue';

import PasEgg from '@/components/element/veryImportant/PasEgg.vue';
import MoneyAdd from '@/components/element/veryImportant/MoneyAdd.vue';

export default {
  components: {
    PasEgg,
    MoneyAdd,

    ShopBlock,
  },
  data() {
    return {
      isPasEggVisible: false,
      amount: 0
    }
  },
  methods: {
    openPasEgg() {
      this.isPasEggVisible = true;
    },
    closePasEgg() {
      this.isPasEggVisible = false;
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/scss/mixins.scss";


.shop-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 12px;
  width: 400px;
  height: 100%;
  padding: 20px;

  box-shadow: 0px 0px 16px 0px #3A3A3A1A;
  border-radius: 12px;

  &__name{
    @include yellow-blue-style;
    margin: 0 ;
  }

}
</style>
