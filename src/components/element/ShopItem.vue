<template>
    <div class="shop-item">
      <div class="shop-item__main">
        <div class="shop-item__main__sprite">
          <img :src="elem.gdsData.sprites.default" alt=""> <!-- Убедитесь, что путь корректный -->
        </div>
        <div class="shop-item__main__info">
          <div class="shop-item__main__info__header">{{ elem.name }}</div>
          <div class="shop-item__main__info__main">{{ elem.info }}</div>
        </div>
      </div>
      <button @click="buyElement(elem.price, elem.id)" class="shop-item__button">
        Купить за {{ elem.price }}
      </button>
    </div>
  </template>
  
  <script>
import { computed } from 'vue';
import { useMoneyStore } from '@/store/moneyModule';
import { useGdsStore } from '@/store/gdsStore';

export default {
  name: 'ShopItem',
  props: {
    elem: Object
  },
  setup() {
    const moneyStore = useMoneyStore();
    const gdsStore = useGdsStore();

    // Доступ к состоянию Pinia
    const currentMoney = computed(() => moneyStore.money);

    // Метод для покупки элемента
    const buyElement = async (price, id) => {
      if (currentMoney.value >= price) {
        if(!(await gdsStore.buyAGDS(id))){
          await moneyStore.subtractMoney(price);
        }
      } else {
        alert('У тебя недостаточно денег.');
      }
    };

    return {
      buyElement
    };
  }
}
</script>
  
  <style lang="scss" scoped>
  .shop-item {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    padding: 12px;
    border-radius: 16px;
    box-shadow: 0px 0px 16px 0px #3a3a3a1a;
  
    &__main {
      display: flex;
      justify-content: space-between;
      gap: 23px;
  
      &__sprite {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 59px;
        height: 59px;
        background: var(--Gray-100, #EFEFEF);
  
        img {
          display: flex;
          height: 100%;
        }
      }
  
      &__info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
  
        &__header {
          font-family: Inter;
          font-size: 16px;
          font-weight: 700;
          line-height: 19.36px;
          text-align: left;
        }
  
        &__main {
          font-family: Inter;
          font-size: 14px;
          font-weight: 500;
          line-height: 16.94px;
          text-align: left;
        }
      }
    }
  
    &__button {
      padding: 4px;
      width: 100%;
      color: #fff;
      background: var(--Secondary, #365FAC);
    }
  }
  </style>
  