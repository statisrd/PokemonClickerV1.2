<template>
  <v-app>
    <TopBar />
    <div class="main-block">
      <InventoryBar />
      <div class="main-block__list">
        <ListsBar />
      </div>
      <ShopBar />
    </div>
  </v-app>
</template>

<script>
import { onMounted } from 'vue';
import TopBar from "@/components/TopBar";
import InventoryBar from "@/components/InventoryBar";
import ListsBar from "@/components/ListsBar";
import ShopBar from "@/components/ShopBar";

export default {
  name: 'App',
  components: {
    TopBar,
    InventoryBar,
    ListsBar,
    ShopBar
  },
  
  setup() {
    onMounted(() => {
      // store.dispatch('dropLocal'); - если нужно восстановить логику
    });
  }
};
</script>

<style>
.main-block {
  display: flex;
  justify-content: space-between;
}

.main-block__list {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

* {
  scrollbar-width: none;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
