<script setup lang="ts">
import { ref, defineProps, onBeforeMount } from "vue";
import Kolumna from "./Kolumna.vue";
import axios from "axios";

const TimeHubClient = axios.create({
  baseURL: "https://projekt-timehub.herokuapp.com/api/",
  timeout: 1000,
  headers: {
    // "Content-Type": "application/json",
  },
});

const props = defineProps<{
  id: number;
  tytul: string;
  czy_zautomatyzowane: boolean;
}>();

type Kol = {
  id: number;
  tablica: number;
  tytul: string;
};

const cols = ref<Kol[]>([]);
onBeforeMount(async () => {
  const colsInitResponse = await TimeHubClient.get("tablicaKolumny/2/");
  console.log(colsInitResponse.data);
  colsInitResponse.data.forEach((col: Kol) => {
    cols.value.push(col);
  });
});

async function utworzKolumne() {
  const response = await TimeHubClient.post("kolumny/", {
    tablica: props.id,
    tytul: "Kolumna",
  });
  cols.value.push(response.data);
  console.log(response.data);
}
</script>

<template>
  <div class="kanban">
    <div class="kontenerTytulowy">{{ props.tytul }}</div>
    <div class="kontenerWszystkichKolumn">
      <Kolumna
        :id="col.id"
        :tytul="col.tytul"
        col="{col}"
        v-for="col in cols"
        :key="col.id"
      />
      <button class="kursorDodajacyKolumny" v-on:click="utworzKolumne">
        <div class="plusKursoraDodajacegoZawartoscKolumny">+</div>
        <div class="tekstKursoraDodajacegoZawartoscKolumny">Dodaj nową kolumnę</div>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.kanban {
  display: flex;
  flex-direction: column;
  width: 100%;
  bottom: 0;
  max-height: 100vh;
  background-color: white;
}

.kontenerTytulowy {
  width: 100%;
  padding-top: 8px;
  height: fit-content;
  margin-top: 35px;
  position: fixed;
  font-size: xx-large;
  font-weight: 600;
}

.kontenerWszystkichKolumn {
  display: flex;
  flex-direction: row;
  width: fit-content;
  max-height: 89vh;
  background-color: transparent;
  margin-top: 90px;
  margin-bottom: 16px;
}

.kursorDodajacyKolumny {
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  height: 36px;
  width: 360px;
  border: 0;
  background-color: white; /*#dfdfef;*/
  border-radius: 16px;
  margin-left: 6px;
  margin-right: 6px;
  color: #2c3e50;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  place-items: center;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: #f9f9f9;
  }
  &:active {
    transition-duration: 0.05s;
    color: #2c3e50aa;
    box-shadow: 0 0, 0 0 5px inset gray;
  }
}
</style>
