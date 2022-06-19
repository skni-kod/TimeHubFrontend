<template>
  <nav id="NavBar">
    <div class="LogoDiv">
      <h1>TimeHUB</h1>
    </div>

    <div class="NavButtonsDiv">
      <a href="\dashboard">
        <div class="NavButton">Dashboard</div>
      </a>
      <a href="\calendar">
        <div class="NavButton">Calendar</div>
      </a>
      <a href="\kanban">
        <div class="NavButton">Kanban</div>
      </a>
    </div>
    <div class="NavLoginDiv" v-if="!auth">
      <a href="\">
        <div class="NavButton">Log in</div>
      </a>
      <a href="\register">
        <div class="NavButton">Register</div>
      </a>
    </div>
    <div class="NavLoginDiv" v-else>
      <a href="\" @click="logout">
        <div class="NavButton">Log out</div>
      </a>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#NavBar {
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  background-color: white;
  background-size: cover;
  place-items: center;
  background-repeat: no-repeat;
  box-shadow: 0 1px 10px lightgray;
  a {
    display: flex;

    flex-grow: 0;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

%flex-fill-horizontal {
  display: flex;
  flex: 1 1 auto;
}

.LogoDiv {
  @extend %flex-fill-horizontal;
  margin-left: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
}

.NavButtonsDiv {
  @extend %flex-fill-horizontal;
  gap: 16px;
}

.NavLoginDiv {
  display: flex;
  gap: 8px;
  margin-right: 16px;
}
</style>

<script lang="ts">
import {defineComponent} from 'vue'
import TimeHubClient from '../axios-client'
import store from './store'
import {mapGetters} from "vuex"
export default defineComponent({
  components: {},

  setup(): { pageName: string } {
    const pageName = "home";
    return {
      pageName: pageName,
    };
  },

  methods:{
    logout:()=>{
      store.dispatch('logout')
    },
  },
computed:{ ...mapGetters({auth:'getAuth'})}
})
</script>