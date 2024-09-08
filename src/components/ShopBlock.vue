<template>
    <div class="shop-block">
        <img class="shop-block__search" src="@/assets/Search.svg" alt="">
        <div class="shop-block__assortiment" v-for="elem in shopAssortment" :key="elem.id">
            <ShopItem :elem="elem" />
        </div>
    </div>
</template>

<script>
import ShopItem from './element/ShopItem.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        ShopItem,
    },
    computed: {
        ...mapGetters(['getShop']),
        shopAssortment() {
            return this.getShop; // Используем геттер напрямую
        }
    },
    methods: {
        ...mapActions(['addAGDS']),
    },
    async mounted() {
        if (this.shopAssortment.length === 0) {
            await this.addAGDS({ id: 1, price: 1000, name: 'Ягода 1 уровня', info: 'Накорми ей покемона для увеличения веса на 0.1 кг' , type: 'berry'});
            await this.addAGDS({ id: 2, price: 5000, name: 'Покеболл 1 уровня', info: 'Во время охоты ловит покемона с шансом 7%' , type: 'pokeball'});
            await this.addAGDS({ id: 3, price: 7000, name: 'Покеболл 2 уровня', info: 'Во время охоты ловит покемона с шансом 15%' , type: 'pokeball'});
        }
    }
};
</script>

<style lang="scss" scoped>
.shop-block {
    width: 100%;
    height: 100%;
}
</style>
