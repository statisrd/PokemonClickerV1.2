<template>
  <div class="pokemon-list">
    <div v-for="(playerPokemon, index) in playerPokemons" :key="index" class="pokemon-card">
      <div class="pokemon-info">
        <h3>{{ playerPokemon.name }}</h3>
        <img style="cursor:pointer" src="@/assets/setting.svg" :alt="playerPokemon.name" @click="showModal(playerPokemon)" />
      </div>
      <img :src="playerPokemon.playerPokemon.sprites.front_default" :alt="playerPokemon.name" class="pokemon-info" />
      <div class="pokemon-info">
        <h4>Вес:</h4>
        <div>{{ playerPokemon.playerPokemon.weight }} кг</div>
      </div>
      <div class="pokemon-info">
        <h4>Денег/сек:</h4>
        <div>{{ playerPokemon.mps }}</div>
      </div>
    </div>

    <!-- Использование компонента SettingsModal -->
    <SettingsModal
    v-if="selectedPokemon"
    :pokemon="selectedPokemon"
    @close="hideModal"
    />
    <!-- Разобраться как эта шляпа работает (@update-nickname="updatePokemonNickname" ) -->
  </div>
</template>

<script>
import SettingsModal from './SettingsModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    SettingsModal
  },
  data() {
    return {
      playerPokemons: [], 
      selectedPokemon: null ,
    };
  },
  methods: {
    ...mapActions(['addNewPokemon','subtractMoney']),
    showModal(playerPokemon) {
      this.selectedPokemon = playerPokemon;
    },
    hideModal() {
      this.selectedPokemon = null;
    },
  },
  computed: {
    ...mapGetters(['getPlayerPokemon']),

  },

  async mounted() {
    this.playerPokemons = await this.getPlayerPokemon;



    this.playerPokemons = await this.getPlayerPokemon;
    console.log("pokem",this.playerPokemon);


  },
};
</script>

<style scoped>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 16px;
  overflow-y: auto; 
  height: 500px; 
}





.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 165px;
  height: 270px;
  padding: 12px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-image {
  width: 100px;
  height: 100px;
}

.pokemon-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
