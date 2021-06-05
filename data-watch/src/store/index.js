import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        currentUser: null
    },
    mutations: {
        setCurrentUser (state, value) {
            state.currentUser = value
        }
    },
    actions: {

    },
    modules: {
        
    }
})