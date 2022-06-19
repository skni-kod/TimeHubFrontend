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
      }
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
        username:'',
        pk: '',
        email: '',
        first_name:'',
        last_name:'',
        };
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
    }
  },
  getters: {
    getAuth: (state) => {return state.token != ''},
    getToken: (state) => {return state.token},
    getUser: (state) => { return state.user}
  }
})
