import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store.js'
import "tailwindcss/tailwind.css"
import './assets/style.css'

import headerComponent from './components/headerComponent.vue';
import btnConnexion from './components/btnConnexion.vue';
import btnInscription from './components/btnInscription.vue';
import btnDeconnexion from './components/btnDeconnexion.vue';
import inputText from './components/inputText.vue';
import post from './components/post.vue';
import connexionForm from './components/connexionForm.vue';
import inscriptionForm from './components/inscriptionForm.vue';

Vue.use(Vuex);

Vue.component('headerComponent', headerComponent);
Vue.component('btnConnexion', btnConnexion);
Vue.component('btnInscription', btnInscription);
Vue.component('btnDeconnexion', btnDeconnexion);
Vue.component('inputText', inputText);
Vue.component('post', post);
Vue.component('connexionForm', connexionForm);
Vue.component('inscriptionForm', inscriptionForm);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
