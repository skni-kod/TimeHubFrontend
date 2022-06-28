<script setup lang="ts">
import { ref, defineProps, onBeforeMount, defineEmits } from "vue";
import TimeHubClient from "@/axios-client";
import store from "@/store";
import Notatka from "./Notatka.vue";

const emit = defineEmits(['zmianaKolumny']);

const props = defineProps<{
  id: number;
  tytul: string;
}>();

type Notka = {
  id: number;
  kolumna: number;
  data_stworzenia: string;
  czy_zrobione: boolean;
  czy_wazne: boolean;
  zawartosc: string;
  data_rozpoczecia: string;
  data_zakonczenia: string;
  stworzone_przez: number;
};

const notes = ref<Notka[]>([]);
let tekstTytulu = ref<string>(props.tytul);
onBeforeMount(async () => {
  updateColumn();
});

async function updateColumn() {
  try {
    const noteInitResponse = await TimeHubClient.get("notatka/");
    noteInitResponse.data.forEach(() => {
      notes.value.pop();
    });
    //console.log(noteInitResponse.data);
    noteInitResponse.data.forEach((note: Notka) => {
      if (note.kolumna == props.id) notes.value.push(note);
    });
  } catch (error) {
    console.log("Błąd przy wpisywaniu notatek do kolumny: " + props.id + " \n" + error);
  }
}

async function utworzNotatke() {
  const zmiennaCzasowa = new Date();
  Intl.DateTimeFormat("default", { dateStyle: "long" }).format(zmiennaCzasowa);
  const noteInitResponse = await TimeHubClient.post(
    "notatka/",
    {
      kolumna: props.id,
      data_stworzenia: zmiennaCzasowa,
      czy_zrobione: false,
      czy_wazne: false,
      zawartosc: "Napisz coś...",
      data_rozpoczecia: zmiennaCzasowa,
      data_zakonczenia: zmiennaCzasowa,
    },
    {
      headers: { Authorization: `Bearer ${store.getters.getToken}` },
    }
  );
  notes.value.push(noteInitResponse.data);
  console.log(notes.value);
}

async function usunKolumne() {
  try {
    const colDeleteResponse = await TimeHubClient.delete("kolumny/" + props.id + "/");
  } catch(error) {
    console.log(error);
  }
  emit('zmianaKolumny');
}

async function ustawZawartosc(val: string) {
  const colPatchResponse = await TimeHubClient.patch("kolumny/" + props.id + "/", {tytul: val});
}
</script>

<template>
  <div class="kontenerKolumny">
    <div class="kontenerGornyKolumny">
      <input class="kontenerTytuluKolumny" v-model="tekstTytulu" @input="ustawZawartosc(tekstTytulu)" @blur="ustawZawartosc(tekstTytulu)"/>
      <button class="przyciskOpcjiKolumny" @click="usunKolumne">
        <svg
          id="ikonkaPrzyciskuOpcjiKolumny1"
          class="ikonaPrzyciskuOpcjiKolumny"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          width="20px"
          height="20px"
          viewBox="0 0 490 490"
        >
          <polygon
            xmlns="http://www.w3.org/2000/svg"
            points="386.813,0 245,141.812 103.188,0 0,103.188 141.813,245 0,386.812 103.187,489.999 245,348.187 386.813,490   490,386.812 348.187,244.999 490,103.187 "
          />
        </svg>
      </button>
    </div>
    <div class="kontenerZawartosciKolumny">
      <Notatka
        :id="note.id"
        :kolumna="note.kolumna"
        :data_stworzenia="note.data_stworzenia"
        :czy_zrobione="note.czy_zrobione"
        :czy_wazne="note.czy_wazne"
        :zawartosc="note.zawartosc"
        :data_rozpoczecia="note.data_rozpoczecia"
        :data_zakonczenia="note.data_zakonczenia"
        :stworzone_przez="note.stworzone_przez"
        note="{note}"
        v-for="note in notes"
        :key="note.id"
        @zmianaNotatki="updateColumn"
      />
      <button class="kursorDodajacyZawartoscKolumny" v-on:click="utworzNotatke">
        <div class="plusKursoraDodajacegoZawartoscKolumny">+</div>
        <div class="tekstKursoraDodajacegoZawartoscKolumny">Dodaj nową notatkę</div>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.kontenerKolumny {
  display: flex;
  flex-direction: column;
  // flex: 0 1 auto;
  height: fit-content;
  max-height: 89vh;
  width: 360px;
  border-radius: 10px;
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 6px;
  background-color: white; /*#dfdfef;*/
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
  }
  :hover::-webkit-scrollbar-thumb {
    background-color: #2c3e5050;
    border-radius: 16px;
  }
}

.kontenerGornyKolumny {
  display: flex;
  flex-direction: row;
  height: fit-content;
  align-items: center;
}

.kontenerTytuluKolumny {
  height: fit-content;
  width: 80%;
  margin-right: 6px;
  margin-left: 8px;
  font-size: x-large;
  font-weight: 600;
  border: 0;
  resize: none;
  color: #2c3e50;
  cursor: context-menu;
  text-align:center;
  vertical-align:middle;
}

.przyciskOpcjiKolumny {
  height: 32px;
  width: 15%;
  margin-top: 12px;
  margin-bottom: 6px;
  margin-right: 8px;
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
      width: 30px;
      height: 30px;
    }
  }
}

.ikonaPrzyciskuOpcjiKolumny {
  display: block;
  margin: auto;
}

.kontenerZawartosciKolumny {
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  bottom: 0;
  margin: 8px;
  border-radius: 8px;
  /* background-image: radial-gradient(ellipse closest-side at center, white, #eee, #c0cdd0); */
  background-color: #f9f9f9;
  box-shadow: 0px 0px 7px gray inset, 0 0 2px gray;
  align-items: center;
  overflow-y: scroll;
}

.kursorDodajacyZawartoscKolumny {
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  height: 34px;
  width: 90%;
  border: 0;
  background-color: white; /*#dfdfef;*/
  border-radius: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
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

.plusKursoraDodajacegoZawartoscKolumny {
  width: 20%;
  font-size: xx-large;
}

.tekstKursoraDodajacegoZawartoscKolumny {
  width: 80%;
  font-size: small;
  font-weight: 900;
}
</style>
