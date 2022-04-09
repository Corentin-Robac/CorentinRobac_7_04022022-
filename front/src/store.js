import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isConnected: false,
        currentPage: 'connexionForm',
        currentUser: '',
        isAdmin: false,
        jwt: ''
    }
});
