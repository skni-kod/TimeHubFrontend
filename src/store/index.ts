import { createStore } from 'vuex'

export default createStore({
  state: {
    token:'',
    user:{
      username:'',
      pk: '',
      email: '',
      first_name:'',
      last_name:'',
    },
    kanbany: [],
    wykresy: [],
    wykresy2: [],
  },
  mutations: {
    setUser(state, user){
      state.user = user;
    },
    setToken(state, token){
      state.token = token;
    },
    logout(state){
      state.token = "";
      state.user = {
        username: '',
        pk: '',
        email: '',
        first_name: '',
        last_name: '',
      };
      state.kanbany = [],
      state.wykresy = [],
      state.wykresy2 = []
    },
    setKanbany(state, kanbany) {
      state.kanbany = kanbany
    },
    setWykresy(state, kanbany) {
      state.kanbany = kanbany
    },
    setWykresy2(state, kanbany) {
      state.kanbany = kanbany
    }
  },
  actions: {
    saveUser({commit},user){
      commit('setUser',user)
    },
    saveToken({commit}, token){
      commit('setToken',token)
    },
    logout({commit}){
      commit('logout');
    },
    getKanbany({ commit }, kanbany) {
      commit('setKanbany', kanbany)
    },
    getWykresy({ commit }, wykresy) {
      commit('setWykresy', wykresy)
    },
    getWykresy2({ commit }, wykresy2) {
      commit('setWykresy2', wykresy2)
    }
  },
  getters: {
    getAuth: (state) => {return state.token != ''},
    getToken: (state) => {return state.token},
    getUser: (state) => { return state.user; },
    getKanbany: (state) => {return state.kanbany},
    getWykresy: (state) => {return state.wykresy},
    getWykresy2: (state) => {return state.wykresy2},
  }
})
