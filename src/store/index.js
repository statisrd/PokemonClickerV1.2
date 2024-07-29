import Vue from 'vue';
import Vuex from 'vuex';
import moneyModule from "@/store/moneyModule";
import nicknameModule from "@/store/nicknameModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        moneyModule,
        nicknameModule,
    }
  });