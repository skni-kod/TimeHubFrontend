<script lang="ts">
import { defineComponent } from "vue";
import TimeHubClient from "../axios-client";
import store from "../store";
import Statistics from "../components/Statistics.vue";
export default defineComponent({
  components: {
    Statistics,
  },

  setup(): { pageName: string } {
    var path = window.location.pathname;
    const URLPageName = path.substring(path.lastIndexOf("/") + 1);

    return {
      pageName: URLPageName,
    };
  },

  beforeMount: async function () {
    
    try {
      const lewy_wykres_response = await TimeHubClient.get(
        `statystykaNotatkiSkonczoneAktywne7Dni/`,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      const prawy_wykres_response = await TimeHubClient.get(
        `https://projekt-timehub.herokuapp.com/api/statystykaProcentowaIloscTaskowWTablicach/`,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );

      store.dispatch("getWykresy", lewy_wykres_response.data);
      this.lewy_wykres_label = Object.keys(lewy_wykres_response.data);

      store.dispatch("getWykresy", lewy_wykres_response.data);
      this.lewy_wykres_data = Object.values(lewy_wykres_response.data);

      store.dispatch("getWykresy", prawy_wykres_response.data);
      this.prawy_wykres_label = Object.keys(prawy_wykres_response.data);

      store.dispatch("getWykresy", prawy_wykres_response.data);
      this.prawy_wykres_data = Object.values(prawy_wykres_response.data);

      this.reload_stat();
    } catch (error) {
      this.lewy_wykres_label = "Nie można było pobrać danych";
    }
  },
  data: () => {
    return {
      user: store.getters.getUser,
      token: store.getters.getToken,
      lewy_wykres_label: store.getters.getWykresy,
      lewy_wykres_data: store.getters.getWykresy,
      prawy_wykres_label: store.getters.getWykresy,
      prawy_wykres_data: store.getters.getWykresy,
      lewy_wykres2: store.getters.getWykresy2,
      tytul: "",
      czy_zautomatyzowane: false,
      stat_reload: 0,
    };
  },
  methods: {
    reload_stat() {
      
      console.log("wykonalo sie");
      this.stat_reload += 1;
    },
  },
});
</script>

<template>
  <div class="statisticsPage">
    <button id="refresh_id" class="refresh_button" v-on:click="reload_stat()">
      Odśwież wykres
    </button>
    <div id="ComponentWrapper">
      <Statistics
        :key="stat_reload"
        :lewy_wykres_label="lewy_wykres_label"
        :lewy_wykres_data="lewy_wykres_data"
        :prawy_wykres_label="prawy_wykres_label"
        :prawy_wykres_data="prawy_wykres_data">
      </Statistics>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chartsWrapper {
  /* glowny container na wykresy */
  width: 80%;
  height: 65vh;
  display: block;
  margin: 0 auto;
}
.leftChartWrapper {
  /* ustawienia lewego wykresu */
  width: 50%;
  height: 40vh;
  background-color: rgba(255, 255, 255);
  display: block;
  float: left;
  position: relative;
  padding-bottom: 40px;
}
.rightChartWrapper {
  /* ustawienia prawego wykresu */
  width: 50%;
  height: 40vh;
  background-color: rgba(255, 255, 255);
  display: block;
  float: left;
  position: relative;
  padding-bottom: 40px;
}
.bottomWrapper {
  /* ustawienia dolnego wykresu */
  width: 100%;
  height: 50%;
  margin-top: 40px;
  margin-bottom: 40px;
  display: block;
  float: left;
  position: relative;
}
h1 {
  margin: 20px;
}
.refresh_button {
  margin-top: 60px;
  border: 0;
  width: 100px;
  line-height: 1.1;
  padding: 8px 10px;
  font-size: 0.8rem;
  text-align: center;
  color: #2c3e50;
  cursor: pointer;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  enable-background: new 0 0 569.613 569.614;
}
.refresh_button:active {
  box-shadow: 0 0 0, 0 0 5px inset gray;
  transition-duration: 0.025s;
}
</style>