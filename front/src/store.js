import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isConnected: false, // Modification manuelle temporaire
        currentPage: 'connexionForm', // Utilisé uniquement quand l'utilisateur est déconnecté
        currentUser: '', // Modification manuelle temporaire
        isAdmin: false,
        jwt: ''
    }
});
