import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'
import router from "./router";
import store from "./store";
//CSS Imports
import 'solana-wallets-vue/styles.css';
import "vue-select/dist/vue-select.css";
import '@vuepic/vue-datepicker/dist/main.css'
import './style.css'
import './index.css'
import App from './App.vue'
import { Spinner } from "./components/loaders";


//FONT AWESOME ICONS
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faIdCard, faMagnifyingGlass, faBell, faBars, faPlus, faKey, faInfo, faChevronLeft, faFile, faPassport, faTicket, faXmark, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faIdCard, faMagnifyingGlass, faBell, faBars, faPlus, faKey, faInfo, faChevronLeft, faFile, faPassport, faTicket, faXmark, faEyeSlash, faEye)


//Vee validate all rules
import AllRules from '@vee-validate/rules';
import { defineRule, configure } from 'vee-validate';

Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
  });

import en from '@vee-validate/i18n/dist/locale/en.json';
import es from '@vee-validate/i18n/dist/locale/es.json';

import { localize, setLocale } from '@vee-validate/i18n';


configure({
  generateMessage: localize({
    es,
  }),
});

setLocale('es')

//Axios config
import axios from 'axios';
const _axios = axios.create({
  baseURL: 'http://localhost:3000/'
})

window._axios = _axios



createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.component('v-spinner', Spinner)
.use(store)
.use(router)
.use(Notifications)
.mount('#app')
