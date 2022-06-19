<template>
  <div class="kanbanPage">
    <Kanban
      :id="jsonTablicy.id"
      :tytul="jsonTablicy.tytul"
      :czy_zautomatyzowane="jsonTablicy.czy_zautomatyzowane"
    />
  </div>
</template>

<style lang="scss">
.kanbanPage {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow-y: hidden;
  z-index: -1;
  ::-webkit-scrollbar:horizontal {
    height: 12px;
  }
  ::-webkit-scrollbar-thumb:horizontal {
    background-color: #2c3e50aa;
  }
}
</style>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import Kanban from "../components/Kanban.vue";

const TimeHubClient = axios.create({
  baseURL: "https://projekt-timehub.herokuapp.com/api/",
  timeout: 1000,
  headers: {
    // "Content-Type": "application/json",
    //Authenticator:  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NjY5Mjk4LCJpYXQiOjE2NTU2NjU2OTgsImp0aSI6ImRiNTMwY2Q5NzNiZjRjMzU5NDZjMjJhZjcyNzBmNzUzIiwidXNlcl9pZCI6M30.2IqixLmhkAJuqx82c6PKD4tyTJ2ryPXnppl9pHmw7vs",
  },
});

interface Tablica {
  id: number;
  tytul: string;
  czy_zautomatyzowane: boolean;
}

let jsonTablicy = ref<Tablica>({
  id: 0,
  tytul: "",
  czy_zautomatyzowane: false,
});

onBeforeMount(async () => {
  try {
    const response = await TimeHubClient.get("tablice/2/");
    jsonTablicy.value = response.data;
  } catch (error) {
    if (jsonTablicy.value == undefined) console.log("Błąd w pozyskaniu danych tablicy");
  }
});
</script>
