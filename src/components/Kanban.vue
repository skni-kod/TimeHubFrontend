<template>
  <div class="kanban">
    <div class="kontenerTytulowy">{{ kanbanTitle }}</div>
    <div class="kontenerWszystkichKolumn">
      <div class="kontenerKolumny">
        <div class="kontenerGornyKolumny">
          <div class="kontenerTytuluKolumny">Column Name Placeholder</div>
          <button class="przyciskDodawaniaNotatki">+</button>
        </div>
        <div class="kontenerZawartosciKolumny"></div>
      </div>
    </div>
  </div>
</template>

<style>
.kanban {
  display: flex;
  flex-direction: column;
  width: 100%;
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
  background-color: transparent;
  margin-top: 90px;
  margin-bottom: 16px;
}

.kontenerKolumny {
  display: flex;
  flex-direction: column;
  width: 360px;
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 6px;
  background-color: lightgray;
}

.kontenerGornyKolumny {
  display: flex;
  flex-direction: row;
  height: fit-content;
}

.kontenerTytuluKolumny {
  height: fit-content;
  margin: 6px;
  font-size: x-large;
  font-weight: 600;
}

.przyciskDodawaniaNotatki {
  height: 48px;
  width: 48px;
  margin: 6px;
  font-size: xx-large;
}

.kontenerZawartosciKolumny {
  margin: 6px;
  border-radius: 16px;
  /* background-image: radial-gradient(ellipse closest-side at center, white, #eee, #c0cdd0); */
  background-color: #eee;
}
</style>

<script lang="ts">
export default {
  components: {},

  setup(): { kanbanTitle: string } {
    const constKanbanTitle = "Kanban Title Placeholder";
    return {
      kanbanTitle: constKanbanTitle,
    };
  },
};
</script>
