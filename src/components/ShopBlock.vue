<template>
    <div class="shop-block">
      <img class="shop-block__search" src="@/assets/Search.svg" alt="search">
      <div class="shop-block__assortiment" v-for="elem in shopAssortment" :key="elem.id">
        <ShopItem :elem="elem" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useGdsStore } from '@/store/gdsStore'; // Импортируем наш Pinia store
  import ShopItem from './element/ShopItem.vue';
  
  const gdsStore = useGdsStore(); // Получаем доступ к store
  
  const shopAssortment = ref([]); // Локальное состояние для ассортимента
  
  const addAGDS = async (item) => {
    await gdsStore.addAGDS(item);
  };
  
  // Вызов действия при монтировании компонента
  onMounted(async () => {
    if (gdsStore.getShop.length === 0) {
      await addAGDS({ id: 1, price: 1000, name: 'Ягода 1 уровня', info: 'Накорми ей покемона для увеличения веса на 0.1 кг', type: 'berry' });
      await addAGDS({ id: 2, price: 5000, name: 'Покеболл 1 уровня', info: 'Во время охоты ловит покемона с шансом 7%', type: 'pokeball' });
      await addAGDS({ id: 3, price: 7000, name: 'Покеболл 2 уровня', info: 'Во время охоты ловит покемона с шансом 15%', type: 'pokeball' });
    }
    shopAssortment.value = gdsStore.getShop; // Устанавливаем ассортименты
  });
  </script>
  
  <style lang="scss" scoped>
  .shop-block {
    width: 100%;
    height: 100%;
  }
  </style>
  