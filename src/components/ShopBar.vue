<template>
  <div class="shop-item">
    <div >
      Магазина нет!<br>
      Gpt отказался его писать
    </div>
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
import PasEgg from '@/components/element/veryImportant/PasEgg.vue';
import MoneyAdd from '@/components/element/veryImportant/MoneyAdd.vue';

export default {
  components: {
    PasEgg,
    MoneyAdd
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

<style scoped>

.shop-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  gap: 12px;
  width: 400px;
  height: 100%;
  margin: 20px;
  padding-top: 200px;
  box-shadow: 0px 0px 16px 0px #3A3A3A1A;
  border-radius: 12px;
}
</style>
