import Vue from 'vue';
import Vuex from 'vuex';
import moneyModule from "@/store/moneyModule";
import nicknameModule from "@/store/nicknameModule";
import pokemonsModule from "@/store/pokemonModule";
import gardenModule from "@/store/gardenModule";
import playerPokemonsModule from "@/store/playerPokemonsModule";
import shopModule from "@/store/shopModule";


Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        moneyModule,
        nicknameModule,
        pokemonsModule,
        gardenModule,
        playerPokemonsModule,
        shopModule,
        
    }
  });