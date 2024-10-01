import { createApp } from 'vue'; // Импортируем createApp из Vue
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { createPinia } from 'pinia'; // Импортируем createPinia
import './scss/mixins.scss';

// Создаем приложение Vue
const app = createApp(App);

// Настройка Pinia
const pinia = createPinia();
app.use(pinia); // Подключаем Pinia

// Подключаем Vuetify
app.use(vuetify);

// Устанавливаем конфигурацию для продакшена (по желанию)
app.config.productionTip = false;

// Монтируем приложение
app.mount('#app');
