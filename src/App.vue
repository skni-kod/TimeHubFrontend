<template>
  <nav id="NavBar">
    <div class="LogoDiv">
      <router-link to="/">
        <h1>TimeHUB</h1>
      </router-link>
    </div>

    <div class="NavButtonsDiv" v-if="auth">
      <router-link to="/dashboard">
        <div class="NavButton">Dashboard</div>
      </router-link>
      <router-link to="/calendar">
        <div class="NavButton">Calendar</div>
      </router-link>
      <router-link to="/statistics">
        <div class="NavButton">Statistics</div>
      </router-link>
    </div>
    <div class="NavLoginDiv" v-if="!auth">
      <router-link to="/">
        <div class="NavButton">Log in</div>
      </router-link>
      <router-link to="/register">
        <div class="NavButton">Register</div>
      </router-link>
    </div>
    <div class="NavLoginDiv" v-else>
      <router-link to="/" @click="logout">
        <div class="NavButton">Log out</div>
      </router-link>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // overflow-y: hidden; // this needs to be addressed
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
  height: auto;
  width: 100%;
  flex-direction: row;
  flex-grow: 0;
  background-color: white;
  background-size: cover;
  place-items: center;
  background-repeat: no-repeat;
  box-shadow: 0 1px 10px lightgray;
  position: fixed;
  z-index: 10000;
  top: 0px;
  a {
    display: flex;

    flex-grow: 0;
    font-weight: bold;
    color: #2c3e50;

    // &.router-link-exact-active {
    //   color: #42b983;
    // }
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
import { defineComponent } from "vue";
import TimeHubClient from "./axios-client";
import store from "./store";
import { mapGetters } from "vuex";
export default defineComponent({
  components: {},

  setup(): { pageName: string } {
    const pageName = "home";
    return {
      pageName: pageName,
    };
  },

  methods: {
    logout: () => {
      store.dispatch("logout");
    },
  },
  computed: { ...mapGetters({ auth: "getAuth" }) },
});
</script>
