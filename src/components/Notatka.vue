<script setup lang="ts">
import { defineProps } from "vue";
import TimeHubClient from "@/axios-client";
const props = defineProps<{
  id: number;
  kolumna: number;
  data_stworzenia: string;
  czy_zrobione: boolean;
  czy_wazne: boolean;
  zawartosc: string;
  data_rozpoczecia: string;
  data_zakonczenia: string;
  stworzone_przez: number;
}>();

async function usunNotatke() {
  const noteDeleteResponse = await TimeHubClient.delete("notatka/" + props.id + "/");
}
</script>

<template>
  <div class="kontenerNotatki">
    <div class="kontenerTytulowyNotatki">
      <div class="czyWaznePasek" :class="{ aktywny: props.czy_wazne }"></div>
      <button class="przyciskUsunieciaNotatki" v-on:click="usunNotatke">
        <svg
          id="ikonkaPrzyciskuUsunieciaKolumny1"
          class="ikonaPrzyciskuUsunieciaKolumny"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          width="20px"
          height="20px"
          viewBox="0 0 490 490"
          xml:space="preserve"
        >
          <polygon
            xmlns="http://www.w3.org/2000/svg"
            points="386.813,0 245,141.812 103.188,0 0,103.188 141.813,245 0,386.812 103.187,489.999 245,348.187 386.813,490   490,386.812 348.187,244.999 490,103.187 "
          />
        </svg>
      </button>
    </div>
    <textarea
      class="zawartoscNotatki"
      oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
      v-text="props.zawartosc"
    />
    <div class="kontenerCzasow">
      <span class="czasUtworzenia">Stworzono: {{ props.data_stworzenia }}</span>
      <span class="tworca">Przez: {{ stworzone_przez }}</span>
      <span class="czasRozpoczecia">Od: {{ props.data_rozpoczecia }}</span>
      <span class="czasZakonczenia">Do: {{ props.data_zakonczenia }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.kontenerNotatki {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  height: fit-content;
  width: 90%;
  border: 0;
  background-color: white; /*#dfdfef;*/
  border-radius: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #2c3e50;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  place-items: center;
  user-select: none;
  padding-top: 8px;
  padding-bottom: 8px;
}

.kontenerTytulowyNotatki {
  display: flex;
  flex-direction: row;
  width: 90%;
  font-size: middle;
  font-weight: 900;
  align-items: center;
}

.czyWaznePasek {
  width: 80%;
  height: 16px;
  margin-right: 8px;
  border-radius: 16px;
  box-shadow: 0px 0px 2px gray, 0 0 7px inset gray;
  background-color: #f9f9f9; //#f94040;
}

.aktywny {
  background-color: red;
}

.przyciskUsunieciaNotatki {
  height: 36px;
  width: 20%;
  margin-top: 6px;
  margin-bottom: 6px;
  font-size: xx-large;
  border: 0;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  cursor: pointer;
  fill: #2c3e50;
  enable-background: new 0 0 569.613 569.614;
  &:active {
    box-shadow: 0 0 0, 0 0 5px inset gray;
    transition-duration: 0.025s;
    svg {
      fill: #2c3e50aa;
      width: 22px;
      height: 22px;
    }
  }
}

.ikonaPrzyciskuUsunieciaKolumny {
  display: block;
  margin: auto;
}

.zawartoscNotatki {
  display: table;
  resize: none;
  width: 90%;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 16px;
}

.kontenerCzasow {
  display: flex;
  flex-direction: column;
  font-size: xx-small;
  font-style: italic;
  align-items: flex-start;
  width: 90%;
  span {
    margin-left: 8px;
    margin-right: 8px;
  }
}
</style>
