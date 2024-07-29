<template>
  <div class="pokemon-list">
    <div v-for="(pokemon, index) in pokemons" :key="index" class="pokemon-card">
      <div class="pokemon-info">
        <h3>{{ pokemon.nickname || pokemon.name }}</h3>
        <img style="cursor:pointer" src="@/assets/setting.svg" :alt="pokemon.name" @click="showModal(pokemon)" />
      </div>
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-info" />
      <div class="pokemon-info">
        <h4>Вес:</h4>
        <div>{{ pokemon.weight }} кг</div>
      </div>
      <div class="pokemon-info">
        <h4>Денег/сек:</h4>
        <div>1.1</div>
      </div>
    </div>

    <!-- Использование компонента SettingsModal -->
    <SettingsModal
    v-if="selectedPokemon"
    :pokemon="selectedPokemon"
    @close="hideModal"
    @update-nickname="updatePokemonNickname" 
    />
    <!-- Разобраться как эта шляпа работает (@update-nickname="updatePokemonNickname" ) -->
  </div>
</template>

<script>
import SettingsModal from './SettingsModal.vue';

export default {
  components: {
    SettingsModal
  },
  data() {
    return {
      pokemons: [], 
      selectedPokemon: null 
    };
  },
  methods: {
    async fetchPokemons() {
      const pokemonIds = [35, 42, 170, 321, 184, 286, 453, 212, 99, 69]; 
      const requests = pokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()));
      this.pokemons = await Promise.all(requests);
    },
    showModal(pokemon) {
      this.selectedPokemon = pokemon;
    },
    hideModal() {
      this.selectedPokemon = null;
    },
    updatePokemonNickname(newNickname) {
        if (this.selectedPokemon) {
            const pokemon = this.pokemons.find(p => p.id === this.selectedPokemon.id);
            if (pokemon) {
                pokemon.nickname = newNickname;
            }
        }
    }
  },
  created() {
    this.fetchPokemons(); 
  }
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
