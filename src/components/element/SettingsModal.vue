<template>
    <div v-if="pokemon" class="modal-overlay" @click="$emit('close')">
        <div class="modal" @click.stop>
            <div class="modal-info">
                <div>Управление покемоном {{ pokemon.nickname || pokemon.name }}</div>
                <button @click="$emit('close')">Тут крестик => Х</button>
            </div>
            <div class="modal-tabs">
                <div class="tabs">
                    <button :class="{ active: activeTab === 'feed' }" @click="activeTab = 'feed'">Накормить</button>
                    <button :class="{ active: activeTab === 'stats' }" @click="activeTab = 'stats'">Статистика</button>
                </div>
            </div>
            <div class="modal-main">
                <div v-if="activeTab === 'feed'" class="tab-content">
                    <v-alert v-if="showAlert" type="success" dismissible @input="showAlert = false" class="custom-alert">
                        {{ alertMessage }}
                    </v-alert>
                    <div class="food-item" v-for="item in foodItems" :key="item.id">
                        <img :src="item.pokemon.sprites.default" :alt="item.name" class="food-item__image">
                        <div class="food-item__details">
                            <h3 class="food-item__title">{{ item.pokemon.name }}</h3>
                            <div class="food-item__description">{{ item.pokemon.info }}</div>
                            <button class="food-item__button" @click="feedPokemon(item)">Накормить</button>
                        </div>
                    </div>
                </div>
                <div v-if="activeTab === 'stats'" class="tab-content">
                    <div class="pokemon-details">
                        <img :src="pokemon.playerPokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-details__image">
                        <button class="delete-button">Удалить покемона</button>
                    </div>
                    <div class="pokemon-details__info">
                        <div class="pokemon-details__info-block"><strong>Вид</strong><v-spacer></v-spacer> {{ pokemon.name }}</div>
                        <div class="pokemon-details__info-block"><strong>Вес</strong><v-spacer></v-spacer> {{ pokemon.playerPokemon.weight }} кг</div>
                        <div class="pokemon-details__info-block"><strong>Суммарно заработано</strong><v-spacer></v-spacer> 11 200</div>
                        <div class="pokemon-details__info-block"><strong>Денег/сек</strong><v-spacer></v-spacer> {{ pokemon.mps }}</div>
                        <div class="pokemon-details__info-block"><strong>Возраст</strong><v-spacer></v-spacer>{{ pokemonAge }}</div>
                        <div class="pokemon-actions">
                            <input class="pokemonNickname" type="text" placeholder="Псевдоним покемона" v-model="pokemonNickname">
                            <button class="save-button" @click="saveNickname()">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="close-button" @click="$emit('close')">Закрыть</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { usePokemonStore } from '@/store/pokemonModule';
import { useMoneyStore } from '@/store/moneyModule';
import { usePlayerPokemonsModule } from '@/store/playerPokemonsModule';



export default {
    name: 'ShopItem',
    props: {
    pokemon: Object,
  },
  setup(props) {
    const pokemonStore = usePokemonStore();
    const playerPokemonStore = usePlayerPokemonsModule();
    const moneyStore = useMoneyStore();

    const activeTab = ref('feed');
    const pokemonNickname = ref('');
    const foodItems = ref([]);
    const showAlert = ref(false);
    const alertMessage = ref('');

    const saveNickname = () => {
      console.log("menztv");
      playerPokemonStore.renamePokemon({ id: props.pokemon.id, newName: pokemonNickname.value });
    };

    const subtractMoney = (price) => {
      moneyStore.subtractMoney(price);
    };

    const feedPokemon = (item) => {
      alertMessage.value = `Ягод нет! Но деньги мы спишем`;
      showAlert.value = true;
      subtractMoney(10);
      setTimeout(() => {
        showAlert.value = false;
      }, 3000);
      pokemonStore.removePokemon({ id: item.id, arrayName: 'inventory' });
    };

    const declension = (number, titles) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    };

    const pokemonAge = computed(() => {
      const currentTime = Date.now();
      const ageInMilliseconds = currentTime - props.pokemon.age;

      const minutes = Math.floor((ageInMilliseconds / (1000 * 60)) % 60);
      const hours = Math.floor((ageInMilliseconds / (1000 * 60 * 60)) % 24);
      const days = Math.floor((ageInMilliseconds / (1000 * 60 * 60 * 24)) % 30);
      const months = Math.floor((ageInMilliseconds / (1000 * 60 * 60 * 24 * 30)) % 12);
      const years = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));

      let ageString = '';

      if (years > 0) {
        ageString += `${years} ${declension(years, ['год', 'года', 'лет'])} `;
      }
      if (months > 0) {
        ageString += `${months} ${declension(months, ['месяц', 'месяца', 'месяцев'])} `;
      }
      if (days > 0) {
        ageString += `${days} ${declension(days, ['день', 'дня', 'дней'])} `;
      }
      if (hours > 0) {
        ageString += `${hours} ${declension(hours, ['час', 'часа', 'часов'])} `;
      }
      if (minutes > 0 || ageString === '') {
        ageString += `${minutes} ${declension(minutes, ['минута', 'минуты', 'минут'])}`;
      }

      return ageString.trim();
    });

    onMounted(() => {
      foodItems.value = pokemonStore.getPokemon;
    });

    return {
      activeTab,
      pokemonNickname,
      foodItems,
      showAlert,
      alertMessage,
      saveNickname,
      feedPokemon,
      pokemonAge,
    };
  },
};



</script>

<style scoped>

.custom-alert {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    width: 600px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-info {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 24px 16px;
    box-shadow: 0px -1px 0px 0px #F0F0F0 inset;
}

.modal-tabs {
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 32px;

    box-shadow: 0px -1px 0px 0px #F0F0F0 inset;
}
.tabs{
    display: flex;
    gap: 32px;
}

.tabs button {
    display: inline-block;
    border-bottom: 2px solid transparent;
    transition: border-bottom-color 0.3s ease;
    box-sizing: border-box;
    padding: 12px 0px;
}

.tabs button.active {
    color: #365FAC;
    border-bottom-color: #365FAC;
}

.modal-main {
    height: 320px;

}

.tab-content {
    display: flex;
    justify-content: center;
    align-items: stretch;
    margin: 10px 24px;
    gap: 12px;
    flex-wrap: wrap;
    overflow-y: auto;
    max-height: 300px; /* можно подкорректировать по вашему усмотрению */
}

.food-item {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    background-color: #fff;
}

.food-item__image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

.food-item__details {
    flex: 1;
}

.food-item__title {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
}

.food-item__description {
    margin: 5px 0;
}

.food-item__button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.food-item__button:hover {
    background-color: #0056b3;
}

.pokemon-details {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
}

.pokemon-details__image {
    width: 143px;
    height: 143px;
    border-radius: 6px 0px 0px 0px;
    background: var(--Gray-100, #EFEFEF);
}

.pokemon-details__info {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.pokemon-details__info-block {
    display: flex;
}

.pokemonNickname {
    height: 32px;
    padding: 12px 5px;
    border: 1px solid #40A9FF;
}

.pokemon-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.modal-footer {
    height: 52px;
    padding: 10px 16px;
    gap: 8px;
    opacity: 0px;
    text-align: end;
    box-shadow: 0px 1px 0px 0px #F0F0F0 inset;
}

.delete-button,
.save-button,
.close-button {
    background: var(--Secondary, #365FAC);
    color: white;
    border: none;
    border-radius: 2px;
    padding: 5px 10px;
    cursor: pointer;
}

.delete-button:hover,
.save-button:hover,
.close-button:hover {
    background-color: #0056b3;
}
</style>
