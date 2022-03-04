import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isConnected: true, // Modification manuelle temporaire
        currentPage: 'connexionForm', // Utilisé uniquement quand l'utilisateur est déconnecté
        currentUser: 'Jean Edo' // Modification manuelle temporaire
    },
    mutations: {
       // Exemple de mutation
        // maFonction(state, option) {
        
        // }
    }
})
