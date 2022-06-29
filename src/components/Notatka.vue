<script setup lang="ts">
import { onMounted, defineProps, defineEmits, ref } from "vue";
import TimeHubClient from "@/axios-client";
const emit = defineEmits(['zmianaNotatki']);

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

let tekstZawartosci = ref<string>(props.zawartosc);

let dataRozpoczecia = ref<string>(props.data_rozpoczecia.slice(0,19));
let dataZakonczenia = ref<string>(props.data_zakonczenia.slice(0,19));
let nazwaTworcy = ref<string>();

const zawartoscNotatki = ref();

onMounted(() => {
  zawartoscNotatki.value.style.height = "";
  zawartoscNotatki.value.style.height = zawartoscNotatki.value.scrollHeight + 8 + "px";

  ustawNazweTworcy();
})

async function ustawNazweTworcy() {
  try {
    const tworcaNameResponse = await TimeHubClient.get("user/" + props.stworzone_przez + "/");
    nazwaTworcy.value = tworcaNameResponse.data.username;
  } catch(error) {
    console.log(error)
  }
}

async function usunNotatke() {
  try {
    const noteDeleteResponse = await TimeHubClient.delete("notatka/" + props.id + "/");
  } catch(error) {
    console.log(error);
  }
  emit('zmianaNotatki');
}

async function ustawWazne() {
  const noteWazneResponse = await TimeHubClient.patch("notatka/" + props.id + "/", {czy_wazne: !props.czy_wazne});
  emit('zmianaNotatki');
}

async function ustawZawartosc(val: string) {
  const notePushResponse = await TimeHubClient.patch("notatka/" + props.id + "/", {zawartosc: val});
}

async function ustawCzasRozpoczecia(val: string) {
  const timeResponse = await TimeHubClient.patch("notatka/" + props.id + "/", {data_rozpoczecia: val});
}

async function ustawCzasZakonczenia(val: string) {
  const timeResponse = await TimeHubClient.patch("notatka/" + props.id + "/", {data_zakonczenia: val});
}
</script>

<template>
  <div class="kontenerNotatki">
    <div class="kontenerTytulowyNotatki">
      <button class="czyWaznePasek" :class="{ aktywny: props.czy_wazne }" @click="ustawWazne"></button>
      <button class="przyciskUsunieciaNotatki" v-on:click="usunNotatke">
        <svg
          id="ikonkaPrzyciskuUsunieciaKolumny1"
          class="ikonaPrzyciskuUsunieciaKolumny"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          width="16px"
          height="16px"
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
      ref="zawartoscNotatki"
      oninput='this.style.height = "";this.style.height = this.scrollHeight + 8 + "px"'
      placeholder="Napisz coś..."
      v-model="tekstZawartosci"
      @input="ustawZawartosc(tekstZawartosci)"
      @blur="ustawZawartosc(tekstZawartosci)"
    />
    <div class="kontenerCzasow">
      <span class="czasRozpoczecia" >Od: <input class="inputCzasuRozpoczecia" type="datetime-local" v-model="dataRozpoczecia" @input="ustawCzasRozpoczecia(dataRozpoczecia)"/></span>
      <span class="czasZakonczenia">Do: <input class="inputCzasuZakonczenia" type="datetime-local" v-model="dataZakonczenia" @input="ustawCzasZakonczenia(dataZakonczenia)"/></span>
      <span class="czasUtworzenia">Stworzono: {{ props.data_stworzenia.slice(0,23).replace("T", " ") }}</span>
      <span class="tworca">Przez: {{ nazwaTworcy }}</span>
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
  width: 85%;
  height: 16px;
  margin-right: 8px;
  border-radius: 16px;
  box-shadow: 0px 0px 2px gray, 0 0 7px inset gray;
  background-color: #f9f9f9; //#f94040;
  border: 0px;
  cursor:pointer;
}

.aktywny {
  background-color: red;
}

.przyciskUsunieciaNotatki {
  height: 22px;
  width: 15%;
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
  font-size: large;
  font-family:serif;
  color:#2c3e50;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 16px;
}

.kontenerCzasow {
  display: flex;
  flex-direction: column;
  font-size: small;
  font-style: italic;
  align-items: flex-start;
  width: 90%;
  span {
    margin-left: 8px;
    margin-right: 8px;
    font-size: small;
    font-weight: 600;
    input {
      border: 0;
      color:#2c3e50;
      font-weight: 600;
      display: inline-flex;
      width: fit-content;
      align-items: center;
      resize: horizontal;
      min-width: 85%;
    }

    input:active {
      width: auto;
    }
  }
}
</style>
