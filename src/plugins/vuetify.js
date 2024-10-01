// src/plugins/vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Импортируйте стили Vuetify
import * as components from 'vuetify/components'; // Импортируйте компоненты
import * as directives from 'vuetify/directives'; // Импортируйте директивы

const vuetify = createVuetify({
  components,
  directives,
});

export default vuetify;
