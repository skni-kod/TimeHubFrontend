<template>
  <div class="statisticsPage">
    <Statistics :zmienna="zrobione" :zmienna2="wtrakcie"></Statistics>
  </div>
</template>

<script lang="ts">
import Statistics from "../components/Statistics.vue";
import axios from 'axios'


export default {
  components: {
    Statistics,
  },

async created() {
    const { data } = await axios.get("https://projekt-timehub.herokuapp.com/api/statystykaNotatkiSkonczoneAktywne7Dni/");
    this.zrobione = (data.zrobione+1); //+1 jest dla testu xd
    this.wtrakcie = (data.w_trakcie);
  },
  

  setup(): { pageName: string } {
    var path = window.location.pathname;
    const URLPageName = path.substring(path.lastIndexOf("/") + 1);

    return {
      pageName: URLPageName,
    };
  },

  data(){return {
  tablica: this.tablica,
  zrobione: this.zrobione,
  wtrakcie: this.wtrakcie
  }}
};
</script>
