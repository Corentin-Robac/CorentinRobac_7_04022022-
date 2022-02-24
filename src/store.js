import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isConnected: true,
        currentPage: 'connexionForm' // Utilisé uniquement quand l'utilisateur est déconnecté
    },
    mutations: {
       // Exemple de mutation
        // maFonction(state, option) {
        
        // }
    }
})
