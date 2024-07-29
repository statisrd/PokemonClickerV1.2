<template>
    <div class="header-content">
      <div class="header-content__logo">
        <img class="header-content__logo-left" src="@/assets/Pokemon.svg" alt="">
        <div class="header-content__logo-delimiter"></div>
        <img class="header-content__logo-right" src="@/assets/Clicker.svg" alt="">
      </div>
      <div class="header-content__money">
        <MoneyDisplay/>
      </div>
    </div>
  </template>
  
  <script>
  import MoneyDisplay from '@/components/element/MoneyDisplay.vue';
  
  export default {
    components: {
      MoneyDisplay,
    }
  }
  </script>
  
  <style scoped lang="scss">
  @import "@/scss/mixins.scss";
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 86px;
    margin: 16px;
    box-shadow: 0px 0px 16px 0px #3A3A3A1A;
    border-radius: 12px;
  }
  
  .header-content__logo {
    display: flex;
    margin: 16px;
    gap: 12px;
  }
  
  .header-content__logo-delimiter {
    height: 54px;
    width: 2px;
    background-color: #EFEFEF;
  }
  
  .header-content__logo-left {
    height: 54px;
    width: 149px;
  }
  
  .header-content__logo-right {
    height: 54px; /* добавил 'px' */
    width: 153px; /* добавил 'px' */
  }
  
  .header-content__money {
    display: flex;
    margin: 16px;
    gap: 6px;
  }
  
  .header-content__money-quantity {

  }
  </style>
  