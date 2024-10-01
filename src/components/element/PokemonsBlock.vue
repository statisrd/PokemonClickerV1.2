<template>
  <div class="pokemon-list">
    <div v-for="(playerPokemon, index) in playerPokemons" :key="index" class="pokemon-card">
      <div class="pokemon-info">
        <h3>{{ playerPokemon.name }}</h3>
        <img style="cursor:pointer" src="setting.svg" alt="шестерёнка" @click.stop="showModal(playerPokemon)" />
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
  </div>
</template>

<!-- <script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import SettingsModal from './SettingsModal.vue'; -->

<script>
import SettingsModal from '@/components/element/SettingsModal.vue';
import { usePlayerPokemonsModule } from '@/store/playerPokemonsModule';

// import { useStore } from 'pinia';
import { ref, onMounted } from 'vue';

export default {
  components: {
    SettingsModal
  },
  setup() {
    const playerPokemonsStore = usePlayerPokemonsModule();
    const playerPokemons = ref([]);
    const selectedPokemon = ref(null);


    const showModal = (pokemon) => {
      selectedPokemon.value = pokemon;
      console.log("pokemuuu", selectedPokemon.value);
    };

    const hideModal = () => {

      selectedPokemon.value = null;
    };

    onMounted(async () => { 
      playerPokemons.value = playerPokemonsStore.getPlayerPokemon;
      console.log("pokem", playerPokemons.value);
    });

    return {
      playerPokemons,
      selectedPokemon,
      showModal,
      hideModal,
    };
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
