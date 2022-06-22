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
import {useRoute} from 'vue-router';
import TimeHubClient from "@/axios-client";
import Kanban from "../components/Kanban.vue";

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

const route = useRoute();

onBeforeMount(async () => {
  try {
    const response = await TimeHubClient.get("tablice/" + route.params.id +"/");
    jsonTablicy.value = response.data;
  } catch (error) {
    if (jsonTablicy.value == undefined) console.log("Błąd w pozyskaniu danych tablicy");
  }
});
</script>
