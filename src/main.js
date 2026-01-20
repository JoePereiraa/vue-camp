import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";

import * as FaIcons from "oh-vue-icons/icons/fa";
import * as BiIcons from "oh-vue-icons/icons/bi";

import App from './App.vue'
import router from './router'

const app = createApp(App)

const Fa = Object.values({ ...FaIcons });
const Bi = Object.values({ ...BiIcons });

addIcons(...Fa, ...Bi);

app.use(createPinia());
app.use(router);
app.component('v-icon', OhVueIcon);

app.mount('#app')
